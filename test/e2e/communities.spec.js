// Communities in the browser: a private community with a private channel,
// invitations, topics, a removal, and an open community joined by link.
const { test, expect } = require('@playwright/test');
const { RELAY } = require('./relay');

const BASE = 'http://localhost:8020';
const N = String(Date.now() % 1000000);
const PASSWORD = 'password123';
const [ALICE, BOB, CAROL, DANA] = ['alice', 'bob', 'carol', 'dana'].map((n) => `c${n}${N}`);

const problems = [];

async function newUser(browser, who) {
    const context = await browser.newContext({ baseURL: BASE, viewport: { width: 1400, height: 900 } });
    const page = await context.newPage();
    page.on('pageerror', (e) => problems.push(`[${who}] page error: ${e.message}`));
    page.on('console', (m) => {
        if (m.type() === 'error' || m.type() === 'warning') problems.push(`[${who}] console.${m.type()}: ${m.text()}`);
    });
    page.on('dialog', async (d) => { problems.push(`[${who}] alert: ${d.message()}`); await d.accept(); });
    return page;
}

// Registers without a profile picture (it is optional) and logs in.
async function signUp(page, name) {
    await page.goto('/register');
    const inputs = page.locator('input.MuiInputBase-input');
    await expect(inputs).toHaveCount(3);
    await inputs.nth(0).fill(name);
    await inputs.nth(1).fill(PASSWORD);
    await inputs.nth(2).fill(PASSWORD);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL(BASE + '/login', { timeout: 30000 });
    const login = page.locator('input.MuiInputBase-input');
    await login.nth(0).fill(name);
    await login.nth(1).fill(PASSWORD);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL(BASE + '/home', { timeout: 30000 });
}

async function openSettings(page) {
    await page.getByRole('button', { name: 'Settings' }).click();
    return page.getByRole('dialog');
}

async function addMember(dialog, name) {
    await dialog.getByLabel('Add by username').fill(name);
    await dialog.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(dialog.locator('.MuiDialogContent-root > div').filter({ hasText: name })).toBeVisible();
}

// Sends a message from the community page, in a new topic or the selected one.
async function say(page, text, topic) {
    if (topic) await page.getByPlaceholder('Topic').fill(topic);
    await page.getByPlaceholder('Message').fill(text);
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText(text)).toBeVisible();
}

async function acceptInvitation(page, community) {
    await page.goto('/communities');
    await expect(page.getByText(community)).toBeVisible();
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.getByRole('link', { name: community }).click();
    await expect(page.getByRole('heading', { name: community }).or(page.locator('h6', { hasText: community }))).toBeVisible();
}

test('communities end to end', async ({ browser }) => {
    const alice = await newUser(browser, 'alice');
    const bob = await newUser(browser, 'bob');
    const carol = await newUser(browser, 'carol');
    const dana = await newUser(browser, 'dana');
    for (const [page, name] of [[alice, ALICE], [bob, BOB], [carol, CAROL], [dana, DANA]]) await signUp(page, name);

    await test.step('alice creates a private community, invites bob and carol, and adds a private channel', async () => {
        await alice.getByRole('link', { name: 'Communities' }).click();
        await alice.getByLabel('Name').fill('Hiking Club');
        await alice.getByRole('button', { name: 'Create' }).click();
        await expect(alice).toHaveURL(/\/c\//, { timeout: 30000 });
        await expect(alice.getByText('# general')).toBeVisible();

        const dialog = await openSettings(alice);
        await addMember(dialog, BOB);
        await addMember(dialog, CAROL);
        await dialog.getByLabel('New channel').fill('organizers');
        await dialog.getByLabel('Who').click();
        await alice.getByRole('option', { name: 'chosen members' }).click();
        await dialog.getByLabel(BOB).check();
        await dialog.getByRole('button', { name: 'Create' }).click();
        await expect(dialog.getByText('organizers')).toBeVisible();
        await dialog.getByRole('button').first().click();                          // close
        await expect(alice.getByText('# organizers')).toBeVisible();
    });

    await test.step('bob and carol accept; they talk in topics; carol cannot see the private channel', async () => {
        await acceptInvitation(bob, 'Hiking Club');
        await expect(bob.getByText('# organizers')).toBeVisible();
        await say(bob, 'who is in?', 'saturday hike');

        await acceptInvitation(carol, 'Hiking Club');
        await expect(carol.getByText('# general')).toBeVisible();
        await expect(carol.getByText('# organizers')).toHaveCount(0);
        await carol.getByRole('button', { name: /saturday hike/ }).click();
        await expect(carol.getByText('who is in?')).toBeVisible();
        await say(carol, 'me!');

        await expect(alice.getByText('me!')).toBeVisible();                        // live, without a reload
        await bob.getByRole('button', { name: '# organizers' }).click();
        await say(bob, 'we have 200 francs', 'budget');
        await alice.getByRole('button', { name: '# organizers' }).click();
        await expect(alice.getByText('we have 200 francs')).toBeVisible();
    });

    await test.step('alice removes carol, who is shown that she is no longer a member', async () => {
        const dialog = await openSettings(alice);
        await dialog.locator('.MuiDialogContent-root > div').filter({ hasText: CAROL })
            .getByRole('button', { name: 'Remove' }).click();
        await expect(dialog.locator('.MuiDialogContent-root > div').filter({ hasText: CAROL })).toHaveCount(0);
        await dialog.getByRole('button').first().click();

        await bob.getByRole('button', { name: '# general' }).click();
        await say(bob, 'carol is gone, plan B', 'saturday hike');
        await carol.reload();
        await expect(carol.getByText('You are not a member of this community.')).toBeVisible();
        // that she cannot decrypt what comes after is checked in test/node/communities.test.js
    });

    await test.step('dana joins an open community by its link', async () => {
        await alice.goto('/communities');
        await alice.getByLabel('Name').fill('Clojure Users');
        await alice.getByLabel('Kind').click();
        await alice.getByRole('option', { name: /^Open/ }).click();
        await alice.getByRole('button', { name: 'Create' }).click();
        await expect(alice).toHaveURL(/\/c\//, { timeout: 30000 });
        const link = alice.url();

        await dana.goto('/communities');
        await dana.getByLabel('Community link or id').fill(link);
        await dana.getByRole('button', { name: 'Join' }).click();
        await expect(dana).toHaveURL(link, { timeout: 30000 });
        await say(dana, 'hi, I am dana', 'intro');
        await expect(alice.getByText('hi, I am dana')).toBeVisible();
    });

    await test.step("alice's device keeps an encrypted cache, which survives a reload and goes with logout", async () => {
        const cached = () => alice.evaluate(async () => {
            const name = (await indexedDB.databases()).map((d) => d.name).find((n) => n.startsWith('wejure-'));
            if (!name) return null;
            const db = await new Promise((resolve, reject) => {
                const req = indexedDB.open(name);
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => reject(req.error);
            });
            const rows = await new Promise((resolve) => {
                const req = db.transaction('decrypted').objectStore('decrypted').getAll();
                req.onsuccess = () => resolve(req.result);
            });
            db.close();
            const bytes = rows.map((r) => new TextDecoder().decode(r.data)).join('');
            return { rows: rows.length, plaintext: bytes.includes('who is in?') || bytes.includes('Hiking') };
        });
        const before = await cached();
        expect(before.rows).toBeGreaterThan(5);
        expect(before.plaintext).toBe(false);

        await alice.goto('/communities');
        await alice.getByRole('link', { name: 'Hiking Club' }).click();
        await alice.reload();
        await alice.getByRole('button', { name: /saturday hike/ }).click();
        await expect(alice.getByText('me!')).toBeVisible();

        await alice.getByRole('button', { name: 'Logout' }).click();
        await expect(alice).toHaveURL(BASE + '/');
        await expect.poll(cached).toBe(null);
    });

    expect(problems).toEqual([]);
});

test('a long channel shows its newest messages and fetches older ones when scrolled up', async ({ browser }) => {
    const name = `cerin${N}`;
    const page = await newUser(browser, 'erin');
    await signUp(page, name);
    await page.getByRole('link', { name: 'Communities' }).click();
    await page.getByLabel('Name').fill('Long Club');
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page).toHaveURL(/\/c\//, { timeout: 30000 });
    await expect(page.getByText('# general')).toBeVisible();

    // 131 messages, sent from the test process as the same account (faster than typing)
    const { login } = await import('wejure-nostr/account.js');
    const C = await import('wejure-nostr/communities.js');
    const s = await login([RELAY], name, PASSWORD);
    try {
        const [ref] = (await C.myCommunities(s)).joined.keys();
        const club = await C.openCommunity(s, ref);
        const general = C.channelByName(club, 'general');
        await C.sendMessage(club, general, 'history', 'the very first message');
        await new Promise((r) => setTimeout(r, 1100));   // pages end on whole seconds: keep it in an older one
        for (let i = 0; i < 130; i++) await C.sendMessage(club, general, 'busy', `n${i}`);
    } finally {
        s.pool.destroy();
    }

    // The open page got them all live (and saved them); a new device has none
    const device = await newUser(browser, 'erin on another device');
    await device.goto('/login');
    const fields = device.locator('input.MuiInputBase-input');
    await fields.nth(0).fill(name);
    await fields.nth(1).fill(PASSWORD);
    await device.getByRole('button', { name: 'Submit' }).click();
    await expect(device).toHaveURL(BASE + '/home', { timeout: 30000 });
    await device.getByRole('link', { name: 'Communities' }).click();
    await device.getByRole('link', { name: 'Long Club' }).click();
    await page.context().close();
    await check(device);
    expect(problems).toEqual([]);
});

// The numbers of the "n<i>" messages shown, in order.
const shown = async (page) => (await page.locator('.message-list p').allTextContents())
    .filter((t) => /^n\d+$/.test(t)).map((t) => Number(t.slice(1)));

async function check(page) {
    await expect(page.getByText('n129', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Load older messages' })).toBeVisible();
    await expect(page.getByRole('button', { name: /^busy/ })).toContainText('+');
    const first = await shown(page);
    expect(first.at(-1)).toBe(129);
    expect(first).toEqual(first.map((_, i) => first[0] + i));   // the newest ones, no holes
    await expect(page.getByText('the very first message')).toHaveCount(0);

    await page.locator('.message-list').hover();
    await page.mouse.wheel(0, -100000);   // to the top, which fetches older messages
    await expect(page.getByText('the very first message')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Load older messages' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /^busy/ })).toContainText('130');
    expect(await shown(page)).toEqual([...Array(130).keys()]);
}

// Two users, alice and dana, in separate browser contexts, through every page.
const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:8020';
const N = String(Date.now() % 1000000);
const ALICE = 'alice' + N;
const DANA = 'dana' + N;
const PASSWORD = 'password123';

const png = (name, base64) => ({ name, mimeType: 'image/png', buffer: Buffer.from(base64, 'base64') });
const RED = png('red.png', 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKklEQVR4nGO4Y2NDU8QwasGoBaMWjFowasGoBaMWjFowasGoBaMWDBULAG93UEwao5ERAAAAAElFTkSuQmCC');
const BLUE = png('blue.png', 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKklEQVR4nGOwqbhDU8QwasGoBaMWjFowasGoBaMWjFowasGoBaMWDBULAMRtQFswUPIZAAAAAElFTkSuQmCC');

// Page errors, console errors and warnings, and alerts nobody expected.
const problems = [];
const expectedAlerts = [];

async function newUser(browser, who) {
    const context = await browser.newContext({ baseURL: BASE, viewport: { width: 1400, height: 900 } });
    const page = await context.newPage();
    page.on('pageerror', (e) => problems.push(`[${who}] page error: ${e.message}`));
    page.on('console', (m) => {
        if (m.type() === 'error' || m.type() === 'warning') problems.push(`[${who}] console.${m.type()}: ${m.text()}`);
    });
    page.on('dialog', async (d) => {
        const i = expectedAlerts.indexOf(d.message());
        if (i >= 0) expectedAlerts.splice(i, 1); else problems.push(`[${who}] alert: ${d.message()}`);
        await d.accept();
    });
    return page;
}

// Waits for an alert with this message, raised by action.
async function expectAlert(page, message, action) {
    expectedAlerts.push(message);
    await Promise.all([page.waitForEvent('dialog', (d) => d.message() === message), action()]);
}

async function register(page, name) {
    await page.goto('/register');
    const inputs = page.locator('input.MuiInputBase-input');
    await expect(inputs).toHaveCount(3);
    await inputs.nth(0).fill(name);
    await inputs.nth(1).fill(PASSWORD);
    await inputs.nth(2).fill(PASSWORD);
    await page.setInputFiles('#upload-image', RED);
    await page.getByRole('button', { name: 'Submit' }).click();
}

async function login(page, name, password = PASSWORD) {
    const inputs = page.locator('input.MuiInputBase-input');
    await expect(inputs).toHaveCount(2);
    await inputs.nth(0).fill(name);
    await inputs.nth(1).fill(password);
    await page.getByRole('button', { name: 'Submit' }).click();
}

// Typing in the middle of a controlled field must not move the caret to the end.
async function expectCaretStays(page, field) {
    for (const delay of [0, 40]) {
        await field.fill('abcdef');
        await field.evaluate((el) => { el.focus(); el.setSelectionRange(3, 3); });
        await page.keyboard.type('XY', { delay });
        await expect(field).toHaveValue('abcXYdef');
        expect(await field.evaluate((el) => el.selectionStart)).toBe(5);
    }
    await field.fill('');
}

// The field names of a node as stored on the relay (read by a fresh gun instance
// without local storage or WebRTC peers), or null if the node is missing.
async function storedFields(page, path) {
    return page.evaluate(async (path) => {
        const gun = window.Gun({ peers: ['http://localhost:8001/gun'], localStorage: false, RTCPeerConnection: false });
        const node = await new Promise((resolve) => {
            path.reduce((n, key) => n.get(key), gun).once(resolve);
            setTimeout(() => resolve(null), 5000);
        });
        return node ? Object.keys(node).filter((k) => k !== '_').sort() : null;
    }, path);
}

// The public key an alias resolves to in gun's account system.
async function resolvePub(page, alias) {
    return page.evaluate(async (alias) => {
        const gun = window.Gun({ peers: ['http://localhost:8001/gun'], localStorage: false, RTCPeerConnection: false });
        const node = await new Promise((resolve) => {
            gun.get('~@' + alias).once(resolve);
            setTimeout(() => resolve(null), 5000);
        });
        const key = node && Object.keys(node).find((k) => k.startsWith('~'));
        return key ? key.slice(1) : null;
    }, alias);
}

test('WeJure end to end', async ({ browser }) => {
    const alice = await newUser(browser, 'alice');
    const dana = await newUser(browser, 'dana');

    await test.step('alice registers, logs in, writes a bio and a post', async () => {
        await register(alice, ALICE);
        await expect(alice).toHaveURL(BASE + '/login', { timeout: 30000 });
        await expectCaretStays(alice, alice.locator('input.MuiInputBase-input').first());
        await login(alice, ALICE);
        await expect(alice).toHaveURL(BASE + '/home', { timeout: 30000 });

        await alice.goto('/user/' + ALICE);
        await alice.getByRole('button', { name: 'Edit Profile' }).click();
        await alice.getByLabel('Bio').fill('hi there');
        await alice.getByRole('button', { name: 'Save changes' }).click();
        await expect(alice.getByText('hi there')).toBeVisible();
        await alice.waitForTimeout(1000);                                       // let gun flush before navigating

        await alice.goto('/home');
        await alice.getByPlaceholder("What's on your mind?").fill('Hello World');
        await alice.getByRole('button', { name: 'Post' }).click();
        await expect(alice.getByText('Hello World').first()).toBeVisible();
    });

    await test.step('logged-out routes redirect to the title page', async () => {
        await dana.goto('/home');
        await expect(dana).toHaveURL(BASE + '/');
        await expect(dana.getByText('A decentralized social media.')).toBeVisible();
        await dana.goto('/nonsense');
        await expect(dana).toHaveURL(BASE + '/');
    });

    await test.step('dana registers and logs in', async () => {
        await dana.getByRole('link', { name: 'Sign Up' }).click();
        await expect(dana).toHaveURL(BASE + '/register');
        await expect(dana.getByText('4. Upload a profile picture')).toBeVisible();
        await register(dana, DANA);
        await expect(dana).toHaveURL(BASE + '/login', { timeout: 30000 });

        await expectAlert(dana, 'Username already exists. Please choose a different username.', () => register(dana, DANA));
        await expect(dana).toHaveURL(BASE + '/register');

        await dana.goto('/login');
        await expectAlert(dana, 'Wrong user or password.', () => login(dana, DANA, 'wrong-password'));
        await expect(dana).toHaveURL(BASE + '/login');
        await login(dana, DANA);
        await expect(dana).toHaveURL(BASE + '/home', { timeout: 30000 });

        await expect(dana.getByText(DANA, { exact: true }).first()).toBeVisible();
        const avatar = dana.locator('header img.MuiAvatar-img');
        await expect(avatar).toHaveAttribute('src', /^http:\/\/localhost:8080\/ipfs\/Qm/);
        await expect.poll(() => avatar.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    });

    await test.step('dana posts text and an image', async () => {
        const composer = dana.getByPlaceholder("What's on your mind?");
        await expectCaretStays(dana, composer);
        await composer.fill('first post');
        await dana.getByRole('button', { name: 'Post' }).click();
        await expect(dana.getByText('first post')).toBeVisible();

        await composer.fill('Hello from dana');
        await dana.setInputFiles('#upload-image', BLUE);
        await dana.getByRole('button', { name: 'Post' }).click();
        await expect(dana.getByText('Hello from dana').first()).toBeVisible();
        await expect.poll(() => dana.evaluate(() => [...document.querySelectorAll('img')]
            .some((img) => img.src.includes('/ipfs/') && !img.classList.contains('MuiAvatar-img') && img.naturalWidth > 0))).toBe(true);
        await expect(composer).toHaveValue('');
        const feed = await dana.locator('#app').innerText();
        expect(feed.indexOf('Hello from dana')).toBeLessThan(feed.indexOf('first post'));    // newest first
    });

    await test.step('dana finds alice by her exact name and follows her', async () => {
        const search = dana.getByPlaceholder('Search');
        await expectCaretStays(dana, search);
        await search.fill(ALICE);
        await search.press('Enter');
        await expect(dana).toHaveURL(BASE + '/search/' + ALICE);
        const hit = dana.locator('div.MuiBox-root', { hasText: ALICE }).last();
        await expect(hit.locator('img.MuiAvatar-img')).toHaveAttribute('src', /\/ipfs\/Qm/);
        await hit.getByRole('link', { name: 'Profile' }).click();
        await expect(dana).toHaveURL(BASE + '/user/' + ALICE);
        await expect(dana.getByText('hi there').first()).toBeVisible();
        await expect(dana.getByText('Hello World').first()).toBeVisible();
        await dana.getByRole('button', { name: 'Follow' }).click();
        await expect(dana.getByRole('button', { name: 'Unfollow' })).toBeVisible();
    });

    await test.step('post search matches text case-insensitively', async () => {
        await dana.getByRole('button', { name: 'User' }).click();               // switch to post search
        await dana.getByPlaceholder('Search').fill('HELLO');
        await dana.getByPlaceholder('Search').press('Enter');
        await expect(dana).toHaveURL(BASE + '/searchPost/HELLO');
        await expect(dana.getByText('Hello World').first()).toBeVisible();
        await expect(dana.getByText('Hello from dana').first()).toBeVisible();
        await expect(dana.getByText('first post')).toHaveCount(0);
    });

    await test.step("the feed includes followed users' posts", async () => {
        await dana.locator('header a').first().click();                         // logo
        await expect(dana).toHaveURL(BASE + '/home');
        await expect(dana.getByText('Hello World').first()).toBeVisible();
    });

    await test.step('dana messages alice', async () => {
        await dana.goto('/user/' + ALICE);
        await expect(dana.getByRole('button', { name: 'Unfollow' })).toBeVisible();  // profile loaded; the follow survived a reload
        await dana.getByRole('link', { name: 'Message' }).last().click();
        await expect(dana).toHaveURL(BASE + '/chat');
        await expect(dana.locator('h6', { hasText: ALICE })).toBeVisible();
        const contacts = dana.locator('ul');
        await expect(contacts.getByText(ALICE, { exact: true })).toBeVisible();

        const input = dana.getByPlaceholder('Type your message...');
        await expectCaretStays(dana, input);
        await input.fill('hi alice, from dana');
        await input.press('Enter');
        await expect(dana.getByText('hi alice, from dana')).toBeVisible();
        await expect(dana.getByText('You', { exact: true }).first()).toBeVisible();
        await expect(input).toHaveValue('');
        await input.fill('second one');
        await dana.getByRole('button', { name: 'Send' }).click();
        await expect(dana.getByText('second one')).toBeVisible();
        const chat = await dana.locator('#app').innerText();
        expect(chat.indexOf('hi alice, from dana')).toBeLessThan(chat.indexOf('second one'));
        await expect(contacts.getByText(/^Today /)).toBeVisible();            // the contact's last_message_time
    });

    await test.step('dana edits her profile and deletes a post', async () => {
        await dana.goto('/user/' + DANA);
        await dana.getByRole('button', { name: 'Edit Profile' }).click();
        await expectCaretStays(dana, dana.getByLabel('Bio'));
        await dana.getByLabel('Bio').fill("dana's bio");
        await dana.getByRole('button', { name: 'Save changes' }).click();
        await expect(dana.getByText("dana's bio")).toBeVisible();
        await dana.waitForTimeout(1000);

        const deletes = dana.getByRole('button', { name: 'Delete' });
        await expect(deletes).toHaveCount(2);
        await deletes.first().click();
        await expect(deletes).toHaveCount(1);
        await dana.waitForTimeout(1000);
        await dana.reload();
        await expect(dana.getByText("dana's bio")).toBeVisible();
        await expect(deletes).toHaveCount(1);
    });

    await test.step('records are stored in user space with their real field names', async () => {
        const pub = await resolvePub(dana, DANA);
        expect(pub).toBeTruthy();
        expect(await storedFields(dana, ['~' + pub, 'profile'])).toEqual(expect.arrayContaining(['alias', 'bio', 'icon_cid']));
        const postKeys = (await storedFields(dana, ['~' + pub, 'posts'])).filter((key) => /^\d+-/.test(key));
        expect(postKeys.length).toBeGreaterThan(0);
        let postFields = null;                                           // one post was deleted; find a live one
        for (const key of postKeys) {
            postFields = await storedFields(dana, ['~' + pub, 'posts', key]);
            if (postFields) break;
        }
        expect(postFields).toEqual(expect.arrayContaining(['image', 'text', 'unixtime']));
        const rooms = (await storedFields(dana, ['~' + pub, 'chats'])).filter((key) => /^[0-9a-f]{64}$/.test(key));
        expect(rooms).toHaveLength(1);
        expect(await storedFields(dana, ['~' + pub, 'chats', rooms[0]])).toEqual(expect.arrayContaining(['last_message_time', 'peer']));

        await dana.goto('/user/~' + pub);                                        // the canonical, collision-proof URL
        await expect(dana.getByText("dana's bio")).toBeVisible();
        await expect(dana.getByText(DANA, { exact: true }).last()).toBeVisible();
        await dana.goto('/user/~not-a-real-key');
        await expect(dana.getByText('User not found')).toBeVisible();
    });

    await test.step('logged-in routes and logout', async () => {
        await dana.goto('/login');
        await expect(dana).toHaveURL(BASE + '/home');
        await dana.getByRole('button', { name: 'Logout' }).click();
        await expect(dana).toHaveURL(BASE + '/');
        await dana.goto('/chat');
        await expect(dana).toHaveURL(BASE + '/');
    });

    await test.step('alice reads and answers the encrypted messages', async () => {
        await alice.goto('/home');
        await alice.getByRole('link', { name: 'Message' }).click();
        const contact = alice.locator('ul').getByText(DANA, { exact: true });
        await expect(contact).toBeVisible();
        await contact.click();
        await expect(alice.getByText('hi alice, from dana')).toBeVisible();
        await expect(alice.getByText('second one')).toBeVisible();
        const input = alice.getByPlaceholder('Type your message...');
        await input.fill('hey dana');
        await input.press('Enter');
        await expect(alice.getByText('hey dana')).toBeVisible();
    });

    expect(problems).toEqual([]);
    expect(expectedAlerts).toEqual([]);
});

// Two users, alice and dana, in separate browser contexts, through every page.
const { test, expect } = require('@playwright/test');
const relay = require('./relay');

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
        await expect(alice.locator('#app').getByText('hi there')).toBeVisible();   // the dialog is outside #app
        await alice.waitForTimeout(1000);                                       // let the relay store it before navigating

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
        await expect(dana.getByText('4. Upload a profile picture (optional)')).toBeVisible();
        await register(dana, DANA);
        await expect(dana).toHaveURL(BASE + '/login', { timeout: 30000 });

        await expectAlert(dana, 'Username already exists. Please choose a different username.', () => register(dana, DANA));
        await expect(dana).toHaveURL(BASE + '/register');

        await dana.goto('/login');
        await expectAlert(dana, 'Wrong username or password.', () => login(dana, DANA, 'wrong-password'));
        await expect(dana).toHaveURL(BASE + '/login');
        await login(dana, DANA);
        await expect(dana).toHaveURL(BASE + '/home', { timeout: 30000 });

        await expect(dana.getByText(DANA, { exact: true }).first()).toBeVisible();
        const avatar = dana.locator('header img.MuiAvatar-img');
        await expect(avatar).toHaveAttribute('src', /^blob:/);                  // fetched and checked against its hash
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
            .some((img) => img.src.startsWith('blob:') && !img.classList.contains('MuiAvatar-img') && img.naturalWidth > 0))).toBe(true);
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
        await expect(hit.locator('img.MuiAvatar-img')).toHaveAttribute('src', /^blob:/);
        await hit.getByRole('link', { name: 'Profile' }).click();
        await expect(dana).toHaveURL(/\/user\/~[0-9a-f]{64}$/);                  // the account, not the name
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
        await expect(contacts.getByText(/^Today /)).toBeVisible();            // the time of the last message
    });

    await test.step('dana edits her profile and deletes a post', async () => {
        await dana.goto('/user/' + DANA);
        await dana.getByRole('button', { name: 'Edit Profile' }).click();
        await expectCaretStays(dana, dana.getByLabel('Bio'));
        await dana.getByLabel('Bio').fill("dana's bio");
        await dana.getByRole('button', { name: 'Save changes' }).click();
        await expect(dana.locator('#app').getByText("dana's bio")).toBeVisible();
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

    await test.step('the relay holds signed records, and messages it cannot read', async () => {
        const pk = await relay.pubkeyOf(DANA);
        const [profile] = await relay.query({ kinds: [0], authors: [pk] });
        expect(JSON.parse(profile.content)).toEqual(expect.objectContaining({ name: DANA, about: "dana's bio" }));
        expect(JSON.parse(profile.content).picture).toMatch(/^[0-9a-f]{64}$/);
        expect(await relay.postTexts(DANA)).toEqual(['first post']);              // the newer one was deleted
        const wraps = await relay.query({ kinds: [1059], '#p': [pk] });
        expect(wraps.length).toBeGreaterThan(0);
        expect(wraps.every((e) => e.pubkey !== pk && !e.content.includes('second one'))).toBe(true);

        await dana.goto('/user/~' + pk);                                         // the canonical, collision-proof URL
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

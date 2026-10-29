// Data-ownership specs: what an attacker must NOT be able to do to another
// user's data. Today every one of these attacks succeeds, because application
// data lives in plain shared gun nodes keyed by username (profile.js, post.js)
// with nothing tying a write to the owner's key pair. Each test therefore
// asserts the desired behavior and is marked test.fail(): the suite stays
// green, and once ownership is enforced Playwright reports the tests as
// "expected to fail, but passed", forcing the annotations off one by one.
//
// The attacker is an anonymous gun client: a page that never logs in, writing
// through a fresh gun instance connected to the test relay. The last test runs
// the same attack from a logged-in account; with today's data model both
// reduce to the same unauthenticated put, but after the fix that test should
// be upgraded to write through the attacker's real authenticated client, to
// pin that a valid signature from the WRONG user is also rejected.
const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:8020';
const RELAY = 'http://localhost:8001/gun';
const N = String(Date.now() % 1000000);
const VICTIM = 'victim' + N;
const MALLORY = 'mallory' + N;
const PASSWORD = 'password123';

const RED = {
    name: 'red.png', mimeType: 'image/png',
    buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKklEQVR4nGO4Y2NDU8QwasGoBaMWjFowasGoBaMWjFowasGoBaMWDBULAG93UEwao5ERAAAAAElFTkSuQmCC', 'base64'),
};

async function register(page, name) {
    await page.goto('/register');
    const inputs = page.locator('input.MuiInputBase-input');
    await expect(inputs).toHaveCount(3);
    await inputs.nth(0).fill(name);
    await inputs.nth(1).fill(PASSWORD);
    await inputs.nth(2).fill(PASSWORD);
    await page.setInputFiles('#upload-image', RED);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL(BASE + '/login', { timeout: 30000 });
}

async function login(page, name) {
    const inputs = page.locator('input.MuiInputBase-input');
    await expect(inputs).toHaveCount(2);
    await inputs.nth(0).fill(name);
    await inputs.nth(1).fill(PASSWORD);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL(BASE + '/home', { timeout: 30000 });
}

// Writes value at path on the relay through a fresh gun instance that never
// authenticated, exactly as deletePost/updateBio do for the logged-in user.
// Resolves with the ack's error, or null once the relay acknowledged the write.
function anonPut(page, path, value) {
    return page.evaluate(({ path, value, relay }) => new Promise((resolve) => {
        const gun = window.Gun({ peers: [relay], localStorage: false });
        path.reduce((n, k) => n.get(k), gun).put(value, (ack) => resolve(ack.err || null));
        setTimeout(() => resolve('timeout: no ack'), 5000);
    }), { path, value, relay: RELAY });
}

// The value at path as stored on the relay, read by a fresh gun instance;
// null when the node is missing or tombstoned.
function stored(page, path) {
    return page.evaluate(({ path, relay }) => new Promise((resolve) => {
        const gun = window.Gun({ peers: [relay], localStorage: false });
        path.reduce((n, k) => n.get(k), gun).once((v) => resolve(v === undefined ? null : v));
        setTimeout(() => resolve(null), 5000);
    }), { path, relay: RELAY });
}

// The field names of the node at path, meta key excluded.
function storedKeys(page, path) {
    return page.evaluate(({ path, relay }) => new Promise((resolve) => {
        const gun = window.Gun({ peers: [relay], localStorage: false });
        path.reduce((n, k) => n.get(k), gun).once((node) => resolve(node ? Object.keys(node).filter((k) => k !== '_') : []));
        setTimeout(() => resolve([]), 5000);
    }), { path, relay: RELAY });
}

let victim;         // the victim's logged-in page
let attacker;       // a page that loaded the app but never logged in
let postKey;        // the key of the victim's one real post

test.beforeAll(async ({ browser }) => {
    const victimContext = await browser.newContext({ baseURL: BASE, viewport: { width: 1400, height: 900 } });
    victim = await victimContext.newPage();
    victim.on('dialog', (d) => d.accept());
    await register(victim, VICTIM);
    await login(victim, VICTIM);

    await victim.getByPlaceholder("What's on your mind?").fill('victim post');
    await victim.getByRole('button', { name: 'Post' }).click();
    await expect(victim.getByText('victim post')).toBeVisible();

    await victim.goto('/user/' + VICTIM);
    await victim.getByRole('button', { name: 'Edit Profile' }).click();
    await victim.getByLabel('Bio').fill('original bio');
    await victim.getByRole('button', { name: 'Save changes' }).click();
    await expect(victim.getByText('original bio')).toBeVisible();
    await victim.waitForTimeout(1000);                                          // let gun flush

    const attackerContext = await browser.newContext({ baseURL: BASE, viewport: { width: 1400, height: 900 } });
    attacker = await attackerContext.newPage();
    await attacker.goto('/');                                                   // loads the app; stays logged out

    postKey = (await storedKeys(attacker, ['post/' + VICTIM])).find((k) => k.includes('GMT'));
    expect(postKey).toBeTruthy();
});

test.afterAll(async () => {
    await victim?.context().close();
    await attacker?.context().close();
});

test("an anonymous client cannot overwrite another user's bio", async () => {
    test.fail(true, 'known hole: user/<name>/bio is writable by anyone (profile.js updateBio)');
    await anonPut(attacker, ['user', VICTIM, 'bio'], 'hacked bio');
    await attacker.waitForTimeout(1000);
    expect(await stored(attacker, ['user', VICTIM, 'bio'])).toBe('original bio');
    await victim.goto('/user/' + VICTIM);
    await expect(victim.getByText('original bio')).toBeVisible();
    await expect(victim.getByText('hacked bio')).toHaveCount(0);
});

test("an anonymous client cannot delete another user's post", async () => {
    test.fail(true, 'known hole: post/<name>/<key> accepts a null put from anyone (post.js deletePost)');
    await anonPut(attacker, ['post/' + VICTIM, postKey], null);
    await attacker.waitForTimeout(1000);
    expect(await stored(attacker, ['post/' + VICTIM, postKey, 'text'])).toBe('victim post');
});

test('an anonymous client cannot forge a post as another user', async () => {
    test.fail(true, 'known hole: post/<name> accepts posts from anyone (post.js storePost)');
    const forgedKey = 'Mon, 01 Jan 2024 00:00:00 GMT';
    await anonPut(attacker, ['post/' + VICTIM, forgedKey], {
        username: VICTIM,
        timestamp: forgedKey,
        text: 'forged post',
        image: null,
        unixtime: 1704067200000,
    });
    await attacker.waitForTimeout(1000);
    expect(await stored(attacker, ['post/' + VICTIM, forgedKey, 'text'])).toBe(null);
    await victim.goto('/user/' + VICTIM);
    await expect(victim.getByText('victim post')).toBeVisible();                // profile loaded
    await expect(victim.getByText('forged post')).toHaveCount(0);
});

test('an anonymous client cannot change who another user follows', async () => {
    test.fail(true, 'known hole: user/<name>/is_following is writable by anyone (profile.js followUser)');
    await anonPut(attacker, ['user', VICTIM, 'is_following', MALLORY], true);
    await attacker.waitForTimeout(1000);
    expect(await stored(attacker, ['user', VICTIM, 'is_following', MALLORY])).not.toBe(true);
});

test("another logged-in user cannot overwrite the victim's profile or posts", async () => {
    test.fail(true, 'known hole: being logged in grants no more and no less than anonymous access');
    const malloryContext = await victim.context().browser().newContext({ baseURL: BASE, viewport: { width: 1400, height: 900 } });
    const mallory = await malloryContext.newPage();
    mallory.on('dialog', (d) => d.accept());
    try {
        await register(mallory, MALLORY);
        await login(mallory, MALLORY);
        // After the ownership fix, rewrite these to go through mallory's real
        // authenticated client: a correctly signed write by the wrong user.
        await anonPut(mallory, ['user', VICTIM, 'bio'], 'mallory was here');
        await anonPut(mallory, ['user', VICTIM, 'blacklist', MALLORY], true);
        await mallory.waitForTimeout(1000);
        expect(await stored(mallory, ['user', VICTIM, 'bio'])).toBe('original bio');
        expect(await stored(mallory, ['user', VICTIM, 'blacklist', MALLORY])).not.toBe(true);
    } finally {
        await malloryContext.close();
    }
});

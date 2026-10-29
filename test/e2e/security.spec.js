// Data-ownership specs: what an attacker must NOT be able to do to another
// user's data. Application data lives in SEA user spaces (~<pub>), so writes
// are signed and anything not signed by the owner is rejected - by the
// attacker's own gun, by the relay (which loads SEA) and by every reader.
//
// The attackers: an anonymous gun client (a page that never logs in, writing
// through a fresh gun instance connected to the test relay), and a logged-in
// account whose writes are correctly signed but by the wrong user. A last test
// checks that the relay refuses the legacy pre-ownership nodes outright.
const crypto = require('crypto');
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
    await page.waitForFunction(() => typeof window.Gun === 'function');     // login reloads the page
}

// Writes value at path through a fresh gun instance that never authenticated.
// Resolves with the ack's error (SEA usually rejects at the source), or null.
function anonPut(page, path, value) {
    return page.evaluate(({ path, value, relay }) => new Promise((resolve) => {
        const gun = window.Gun({ peers: [relay], localStorage: false });
        path.reduce((n, k) => n.get(k), gun).put(value, (ack) => resolve(ack.err ? String(ack.err) : null));
        setTimeout(() => resolve('timeout: no ack'), 5000);
    }), { path, value, relay: RELAY });
}

// The same write through a client authenticated as alias: a correctly signed
// put, just by the wrong user. The app hashes passwords before SEA sees them.
function authedPut(page, alias, path, value) {
    const hashed = crypto.createHash('sha256').update(PASSWORD).digest('hex');
    return page.evaluate(({ alias, hashed, path, value, relay }) => new Promise((resolve) => {
        const gun = window.Gun({ peers: [relay], localStorage: false });
        gun.user().auth(alias, hashed, (ack) => {
            if (ack.err) { resolve('auth failed: ' + ack.err); return; }
            path.reduce((n, k) => n.get(k), gun).put(value, (a) => resolve(a.err ? String(a.err) : null));
            setTimeout(() => resolve('timeout: no ack'), 5000);
        });
        setTimeout(() => resolve('timeout: no auth'), 10000);
    }), { alias, hashed, path, value, relay: RELAY });
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

async function resolvePub(page, alias) {
    const keys = await storedKeys(page, ['~@' + alias]);
    const key = keys.find((k) => k.startsWith('~'));
    return key ? key.slice(1) : null;
}

let victim;         // the victim's logged-in page
let attacker;       // a page that loaded the app but never logged in
let victimPub;      // the victim's public key
let postKey;        // the key of the victim's one real post

test.beforeAll(async ({ browser }) => {
    const victimContext = await browser.newContext({ baseURL: BASE, viewport: { width: 1400, height: 900 } });
    victim = await victimContext.newPage();
    victim.on('dialog', (d) => d.accept());
    await register(victim, VICTIM);
    await login(victim, VICTIM);
    victimPub = await resolvePub(victim, VICTIM);
    expect(victimPub).toBeTruthy();

    await victim.getByPlaceholder("What's on your mind?").fill('victim post');
    await victim.getByRole('button', { name: 'Post' }).click();
    await expect(victim.getByText('victim post')).toBeVisible();
    // The composer does not wait for the relay's ack yet, so wait for the post
    // to be stored before the next navigation reloads the page.
    await expect.poll(async () => (await storedKeys(victim, ['~' + victimPub, 'posts'])).find((k) => /^\d+-/.test(k)))
        .toBeTruthy();

    await victim.goto('/user/' + VICTIM);
    await victim.getByRole('button', { name: 'Edit Profile' }).click();
    await victim.getByLabel('Bio').fill('original bio');
    await victim.getByRole('button', { name: 'Save changes' }).click();
    await expect(victim.getByText('original bio')).toBeVisible();
    await victim.waitForTimeout(1000);                                          // let gun flush

    const attackerContext = await browser.newContext({ baseURL: BASE, viewport: { width: 1400, height: 900 } });
    attacker = await attackerContext.newPage();
    await attacker.goto('/');                                                   // loads the app; stays logged out

    postKey = (await storedKeys(attacker, ['~' + victimPub, 'posts'])).find((k) => /^\d+-/.test(k));
    expect(postKey).toBeTruthy();
});

test.afterAll(async () => {
    await victim?.context().close();
    await attacker?.context().close();
});

test("an anonymous client cannot overwrite another user's bio", async () => {
    await anonPut(attacker, ['~' + victimPub, 'profile', 'bio'], 'hacked bio');
    await attacker.waitForTimeout(1000);
    expect(await stored(attacker, ['~' + victimPub, 'profile', 'bio'])).toBe('original bio');
    await victim.goto('/user/' + VICTIM);
    await expect(victim.getByText('original bio')).toBeVisible();
    await expect(victim.getByText('hacked bio')).toHaveCount(0);
});

test("an anonymous client cannot delete another user's post", async () => {
    await anonPut(attacker, ['~' + victimPub, 'posts', postKey], null);
    await attacker.waitForTimeout(1000);
    expect(await stored(attacker, ['~' + victimPub, 'posts', postKey, 'text'])).toBe('victim post');
});

test('an anonymous client cannot forge a post as another user', async () => {
    const forgedKey = '1700000000000-forged';
    await anonPut(attacker, ['~' + victimPub, 'posts', forgedKey], {
        text: 'forged post',
        image: null,
        unixtime: 1700000000000,
    });
    await attacker.waitForTimeout(1000);
    expect(await stored(attacker, ['~' + victimPub, 'posts', forgedKey, 'text'])).toBe(null);
    await victim.goto('/user/' + VICTIM);
    await expect(victim.getByText('victim post')).toBeVisible();                // profile loaded
    await expect(victim.getByText('forged post')).toHaveCount(0);
});

test('an anonymous client cannot change who another user follows', async () => {
    await anonPut(attacker, ['~' + victimPub, 'follows', 'some-pub'], true);
    await attacker.waitForTimeout(1000);
    expect(await stored(attacker, ['~' + victimPub, 'follows', 'some-pub'])).not.toBe(true);
});

test("another logged-in user's signed writes cannot touch the victim's space", async () => {
    const malloryContext = await victim.context().browser().newContext({ baseURL: BASE, viewport: { width: 1400, height: 900 } });
    const mallory = await malloryContext.newPage();
    mallory.on('dialog', (d) => d.accept());
    try {
        await register(mallory, MALLORY);
        await mallory.goto('/');
        await authedPut(mallory, MALLORY, ['~' + victimPub, 'profile', 'bio'], 'mallory was here');
        await authedPut(mallory, MALLORY, ['~' + victimPub, 'follows', 'some-pub'], true);
        await mallory.waitForTimeout(1000);
        expect(await stored(mallory, ['~' + victimPub, 'profile', 'bio'])).toBe('original bio');
        expect(await stored(mallory, ['~' + victimPub, 'follows', 'some-pub'])).not.toBe(true);
    } finally {
        await malloryContext.close();
    }
});

test('the relay refuses the legacy shared nodes', async () => {
    await anonPut(attacker, ['user', VICTIM, 'bio'], 'legacy write');
    await anonPut(attacker, ['post/' + VICTIM, 'some-key'], 'legacy post');
    await attacker.waitForTimeout(1000);
    expect(await stored(attacker, ['user', VICTIM, 'bio'])).toBe(null);
    expect(await stored(attacker, ['post/' + VICTIM, 'some-key'])).toBe(null);
});

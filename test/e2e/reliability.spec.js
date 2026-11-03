// Reliability specs: the configured relays are the ones used, posts confirmed
// by the relay, deletions that reach other users, and chat subscriptions that
// end with the chat page.
const { test, expect } = require('@playwright/test');
const relay = require('./relay');

const BASE = 'http://localhost:8020';
const N = String(Date.now() % 1000000);
const PASSWORD = 'password123';

const RED = {
    name: 'red.png', mimeType: 'image/png',
    buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKklEQVR4nGO4Y2NDU8QwasGoBaMWjFowasGoBaMWjFowasGoBaMWDBULAG93UEwao5ERAAAAAElFTkSuQmCC', 'base64'),
};

async function newPage(browser) {
    const context = await browser.newContext({ baseURL: BASE, viewport: { width: 1400, height: 900 } });
    return context.newPage();
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
    await expect(page).toHaveURL(BASE + '/login', { timeout: 30000 });
}

async function login(page, name) {
    const inputs = page.locator('input.MuiInputBase-input');
    await expect(inputs).toHaveCount(2);
    await inputs.nth(0).fill(name);
    await inputs.nth(1).fill(PASSWORD);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL(BASE + '/home', { timeout: 30000 });
    await expect(page.getByPlaceholder("What's on your mind?")).toBeVisible();   // login reloads the page
}

async function follow(page, name) {
    await page.goto('/user/' + name);
    await page.getByRole('button', { name: 'Follow' }).click();
    await expect(page.getByRole('button', { name: 'Unfollow' })).toBeVisible();
}

// Opens the chat with name from their profile page (the page's own Message
// button; the nav bar has a Message link too).
async function openChat(page, name) {
    await page.goto('/user/' + name);
    await expect(page.getByRole('button', { name: 'Unfollow' })).toBeVisible();
    await page.getByRole('link', { name: 'Message' }).last().click();
    await expect(page.locator('h6', { hasText: name })).toBeVisible();
}

async function send(page, text) {
    const input = page.getByPlaceholder('Type your message...');
    await input.fill(text);
    await input.press('Enter');
    await expect(page.getByText(text)).toBeVisible();
}

// Client-side navigation to the feed (the logo), which unmounts the current
// page without reloading the app.
async function goHome(page) {
    await page.locator('header a').first().click();
    await expect(page).toHaveURL(BASE + '/home');
}

test('the app uses the relays and media servers listed in config.js', async ({ browser }) => {
    const context = await browser.newContext({ baseURL: BASE, viewport: { width: 1400, height: 900 } });
    // The same server under another name: if the app used the page's own
    // origin instead of the configuration, it would connect to localhost.
    await context.route('**/config.js', (route) => route.fulfill({
        contentType: 'text/javascript',
        body: 'window.WEJURE_CONFIG = { relays: ["ws://127.0.0.1:8020"], mediaServers: ["http://127.0.0.1:8020"] };',
    }));
    const page = await context.newPage();
    const sockets = [];
    page.on('websocket', (ws) => sockets.push(ws.url()));
    const uploads = [];
    page.on('request', (r) => { if (r.method() === 'PUT') uploads.push(r.url()); });
    await register(page, 'configured' + N);
    await login(page, 'configured' + N);
    expect(sockets.length).toBeGreaterThan(0);
    expect(sockets.every((url) => url.startsWith('ws://127.0.0.1:8020'))).toBe(true);
    expect(uploads.length).toBeGreaterThan(0);                                // the profile picture
    expect(uploads.every((url) => url.startsWith('http://127.0.0.1:8020/'))).toBe(true);
    await context.close();
});

test('a post the relay does not confirm stays in the composer', async ({ browser }) => {
    const writer = 'writer' + N;
    const context = await browser.newContext({ baseURL: BASE, viewport: { width: 1400, height: 900 } });
    // The relay is the page's only relay, and the test can cut it off: while
    // offline, nothing the page sends reaches it.
    let online = true;
    await context.routeWebSocket(/localhost:8020/, (ws) => {
        const server = ws.connectToServer();
        ws.onMessage((message) => { if (online) server.send(message); });
        server.onMessage((message) => ws.send(message));
    });
    const page = await context.newPage();
    await register(page, writer);
    await login(page, writer);
    const composer = page.getByPlaceholder("What's on your mind?");
    const card = (text) => page.locator('.MuiPaper-root', { hasText: text });   // getByText also sees the composer

    await composer.fill('confirmed post');
    await page.getByRole('button', { name: 'Post' }).click();
    await expect(composer).toHaveValue('');
    await expect(card('confirmed post')).toBeVisible();
    await expect(page.getByText('Sending…')).toHaveCount(0);

    online = false;
    await composer.fill('retried post');
    await page.getByRole('button', { name: 'Post' }).click();
    await expect(page.getByText('Sending…')).toBeVisible();
    await expect(page.getByText(/^The post was not saved:/)).toBeVisible({ timeout: 20000 });
    await expect(composer).toHaveValue('retried post');
    await expect(page.getByText('Sending…')).toHaveCount(0);
    await expect(card('retried post')).toHaveCount(0);                       // the unconfirmed post was withdrawn

    online = true;
    await page.getByRole('button', { name: 'Post' }).click();
    await expect(composer).toHaveValue('');
    await expect(card('retried post')).toBeVisible();
    await expect(page.getByText(/was not saved/)).toHaveCount(0);
    expect(await relay.postTexts(writer)).toEqual(['confirmed post', 'retried post']);
    await context.close();
});

test("a deleted post disappears from followers' feeds without a reload", async ({ browser }) => {
    const author = 'author' + N;
    const reader = 'reader' + N;
    const authorPage = await newPage(browser);
    const readerPage = await newPage(browser);
    await register(authorPage, author);
    await login(authorPage, author);
    await register(readerPage, reader);
    await login(readerPage, reader);

    const composer = authorPage.getByPlaceholder("What's on your mind?");
    for (const text of ['short-lived post', 'lasting post']) {
        await composer.fill(text);
        await authorPage.getByRole('button', { name: 'Post' }).click();
        await expect(composer).toHaveValue('');
    }

    await follow(readerPage, author);
    await goHome(readerPage);
    await expect(readerPage.getByText('short-lived post')).toBeVisible();
    await expect(readerPage.getByText('lasting post')).toBeVisible();

    await authorPage.locator('.MuiPaper-root', { hasText: 'short-lived post' })
        .getByRole('button', { name: 'Delete' }).click();
    await expect(readerPage.getByText('short-lived post')).toHaveCount(0);
    await expect(readerPage.getByText('lasting post')).toBeVisible();
    await authorPage.context().close();
    await readerPage.context().close();
});

test('leaving the chat page stops its subscription to incoming messages', async ({ browser }) => {
    const talker = 'talker' + N;
    const listener = 'listener' + N;
    const talkerPage = await newPage(browser);
    const listenerContext = await browser.newContext({ baseURL: BASE, viewport: { width: 1400, height: 900 } });
    // Counts the gift-wrapped messages (kind 1059) the relay pushes to the
    // listener's page. The page subscribes with limit 0 for new ones only.
    let wrapsPushed = 0;
    await listenerContext.routeWebSocket(/localhost:8020/, (ws) => {
        const server = ws.connectToServer();
        ws.onMessage((message) => server.send(message));
        server.onMessage((message) => {
            try {
                const [type, , event] = JSON.parse(message);
                if (type === 'EVENT' && event?.kind === 1059) wrapsPushed++;
            } catch { /* not JSON */ }
            ws.send(message);
        });
    });
    const listenerPage = await listenerContext.newPage();
    await register(talkerPage, talker);
    await login(talkerPage, talker);
    await register(listenerPage, listener);
    await login(listenerPage, listener);
    await follow(talkerPage, listener);
    await follow(listenerPage, talker);

    await openChat(talkerPage, listener);
    await openChat(listenerPage, talker);
    await send(talkerPage, 'one');
    await expect(listenerPage.getByText('one', { exact: true })).toBeVisible();

    await goHome(listenerPage);
    // Still the same page: a reload would end every subscription trivially.
    await listenerPage.waitForTimeout(500);
    const before = wrapsPushed;
    await send(talkerPage, 'two');
    await listenerPage.waitForTimeout(2000);
    // once, to the session's copy of its gift wraps (sync.js), which stays
    // subscribed while the page lives; pages only listen to it
    expect(wrapsPushed - before).toBe(1);

    // Reopening the conversation reads it in full, each message once.
    await listenerPage.getByRole('link', { name: 'Message' }).click();
    await listenerPage.locator('ul').getByText(talker, { exact: true }).click();
    await expect(listenerPage.getByText('two', { exact: true })).toBeVisible();
    await expect(listenerPage.getByText('one', { exact: true })).toHaveCount(1);
    await expect(listenerPage.getByText('two', { exact: true })).toHaveCount(1);
    await talkerPage.context().close();
    await listenerContext.close();
});

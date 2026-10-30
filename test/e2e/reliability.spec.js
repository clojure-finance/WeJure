// Reliability specs: posts confirmed by the relay, deletions that reach other
// users, and chat subscriptions that end with the conversation.
const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:8020';
const RELAY = 'http://localhost:8001/gun';
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
    await page.waitForFunction(() => typeof window.Gun === 'function');     // login reloads the page
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

// The texts of the live posts in a user's space as stored on the relay, read
// by a fresh gun instance that talks to the relay only.
function storedPostTexts(page, alias) {
    return page.evaluate(({ alias, relay }) => {
        const gun = window.Gun({ peers: [relay], localStorage: false, RTCPeerConnection: false });
        const once = (chain) => new Promise((resolve) => {
            chain.once((v) => resolve(v === undefined ? null : v));
            setTimeout(() => resolve(null), 5000);
        });
        return (async () => {
            const account = await once(gun.get('~@' + alias));
            const pub = Object.keys(account || {}).find((k) => k.startsWith('~'));
            const posts = await once(gun.get(pub).get('posts'));
            const texts = [];
            for (const key of Object.keys(posts || {}).filter((k) => /^\d+-/.test(k))) {
                const post = await once(gun.get(pub).get('posts').get(key));
                if (post) texts.push(post.text);
            }
            return texts.sort();
        })();
    }, { alias, relay: RELAY });
}

test('a post the relay does not confirm stays in the composer', async ({ browser }) => {
    const writer = 'writer' + N;
    const context = await browser.newContext({ baseURL: BASE, viewport: { width: 1400, height: 900 } });
    // The relay is this page's only peer, and the test can cut it off: while
    // offline, nothing the page sends reaches the relay.
    await context.addInitScript(() => {
        window.RTCPeerConnection = undefined;
        window.webkitRTCPeerConnection = undefined;
    });
    let online = true;
    await context.routeWebSocket(/localhost:8001\/gun/, (ws) => {
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
    await expect(page.getByText('Your post could not be saved: No answer from the relay.')).toBeVisible({ timeout: 20000 });
    await expect(composer).toHaveValue('retried post');
    await expect(page.getByText('Sending…')).toHaveCount(0);
    await expect(card('retried post')).toHaveCount(0);                       // the unconfirmed post was withdrawn

    online = true;
    await page.getByRole('button', { name: 'Post' }).click();
    await expect(composer).toHaveValue('');
    await expect(card('retried post')).toBeVisible();
    await expect(page.getByText(/could not be saved/)).toHaveCount(0);
    expect(await storedPostTexts(page, writer)).toEqual(['confirmed post', 'retried post']);
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

test('leaving a conversation stops decrypting its messages', async ({ browser }) => {
    const talker = 'talker' + N;
    const listener = 'listener' + N;
    const talkerPage = await newPage(browser);
    const listenerPage = await newPage(browser);
    await register(talkerPage, talker);
    await login(talkerPage, talker);
    await register(listenerPage, listener);
    await login(listenerPage, listener);
    await follow(talkerPage, listener);
    await follow(listenerPage, talker);

    await openChat(talkerPage, listener);
    await openChat(listenerPage, talker);
    // Counts the listener page's decryptions; the open conversation is what
    // decrypts incoming messages.
    await listenerPage.evaluate(() => {
        const SEA = window.Gun.SEA;
        const decrypt = SEA.decrypt;
        window.decryptions = 0;
        SEA.decrypt = function (...args) {
            window.decryptions++;
            return decrypt.apply(this, args);
        };
    });
    await send(talkerPage, 'one');
    await expect(listenerPage.getByText('one', { exact: true })).toBeVisible();
    expect(await listenerPage.evaluate(() => window.decryptions)).toBeGreaterThan(0);

    await goHome(listenerPage);
    await listenerPage.evaluate(() => { window.decryptions = 0; });
    await send(talkerPage, 'two');
    await listenerPage.waitForTimeout(2000);
    expect(await listenerPage.evaluate(() => window.decryptions)).toBe(0);

    // Reopening the conversation reads it in full, each message once.
    await listenerPage.getByRole('link', { name: 'Message' }).click();
    await listenerPage.locator('ul').getByText(talker, { exact: true }).click();
    await expect(listenerPage.getByText('two', { exact: true })).toBeVisible();
    await expect(listenerPage.getByText('one', { exact: true })).toHaveCount(1);
    await expect(listenerPage.getByText('two', { exact: true })).toHaveCount(1);
    await talkerPage.context().close();
    await listenerPage.context().close();
});

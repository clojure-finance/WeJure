// app.js, the screens' side, in an app that does not load a new page after
// logging in or out (the mobile app): registering, logging in and logging out
// leave no relay connection open but the session's own.
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { useWebSocketImplementation } from 'nostr-tools/pool';
import WebSocket from 'ws';
import { crashAll, startAll, wejureServer } from './harness.js';
import * as app from 'wejure-nostr/app.js';

const server = wejureServer(7191);

// The sockets the relay pools open that have not closed yet (ws, as in harness.js).
const sockets = new Set();
useWebSocketImplementation(class extends WebSocket {
    constructor(...args) {
        super(...args);
        sockets.add(this);
        this.addEventListener('close', () => sockets.delete(this));
    }
});

// What the browser provides: the tab's storage (session.js), the site's servers.
const storage = new Map();
globalThis.sessionStorage = {
    getItem: (k) => storage.get(k) ?? null,
    setItem: (k, v) => { storage.set(k, String(v)); },
    removeItem: (k) => { storage.delete(k); },
};
globalThis.WEJURE_CONFIG = { relays: [server.url], mediaServers: [server.http] };

// Waits for sockets closed just now to report it.
const settle = (ms = 300) => new Promise((r) => setTimeout(r, ms));

describe('app.js connections', () => {
    const stops = [];
    before(() => startAll([server]));
    after(async () => {
        stops.forEach((stop) => stop());
        app.logout();
        await crashAll([server]);
    });

    test('registering leaves no connection open', async () => {
        assert.equal(await app.register('alice', 'alice-pw', null), null);
        assert.equal(await app.register('alice', 'other-pw', null), 'Username already exists. Please choose a different username.');
        await settle();
        assert.equal(sockets.size, 0);
    });

    test('a failed login leaves no connection open', async () => {
        assert.equal(await app.login('alice', 'wrong-pw'), 'Wrong username or password.');
        await settle();
        assert.equal(sockets.size, 0);
    });

    test('logging in leaves one connection open, the session\'s', async () => {
        assert.equal(await app.login('alice', 'alice-pw'), null);
        assert.equal(app.me().username, 'alice');
        await app.contacts();   // live subscriptions (mirrors)
        stops.push(app.watchPosts({ onPost: () => {}, onDelete: () => {} }));
        await settle();
        assert.equal(sockets.size, 1);
    });

    test('logging out closes it, and nothing opens a new one', async () => {
        app.logout();
        assert.equal(app.loggedIn(), false);
        await settle();
        assert.equal(sockets.size, 0);
        await settle(2500);   // the live feed's and the mirrors' retries after a dropped subscription
        assert.equal(sockets.size, 0);
    });

    test('logging in again starts a new session with its own connection', async () => {
        assert.equal(await app.login('alice', 'alice-pw'), null);
        assert.deepEqual(await app.contacts(), []);
        await settle();
        assert.equal(sockets.size, 1);
        app.logout();
        await settle();
        assert.equal(sockets.size, 0);
    });
});

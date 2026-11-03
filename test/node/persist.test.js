// Mirrors saved in the encrypted device cache (cache.js, sync.js): a page load
// reads the saved copy and fetches only what is new. IndexedDB comes from
// fake-indexeddb here; browsers have their own.
import 'fake-indexeddb/auto';
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { finalizeEvent, generateSecretKey } from 'nostr-tools/pure';
import { crashAll, startAll, wejureServer } from './harness.js';
import { KIND, createPool, publish } from 'wejure-nostr/core.js';
import { register } from 'wejure-nostr/account.js';
import { forgetCache } from 'wejure-nostr/cache.js';
import { saveMirrors, synced } from 'wejure-nostr/sync.js';
import * as C from 'wejure-nostr/communities.js';

const r1 = wejureServer(7151);
const r2 = wejureServer(7152);
const relays = [r1.url, r2.url];
const pools = [];
const now = () => Math.floor(Date.now() / 1000);
const writer = generateSecretKey();
const note = (text, created_at = now()) => finalizeEvent({ kind: KIND.POST, content: text, tags: [['t', 'saved']], created_at }, writer);
const notes = (s) => synced(s, relays, { kinds: [KIND.POST] }, '#t', ['saved']);

// The same account in a new page: same keys, nothing in memory.
function reload(s) {
    const pool = createPool();
    pools.push(pool);
    return { sk: s.sk, pk: s.pk, alias: s.alias, relays: s.relays, mediaServers: s.mediaServers, pool };
}

// Counts the events relays send to s from now on (call before s asks anything).
function countEvents(s) {
    const count = { events: 0 };
    const ensure = s.pool.ensureRelay.bind(s.pool);
    s.pool.ensureRelay = async (url, opts) => {
        const relay = await ensure(url, opts);
        if (!relay.counting) {
            const subscribe = relay.subscribe.bind(relay);
            relay.subscribe = (filters, params) => subscribe(filters, { ...params, onevent: (e) => { count.events++; params.onevent(e); } });
            relay.counting = true;
        }
        return relay;
    };
    return count;
}

describe('saved mirrors', () => {
    let alice, pool;
    before(async () => {
        await startAll([r1, r2]);
        pool = createPool();
        alice = await register(relays, 'alice', 'alice-pw');
        pools.push(pool, alice.pool);
        const old = Array.from({ length: 600 }, (_, i) => note(`old ${i}`, now() - 3600 - 2 * i));
        for (let i = 0; i < old.length; i += 100) await Promise.all(old.slice(i, i + 100).map((e) => publish(pool, relays, e)));
    });
    after(async () => {
        pools.forEach((p) => p.destroy());
        await crashAll([r1, r2]);
    });

    test('a page load reads the saved copy and fetches only what is new', async () => {
        assert.equal((await notes(alice)).length, 600);
        await saveMirrors(alice);

        await publish(pool, relays, note('new'));
        const page = reload(alice);
        const count = countEvents(page);
        const read = await notes(page);
        assert.equal(read.length, 601);
        assert.ok(read.some((e) => e.content === 'new'));
        // from each relay: the new note, and the old ones within a minute of the
        // newest it had sent (for slow clocks), about 30 of them
        assert.ok(count.events <= 2 * 35, `${count.events} events fetched`);
    });

    test('the saved copy shows nothing of what it holds or which values it follows', async () => {
        const db = await new Promise((resolve) => { const req = indexedDB.open(`wejure-${alice.pk}`); req.onsuccess = () => resolve(req.result); });
        const keys = await new Promise((resolve) => {
            const req = db.transaction('mirrored').objectStore('mirrored').getAllKeys();
            req.onsuccess = () => resolve(req.result);
        });
        db.close();
        assert.ok(keys.length > 0);
        for (const k of keys) assert.match(k, /^[0-9a-f]{64}(:[0-9a-f]{16})?$/);
    });

    test('with every relay down, a new page still opens a community from the saved copy', async () => {
        const club = await C.createCommunity(alice, { name: 'Book Club' });
        const general = C.channelByName(club, 'general');
        await C.sendMessage(club, general, 'june', 'Dune, chapter one');
        const ctx = await C.openCommunity(alice, club.ref);
        assert.equal((await C.readChannel(ctx, general)).length, 1);
        await saveMirrors(alice);

        await crashAll([r1, r2]);
        try {
            const page = reload(alice);
            const offline = await C.openCommunity(page, club.ref);
            assert.equal(offline.state.name, 'Book Club');
            assert.deepEqual((await C.readChannel(offline, general)).map((m) => m.text), ['Dune, chapter one']);
        } finally {
            await startAll([r1, r2]);
        }
    });

    test('logging out deletes the saved copy, also while another page has it open', async () => {
        const other = reload(alice);
        await notes(other);   // has the database open
        await forgetCache(alice);
        const page = reload(alice);
        const count = countEvents(page);
        assert.equal((await notes(page)).length, 601);
        assert.ok(count.events >= 601, `${count.events} events fetched`);
    });
});

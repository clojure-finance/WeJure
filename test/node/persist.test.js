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
import { cacheOf, decryptAll, forgetCache } from 'wejure-nostr/cache.js';
import { older, saveMirrors, synced, watched } from 'wejure-nostr/sync.js';
import * as C from 'wejure-nostr/communities.js';

const r1 = wejureServer(7151);
const r2 = wejureServer(7152);
const relays = [r1.url, r2.url];
const pools = [];
const now = () => Math.floor(Date.now() / 1000);
const writer = generateSecretKey();
const note = (text, created_at = now()) => finalizeEvent({ kind: KIND.POST, content: text, tags: [['t', 'saved']], created_at }, writer);
const POSTS = { kinds: [KIND.POST] };
const notes = (s) => synced(s, relays, POSTS, '#t', ['saved']);
// The same notes through a paged mirror, as channels are read.
const recentNotes = (s) => synced(s, relays, POSTS, '#t', ['saved'], { paged: true });
const olderNotes = (s) => older(s, relays, POSTS, '#t', ['saved']);
const KEEP = 500;   // sync.js: what a paged mirror keeps from one page to the next
// The events in s's saved copy of a mirror bucket (named as sync.js names them).
const saved = async (s, ...name) => (await cacheOf(s).loadBucket(JSON.stringify(name))).events;
const DAY = 86400000;

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
        const envelopeId = 'ab'.repeat(32);
        await decryptAll(alice, [{ id: envelopeId }], () => ({ text: 'secret' }));
        const keysOf = (store) => new Promise((resolve) => {
            const req = db.transaction(store).objectStore(store).getAllKeys();
            req.onsuccess = () => resolve(req.result);
        });
        const [mirrored, decrypted] = [await keysOf('mirrored'), [...await keysOf('decrypted-a'), ...await keysOf('decrypted-b')]];
        db.close();
        assert.ok(mirrored.length > 0 && decrypted.length > 0);
        for (const k of mirrored) assert.match(k, /^[0-9a-f]{64}(:[0-9a-f]{16})?$/);
        // decrypted entries are keyed by an HMAC, not by the event id a relay could look up
        for (const k of decrypted) assert.match(k, /^[0-9a-f]{64}$/);
        assert.ok(!decrypted.includes(envelopeId));
    });

    test('with every relay down, a new page still opens a community, checkpoint and all, from the saved copy', async () => {
        const club = await C.createCommunity(alice, { name: 'Book Club' });
        const general = C.channelByName(club, 'general');
        await C.sendMessage(club, general, 'june', 'Dune, chapter one');
        assert.equal(await C.maintain(club, { every: 1 }), 'proposed');   // a checkpoint: its snapshot is kept too
        const ctx = await C.openCommunity(alice, club.ref);
        assert.ok(ctx.base);
        assert.equal((await C.readChannel(ctx, general)).length, 1);
        await saveMirrors(alice);

        await crashAll([r1, r2]);
        try {
            const page = reload(alice);
            const offline = await C.openCommunity(page, club.ref);
            assert.equal(offline.base?.checkpoint.id, ctx.base.checkpoint.id);
            assert.equal(offline.state.name, 'Book Club');
            assert.deepEqual((await C.readChannel(offline, general)).map((m) => m.text), ['Dune, chapter one']);
        } finally {
            await startAll([r1, r2]);
        }
    });

    test('a long channel keeps its newest messages from one page to the next, and the rest come back on scrolling up', async () => {
        const counter = { pool: createPool(), relays };   // no keys, so no saved copy
        pools.push(counter.pool);
        const all = await notes(counter);
        const total = all.length;
        assert.ok(total > KEEP);
        const newest = all.sort((a, b) => b.created_at - a.created_at).slice(0, KEEP).map((e) => e.id).sort();
        // a quiet channel beside it, whose messages are all older than the busy
        // one's newest 500 (and minutes apart, so catching up does not fetch them again)
        const quiet = Array.from({ length: 3 }, (_, i) =>
            finalizeEvent({ kind: KIND.POST, content: `quiet ${i}`, tags: [['t', 'quiet']], created_at: now() - 20000 - 300 * i }, writer));
        await Promise.all(quiet.map((e) => publish(pool, relays, e)));
        const quietNotes = (s) => synced(s, relays, POSTS, '#t', ['quiet'], { paged: true });
        const bob = await register(relays, 'bob', 'bob-pw');
        pools.push(bob.pool);
        assert.equal((await quietNotes(bob)).length, 3);
        assert.equal((await recentNotes(bob)).length, 100);
        while (await olderNotes(bob)) { /* next page */ }
        assert.equal((await recentNotes(bob)).length, total);
        await saveMirrors(bob);

        // a second page of the same account reads the saved copy but leaves it alone
        const second = reload(bob);
        assert.equal((await recentNotes(second)).length, KEEP);
        await saveMirrors(second);
        assert.equal((await saved(second, POSTS, '#t', 'saved', 'paged')).length, total);

        // once the first page is closed, the next one keeps only the newest;
        // watching both channels (as a community page does) trims neither
        await bob.cache.close();
        const page = reload(bob);
        const count = countEvents(page);
        const stop = watched(page, relays, POSTS, '#t', ['saved', 'quiet'], () => {}, { paged: true });
        const recent = await recentNotes(page);
        assert.equal(recent.length, KEEP);
        assert.ok(count.events <= 2 * 35, `${count.events} events fetched`);
        await saveMirrors(page);
        assert.equal((await saved(page, POSTS, '#t', 'saved', 'paged')).length, KEEP);
        assert.deepEqual(recent.map((e) => e.id).sort(), newest, 'the newest ones, no holes');
        assert.equal((await quietNotes(page)).length, 3);
        stop();
        while (await olderNotes(page)) { /* next page */ }
        assert.equal((await recentNotes(page)).length, total);
    });

    test('a community keeps no saved operations from before its latest checkpoint', async () => {
        const dan = await register(relays, 'dan', 'dan-pw');
        pools.push(dan.pool);
        const square = await C.createCommunity(dan, { name: 'Square', mode: 'open', join: 'open' });
        await C.createChannel(square, { name: 'news' });
        await new Promise((r) => setTimeout(r, 1100));   // the checkpoint in a later second
        assert.equal(await C.maintain(square, { every: 1 }), 'proposed');
        const ctx = await C.openCommunity(dan, square.ref);
        const since = ctx.base.checkpoint.created_at;
        await saveMirrors(dan);
        const ops = await saved(dan, { kinds: [KIND.COMMUNITY_OP] }, '#h', square.ref);
        assert.ok(ops.length > 0);
        assert.ok(ops.every((e) => e.created_at >= since), 'nothing from before the checkpoint');

        await dan.cache.close();
        await crashAll([r1, r2]);
        try {
            const offline = await C.openCommunity(reload(dan), square.ref);
            assert.equal(offline.state.name, 'Square');
            assert.ok(C.channelByName(offline, 'news'));
        } finally {
            await startAll([r1, r2]);
        }
    });

    test('what no page uses for a month goes: saved copies, and decrypted entries a generation later', async (t) => {
        const carol = await register(relays, 'carol', 'carol-pw');
        pools.push(carol.pool);
        await notes(carol);
        await saveMirrors(carol);
        let decrypted = 0;
        const decrypt = () => { decrypted++; return 'plain'; };
        await decryptAll(carol, [{ id: 'read' }, { id: 'unread' }], decrypt);
        await cacheOf(carol).maintained;
        await carol.cache.close();
        // a page of carol's opened `days` from now (once its daily cleanup is done)
        const start = Date.now();
        let page = null;
        const openAt = async (days) => {
            await page?.cache.close();
            t.mock.timers.reset();
            t.mock.timers.enable({ apis: ['Date'], now: start + days * DAY });
            page = reload(carol);
            await cacheOf(page).maintained;
            return page;
        };

        assert.ok((await saved(await openAt(20), POSTS, '#t', 'saved')).length > 0);
        await notes(page);   // read on day 20: kept for another month
        await saveMirrors(page);
        assert.ok((await saved(await openAt(45), POSTS, '#t', 'saved')).length > 0);
        assert.deepEqual(await decryptAll(page, [{ id: 'read' }], decrypt), ['plain']);
        assert.equal((await saved(await openAt(80), POSTS, '#t', 'saved')).length, 0);
        assert.deepEqual(await decryptAll(page, [{ id: 'read' }, { id: 'unread' }], decrypt), ['plain', 'plain']);
        assert.equal(decrypted, 3, 'decrypted again: only the entry not read for two generations');
        await page.cache.close();
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

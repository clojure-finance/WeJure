// Mirrors (sync.js): reading again fetches only what is new, nothing hides behind
// a relay's result limit, and relays that were down are caught up.
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { finalizeEvent, generateSecretKey } from 'nostr-tools/pure';
import { crashAll, startAll, wejureServer } from './harness.js';
import { KIND, createPool, publish } from 'wejure-nostr/core.js';
import { register } from 'wejure-nostr/account.js';
import { conversation, sendDM } from 'wejure-nostr/social.js';
import { subscribe } from 'wejure-nostr/live.js';
import { synced } from 'wejure-nostr/sync.js';

const r1 = wejureServer(7141);   // keeps its data across a crash
const r2 = wejureServer(7142);
const relays = [r1.url, r2.url];
const pools = [];
const reader = () => { const pool = createPool(); pools.push(pool); return { pool, relays }; };
const now = () => Math.floor(Date.now() / 1000);
const writer = generateSecretKey();
const note = (t, text, created_at = now()) => finalizeEvent({ kind: KIND.POST, content: text, tags: [['t', t]], created_at }, writer);

// Publishes events to relays, a hundred at a time.
async function publishAll(pool, to, events) {
    for (let i = 0; i < events.length; i += 100) await Promise.all(events.slice(i, i + 100).map((e) => publish(pool, to, e)));
}

// Counts the events relays send to s in requests made from now on.
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

const texts = (events) => events.map((e) => e.content).sort();

describe('mirrors', () => {
    let pool;
    before(async () => {
        await startAll([r1, r2]);
        pool = createPool();
        pools.push(pool);
    });
    after(async () => {
        pools.forEach((p) => p.destroy());
        await crashAll([r1, r2]);
    });

    test('everything comes back, past the relay\'s result limit, and a second read fetches nothing but gets the new event', async () => {
        const one = [r1.url];
        const bulk = Array.from({ length: 600 }, (_, i) => note('bulk', `n${i}`, now() - 3600 - (i % 300)));
        await publishAll(pool, one, [note('bulk', 'oldest', now() - 7200), ...bulk]);
        const s = reader();
        const first = await synced(s, one, { kinds: [KIND.POST] }, '#t', ['bulk']);
        assert.equal(first.length, 601);
        assert.ok(texts(first).includes('oldest'), 'the oldest event is behind a full page');

        const count = countEvents(s);
        await publishAll(pool, one, [note('bulk', 'new one')]);
        const second = await synced(s, one, { kinds: [KIND.POST] }, '#t', ['bulk']);
        assert.equal(second.length, 602);
        // nothing fetched again: the new event came through the live subscription
        assert.equal(count.events, 0);
    });

    test('a relay that was down is read again once it is back', async () => {
        await publish(pool, [r1.url], note('down', 'only on r1', now() - 3600));
        await r1.crash();
        const s = reader();
        await publish(pool, [r2.url], note('down', 'on r2'));
        assert.deepEqual(texts(await synced(s, relays, { kinds: [KIND.POST] }, '#t', ['down'])), ['on r2']);
        await r1.start();
        assert.deepEqual(texts(await synced(s, relays, { kinds: [KIND.POST] }, '#t', ['down'])), ['on r2', 'only on r1']);
    });

    test('a subscription that drops with its relay catches up once the relay is back', async () => {
        const s = reader();
        await publish(pool, relays, note('gap', 'before'));
        await synced(s, relays, { kinds: [KIND.POST] }, '#t', ['gap']);
        await r1.crash();
        await r1.start();
        await publish(pool, [r1.url], note('gap', 'while the subscription was down'));
        assert.deepEqual(texts(await synced(s, relays, { kinds: [KIND.POST] }, '#t', ['gap'])), ['before', 'while the subscription was down']);
    });

    test('an event that arrives live counts, however far back it is dated', async () => {
        const s = reader();
        await publish(pool, relays, note('live', 'first'));
        await synced(s, relays, { kinds: [KIND.POST] }, '#t', ['live']);
        let arrived;
        const got = new Promise((resolve) => { arrived = resolve; });
        const stop = subscribe(s, [{ kinds: [KIND.POST], '#t': ['live'] }], arrived);
        try {
            await new Promise((resolve) => setTimeout(resolve, 200));   // subscribed
            await publish(pool, relays, note('live', 'dated yesterday', now() - 24 * 3600));
            await got;
            assert.deepEqual(texts(await synced(s, relays, { kinds: [KIND.POST] }, '#t', ['live'])), ['dated yesterday', 'first']);
        } finally {
            stop();
        }
    });

    test('a flood of gift wraps does not push older messages out of view', async () => {
        const alice = await register(relays, 'alice', 'alice-pw');
        const bob = await register(relays, 'bob', 'bob-pw');
        pools.push(alice.pool, bob.pool);
        await sendDM(bob, alice.pk, 'before the flood');
        // newer than the message (its wrap is backdated up to two days), and more than a page
        const junk = Array.from({ length: 520 }, (_, i) => finalizeEvent(
            { kind: KIND.GIFT_WRAP, content: `junk ${i}`, tags: [['p', alice.pk]], created_at: now() }, generateSecretKey()));
        await publishAll(pool, relays, junk);
        assert.deepEqual((await conversation(alice, bob.pk)).map((m) => m.text), ['before the flood']);
    });
});

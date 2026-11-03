// Relays crash, come back empty or behind, get repaired; one relay lies.
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { crashAll, evilRelay, startAll, wejureServer } from './harness.js';
import { KIND, createPool, query, repair } from 'wejure-nostr/core.js';
import { login, register, relaysOf } from 'wejure-nostr/account.js';
import { deletePost, feedPage, post } from 'wejure-nostr/social.js';

const r1 = wejureServer(7101);   // keeps its data across a crash
const r2 = wejureServer(7102);
const r3 = wejureServer(7103);   // loses its data in the crash below
const evil = evilRelay(7109);
const relays = [r1.url, r2.url, r3.url];
const sessions = [];
const track = (s) => (sessions.push(s), s);

// What one relay alone holds for a filter.
async function on(relay, filter) {
    const pool = createPool();
    try { return await query(pool, [relay.url], filter); } finally { pool.destroy(); }
}
const texts = (events) => events.map((e) => e.content).sort();

describe('redundancy across relays', () => {
    let alice, bob;
    before(async () => {
        await startAll([r1, r2, r3, evil]);
        alice = track(await register(relays, 'alice', 'alice-pw'));
        bob = track(await register(relays, 'bob', 'bob-pw'));
    });
    after(async () => {
        sessions.forEach((s) => s.pool.destroy());
        await crashAll([r1, r2, r3, evil]);
    });

    test('a post is stored on every relay', async () => {
        const { stored } = await post(alice, 'one');
        assert.deepEqual(stored, relays);
    });

    test('with two of three relays crashed, posting, reading and logging in still work', async () => {
        await crashAll([r1, r3]);
        const { stored, failed } = await post(alice, 'two');
        assert.deepEqual(stored, [r2.url]);
        assert.deepEqual(failed, [r1.url, r3.url]);
        const bobPhone = track(await login(relays, 'bob', 'bob-pw'));   // a fresh device
        const { posts } = await feedPage(bobPhone, { authors: [alice.pk] });
        assert.deepEqual(texts(posts), ['one', 'two']);
    });

    test('relays that come back are behind, and repair catches them up', async () => {
        await r3.crash({ wipe: true });
        await startAll([r1, r3]);
        assert.deepEqual(texts(await on(r1, { kinds: [KIND.POST], authors: [alice.pk] })), ['one']);   // missed "two"
        assert.deepEqual(await on(r3, { authors: [alice.pk] }), []);                                    // lost everything

        // Any client can repair anyone's data, since relays cannot tell a copy from the original.
        const copied = await repair(bob.pool, relays, { authors: [alice.pk] });
        assert.equal(copied[r1.url], 1);
        assert.ok(copied[r3.url] >= 6, `r3 got ${copied[r3.url]}`);   // account, profile, lists, posts

        await crashAll([r2]);   // the one relay that had everything
        const alicePhone = track(await login(relays, 'alice', 'alice-pw'));
        const { posts } = await feedPage(alicePhone, { authors: [alice.pk] });
        assert.deepEqual(texts(posts), ['one', 'two']);
        await startAll([r2]);
    });

    test('a deleted post stays deleted, even on a relay that missed the deletion, and repair does not revive it', async () => {
        const { event } = await post(alice, 'oops');
        await crashAll([r1]);
        await deletePost(alice, event.id);
        await startAll([r1]);
        assert.deepEqual(texts(await on(r1, { kinds: [KIND.POST], authors: [alice.pk] })), ['one', 'oops', 'two']);

        const { posts } = await feedPage(bob, { authors: [alice.pk] });
        assert.deepEqual(texts(posts), ['one', 'two']);    // r1 still serves it, readers hide it

        // Repair hands r1 the deletion (r1 then drops the post) and copies the post nowhere.
        await repair(bob.pool, relays, { authors: [alice.pk] });
        for (const r of [r1, r2, r3]) {
            assert.ok(!texts(await on(r, { kinds: [KIND.POST], authors: [alice.pk] })).includes('oops'), r.name);
        }
        // WeJure's relay keeps the deletion request (as NIP-09 asks) and refuses the
        // post if anyone sends it again.
        for (const r of [r1, r2, r3]) {
            assert.equal((await on(r, { kinds: [KIND.DELETION], authors: [alice.pk] })).length, 1, r.name);
        }
        const pool = createPool();
        await Promise.allSettled(pool.publish([r1.url], event));
        pool.destroy();
        assert.ok(!texts(await on(r1, { kinds: [KIND.POST], authors: [alice.pk] })).includes('oops'), 'refused again');
    });

    test('a lying relay cannot change anyone\'s posts; it can only withhold them', async () => {
        const liar = track(await login([evil.url, r2.url], 'alice', 'alice-pw'));
        await post(liar, 'signed by alice');
        const { posts } = await feedPage(bob, { authors: [alice.pk] });
        assert.ok(texts(posts).includes('signed by alice'));

        const reader = track({ ...bob, pool: createPool(), relays: [evil.url, r2.url] });
        const seen = await query(reader.pool, reader.relays, { kinds: [KIND.POST], authors: [alice.pk] });
        assert.ok(seen.length > 0);
        assert.ok(seen.every((e) => !e.content.startsWith('FORGED')));

        const onlyLiar = await query(reader.pool, [evil.url], { kinds: [KIND.POST], authors: [alice.pk] });
        assert.deepEqual(onlyLiar, [], 'every forged event was dropped');
    });

    test('no relay needs to hold everything: readers find each user\'s relays from their relay list', async () => {
        // Carol writes only to r3; her relay list is also on r1, which works as a directory.
        const carol = track(await register([r3.url], 'carol', 'carol-pw'));
        const list = (await query(carol.pool, [r3.url], { kinds: [KIND.RELAY_LIST], authors: [carol.pk] }))[0];
        await carol.pool.publish([r1.url], list)[0];
        await post(carol, 'hello from r3');

        const dave = track({ ...bob, pool: createPool(), relays: [r1.url] });   // knows only r1
        const carolRelays = await relaysOf(dave, carol.pk);
        assert.deepEqual(carolRelays, [r3.url]);
        const { posts } = await feedPage({ ...dave, relays: carolRelays }, { authors: [carol.pk] });
        assert.deepEqual(texts(posts), ['hello from r3']);
    });
});

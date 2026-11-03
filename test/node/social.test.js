// Accounts, the paged feed, following, blocking and direct messages.
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { crashAll, startAll, wejureServer } from './harness.js';
import { KIND, createPool, query } from 'wejure-nostr/core.js';
import { login, profile, register, updateProfile } from 'wejure-nostr/account.js';
import { block, conversation, feedPage, follow, follows, post, sendDM, unfollow } from 'wejure-nostr/social.js';

const r1 = wejureServer(7121);
const r2 = wejureServer(7122);
const relays = [r1.url, r2.url];
const sessions = [];
const track = (s) => (sessions.push(s), s);

describe('accounts, feed, blocking and messages', () => {
    let alice, bob, carol;
    before(async () => {
        await startAll([r1, r2]);
        alice = track(await register(relays, 'alice', 'alice-pw'));
        bob = track(await register(relays, 'bob', 'bob-pw'));
        carol = track(await register(relays, 'carol', 'carol-pw'));
    });
    after(async () => {
        sessions.forEach((s) => s.pool.destroy());
        await crashAll([r1, r2]);
    });

    test('logging in on a new device needs only the username and password', async () => {
        await updateProfile(alice, { about: 'hi, I am alice' });
        const phone = track(await login(relays, 'alice', 'alice-pw'));
        assert.equal(phone.pk, alice.pk);
        assert.equal((await profile(phone, alice.pk)).about, 'hi, I am alice');
        await assert.rejects(login(relays, 'alice', 'wrong'), /wrong username or password/);
    });

    test('changes made right after registering, from another device, are kept', async () => {
        const fresh = track(await register(relays, 'quick', 'quick-pw'));
        const phone = track(await login(relays, 'quick', 'quick-pw'));   // same second, different clock state
        await updateProfile(phone, { about: 'changed at once' });
        await follow(phone, alice.pk);
        assert.equal((await profile(fresh, fresh.pk)).about, 'changed at once');
        assert.ok((await follows(fresh)).includes(alice.pk));
    });

    test('two accounts claiming one username each log into their own account', async () => {
        const other = track(await register(relays, 'alice', 'other-pw'));
        assert.equal((await login(relays, 'alice', 'other-pw')).pk, other.pk);
        assert.equal((await login(relays, 'alice', 'alice-pw')).pk, alice.pk);
    });

    test('the feed loads page by page, newest first, complete, even with a relay down', async () => {
        const start = Math.floor(Date.now() / 1000) - 1000;
        for (let i = 0; i < 25; i++) {
            await post(i % 2 ? alice : bob, `post ${i}`, null, { created_at: start + i });
        }
        await follow(carol, alice.pk);
        await follow(carol, bob.pk);
        await r1.crash();
        const seen = [];
        let until;
        for (let page = 0; page < 5 && until !== null; page++) {
            const p = await feedPage(carol, { until, limit: 10 });
            seen.push(p.posts.length);
            seen.push(...p.posts.map((x) => x.content));
            until = p.next;
        }
        await r1.start();
        const sizes = seen.filter((x) => typeof x === 'number');
        const texts = seen.filter((x) => typeof x === 'string');
        assert.deepEqual(sizes.slice(0, 3), [10, 10, 5]);
        assert.deepEqual(texts, Array.from({ length: 25 }, (_, i) => `post ${24 - i}`));
    });

    test('unfollowing and blocking take people out of the feed; the blocklist is secret', async () => {
        await unfollow(carol, alice.pk);
        let { posts } = await feedPage(carol, { limit: 50 });
        assert.ok(posts.length > 0 && posts.every((p) => p.pubkey === bob.pk));

        await follow(carol, alice.pk);
        await block(carol, bob.pk);
        ({ posts } = await feedPage(carol, { limit: 50 }));
        assert.ok(posts.length > 0 && posts.every((p) => p.pubkey === alice.pk));

        const stored = await query(carol.pool, relays, { kinds: [KIND.MUTE_LIST], authors: [carol.pk] });
        assert.ok(!JSON.stringify(stored).includes(bob.pk), 'nobody can see whom carol blocks');
    });

    test('direct messages: only the two people can read them, and relays cannot see who sent them', async () => {
        await sendDM(alice, bob.pk, 'hi bob');
        await sendDM(bob, alice.pk, 'hi alice');
        const bobPhone = track(await login(relays, 'bob', 'bob-pw'));
        assert.deepEqual((await conversation(bobPhone, alice.pk)).map((m) => m.text).sort(), ['hi alice', 'hi bob']);
        assert.deepEqual((await conversation(alice, bob.pk)).map((m) => m.text).sort(), ['hi alice', 'hi bob']);
        assert.deepEqual(await conversation(carol, alice.pk), []);

        const pool = createPool();
        const raw = await query(pool, relays, { kinds: [KIND.GIFT_WRAP] });
        pool.destroy();
        assert.ok(raw.length >= 4);
        assert.ok(raw.every((e) => e.pubkey !== alice.pk && e.pubkey !== bob.pk));
        assert.ok(!JSON.stringify(raw).includes('hi bob'));
    });
});

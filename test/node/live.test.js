// Live updates: new posts, deletions, messages and community changes arrive
// without asking again.
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { crashAll, startAll, wejureServer } from './harness.js';
import { register } from 'wejure-nostr/account.js';
import { deletePost, post, sendDM, unwrapAll, watchFeed, watchInbox } from 'wejure-nostr/social.js';
import { KIND } from 'wejure-nostr/core.js';
import * as C from 'wejure-nostr/communities.js';

const r1 = wejureServer(7171);
const r2 = wejureServer(7172);
const relays = [r1.url, r2.url];

// Resolves with the first value check() returns that is truthy, polling every 50 ms.
async function eventually(check, ms = 5000) {
    const end = Date.now() + ms;
    while (Date.now() < end) {
        const v = await check();
        if (v) return v;
        await new Promise((r) => setTimeout(r, 50));
    }
    throw new Error('timed out');
}

describe('live updates', () => {
    let alice, bob;
    const stops = [];
    before(async () => {
        await startAll([r1, r2]);
        alice = await register(relays, 'alice', 'alice-pw');
        bob = await register(relays, 'bob', 'bob-pw');
    });
    after(async () => {
        stops.forEach((stop) => stop());
        [alice, bob].forEach((s) => s.pool.destroy());
        await crashAll([r1, r2]);
    });

    test('new posts and deletions reach a watching feed', async () => {
        const posts = new Map();
        stops.push(watchFeed(bob, [alice.pk], {
            onPost: (e) => posts.set(e.id, e),
            onDelete: (id, pk) => { if (posts.get(id)?.pubkey === pk) posts.delete(id); },
        }));
        await new Promise((r) => setTimeout(r, 200));   // let the subscription open
        const { event } = await post(alice, 'live!');
        await eventually(() => posts.has(event.id));
        await deletePost(alice, event.id);
        await eventually(() => !posts.has(event.id));
    });

    test('a direct message wakes the inbox', async () => {
        let woken = 0;
        stops.push(watchInbox(bob, () => { woken++; }));
        await new Promise((r) => setTimeout(r, 200));
        await sendDM(alice, bob.pk, 'ping');
        await eventually(() => woken > 0);
    });

    test('a page that reads and watches its messages gets each new one once per relay', async () => {
        const dave = await register(relays, 'dave', 'dave-pw');
        let wraps = 0;   // gift wraps to dave that relays send him
        const ensure = dave.pool.ensureRelay.bind(dave.pool);
        dave.pool.ensureRelay = async (url, opts) => {
            const relay = await ensure(url, opts);
            if (!relay.counting) {
                const subscribe = relay.subscribe.bind(relay);
                relay.subscribe = (filters, params) => subscribe(filters, { ...params, onevent: (e) => {
                    if (e.kind === KIND.GIFT_WRAP) wraps++;
                    params.onevent(e);
                } });
                relay.counting = true;
            }
            return relay;
        };
        let woken = 0;
        stops.push(watchInbox(dave, () => { woken++; }));
        await unwrapAll(dave);   // what the chat page reads
        await new Promise((r) => setTimeout(r, 200));
        await sendDM(alice, dave.pk, 'once');
        await eventually(() => woken > 0);
        await new Promise((r) => setTimeout(r, 300));
        assert.equal(wraps, relays.length);
        dave.pool.destroy();
    });

    test('a watcher keeps following after its relays restart', async () => {
        let woken = 0;
        stops.push(watchInbox(bob, () => { woken++; }));
        await new Promise((r) => setTimeout(r, 200));
        await crashAll([r1, r2]);
        await startAll([r1, r2]);
        await new Promise((r) => setTimeout(r, 2500));   // it subscribes again after 2 s
        const before = woken;
        await sendDM(alice, bob.pk, 'after the restart');
        await eventually(() => woken > before, 8000);
    });

    test('a community view that stays open follows new messages, also after a key change', async () => {
        const club = await C.createCommunity(alice, { name: 'Live Club' });
        const general = C.channelByName(club, 'general');
        await C.addMember(club, bob.pk);
        const { invitations } = await C.myCommunities(bob);
        await C.accept(bob, invitations.find((i) => i.ref === club.ref));
        const b = await C.openCommunity(bob, club.ref);
        let changes = 0;
        stops.push(C.watch(b, () => { changes++; }));
        await new Promise((r) => setTimeout(r, 300));

        await C.sendMessage(club, general, 't', 'first');
        await eventually(async () => changes > 0 && (await C.readChannel(b, general)).some((m) => m.text === 'first'));

        // a new member's from-join channel or a removal changes the key; the watcher must follow
        const carol = await register(relays, 'carol', 'carol-pw');
        await C.addMember(club, carol.pk);
        await C.removeMember(club, carol.pk);
        const seen = changes;
        await C.sendMessage(club, general, 't', 'after the new key');
        await eventually(async () => changes > seen && (await C.readChannel(b, general)).some((m) => m.text === 'after the new key'));
        carol.pool.destroy();
    });
});

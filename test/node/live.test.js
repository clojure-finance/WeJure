// Live updates: new posts, deletions, messages and community changes arrive
// without asking again.
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { crashAll, startAll, wejureServer } from './harness.js';
import { register } from 'wejure-nostr/account.js';
import { deletePost, post, sendDM, watchFeed, watchInbox } from 'wejure-nostr/social.js';
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

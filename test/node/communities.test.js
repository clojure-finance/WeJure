// Communities against real relays: channels, topics, history, roles, owners,
// departures, open communities, crashes.
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { crashAll, startAll, wejureServer } from './harness.js';
import { finalizeEvent, generateSecretKey } from 'nostr-tools/pure';
import { v2 as nip44 } from 'nostr-tools/nip44';
import { hexToBytes } from 'nostr-tools/utils';
import { wrapEvent } from 'nostr-tools/nip59';
import { KIND, createPool, publish, query, sha256Hex, sign } from 'wejure-nostr/core.js';
import { login, register } from 'wejure-nostr/account.js';
import * as C from 'wejure-nostr/communities.js';

const r1 = wejureServer(7161);
const r2 = wejureServer(7162);
const r3 = wejureServer(7163);
const relays = [r1.url, r2.url, r3.url];
const sessions = [];
const track = (s) => (sessions.push(s), s);
const texts = (msgs) => msgs.map((m) => m.text);

// An envelope built by hand, as a hacked client would (same format as communities.js).
async function forgeEnvelope(key, inner) {
    const tag = await sha256Hex(new TextEncoder().encode(`wejure-envelope:${key}`));
    return finalizeEvent({ kind: KIND.ENVELOPE, created_at: Math.floor(Date.now() / 1000), tags: [['h', tag]],
        content: nip44.encrypt(JSON.stringify(inner), hexToBytes(key)) }, generateSecretKey());
}

// Accepts the invitation to ref (if there is one) and opens the community as s.
async function enter(s, ref) {
    const { invitations } = await C.myCommunities(s);
    const inv = invitations.find((i) => i.ref === ref);
    if (inv) await C.accept(s, inv);
    return C.openCommunity(s, ref);
}

describe('communities', () => {
    let alice, bob, carol, dave, erin, mallory;
    before(async () => {
        await startAll([r1, r2, r3]);
        [alice, bob, carol, dave, erin, mallory] = await Promise.all(
            ['alice', 'bob', 'carol', 'dave', 'erin', 'mallory'].map(async (n) => track(await register(relays, n, `${n}-pw`))));
    });
    after(async () => {
        sessions.forEach((s) => s.pool.destroy());
        await crashAll([r1, r2, r3]);
    });

    test('a private community: channels, topics, a private channel, and nothing for outsiders or relays', async () => {
        const club = await C.createCommunity(alice, { name: 'Hiking Club' });
        const general = C.channelByName(club, 'general');
        const orgs = await C.createChannel(club, { name: 'organizers', visibility: 'private' });
        await C.addMember(club, bob.pk);
        await C.addMember(club, carol.pk);
        await C.addToChannel(club, orgs, bob.pk);

        const b = await enter(bob, club.ref);
        const c = await enter(carol, club.ref);
        await C.sendMessage(b, general, 'saturday hike', 'who is in?');
        await C.sendMessage(c, general, 'saturday hike', 'me!');
        await C.sendMessage(c, general, 'gear', 'spare tent anyone?');
        await C.sendMessage(b, orgs, 'budget', 'we have 200 francs');

        const t = await C.topics(club, general);
        assert.deepEqual([...t.keys()].sort(), ['gear', 'saturday hike']);
        assert.deepEqual(texts(await C.readChannel(c, general, { topic: 'saturday hike' })), ['who is in?', 'me!']);
        assert.deepEqual(texts(await C.readChannel(club, orgs)), ['we have 200 francs']);
        assert.deepEqual(await C.readChannel(c, orgs), [], 'carol is not in the private channel');
        await assert.rejects(C.sendMessage(c, orgs, 'x', 'let me in'), /not a member/);
        await assert.rejects(C.openCommunity(dave, club.ref), /not found, or no access/);

        const pool = createPool();
        const raw = await query(pool, relays, { kinds: [KIND.ENVELOPE, KIND.GIFT_WRAP], limit: 5000 });
        pool.destroy();
        for (const s of [alice, bob, carol]) assert.ok(raw.every((e) => e.pubkey !== s.pk), 'nothing signed by a member');
        const visible = JSON.stringify(raw.map((e) => [e.content, e.tags]));
        for (const w of ['Hiking', 'organizers', 'saturday', 'francs', 'general']) assert.ok(!visible.includes(w), w);
    });

    test('history: shared channels show newcomers the past, from-join channels do not', async () => {
        const club = await C.createCommunity(alice, { name: 'Chess' });
        const general = C.channelByName(club, 'general');
        const news = await C.createChannel(club, { name: 'news', history: 'from-join' });
        await C.sendMessage(club, general, 'hello', 'old chat');
        await C.sendMessage(club, news, 'n', 'old news');

        await C.addMember(club, erin.pk);
        await C.sendMessage(club, news, 'n', 'new news');
        const e = await enter(erin, club.ref);
        assert.deepEqual(texts(await C.readChannel(e, general)), ['old chat']);
        assert.deepEqual(texts(await C.readChannel(e, news)), ['new news']);
    });

    test('roles: what admins, moderators and members may do', async () => {
        const club = await C.createCommunity(alice, { name: 'Choir' });
        const general = C.channelByName(club, 'general');
        await C.addMember(club, bob.pk);
        await C.setRole(club, bob.pk, 'admin');
        const b = await enter(bob, club.ref);
        await C.addMember(b, carol.pk, 'moderator');
        await C.addMember(b, dave.pk);
        await assert.rejects(C.setRole(b, carol.pk, 'admin'), /not allowed/, 'only owners make admins');

        const c = await enter(carol, club.ref);
        const d = await enter(dave, club.ref);
        await assert.rejects(C.removeMember(c, bob.pk), /not allowed/, 'a moderator cannot remove an admin');
        await assert.rejects(C.addMember(d, mallory.pk), /not allowed/, 'members cannot add people');

        const rude = await C.sendMessage(d, general, 'chat', 'something rude');
        const typo = await C.sendMessage(d, general, 'chat', 'sorry, tpyo');
        await C.sendMessage(d, general, 'chat', 'hello all');
        await C.hideMessage(c, rude);
        await C.retractMessage(d, typo);
        await C.retractMessage(c, typo);                                    // someone else's retraction neither counts nor undoes it
        await assert.rejects(C.hideMessage(d, typo), /not allowed/);
        await C.refresh(b);
        assert.deepEqual(texts(await C.readChannel(b, general)), ['hello all']);

        await C.removeMember(c, dave.pk);
        await C.refresh(b);
        assert.ok(!b.state.isMember(dave.pk), 'a moderator can remove a member');
    });

    test('owners: changes need a majority, so a lost founder key does not freeze the community', async () => {
        const club = await C.createCommunity(alice, { name: 'Co-op' });
        await C.addMember(club, bob.pk);
        await C.addMember(club, carol.pk);
        await C.setRole(club, bob.pk, 'owner');                       // alice is the only owner: applies at once
        const proposal = await C.setRole(club, carol.pk, 'owner');    // one of two owners: pending
        assert.equal(club.state.roleOf(carol.pk), 'member');
        const b = await enter(bob, club.ref);
        await C.approve(b, proposal);
        assert.equal(b.state.roleOf(carol.pk), 'owner');

        // alice loses her key; bob and carol vote her out and carry on
        const out = await C.removeMember(b, alice.pk);
        assert.equal(b.state.roleOf(alice.pk), 'owner', 'one of three owners is not enough');
        const c = await enter(carol, club.ref);
        await C.approve(c, out);
        assert.ok(!c.state.isMember(alice.pk));
        await C.addMember(c, dave.pk);
        await C.sendMessage(c, C.channelByName(c, 'general'), 'news', 'new management');
        const d = await enter(dave, club.ref);
        assert.deepEqual(texts(await C.readChannel(d, C.channelByName(d, 'general'))), ['new management']);
    });

    test('a removed member reads nothing new and cannot slip in backdated messages or ops', async () => {
        const club = await C.createCommunity(alice, { name: 'Book Club' });
        const general = C.channelByName(club, 'general');
        await C.addMember(club, bob.pk);
        await C.addMember(club, mallory.pk, 'moderator');
        const m = await enter(mallory, club.ref);
        await C.sendMessage(m, general, 'books', 'I liked it');

        // what mallory knows before her removal: her keys, the op log's heads, her last message
        const old = {
            state: m.keys.get(m.state.currentKeyId('state')).key,
            general: m.keys.get(m.state.currentKeyId(`ch:${general}`)).key,
            heads: [...m.state.heads],
            last: (await C.readChannel(m, general)).at(-1).id,
        };

        await C.removeMember(club, mallory.pk);
        await C.sendMessage(club, general, 'books', 'mallory is gone');

        // an honest client shows her the removal and nothing new
        await C.refresh(m);
        assert.ok(!m.state.isMember(mallory.pk));
        assert.deepEqual(texts(await C.readChannel(m, general)), ['I liked it']);

        // a hacked client uses the old keys to write a message and an op dated before the removal
        const early = Math.floor(Date.now() / 1000) - 3600;
        const lie = sign(mallory, { kind: KIND.COMMUNITY_MESSAGE, content: 'backdated lie', created_at: early,
            tags: [['h', club.ref], ['community', club.ref], ['channel', general], ['topic', 'books'], ['prev', old.last],
                ...old.heads.map((h) => ['state', h])] });
        const kick = sign(mallory, { kind: KIND.COMMUNITY_OP, created_at: early,
            content: JSON.stringify({ type: 'remove', member: bob.pk }),
            tags: [['h', club.ref], ['community', club.ref], ...old.heads.map((h) => ['parent', h])] });
        await publish(mallory.pool, relays, await forgeEnvelope(old.general, lie));
        await publish(mallory.pool, relays, await forgeEnvelope(old.state, kick));

        const b = await enter(bob, club.ref);
        assert.ok(b.state.order.some((o) => o.id === kick.id), 'bob can read the forged op');
        assert.ok(b.state.isMember(bob.pk), 'but it does not count');
        assert.deepEqual(texts(await C.readChannel(b, general)), ['I liked it', 'mallory is gone']);

        // brought back, her new messages count; what she forged while away still does not
        await C.addMember(club, mallory.pk);
        const back = await enter(mallory, club.ref);
        await C.sendMessage(back, general, 'books', 'back again');
        assert.deepEqual(texts(await C.readChannel(b, general)), ['I liked it', 'mallory is gone', 'back again']);
    });

    test('leaving: the others get a new key automatically and carry on', async () => {
        const club = await C.createCommunity(alice, { name: 'Band' });
        const general = C.channelByName(club, 'general');
        await C.addMember(club, bob.pk);
        await C.addMember(club, carol.pk);
        const c = await enter(carol, club.ref);
        await C.sendMessage(c, general, 'gig', 'see you friday');
        await C.leave(c);

        const b = await enter(bob, club.ref);
        assert.ok(b.state.needsRekey(`ch:${general}`));
        await C.sendMessage(b, general, 'gig', 'carol left, new setlist');   // heals first
        await C.refresh(c);
        assert.deepEqual(texts(await C.readChannel(c, general)), ['see you friday']);
        assert.deepEqual(texts(await C.readChannel(club, general)), ['see you friday', 'carol left, new setlist']);
        assert.ok(!(await C.myCommunities(carol)).joined.has(club.ref));
    });

    test('an open community: anyone joins, strangers are ignored, a ban sticks, private channels stay encrypted', async () => {
        const club = await C.createCommunity(alice, { name: 'Clojure Users', mode: 'open', join: 'open' });
        const general = C.channelByName(club, 'general');
        const d = await C.join(dave, club.ref, relays);
        await C.sendMessage(d, general, 'intro', 'hi, I am dave');

        // a stranger posts into the channel without joining
        const forged = sign(mallory, { kind: KIND.COMMUNITY_MESSAGE, content: 'buy my coin',
            tags: [['h', club.ref], ['community', club.ref], ['channel', general], ['topic', 'intro']] });
        await publish(mallory.pool, relays, forged);
        assert.deepEqual(texts(await C.readChannel(club, general)), ['hi, I am dave']);

        const m = await C.join(mallory, club.ref, relays);
        const hello = await C.sendMessage(m, general, 'intro', 'hello (spam soon)');
        await C.removeMember(club, mallory.pk, { ban: true });
        // her client would refuse now, so the spam is built by hand, continuing her chain
        const spam = sign(mallory, { kind: KIND.COMMUNITY_MESSAGE, content: 'more spam',
            tags: [['h', club.ref], ['community', club.ref], ['channel', general], ['topic', 'intro'], ['prev', hello],
                ...m.state.heads.map((h) => ['state', h])] });
        await publish(mallory.pool, relays, spam);
        await assert.rejects(C.join(mallory, club.ref, relays), /not allowed/);
        assert.deepEqual(texts(await C.readChannel(club, general)), ['hi, I am dave', 'hello (spam soon)']);

        // a stranger's bundle with broken relay addresses does not stop dave's client
        const junk = { kind: KIND.KEY_BUNDLE, content: JSON.stringify({ ref: club.ref, relays: [123, 'http://[', 'wss://'], keys: [] }) };
        await publish(mallory.pool, relays, wrapEvent(junk, mallory.sk, dave.pk));
        assert.equal((await C.openCommunity(dave, club.ref)).state.name, 'Clojure Users');

        // adding someone to an open community tells them (it has no keys to send)
        await C.addMember(club, erin.pk);
        assert.ok((await C.myCommunities(erin)).invitations.some((i) => i.ref === club.ref));

        const staff = await C.createChannel(club, { name: 'staff', visibility: 'private', members: [dave.pk] });
        await C.refresh(d);
        await C.sendMessage(d, staff, 'plans', 'secret plan');
        assert.deepEqual(texts(await C.readChannel(club, staff)), ['secret plan']);
        const pool = createPool();
        const plain = await query(pool, relays, { kinds: [KIND.COMMUNITY_MESSAGE], '#h': [club.ref] });
        pool.destroy();
        assert.ok(plain.every((e) => e.content !== 'secret plan'), 'the private channel is encrypted');
    });

    test('relays crash, and a new device finds its private and open communities on the rest', async () => {
        const priv = await C.createCommunity(alice, { name: 'Family' });
        const open = await C.createCommunity(alice, { name: 'Neighbourhood', mode: 'open', join: 'open' });
        await C.addMember(priv, erin.pk);
        await enter(erin, priv.ref);
        await C.join(erin, open.ref, relays);
        await C.sendMessage(priv, C.channelByName(priv, 'general'), 'dinner', 'sunday at 6');

        await crashAll([r1, r2]);
        const phone = track(await login(relays, 'erin', 'erin-pw'));
        const { joined } = await C.myCommunities(phone);
        assert.ok(joined.has(priv.ref) && joined.has(open.ref));
        const p = await C.openCommunity(phone, priv.ref);
        assert.deepEqual(texts(await C.readChannel(p, C.channelByName(p, 'general'))), ['sunday at 6']);
        await C.sendMessage(p, C.channelByName(p, 'general'), 'dinner', 'I will bring cake');
        await startAll([r1, r2]);
    });
});

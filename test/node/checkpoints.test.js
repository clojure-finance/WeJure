// Community checkpoints against real relays: owners' clients propose and
// approve them, new devices load from them, and the rules hold across them.
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { crashAll, startAll, wejureServer } from './harness.js';
import { KIND, publish, sign } from 'wejure-nostr/core.js';
import { login, register } from 'wejure-nostr/account.js';
import * as C from 'wejure-nostr/communities.js';
import { resolve, snapshotOf } from 'wejure-nostr/community-state.js';

const r1 = wejureServer(7131);
const r2 = wejureServer(7132);
const relays = [r1.url, r2.url];
const sessions = [];
const track = (s) => (sessions.push(s), s);
const texts = (msgs) => msgs.map((m) => m.text);
const somebody = () => getPublicKey(generateSecretKey());   // a member who never shows up

// Counts the events relays send to s, by kind, from now on (call before s asks anything).
function countEvents(s) {
    const count = { all: 0 };
    const ensure = s.pool.ensureRelay.bind(s.pool);
    s.pool.ensureRelay = async (url, opts) => {
        const relay = await ensure(url, opts);
        if (!relay.counting) {
            const subscribe = relay.subscribe.bind(relay);
            relay.subscribe = (filters, params) => subscribe(filters, { ...params, onevent: (e) => {
                count.all++;
                count[e.kind] = (count[e.kind] ?? 0) + 1;
                params.onevent(e);
            } });
            relay.counting = true;
        }
        return relay;
    };
    return count;
}

// Accepts the invitation to ref (if there is one) and opens the community as s.
async function enter(s, ref) {
    const { invitations } = await C.myCommunities(s);
    const inv = invitations.find((i) => i.ref === ref);
    if (inv) await C.accept(s, inv);
    return C.openCommunity(s, ref);
}

describe('checkpoints', () => {
    let alice, bob, carol, dave, mallory;
    before(async () => {
        await startAll([r1, r2]);
        [alice, bob, carol, dave, mallory] = await Promise.all(
            ['alice', 'bob', 'carol', 'dave', 'mallory'].map(async (n) => track(await register(relays, n, `${n}-pw`))));
    });
    after(async () => {
        sessions.forEach((s) => s.pool.destroy());
        await crashAll([r1, r2]);
    });

    test('a new device loads a private community from its checkpoint, fetches what came after, and sees the same state', async () => {
        const club = await C.createCommunity(alice, { name: 'Big Club' });
        const general = C.channelByName(club, 'general');
        await C.sendMessage(club, general, 'news', 'from before the checkpoint');
        for (let i = 0; i < 20; i++) await C.addMember(club, somebody());
        const opsBefore = club.state.order.length;
        assert.equal(await C.maintain(club, { every: 10 }), 'proposed');
        await C.refresh(club);
        assert.equal(club.chain.length, 1, 'the founder alone accepts the first');

        await C.addMember(club, carol.pk);
        await C.removeMember(club, [...club.state.ever].find((pk) => ![alice.pk, carol.pk].includes(pk)));
        await C.sendMessage(club, general, 'news', 'from after the checkpoint');

        await enter(carol, club.ref);
        const phone = track(await login(relays, 'carol', 'carol-pw'));
        const count = countEvents(phone);
        const c = await C.openCommunity(phone, club.ref);
        assert.equal(c.base?.checkpoint.id, club.chain[0].id);
        assert.ok(count[KIND.ENVELOPE] < opsBefore, `fetched ${count[KIND.ENVELOPE]} envelopes; the history before the checkpoint has ${opsBefore} ops`);

        await C.refresh(club);
        assert.deepEqual(snapshotOf(c.state), snapshotOf(club.state));
        assert.deepEqual(snapshotOf(c.state), snapshotOf(resolve(club.ref, [...club.ops.values()])), 'the same as the whole history gives');
        assert.ok(c.state.isMember(carol.pk) && !c.state.needsRekey('state'));
        // the old message names ops before the checkpoint: judged by its covered index
        assert.deepEqual(texts(await C.readChannel(c, general)), ['from before the checkpoint', 'from after the checkpoint']);
        await C.sendMessage(c, general, 'news', 'carol on her phone');
        assert.deepEqual(texts(await C.readChannel(club, general)).at(-1), 'carol on her phone');
    });

    test('with three owners a checkpoint needs two; owners\' clients approve it on their own; others\' never count', async () => {
        const town = await C.createCommunity(alice, { name: 'Town', mode: 'open', join: 'open' });
        const b = await C.join(bob, town.ref, relays);
        const c = await C.join(carol, town.ref, relays);
        const d = await C.join(dave, town.ref, relays);
        await C.setRole(town, bob.pk, 'owner');          // alone, alice is the majority
        await C.setRole(town, carol.pk, 'owner');        // a proposal: bob must approve
        await C.refresh(b);
        await C.approve(b, [...b.state.proposals.keys()].at(-1));
        await C.refresh(town);
        assert.equal(town.state.roleOf(carol.pk), 'owner');

        assert.equal(await C.maintain(town), 'proposed', 'the owners changed');
        await C.refresh(town);
        assert.deepEqual(JSON.parse(town.chain[0].content).owners, [alice.pk, bob.pk, carol.pk].sort());

        // dave, a mere member, proposes a checkpoint of his own; owners ignore it
        await C.updateSettings(town, { description: 'a small town' });
        await C.refresh(d);
        const forged = await C.maintain(d, { every: 1 });
        assert.equal(forged, null, 'not an owner: does not propose');

        await C.refresh(b);
        assert.equal(await C.maintain(b, { every: 1 }), 'proposed');
        await C.refresh(b);
        assert.equal(b.chain.length, 1, 'bob alone is 1 of 3');
        await C.refresh(c);
        assert.equal(await C.maintain(c), 'approved');
        await C.refresh(town);
        assert.equal(town.chain.length, 2);
        assert.equal(town.state.description, 'a small town');
    });

    test('two owners proposing at once each back their own; one checkpoint wins, no fork', async () => {
        const guild = await C.createCommunity(alice, { name: 'Guild', mode: 'open', join: 'open' });
        const b = await C.join(bob, guild.ref, relays);
        const c = await C.join(carol, guild.ref, relays);
        await C.setRole(guild, bob.pk, 'owner');
        await C.setRole(guild, carol.pk, 'owner');
        await C.refresh(b);
        await C.approve(b, [...b.state.proposals.keys()].at(-1));
        assert.equal(await C.maintain(guild), 'proposed');   // the first, the founder's alone
        await C.updateSettings(guild, { description: 'makers' });

        assert.deepEqual(await Promise.all([C.maintain(b, { every: 1 }), C.maintain(c, { every: 1 })]), ['proposed', 'proposed']);
        assert.equal(await C.maintain(guild), 'approved', 'alice backs the earliest');
        assert.equal(await C.maintain(b), null, 'bob backs his own, which still verifies');
        assert.equal(await C.maintain(c), null, 'so does carol');
        await C.refresh(guild);
        assert.equal(guild.chain.length, 2);
        assert.equal(guild.conflict, false);
        assert.equal(guild.state.description, 'makers');
    });

    test('a change a checkpoint dropped (it reached the approvers too late) is redone by its author\'s client', async () => {
        const club = await C.createCommunity(alice, { name: 'Late Club', mode: 'open', join: 'open' });
        const b = await C.join(bob, club.ref, relays);
        const c = await C.join(carol, club.ref, relays);
        const d = await C.join(dave, club.ref, relays);
        await C.setRole(club, bob.pk, 'owner');
        await C.setRole(club, carol.pk, 'owner');
        await C.refresh(b);
        await C.approve(b, [...b.state.proposals.keys()].at(-1));
        await C.addMember(club, somebody());
        assert.equal(await C.maintain(club, { every: 1 }), 'proposed');   // the first: the founder's alone
        await C.refresh(club);
        await C.setRole(club, dave.pk, 'admin');
        await C.refresh(d);
        await C.refresh(c);   // carol's view, before what follows

        await C.refresh(b);
        assert.equal(await C.maintain(b, { every: 1 }), 'proposed');
        const proposal = (await C.openCommunity(bob, club.ref)).marked.find((e) => e.pubkey === bob.pk && JSON.parse(e.content).type === 'checkpoint' && e.id !== club.chain[0].id);
        await C.updateSettings(d, { description: 'set by dave' });   // valid now: the proposal is not accepted yet
        // carol's client approves without having received dave's change
        await publish(carol.pool, relays, sign(carol, {
            kind: KIND.COMMUNITY_OP, content: JSON.stringify({ type: 'approve-checkpoint', checkpoint: proposal.id }),
            tags: [['h', club.ref], ['community', club.ref], ...c.state.heads.map((h) => ['parent', h]), ['c', 'checkpoint']],
        }));
        await C.refresh(club);
        assert.equal(club.chain.length, 2);
        assert.notEqual(club.state.description, 'set by dave', 'dropped');
        assert.equal(await C.maintain(d), 'redone');
        await C.refresh(club);
        assert.equal(club.state.description, 'set by dave');
    });

    test('a change made without seeing a new checkpoint is turned down, and the client is told', async () => {
        const shop = await C.createCommunity(alice, { name: 'Shop' });
        await C.addMember(shop, dave.pk, 'admin');
        const d = await enter(dave, shop.ref);
        assert.equal(await C.maintain(shop, { every: 1 }), 'proposed');
        // dave's view still predates the checkpoint, so his op does not build on it
        const newcomer = somebody();
        await assert.rejects(C.addMember(d, newcomer), /not allowed/);
        await C.refresh(shop);
        assert.ok(!shop.state.isMember(newcomer));
        await C.addMember(d, newcomer);   // his client has reloaded: on the new heads it counts
        await C.refresh(shop);
        assert.ok(shop.state.isMember(newcomer));
    });

    test('if a checkpoint\'s snapshot is gone, it is computed again from the history', async () => {
        const fair = await C.createCommunity(alice, { name: 'Fair', mode: 'open', join: 'open' });
        await C.join(bob, fair.ref, relays);
        await C.updateSettings(fair, { description: 'every Saturday' });
        assert.equal(await C.maintain(fair, { every: 1 }), 'proposed');
        await C.refresh(fair);
        const parts = JSON.parse(fair.chain[0].content).state;
        await publish(alice.pool, relays, sign(alice, { kind: KIND.DELETION, tags: parts.map((id) => ['e', id]) }));

        const phone = track(await login(relays, 'carol', 'carol-pw'));
        const f = await C.openCommunity(phone, fair.ref, { relays });
        assert.equal(f.base?.checkpoint.id, fair.chain[0].id);
        assert.deepEqual(snapshotOf(f.state), snapshotOf(fair.state));
    });

    test('messages a stranger wrote before joining stay hidden after a checkpoint', async () => {
        const square = await C.createCommunity(alice, { name: 'Square', mode: 'open', join: 'open' });
        const general = C.channelByName(square, 'general');
        await C.sendMessage(square, general, 'hello', 'welcome, all');
        // mallory writes into the channel before joining, naming an op from then
        const early = square.state.heads[0];
        await publish(mallory.pool, relays, sign(mallory, {
            kind: KIND.COMMUNITY_MESSAGE, content: 'I was here first',
            tags: [['h', square.ref], ['community', square.ref], ['channel', general], ['topic', 'hello'], ['ms', '1'], ['state', early]],
        }));
        const m = await C.join(mallory, square.ref, relays);
        await C.sendMessage(m, general, 'hello', 'hi, I just joined');
        assert.equal(await C.maintain(square, { every: 1 }), 'proposed');

        const phone = track(await login(relays, 'dave', 'dave-pw'));
        const s2 = await C.openCommunity(phone, square.ref, { relays });
        assert.ok(s2.base);
        assert.deepEqual(texts(await C.readChannel(s2, general)), ['welcome, all', 'hi, I just joined']);
        assert.deepEqual(texts(await C.readChannel(square, general)), ['welcome, all', 'hi, I just joined']);
    });
});

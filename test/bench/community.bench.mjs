// Times the expensive calls on a community of realistic size, and counts the
// events relays send for each:
//   node test/bench/community.bench.mjs [messages=300] [members=30] [dms=200]
import { performance } from 'node:perf_hooks';

// Counts the events relays send (patched before nostr-tools captures WebSocket).
let received = 0;
const Base = globalThis.WebSocket;
globalThis.WebSocket = class extends Base {
    constructor(...args) {
        super(...args);
        this.addEventListener('message', (m) => { if (typeof m.data === 'string' && m.data.startsWith('["EVENT"')) received++; });
    }
};
const { startAll, crashAll, wejureServer } = await import('../node/harness.js');
const { register } = await import('wejure-nostr/account.js');
const { sendDM, unwrapAll } = await import('wejure-nostr/social.js');
const C = await import('wejure-nostr/communities.js');
const { resolve } = await import('wejure-nostr/community-state.js');

const [MSGS = 300, MEMBERS = 30, DMS = 200] = process.argv.slice(2).map(Number);
const server = wejureServer(7291);
await startAll([server]);
const relays = [server.url];
const time = async (label, fn) => {
    const [t, n] = [performance.now(), received];
    const r = await fn();
    console.log(`${label.padEnd(48)} ${(performance.now() - t).toFixed(0).padStart(6)} ms ${String(received - n).padStart(7)} events`);
    return r;
};

// A synthetic op log of n ops (members added one at a time, some leaving), for resolve alone.
function syntheticLog(n) {
    const hex = (i, p) => (p + i.toString(16)).padStart(64, '0');
    const founder = hex(1, 'f');
    const ref = `${founder}:bench`;
    const ops = [];
    const op = (pubkey, body) => {
        const id = hex(ops.length + 1, 'e');
        ops.push({ id, pubkey, created_at: 1000 + ops.length, content: JSON.stringify(body),
            tags: [['community', ref], ...(ops.length ? [['parent', ops.at(-1).id]] : [])] });
    };
    op(founder, { type: 'create', nonce: 'bench', name: 'x', mode: 'open', join: 'open' });
    const members = [];
    while (ops.length < n) {
        if (ops.length % 10 === 3 && members.length > 5) op(members.shift(), { type: 'leave', heads: {} });
        else { members.push(hex(ops.length, 'd')); op(founder, { type: 'add', member: members.at(-1) }); }
    }
    return { ref, ops };
}

try {
    const owner = await register(relays, 'owner', 'pw');
    const club = await C.createCommunity(owner, { name: 'Bench' });
    const general = C.channelByName(club, 'general');
    const people = [];
    for (let i = 0; i < MEMBERS; i++) people.push(await register(relays, `m${i}`, 'pw'));
    await time(`add ${MEMBERS} members`, async () => { for (const p of people) await C.addMember(club, p.pk); });
    await time(`send ${MSGS} messages`, async () => { for (let i = 0; i < MSGS; i++) await C.sendMessage(club, general, `t${i % 10}`, `message ${i}`); });
    const m = people[0];
    await time(`${DMS} direct messages to a member`, async () => { for (let i = 0; i < DMS; i++) await sendDM(owner, m.pk, `dm ${i}`); });
    console.log(`ops: ${club.state.order.length}, gift wraps to the member: ${(await unwrapAll(people[1])).length + DMS}`);

    const ctx = await time('member: openCommunity', () => C.openCommunity(m, club.ref));
    await time('member: readChannel', () => C.readChannel(ctx, general));
    await time('member: refresh, nothing new', () => C.refresh(ctx));
    // What the community page does when a message arrives: the watcher reloads,
    // then the page reads the community, the topics and the open topic.
    const arrival = async () => {
        await C.sendMessage(club, general, 't0', 'one more');
        const [t, n] = [performance.now(), received];
        await C.refresh(ctx);
        await C.refresh(ctx);
        await Promise.all([C.topics(ctx, general), C.readChannel(ctx, general, { topic: 't0' })]);
        return [performance.now() - t, received - n];
    };
    let [ms, events] = [0, 0];
    for (let i = 0; i < 5; i++) { const [a, b] = await arrival(); ms += a; events += b; }
    console.log(`${'member: page update per arriving message'.padEnd(48)} ${(ms / 5).toFixed(0).padStart(6)} ms ${String(events / 5).padStart(7)} events`);
    await time('owner: sendMessage', () => C.sendMessage(club, general, 't0', 'and another'));
    for (const n of [1000, 5000]) {
        const { ref, ops } = syntheticLog(n);
        await time(`resolve ${n} ops (pure, no I/O)`, () => resolve(ref, ops));
    }
} finally {
    await crashAll([server], { wipe: true });
    process.exit(0);
}

// Times the expensive calls on a community of realistic size:
// node test/bench/community.bench.mjs [messages=300] [members=30]
import { performance } from 'node:perf_hooks';
import { startAll, crashAll, wejureServer } from '../node/harness.js';
import { register } from 'wejure-nostr/account.js';
import { unwrapAll } from 'wejure-nostr/social.js';
import * as C from 'wejure-nostr/communities.js';
import { resolve } from 'wejure-nostr/community-state.js';

const [MSGS = 300, MEMBERS = 30] = process.argv.slice(2).map(Number);
const server = wejureServer(7291);
await startAll([server]);
const relays = [server.url];
const time = async (label, fn) => { const t = performance.now(); const r = await fn(); console.log(`${label.padEnd(44)} ${(performance.now() - t).toFixed(0).padStart(6)} ms`); return r; };
try {
    const owner = await register(relays, 'owner', 'pw');
    const club = await C.createCommunity(owner, { name: 'Bench' });
    const general = C.channelByName(club, 'general');
    const people = [];
    for (let i = 0; i < MEMBERS; i++) people.push(await register(relays, `m${i}`, 'pw'));
    await time(`add ${MEMBERS} members`, async () => { for (const p of people) await C.addMember(club, p.pk); });
    await time(`send ${MSGS} messages`, async () => { for (let i = 0; i < MSGS; i++) await C.sendMessage(club, general, `t${i % 10}`, `message ${i}`); });
    console.log(`ops: ${club.state.order.length}, gift wraps to owner: ${(await unwrapAll(owner)).length}`);
    const m = people[0];
    await time('member: unwrapAll (all gift wraps)', () => unwrapAll(m));
    const ctx = await time('member: openCommunity', () => C.openCommunity(m, club.ref));
    await time('member: refresh (reload)', () => C.refresh(ctx));
    await time('member: readChannel (reload + messages)', () => C.readChannel(ctx, general));
    await time('member: topics', () => C.topics(ctx, general));
    const ops = ctx.state.order.map((o) => ({ id: o.id, pubkey: o.pubkey, created_at: o.created_at, content: JSON.stringify(o.body),
        tags: [['community', club.ref], ...o.parents.map((p) => ['parent', p])] }));
    await time('resolve only (pure, no I/O)', () => resolve(club.ref, ops));
    await time('owner: sendMessage (reload + send)', () => C.sendMessage(club, general, 't0', 'one more'));
} finally {
    await crashAll([server], { wipe: true });
    process.exit(0);
}

// Communities > channels > topics, on Nostr (see COMMUNITIES.md). This module
// does the I/O: publishing ops and messages, encrypting them, handing out keys.
// community-state.js decides what is valid.
//
// Most functions take a context from openCommunity(): {s, ref, relays, state, keys}.
// Every change reloads it, so ctx.state is always the state after the change.
import { finalizeEvent, generateSecretKey } from 'nostr-tools/pure';
import { getConversationKey, v2 as nip44 } from 'nostr-tools/nip44';
import { wrapEvent } from 'nostr-tools/nip59';
import { hexToBytes } from 'nostr-tools/utils';
import { KIND, after, checkEvent, latest, publish, query, randomHex, relayUrls, sha256Hex, sign } from './core.js';
import { decryptAll } from './cache.js';
import { synced } from './sync.js';
import { relaysOf } from './account.js';
import { unwrapAll } from './social.js';
import { resolve } from './community-state.js';
import { debounce, subscribe } from './live.js';

const utf8 = (s) => new TextEncoder().encode(s);
// fn with its results remembered (for hashes, asked for again on every reload)
const remembered = (fn) => {
    const known = new Map();
    return (x) => {
        if (!known.has(x)) known.set(x, fn(x));
        return known.get(x);
    };
};
// A key's public id (named in key ops) and the relay tag of what it encrypts are
// different hashes, so knowing an id does not reveal where the messages are.
const keyIdOf = remembered((key) => sha256Hex(utf8(`wejure-key-id:${key}`)));
const tagOf = remembered((key) => sha256Hex(utf8(`wejure-envelope:${key}`)));
const union = (...lists) => relayUrls(lists.flat());   // relay lists, cleaned (they come from other people)

async function envelope(key, inner) {
    return finalizeEvent({
        kind: KIND.ENVELOPE,
        created_at: Math.floor(Date.now() / 1000),
        tags: [['h', await tagOf(key)]],
        content: nip44.encrypt(JSON.stringify(inner), hexToBytes(key)),
    }, generateSecretKey());
}

// The signed events inside the envelopes encrypted with any of `keys` ([{key}]).
async function openEnvelopes(s, relays, keys, kind) {
    if (!keys.length) return [];
    const byTag = new Map(await Promise.all(keys.map(async (k) => [await tagOf(k.key), k.key])));
    const envs = await synced(s, relays, { kinds: [KIND.ENVELOPE] }, '#h', [...byTag.keys()]);
    // each envelope is decrypted and its content's signature checked once (cache.js)
    const inners = await decryptAll(s, envs, (env) => {
        const key = byTag.get(env.tags.find((t) => t[0] === 'h')?.[1]);
        const inner = JSON.parse(nip44.decrypt(env.content, hexToBytes(key)));
        return checkEvent(inner) ? inner : null;
    });
    return inners.filter((inner) => inner?.kind === kind);
}

// ---- the user's own list of communities (encrypted to themselves) ----

const LIST = 'wejure/communities';

const listEvent = (s) => latest(s.pool, s.relays, { kinds: [KIND.APP_DATA], authors: [s.pk], '#d': [LIST] });

function entriesOf(s, e) {
    if (!e) return [];
    try { return JSON.parse(nip44.decrypt(e.content, getConversationKey(s.sk, s.pk))); } catch { return []; }
}

const readList = async (s) => entriesOf(s, await listEvent(s));

async function changeList(s, change) {
    const prev = await listEvent(s);
    const content = nip44.encrypt(JSON.stringify(change(entriesOf(s, prev))), getConversationKey(s.sk, s.pk));
    await publish(s.pool, s.relays, sign(s, { kind: KIND.APP_DATA, tags: [['d', LIST]], content, created_at: after(prev) }));
}

const remember = (s, ref, relays) => changeList(s, (list) => [...list.filter((e) => e.ref !== ref), { ref, relays }]);
const forget = (s, ref) => changeList(s, (list) => list.filter((e) => e.ref !== ref));

// Key bundles addressed to s: ref -> {relays, keys: Map keyId -> {scope, key}}.
async function bundles(s) {
    const out = new Map();
    for (const r of await unwrapAll(s)) {
        if (r.kind !== KIND.KEY_BUNDLE) continue;
        let b;
        try { b = JSON.parse(r.content); } catch { continue; }
        if (!b || typeof b.ref !== 'string' || !Array.isArray(b.keys)) continue;
        const entry = out.get(b.ref) ?? { relays: [], keys: new Map(), from: new Set() };
        entry.relays = union(entry.relays, b.relays);
        entry.from.add(r.pubkey);
        // a bundle's scope labels are not trusted: openCommunity takes each key's
        // scope from the signed op log
        for (const k of b.keys) {
            if (typeof k?.key === 'string' && /^[0-9a-f]{64}$/.test(k.key)) entry.keys.set(await keyIdOf(k.key), k.key);
        }
        out.set(b.ref, entry);
    }
    return out;
}

// The communities s has joined, and invitations to private ones not yet accepted.
export async function myCommunities(s) {
    const joined = new Map((await readList(s)).map((e) => [e.ref, e.relays]));
    const invitations = [...(await bundles(s)).entries()]
        .filter(([ref]) => !joined.has(ref))
        .map(([ref, b]) => ({ ref, relays: b.relays, from: [...b.from] }));
    return { joined, invitations };
}

export async function accept(s, invitation) {
    await remember(s, invitation.ref, invitation.relays);
}

// ---- loading ----

// `known`: an earlier context of the same community. Ops are never withdrawn,
// so its ops carry over, and if none have arrived since, so does its state.
export async function openCommunity(s, ref, { relays, known } = {}) {
    const b = (await bundles(s)).get(ref);
    const listed = (await readList(s)).find((e) => e.ref === ref);
    const where = union(relays ?? [], b?.relays ?? [], listed?.relays ?? []);
    const rels = where.length ? where : s.relays;
    const bundled = [...(b?.keys ?? new Map()).entries()];   // [keyId, key]
    const founder = ref.split(':')[0];
    // On the first open the founder's ops are asked for separately too, so that
    // a flood of ops from others (anyone can tag an open community), all dated
    // the same second, cannot crowd the genesis op out of the pages (sync.js).
    const [plain, founders, sealed] = await Promise.all([
        synced(s, rels, { kinds: [KIND.COMMUNITY_OP] }, '#h', [ref]),
        known ? [] : query(s.pool, rels, { kinds: [KIND.COMMUNITY_OP], '#h': [ref], authors: [founder], limit: 5000 }),
        openEnvelopes(s, rels, bundled.map(([, key]) => ({ key })), KIND.COMMUNITY_OP),
    ]);
    const ops = new Map(known?.ops);
    for (const e of [...plain, ...founders, ...sealed]) ops.set(e.id, e);
    // Plaintext parents that the limits left out are fetched by id.
    for (let round = 0; round < 5; round++) {
        const missing = [...new Set([...ops.values()].flatMap((e) => e.tags.filter((t) => t[0] === 'parent').map((t) => t[1])))]
            .filter((id) => !ops.has(id));
        const more = missing.length ? await query(s.pool, rels, { kinds: [KIND.COMMUNITY_OP], ids: missing }) : [];
        if (!more.length) break;
        for (const e of more) ops.set(e.id, e);
    }
    const state = known && known.ops.size === ops.size ? known.state : resolve(ref, [...ops.values()]);
    if (!state) throw new Error('community not found, or no access');
    // Keys count only if a valid key op names them, and their scope is the one
    // that op gives: keys authenticate themselves through the log.
    const scopeOf = new Map([...state.keyOps].flatMap(([scope, ks]) => ks.map((k) => [k.keyId, scope])));
    const keys = new Map(bundled.filter(([id]) => scopeOf.has(id)).map(([id, key]) => [id, { scope: scopeOf.get(id), key }]));
    return { s, ref, relays: union(state.relays.length ? state.relays : rels), state, keys, ops };
}

// Reloads ctx. Reloads run one at a time: a call made while one runs waits for
// it, then shares the next one with every other call made meanwhile. So each
// call sees everything published before it was made, and a burst of calls (a
// watcher and the screen's reads) costs one or two reloads.
function reload(ctx) {
    if (!ctx.nextReload) {
        const running = ctx.reloading ?? Promise.resolve();
        ctx.nextReload = running.catch(() => {}).then(() => {
            ctx.nextReload = null;
            ctx.reloading = openCommunity(ctx.s, ctx.ref, { relays: ctx.relays, known: ctx })
                .then((fresh) => { Object.assign(ctx, fresh); });
            return ctx.reloading;
        });
    }
    return ctx.nextReload;
}

// Picks up other people's changes.
export const refresh = reload;

// Keeps ctx up to date while it is open: reloads it after new ops, messages or
// keys arrive, then calls onChange(ctx). Returns a function that stops it. The
// envelope tags change with every new key, so it re-subscribes when they do.
export function watch(ctx, onChange) {
    let stopped = false;
    let tags = null;
    let stop = () => {};
    const changed = debounce(async () => {
        if (stopped) return;
        await reload(ctx);
        await follow();
        if (!stopped) onChange(ctx);
    });
    const follow = async () => {
        const next = (await Promise.all([...ctx.keys.values()].map((k) => tagOf(k.key)))).sort();
        if (stopped || next.join() === tags?.join()) return;
        tags = next;
        stop();
        stop = subscribe(ctx.s, [
            { kinds: [KIND.COMMUNITY_OP, KIND.COMMUNITY_MESSAGE], '#h': [ctx.ref] },   // plaintext (open communities)
            ...(tags.length ? [{ kinds: [KIND.ENVELOPE], '#h': tags }] : []),
            { kinds: [KIND.GIFT_WRAP], '#p': [ctx.s.pk] },                            // new keys
        ], changed, ctx.relays);
    };
    follow();
    return () => { stopped = true; stop(); };
}

function currentKey(ctx, scope) {
    const id = ctx.state.currentKeyId(scope);
    const k = id && ctx.keys.get(id);
    if (!k) throw new Error(`no key for ${scope} yet`);
    return k.key;
}

// ---- writing ops ----

async function publishOp(ctx, body) {
    const { s, state } = ctx;
    if (state.encrypted('state') && body.type !== 'rekey' && state.needsRekey('state') && state.isMember(s.pk)) {
        await rekey(ctx, 'state');
    }
    const inner = sign(s, {
        kind: KIND.COMMUNITY_OP,
        tags: [['h', ctx.ref], ['community', ctx.ref], ...ctx.state.heads.map((p) => ['parent', p])],
        content: JSON.stringify(body),
    });
    const event = ctx.state.encrypted('state') ? await envelope(currentKey(ctx, 'state'), inner) : inner;
    await publish(s.pool, ctx.relays, event);
    await reload(ctx);
    if (!ctx.state.valid.has(inner.id)) throw new Error(`operation not allowed: ${body.type}`);
    return inner.id;
}

// Sends keys ([{scope, key}]) to each recipient, as a gift wrap on the community's
// relays and the recipient's own.
// Sends keys ([{scope, key}]) to each recipient. A bundle without keys still
// tells a new member about the community (open communities have no keys). A
// failed delivery to one recipient does not stop the others; their client gets
// the keys from the next rekey, or repair copies the bundle later.
async function deliver(ctx, recipients, keys, { always = false } = {}) {
    if (!keys.length && !always) return;
    const rumor = { kind: KIND.KEY_BUNDLE, content: JSON.stringify({ ref: ctx.ref, relays: ctx.relays, keys }) };
    for (const pk of recipients) {
        try {
            const to = union(ctx.relays, await relaysOf(ctx.s, pk));
            await publish(ctx.s.pool, to, wrapEvent(rumor, ctx.s.sk, pk));
        } catch (e) {
            console.warn(`could not deliver community keys to ${pk.slice(0, 8)}:`, e.message);
        }
    }
}

async function rekey(ctx, scope) {
    const key = randomHex(32);
    await publishOp(ctx, { type: 'rekey', scope, keyId: await keyIdOf(key) });
    await deliver(ctx, ctx.state.scopeMembers(scope), [{ scope, key }]);
    await reload(ctx);
}

const scopes = (state) => ['state', ...[...state.channels.values()].filter((c) => !c.archived).map((c) => `ch:${c.id}`)];
const canRekey = (ctx, scope) => (scope === 'state' ? ctx.state.isMember(ctx.s.pk) : ctx.state.inChannel(scope.slice(3), ctx.s.pk));

// Gives every scope that needs one a fresh key, and seals departed members'
// message chains in channels nobody sealed yet. Any member's client does this.
export async function heal(ctx) {
    for (const scope of scopes(ctx.state)) {
        if (ctx.state.needsRekey(scope) && canRekey(ctx, scope)) await rekey(ctx, scope);
    }
    await sealDeparted(ctx);
}

// ---- creating and joining ----

export async function createCommunity(s, { name, mode = 'private', join = 'invite', relays = s.relays }) {
    const nonce = randomHex(16);
    const ref = `${s.pk}:${nonce}`;
    const stateKey = mode === 'private' ? randomHex(32) : null;
    const genesis = sign(s, {
        kind: KIND.COMMUNITY_OP,
        tags: [['h', ref], ['community', ref]],
        content: JSON.stringify({ type: 'create', nonce, name, mode, join, relays, stateKeyId: stateKey && await keyIdOf(stateKey) }),
    });
    await publish(s.pool, relays, stateKey ? await envelope(stateKey, genesis) : genesis);
    if (stateKey) await deliver({ s, ref, relays }, [s.pk], [{ scope: 'state', key: stateKey }]);
    await remember(s, ref, relays);
    const ctx = await openCommunity(s, ref, { relays });
    await createChannel(ctx, { name: 'general' });
    return ctx;
}

export async function join(s, ref, relays) {
    const ctx = await openCommunity(s, ref, { relays });
    await publishOp(ctx, { type: 'join' });
    await remember(s, ref, ctx.relays);
    return ctx;
}

export async function leave(ctx) {
    const heads = {};
    for (const ch of ctx.state.channels.values()) {
        if (ctx.state.inChannel(ch.id, ctx.s.pk)) heads[ch.id] = await chainHeads(ctx, ch.id, ctx.s.pk);
    }
    await publishOp(ctx, { type: 'leave', heads });
    await forget(ctx.s, ctx.ref);
}

// ---- members and roles ----

// Keys of `scope` that ctx holds, as [{scope, key}].
const keysOf = (ctx, scope) => [...ctx.keys.values()].filter((k) => k.scope === scope).map((k) => ({ scope: k.scope, key: k.key }));

export async function addMember(ctx, pk, role = 'member') {
    await publishOp(ctx, { type: 'add', member: pk, role });
    // every state key, so they can check the log from the start, plus the history
    // of community-wide channels that share it
    const keys = [...keysOf(ctx, 'state')];
    for (const ch of ctx.state.channels.values()) {
        if (ch.visibility === 'community' && ch.history === 'shared') keys.push(...keysOf(ctx, `ch:${ch.id}`));
    }
    await deliver(ctx, [pk], keys, { always: true });   // also tells them about an open community
    await heal(ctx);   // from-join channels get a new key now
}

export async function removeMember(ctx, pk, { ban = false } = {}) {
    const heads = {};
    for (const ch of ctx.state.channels.values()) {
        if (ctx.state.inChannel(ch.id, pk) && readable(ctx, ch.id)) heads[ch.id] = await chainHeads(ctx, ch.id, pk);
    }
    if (ctx.state.rank(pk) === 4) {
        const id = await publishOp(ctx, { type: 'propose', action: { type: 'remove', member: pk, heads, ban } });
        await heal(ctx);
        return id;
    }
    await publishOp(ctx, { type: 'remove', member: pk, heads, ban });
    await heal(ctx);
}

export const setRole = (ctx, pk, role) =>
    (role === 'owner' || ctx.state.rank(pk) === 4
        ? publishOp(ctx, { type: 'propose', action: { type: 'set-role', member: pk, role } })
        : publishOp(ctx, { type: 'set-role', member: pk, role }));

export async function approve(ctx, proposal) {
    await publishOp(ctx, { type: 'approve', proposal });
    await heal(ctx);
}

export const updateSettings = (ctx, settings) => publishOp(ctx, { type: 'settings', ...settings });

// ---- channels ----

export async function createChannel(ctx, { name, visibility = 'community', history = 'shared', members = [] }) {
    const channel = randomHex(8);
    const encrypted = ctx.state.mode === 'private' || visibility === 'private';
    const key = encrypted ? randomHex(32) : null;
    await publishOp(ctx, { type: 'channel-create', channel, name, visibility, history, members, keyId: key && await keyIdOf(key) });
    if (key) {
        await deliver(ctx, ctx.state.scopeMembers(`ch:${channel}`), [{ scope: `ch:${channel}`, key }]);
        await reload(ctx);
    }
    return channel;
}

export const archiveChannel = (ctx, channel) => publishOp(ctx, { type: 'channel-archive', channel });

export const channelByName = (ctx, name) => [...ctx.state.channels.values()].find((c) => c.name === name)?.id;

export async function addToChannel(ctx, channel, pk) {
    await publishOp(ctx, { type: 'channel-add', channel, member: pk });
    if (ctx.state.channel(channel).history === 'shared') await deliver(ctx, [pk], keysOf(ctx, `ch:${channel}`));
    await heal(ctx);
}

export async function removeFromChannel(ctx, channel, pk) {
    const heads = readable(ctx, channel) ? await chainHeads(ctx, channel, pk) : undefined;
    await publishOp(ctx, { type: 'channel-remove', channel, member: pk, heads });
    await heal(ctx);
}

export async function leaveChannel(ctx, channel) {
    await publishOp(ctx, { type: 'channel-leave', channel, heads: await chainHeads(ctx, channel, ctx.s.pk) });
}

// ---- messages ----

const readable = (ctx, channel) => !ctx.state.encrypted(`ch:${channel}`) || keysOf(ctx, `ch:${channel}`).length > 0;
const tag = (e, name) => e.tags.find((t) => t[0] === name)?.[1];

// Every signed message in a channel that ctx can decrypt, before validity checks.
async function rawMessages(ctx, channel) {
    const scope = `ch:${channel}`;
    const events = ctx.state.encrypted(scope)
        ? await openEnvelopes(ctx.s, ctx.relays, keysOf(ctx, scope), KIND.COMMUNITY_MESSAGE)
        // plaintext: only from people who were ever members, so strangers' spam is not even fetched
        : await synced(ctx.s, ctx.relays, { kinds: [KIND.COMMUNITY_MESSAGE], '#h': [ctx.ref] }, 'authors', [...ctx.state.ever]);
    return events
        .filter((e) => tag(e, 'community') === ctx.ref && tag(e, 'channel') === channel)
        .map((e) => ({
            id: e.id, from: e.pubkey, at: e.created_at, ms: Number(tag(e, 'ms')) || e.created_at * 1000,
            topic: tag(e, 'topic') ?? '', text: e.content,
            prev: e.tags.filter((t) => t[0] === 'prev').map((t) => t[1]),
            seen: e.tags.filter((t) => t[0] === 'state').map((t) => t[1]),
        }));
}

// The latest messages of pk's chain in a channel (usually one).
async function chainHeads(ctx, channel, pk, raw) {
    const mine = (raw ?? await rawMessages(ctx, channel)).filter((m) => m.from === pk);
    const referenced = new Set(mine.flatMap((m) => m.prev));
    return mine.filter((m) => !referenced.has(m.id)).map((m) => m.id);
}

export async function sendMessage(ctx, channel, topic, text) {
    const scope = `ch:${channel}`;
    await reload(ctx);
    if (!ctx.state.inChannel(channel, ctx.s.pk)) throw new Error('not a member of this channel');
    if (ctx.state.needsRekey(scope)) await heal(ctx);
    const prev = await chainHeads(ctx, channel, ctx.s.pk);
    const inner = sign(ctx.s, {
        kind: KIND.COMMUNITY_MESSAGE, content: text,
        // created_at only has seconds; ms orders messages sent within the same second
        // `state` names the op log's heads the sender saw, which proves they had joined
        tags: [['h', ctx.ref], ['community', ctx.ref], ['channel', channel], ['topic', topic], ['ms', String(Date.now())],
            ...prev.map((p) => ['prev', p]), ...ctx.state.heads.map((h) => ['state', h])],
    });
    const event = ctx.state.encrypted(scope) ? await envelope(currentKey(ctx, scope), inner) : inner;
    await publish(ctx.s.pool, ctx.relays, event);
    return inner.id;
}

// The messages of a channel that count (see "Messages: what counts"), oldest first.
export async function readChannel(ctx, channel, { topic } = {}) {
    await reload(ctx);
    const { state } = ctx;
    const raw = await rawMessages(ctx, channel);
    const byId = new Map(raw.map((m) => [m.id, m]));
    const reachable = new Map();   // departed pubkey -> ids reachable from their sealed heads
    // Whether m is in its sender's chain as sealed when they departed.
    const inSealedChain = (m, heads) => {
        if (!reachable.has(m.from)) {
            const seen = new Set();
            const stack = [...heads];
            while (stack.length) {
                const id = stack.pop();
                const msg = byId.get(id);
                if (seen.has(id) || !msg || msg.from !== m.from) continue;
                seen.add(id);
                stack.push(...msg.prev);
            }
            reachable.set(m.from, seen);
        }
        return reachable.get(m.from).has(m.id);
    };
    const counts = (m) => {
        if (state.hidden.has(m.id) || state.retracted.get(m.id)?.has(m.from)) return false;
        if (!m.seen.some((at) => state.joinedBy(channel, m.from, at))) return false;   // written before joining
        const heads = state.departed.get(`${m.from}|${channel}`);
        if (state.inChannel(channel, m.from)) {
            // a member who left and came back: what they wrote while away does not
            // count, only their sealed chain and what they wrote since coming back
            return !heads || inSealedChain(m, heads) || m.seen.some((at) => state.joinedBy(channel, m.from, at, { latest: true }));
        }
        if (!state.everIn(channel, m.from)) return false;
        return !heads || inSealedChain(m, heads);   // without heads: not sealed yet
    };
    let messages = raw.filter(counts).sort((a, b) => a.ms - b.ms || (a.id < b.id ? -1 : 1));
    if (topic !== undefined) messages = messages.filter((m) => m.topic === topic);
    return messages;
}

export async function topics(ctx, channel) {
    const out = new Map();
    for (const m of await readChannel(ctx, channel)) {
        const t = out.get(m.topic) ?? { count: 0, last: 0 };
        out.set(m.topic, { count: t.count + 1, last: Math.max(t.last, m.at) });
    }
    return out;
}

export const hideMessage = (ctx, message) => publishOp(ctx, { type: 'hide', message });
export const retractMessage = (ctx, message) => publishOp(ctx, { type: 'retract', message });

// Records the last messages of departed members in channels ctx can read, where
// nobody has yet (e.g. a private channel the remover could not read).
async function sealDeparted(ctx) {
    const { state } = ctx;
    for (const ch of state.channels.values()) {
        if (!state.inChannel(ch.id, ctx.s.pk) || !readable(ctx, ch.id)) continue;
        // everyone who was ever in the channel, posted or not: an empty chain is a seal too
        const departed = [...(ch.visibility === 'community' ? state.ever : ch.ever)]
            .filter((pk) => !state.inChannel(ch.id, pk) && !state.departed.has(`${pk}|${ch.id}`));
        if (!departed.length) continue;
        const raw = await rawMessages(ctx, ch.id);
        for (const pk of departed) {
            await publishOp(ctx, { type: 'seal', member: pk, channel: ch.id, heads: await chainHeads(ctx, ch.id, pk, raw) });
        }
    }
}

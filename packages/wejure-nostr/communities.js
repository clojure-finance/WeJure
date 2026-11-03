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
import { hasOlder as olderExists, older, synced, watched } from './sync.js';
import { relaysOf } from './account.js';
import { unwrapAll } from './social.js';
import { ROLE, acceptedChain, coveredIndex, epochIndex, resolve, snapshotOf } from './community-state.js';
import { debounce } from './live.js';

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
// A channel message's sender, as a tag only holders of the key can compute:
// it finds a member's latest messages (chainHeads) without loading the
// channel's history. Relays can group a key's envelopes by sender with it,
// but not name the sender.
const senderTagOf = remembered((keyAndPk) => sha256Hex(utf8(`wejure-sender:${keyAndPk}`)));
const senderTag = (key, pk) => senderTagOf(`${key}:${pk}`);
const union = (...lists) => relayUrls(lists.flat());   // relay lists, cleaned (they come from other people)
const ENVELOPES = { kinds: [KIND.ENVELOPE] };
const plainMessages = (ref) => ({ kinds: [KIND.COMMUNITY_MESSAGE], '#h': [ref] });
const PAGE = 100;   // messages fetched at a time when looking for someone's latest ones
// Checkpoint ops are tagged so that they can be found without the ops around
// them: plaintext ones c=checkpoint, sealed ones on the envelope with this.
const MARK = 'checkpoint';
const markTagOf = remembered((key) => sha256Hex(utf8(`wejure-checkpoint:${key}`)));
const OPS = { kinds: [KIND.COMMUNITY_OP] };
const MARKED_OPS = { kinds: [KIND.COMMUNITY_OP], '#c': [MARK] };
export const CHECKPOINT_EVERY = 500;   // ops between checkpoints, at most
const PART = 25000;                    // characters per snapshot part (escaped, it stays within NIP-44's limit)

// sender: the inner event's author, for channel messages (see senderTag).
// mark: a checkpoint op (see MARK). The envelope is never dated before what it
// holds, so fetching envelopes from a time on finds the ops from then on.
async function envelope(key, inner, { sender, mark = false } = {}) {
    return finalizeEvent({
        kind: KIND.ENVELOPE,
        created_at: Math.max(Math.floor(Date.now() / 1000), inner.created_at),
        tags: [['h', await tagOf(key)], ...(sender ? [['s', await senderTag(key, sender)]] : []), ...(mark ? [['c', await markTagOf(key)]] : [])],
        content: nip44.encrypt(JSON.stringify(inner), hexToBytes(key)),
    }, generateSecretKey());
}

// The signed events of `kind` inside envs, which are encrypted with keys
// ([{key}]), in the order of envs (null where an envelope holds none). An op
// in an envelope dated before it does not count: someone fetching envelopes
// from a time on (after a checkpoint) would miss it.
async function openEach(s, envs, keys, kind) {
    const byTag = new Map(await Promise.all(keys.map(async (k) => [await tagOf(k.key), k.key])));
    // each envelope is decrypted and its content's signature checked once (cache.js)
    const inners = await decryptAll(s, envs, (env) => {
        const key = byTag.get(env.tags.find((t) => t[0] === 'h')?.[1]);
        const inner = JSON.parse(nip44.decrypt(env.content, hexToBytes(key)));
        return checkEvent(inner) ? inner : null;
    });
    return inners.map((inner, i) => (inner?.kind === kind && !(kind === KIND.COMMUNITY_OP && envs[i].created_at < inner.created_at) ? inner : null));
}

const openAll = async (s, envs, keys, kind) => (await openEach(s, envs, keys, kind)).filter(Boolean);

// The signed events of `kind` inside the envelopes encrypted with any of keys
// ([{key}]); from: as in synced() (the envelopes' times).
async function openEnvelopes(s, relays, keys, kind, { from } = {}) {
    if (!keys.length) return [];
    const tags = await Promise.all(keys.map((k) => tagOf(k.key)));
    return openAll(s, await synced(s, relays, ENVELOPES, '#h', tags, { from }), keys, kind);
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

// Key bundles addressed to s: ref -> {relays, keys: Map keyId -> key,
// labels: Map keyId -> Set of the scopes bundles named for it, from, ...}.
async function bundles(s) {
    const out = new Map();
    for (const r of await unwrapAll(s)) {
        if (r.kind !== KIND.KEY_BUNDLE) continue;
        let b;
        try { b = JSON.parse(r.content); } catch { continue; }
        if (!b || typeof b.ref !== 'string' || !Array.isArray(b.keys)) continue;
        const entry = out.get(b.ref) ?? { relays: [], keys: new Map(), labels: new Map(), from: new Set() };
        entry.relays = union(entry.relays, b.relays);
        entry.from.add(r.pubkey);
        // a bundle's scope labels are not trusted: openCommunity takes each key's
        // scope from the signed op log, and uses the labels only to decide what
        // to fetch first
        for (const k of b.keys) {
            if (typeof k?.key !== 'string' || !/^[0-9a-f]{64}$/.test(k.key)) continue;
            const id = await keyIdOf(k.key);
            entry.keys.set(id, k.key);
            if (typeof k.scope === 'string') {
                if (!entry.labels.has(id)) entry.labels.set(id, new Set());
                entry.labels.get(id).add(k.scope);
            }
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

// Fetches by id the plaintext parents of ops that are missing from ops.
async function fetchParents(s, relays, ops) {
    for (let round = 0; round < 5; round++) {
        const missing = [...new Set([...ops.values()].flatMap((e) => e.tags.filter((t) => t[0] === 'parent').map((t) => t[1])))]
            .filter((id) => !ops.has(id));
        const more = missing.length ? await query(s.pool, relays, { kinds: [KIND.COMMUNITY_OP], ids: missing }) : [];
        if (!more.length) return;
        for (const e of more) ops.set(e.id, e);
    }
}

const stateKeyIds = (state) => new Set((state?.keyOps.get('state') ?? []).map((k) => k.keyId));
const bodyOf = (e) => { try { return JSON.parse(e.content); } catch { return null; } };

// Ops from a time on (0: all of them): plaintext, and sealed under keys.
async function opsFrom(s, relays, ref, keys, from) {
    const [plain, sealed] = await Promise.all([
        synced(s, relays, OPS, '#h', [ref], { from }),
        openEnvelopes(s, relays, keys, KIND.COMMUNITY_OP, { from }),
    ]);
    return [...plain, ...sealed];
}

// The checkpoint and approve-checkpoint ops, all of them (they are few).
async function markedOps(s, relays, ref, keys) {
    const sealed = keys.length
        ? openAll(s, await synced(s, relays, ENVELOPES, '#c', await Promise.all(keys.map((k) => markTagOf(k.key)))), keys, KIND.COMMUNITY_OP)
        : [];
    return [...await synced(s, relays, MARKED_OPS, '#h', [ref]), ...await sealed];
}

// The text a checkpoint stored in parts (event ids, in order), or null if a
// part is missing or the text does not have the hash.
async function partsText(s, relays, keys, ids, hash) {
    if (!ids.length) return null;
    const byId = new Map((await query(s.pool, relays, { ids })).map((e) => [e.id, e]));
    const parts = ids.map((id) => byId.get(id));
    if (parts.some((e) => !e)) return null;
    const plain = await Promise.all(parts.map(async (e) => (e.kind === KIND.ENVELOPE ? (await openEach(s, [e], keys, KIND.SNAPSHOT_PART))[0] : e)));
    if (plain.some((e) => e?.kind !== KIND.SNAPSHOT_PART)) return null;
    const text = plain.map((e) => e.content).join('');
    return (await sha256Hex(utf8(text))) === hash ? text : null;
}

// Where a base's covered index goes once loaded (see ensureCovered).
function coveredHolder() {
    const holder = { index: null, loading: null };
    return Object.assign(holder, {
        has: (id) => holder.index?.has(id) ?? false,
        isAncestor: (a, b) => holder.index?.isAncestor(a, b) ?? false,
    });
}

// The base (see resolve) for chain[i], an accepted checkpoint: its event, its
// snapshot, and a holder for its covered index. The snapshot comes from its
// parts; if those are gone, it is computed from the checkpoint before (or the
// genesis) and must have the hash the owners approved. Null if neither works.
function baseFor(s, relays, ref, keys, chain, i) {
    const cp = chain[i];
    const key = `${ref} ${cp.id}`;
    const bases = (s.bases ??= new Map());   // per session: "<ref> <checkpoint id>" -> promise of its base
    if (!bases.has(key)) {
        bases.set(key, (async () => {
            const body = bodyOf(cp);
            let text = await partsText(s, relays, keys, body.state, body.hash);
            if (!text) {
                const prev = i > 0 ? await baseFor(s, relays, ref, keys, chain, i - 1) : null;
                if (i > 0 && !prev) return null;
                const at = resolve(ref, await opsFrom(s, relays, ref, keys, prev?.checkpoint.created_at ?? 0), { base: prev, upTo: cp.id });
                text = at && JSON.stringify(snapshotOf(at));
                if (!text || (await sha256Hex(utf8(text))) !== body.hash) return null;
            }
            return { checkpoint: cp, state: JSON.parse(text), covered: coveredHolder() };
        })().catch(() => null).then((base) => {
            if (!base) bases.delete(key);   // try again next time
            return base;
        }));
    }
    return bases.get(key);
}

const stateKeysOf = (ctx) => [...ctx.keys.values()].filter((k) => k.scope === 'state');

// Loads the covered indexes of ctx's checkpoints, once, so that old messages
// (which name ops from before the checkpoint) can be judged.
async function ensureCovered(ctx) {
    const holder = ctx.base?.covered;
    if (!holder || holder.index) return;
    holder.loading ??= (async () => {
        const epochs = [];
        for (const cp of ctx.chain) {
            const body = bodyOf(cp);
            const text = await partsText(ctx.s, ctx.relays, stateKeysOf(ctx), body.index, body.indexHash);
            if (text) epochs.push({ offset: body.offset, entries: JSON.parse(text) });
        }
        holder.index = coveredIndex(epochs);
    })().catch(() => { holder.loading = null; });
    await holder.loading;
}

// `known`: an earlier context of the same community. Ops are never withdrawn,
// so its ops carry over, and if none have arrived since, so does its state.
//
// With an accepted checkpoint, only the ops from its time on are fetched (and
// the checkpoint ops themselves): the state is its snapshot plus the ops that
// build on it (resolve).
export async function openCommunity(s, ref, { relays, known } = {}) {
    const b = (await bundles(s)).get(ref);
    const listed = (await readList(s)).find((e) => e.ref === ref);
    const where = union(relays ?? [], b?.relays ?? [], listed?.relays ?? []);
    const rels = where.length ? where : s.relays;
    const bundled = [...(b?.keys ?? new Map()).entries()];   // [keyId, key]
    const founder = ref.split(':')[0];
    const ops = new Map(known?.ops);
    // Sealed ops are under the state keys, and only the log can say which keys
    // those are (bundle labels are not trusted). So: first the keys the log
    // named before or the bundles label 'state', then any other key the log
    // names as one, and, if the genesis is still missing, every key. Channel
    // keys stay untouched, so opening a community fetches no messages.
    const named = stateKeyIds(known?.state);
    const tried = new Set(bundled.map(([id]) => id).filter((id) => named.has(id) || b?.labels.get(id)?.has('state')));
    let state = null;
    let chain = [];
    let base = null;
    let marked = [];
    for (let round = 0; ; round++) {
        const keys = bundled.filter(([id]) => tried.has(id)).map(([, key]) => ({ key }));
        marked = await markedOps(s, rels, ref, keys);
        chain = acceptedChain(ref, marked);
        base = chain.length ? await baseFor(s, rels, ref, keys, chain, chain.length - 1) : null;
        if (chain.length && !base) throw new Error('the community\'s latest checkpoint cannot be loaded right now');
        for (const e of [...await opsFrom(s, rels, ref, keys, base ? base.checkpoint.created_at : 0), ...marked]) ops.set(e.id, e);
        if (!base) {
            // On the first open the founder's ops are asked for separately too, so
            // that a flood of ops from others (anyone can tag an open community),
            // all dated the same second, cannot crowd the genesis op out of the
            // pages (sync.js); and plaintext parents still missing are fetched by id.
            if (!known) {
                for (const e of await query(s.pool, rels, { ...OPS, '#h': [ref], authors: [founder], limit: 5000 })) ops.set(e.id, e);
            }
            await fetchParents(s, rels, ops);
        }
        const same = known && known.ops.size === ops.size && (known.base?.checkpoint.id ?? null) === (base?.checkpoint.id ?? null);
        state = same ? known.state : resolve(ref, [...ops.values()], { base });
        const untried = bundled.map(([id]) => id).filter((id) => !tried.has(id));
        const next = state ? untried.filter((id) => stateKeyIds(state).has(id)) : untried;
        if (!next.length || round >= 3) break;
        next.forEach((id) => tried.add(id));
    }
    if (!state) throw new Error('community not found, or no access');
    // Keys count only if a valid key op names them, and their scope is the one
    // that op gives: keys authenticate themselves through the log.
    const scopeOf = new Map([...state.keyOps].flatMap(([scope, ks]) => ks.map((k) => [k.keyId, scope])));
    const keys = new Map(bundled.filter(([id]) => scopeOf.has(id)).map(([id, key]) => [id, { scope: scopeOf.get(id), key }]));
    return { s, ref, relays: union(state.relays.length ? state.relays : rels), state, keys, ops, chain, base, marked };
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
// keys arrive, then calls onChange(ctx). Returns a function that stops it. It
// listens to the mirrors the reads use (sync.js), so it adds no subscriptions
// of its own. What it listens for changes with ctx: envelope tags with every
// new key, the people whose plaintext messages count with every new member.
export function watch(ctx, onChange) {
    let stopped = false;
    const changed = debounce(async () => {
        if (stopped) return;
        await reload(ctx);
        await follow();
        if (!stopped) onChange(ctx);
    });
    const { s } = ctx;
    const stops = [
        watched(s, ctx.relays, { kinds: [KIND.COMMUNITY_OP] }, '#h', [ctx.ref], changed),   // plaintext ops (open communities)
        watched(s, s.relays, { kinds: [KIND.GIFT_WRAP] }, '#p', [s.pk], changed),           // new keys
    ];
    const following = { ops: [null, () => {}], channels: [null, () => {}], messages: [null, () => {}] };
    // Listens for values under name, unless it already does.
    const listen = (name, values, start) => {
        const key = [...values].sort().join();
        if (stopped || following[name][0] === key) return;
        following[name][1]();
        following[name] = [key, values.length ? start(values) : () => {}];
    };
    const tagsOf = (keys) => Promise.all(keys.map((k) => tagOf(k.key)));
    const follow = async () => {
        const keys = [...ctx.keys.values()];
        // sealed ops under state keys; channel messages, read a page at a time, under the others
        listen('ops', await tagsOf(keys.filter((k) => k.scope === 'state')), (vs) => watched(s, ctx.relays, ENVELOPES, '#h', vs, changed));
        listen('channels', await tagsOf(keys.filter((k) => k.scope !== 'state')), (vs) =>
            watched(s, ctx.relays, ENVELOPES, '#h', vs, changed, { paged: true }));
        listen('messages', ctx.state.mode === 'open' ? [...ctx.state.ever] : [], (vs) =>
            watched(s, ctx.relays, plainMessages(ctx.ref), 'authors', vs, changed, { paged: true }));
    };
    follow();
    return () => {
        stopped = true;
        stops.forEach((stop) => stop());
        Object.values(following).forEach(([, stop]) => stop());
    };
}

function currentKey(ctx, scope) {
    const id = ctx.state.currentKeyId(scope);
    const k = id && ctx.keys.get(id);
    if (!k) throw new Error(`no key for ${scope} yet`);
    return k.key;
}

// ---- writing ops ----

const isCheckpointOp = (body) => body.type === 'checkpoint' || body.type === 'approve-checkpoint';

// Publishes an op on the heads of `on` (default: the current state), dated no
// earlier than they are (an op dated before a checkpoint it builds on does
// not count; see postOrder). Checkpoint ops are counted apart
// (acceptedChain), so they need no key heal first and are not checked here.
async function publishOp(ctx, body, { on } = {}) {
    const { s, state } = ctx;
    const checkpointOp = isCheckpointOp(body);
    if (!checkpointOp && state.encrypted('state') && body.type !== 'rekey' && state.needsRekey('state') && state.isMember(s.pk)) {
        await rekey(ctx, 'state');
    }
    const at = on ?? ctx.state;
    const inner = sign(s, {
        kind: KIND.COMMUNITY_OP,
        tags: [['h', ctx.ref], ['community', ctx.ref], ...at.heads.map((p) => ['parent', p]), ...(checkpointOp ? [['c', MARK]] : [])],
        content: JSON.stringify(body),
        created_at: Math.max(Math.floor(Date.now() / 1000), (s.lastAt ?? 0) + 1, ...at.heads.map((h) => at.timeOf(h) ?? 0)),
    });
    const event = ctx.state.encrypted('state') ? await envelope(currentKey(ctx, 'state'), inner, { mark: checkpointOp }) : inner;
    await publish(s.pool, ctx.relays, event);
    await reload(ctx);
    if (!checkpointOp && !ctx.state.valid.has(inner.id)) throw new Error(`operation not allowed: ${body.type}`);
    if (!checkpointOp) rememberOp(ctx, inner.id, body);
    return inner.id;
}

// The session's recent ops per community, so that one a checkpoint dropped
// can be done again (redoDropped).
function rememberOp(ctx, id, body) {
    const mine = (ctx.s.myOps ??= new Map());
    mine.set(ctx.ref, [...(mine.get(ctx.ref) ?? []), { id, body }].slice(-50));
}

// Does again, on the current heads, this session's ops that the latest
// checkpoint dropped: they reached its approvers too late, so it neither
// covers them nor do they build on it. Ops no longer allowed are let go.
async function redoDropped(ctx) {
    const mine = ctx.s.myOps?.get(ctx.ref) ?? [];
    const lost = mine.filter((o) => !ctx.state.inOrder(o.id));
    if (!lost.length || !ctx.base) return 0;
    await ensureCovered(ctx);
    const dropped = lost.filter((o) => !ctx.base.covered.has(o.id));
    ctx.s.myOps.set(ctx.ref, mine.filter((o) => !lost.includes(o)));
    let redone = 0;
    for (const o of dropped) {
        try {
            await publishOp(ctx, o.body);
            redone++;
        } catch (e) {
            console.warn(`a ${o.body.type} that a checkpoint dropped is no longer allowed:`, e.message);
        }
    }
    return redone;
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

// ---- checkpoints ----

const ownersOf = (state) => state.members().filter((pk) => state.rank(pk) === ROLE.owner).sort();

// Publishes text in parts (sealed under the state key in private communities);
// resolves with their event ids.
async function publishParts(ctx, text) {
    const ids = [];
    for (let i = 0; i === 0 || i < text.length; i += PART) {
        const inner = sign(ctx.s, { kind: KIND.SNAPSHOT_PART, tags: [['h', ctx.ref], ['community', ctx.ref]], content: text.slice(i, i + PART) });
        const event = ctx.state.encrypted('state') ? await envelope(currentKey(ctx, 'state'), inner) : inner;
        await publish(ctx.s.pool, ctx.relays, event);
        ids.push(event.id);
    }
    return ids;
}

// Where the next checkpoint's covered index starts.
const nextOffset = (ctx) => {
    const prev = ctx.chain.at(-1);
    return prev ? bodyOf(prev).offset + bodyOf(prev).count : 0;
};

// Proposes a checkpoint on the current state: its snapshot and covered index
// in parts, then the checkpoint op on the state's heads.
async function proposeCheckpoint(ctx) {
    const { state } = ctx;
    const offset = nextOffset(ctx);
    const text = JSON.stringify(snapshotOf(state));
    const index = JSON.stringify(epochIndex(state, offset));
    return publishOp(ctx, {
        type: 'checkpoint', prev: ctx.chain.at(-1)?.id ?? null,
        hash: await sha256Hex(utf8(text)), indexHash: await sha256Hex(utf8(index)),
        state: await publishParts(ctx, text), index: await publishParts(ctx, index),
        owners: ownersOf(state), offset, count: state.order.length,
    }, { on: state });
}

// Whether proposal p says what the log says (the state it was written on, its
// covered index and owners, and parts that hold them), and leaves out no valid
// op this client knows: once accepted, ops that do not build on it are
// ignored, so it waits for a proposal that covers them.
async function verifyCheckpoint(ctx, p) {
    const body = bodyOf(p);
    const { state } = ctx;
    const dropped = state.order.slice(1).some((o) => state.valid.has(o.id) && !isCheckpointOp(o.body)
        && o.id !== p.id && !state.isAncestor(o.id, p.id) && !state.isAncestor(p.id, o.id));
    if (dropped) return false;
    const at = resolve(ctx.ref, [...ctx.ops.values()], { base: ctx.base, upTo: p.id });
    if (!at || body.offset !== nextOffset(ctx) || body.count !== at.order.length || body.owners.join() !== ownersOf(at).join()) return false;
    const text = JSON.stringify(snapshotOf(at));
    const index = JSON.stringify(epochIndex(at, body.offset));
    if ((await sha256Hex(utf8(text))) !== body.hash || (await sha256Hex(utf8(index))) !== body.indexHash) return false;
    const keys = stateKeysOf(ctx);
    return (await partsText(ctx.s, ctx.relays, keys, body.state, body.hash)) !== null
        && (await partsText(ctx.s, ctx.relays, keys, body.index, body.indexHash)) !== null;
}

// verifyCheckpoint, remembered until new ops arrive (maintain runs on every update).
async function verified(ctx, p) {
    ctx.verified ??= new Map();
    const known = ctx.verified.get(p.id);
    if (known?.ops === ctx.ops.size) return known.ok;
    const ok = await verifyCheckpoint(ctx, p);
    ctx.verified.set(p.id, { ops: ctx.ops.size, ok });
    return ok;
}

// What a client does on its own while a community is open. Any client redoes
// its own ops that a checkpoint dropped (redoDropped). An owner's may
// vote (it is an owner of the latest checkpoint, or the founder before the
// first): then it backs the earliest proposal it can verify, unless it backs
// that one already; backing a later one only when its earlier choice no
// longer verifies (it would drop an op) keeps two from both winning among
// honest owners. And an owner proposes one when none verifies, every `every`
// ops or when the owners changed. Resolves with 'redone', 'approved',
// 'proposed' or null.
export async function maintain(ctx, { every = CHECKPOINT_EVERY } = {}) {
    await reload(ctx);
    if (await redoDropped(ctx)) return 'redone';
    const { s, state } = ctx;
    const cur = ctx.chain.at(-1) ?? null;
    const voters = cur ? bodyOf(cur).owners : [ctx.ref.split(':')[0]];
    const accepted = new Set(ctx.chain.map((c) => c.id));
    const isOwner = (pk) => voters.includes(pk) || state.rank(pk) === ROLE.owner;
    const pending = ctx.marked
        .filter((e) => bodyOf(e)?.type === 'checkpoint' && bodyOf(e).prev === (cur?.id ?? null) && !accepted.has(e.id) && isOwner(e.pubkey))
        .sort((a, b) => a.created_at - b.created_at || (a.id < b.id ? -1 : 1));
    let good = null;
    for (const p of pending) {
        if (await verified(ctx, p)) { good = p; break; }
    }
    if (good && voters.includes(s.pk)) {
        const backed = ctx.marked.some((e) => e.pubkey === s.pk && (e.id === good.id || bodyOf(e)?.checkpoint === good.id));
        if (!backed) {
            await publishOp(ctx, { type: 'approve-checkpoint', checkpoint: good.id });
            return 'approved';
        }
    }
    if (!good && state.rank(s.pk) === ROLE.owner && state.order.length > 1) {
        const ownersChanged = ownersOf(state).join() !== [...voters].sort().join();
        if (state.order.length - 1 >= every || ownersChanged || pending.length) {
            await proposeCheckpoint(ctx);
            return 'proposed';
        }
    }
    return null;
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

const toMessage = (e) => ({
    id: e.id, from: e.pubkey, at: e.created_at, ms: Number(tag(e, 'ms')) || e.created_at * 1000,
    topic: tag(e, 'topic') ?? '', text: e.content,
    prev: e.tags.filter((t) => t[0] === 'prev').map((t) => t[1]),
    seen: e.tags.filter((t) => t[0] === 'state').map((t) => t[1]),
});
const inChannel = (ctx, channel) => (e) => tag(e, 'community') === ctx.ref && tag(e, 'channel') === channel;

// Where a channel's messages are: in envelopes under its keys, or, in plaintext
// channels, signed by people who were ever members (so strangers' spam is not
// even fetched). A mirror (sync.js) split on `field` into `values`.
async function sourceOf(ctx, channel) {
    const scope = `ch:${channel}`;
    if (ctx.state.encrypted(scope)) {
        const keys = keysOf(ctx, scope);
        return { keys, base: ENVELOPES, field: '#h', values: await Promise.all(keys.map((k) => tagOf(k.key))) };
    }
    return { keys: null, base: plainMessages(ctx.ref), field: 'authors', values: [...ctx.state.ever] };
}

// The signed messages of a channel that ctx has fetched and can decrypt,
// before validity checks: its recent history at first, more after loadOlder.
async function rawMessages(ctx, channel) {
    const src = await sourceOf(ctx, channel);
    const events = await synced(ctx.s, ctx.relays, src.base, src.field, src.values, { paged: true });
    const signed = src.keys ? await openAll(ctx.s, events, src.keys, KIND.COMMUNITY_MESSAGE) : events;
    return signed.filter(inChannel(ctx, channel)).map(toMessage);
}

// Fetches a channel's next page of older messages; resolves with whether
// there are older ones still. In plaintext channels the page is the whole
// community's, so it may hold few of this channel's messages.
export async function loadOlder(ctx, channel) {
    const src = await sourceOf(ctx, channel);
    return older(ctx.s, ctx.relays, src.base, src.field, src.values);
}

// Whether a channel has older messages than those fetched.
export async function hasOlder(ctx, channel) {
    const src = await sourceOf(ctx, channel);
    return olderExists(ctx.s, ctx.relays, src.base, src.field, src.values);
}

// pk's newest messages in a channel (about `limit`), asked for directly: by
// sender tag in encrypted channels, by author in plaintext ones.
async function newestBy(ctx, channel, pk, limit) {
    const src = await sourceOf(ctx, channel);
    const theirs = (e) => e.pubkey === pk && inChannel(ctx, channel)(e);
    if (src.keys) {
        if (!src.keys.length) return [];
        const tags = await Promise.all(src.keys.map((k) => senderTag(k.key, pk)));
        const envs = await query(ctx.s.pool, ctx.relays, { ...ENVELOPES, '#s': tags, limit });
        return (await openAll(ctx.s, envs, src.keys, KIND.COMMUNITY_MESSAGE)).filter(theirs).map(toMessage);
    }
    // plaintext: their newest messages in the whole community, page by page
    // until some are in this channel
    let until;
    for (let i = 0; i < 20; i++) {
        const page = await query(ctx.s.pool, ctx.relays, { ...plainMessages(ctx.ref), authors: [pk], until, limit });
        const found = page.filter(theirs);
        if (found.length || page.length < limit) return found.map(toMessage);
        until = page.at(-1).created_at;   // newest first, so the last is the oldest
    }
    return [];
}

// The latest messages of pk's chain in a channel (usually one). They can be
// older than the history fetched so far, so pk's newest are asked for too:
// PAGE of them to seal a departed member's chain, a few for one's own next
// message (heads are the newest; only a fork across devices makes several).
async function chainHeads(ctx, channel, pk, { limit = PAGE } = {}) {
    const mine = new Map();
    for (const m of [...await rawMessages(ctx, channel), ...await newestBy(ctx, channel, pk, limit)]) {
        if (m.from === pk) mine.set(m.id, m);
    }
    const referenced = new Set([...mine.values()].flatMap((m) => m.prev));
    return [...mine.values()].filter((m) => !referenced.has(m.id)).map((m) => m.id);
}

export async function sendMessage(ctx, channel, topic, text) {
    const scope = `ch:${channel}`;
    await reload(ctx);
    if (!ctx.state.inChannel(channel, ctx.s.pk)) throw new Error('not a member of this channel');
    if (ctx.state.needsRekey(scope)) await heal(ctx);
    const prev = await chainHeads(ctx, channel, ctx.s.pk, { limit: 10 });
    const inner = sign(ctx.s, {
        kind: KIND.COMMUNITY_MESSAGE, content: text,
        // created_at only has seconds; ms orders messages sent within the same second
        // `state` names the op log's heads the sender saw, which proves they had joined
        tags: [['h', ctx.ref], ['community', ctx.ref], ['channel', channel], ['topic', topic], ['ms', String(Date.now())],
            ...prev.map((p) => ['prev', p]), ...ctx.state.heads.map((h) => ['state', h])],
    });
    const event = ctx.state.encrypted(scope) ? await envelope(currentKey(ctx, scope), inner, { sender: ctx.s.pk }) : inner;
    await publish(ctx.s.pool, ctx.relays, event);
    return inner.id;
}

// The messages of a channel that count (see "Messages: what counts"), oldest first.
export async function readChannel(ctx, channel, { topic } = {}) {
    await reload(ctx);
    const { state } = ctx;
    const raw = await rawMessages(ctx, channel);
    // messages from before the checkpoint name ops it covers
    if (ctx.base && raw.some((m) => m.seen.some((at) => !state.inOrder(at)))) await ensureCovered(ctx);
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
        for (const pk of departed) {
            await publishOp(ctx, { type: 'seal', member: pk, channel: ch.id, heads: await chainHeads(ctx, ch.id, pk) });
        }
    }
}

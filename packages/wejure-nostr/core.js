// The redundancy layer: every write goes to all of a user's relays, every read
// asks all of them and merges, and repair() copies events to relays that miss them.
// Nothing here trusts a relay: events are signed, and invalid ones are dropped.
import { SimplePool } from 'nostr-tools/pool';
import { finalizeEvent, getEventHash, validateEvent, verifyEvent } from 'nostr-tools/pure';
import { bytesToHex } from 'nostr-tools/utils';

// Event kinds. Standard ones from the NIPs, then WeJure's own (placeholders).
export const KIND = {
    PROFILE: 0, POST: 1, FOLLOWS: 3, DELETION: 5, DM: 14, GIFT_WRAP: 1059,
    MUTE_LIST: 10000, RELAY_LIST: 10002, MEDIA_SERVERS: 10063, BLOSSOM_AUTH: 24242, APP_DATA: 30078,
    COMMUNITY_OP: 1460,         // a change to a community, signed by its author
    COMMUNITY_MESSAGE: 1461,    // a channel message, signed by its sender
    ENVELOPE: 1462,             // an encrypted op or message, from a throwaway key
    KEY_BUNDLE: 1463,           // community keys, only ever inside a gift wrap
    SNAPSHOT_PART: 1464,        // a piece of a community checkpoint's snapshot or index
};

// Whether an event is intact: well formed (string content, string tags, ...),
// its id the hash of its content (so a relay cannot pass off other content
// under a known id, which the cache keys on) and its signature valid. Gift
// wraps and envelopes are signed by one-time keys, so their outer signature
// proves nothing and is skipped; what they carry is checked after decryption.
// Valid signatures are remembered, so an event seen again (from another relay,
// or in the next query) costs only the hash, and an event object that passed
// (the pool checks what relays send, then the readers check it again) costs nothing.
const verified = new Set();
const checked = new WeakSet();
export function checkEvent(e) {
    if (checked.has(e)) return true;
    try { if (!validateEvent(e) || getEventHash(e) !== e.id) return false; } catch { return false; }
    if (e.kind !== KIND.GIFT_WRAP && e.kind !== KIND.ENVELOPE && !verified.has(e.id + e.sig)) {
        if (!verifyEvent(e)) return false;
        verified.add(e.id + e.sig);
    }
    checked.add(e);
    return true;
}

// Marks e as checked, for events from a trusted place (the encrypted device
// cache, which holds only events that were checked when they arrived).
export function trust(e) {
    checked.add(e);
    verified.add(e.id + e.sig);
}

// The entries of a relay list that are relay URLs. Relay lists come from other
// people (bundles, settings, NIP-65 lists); anything else would make the pool
// throw or hang.
export function relayUrls(list) {
    if (!Array.isArray(list)) return [];
    return [...new Set(list.filter((u) => {
        try { return typeof u === 'string' && ['ws:', 'wss:'].includes(new URL(u).protocol); } catch { return false; }
    }))];
}

// How far before its arrival an event matching filter can be dated, in seconds:
// a minute for clocks that run behind, plus two days for gift wraps, which are
// backdated at random by up to that much (NIP-59). Catching up with a relay
// (live.js, sync.js) asks for this much before the last event it sent.
export const lateness = (filter) => (filter.kinds?.includes(KIND.GIFT_WRAP) ? 2 * 24 * 3600 : 0) + 60;

// Relays refuse filters with very long lists (NIP-01 leaves the limit to them),
// so lists of ids, authors or tag values are sent in chunks.
const CHUNK = 200;
export function chunked(filter) {
    const key = Object.keys(filter).find((k) => Array.isArray(filter[k]) && filter[k].length > CHUNK);
    if (!key) return [filter];
    const parts = [];
    for (let i = 0; i < filter[key].length; i += CHUNK) parts.push(...chunked({ ...filter, [key]: filter[key].slice(i, i + CHUNK) }));
    return parts;
}

export const createPool = () => new SimplePool({ enablePing: false, enableReconnect: false, verifyEvent: checkEvent });

export const randomHex = (n) => bytesToHex(crypto.getRandomValues(new Uint8Array(n)));

export async function sha256Hex(bytes) {
    return bytesToHex(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)));
}

// Signs a template as the session's user. Timestamps only move forward within a
// session, so replaceable events (profile, follows, ...) written in the same
// second still replace each other in order.
export function sign(s, template) {
    const created_at = template.created_at ?? Math.max(Math.floor(Date.now() / 1000), (s.lastAt || 0) + 1);
    s.lastAt = Math.max(s.lastAt || 0, created_at);
    return finalizeEvent({ tags: [], content: '', ...template, created_at }, s.sk);
}

// created_at for a new version of a replaceable event: now, but always after
// prev (the version it replaces), whichever clock dated that one.
export const after = (prev) => Math.max(Math.floor(Date.now() / 1000), (prev?.created_at ?? 0) + 1);

// Calls fn(event) for every event a relay stores through publish() on pool.
const publishHooks = new WeakMap();
export function onPublish(pool, fn) {
    if (!publishHooks.has(pool)) publishHooks.set(pool, []);
    publishHooks.get(pool).push(fn);
}

// Sends event to every relay. Resolves with which relays stored it once at least
// minAcks did; rejects otherwise. A relay that is down simply counts as failed.
export async function publish(pool, relays, event, { minAcks = 1, maxWait = 3000 } = {}) {
    relays = relayUrls(relays);
    const results = await Promise.allSettled(pool.publish(relays, event, { maxWait }));
    const stored = relays.filter((_, i) => results[i].status === 'fulfilled');
    const failed = relays.filter((_, i) => results[i].status === 'rejected');
    if (stored.length < minAcks) {
        throw new Error(`stored on ${stored.length} of ${relays.length} relays, needed ${minAcks}`);
    }
    if (stored.length) for (const fn of publishHooks.get(pool) ?? []) fn(event);
    return { stored, failed };
}

// Asks every relay, merges, drops duplicates and anything malformed or badly
// signed, newest first. A `limit` applies per relay and chunk, so callers that
// want the newest n take the first n of the result. Each relay is asked on
// its own: the pool drops an id it has seen before checking the event, so a
// relay that sends a forged copy first would otherwise hide the real one.
export async function query(pool, relays, filter, { maxWait = 3000 } = {}) {
    relays = relayUrls(relays);
    if (!relays.length) return [];
    const batches = await Promise.all(chunked(filter).flatMap((f) => relays.map((url) => pool.querySync([url], f, { maxWait }))));
    const byId = new Map();
    for (const e of batches.flat()) if (checkEvent(e)) byId.set(e.id, e);
    return [...byId.values()].sort((a, b) => b.created_at - a.created_at || (a.id < b.id ? -1 : 1));   // as relays order
}

// The newest event matching filter (for replaceable kinds), or null.
export async function latest(pool, relays, filter) {
    return (await query(pool, relays, filter))[0] ?? null;
}

async function relayUp(pool, url) {
    try { await pool.ensureRelay(url, { connectionTimeout: 2000 }); return true; } catch { return false; }
}

// Makes every reachable relay hold every event matching filter that any of them
// holds, except events their author has deleted. Since events are signed, any
// client can do this for anyone's data; a relay cannot tell a copy from the original.
// Returns how many events were copied to each relay.
export async function repair(pool, relays, filter) {
    relays = relayUrls(relays);
    const per = await Promise.all(relays.map(async (url) => {
        if (!(await relayUp(pool, url))) return { url, up: false, events: [] };
        const events = await query(pool, [url], { limit: 5000, ...filter });
        return { url, up: true, events };
    }));
    const all = new Map();
    for (const p of per) for (const e of p.events) all.set(e.id, e);
    const deleted = deletedIds([...all.values()]);
    const copied = {};
    for (const p of per.filter((x) => x.up)) {
        const have = new Set(p.events.map((e) => e.id));
        const missing = [...all.values()].filter((e) => !have.has(e.id) && !deleted.has(e.id));
        const results = await Promise.allSettled(missing.map((e) => pool.publish([p.url], e)[0]));
        copied[p.url] = results.filter((r) => r.status === 'fulfilled').length;
    }
    return copied;
}

// Ids of the events in events that their own author deleted (NIP-09). A deletion
// signed by anyone else is ignored.
export function deletedIds(events) {
    const author = new Map(events.map((e) => [e.id, e.pubkey]));
    const deleted = new Set();
    for (const d of events) {
        if (d.kind !== KIND.DELETION) continue;
        for (const [name, id] of d.tags) if (name === 'e' && author.get(id) === d.pubkey) deleted.add(id);
    }
    return deleted;
}

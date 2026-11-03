// The redundancy layer: every write goes to all of a user's relays, every read
// asks all of them and merges, and repair() copies events to relays that miss them.
// Nothing here trusts a relay: events are signed, and invalid ones are dropped.
import { SimplePool } from 'nostr-tools/pool';
import { finalizeEvent, verifyEvent } from 'nostr-tools/pure';
import { bytesToHex, hexToBytes } from 'nostr-tools/utils';


// Event kinds. Standard ones from the NIPs, then WeJure's own (placeholders).
export const KIND = {
    PROFILE: 0, POST: 1, FOLLOWS: 3, DELETION: 5, DM: 14, GIFT_WRAP: 1059,
    MUTE_LIST: 10000, RELAY_LIST: 10002, MEDIA_SERVERS: 10063, BLOSSOM_AUTH: 24242, APP_DATA: 30078,
    COMMUNITY_OP: 1460,         // a change to a community, signed by its author
    COMMUNITY_MESSAGE: 1461,    // a channel message, signed by its sender
    ENVELOPE: 1462,             // an encrypted op or message, from a throwaway key
    KEY_BUNDLE: 1463,           // community keys, only ever inside a gift wrap
};

export const createPool = () => new SimplePool({ enablePing: false, enableReconnect: false });

export const randomHex = (n) => bytesToHex(crypto.getRandomValues(new Uint8Array(n)));

export async function sha256Hex(bytes) {
    return bytesToHex(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)));
}

// Signs a template as the session's user. Timestamps only move forward within a
// session, so replaceable events (profile, follows, ...) written in the same
// second still replace each other in order.
export function sign(s, template) {
    const t = Math.max(Math.floor(Date.now() / 1000), (s.lastAt || 0) + 1);
    const created_at = template.created_at ?? t;
    if (template.created_at === undefined) s.lastAt = t;
    return finalizeEvent({ tags: [], content: '', ...template, created_at }, s.sk);
}

// created_at for a new version of a replaceable event: now, but always after
// prev (the version it replaces), whichever clock dated that one.
export const after = (prev) => Math.max(Math.floor(Date.now() / 1000), (prev?.created_at ?? 0) + 1);

// Sends event to every relay. Resolves with which relays stored it once at least
// minAcks did; rejects otherwise. A relay that is down simply counts as failed.
export async function publish(pool, relays, event, { minAcks = 1, maxWait = 3000 } = {}) {
    const results = await Promise.allSettled(pool.publish(relays, event, { maxWait }));
    const stored = relays.filter((_, i) => results[i].status === 'fulfilled');
    const failed = relays.filter((_, i) => results[i].status === 'rejected');
    if (stored.length < minAcks) {
        throw new Error(`stored on ${stored.length} of ${relays.length} relays, needed ${minAcks}`);
    }
    return { stored, failed };
}

// Asks every relay, merges, drops duplicates and anything with a bad signature,
// newest first.
export async function query(pool, relays, filter, { maxWait = 3000 } = {}) {
    const events = await pool.querySync(relays, filter, { maxWait });
    const byId = new Map();
    for (const e of events) if (verifyEvent(e)) byId.set(e.id, e);
    return [...byId.values()].sort((a, b) => b.created_at - a.created_at);
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
    const per = await Promise.all(relays.map(async (url) => {
        if (!(await relayUp(pool, url))) return { url, up: false, events: [] };
        const events = (await pool.querySync([url], { limit: 5000, ...filter }, { maxWait: 3000 })).filter(verifyEvent);
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

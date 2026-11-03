// Mirrors: local copies of what relays hold, kept up to date by a live
// subscription, so that reading the same thing again costs one empty round trip
// per relay rather than fetching everything again.
//
// A mirror covers one filter, split on one list field: gift wraps split on '#p'
// (one value per recipient), envelopes on '#h' (one tag per key), and so on.
// The first sync for a value at a relay opens a live subscription for it there,
// then fetches what the relay already holds, in pages, so no result limit hides
// older events. From then on the subscription delivers every new event, and a
// sync only asks the relay for nothing, which it answers after everything it
// sent before (relays handle a connection's messages in order, and ours sends
// new events to subscribers before acknowledging them to their author).
//
// If the subscription drops (the relay restarts, or closes it), the next sync
// subscribes again and catches up from the value's mark: the creation time of
// the newest event that relay sent for it, never later than when it was sent.
// It asks for events from the mark on, minus how far back events can be dated
// (lateness in core.js), so a relay that was down, and so missed events or got
// them copied late by repair, is asked from where it left off. An event that
// reaches a relay while not subscribed and is dated more than that before the
// mark (a sender whose clock is several minutes slow, say) is missed until the
// next page load; a relay that sends new events to subscribers only after
// acknowledging them makes a sync miss what was published just before it.
import { matchFilter } from 'nostr-tools/filter';
import { checkEvent, chunked, lateness, onPublish, relayUrls } from './core.js';

const PAGE = 500;
// A page this long may have more behind it. Relays cap results at their own
// limit (often 500), which may be lower than PAGE; none caps below this.
const MAYBE_MORE = 100;
// Relays cap how many filters one subscription may have (ours at 20).
const FILTERS_PER_SUBSCRIPTION = 10;
const MAX_WAIT = 3000;
const NOTHING = { ids: ['0'.repeat(64)], limit: 1 };

// Subscribes to filters at a relay. Resolves with the subscription once the
// relay has sent what it holds (EOSE), or with null if it does not answer in
// time, refuses, or the connection drops.
function open(relay, filters, { onevent, onclose = () => {} }) {
    return new Promise((resolve) => {
        let sub = null;
        let timer = null;
        const finish = (result) => {
            if (!timer) return false;
            clearTimeout(timer);
            timer = null;
            resolve(result);
            return true;
        };
        timer = setTimeout(() => { finish(null); sub?.close('timeout'); }, MAX_WAIT);
        try {
            sub = relay.subscribe(filters, {
                onevent,
                oneose: () => finish(sub),
                onclose: (reason) => { if (!finish(null)) onclose(reason); },
                eoseTimeout: MAX_WAIT * 2,   // otherwise a timeout would look like an answer
            });
        } catch {
            finish(null);
        }
    });
}

async function connect(pool, url) {
    try { return await pool.ensureRelay(url, { connectionTimeout: MAX_WAIT }); } catch { return null; }
}

// One request: the events matching filter that relay url holds, or null if it
// did not answer in full.
async function request(pool, url, filter) {
    const relay = await connect(pool, url);
    if (!relay) return null;
    const events = [];
    const sub = await open(relay, [filter], { onevent: (e) => events.push(e) });
    if (!sub) return null;
    sub.close();
    return events;
}

// Every event matching filter that relay url holds, page by page, newest
// first; null if the relay did not answer in full.
async function fetchAll(pool, url, filter) {
    const out = new Map();
    for (const part of chunked(filter)) {
        let until = part.until;
        for (;;) {
            const page = await request(pool, url, { ...part, until, limit: PAGE });
            if (page === null) return null;
            let fresh = 0;
            let oldest = Infinity;
            for (const e of page) {
                if (!checkEvent(e)) continue;
                if (!out.has(e.id)) { out.set(e.id, e); fresh++; }
                oldest = Math.min(oldest, e.created_at);
            }
            if (page.length < MAYBE_MORE || oldest === Infinity) break;
            // The next page starts at the oldest second again, since more events
            // may share it; if that second alone fills a page, it is skipped.
            until = fresh ? oldest : oldest - 1;
        }
    }
    return [...out.values()];
}

// What a pool's mirrors share: the mirrors, and the round trips that show a
// relay has sent everything so far (one per relay, shared by all callers that
// ask before it goes out).
const registries = new WeakMap();
function registry(pool) {
    if (!registries.has(pool)) {
        registries.set(pool, { mirrors: new Map(), barriers: new Map() });
        onPublish(pool, (e) => offer(pool, e));   // what we publish counts at once
    }
    return registries.get(pool);
}

function barrier(pool, url) {
    const { barriers } = registry(pool);
    if (!barriers.has(url)) {
        barriers.set(url, Promise.resolve().then(() => {
            barriers.delete(url);
            return request(pool, url, NOTHING);
        }));
    }
    return barriers.get(url);
}

function createMirror(pool, base, field) {
    const buckets = new Map();   // value -> Map id -> event
    const relays = new Map();    // url -> {marks, covered, live, queue}
    const tagName = field.startsWith('#') ? field.slice(1) : null;
    const valuesOf = (e) => (tagName ? e.tags.filter((t) => t[0] === tagName).map((t) => t[1]) : [e.pubkey]);
    const now = () => Math.floor(Date.now() / 1000);

    const at = (url) => {
        if (!relays.has(url)) {
            relays.set(url, {
                marks: new Map(),     // value -> mark (seconds)
                covered: new Set(),   // values caught up and followed live since
                live: null,           // the live subscription: {values, close}
                queue: Promise.resolve(),
            });
        }
        return relays.get(url);
    };

    // Files e under the values it matches that the mirror follows; returns them.
    function add(e) {
        if (!matchFilter(base, e)) return [];
        const vs = valuesOf(e).filter((v) => buckets.has(v));
        for (const v of vs) buckets.get(v).set(e.id, e);
        return vs;
    }

    function advance(r, values, newest, sentBy) {
        for (const v of values) r.marks.set(v, Math.max(r.marks.get(v) ?? 0, Math.min(sentBy, newest.get(v) ?? 0)));
    }

    function drop(r, live) {
        live.close();
        if (r.live !== live) return;   // an older subscription, already replaced
        r.live = null;
        r.covered.clear();
    }

    // A live subscription at url for values (several, if there are many).
    async function subscribe(url, r, values) {
        const relay = await connect(pool, url);
        if (!relay) return null;
        const filters = chunked({ ...base, [field]: values, limit: 0 });
        const openSubs = new Set();   // closing a subscription twice upsets nostr-tools' count of them
        const live = {
            values: new Set(values),
            close: () => { const subs = [...openSubs]; openSubs.clear(); subs.forEach((sub) => sub.close()); },
        };
        const onevent = (e) => {
            if (!checkEvent(e)) return;
            const vs = add(e).filter((v) => r.covered.has(v));
            advance(r, vs, new Map(vs.map((v) => [v, e.created_at])), now());
        };
        for (let i = 0; i < filters.length; i += FILTERS_PER_SUBSCRIPTION) {
            let sub = null;
            sub = await open(relay, filters.slice(i, i + FILTERS_PER_SUBSCRIPTION), {
                onevent,
                onclose: () => { openSubs.delete(sub); drop(r, live); },
            });
            if (!sub) { live.close(); return null; }
            openSubs.add(sub);
        }
        return live;
    }

    // Fetches what url holds for values from their marks on; whether it answered.
    async function catchUp(url, r, values) {
        const groups = new Map();   // mark -> values, so values with the same mark share a request
        for (const v of values) {
            const mark = r.marks.get(v) ?? 0;
            if (!groups.has(mark)) groups.set(mark, []);
            groups.get(mark).push(v);
        }
        const results = await Promise.all([...groups].map(async ([mark, vs]) => {
            const asked = now();
            const events = await fetchAll(pool, url, { ...base, [field]: vs, since: mark ? mark - lateness(base) : undefined });
            if (events === null) return false;
            const newest = new Map();
            for (const e of events) {
                for (const v of add(e)) newest.set(v, Math.max(newest.get(v) ?? 0, e.created_at));
            }
            advance(r, vs, newest, asked);   // a future-dated event cannot push a mark ahead
            return true;
        }));
        return results.every(Boolean);
    }

    // Brings values at url up to date.
    async function step(url, values) {
        const r = at(url);
        const uncovered = values.filter((v) => !r.covered.has(v));
        if (!uncovered.length) {
            // followed live: only make sure everything sent so far has arrived
            if ((await barrier(pool, url)) === null && r.live) drop(r, r.live);
            return;
        }
        if (!r.live || uncovered.some((v) => !r.live.values.has(v))) {
            const live = await subscribe(url, r, [...new Set([...(r.live?.values ?? []), ...values])]);
            if (!live) return;   // relay down: the next sync tries again
            // the new subscription is up before the old one goes, so what the
            // old one followed has no gap
            const old = r.live;
            r.live = live;
            old?.close();
        }
        const live = r.live;
        if (await catchUp(url, r, uncovered)) {
            if (r.live === live) uncovered.forEach((v) => r.covered.add(v));
        }
    }

    async function sync(urls, values) {
        values = [...new Set(values)];
        for (const v of values) if (!buckets.has(v)) buckets.set(v, new Map());
        await Promise.all(relayUrls(urls).map((url) => {
            const r = at(url);
            r.queue = r.queue.then(() => step(url, values)).catch((e) => console.warn('sync failed:', e));
            return r.queue;
        }));
        const out = new Map();
        for (const v of values) for (const [id, e] of buckets.get(v)) out.set(id, e);
        return [...out.values()];
    }

    return { add, sync };
}

// Every event on relays matching base whose `field` is one of values: what
// query() would return, without its result limit, and after the first call
// from a live copy.
export function synced(s, relays, base, field, values) {
    const { mirrors } = registry(s.pool);
    const key = JSON.stringify([base, field]);
    if (!mirrors.has(key)) mirrors.set(key, createMirror(s.pool, base, field));
    return mirrors.get(key).sync(relays, values);
}

// Hands an event that arrived some other way (published by us, or from another
// live subscription) to the pool's mirrors.
export function offer(pool, e) {
    for (const m of registries.get(pool)?.mirrors.values() ?? []) m.add(e);
}

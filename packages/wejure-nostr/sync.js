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
//
// In browsers, each mirror bucket (a value's events, and its marks) is saved
// in the encrypted device cache (cache.js), so after a page load the first
// sync catches up from the saved marks instead of fetching everything.
//
// Screens that follow changes (watched) listen to the mirrors rather than
// subscribing themselves, so each event arrives once. While anyone listens, a
// dropped subscription is restored after a pause, catching up as above.
//
// Paged mirrors (for channel messages) hold only recent history: the first
// sync for a value fetches its newest WINDOW events, and older() fetches the
// next WINDOW below. A page ends on a whole second (times have seconds only,
// so the rest of its oldest second is fetched too); otherwise the history
// shown would have holes. Per relay and value they keep a floor: everything
// dated after it is there (0: everything). A catch-up that fills a whole
// window leaves a gap below it, so the floor moves up to the window and
// older() fills the gap.
import { matchFilter } from 'nostr-tools/filter';
import { checkEvent, chunked, lateness, onPublish, relayUrls, trust } from './core.js';
import { cacheOf } from './cache.js';

const PAGE = 500;
// A page this long may have more behind it. Relays cap results at their own
// limit (often 500), which may be lower than PAGE; none caps below this.
const MAYBE_MORE = 100;
// Relays cap how many filters one subscription may have (ours at 20).
const FILTERS_PER_SUBSCRIPTION = 10;
const MAX_WAIT = 3000;
const NOTHING = { ids: ['0'.repeat(64)], limit: 1 };
const SAVE_AFTER = 500;   // ms: changes to a bucket are saved together
// Paged mirrors: events per page. A shorter answer means the relay has no
// more, which holds since relays return at least MAYBE_MORE events.
const WINDOW = MAYBE_MORE;
const RETRY_AFTER = 2000;  // ms: a listened-to subscription that dropped is restored after this

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

// store: {loadBucket, saveBucket} (cache.js), or null to keep nothing.
// paged: keep only recent history until older() asks for more.
function createMirror(pool, base, field, store, paged) {
    const buckets = new Map();   // value -> Map id -> event
    const relays = new Map();    // url -> {marks, floors, covered, live, queue}
    const loads = new Map();     // value -> promise of its saved bucket being loaded
    const unsaved = new Map();   // value -> events not saved yet (marks are saved whole)
    const listeners = new Set(); // {relays, values, fn}: see watched()
    const retries = new Map();   // url -> timer restoring its subscription
    let saving = null;           // the timer of the next save
    let saved = Promise.resolve();   // saves run one at a time, so marks never land before their events
    const tagName = field.startsWith('#') ? field.slice(1) : null;
    const valuesOf = (e) => (tagName ? e.tags.filter((t) => t[0] === tagName).map((t) => t[1]) : [e.pubkey]);
    const now = () => Math.floor(Date.now() / 1000);

    const at = (url) => {
        if (!relays.has(url)) {
            relays.set(url, {
                url,
                marks: new Map(),     // value -> mark (seconds)
                floors: new Map(),    // paged: value -> everything dated after this is here (0: all)
                covered: new Set(),   // values caught up and followed live since
                live: null,           // the live subscription: {values, close}
                queue: Promise.resolve(),
            });
        }
        return relays.get(url);
    };

    const nameOf = (v) => JSON.stringify([base, field, v, ...(paged ? ['paged'] : [])]);
    // What is saved beside a bucket's events: per relay, its mark and floor.
    const positionsOf = (v) => Object.fromEntries([...relays]
        .filter(([, r]) => r.marks.has(v) || r.floors.has(v))
        .map(([url, r]) => [url, { mark: r.marks.get(v) ?? 0, floor: r.floors.get(v) }]));

    // Saves the buckets that changed: their new events, and all their marks.
    function save() {
        clearTimeout(saving);
        saving = null;
        saved = saved.then(() => {
            const changes = [...unsaved];
            unsaved.clear();
            return Promise.all(changes.map(async ([v, events]) => {
                // not saved (storage full, say): the events go with the next save
                if (!(await store.saveBucket(nameOf(v), events, positionsOf(v)))) unsaved.set(v, [...events, ...(unsaved.get(v) ?? [])]);
            }));
        }).catch((err) => console.warn('could not save a mirror:', err));
        return saved;
    }

    function changed(v, e) {
        if (!store) return;
        if (!unsaved.has(v)) unsaved.set(v, []);
        if (e) unsaved.get(v).push(e);
        saving ??= setTimeout(save, SAVE_AFTER);
    }

    // Starts following v: its bucket, filled from the saved copy if there is one.
    function load(v) {
        if (!loads.has(v)) {
            buckets.set(v, new Map());
            loads.set(v, (async () => {
                if (!store) return;
                const { events, marks } = await store.loadBucket(nameOf(v));
                for (const e of events) {
                    trust(e);
                    buckets.get(v).set(e.id, e);
                }
                for (const [url, saved] of Object.entries(marks)) {
                    const r = at(url);
                    const { mark, floor } = typeof saved === 'number' ? { mark: saved } : saved;
                    r.marks.set(v, Math.max(r.marks.get(v) ?? 0, mark ?? 0));
                    if (paged && typeof floor === 'number' && !r.floors.has(v)) r.floors.set(v, floor);
                }
            })().catch((err) => console.warn('could not load a mirror:', err)));
        }
        return loads.get(v);
    }

    // Files e under the values it matches that the mirror follows; returns them.
    function add(e) {
        if (!matchFilter(base, e)) return [];
        const vs = valuesOf(e).filter((v) => buckets.has(v));
        const fresh = [];
        for (const v of vs) {
            if (buckets.get(v).has(e.id)) continue;
            buckets.get(v).set(e.id, e);
            changed(v, e);
            fresh.push(v);
        }
        for (const l of fresh.length ? listeners : []) {
            if (!fresh.some((v) => l.values.has(v))) continue;
            try { l.fn(e); } catch (err) { console.warn('a listener failed:', err); }
        }
        return vs;
    }

    function advance(r, values, newest, sentBy) {
        for (const v of values) {
            const mark = Math.max(r.marks.get(v) ?? 0, Math.min(sentBy, newest.get(v) ?? 0));
            if (mark === r.marks.get(v)) continue;
            r.marks.set(v, mark);
            changed(v);
        }
    }

    function drop(r, live) {
        live.close();
        if (r.live !== live) return;   // an older subscription, already replaced
        r.live = null;
        r.covered.clear();
        restoreLater(r.url);
    }

    // The values listeners follow at url.
    const listenedAt = (url) => [...new Set([...listeners].filter((l) => l.relays.includes(url)).flatMap((l) => [...l.values]))];

    // Subscribes at url again after a pause, and again after that until it
    // works, while anyone listens there. Catches up the values that have been
    // read; paged mirrors only subscribe for the others (see listen).
    function restoreLater(url) {
        if (retries.has(url) || !listenedAt(url).length) return;
        retries.set(url, setTimeout(async () => {
            retries.delete(url);
            const values = listenedAt(url);
            if (!values.length) return;
            const read = paged ? values.filter((v) => at(url).floors.has(v)) : values;
            if (read.length) await sync([url], read);
            if (read.length < values.length) await follow([url], values);
            if (!at(url).live) restoreLater(url);
        }, RETRY_AFTER));
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
            const since = mark ? mark - lateness(base) : undefined;
            const pages = paged
                ? await fetchPages(url, { ...base, since }, vs)
                : await fetchAll(pool, url, { ...base, [field]: vs, since }).then((events) => events && [{ values: vs, events }]);
            if (pages === null) return false;
            const newest = new Map();
            for (const page of pages) {
                for (const e of page.events) {
                    for (const v of add(e)) newest.set(v, Math.max(newest.get(v) ?? 0, e.created_at));
                }
                if (!paged) continue;
                for (const v of page.values) {
                    if (!r.floors.has(v)) setFloor(r, v, page.floor);                            // first page
                    else if (page.floor) setFloor(r, v, Math.max(r.floors.get(v), page.floor)); // a gap below
                }
            }
            advance(r, vs, newest, asked);   // a future-dated event cannot push a mark ahead
            return true;
        }));
        return results.every(Boolean);
    }

    function setFloor(r, v, floor) {
        if (r.floors.get(v) === floor) return;
        r.floors.set(v, floor);
        changed(v);
    }

    // One page (WINDOW events, newest first, plus the rest of the oldest
    // second) per chunk of values; per page the values it covers, its events,
    // and the floor below it (0 if the relay has nothing older). Null if the
    // relay did not answer.
    async function fetchPages(url, filter, values) {
        const pages = [];
        for (const part of chunked({ ...filter, [field]: values })) {
            const got = await request(pool, url, { ...part, limit: WINDOW });
            if (got === null) return null;
            if (got.length < WINDOW) {
                pages.push({ values: part[field], events: got.filter(checkEvent), floor: 0 });
                continue;
            }
            // paging goes by what the relay sent, valid or not
            const oldest = Math.min(...got.map((e) => e.created_at).filter(Number.isInteger));
            if (!Number.isFinite(oldest)) return null;
            const rest = await request(pool, url, { ...part, since: oldest, until: oldest, limit: PAGE });
            if (rest === null) return null;
            pages.push({ values: part[field], events: [...got, ...rest].filter(checkEvent), floor: oldest - 1 });
        }
        return pages;
    }

    // Paged: fetches the next page below each value's floor at url.
    async function olderAt(url, values) {
        const r = at(url);
        const groups = new Map();   // floor -> values
        for (const v of values) {
            const floor = r.floors.get(v);
            if (!floor) continue;   // everything there, or never fetched here
            if (!groups.has(floor)) groups.set(floor, []);
            groups.get(floor).push(v);
        }
        for (const [floor, vs] of groups) {
            const pages = await fetchPages(url, { ...base, until: floor }, vs);
            if (pages === null) continue;
            for (const page of pages) {
                page.events.forEach(add);
                for (const v of page.values) setFloor(r, v, page.floor);
            }
        }
    }

    // Whether any relay has events for values older than those here.
    const hasOlder = (urls, values) => relayUrls(urls).some((url) => values.some((v) => (relays.get(url)?.floors.get(v) ?? 0) > 0));

    // Paged: fetches the next page of older events for values; resolves with
    // whether there are older ones still.
    async function older(urls, values) {
        values = [...new Set(values)];
        await Promise.all(values.map(load));
        await Promise.all(relayUrls(urls).map((url) => queued(url, () => olderAt(url, values))));
        return hasOlder(urls, values);
    }

    // Makes sure the live subscription at url includes values; whether it does.
    async function followAt(url, values) {
        const r = at(url);
        if (r.live && values.every((v) => r.live.values.has(v))) return true;
        const live = await subscribe(url, r, [...new Set([...(r.live?.values ?? []), ...values])]);
        if (!live) return false;   // relay down: the next sync tries again
        // the new subscription is up before the old one goes, so what the old
        // one followed has no gap
        const old = r.live;
        r.live = live;
        old?.close();
        return true;
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
        if (!(await followAt(url, values))) return;
        const live = r.live;
        if (await catchUp(url, r, uncovered)) {
            if (r.live === live) uncovered.forEach((v) => r.covered.add(v));
        }
    }

    // Runs fn(url) after whatever runs at url already.
    const queued = (url, fn) => {
        const r = at(url);
        r.queue = r.queue.then(() => fn(url)).catch((e) => console.warn('sync failed:', e));
        return r.queue;
    };

    // Subscribes for values at urls without fetching anything.
    async function follow(urls, values) {
        await Promise.all(values.map(load));
        await Promise.all(relayUrls(urls).map((url) => queued(url, () => followAt(url, values))));
    }

    async function sync(urls, values) {
        values = [...new Set(values)];
        await Promise.all(values.map(load));
        await Promise.all(relayUrls(urls).map((url) => queued(url, () => step(url, values))));
        const out = new Map();
        for (const v of values) for (const [id, e] of buckets.get(v)) out.set(id, e);
        return [...out.values()];
    }

    // Calls fn(event) for each new event for values at urls (see watched). A
    // paged mirror only subscribes: a page of each channel a watcher follows
    // would otherwise be fetched before anyone reads it.
    function listen(urls, values, fn) {
        const l = { relays: relayUrls(urls), values: new Set(values), fn };
        listeners.add(l);
        (paged ? follow(l.relays, values) : sync(l.relays, values)).then(() => {
            if (listeners.has(l)) l.relays.filter((url) => !at(url).live).forEach(restoreLater);
        });
        return () => listeners.delete(l);
    }

    return { add, sync, listen, older, hasOlder, save: () => (store ? save() : Promise.resolve()) };
}

function mirrorOf(s, base, field, paged = false) {
    const { mirrors } = registry(s.pool);
    const key = JSON.stringify([base, field, paged]);
    if (!mirrors.has(key)) mirrors.set(key, createMirror(s.pool, base, field, s.sk ? cacheOf(s) : null, paged));
    return mirrors.get(key);
}

// Every event on relays matching base whose `field` is one of values: what
// query() would return, without its result limit, and after the first call
// from a live copy. With paged, only the newest events at first (see above).
export const synced = (s, relays, base, field, values, { paged = false } = {}) =>
    mirrorOf(s, base, field, paged).sync(relays, values);

// For a paged mirror: fetches the next page of older events for values, and
// resolves with whether there are older ones still. synced() then returns them too.
export const older = (s, relays, base, field, values) => mirrorOf(s, base, field, true).older(relays, values);

// For a paged mirror: whether relays have events for values older than those fetched.
export const hasOlder = (s, relays, base, field, values) => mirrorOf(s, base, field, true).hasOlder(relays, values);

// Calls onEvent(event) for each event that newly reaches the mirror for
// values at relays (the same mirror as synced() with the same arguments),
// keeping its subscriptions there up while it listens. Returns a function
// that stops listening.
export const watched = (s, relays, base, field, values, onEvent, { paged = false } = {}) =>
    mirrorOf(s, base, field, paged).listen(relays, values, onEvent);

// Saves what the session's mirrors have not saved yet, now.
export async function saveMirrors(s) {
    await Promise.all([...(registries.get(s.pool)?.mirrors.values() ?? [])].map((m) => m.save()));
}

// Hands an event that arrived some other way (published by us, or from another
// live subscription) to the pool's mirrors.
export function offer(pool, e) {
    for (const m of registries.get(pool)?.mirrors.values() ?? []) m.add(e);
}

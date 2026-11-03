// A cache of decrypted events, so each gift wrap and envelope is decrypted and
// its signature checked once, not on every read. Events never change (an id is
// the hash of the content), so entries never go stale.
//
// Two levels: a Map for the page's lifetime, and, in browsers, IndexedDB, so a
// reload starts warm. IndexedDB entries are encrypted (AES-GCM) with a key
// derived from the account's secret key, which only the logged-in tab holds;
// one database per account, deleted on logout.
//
// The same database keeps the mirrors' copies of relay data (sync.js), so a
// page load fetches only what is new. Each mirror bucket is stored as batches
// of events plus its marks, all encrypted. Keys are HMACs (of event ids, of
// bucket names: which filter, which value), so the database does not show
// what the user reads or follows.
//
// None of it grows without limit. sync.js trims what a bucket holds when it is
// read; once a day, before any bucket is loaded, the buckets no page has read
// for UNUSED_DAYS are deleted (their marks say when they were last read; a
// channel a page only watches for new messages is not read). Decrypted entries
// live in two generations: every GENERATION_DAYS the older one is cleared and
// becomes the current one, and an entry read from the previous one is copied
// to the current one, so entries not read for one to two generations go.
// Only the inbox (gift wraps, read on every page) keeps everything: direct
// messages are not paged yet.
//
// Only one page per account owns the database (the first to open it, see
// own): it alone writes the saved mirrors and does the daily cleanup. So
// trimming or deleting a bucket never pulls events from under another page
// that loaded it, which would then save marks claiming events the database no
// longer has. Other pages read the saved mirrors and keep what they fetch in
// memory.

const DB_VERSION = 4;   // 4: decrypted entries in generations, saved mirrors with the day they were read
const DECRYPTED = ['decrypted-a', 'decrypted-b'];   // the generations; META says which is current
const MIRRORED = 'mirrored';   // "<bucket>": marks; "<bucket>:<batch>": events
const META = 'meta';           // "state": {current, since, maintained} (days)
const COMPACT_AT = 20;         // batches; more are merged into one when read
const UNUSED_DAYS = 30;        // a saved mirror bucket not read for longer is deleted
const GENERATION_DAYS = 30;    // how long a generation of decrypted entries is the current one
const today = () => Math.floor(Date.now() / 86400000);
const utf8 = (s) => new TextEncoder().encode(s);
const randomName = () => hex(crypto.getRandomValues(new Uint8Array(8)));
const dbName = (pk) => `wejure-${pk}`;

function request(req) {
    return new Promise((resolve, reject) => {
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

// The account's database, or null to work in memory only: no IndexedDB
// (private mode, blocked storage), or not open within 3 s (another tab holds
// an older version open). Logging out in another tab deletes the database,
// which waits until every tab has closed it: this one then closes it at once
// (db.gone) and goes on in memory.
async function openDb(pk) {
    if (!globalThis.indexedDB) return null;
    try {
        const req = indexedDB.open(dbName(pk), DB_VERSION);
        req.onupgradeneeded = (e) => {
            const db = req.result;
            // a cache: an older layout is dropped, not converted
            if (e.oldVersion < DB_VERSION) Array.from(db.objectStoreNames).forEach((name) => db.deleteObjectStore(name));
            for (const name of [...DECRYPTED, MIRRORED, META]) {
                if (!db.objectStoreNames.contains(name)) db.createObjectStore(name);
            }
        };
        const db = await new Promise((resolve) => {
            const timer = setTimeout(() => {
                req.onsuccess = () => req.result.close();   // opened too late: let it go
                resolve(null);
            }, 3000);
            req.onsuccess = () => { clearTimeout(timer); resolve(req.result); };
            req.onerror = () => { clearTimeout(timer); resolve(null); };
        });
        if (db) db.onversionchange = () => { db.gone = true; db.close(); };
        return db;
    } catch {
        return null;
    }
}

// Takes the lock that makes this page the database's owner, if no other page
// holds it: resolves with a function that releases it (it is also released
// when the page goes), or null. Without the Web Locks API, pages are told
// apart within this process only.
const held = new Set();
function own(name) {
    const locks = globalThis.navigator?.locks;
    if (!locks) {
        if (held.has(name)) return Promise.resolve(null);
        held.add(name);
        return Promise.resolve(() => held.delete(name));
    }
    return new Promise((resolve) => {
        locks.request(name, { ifAvailable: true }, (lock) => (lock ? new Promise((release) => resolve(release)) : resolve(null)))
            .catch(() => resolve(null));
    });
}

async function readMeta(db) {
    try {
        const row = await request(db.transaction(META, 'readonly').objectStore(META).get('state'));
        if (row) return row;
    } catch { /* closed meanwhile */ }
    return { current: 0, since: today(), maintained: 0 };
}

// The encryption key, and the key that hashes mirror bucket names.
async function deriveKeys(sk) {
    const base = await crypto.subtle.importKey('raw', sk, 'HKDF', false, ['deriveKey']);
    const hkdf = (info) => ({ name: 'HKDF', hash: 'SHA-256', salt: utf8('wejure-cache'), info: utf8(info) });
    return {
        key: await crypto.subtle.deriveKey(hkdf('v1'), base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']),
        names: await crypto.subtle.deriveKey(hkdf('mirror-names-v1'), base, { name: 'HMAC', hash: 'SHA-256', length: 256 }, false, ['sign']),
    };
}

async function seal(key, value) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    return { iv, data: await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, utf8(JSON.stringify(value))) };
}

async function unseal(key, row) {
    return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: row.iv }, key, row.data)));
}

const hex = (bytes) => [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('');

function done(tx) {
    return new Promise((resolve) => { tx.oncomplete = resolve; tx.onerror = resolve; tx.onabort = resolve; });
}

// Whether tx committed.
function committed(tx) {
    return new Promise((resolve) => { tx.oncomplete = () => resolve(true); tx.onerror = () => resolve(false); tx.onabort = () => resolve(false); });
}

function createCache(s) {
    const memory = new Map();
    const lastRead = new Map();   // bucket id -> the day it was last read, as loaded
    const persistent = (async () => {
        const db = await openDb(s.pk);
        if (!db) return null;
        const release = await own(`wejure-cache-${s.pk}`);
        const p = { db, closed: false, owner: !!release, release: release ?? (() => {}), meta: await readMeta(db), ...(await deriveKeys(s.sk)) };
        db.onversionchange = () => { db.gone = true; db.close(); p.release(); };
        if (db.gone) p.release();
        return p;
    })();
    // The database, or null to work in memory only (none, or closed). A
    // database closed under a request makes it throw; callers then carry on
    // without it.
    const usable = async () => {
        const p = await persistent;
        return p && !p.closed && !p.db.gone ? p : null;
    };
    // The database if this page owns it (see the top of this file).
    const writable = async () => {
        const p = await usable();
        return p?.owner ? p : null;
    };
    const rowKeys = new Map();   // id -> its key in the store
    const rowKey = async (p, id) => {
        if (!rowKeys.has(id)) rowKeys.set(id, hex(await crypto.subtle.sign('HMAC', p.names, utf8(`decrypted:${id}`))));
        return rowKeys.get(id);
    };
    // The decrypted entries' stores: the current generation, and the previous one.
    const generations = (p) => [DECRYPTED[p.meta.current], DECRYPTED[1 - p.meta.current]];

    // Writes sealed rows ([[key, row], ...]) to the current generation.
    async function putRows(p, rows) {
        const [current] = generations(p);
        try {
            const tx = p.db.transaction(current, 'readwrite');
            for (const [key, row] of rows) tx.objectStore(current).put(row, key);
            await done(tx);
        } catch { /* closed meanwhile: memory only */ }
    }

    // Map id -> value for those of ids that are cached (value may be null).
    async function getMany(ids) {
        const found = new Map();
        const missing = [];
        for (const id of ids) {
            if (memory.has(id)) found.set(id, memory.get(id));
            else missing.push(id);
        }
        const p = await usable();
        if (!p || !missing.length) return found;
        const keys = await Promise.all(missing.map((id) => rowKey(p, id)));   // before the transaction, which would not wait
        const [current, previous] = generations(p);
        let rows;
        try {
            const tx = p.db.transaction([current, previous], 'readonly');
            rows = await Promise.all(keys.map((key) => Promise.all([
                request(tx.objectStore(current).get(key)), request(tx.objectStore(previous).get(key))])));
        } catch {
            return found;
        }
        const carried = [];   // found in the previous generation only: copied to the current one
        await Promise.all(rows.map(async ([row, old], i) => {
            if (!row && !old) return;
            try {
                const value = await unseal(p.key, row ?? old);
                memory.set(missing[i], value);
                found.set(missing[i], value);
                if (!row) carried.push([keys[i], old]);
            } catch { /* written under another key: ignore */ }
        }));
        if (carried.length) await putRows(p, carried);
        return found;
    }

    // entries: [[id, value], ...]; values must be JSON.
    async function setMany(entries) {
        for (const [id, value] of entries) memory.set(id, value);
        const p = await usable();
        if (!p || !entries.length) return;
        await putRows(p, await Promise.all(entries.map(async ([id, value]) => [await rowKey(p, id), await seal(p.key, value)])));
    }

    const bucketId = async (p, name) => hex(await crypto.subtle.sign('HMAC', p.names, utf8(name)));
    const batchesOf = (id) => IDBKeyRange.bound(`${id}:`, `${id}:\uffff`);

    // A mirror bucket saved earlier: {events, marks, stale}, empty if there is
    // none. stale: last read before today (see writeBucket).
    async function loadBucket(name) {
        const none = { events: [], marks: {}, stale: false };
        await maintained;   // so the cleanup never deletes a bucket this page has loaded
        const p = await usable();
        if (!p) return none;
        const id = await bucketId(p, name);
        let keys, batches, marksRow;
        try {
            const store = p.db.transaction(MIRRORED, 'readonly').objectStore(MIRRORED);
            [keys, batches, marksRow] = await Promise.all([
                request(store.getAllKeys(batchesOf(id))), request(store.getAll(batchesOf(id))), request(store.get(id))]);
        } catch {
            return none;
        }
        const events = new Map();
        for (const batch of batches) {
            try { for (const e of await unseal(p.key, batch)) events.set(e.id, e); } catch { /* another key: ignore */ }
        }
        let saved = null;
        try { if (marksRow) saved = await unseal(p.key, marksRow); } catch { /* another key: ignore */ }
        if (keys.length > COMPACT_AT && p.owner) {
            // merge the batches into one; batches saved meanwhile are left alone
            const merged = await seal(p.key, [...events.values()]);
            try {
                const tx = p.db.transaction(MIRRORED, 'readwrite');
                keys.forEach((k) => tx.objectStore(MIRRORED).delete(k));
                tx.objectStore(MIRRORED).put(merged, `${id}:${randomName()}`);
                await done(tx);
            } catch { /* closed meanwhile: merged next time */ }
        }
        if (saved) lastRead.set(id, saved.read);
        return { events: [...events.values()], marks: saved?.marks ?? {}, stale: !!saved && saved.read !== today() };
    }

    // Adds events to a mirror bucket (or, with replace, puts them in place of
    // the saved ones) and replaces its marks, in one transaction, so saved
    // marks never run ahead of the saved events. read: the page has read the
    // bucket, so it counts as read today; otherwise the day it was read stays
    // (today for a new one). Resolves with whether they were saved (true when
    // there is no database, or this page does not own it).
    async function writeBucket(name, events, marks, { replace = false, read = false } = {}) {
        const p = await writable();
        if (!p) return true;
        const id = await bucketId(p, name);
        if (read || !lastRead.has(id)) lastRead.set(id, today());
        const [batch, marksRow] = await Promise.all([
            events.length ? seal(p.key, events) : null, seal(p.key, { marks, read: lastRead.get(id) })]);
        try {
            const tx = p.db.transaction(MIRRORED, 'readwrite');
            if (replace) tx.objectStore(MIRRORED).delete(batchesOf(id));
            if (batch) tx.objectStore(MIRRORED).put(batch, `${id}:${randomName()}`);
            tx.objectStore(MIRRORED).put(marksRow, id);
            return await committed(tx);
        } catch {
            return p.closed || !!p.db.gone;   // closed meanwhile: memory only from now on
        }
    }

    // Deletes the saved mirror buckets no page has read for more than
    // UNUSED_DAYS, and unreadable ones.
    async function expire(p) {
        const store = () => p.db.transaction(MIRRORED, 'readonly').objectStore(MIRRORED);
        const ids = (await request(store().getAllKeys())).filter((k) => !k.includes(':'));
        const marks = store();
        const rows = await Promise.all(ids.map((id) => request(marks.get(id))));
        const unused = [];
        await Promise.all(rows.map(async (row, i) => {
            let read = null;
            try { ({ read } = await unseal(p.key, row)); } catch { /* unreadable: goes */ }
            if (!(today() - read <= UNUSED_DAYS)) unused.push(ids[i]);
        }));
        if (!unused.length) return;
        const tx = p.db.transaction(MIRRORED, 'readwrite');
        for (const id of unused) {
            tx.objectStore(MIRRORED).delete(id);
            tx.objectStore(MIRRORED).delete(batchesOf(id));
        }
        await done(tx);
    }

    // The daily cleanup, in the page that owns the database, before it loads
    // any bucket: expire(), and every GENERATION_DAYS a new generation of
    // decrypted entries (the older store is cleared and becomes the current one).
    const maintained = persistent.then(async (p) => {
        if (!p?.owner || p.meta.maintained === today()) return;
        await expire(p);
        const meta = { ...p.meta, maintained: today() };
        const turn = today() - meta.since >= GENERATION_DAYS;
        if (turn) Object.assign(meta, { current: 1 - meta.current, since: today() });
        const tx = p.db.transaction([META, DECRYPTED[meta.current]], 'readwrite');
        if (turn) tx.objectStore(DECRYPTED[meta.current]).clear();
        tx.objectStore(META).put(meta, 'state');
        if (await committed(tx)) p.meta = meta;
    }).catch(() => { /* closed meanwhile: next time */ });

    // Closes the database (it cannot be deleted while open), and gives up owning it.
    async function close() {
        const p = await persistent;
        if (!p) return;
        p.closed = true;
        p.release();
        p.db.close();
    }

    return {
        getMany, setMany, loadBucket, close, maintained,
        saveBucket: (name, events, marks, read) => writeBucket(name, events, marks, { read }),
        replaceBucket: (name, events, marks, read) => writeBucket(name, events, marks, { replace: true, read }),
    };
}

// The cache of session s (created on first use).
export function cacheOf(s) {
    if (!s.cache) s.cache = createCache(s);
    return s.cache;
}

// Decrypts each of `events` with decrypt(event) -> value or null, using and
// filling the cache. Resolves with the values in the same order.
export async function decryptAll(s, events, decrypt) {
    const cache = cacheOf(s);
    const known = await cache.getMany(events.map((e) => e.id));
    const fresh = [];
    const out = events.map((e) => {
        if (known.has(e.id)) return known.get(e.id);
        let value = null;
        try { value = decrypt(e) ?? null; } catch { value = null; }
        fresh.push([e.id, value]);
        return value;
    });
    await cache.setMany(fresh);
    return out;
}

// Deletes the cache database of session s (on logout).
export async function forgetCache(s) {
    try {
        await s.cache?.close();
        globalThis.indexedDB?.deleteDatabase(dbName(s.pk));
    } catch { /* nothing to delete */ }
}

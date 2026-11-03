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
// of events plus its marks, all encrypted; its name (which filter, which
// value) only as an HMAC, so the database does not show what the user follows.

const DB_VERSION = 2;
const STORE = 'decrypted';
const MIRRORED = 'mirrored';   // "<bucket>": marks; "<bucket>:<batch>": events
const COMPACT_AT = 20;         // batches; more are merged into one when read
const utf8 = (s) => new TextEncoder().encode(s);
const randomName = () => hex(crypto.getRandomValues(new Uint8Array(8)));
const dbName = (pk) => `wejure-${pk}`;

function request(req) {
    return new Promise((resolve, reject) => {
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function openDb(pk) {
    if (!globalThis.indexedDB) return null;
    try {
        const req = indexedDB.open(dbName(pk), DB_VERSION);
        req.onupgradeneeded = () => {
            for (const name of [STORE, MIRRORED]) {
                if (!req.result.objectStoreNames.contains(name)) req.result.createObjectStore(name);
            }
        };
        return await request(req);
    } catch {
        return null;   // private mode or blocked storage: memory only
    }
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
    const persistent = (async () => {
        const db = await openDb(s.pk);
        if (!db) return null;
        const p = { db, closed: false, ...(await deriveKeys(s.sk)) };
        // Logging out in another tab deletes the database, which waits until
        // every tab has closed it: this one closes it and goes on in memory.
        db.onversionchange = () => { p.closed = true; db.close(); };
        return p;
    })();
    // The database, or null to work in memory only (none, or closed). A
    // database closed under a request makes it throw; callers then carry on
    // without it.
    const usable = async () => {
        const p = await persistent;
        return p && !p.closed ? p : null;
    };

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
        let rows;
        try {
            const store = p.db.transaction(STORE, 'readonly').objectStore(STORE);
            rows = await Promise.all(missing.map((id) => request(store.get(id))));
        } catch {
            return found;
        }
        await Promise.all(rows.map(async (row, i) => {
            if (!row) return;
            try {
                const value = await unseal(p.key, row);
                memory.set(missing[i], value);
                found.set(missing[i], value);
            } catch { /* written under another key: ignore */ }
        }));
        return found;
    }

    // entries: [[id, value], ...]; values must be JSON.
    async function setMany(entries) {
        for (const [id, value] of entries) memory.set(id, value);
        const p = await usable();
        if (!p || !entries.length) return;
        const rows = await Promise.all(entries.map(async ([id, value]) => [id, await seal(p.key, value)]));
        try {
            const tx = p.db.transaction(STORE, 'readwrite');
            for (const [id, row] of rows) tx.objectStore(STORE).put(row, id);
            await done(tx);
        } catch { /* closed meanwhile: memory only */ }
    }

    const bucketId = async (p, name) => hex(await crypto.subtle.sign('HMAC', p.names, utf8(name)));
    const batchesOf = (id) => IDBKeyRange.bound(`${id}:`, `${id}:\uffff`);

    // A mirror bucket saved earlier: {events, marks}, empty if there is none.
    async function loadBucket(name) {
        const p = await usable();
        if (!p) return { events: [], marks: {} };
        const id = await bucketId(p, name);
        let keys, batches, marksRow;
        try {
            const store = p.db.transaction(MIRRORED, 'readonly').objectStore(MIRRORED);
            [keys, batches, marksRow] = await Promise.all([
                request(store.getAllKeys(batchesOf(id))), request(store.getAll(batchesOf(id))), request(store.get(id))]);
        } catch {
            return { events: [], marks: {} };
        }
        const events = new Map();
        for (const batch of batches) {
            try { for (const e of await unseal(p.key, batch)) events.set(e.id, e); } catch { /* another key: ignore */ }
        }
        let marks = {};
        try { if (marksRow) marks = await unseal(p.key, marksRow); } catch { /* another key: ignore */ }
        if (keys.length > COMPACT_AT) {
            // merge the batches into one; batches saved meanwhile are left alone
            const merged = await seal(p.key, [...events.values()]);
            try {
                const tx = p.db.transaction(MIRRORED, 'readwrite');
                keys.forEach((k) => tx.objectStore(MIRRORED).delete(k));
                tx.objectStore(MIRRORED).put(merged, `${id}:${randomName()}`);
                await done(tx);
            } catch { /* closed meanwhile: merged next time */ }
        }
        return { events: [...events.values()], marks };
    }

    // Adds events to a mirror bucket and replaces its marks, in one
    // transaction, so saved marks never run ahead of the saved events.
    // Resolves with whether they were saved (true when there is no database).
    async function saveBucket(name, events, marks) {
        const p = await usable();
        if (!p) return true;
        const id = await bucketId(p, name);
        const [batch, marksRow] = await Promise.all([events.length ? seal(p.key, events) : null, seal(p.key, marks)]);
        try {
            const tx = p.db.transaction(MIRRORED, 'readwrite');
            if (batch) tx.objectStore(MIRRORED).put(batch, `${id}:${randomName()}`);
            tx.objectStore(MIRRORED).put(marksRow, id);
            return await committed(tx);
        } catch {
            return p.closed;   // closed meanwhile: memory only from now on
        }
    }

    // Closes the database (it cannot be deleted while open).
    async function close() {
        const p = await persistent;
        if (!p) return;
        p.closed = true;
        p.db.close();
    }

    return { getMany, setMany, loadBucket, saveBucket, close };
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

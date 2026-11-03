// A cache of decrypted events, so each gift wrap and envelope is decrypted and
// its signature checked once, not on every read. Events never change (an id is
// the hash of the content), so entries never go stale.
//
// Two levels: a Map for the page's lifetime, and, in browsers, IndexedDB, so a
// reload starts warm. IndexedDB entries are encrypted (AES-GCM) with a key
// derived from the account's secret key, which only the logged-in tab holds;
// one database per account, deleted on logout.

const DB_VERSION = 1;
const STORE = 'decrypted';
const utf8 = (s) => new TextEncoder().encode(s);
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
        req.onupgradeneeded = () => req.result.createObjectStore(STORE);
        return await request(req);
    } catch {
        return null;   // private mode or blocked storage: memory only
    }
}

async function deriveKey(sk) {
    const base = await crypto.subtle.importKey('raw', sk, 'HKDF', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
        { name: 'HKDF', hash: 'SHA-256', salt: utf8('wejure-cache'), info: utf8('v1') },
        base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

function createCache(s) {
    const memory = new Map();
    const persistent = (async () => {
        const db = await openDb(s.pk);
        return db && { db, key: await deriveKey(s.sk) };
    })();

    // Map id -> value for those of ids that are cached (value may be null).
    async function getMany(ids) {
        const found = new Map();
        const missing = [];
        for (const id of ids) {
            if (memory.has(id)) found.set(id, memory.get(id));
            else missing.push(id);
        }
        const p = await persistent;
        if (!p || !missing.length) return found;
        const store = p.db.transaction(STORE, 'readonly').objectStore(STORE);
        const rows = await Promise.all(missing.map((id) => request(store.get(id))));
        await Promise.all(rows.map(async (row, i) => {
            if (!row) return;
            try {
                const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: row.iv }, p.key, row.data);
                const value = JSON.parse(new TextDecoder().decode(plain));
                memory.set(missing[i], value);
                found.set(missing[i], value);
            } catch { /* written under another key: ignore */ }
        }));
        return found;
    }

    // entries: [[id, value], ...]; values must be JSON.
    async function setMany(entries) {
        for (const [id, value] of entries) memory.set(id, value);
        const p = await persistent;
        if (!p || !entries.length) return;
        const rows = await Promise.all(entries.map(async ([id, value]) => {
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, p.key, utf8(JSON.stringify(value)));
            return [id, { iv, data }];
        }));
        const tx = p.db.transaction(STORE, 'readwrite');
        for (const [id, row] of rows) tx.objectStore(STORE).put(row, id);
        await new Promise((resolve) => { tx.oncomplete = resolve; tx.onerror = resolve; tx.onabort = resolve; });
    }

    // Closes the database (it cannot be deleted while open).
    async function close() {
        (await persistent)?.db.close();
    }

    return { getMany, setMany, close };
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

// Media on Blossom servers: a file is named by its SHA-256, uploaded to several
// servers, and fetched from whichever answers first with bytes matching the name.
import { KIND, latest, sha256Hex, sign } from './core.js';

// fetch() with a time limit on the answer's headers (the server answering at
// all) and a longer one, ms per kilobyte, for the body, so a large file on a
// slow line still gets through. bodyMs: the time for the body (and, on
// uploads, for sending it).
async function fetchIn(url, options, { headersMs, bodyMs = 60000 }, read = (res) => res) {
    const controller = new AbortController();
    let timer = setTimeout(() => controller.abort(), headersMs + (options.body ? bodyMs : 0));
    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timer);
        timer = setTimeout(() => controller.abort(), bodyMs);
        return await read(res);
    } finally {
        clearTimeout(timer);
    }
}

// Time to allow for moving n bytes: at least 30 s, more for big files (at 50 KB/s).
const transferMs = (n) => Math.max(30000, n / 50);

function auth(s, verb, hash) {
    const e = sign(s, {
        kind: KIND.BLOSSOM_AUTH,
        content: `${verb} blob`,
        tags: [['t', verb], ['x', hash], ['expiration', String(Math.floor(Date.now() / 1000) + 300)]],
        created_at: Math.floor(Date.now() / 1000),
    });
    return 'Nostr ' + btoa(JSON.stringify(e));   // the event is plain ASCII
}

// Uploads bytes to every server in servers (default: the user's). Resolves once at
// least one stored it; reports which did.
export async function upload(s, bytes, type, servers = s.mediaServers) {
    const sha256 = await sha256Hex(bytes);
    const results = await Promise.allSettled(servers.map(async (server) => {
        const res = await fetchIn(`${server}/upload`, {
            method: 'PUT', body: bytes,
            headers: { Authorization: auth(s, 'upload', sha256), 'Content-Type': type, 'X-SHA-256': sha256 },
        }, { headersMs: 5000, bodyMs: transferMs(bytes.length) });
        if (!res.ok) throw new Error(`${server}: HTTP ${res.status} ${res.headers.get('x-reason') ?? ''}`);
        return server;
    }));
    const stored = servers.filter((_, i) => results[i].status === 'fulfilled');
    const errors = results.filter((r) => r.status === 'rejected').map((r) => r.reason.message);
    if (!stored.length) throw new Error(`no media server stored the file: ${errors.join('; ')}`);
    return { sha256, type, stored, errors };
}

// Asks server to copy a blob from url itself (BUD-04), so the user uploads once.
export async function mirror(s, server, url, sha256) {
    const res = await fetchIn(`${server}/mirror`, {
        method: 'PUT', body: JSON.stringify({ url }),
        headers: { Authorization: auth(s, 'upload', sha256), 'Content-Type': 'application/json' },
    }, { headersMs: 60000 });   // the server fetches the file before it answers
    if (!res.ok) throw new Error(`${server}: HTTP ${res.status} ${res.headers.get('x-reason') ?? ''}`);
}

// Fetches a blob by hash from the first server that has it intact. Servers that are
// down, lack it, or send different bytes are skipped (and reported).
export async function fetchBlob(sha256, servers) {
    const skipped = [];
    for (const server of servers) {
        try {
            const got = await fetchIn(`${server}/${sha256}`, {}, { headersMs: 3000 },
                async (res) => (res.ok ? new Uint8Array(await res.arrayBuffer()) : res.status));
            if (typeof got === 'number') { skipped.push(`${server}: HTTP ${got}`); continue; }
            const bytes = got;
            if ((await sha256Hex(bytes)) !== sha256) { skipped.push(`${server}: wrong content`); continue; }
            return { bytes, server, skipped };
        } catch (e) {
            skipped.push(`${server}: ${e.cause?.code ?? e.message}`);
        }
    }
    throw Object.assign(new Error(`blob ${sha256} not found intact on any server`), { skipped });
}

// The media servers a user publishes their files to (BUD-03).
export async function mediaServersOf(s, pk) {
    const e = await latest(s.pool, s.relays, { kinds: [KIND.MEDIA_SERVERS], authors: [pk] });
    return e ? httpUrls(e.tags.filter((t) => t[0] === 'server').map((t) => t[1])) : [];
}

// The entries of a server list that are http(s) URLs (lists come from other people).
export function httpUrls(list) {
    return list.filter((u) => {
        try { return ['http:', 'https:'].includes(new URL(u).protocol); } catch { return false; }
    });
}

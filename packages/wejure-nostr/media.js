// Media on Blossom servers: a file is named by its SHA-256, uploaded to several
// servers, and fetched from whichever answers first with bytes matching the name.
import { KIND, latest, sha256Hex, sign } from './core.js';

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
        const res = await fetch(`${server}/upload`, {
            method: 'PUT', body: bytes,
            headers: { Authorization: auth(s, 'upload', sha256), 'Content-Type': type, 'X-SHA-256': sha256 },
            signal: AbortSignal.timeout(5000),
        });
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
    const res = await fetch(`${server}/mirror`, {
        method: 'PUT', body: JSON.stringify({ url }),
        headers: { Authorization: auth(s, 'upload', sha256), 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`${server}: HTTP ${res.status} ${res.headers.get('x-reason') ?? ''}`);
}

// Fetches a blob by hash from the first server that has it intact. Servers that are
// down, lack it, or send different bytes are skipped (and reported).
export async function fetchBlob(sha256, servers) {
    const skipped = [];
    for (const server of servers) {
        try {
            const res = await fetch(`${server}/${sha256}`, { signal: AbortSignal.timeout(3000) });
            if (!res.ok) { skipped.push(`${server}: HTTP ${res.status}`); continue; }
            const bytes = new Uint8Array(await res.arrayBuffer());
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
    return e ? e.tags.filter((t) => t[0] === 'server').map((t) => t[1]) : [];
}

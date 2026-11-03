// A small Blossom media server (BUD-01, -02, -04): files are named by their
// SHA-256 and stored on disk. Uploads need a signed authorization event
// (kind 24242) naming the file's hash.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { verifyEvent } from 'nostr-tools/pure';

const MAX_SIZE = 100 * 1024 * 1024;
const HASH = /^\/([0-9a-f]{64})(\.[a-z0-9]+)?$/;

const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-SHA-256',
    'Access-Control-Allow-Methods': 'GET, HEAD, PUT, OPTIONS',
};

function reply(res, status, body, headers = {}) {
    const json = typeof body === 'object';
    res.writeHead(status, { ...cors, ...(json ? { 'Content-Type': 'application/json' } : {}), ...headers });
    res.end(json ? JSON.stringify(body) : body);
}

const refuse = (res, status, reason) => reply(res, status, { message: reason }, { 'X-Reason': reason });

async function readBody(req) {
    const chunks = [];
    let size = 0;
    for await (const c of req) {
        size += c.length;
        if (size > MAX_SIZE) throw new Error('file too large');
        chunks.push(c);
    }
    return Buffer.concat(chunks);
}

// The upload authorization in the request, or a reason it is not acceptable.
function authorize(req, sha256) {
    const header = req.headers.authorization ?? '';
    if (!header.startsWith('Nostr ')) return 'missing authorization';
    let e;
    try { e = JSON.parse(Buffer.from(header.slice(6), 'base64').toString()); } catch { return 'malformed authorization'; }
    const tag = (n) => e.tags?.filter((t) => t[0] === n).map((t) => t[1]) ?? [];
    const now = Math.floor(Date.now() / 1000);
    if (!verifyEvent(e) || e.kind !== 24242) return 'invalid authorization';
    if (!tag('t').includes('upload')) return 'authorization is not for uploads';
    if (!(Number(tag('expiration')[0]) > now) || e.created_at > now + 60) return 'authorization expired';
    if (!tag('x').includes(sha256)) return 'authorization is for a different file';
    return null;
}

export function createBlossom(dir, publicUrl) {
    fs.mkdirSync(dir, { recursive: true });
    const file = (sha256) => path.join(dir, sha256);
    const meta = (sha256) => path.join(dir, `${sha256}.json`);

    function store(bytes, type, req) {
        const sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
        if (!fs.existsSync(file(sha256))) {
            fs.writeFileSync(file(sha256), bytes);
            fs.writeFileSync(meta(sha256), JSON.stringify({ type, size: bytes.length, uploaded: Math.floor(Date.now() / 1000) }));
        }
        const m = JSON.parse(fs.readFileSync(meta(sha256)));
        const base = publicUrl ?? `http://${req.headers.host}`;
        return { url: `${base}/${sha256}`, sha256, size: m.size, type: m.type, uploaded: m.uploaded };
    }

    // Handles the request if it is a Blossom one; returns whether it did.
    return async function handle(req, res) {
        const url = new URL(req.url, 'http://x');
        const blob = url.pathname.match(HASH);
        if (req.method === 'OPTIONS' && (blob || ['/upload', '/mirror'].includes(url.pathname))) {
            reply(res, 204, '');
            return true;
        }
        if (blob && (req.method === 'GET' || req.method === 'HEAD')) {
            const sha256 = blob[1];
            if (!fs.existsSync(file(sha256))) { refuse(res, 404, 'not found'); return true; }
            const m = JSON.parse(fs.readFileSync(meta(sha256)));
            res.writeHead(200, { ...cors, 'Content-Type': m.type || 'application/octet-stream', 'Content-Length': m.size,
                'Cache-Control': 'public, max-age=31536000, immutable' });
            if (req.method === 'HEAD') res.end(); else fs.createReadStream(file(sha256)).pipe(res);
            return true;
        }
        if (req.method === 'PUT' && url.pathname === '/upload') {
            let bytes;
            try { bytes = await readBody(req); } catch (e) { refuse(res, 413, e.message); return true; }
            const sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
            const problem = authorize(req, sha256);
            if (problem) { refuse(res, 401, problem); return true; }
            reply(res, 200, store(bytes, req.headers['content-type'] ?? 'application/octet-stream', req));
            return true;
        }
        if (req.method === 'PUT' && url.pathname === '/mirror') {
            // Copies a file from another server. Only http(s), and the bytes must
            // match the hash the authorization names. (A public deployment should
            // also refuse addresses in private networks.)
            let source;
            try { source = new URL(JSON.parse((await readBody(req)).toString()).url); } catch { refuse(res, 400, 'expected {"url": ...}'); return true; }
            if (!['http:', 'https:'].includes(source.protocol)) { refuse(res, 400, 'only http(s) sources'); return true; }
            let fetched;
            try {
                fetched = await fetch(source, { signal: AbortSignal.timeout(10000) });
                if (!fetched.ok) throw new Error(`source answered ${fetched.status}`);
            } catch (e) { refuse(res, 502, `could not fetch the source: ${e.message}`); return true; }
            const bytes = Buffer.from(await fetched.arrayBuffer());
            const sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
            const problem = authorize(req, sha256);
            if (problem) { refuse(res, 401, problem); return true; }
            reply(res, 200, store(bytes, fetched.headers.get('content-type') ?? 'application/octet-stream', req));
            return true;
        }
        return false;
    };
}

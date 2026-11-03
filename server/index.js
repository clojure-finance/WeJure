// WeJure's local server: the app (public/), a Nostr relay (WebSocket) and a
// Blossom media server, all on one port.
//
//   node server/index.js [--port 8020] [--host 127.0.0.1] [--data data] [--public public]
//
// Data (events.db and blobs/) goes to --data. PORT and HOST environment
// variables work too.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { NostrRelay } from '@nostr-relay/core';
import { Validator } from '@nostr-relay/validator';
import { WebSocketServer } from 'ws';
import { createBlossom } from './blossom.js';
import { SqliteEventStore } from './store.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { values: opts } = parseArgs({
    options: {
        port: { type: 'string', default: process.env.PORT ?? '8020' },
        host: { type: 'string', default: process.env.HOST ?? '127.0.0.1' },
        data: { type: 'string', default: path.join(root, 'data') },
        public: { type: 'string', default: path.join(root, 'public') },
    },
});

fs.mkdirSync(opts.data, { recursive: true });
const store = new SqliteEventStore(path.join(opts.data, 'events.db'));
const relay = new NostrRelay(store);
const validator = new Validator();
const blossom = createBlossom(path.join(opts.data, 'blobs'));

const types = {
    '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
    '.map': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
};

// Files in public/; any other path without a file extension gets index.html,
// since the app routes with real URLs such as /home.
function serveApp(req, res) {
    const pub = path.resolve(opts.public);
    const { pathname } = new URL(req.url, 'http://x');
    let file = path.join(pub, decodeURIComponent(pathname));
    if (file !== pub && !file.startsWith(pub + path.sep)) { res.writeHead(403); res.end(); return; }
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        if (path.extname(pathname)) { res.writeHead(404); res.end('not found'); return; }
        file = path.join(pub, 'index.html');
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-cache' });
    fs.createReadStream(file).pipe(res);
}

const server = http.createServer(async (req, res) => {
    try {
        if (await blossom(req, res)) return;
        serveApp(req, res);
    } catch (e) {
        if (!res.headersSent) res.writeHead(500);
        res.end(String(e.message));
    }
});

new WebSocketServer({ server }).on('connection', (ws) => {
    relay.handleConnection(ws);
    ws.on('message', async (data) => {
        try {
            const message = await validator.validateIncomingMessage(data);
            const result = await relay.handleMessage(ws, message);
            // @nostr-relay hands deletion requests to the store without broadcasting
            // them; subscribers need them to drop deleted posts right away. Only
            // newly accepted ones (the relay has checked the signature by then).
            if (message[0] === 'EVENT' && message[1].kind === 5 && result.success && !result.message?.startsWith('duplicate')) {
                await relay.broadcast(message[1]);
            }
        } catch (e) {
            ws.send(JSON.stringify(['NOTICE', e.message]));
        }
    });
    ws.on('close', () => relay.handleDisconnect(ws));
    ws.on('error', () => relay.handleDisconnect(ws));
});

server.listen(Number(opts.port), opts.host, () => {
    console.log(`WeJure at http://${opts.host}:${opts.port} (relay ws://${opts.host}:${opts.port}, data in ${opts.data})`);
});

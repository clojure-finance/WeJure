// Starts and crashes the servers the Node tests use: instances of server/ (relay
// and media server in one), plus the deliberately malicious ones in evil-*.js.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
export const tmpDir = (name) => fs.mkdtempSync(path.join(os.tmpdir(), `wejure-test-${name}-`));

function portOpen(port) {
    return new Promise((resolve) => {
        const s = net.connect(port, '127.0.0.1');
        s.once('connect', () => { s.destroy(); resolve(true); });
        s.once('error', () => resolve(false));
    });
}

async function waitFor(cond, what, ms = 15000) {
    const end = Date.now() + ms;
    while (Date.now() < end) {
        if (await cond()) return;
        await new Promise((r) => setTimeout(r, 50));
    }
    throw new Error(`timed out waiting for ${what}`);
}

// A running server: crash() kills it with SIGKILL (no clean shutdown), and
// crash({ wipe: true }) also deletes its data, so it comes back empty.
class Server {
    constructor(name, port, args, data) {
        Object.assign(this, { name, port, args, data });
    }
    get url() { return `ws://127.0.0.1:${this.port}`; }
    get http() { return `http://127.0.0.1:${this.port}`; }
    async start() {
        if (await portOpen(this.port)) throw new Error(`port ${this.port} is already in use`);
        this.log = '';
        this.proc = spawn(process.execPath, this.args, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
        this.proc.stdout.on('data', (d) => { this.log += d; });
        this.proc.stderr.on('data', (d) => { this.log += d; });
        await waitFor(() => portOpen(this.port), `${this.name} on ${this.port}`);
        return this;
    }
    async crash({ wipe = false } = {}) {
        if (this.proc) {
            this.proc.kill('SIGKILL');
            this.proc = null;
            await waitFor(async () => !(await portOpen(this.port)), `${this.name} to stop`);
        }
        if (wipe && this.data) fs.rmSync(this.data, { recursive: true, force: true });
    }
}

// server/index.js: relay at url, Blossom at http, data on disk.
export function wejureServer(port) {
    const data = tmpDir(`server-${port}`);
    return new Server(`server:${port}`, port, ['server/index.js', '--port', String(port), '--data', data], data);
}

export const evilRelay = (port) => new Server(`evil-relay:${port}`, port, [path.join(HERE, 'evil-relay.js'), String(port)]);
export const evilBlossom = (port) => new Server(`evil-blossom:${port}`, port, [path.join(HERE, 'evil-blossom.js'), String(port)]);

export async function startAll(servers) {
    await Promise.all(servers.map((s) => s.start()));
    return servers;
}
export async function crashAll(servers, opts) {
    await Promise.all(servers.map((s) => s.crash(opts)));
}

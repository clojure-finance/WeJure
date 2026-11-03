// The server's own protections: what the media server serves and accepts, and
// which files the app server hands out.
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { crashAll, startAll, wejureServer } from './harness.js';
import { upload } from 'wejure-nostr/media.js';

const server = wejureServer(7181);

describe('server', () => {
    let s;
    before(async () => {
        await startAll([server]);
        const sk = generateSecretKey();
        s = { sk, pk: getPublicKey(sk), mediaServers: [server.http] };
    });
    after(() => crashAll([server]));

    test('an uploaded web page is served as a sandboxed download, never as a page of the app', async () => {
        const html = new TextEncoder().encode('<script>alert(sessionStorage.getItem("wejure-session"))</script>');
        const { sha256 } = await upload(s, html, 'text/html');
        const res = await fetch(`${server.http}/${sha256}`);
        assert.equal(res.headers.get('content-type'), 'application/octet-stream');
        assert.match(res.headers.get('content-disposition'), /^attachment/);
        assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
        assert.match(res.headers.get('content-security-policy'), /sandbox/);

        const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 1, 2, 3]);
        const pic = await upload(s, png, 'image/png');
        const shown = await fetch(`${server.http}/${pic.sha256}`);
        assert.equal(shown.headers.get('content-type'), 'image/png', 'pictures are served as pictures');
        assert.equal(shown.headers.get('content-disposition'), null);
    });

    test('uploads and mirrors without a valid authorization are refused before anything is read or fetched', async () => {
        const res = await fetch(`${server.http}/upload`, { method: 'PUT', body: 'x' });
        assert.equal(res.status, 401);
        const mirror = await fetch(`${server.http}/mirror`, { method: 'PUT', body: JSON.stringify({ url: 'http://127.0.0.1:1/' }) });
        assert.equal(mirror.status, 401);
    });

    test('the app server hands out files in public/ only', async () => {
        const res = await fetch(`${server.http}/..%2fpackage.json`);
        assert.notEqual(res.status, 200);
        assert.equal((await fetch(`${server.http}/config.js`)).status, 200);
    });
});

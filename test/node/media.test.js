// Pictures and videos on several Blossom servers; servers crash or lie.
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { crashAll, evilBlossom, startAll, wejureServer } from './harness.js';
import { register } from 'wejure-nostr/account.js';
import { fetchBlob, mediaServersOf, mirror, upload } from 'wejure-nostr/media.js';
import { feedPage, imageOf, post } from 'wejure-nostr/social.js';

const relay = wejureServer(7111);
const b1 = wejureServer(7201);   // as media servers: Blossom at .http
const b2 = wejureServer(7202);
const b3 = wejureServer(7203);
const evil = evilBlossom(7209);
const picture = new TextEncoder().encode('pretend this is a PNG ' + Date.now());

describe('media on several Blossom servers', () => {
    let alice, bob;
    before(async () => {
        await startAll([relay, b1, b2, b3, evil]);
        alice = await register([relay.url], 'alice', 'pw', { mediaServers: [b1.http, b2.http] });
        bob = await register([relay.url], 'bob', 'pw');
    });
    after(async () => {
        [alice, bob].forEach((s) => s.pool.destroy());
        await crashAll([relay, b1, b2, b3, evil]);
    });

    test('a picture goes to all of the author\'s media servers, and readers still get it when one crashes', async () => {
        const media = await upload(alice, picture, 'image/png');
        assert.deepEqual(media.stored, [b1.http, b2.http], media.errors.join('; '));
        await post(alice, 'look', media);

        await b1.crash();
        const { posts } = await feedPage(bob, { authors: [alice.pk] });
        const hash = imageOf(posts[0]);
        const servers = await mediaServersOf(bob, alice.pk);   // from alice's server list, not from the post
        const got = await fetchBlob(hash, servers);
        assert.equal(got.server, b2.http);
        assert.match(got.skipped[0], /7201/);
        assert.deepEqual(got.bytes, picture);
        await b1.start();
    });

    test('a server can copy a file from another server, so the author uploads only once', async () => {
        const bytes = new TextEncoder().encode('mirrored ' + Date.now());
        const media = await upload(alice, bytes, 'image/png', [b1.http]);
        await mirror(alice, b3.http, `${b1.http}/${media.sha256}`, media.sha256);
        await b1.crash();
        const got = await fetchBlob(media.sha256, [b1.http, b3.http]);
        assert.equal(got.server, b3.http);
        await b1.start();
    });

    test('a server that sends different bytes is caught, because a file\'s name is its hash', async () => {
        const media = await upload(alice, picture, 'image/png', [b2.http]);
        const got = await fetchBlob(media.sha256, [evil.http, b2.http]);
        assert.equal(got.server, b2.http);
        assert.match(got.skipped[0], /wrong content/);
        await assert.rejects(fetchBlob(media.sha256, [evil.http]), /not found intact/);
    });

    test('a 5 MB video works the same way', async () => {
        const video = new Uint8Array(5 * 1024 * 1024).map((_, i) => (i * 7919) % 251);
        const t0 = Date.now();
        const media = await upload(alice, video, 'video/mp4');
        assert.deepEqual(media.stored, [b1.http, b2.http], media.errors.join('; '));
        await b2.crash();
        const got = await fetchBlob(media.sha256, [b2.http, b1.http]);
        assert.equal(got.bytes.length, video.length);
        console.log(`5 MB: uploaded to 2 servers and fetched back in ${Date.now() - t0} ms`);
        await b2.start();
    });
});

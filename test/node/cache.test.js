// The decryption cache and the event check it relies on.
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { KIND, checkEvent } from 'wejure-nostr/core.js';
import { decryptAll } from 'wejure-nostr/cache.js';

const person = () => { const sk = generateSecretKey(); return { sk, pk: getPublicKey(sk) }; };
const event = (who, kind, content) =>
    finalizeEvent({ kind, created_at: Math.floor(Date.now() / 1000), tags: [], content }, who.sk);

describe('cache', () => {
    test('content swapped under a known id and signature is refused, even after the original was checked', () => {
        const alice = person();
        const post = event(alice, KIND.POST, 'original');
        assert.ok(checkEvent(post));
        assert.ok(!checkEvent({ ...post, content: 'swapped' }));
        const env = event(person(), KIND.ENVELOPE, 'ciphertext');
        assert.ok(!checkEvent({ ...env, content: 'other ciphertext' }), 'outer signature skipped, hash still checked');
    });

    test('each event is decrypted once per session; failures are remembered too', async () => {
        const s = { ...person() };
        const events = [event(s, KIND.ENVELOPE, 'a'), event(s, KIND.ENVELOPE, 'b'), event(s, KIND.ENVELOPE, 'bad')];
        let calls = 0;
        const decrypt = (e) => {
            calls++;
            if (e.content === 'bad') throw new Error('not for us');
            return { text: e.content.toUpperCase() };
        };
        assert.deepEqual(await decryptAll(s, events, decrypt), [{ text: 'A' }, { text: 'B' }, null]);
        assert.equal(calls, 3);
        assert.deepEqual(await decryptAll(s, [...events].reverse(), decrypt), [null, { text: 'B' }, { text: 'A' }]);
        assert.equal(calls, 3, 'nothing decrypted twice');
    });
});

// The community rules on hand-built op histories: no relays, just the DAG.
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { KIND } from 'wejure-nostr/core.js';
import { resolve } from 'wejure-nostr/community-state.js';

const person = () => { const sk = generateSecretKey(); return { sk, pk: getPublicKey(sk) }; };
let clock = 1_000_000;

// A community with founder f; op() builds signed ops with explicit parents and times.
function community(mode = 'open') {
    const f = person();
    const ref = `${f.pk}:n1`;
    const op = (who, body, parents = [], at = clock++) => finalizeEvent({
        kind: KIND.COMMUNITY_OP, created_at: at, content: JSON.stringify(body),
        tags: [['community', ref], ...parents.map((p) => ['parent', p.id])],
    }, who.sk);
    const genesis = op(f, { type: 'create', nonce: 'n1', name: 'c', mode, stateKeyId: mode === 'private' ? 'k0' : undefined });
    return { f, ref, op, genesis };
}

const shuffle = (xs) => xs.map((x) => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(([, x]) => x);

describe('community rules', () => {
    test('a demoted admin\'s concurrent op fails, even backdated; ops the demoter had seen stand', () => {
        const { f, ref, op, genesis } = community();
        const [a, y, z] = [person(), person(), person()];
        const addA = op(f, { type: 'add', member: a.pk, role: 'moderator' }, [genesis]);
        const promote = op(f, { type: 'set-role', member: a.pk, role: 'admin' }, [addA]);
        const addY = op(a, { type: 'add', member: y.pk }, [promote]);
        const demote = op(f, { type: 'set-role', member: a.pk, role: 'member' }, [addY]);
        const addZ = op(a, { type: 'add', member: z.pk }, [addY], 1);   // never saw the demotion, dated long ago
        const s = resolve(ref, [genesis, addA, promote, addY, demote, addZ]);
        assert.equal(s.roleOf(a.pk), 'member');
        assert.ok(s.isMember(y.pk), 'seen by the demoter, so it stands');
        assert.ok(!s.isMember(z.pk), 'concurrent with the demotion, so it fails');
        assert.ok(!s.valid.has(addZ.id));
    });

    test('a removed moderator cannot act "before" the removal', () => {
        const { f, ref, op, genesis } = community();
        const [m, n] = [person(), person()];
        const addN = op(f, { type: 'add', member: n.pk }, [genesis]);
        const addM = op(f, { type: 'add', member: m.pk, role: 'moderator' }, [addN]);
        const removeM = op(f, { type: 'remove', member: m.pk }, [addM]);
        const removeN = op(m, { type: 'remove', member: n.pk }, [addM], 2);
        const rejoin = op(m, { type: 'add', member: m.pk, role: 'moderator' }, [addM], 3);
        const s = resolve(ref, [genesis, addN, addM, removeM, removeN, rejoin]);
        assert.ok(s.isMember(n.pk));
        assert.ok(!s.isMember(m.pk));
    });

    test('owner changes need a majority of owners', () => {
        const { f, ref, op, genesis } = community();
        const [b, c] = [person(), person()];
        const addB = op(f, { type: 'add', member: b.pk }, [genesis]);
        const addC = op(f, { type: 'add', member: c.pk }, [addB]);
        const pB = op(f, { type: 'propose', action: { type: 'set-role', member: b.pk, role: 'owner' } }, [addC]);   // 1 of 1
        const pC = op(f, { type: 'propose', action: { type: 'set-role', member: c.pk, role: 'owner' } }, [pB]);     // 1 of 2
        let s = resolve(ref, [genesis, addB, addC, pB, pC]);
        assert.equal(s.roleOf(b.pk), 'owner');
        assert.equal(s.roleOf(c.pk), 'member', 'one of two owners is not a majority');
        const aC = op(b, { type: 'approve', proposal: pC.id }, [pC]);
        const pRemoveF = op(c, { type: 'propose', action: { type: 'remove', member: f.pk } }, [aC]);                // 1 of 3
        s = resolve(ref, [genesis, addB, addC, pB, pC, aC, pRemoveF]);
        assert.equal(s.roleOf(c.pk), 'owner');
        assert.equal(s.roleOf(f.pk), 'owner', 'one of three is not a majority');
        const aRemove = op(b, { type: 'approve', proposal: pRemoveF.id }, [pRemoveF]);                             // 2 of 3
        s = resolve(ref, [genesis, addB, addC, pB, pC, aC, pRemoveF, aRemove]);
        assert.ok(!s.isMember(f.pk), 'even the founder can be voted out');
    });

    test('two owners voting each other out at once: exactly one goes, the same for everyone', () => {
        const { f, ref, op, genesis } = community();
        const [b, c] = [person(), person()];
        const addB = op(f, { type: 'add', member: b.pk }, [genesis]);
        const addC = op(f, { type: 'add', member: c.pk }, [addB]);
        const pB = op(f, { type: 'propose', action: { type: 'set-role', member: b.pk, role: 'owner' } }, [addC]);
        const pC = op(f, { type: 'propose', action: { type: 'set-role', member: c.pk, role: 'owner' } }, [pB]);
        const aC = op(b, { type: 'approve', proposal: pC.id }, [pC]);
        // f and c each propose removing the other; b approves both without seeing either outcome
        const p1 = op(f, { type: 'propose', action: { type: 'remove', member: c.pk } }, [aC]);
        const p2 = op(c, { type: 'propose', action: { type: 'remove', member: f.pk } }, [aC]);
        const a1 = op(b, { type: 'approve', proposal: p1.id }, [p1, p2]);
        const a2 = op(b, { type: 'approve', proposal: p2.id }, [p1, p2]);
        const ops = [genesis, addB, addC, pB, pC, aC, p1, p2, a1, a2];
        const outcomes = new Set();
        for (let i = 0; i < 20; i++) {
            const s = resolve(ref, shuffle(ops));
            assert.equal([f.pk, c.pk].filter((pk) => s.isMember(pk)).length, 1);
            outcomes.add(s.isMember(f.pk) ? 'f stays' : 'c stays');
        }
        assert.equal(outcomes.size, 1, 'every client computes the same result');
    });

    test('the last owner cannot leave or be voted out', () => {
        const { f, ref, op, genesis } = community();
        const leave = op(f, { type: 'leave' }, [genesis]);
        assert.equal(resolve(ref, [genesis, leave]).roleOf(f.pk), 'owner');
    });

    test('a scope needs a new key when its key was made without knowing about a removal', () => {
        const { f, ref, op, genesis } = community('private');
        const [x, y] = [person(), person()];
        const addX = op(f, { type: 'add', member: x.pk }, [genesis]);
        const addY = op(f, { type: 'add', member: y.pk }, [addX]);
        const removeX = op(f, { type: 'remove', member: x.pk }, [addY]);
        let s = resolve(ref, [genesis, addX, addY, removeX]);
        assert.ok(s.needsRekey('state'));
        const rekeyF = op(f, { type: 'rekey', scope: 'state', keyId: 'k1' }, [removeX]);
        s = resolve(ref, [genesis, addX, addY, removeX, rekeyF]);
        assert.ok(!s.needsRekey('state'));
        // y rekeys without having seen the removal, so x got that key; it comes out last
        const rekeyY = op(y, { type: 'rekey', scope: 'state', keyId: 'k2' }, [addY], clock + 100);
        s = resolve(ref, [genesis, addX, addY, removeX, rekeyF, rekeyY]);
        assert.equal(s.currentKeyId('state'), 'k2');
        assert.ok(s.needsRekey('state'));
        const heal = op(f, { type: 'rekey', scope: 'state', keyId: 'k3' }, [rekeyF, rekeyY], clock + 200);
        s = resolve(ref, [genesis, addX, addY, removeX, rekeyF, rekeyY, heal]);
        assert.ok(!s.needsRekey('state'));
    });

    test('malformed or incomplete ops are refused without breaking the state', () => {
        const { f, ref, op, genesis } = community('private');
        const odd = op(f, { type: 'channel-create', channel: 'x', visibility: 'private', members: 5, keyId: 'k1' }, [genesis]);
        const keyless = op(f, { type: 'channel-create', channel: 'y', name: 'no key' }, [odd]);   // private: needs a keyId
        const badScope = op(f, { type: 'rekey', scope: 'zzx', keyId: 'k2' }, [keyless]);
        const s = resolve(ref, [genesis, odd, keyless, badScope]);
        assert.deepEqual([...s.channel('x').members], [f.pk], 'a members field that is not a list is ignored');
        assert.ok(!s.channels.has('y'), 'a refused channel-create leaves no channel behind');
        assert.ok(!s.valid.has(badScope.id));
    });

    test('ops from strangers, with unknown parents, or for another community are ignored', () => {
        const { f, ref, op, genesis } = community();
        const stranger = person();
        const sneaky = op(stranger, { type: 'add', member: stranger.pk, role: 'admin' }, [genesis]);
        const orphan = finalizeEvent({ kind: KIND.COMMUNITY_OP, created_at: clock++, content: JSON.stringify({ type: 'add', member: stranger.pk }),
            tags: [['community', ref], ['parent', 'f'.repeat(64)]] }, f.sk);
        const s = resolve(ref, [genesis, sneaky, orphan]);
        assert.ok(!s.isMember(stranger.pk));
        assert.equal(s.order.length, 2, 'the orphan waits for its parent');
    });
});

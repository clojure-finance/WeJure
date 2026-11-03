// The community rules on hand-built op histories: no relays, just the DAG.
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { KIND } from 'wejure-nostr/core.js';
import { acceptedChain, coveredIndex, epochIndex, resolve, snapshotOf } from 'wejure-nostr/community-state.js';

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

    test('ancestry answers match a full search, on a history with forks and late merges', () => {
        const { f, ref, op, genesis } = community();
        const ops = [genesis];
        for (let i = 0; i < 120; i++) {
            // mostly one op at a time; sometimes a fork from an old op, or a merge of several heads
            const from = Math.random() < 0.15 ? ops : ops.slice(-3);
            const parents = [...new Set([0, 1, 2].slice(0, 1 + Math.floor(Math.random() * 3)).map(() => from[Math.floor(Math.random() * from.length)]))];
            ops.push(op(f, { type: 'hide', message: `m${i}` }, parents, clock + Math.floor(Math.random() * 50)));
        }
        const s = resolve(ref, ops);
        const parentsOf = new Map(s.order.map((o) => [o.id, o.parents]));
        const ancestors = (id, out = new Set()) => {
            for (const p of parentsOf.get(id)) if (!out.has(p)) { out.add(p); ancestors(p, out); }
            return out;
        };
        for (const b of s.order) {
            const all = ancestors(b.id);
            for (const a of s.order) assert.equal(s.isAncestor(a.id, b.id), all.has(a.id));
        }
    });


    describe('checkpoints', () => {
        const H = 'ab'.repeat(32);   // a stand-in hash: these rules do not look inside
        // A checkpoint op on the state `at` (written on its heads).
        const checkpointOn = (op, who, at, events, { prev = null, owners, offset = 0 } = {}) =>
            op(who, { type: 'checkpoint', prev, hash: H, indexHash: H, state: [H], index: [H], owners: owners ?? at.members().filter((pk) => at.rank(pk) === 4), offset, count: at.order.length },
                at.heads.map((id) => events.find((e) => e.id === id)));

        test('a checkpoint\'s snapshot plus the ops after it give the state that all the ops give', () => {
            const { f, ref, op, genesis } = community('private');
            const [a, b, c] = [person(), person(), person()];
            const ops = [genesis];
            const next = (who, body, parents = [ops.at(-1)]) => { const e = op(who, body, parents); ops.push(e); return e; };
            next(f, { type: 'channel-create', channel: 'g', name: 'general', keyId: 'kg' });
            next(f, { type: 'add', member: a.pk, role: 'admin' });
            next(f, { type: 'add', member: b.pk });
            next(f, { type: 'channel-create', channel: 'p', name: 'secret', visibility: 'private', members: [a.pk, b.pk], keyId: 'kp' });
            const fork = ops.at(-1);
            next(a, { type: 'remove', member: b.pk, heads: { g: ['m1'] } });   // the state and both channels need new keys
            next(f, { type: 'hide', message: 'm2' }, [fork, ops.at(-1)]);
            next(f, { type: 'propose', action: { type: 'set-role', member: a.pk, role: 'owner' } });
            const before = resolve(ref, ops);
            const cp = checkpointOn(op, f, before, ops);

            const after = [];
            const more = (who, body, parents = [after.at(-1) ?? cp]) => { const e = op(who, body, parents); after.push(e); return e; };
            more(f, { type: 'add', member: c.pk });
            more(a, { type: 'rekey', scope: 'state', keyId: 'k2' });
            more(a, { type: 'channel-add', channel: 'p', member: c.pk });
            more(c, { type: 'retract', message: 'm3' });
            more(a, { type: 'add', member: b.pk, role: 'admin' });   // not allowed: admins add members and moderators

            const full = resolve(ref, [...ops, cp, ...after]);
            const base = { checkpoint: cp, state: JSON.parse(JSON.stringify(snapshotOf(before))), covered: coveredIndex([{ offset: 0, entries: epochIndex(before, 0) }]) };
            const fromCheckpoint = resolve(ref, [cp, ...after], { base });
            assert.deepEqual(snapshotOf(fromCheckpoint), snapshotOf(full));
            for (const e of after) assert.equal(fromCheckpoint.valid.has(e.id), full.valid.has(e.id));
            assert.deepEqual(fromCheckpoint.heads, full.heads);
            // messages name ops from before and after the checkpoint
            for (const at of [...ops, cp, ...after]) {
                for (const pk of [a.pk, b.pk, c.pk]) {
                    for (const latest of [false, true]) {
                        assert.equal(fromCheckpoint.joinedBy('p', pk, at.id, { latest }), full.joinedBy('p', pk, at.id, { latest }));
                    }
                }
            }
        });

        test('a checkpoint counts once more than half of the previous owners approve it', () => {
            const { f, ref, op, genesis } = community();
            const [a, b, m] = [person(), person(), person()];
            const H2 = 'cd'.repeat(32);
            const body = (prev, owners, extra = {}) => ({ type: 'checkpoint', prev, hash: H, indexHash: H, state: [H], index: [H], owners, offset: 0, count: 1, ...extra });
            const c1 = op(f, body(null, [f.pk, a.pk, b.pk]), [genesis]);                 // the founder alone suffices first
            const c2 = op(a, body(c1.id, [a.pk]), [c1]);                                // a, plus b's approval: 2 of 3
            const ok = op(b, { type: 'approve-checkpoint', checkpoint: c2.id }, [c2]);
            const rival = op(m, body(c1.id, [m.pk], { hash: H2 }), [c1]);              // a stranger and his friend
            const friend = op(m, { type: 'approve-checkpoint', checkpoint: rival.id }, [rival]);
            const c3 = op(f, body(c2.id, [f.pk]), [ok]);                                // f is not among c2's owners
            assert.deepEqual(acceptedChain(ref, [genesis, c1, c2, ok, rival, friend, c3]).map((e) => e.id), [c1.id, c2.id]);
            assert.deepEqual(acceptedChain(ref, [genesis, c1, c2, rival, friend, c3]).map((e) => e.id), [c1.id], 'without b, a alone is 1 of 3');
            const c3ok = op(a, { type: 'approve-checkpoint', checkpoint: c3.id }, [c3]);
            assert.deepEqual(acceptedChain(ref, [c1, c2, ok, c3, c3ok]).map((e) => e.id), [c1.id, c2.id, c3.id]);
        });

        test('after a checkpoint, ops that do not build on it, or are dated before it, are ignored', () => {
            const { f, ref, op, genesis } = community();
            const [a, b, c] = [person(), person(), person()];
            const addA = op(f, { type: 'add', member: a.pk, role: 'admin' }, [genesis]);
            const before = resolve(ref, [genesis, addA]);
            const cp = op(f, { type: 'checkpoint', prev: null, hash: H, indexHash: H, state: [H], index: [H], owners: [f.pk], offset: 0, count: 2 }, [addA]);
            const late = op(a, { type: 'add', member: b.pk }, [addA]);                    // never saw the checkpoint
            const backdated = op(a, { type: 'add', member: c.pk }, [cp], cp.created_at - 10);
            const onTop = op(f, { type: 'settings', name: 'renamed' }, [late, cp]);       // builds on it (and on late)
            const s = resolve(ref, [cp, late, backdated, onTop], { base: { checkpoint: cp, state: snapshotOf(before) } });
            assert.ok(!s.isMember(b.pk) && !s.isMember(c.pk));
            assert.equal(s.name, 'renamed');
            assert.deepEqual(s.order.map((o) => o.id), [cp.id, onTop.id]);
        });

        test('the covered index answers ancestry as the full history does', () => {
            const { f, ref, op, genesis } = community();
            const ops = [genesis];
            for (let i = 0; i < 120; i++) {
                const from = Math.random() < 0.15 ? ops : ops.slice(-3);
                const parents = [...new Set([0, 1, 2].slice(0, 1 + Math.floor(Math.random() * 3)).map(() => from[Math.floor(Math.random() * from.length)]))];
                ops.push(op(f, { type: 'hide', message: `m${i}` }, parents, clock + Math.floor(Math.random() * 50)));
            }
            const s = resolve(ref, ops);
            const index = coveredIndex([{ offset: 7, entries: JSON.parse(JSON.stringify(epochIndex(s, 7))) }]);
            for (const b of s.order) for (const a of s.order) assert.equal(index.isAncestor(a.id, b.id), s.isAncestor(a.id, b.id));
        });
    });
});

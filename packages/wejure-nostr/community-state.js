// Computes a community's state from its operations (see COMMUNITIES.md).
// Pure: takes verified op events, returns the state. No I/O.
//
// Checkpoints: once one is accepted, the state is its snapshot plus the ops
// that descend from it (see "Checkpoints" in COMMUNITIES.md), so nobody needs
// the ops before it. acceptedChain() finds the accepted ones, snapshotOf() and
// epochIndex() make what a new checkpoint carries, coveredIndex() answers
// ancestry questions about the ops a checkpoint covers.

export const ROLE = { none: 0, member: 1, moderator: 2, admin: 3, owner: 4 };
const { member: MEMBER, moderator: MOD, admin: ADMIN, owner: OWNER } = ROLE;

const cmp = (a, b) => a.created_at - b.created_at || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

// A binary heap, smallest first by cmp.
function heap(cmp) {
    const a = [];
    const swap = (i, j) => { [a[i], a[j]] = [a[j], a[i]]; };
    return {
        get size() { return a.length; },
        push(x) {
            a.push(x);
            for (let i = a.length - 1; i > 0 && cmp(a[i], a[(i - 1) >> 1]) < 0; i = (i - 1) >> 1) swap(i, (i - 1) >> 1);
        },
        pop() {
            const top = a[0];
            const last = a.pop();
            if (a.length) {
                a[0] = last;
                for (let i = 0; ;) {
                    const l = 2 * i + 1;
                    const r = l + 1;
                    let m = i;
                    if (l < a.length && cmp(a[l], a[m]) < 0) m = l;
                    if (r < a.length && cmp(a[r], a[m]) < 0) m = r;
                    if (m === i) break;
                    swap(i, m);
                    i = m;
                }
            }
            return top;
        },
    };
}

// Topological order of the ops that descend from genesis and whose parents are
// all known. Among ops ready at the same time, the smallest (created_at, id) goes first.
function topoOrder(byId, genesis) {
    const indeg = new Map();
    const kids = new Map();
    for (const op of byId.values()) {
        if (op !== genesis && (op.parents.length === 0 || op.parents.some((p) => !byId.has(p)))) continue;
        indeg.set(op.id, op.parents.length);
        for (const p of op.parents) {
            if (!kids.has(p)) kids.set(p, []);
            kids.get(p).push(op);
        }
    }
    const out = [];
    const ready = heap(cmp);
    ready.push(genesis);
    while (ready.size) {
        const op = ready.pop();
        out.push(op);
        for (const k of kids.get(op.id) ?? []) {
            if (!indeg.has(k.id)) continue;
            indeg.set(k.id, indeg.get(k.id) - 1);
            if (indeg.get(k.id) === 0) ready.push(k);
        }
    }
    return out;
}

// Answers "is op a an ancestor of op b?" for ops in topological order.
// Storing every op's ancestors grows with the square of the log (5000 ops took
// 500 MB), so this keeps, per op, its latest cut instead: an op that every op
// before it in the order leads to. In a log written one op at a time, every op
// is a cut and the answer is a comparison of positions; ops written
// concurrently need a search, but only back to their cut.
function ancestry(ordered) {
    const index = new Map();
    const parents = new Map();
    const cut = new Map();   // op id -> position of its latest cut (itself, or an ancestor)
    const heads = new Set();   // ops without a child so far
    ordered.forEach((op, i) => {
        index.set(op.id, i);
        parents.set(op.id, op.parents);
        op.parents.forEach((p) => heads.delete(p));
        heads.add(op.id);
        // every earlier op leads to some head, so with one head they all lead to op
        cut.set(op.id, heads.size === 1 ? i : Math.max(...op.parents.map((p) => cut.get(p))));
    });
    const recent = new Map();   // op id -> its ancestors after its cut (filled on demand)
    const ancestorsAfterCut = (b) => {
        if (!recent.has(b)) {
            const floor = cut.get(b);
            const set = new Set();
            const stack = [...parents.get(b)];
            while (stack.length) {
                const p = stack.pop();
                if (set.has(p) || index.get(p) <= floor) continue;
                set.add(p);
                stack.push(...parents.get(p));
            }
            recent.set(b, set);
        }
        return recent.get(b);
    };
    return {
        has: (id) => index.has(id),
        cutAt: (i) => cut.get(ordered[i].id),
        isAncestor(a, b) {
            const ia = index.get(a);
            const ib = index.get(b);
            if (ia === undefined || ib === undefined || ia >= ib) return false;
            // a is b's cut or comes before it, so a leads to the cut, and the cut to b
            return ia <= cut.get(b) || ancestorsAfterCut(b).has(a);
        },
    };
}

function newState(ref, founder) {
    return {
        rekeyAtBase: new Set(),        // scopes the checkpoint's snapshot said need a new key after a removal
        rekeyOnJoinAtBase: new Set(),  // ... after an addition (counts in from-join channels)
        ref, founder, created: false,
        name: '', description: '', mode: 'private', join: 'invite', relays: [],
        roles: new Map(),        // pubkey -> rank
        ever: new Set(),         // everyone who was ever a member
        banned: new Set(),
        channels: new Map(),     // id -> {id, name, visibility, history, archived, members, ever}
        keyOps: new Map(),       // scope -> [{id, keyId}], in order
        reductions: new Map(),   // scope -> op ids that took someone out of the scope
        additions: new Map(),    // scope -> op ids that brought someone in
        departed: new Map(),     // "<pubkey>|<channel>" -> Set of that member's last message ids
        hidden: new Set(),       // message ids hidden by moderators
        retracted: new Map(),    // message id -> Set of pubkeys that retracted it (only the author's counts)
        proposals: new Map(),    // op id -> {action, approvals, done}
        addedBy: new Map(),      // "<pubkey>|state" or "<pubkey>|ch:<id>" -> op ids that brought them in
    };
}

const push = (map, key, value) => (map.get(key) ?? map.set(key, []).get(key)).push(value);

// One pass over the ordered ops. `caps` holds the revocations found by the
// previous pass: pubkey -> [{id, roleAfter}]. snap: the checkpoint snapshot
// to start from (then ordered[0] is the checkpoint itself, a no-op).
function replay(ref, founder, ordered, dag, caps, snap) {
    const S = snap ? fromSnapshot(ref, founder, snap) : newState(ref, founder);
    const revocations = new Map();
    const valid = new Set();
    const rank = (pk) => S.roles.get(pk) ?? 0;
    const isMember = (pk) => rank(pk) >= MEMBER;
    const owners = () => [...S.roles].filter(([, r]) => r === OWNER).map(([pk]) => pk);
    const inChannel = (ch, pk) => isMember(pk) && (ch.visibility === 'community' || ch.members.has(pk));
    const encrypted = (scope) => S.mode === 'private' || (scope !== 'state' && S.channels.get(scope.slice(3))?.visibility === 'private');

    let current;   // the op being applied
    const revoke = (pk, roleAfter) => push(revocations, pk, { id: current.id, roleAfter });
    const addHeads = (pk, channel, heads) => {
        if (!Array.isArray(heads)) return;
        const k = `${pk}|${channel}`;
        const set = S.departed.get(k) ?? new Set();
        heads.forEach((h) => typeof h === 'string' && set.add(h));
        S.departed.set(k, set);
    };
    const addMember = (pk, r) => {
        S.roles.set(pk, r);
        S.ever.add(pk);
        push(S.addedBy, `${pk}|state`, current.id);
        for (const ch of S.channels.values()) if (ch.visibility === 'community') push(S.additions, `ch:${ch.id}`, current.id);
    };
    const removeMember = (pk, heads, ban) => {
        for (const ch of S.channels.values()) {
            if (!inChannel(ch, pk)) continue;
            push(S.reductions, `ch:${ch.id}`, current.id);
            addHeads(pk, ch.id, heads?.[ch.id]);
            ch.members.delete(pk);
        }
        push(S.reductions, 'state', current.id);
        S.roles.delete(pk);
        if (ban) S.banned.add(pk);
        revoke(pk, 0);
    };
    const setRole = (pk, r) => {
        if (r < rank(pk)) revoke(pk, r);
        S.roles.set(pk, r);
    };
    const tryProposal = (p) => {
        const os = owners();
        const approvals = [...p.approvals].filter((a) => rank(a) === OWNER).length;
        if (p.done || approvals * 2 <= os.length) return;
        const { type, member: t, role } = p.action;
        if (rank(t) < MEMBER) return;
        const lastOwner = rank(t) === OWNER && os.length === 1;
        if (type === 'remove' && !lastOwner) removeMember(t, p.action.heads, p.action.ban);
        else if (type === 'set-role' && ROLE[role] >= MEMBER && !(lastOwner && ROLE[role] < OWNER)) setRole(t, ROLE[role]);
        else return;
        p.done = true;
    };

    // Applies op as an actor with `role`; returns whether it was valid.
    const apply = (op, role) => {
        const b = op.body;
        const actor = op.pubkey;
        const ch = typeof b.channel === 'string' ? S.channels.get(b.channel) : undefined;
        if (b.type === 'create') {
            if (S.created || op.pubkey !== founder) return false;
            S.created = true;
            S.name = String(b.name ?? '');
            S.mode = b.mode === 'open' ? 'open' : 'private';
            S.join = b.join === 'open' ? 'open' : 'invite';
            S.relays = Array.isArray(b.relays) ? b.relays : [];
            if (S.mode === 'private') {
                if (typeof b.stateKeyId !== 'string') return false;
                push(S.keyOps, 'state', { id: op.id, keyId: b.stateKeyId });
            }
            addMember(actor, OWNER);
            return true;
        }
        if (b.type === 'join') {
            if (S.join !== 'open' || S.banned.has(actor) || isMember(actor)) return false;
            addMember(actor, MEMBER);
            return true;
        }
        if (role < MEMBER) return false;   // everything else needs a member
        switch (b.type) {
            case 'settings':
                if (role < ADMIN) return false;
                if (typeof b.name === 'string') S.name = b.name;
                if (typeof b.description === 'string') S.description = b.description;
                if (b.join === 'open' || b.join === 'invite') S.join = b.join;
                if (Array.isArray(b.relays)) S.relays = b.relays;
                return true;
            case 'add': {
                const r = ROLE[b.role ?? 'member'];
                const allowed = r === MEMBER || r === MOD || (r === ADMIN && role === OWNER);
                if (role < ADMIN || !allowed || isMember(b.member) || typeof b.member !== 'string') return false;
                S.banned.delete(b.member);
                addMember(b.member, r);
                return true;
            }
            case 'set-role': {
                const r = ROLE[b.role];
                const rt = rank(b.member);
                if (rt < MEMBER || !(r >= MEMBER) || r === OWNER || rt === OWNER) return false;
                if (!(role === OWNER || (role === ADMIN && rt <= MOD && r <= MOD))) return false;
                setRole(b.member, r);
                return true;
            }
            case 'remove': {
                const rt = rank(b.member);
                if (rt < MEMBER || rt === OWNER || role < MOD || role <= rt) return false;
                removeMember(b.member, b.heads, b.ban);
                return true;
            }
            case 'leave':
                if (rank(actor) === OWNER && owners().length === 1) return false;
                removeMember(actor, b.heads, false);
                return true;
            case 'propose': {
                const a = b.action ?? {};
                if (role !== OWNER || !['remove', 'set-role'].includes(a.type) || typeof a.member !== 'string') return false;
                const p = { action: a, approvals: new Set([actor]), done: false };
                S.proposals.set(op.id, p);
                tryProposal(p);
                return true;
            }
            case 'approve': {
                const p = S.proposals.get(b.proposal);
                if (role !== OWNER || !p || p.done) return false;
                p.approvals.add(actor);
                tryProposal(p);
                return true;
            }
            case 'channel-create': {
                const vis = b.visibility === 'private' ? 'private' : 'community';
                if (role < ADMIN || typeof b.channel !== 'string' || S.channels.has(b.channel)) return false;
                const needsKey = S.mode === 'private' || vis === 'private';
                if (needsKey && typeof b.keyId !== 'string') return false;
                const listed = Array.isArray(b.members) ? b.members.filter(isMember) : [];
                const members = vis === 'private' ? new Set([actor, ...listed]) : new Set();
                const c = { id: b.channel, name: String(b.name ?? ''), visibility: vis,
                    history: b.history === 'from-join' ? 'from-join' : 'shared', archived: false, members, ever: new Set(members) };
                S.channels.set(c.id, c);
                for (const pk of members) push(S.addedBy, `${pk}|ch:${c.id}`, op.id);
                if (needsKey) push(S.keyOps, `ch:${c.id}`, { id: op.id, keyId: b.keyId });
                return true;
            }
            case 'channel-update':
                if (role < ADMIN || !ch) return false;
                if (typeof b.name === 'string') ch.name = b.name;
                if (b.history === 'shared' || b.history === 'from-join') ch.history = b.history;
                return true;
            case 'channel-archive':
                if (role < ADMIN || !ch) return false;
                ch.archived = true;
                return true;
            case 'channel-add':
                if (role < ADMIN || !ch || ch.visibility !== 'private' || !isMember(b.member) || ch.members.has(b.member)) return false;
                ch.members.add(b.member);
                ch.ever.add(b.member);
                push(S.addedBy, `${b.member}|ch:${ch.id}`, op.id);
                push(S.additions, `ch:${ch.id}`, op.id);
                return true;
            case 'channel-remove':
            case 'channel-leave': {
                const who = b.type === 'channel-leave' ? actor : b.member;
                if (!ch || ch.visibility !== 'private' || !ch.members.has(who)) return false;
                if (b.type === 'channel-remove' && role < ADMIN) return false;
                ch.members.delete(who);
                addHeads(who, ch.id, b.heads);
                push(S.reductions, `ch:${ch.id}`, op.id);
                return true;
            }
            case 'rekey': {
                const scope = b.scope;
                if (typeof scope !== 'string' || typeof b.keyId !== 'string') return false;
                if (scope !== 'state' && !(scope.startsWith('ch:') && S.channels.has(scope.slice(3)))) return false;
                if (!encrypted(scope)) return false;
                if (scope !== 'state' && !inChannel(S.channels.get(scope.slice(3)), actor)) return false;
                push(S.keyOps, scope, { id: op.id, keyId: b.keyId });
                return true;
            }
            case 'seal': {
                if (!ch || !(inChannel(ch, actor) || role >= ADMIN)) return false;
                const wasIn = ch.visibility === 'community' ? S.ever.has(b.member) : ch.ever.has(b.member);
                if (!wasIn || inChannel(ch, b.member)) return false;
                addHeads(b.member, ch.id, b.heads);
                return true;
            }
            case 'checkpoint':
            case 'approve-checkpoint':
                return true;   // no effect on the state; acceptance is counted apart (acceptedChain)
            case 'hide':
                if (role < MOD || typeof b.message !== 'string') return false;
                S.hidden.add(b.message);
                return true;
            case 'retract':
                if (typeof b.message !== 'string') return false;
                if (!S.retracted.has(b.message)) S.retracted.set(b.message, new Set());
                S.retracted.get(b.message).add(actor);
                return true;
            default:
                return false;
        }
    };

    for (const op of ordered) {
        current = op;
        if (snap && op === ordered[0]) { valid.add(op.id); continue; }   // the checkpoint
        // The actor's role, lowered by every revocation of them this op is concurrent with.
        let role = rank(op.pubkey);
        for (const rev of caps.get(op.pubkey) ?? []) {
            if (rev.id !== op.id && !dag.isAncestor(op.id, rev.id) && !dag.isAncestor(rev.id, op.id)) role = Math.min(role, rev.roleAfter);
        }
        // apply() checks everything before changing anything, so an invalid op leaves no trace
        let ok = false;
        try { ok = apply(op, role); } catch { ok = false; }   // a malformed op is just invalid
        if (ok) valid.add(op.id);
    }
    return { S, valid, revocations };
}

const revKey = (caps) => JSON.stringify([...caps].map(([pk, v]) => [pk, v.map((r) => `${r.id}:${r.roleAfter}`).sort()]).sort());

// An op event as resolve() works with it, or null if it is not one of ref's.
function parseOp(ref, e) {
    let body;
    try { body = JSON.parse(e.content); } catch { return null; }
    if (!body || typeof body.type !== 'string') return null;
    if (!e.tags.some((t) => t[0] === 'community' && t[1] === ref)) return null;
    const parents = e.tags.filter((t) => t[0] === 'parent').map((t) => t[1]);
    return { id: e.id, pubkey: e.pubkey, created_at: e.created_at, parents, body };
}

function parseAll(ref, events) {
    const byId = new Map();
    for (const e of events) {
        const op = parseOp(ref, e);
        if (op) byId.set(op.id, op);
    }
    return byId;
}

// The ids of tips and their ancestors among byId.
function ancestorsOf(byId, tips) {
    const out = new Set();
    const stack = [...tips];
    while (stack.length) {
        const id = stack.pop();
        if (out.has(id) || !byId.has(id)) continue;
        out.add(id);
        stack.push(...byId.get(id).parents);
    }
    return out;
}

// The ops that descend from root (the latest accepted checkpoint) and are
// dated no earlier than it, in topological order, root first. Parents outside
// that set (covered by the checkpoint, ignored, or not known yet) count as
// placed already, so everyone with the same ops gets the same order. keep:
// if given, only those ops (the state some heads were written on).
function postOrder(byId, root, keep) {
    const kids = new Map();
    for (const op of byId.values()) for (const p of op.parents) push(kids, p, op);
    let set = new Set([root.id]);
    const queue = [root];
    while (queue.length) {
        for (const k of kids.get(queue.pop().id) ?? []) {
            if (set.has(k.id) || k.created_at < root.created_at) continue;   // dated before it: ignored
            set.add(k.id);
            queue.push(k);
        }
    }
    if (keep) set = new Set([...set].filter((id) => id === root.id || keep.has(id)));
    const ops = new Map([...set].map((id) => {
        const op = byId.get(id);
        return [id, { ...op, parents: id === root.id ? [] : op.parents.filter((p) => set.has(p)) }];
    }));
    return topoOrder(ops, ops.get(root.id));
}

// The community's state, or null if its genesis op (or, with base, the
// checkpoint) is missing. base: the latest accepted checkpoint, as
// {checkpoint: its event, state: its snapshot, covered: coveredIndex() of
// the ops before it (filled in later; see joinedBy)}. For checkpoints, the
// state some heads were written on: on: those op ids; upTo: an op id, whose
// parents they are.
export function resolve(ref, events, { base = null, on = null, upTo = null } = {}) {
    const [founder, nonce] = ref.split(':');
    const byId = parseAll(ref, events);
    if (base) {
        const root = parseOp(ref, base.checkpoint);
        if (!root || root.body.type !== 'checkpoint' || !base.state) return null;
        byId.set(root.id, root);
    }
    const tips = upTo ? byId.get(upTo)?.parents ?? [] : on;
    const keep = tips && ancestorsOf(byId, tips);
    let ordered;
    if (base) {
        ordered = postOrder(byId, byId.get(base.checkpoint.id), keep);
    } else {
        const genesis = [...byId.values()]
            .filter((o) => o.body.type === 'create' && o.pubkey === founder && o.body.nonce === nonce && o.parents.length === 0)
            .sort(cmp)[0];
        if (!genesis) return null;
        const scope = keep ? new Map([...keep].map((id) => [id, byId.get(id)])) : byId;
        if (!scope.has(genesis.id)) return null;
        ordered = topoOrder(scope, genesis);
    }
    const dag = ancestry(ordered);

    // Replay until the revocations stop changing (see "Computing the state").
    let caps = new Map();
    let result;
    for (let pass = 0; pass < 12; pass++) {
        try {
            result = replay(ref, founder, ordered, dag, caps, base?.state);
        } catch {
            return null;   // a malformed snapshot
        }
        if (revKey(result.revocations) === revKey(caps)) break;
        if (pass >= 10) {
            for (const [pk, v] of result.revocations) caps.set(pk, [...(caps.get(pk) ?? []), ...v]);
        } else {
            caps = result.revocations;
        }
    }
    const { S, valid } = result;
    const hasChild = new Set(ordered.flatMap((o) => o.parents));
    const times = new Map(ordered.map((o) => [o.id, o.created_at]));
    // What new ops and messages build on: the valid ops no valid op descends
    // from, the latest 20 at most. Invalid ops (anyone can publish some in an
    // open community) are not built on, so they cannot bloat or date honest ops.
    const leadsToValid = new Set();
    for (let i = ordered.length - 1; i >= 0; i--) {
        const op = ordered[i];
        if (valid.has(op.id) || leadsToValid.has(op.id)) op.parents.forEach((p) => leadsToValid.add(p));
    }
    return withHelpers(S, {
        order: ordered, isAncestor: dag.isAncestor, inOrder: dag.has, cutAt: dag.cutAt, valid,
        heads: ordered.filter((o) => !hasChild.has(o.id)).map((o) => o.id),
        validHeads: ordered.filter((o) => valid.has(o.id) && !leadsToValid.has(o.id)).map((o) => o.id).slice(-20),
        checkpoint: base ? ordered[0].id : null,
        covered: base?.covered ?? null,
        timeOf: (id) => times.get(id),
    });
}

function withHelpers(S, extra) {
    const rank = (pk) => S.roles.get(pk) ?? 0;
    const isMember = (pk) => rank(pk) >= MEMBER;
    const channel = (id) => S.channels.get(id);
    const inChannel = (id, pk) => {
        const ch = channel(id);
        return !!ch && isMember(pk) && (ch.visibility === 'community' || ch.members.has(pk));
    };
    const encrypted = (scope) => S.mode === 'private' || (scope !== 'state' && channel(scope.slice(3))?.visibility === 'private');
    const members = () => [...S.roles.keys()];
    const scopeMembers = (scope) => (scope === 'state' ? members() : members().filter((pk) => inChannel(scope.slice(3), pk)));
    const currentKeyId = (scope) => S.keyOps.get(scope)?.at(-1)?.keyId ?? null;
    // Whether some op of `kind` (reductions: took someone out of the scope;
    // additions: brought someone in) is not covered by the scope's latest key
    // op. A key op from before the checkpoint: what the snapshot said, or any
    // such op since.
    const uncovered = (scope, kind) => {
        const k = S.keyOps.get(scope)?.at(-1);
        if (!k) return false;
        const since = S[kind].get(scope) ?? [];
        if (!extra.inOrder(k.id)) return (kind === 'reductions' ? S.rekeyAtBase : S.rekeyOnJoinAtBase).has(scope) || since.length > 0;
        return since.some((d) => d !== k.id && !extra.isAncestor(d, k.id));
    };
    // A scope needs a new key unless its latest key op descends from every op that
    // took someone out of it (and, for from-join channels, brought someone in).
    const needsRekey = (scope) => {
        if (!encrypted(scope)) return false;
        if (!S.keyOps.get(scope)?.length) return true;
        const fromJoin = scope !== 'state' && channel(scope.slice(3))?.history === 'from-join';
        return uncovered(scope, 'reductions') || (fromJoin && uncovered(scope, 'additions'));
    };
    const everIn = (id, pk) => {
        const ch = channel(id);
        return !!ch && (ch.visibility === 'community' ? S.ever.has(pk) : ch.ever.has(pk));
    };
    // Whether pk had been brought into the channel as of op `at` (an op id): so a
    // message naming `at` was written after they joined. With latest, only their
    // most recent joining counts (for members who left and were brought back).
    // Old messages name ops from before the checkpoint; those are answered by
    // its covered index once it is loaded (until then they do not count).
    const ancestorOf = (a, at) => {
        if (extra.inOrder(a)) return extra.inOrder(at) && extra.isAncestor(a, at);
        if (extra.inOrder(at)) return true;   // a is before the checkpoint, at after it
        return extra.covered?.isAncestor(a, at) ?? false;
    };
    const joinedBy = (id, pk, at, { latest = false } = {}) => {
        if (!extra.inOrder(at) && !extra.covered?.has(at)) return false;
        const by = (key) => {
            const adds = S.addedBy.get(key) ?? [];
            return (latest ? adds.slice(-1) : adds).some((a) => a === at || ancestorOf(a, at));
        };
        return by(`${pk}|state`) && (channel(id)?.visibility !== 'private' || by(`${pk}|ch:${id}`));
    };
    const roleOf = (pk) => Object.keys(ROLE).find((k) => ROLE[k] === rank(pk));
    return Object.assign(S, extra, { rank, roleOf, isMember, channel, inChannel, everIn, joinedBy, encrypted, members, scopeMembers, currentKeyId, uncovered, needsRekey });
}

// ---- checkpoints ----

const list = (xs) => [...xs];
const entries = (m, f = (v) => v) => [...m].map(([k, v]) => [k, f(v)]);

// The snapshot of a state, as plain JSON in a fixed order (the order the
// replay created things in, which is the same for everyone), so that
// everyone who computes it gets the same text and hash, and a device that
// starts from it lists channels and proposals as one that replayed
// everything. What took someone out of a scope, or brought someone in, is
// summed up as which scopes need a new key for it; finished proposals are
// left out.
export function snapshotOf(state) {
    const scopes = ['state', ...[...state.channels.keys()].map((id) => `ch:${id}`)];
    return {
        v: 1,
        name: state.name, description: state.description, mode: state.mode, join: state.join, relays: state.relays,
        roles: entries(state.roles), ever: list(state.ever), banned: list(state.banned),
        channels: entries(state.channels, (c) => ({
            name: c.name, visibility: c.visibility, history: c.history, archived: c.archived, members: list(c.members), ever: list(c.ever),
        })),
        keyOps: entries(state.keyOps),
        rekey: scopes.filter((scope) => state.uncovered(scope, 'reductions')),
        rekeyOnJoin: scopes.filter((scope) => state.uncovered(scope, 'additions')),
        departed: entries(state.departed, list),
        hidden: list(state.hidden),
        retracted: entries(state.retracted, list),
        proposals: entries(new Map([...state.proposals].filter(([, p]) => !p.done)), (p) => ({ action: p.action, approvals: list(p.approvals) })),
        addedBy: entries(state.addedBy),
    };
}

function fromSnapshot(ref, founder, snap) {
    const S = newState(ref, founder);
    Object.assign(S, {
        created: true,
        name: String(snap.name ?? ''), description: String(snap.description ?? ''),
        mode: snap.mode === 'open' ? 'open' : 'private', join: snap.join === 'open' ? 'open' : 'invite',
        relays: Array.isArray(snap.relays) ? snap.relays : [],
        roles: new Map(snap.roles), ever: new Set(snap.ever), banned: new Set(snap.banned),
        channels: new Map(snap.channels.map(([id, c]) => [id, {
            id, name: c.name, visibility: c.visibility, history: c.history, archived: c.archived,
            members: new Set(c.members), ever: new Set(c.ever),
        }])),
        keyOps: new Map(snap.keyOps.map(([scope, ks]) => [scope, ks.map((k) => ({ id: k.id, keyId: k.keyId }))])),
        rekeyAtBase: new Set(snap.rekey),
        rekeyOnJoinAtBase: new Set(snap.rekeyOnJoin),
        departed: new Map(snap.departed.map(([k, heads]) => [k, new Set(heads)])),
        hidden: new Set(snap.hidden),
        retracted: new Map(snap.retracted.map(([id, pks]) => [id, new Set(pks)])),
        proposals: new Map(snap.proposals.map(([id, p]) => [id, { action: p.action, approvals: new Set(p.approvals), done: false }])),
        addedBy: new Map(snap.addedBy.map(([k, ids]) => [k, [...ids]])),
    });
    return S;
}

// The covered index of a state's ops, for a checkpoint written on it: per op
// in order, a 16-hex prefix of its id, or, for an op that is not a cut,
// [prefix, position of its latest cut, prefixes of its parents]. Positions
// count from offset (where the epoch's first op, its root, stands).
export function epochIndex(state, offset) {
    return state.order.map((op, i) => {
        const prefix = op.id.slice(0, 16);
        const cut = state.cutAt(i);
        return cut === i ? prefix : [prefix, offset + cut, op.parents.map((p) => p.slice(0, 16))];
    });
}

// Ancestry among the ops that checkpoints cover, from their epoch indexes
// ([{offset, entries}]): has(id), isAncestor(a, b). Ops are found by the
// first 16 hex digits of their ids.
export function coveredIndex(epochs) {
    const at = new Map();   // prefix -> {pos, cut, parents}
    for (const { offset, entries } of epochs) {
        entries.forEach((e, i) => {
            const pos = offset + i;
            const [prefix, cut, parents] = typeof e === 'string' ? [e, pos, []] : Array.isArray(e) ? e : [];
            if (typeof prefix !== 'string' || at.has(prefix)) return;
            at.set(prefix, { pos, cut: Number.isInteger(cut) ? cut : pos, parents: Array.isArray(parents) ? parents : [] });
        });
    }
    const get = (id) => (typeof id === 'string' ? at.get(id.slice(0, 16)) : undefined);
    return {
        has: (id) => !!get(id),
        isAncestor(a, b) {
            const pa = get(a);
            const pb = get(b);
            if (!pa || !pb || pa.pos >= pb.pos) return false;
            if (pa.pos <= pb.cut) return true;
            // a lies after b's cut: search b's ancestors back to it (those are not cuts)
            const seen = new Set();
            const stack = [...pb.parents];
            while (stack.length) {
                const prefix = stack.pop();
                const e = at.get(prefix);
                if (!e || seen.has(prefix) || e.pos <= pb.cut) continue;
                if (e === pa) return true;
                seen.add(prefix);
                stack.push(...e.parents);
            }
            return false;
        },
    };
}

const isHex64 = (x) => typeof x === 'string' && /^[0-9a-f]{64}$/.test(x);

// A checkpoint op's body, if well formed.
function checkpointBody(b) {
    const ids = (xs) => Array.isArray(xs) && xs.every(isHex64);
    return b.type === 'checkpoint' && (b.prev === null || isHex64(b.prev)) && isHex64(b.hash) && isHex64(b.indexHash)
        && ids(b.state) && ids(b.index) && Array.isArray(b.owners) && b.owners.length > 0 && b.owners.every(isHex64)
        && Number.isInteger(b.offset) && b.offset >= 0 && Number.isInteger(b.count) && b.count > 0;
}

// The accepted checkpoints, oldest first, as their events, from any events
// that include the checkpoint and approve-checkpoint ops: {chain, conflict}.
// A checkpoint counts once more than half of the owners named by the one
// before it (by the genesis: the founder) have proposed or approved it; that
// owner list is the checkpoint's own.
//
// Owners who once had that majority keep their keys, so they could later sign
// a rival successor, backdated (the founder alone, before the first). Dates
// cannot settle that, so a device follows the checkpoint it accepted before
// (anchor: from this device, the user's community list, or the invitation)
// and, from there or without one, follows a checkpoint only while it has a
// single accepted successor. At a fork it stops (conflict: true): it then
// replays the ops since the last checkpoint before it, slower but not misled.
export function acceptedChain(ref, events, { anchor = null } = {}) {
    const [founder] = ref.split(':');
    const byId = parseAll(ref, events);
    const proposals = new Map([...byId.values()].filter((o) => checkpointBody(o.body)).map((o) => [o.id, o]));
    const approvers = new Map([...proposals.values()].map((p) => [p.id, new Set([p.pubkey])]));
    for (const o of byId.values()) {
        if (o.body.type === 'approve-checkpoint' && approvers.has(o.body.checkpoint)) approvers.get(o.body.checkpoint).add(o.pubkey);
    }
    const accepted = (p, owners) => {
        const voters = new Set(owners);
        return [...approvers.get(p.id)].filter((pk) => voters.has(pk)).length * 2 > voters.size;
    };
    // the anchor's line back to the genesis, if every step of it was accepted
    let chain = [];
    for (let p = proposals.get(anchor); p && chain.length <= proposals.size; p = proposals.get(p.body.prev)) chain.unshift(p);
    let owners = [founder];
    for (let i = 0; i < chain.length; i++) {
        if (chain[i].body.prev !== (chain[i - 1]?.id ?? null) || !accepted(chain[i], owners)) { chain = []; break; }
        owners = chain[i].body.owners;
    }
    owners = chain.at(-1)?.body.owners ?? [founder];
    let conflict = false;
    while (chain.length < proposals.size) {
        const prev = chain.at(-1)?.id ?? null;
        const next = [...proposals.values()].filter((p) => p.body.prev === prev && accepted(p, owners));
        if (next.length !== 1) {
            conflict = next.length > 1;
            break;
        }
        chain.push(next[0]);
        owners = next[0].body.owners;
    }
    const eventOf = new Map(events.map((e) => [e.id, e]));
    return { chain: chain.map((c) => eventOf.get(c.id)), conflict };
}

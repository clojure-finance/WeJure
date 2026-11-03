// Computes a community's state from its operations (see COMMUNITIES.md).
// Pure: takes verified op events, returns the state. No I/O.

export const ROLE = { none: 0, member: 1, moderator: 2, admin: 3, owner: 4 };
const { member: MEMBER, moderator: MOD, admin: ADMIN, owner: OWNER } = ROLE;

const cmp = (a, b) => a.created_at - b.created_at || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

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
    const ready = [genesis];
    while (ready.length) {
        ready.sort(cmp);
        const op = ready.shift();
        out.push(op);
        for (const k of kids.get(op.id) ?? []) {
            if (!indeg.has(k.id)) continue;
            indeg.set(k.id, indeg.get(k.id) - 1);
            if (indeg.get(k.id) === 0) ready.push(k);
        }
    }
    return out;
}

function newState(ref, founder) {
    return {
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
        retracted: new Map(),    // message id -> pubkey that retracted it
        proposals: new Map(),    // op id -> {action, approvals, done}
        addedBy: new Map(),      // "<pubkey>|state" or "<pubkey>|ch:<id>" -> op ids that brought them in
    };
}

const push = (map, key, value) => (map.get(key) ?? map.set(key, []).get(key)).push(value);

// One pass over the ordered ops. `caps` holds the revocations found by the
// previous pass: pubkey -> [{id, roleAfter}].
function replay(ref, founder, ordered, anc, caps) {
    const S = newState(ref, founder);
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
                const members = vis === 'private' ? new Set([actor, ...(b.members ?? []).filter(isMember)]) : new Set();
                const c = { id: b.channel, name: String(b.name ?? ''), visibility: vis,
                    history: b.history === 'from-join' ? 'from-join' : 'shared', archived: false, members, ever: new Set(members) };
                S.channels.set(c.id, c);
                for (const pk of members) push(S.addedBy, `${pk}|ch:${c.id}`, op.id);
                if (encrypted(`ch:${c.id}`)) {
                    if (typeof b.keyId !== 'string') return false;
                    push(S.keyOps, `ch:${c.id}`, { id: op.id, keyId: b.keyId });
                }
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
                if (scope !== 'state' && !S.channels.has(scope.slice(3))) return false;
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
            case 'hide':
                if (role < MOD || typeof b.message !== 'string') return false;
                S.hidden.add(b.message);
                return true;
            case 'retract':
                if (typeof b.message !== 'string') return false;
                S.retracted.set(b.message, actor);
                return true;
            default:
                return false;
        }
    };

    for (const op of ordered) {
        current = op;
        // The actor's role, lowered by every revocation of them this op is concurrent with.
        let role = rank(op.pubkey);
        for (const rev of caps.get(op.pubkey) ?? []) {
            if (rev.id !== op.id && !anc.get(rev.id)?.has(op.id) && !anc.get(op.id).has(rev.id)) role = Math.min(role, rev.roleAfter);
        }
        // apply() checks everything before changing anything, so an invalid op leaves no trace
        if (apply(op, role)) valid.add(op.id);
    }
    return { S, valid, revocations };
}

const revKey = (caps) => JSON.stringify([...caps].map(([pk, v]) => [pk, v.map((r) => `${r.id}:${r.roleAfter}`).sort()]).sort());

// The community's state, or null if its genesis op is missing.
export function resolve(ref, events) {
    const [founder, nonce] = ref.split(':');
    const byId = new Map();
    for (const e of events) {
        let body;
        try { body = JSON.parse(e.content); } catch { continue; }
        if (!body || typeof body.type !== 'string') continue;
        if (!e.tags.some((t) => t[0] === 'community' && t[1] === ref)) continue;
        const parents = e.tags.filter((t) => t[0] === 'parent').map((t) => t[1]);
        byId.set(e.id, { id: e.id, pubkey: e.pubkey, created_at: e.created_at, parents, body });
    }
    const genesis = [...byId.values()]
        .filter((o) => o.body.type === 'create' && o.pubkey === founder && o.body.nonce === nonce && o.parents.length === 0)
        .sort(cmp)[0];
    if (!genesis) return null;

    const ordered = topoOrder(byId, genesis);
    const anc = new Map();
    for (const op of ordered) {
        const set = new Set();
        for (const p of op.parents) { set.add(p); anc.get(p).forEach((a) => set.add(a)); }
        anc.set(op.id, set);
    }

    // Replay until the revocations stop changing (see "Computing the state").
    let caps = new Map();
    let result;
    for (let pass = 0; pass < 12; pass++) {
        result = replay(ref, founder, ordered, anc, caps);
        if (revKey(result.revocations) === revKey(caps)) break;
        if (pass >= 10) {
            for (const [pk, v] of result.revocations) caps.set(pk, [...(caps.get(pk) ?? []), ...v]);
        } else {
            caps = result.revocations;
        }
    }
    const { S, valid } = result;
    const hasChild = new Set(ordered.flatMap((o) => o.parents));
    return withHelpers(S, {
        order: ordered, anc, valid,
        heads: ordered.filter((o) => !hasChild.has(o.id)).map((o) => o.id),
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
    // A scope needs a new key unless its latest key op descends from every op that
    // took someone out of it (and, for from-join channels, brought someone in).
    const needsRekey = (scope) => {
        if (!encrypted(scope)) return false;
        const k = S.keyOps.get(scope)?.at(-1);
        if (!k) return true;
        const ch = scope === 'state' ? null : channel(scope.slice(3));
        const triggers = [...(S.reductions.get(scope) ?? []), ...(ch?.history === 'from-join' ? S.additions.get(scope) ?? [] : [])];
        return triggers.some((d) => d !== k.id && !extra.anc.get(k.id).has(d));
    };
    const everIn = (id, pk) => {
        const ch = channel(id);
        return !!ch && (ch.visibility === 'community' ? S.ever.has(pk) : ch.ever.has(pk));
    };
    // Whether pk had been brought into the channel as of op `at` (an op id): so a
    // message naming `at` was written after they joined.
    const joinedBy = (id, pk, at) => {
        const seen = extra.anc.get(at);
        if (!seen) return false;
        const by = (key) => (S.addedBy.get(key) ?? []).some((a) => a === at || seen.has(a));
        return by(`${pk}|state`) && (channel(id)?.visibility !== 'private' || by(`${pk}|ch:${id}`));
    };
    const roleOf = (pk) => Object.keys(ROLE).find((k) => ROLE[k] === rank(pk));
    return Object.assign(S, extra, { rank, roleOf, isMember, channel, inChannel, everIn, joinedBy, encrypted, members, scopeMembers, currentKeyId, needsRekey });
}

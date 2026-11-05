// What the WeJure screens call. Everything returns plain objects and arrays (or
// promises of them), so the ClojureScript side can use js->clj and needs no
// Map or Set interop. The logged-in session lives here.
import * as account from './account.js';
import * as C from './communities.js';
import { KIND, closePool, repair } from './core.js';
import { fetchBlob, mediaServersOf, upload } from './media.js';
import { clear, restore, save, siteConfig } from './session.js';
import { forgetCache } from './cache.js';
import * as social from './social.js';

let current;

// The logged-in session, or null.
export function session() {
    if (current === undefined) {
        current = restore();
        if (current) repairLater(current);
    }
    return current;
}

// Once per tab session, with more than one relay: a while after the page loads,
// copy the user's own events, and the gift wraps addressed to them, to every
// relay that misses them (core.js repair), so relays that were down catch up.
function repairLater(s) {
    if (s.relays.length < 2) return;
    try {
        if (sessionStorage.getItem('wejure-repaired')) return;
        sessionStorage.setItem('wejure-repaired', '1');
    } catch { return; }
    setTimeout(() => {
        repair(s.pool, s.relays, { authors: [s.pk] })
            .then(() => repair(s.pool, s.relays, { kinds: [KIND.GIFT_WRAP], '#p': [s.pk] }))
            .catch((e) => console.warn('repair failed:', e.message));
    }, 5000);
}

export const loggedIn = () => !!session();

// {pk, username, picture} of the logged-in user, or null.
export function me() {
    const s = session();
    return s && { pk: s.pk, username: s.alias, picture: s.picture ?? '' };
}

const message = (e) => e?.message ?? String(e);

// Resolves with null once p does, or with p's error message: what the screens'
// write actions get, so a failed write is shown, never silently dropped.
const outcome = (p) => p.then(() => null, (e) => message(e));

// ---- accounts ----

// Registration, login and logout close the relay connections they no longer
// need: the web app loads a new page after each, which would close them
// anyway, but the mobile app does not.

// Stops the current session's work in this tab: closes its relay connections
// and drops the communities opened with it.
function end() {
    if (current) closePool(current.pool);
    current = undefined;
    opened.clear();
}

// Creates an account; photo is a File or null. Resolves with null, or an error
// message. The photo is uploaded before anything is published, so a failed
// upload leaves no half-made account behind.
export async function register(username, password, photo) {
    const { relays, mediaServers } = siteConfig();
    const s = account.newAccount(relays, username, { mediaServers });
    try {
        if ((await account.claimants(s.pool, relays, username)).length) {
            return 'Username already exists. Please choose a different username.';
        }
        let picture = '';
        try {
            if (photo) picture = (await upload(s, new Uint8Array(await photo.arrayBuffer()), photo.type || 'application/octet-stream')).sha256;
        } catch (e) {
            return `The profile picture could not be uploaded: ${message(e)}`;
        }
        try {
            await account.publishAccount(s, password, { picture });
            return null;
        } catch (e) {
            return `The account could not be saved: ${message(e)}`;
        }
    } finally {
        closePool(s.pool);   // logging in opens a pool of its own
    }
}

// Resolves with null, or an error message.
export async function login(username, password) {
    const { relays, mediaServers } = siteConfig();
    try {
        const s = await account.login(relays, username, password, { mediaServers });
        const picture = clean(await account.profile(s, s.pk))?.picture ?? '';
        closePool(s.pool);
        end();
        save(s, { picture });   // restored on next use, like after a reload
        return null;
    } catch (e) {
        return message(e) === 'wrong username or password' ? 'Wrong username or password.' : message(e);
    }
}

export function logout() {
    const s = session();
    if (s) forgetCache(s);   // the decrypted cache of this account on this device
    end();
    clear();
}

// ---- media ----

const blobUrls = new Map();

// A browser URL for the file with this hash, fetched from the site's media
// servers or the author's and checked against the hash (a server cannot swap
// a picture). Resolves with null if no server has it intact.
export function mediaUrl(sha256, authorPk) {
    if (!sha256) return Promise.resolve(null);
    if (!blobUrls.has(sha256)) {
        blobUrls.set(sha256, (async () => {
            const s = session();
            const servers = [...siteConfig().mediaServers];
            try { if (s && authorPk) servers.push(...await mediaServersOf(s, authorPk)); } catch { /* the site's are enough */ }
            try {
                const { bytes } = await fetchBlob(sha256, [...new Set(servers)]);
                return URL.createObjectURL(new Blob([bytes]));
            } catch {
                blobUrls.delete(sha256);   // try again next time
                return null;
            }
        })());
    }
    return blobUrls.get(sha256);
}

// Uploads a File to the user's media servers; resolves with its hash.
export async function uploadFile(file) {
    const m = await upload(session(), new Uint8Array(await file.arrayBuffer()), file.type || 'application/octet-stream');
    return m.sha256;
}

// ---- profiles ----

const profiles = new Map();   // pk -> promise of its profile
let waiting = null;           // pk -> resolve, for the next lookup
const isHash = (x) => typeof x === 'string' && /^[0-9a-f]{64}$/.test(x);
const text = (x) => (typeof x === 'string' ? x : '');

// The fields WeJure shows from a profile, as strings (anyone can publish
// anything), or null.
const clean = (p) => p && { username: text(p.name), about: text(p.about), picture: isHash(p.picture) ? p.picture : '' };

// {pk, username, about, picture}, or null for an account without a profile
// (or if it cannot be read right now; null is not remembered). Profiles asked
// for together (a page of posts, a community's members) are looked up in one
// query: one request each would run into the relay's subscription limit.
export function profile(pk) {
    if (!isHash(pk)) return Promise.resolve(null);
    if (!profiles.has(pk)) {
        if (!waiting) {
            const batch = (waiting = new Map());
            queueMicrotask(async () => {
                waiting = null;
                let found = new Map();
                try { found = await account.profiles(session(), [...batch.keys()]); } catch { /* none found */ }
                for (const [p, resolve] of batch) {
                    if (!found.has(p)) profiles.delete(p);
                    resolve(found.has(p) ? { pk: p, ...clean(found.get(p)) } : null);
                }
            });
        }
        profiles.set(pk, new Promise((resolve) => waiting.set(pk, resolve)));
    }
    return profiles.get(pk);
}

// The accounts claiming a username: [pk, ...].
export const lookupUser = (username) => account.claimants(session().pool, session().relays, username);

// Exact-username search: [{pk, username, picture}].
export async function searchUsers(username) {
    const pks = await lookupUser(username);
    return (await Promise.all(pks.map(profile))).filter(Boolean);
}

export const updateBio = (about) => outcome(account.updateProfile(session(), { about }).then(() => profiles.delete(session().pk)));

export const isFollowing = async (pk) => (await social.follows(session())).includes(pk);
export const follow = (pk) => outcome(social.follow(session(), pk));
export const unfollow = (pk) => outcome(social.unfollow(session(), pk));

// ---- posts ----

// A post as the screens show it.
async function postView(e) {
    const p = await profile(e.pubkey);
    return {
        id: e.id, author: e.pubkey, text: e.content, image: social.imageOf(e) ?? '',
        time: e.created_at * 1000, username: p?.username ?? '', picture: p?.picture ?? '',
    };
}

// One page of posts, newest first: by `authors` (default: the people the user
// follows), from the cursor `until` on (null: from now). Resolves with
// {posts, next}; next is the next page's cursor, or null at the end.
export async function postsPage({ authors, until, limit = 20 } = {}) {
    const page = await social.feedPage(session(), { authors: authors ?? undefined, until: until ?? undefined, limit });
    return { posts: await Promise.all(page.posts.map(postView)), next: page.next };
}

// Follows new posts and deletions, leaving out blocked users. authors
// defaults to the people the user follows. onBlock([pk]) is called with
// everyone blocked whenever the user blocks someone, so the screen can drop
// their posts. Returns a function that stops it.
export function watchPosts({ authors, onPost, onDelete, onBlock = () => {} }) {
    const s = session();
    let stop = () => {};
    let stopped = false;
    let blocked = new Set();   // as of the last change: a post whose author is blocked while it loads is dropped
    (authors ? Promise.resolve(authors) : social.follows(s)).then((as) => {
        if (stopped) return;
        stop = social.watchFeed(s, as, {
            onPost: (e) => postView(e).then((p) => { if (!blocked.has(e.pubkey)) onPost(p); },
                (err) => console.warn('could not show a post:', err)),
            onDelete: (id, pk) => onDelete(id, pk),
            onBlock: (pks) => { blocked = pks; onBlock([...pks]); },
        });
    }, (err) => console.warn('could not follow the feed:', err));
    return () => { stopped = true; stop(); };
}

// Signs a post with an optional picture hash. Returns [post, saved]: the post to
// show right away (marked as sending), and a promise of null once a relay has
// stored it, or of an error message if none did.
export async function newPost(text, imageHash, imageType) {
    const s = session();
    const event = social.newPost(s, text ?? '', imageHash ? { sha256: imageHash, type: imageType ?? 'image/png' } : null);
    const saved = social.publishEvent(s, event).then(() => null, (e) => `The post was not saved: ${message(e)}`);
    return [await postView(event), saved];
}

export const deletePost = (id) => outcome(social.deletePost(session(), id));

// The recent posts of the people the user follows that contain the query.
export async function searchPosts(text) {
    return Promise.all((await social.searchPosts(session(), text)).map(postView));
}

// ---- direct messages ----

// The people to chat with: those the user follows and those who wrote to them,
// minus blocked users, as [{pk, username, picture, lastMessage}] (ms, 0 if none).
export async function contacts() {
    const s = session();
    const [followed, rumors, blocked] = await Promise.all([social.follows(s), social.unwrapAll(s), social.blocked(s)]);
    const last = new Map();
    for (const r of rumors) {
        if (r.kind !== KIND.DM) continue;
        const to = r.tags.find((t) => t[0] === 'p')?.[1];
        const peer = r.pubkey === s.pk ? to : r.pubkey;
        if (peer) last.set(peer, Math.max(last.get(peer) ?? 0, r.created_at * 1000));
    }
    const pks = [...new Set([...followed, ...last.keys()])].filter((pk) => pk !== s.pk && !blocked.has(pk));
    return Promise.all(pks.map(async (pk) => {
        const p = await profile(pk);
        return { pk, username: p?.username || pk.slice(0, 8), picture: p?.picture ?? '', lastMessage: last.get(pk) ?? 0 };
    }));
}

// The conversation with pk, oldest first: [{id, own, text, time}].
export async function conversation(pk) {
    const s = session();
    return (await social.conversation(s, pk)).map((m) => ({ id: m.id, own: m.from === s.pk, text: m.text, time: m.ms }));
}

// Resolves with null, or an error message.
export const sendMessage = (pk, text) => outcome(social.sendDM(session(), pk, text));

// Calls onChange when a message (or a community key) arrives. Returns a stop function.
export const watchInbox = (onChange) => social.watchInbox(session(), () => onChange());

export const block = (pk) => outcome(social.block(session(), pk));

// ---- communities ----

const RANK = { none: 0, member: 1, moderator: 2, admin: 3, owner: 4 };
const opened = new Map();   // ref -> promise of the community's context, while the page lives

function contextOf(ref) {
    if (!opened.has(ref)) {
        opened.set(ref, C.openCommunity(session(), ref).catch((e) => { opened.delete(ref); throw e; }));
    }
    return opened.get(ref);
}

// Runs a change; resolves with null, or an error message.
async function change(ref, fn) {
    try {
        await fn(await contextOf(ref));
        return null;
    } catch (e) {
        return message(e).replace(/^operation not allowed: .*/, 'You are not allowed to do that.');
    }
}

const summary = (ctx) => ({ ref: ctx.ref, name: ctx.state.name, mode: ctx.state.mode, myRole: ctx.state.roleOf(ctx.s.pk) });

// {joined: [{ref, name, mode, myRole}], invitations: [{ref, name, from: [username]}]}
export async function myCommunities() {
    const s = session();
    const { joined, invitations } = await C.myCommunities(s);
    const load = async (ref) => {
        try {
            const ctx = await contextOf(ref);
            await C.refresh(ctx);   // names and roles change
            return ctx;
        } catch {
            return null;
        }
    };
    const js = (await Promise.all([...joined.keys()].map(load))).filter(Boolean).map(summary);
    const invs = await Promise.all(invitations.map(async (inv) => {
        const ctx = await load(inv.ref);
        if (!ctx || !ctx.state.isMember(s.pk)) return null;   // withdrawn, or not really for us
        const from = await Promise.all(inv.from.map(async (pk) => (await profile(pk))?.username ?? pk.slice(0, 8)));
        return { ref: inv.ref, name: ctx.state.name, from };
    }));
    return { joined: js, invitations: invs.filter(Boolean) };
}

// Resolves with the new community's ref.
export async function createCommunity(name, mode, join) {
    const ctx = await C.createCommunity(session(), { name, mode, join: mode === 'open' ? join : 'invite' });
    opened.set(ctx.ref, Promise.resolve(ctx));
    return ctx.ref;
}

// Resolves with null, or an error message.
export const acceptInvitation = (ref) => outcome((async () => {
    const inv = (await C.myCommunities(session())).invitations.find((i) => i.ref === ref);
    if (inv) await C.accept(session(), inv);
})());

// Joins an open community; resolves with null, or an error message.
export async function joinCommunity(ref) {
    try {
        const ctx = await C.join(session(), ref, session().relays);
        opened.set(ref, Promise.resolve(ctx));
        return null;
    } catch (e) {
        return message(e).startsWith('operation not allowed') ? 'This community cannot be joined.' : message(e);
    }
}

export const leaveCommunity = (ref) => change(ref, async (ctx) => { await C.leave(ctx); opened.delete(ref); });

// Which roles `me` may give `target` (owner changes become proposals).
function roleChoices(meRank, targetRank, self) {
    if (self) return [];
    if (meRank === RANK.owner) return ['member', 'moderator', 'admin', 'owner'];
    if (meRank === RANK.admin && targetRank <= RANK.moderator) return ['member', 'moderator'];
    return [];
}

const mayRemove = (meRank, targetRank, self) =>
    !self && (meRank === RANK.owner || (meRank >= RANK.moderator && meRank > targetRank));

// Everything the community page shows, as plain data, with what the user may do.
// Resolves with null if the community cannot be read.
export async function community(ref) {
    let ctx;
    try {
        ctx = await contextOf(ref);
        await C.refresh(ctx);
    } catch {
        return null;
    }
    // checkpoint upkeep (C.maintain) in the background, after a random pause,
    // so that two tabs of one account rarely propose at the same moment
    ctx.maintaining ??= new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))
        .then(() => C.maintain(ctx))
        .catch((e) => console.warn('checkpoint upkeep failed:', e))
        .finally(() => { ctx.maintaining = null; });
    const st = ctx.state;
    const me = ctx.s.pk;
    const myRank = st.rank(me);
    const members = await Promise.all(st.members().map(async (pk) => {
        const p = await profile(pk);
        const rank = st.rank(pk);
        return {
            pk, username: p?.username || pk.slice(0, 8), picture: p?.picture ?? '', role: st.roleOf(pk),
            roleChoices: roleChoices(myRank, rank, pk === me), canRemove: mayRemove(myRank, rank, pk === me),
        };
    }));
    const nameOf = (pk) => members.find((m) => m.pk === pk)?.username ?? pk.slice(0, 8);
    const keysHeld = new Set([...ctx.keys.values()].map((k) => k.scope));
    const channels = [...st.channels.values()].filter((c) => !c.archived).map((c) => ({
        id: c.id, name: c.name, visibility: c.visibility, history: c.history,
        member: st.inChannel(c.id, me),
        readable: st.inChannel(c.id, me) && (!st.encrypted(`ch:${c.id}`) || keysHeld.has(`ch:${c.id}`)),
        members: c.visibility === 'private' ? [...c.members].filter((pk) => st.isMember(pk)) : [],
    }));
    const proposals = [...st.proposals].filter(([, p]) => !p.done).map(([id, p]) => ({
        id, type: p.action.type, member: p.action.member, memberName: nameOf(p.action.member), role: p.action.role ?? null,
        approvals: [...p.approvals].map(nameOf), approvedByMe: p.approvals.has(me),
    }));
    return {
        ref, name: st.name, description: st.description, mode: st.mode, join: st.join,
        myRole: st.roleOf(me), isMember: st.isMember(me),
        canManage: myRank >= RANK.admin, canModerate: myRank >= RANK.moderator, isOwner: myRank === RANK.owner,
        channels, members, proposals,
    };
}

// [{topic, count, last}] of a channel, most recent first.
export async function topics(ref, channel) {
    const ctx = await contextOf(ref);
    return [...(await C.topics(ctx, channel))].map(([topic, t]) => ({ topic, count: t.count, last: t.last * 1000 }))
        .sort((a, b) => b.last - a.last);
}

// The fetched messages of a channel's topic (all topics if topic is null),
// oldest first: its recent history, and older pages fetched by olderMessages.
export async function messages(ref, channel, topic) {
    const ctx = await contextOf(ref);
    const msgs = await C.readChannel(ctx, channel, topic == null ? {} : { topic });
    const canHide = ctx.state.rank(ctx.s.pk) >= RANK.moderator;
    return Promise.all(msgs.map(async (m) => {
        const p = await profile(m.from);
        return {
            id: m.id, from: m.from, username: p?.username || m.from.slice(0, 8), picture: p?.picture ?? '',
            topic: m.topic, text: m.text, time: m.ms, mine: m.from === ctx.s.pk, canHide: canHide && m.from !== ctx.s.pk,
        };
    }));
}

// Whether a channel has older messages than those fetched so far.
export async function hasOlderMessages(ref, channel) {
    try {
        return await C.hasOlder(await contextOf(ref), channel);
    } catch {
        return false;
    }
}

// Fetches older messages of a channel's topic (all topics if topic is null),
// page by page until there are 20 more or none are left, at most 10 pages at
// a time. Resolves with whether there are older ones still.
export async function olderMessages(ref, channel, topic) {
    const ctx = await contextOf(ref);
    const count = async () => (await C.readChannel(ctx, channel, topic == null ? {} : { topic })).length;
    const before = await count();
    let more = await C.hasOlder(ctx, channel);
    for (let page = 0; more && page < 10; page++) {
        more = await C.loadOlder(ctx, channel);
        if ((await count()) >= before + 20) break;
    }
    return more;
}

export const sendCommunityMessage = (ref, channel, topic, text) => change(ref, (ctx) => C.sendMessage(ctx, channel, topic, text));
export const hideMessage = (ref, id) => change(ref, (ctx) => C.hideMessage(ctx, id));
export const retractMessage = (ref, id) => change(ref, (ctx) => C.retractMessage(ctx, id));

// Adds the account with this username; resolves with null, or an error message.
export async function addMember(ref, username, role) {
    const pks = await lookupUser(username);
    if (pks.length === 0) return `There is no user called ${username}.`;
    if (pks.length > 1) return `Several accounts are called ${username}.`;
    return change(ref, (ctx) => C.addMember(ctx, pks[0], role || 'member'));
}

export const removeMember = (ref, pk, ban) => change(ref, (ctx) => C.removeMember(ctx, pk, { ban: !!ban }));
export const setRole = (ref, pk, role) => change(ref, (ctx) => C.setRole(ctx, pk, role));
export const approve = (ref, proposal) => change(ref, (ctx) => C.approve(ctx, proposal));
export const updateCommunity = (ref, settings) => change(ref, (ctx) => C.updateSettings(ctx, settings));
export const archiveChannel = (ref, channel) => change(ref, (ctx) => C.archiveChannel(ctx, channel));

// spec: {name, visibility, history, members: [pk]}; resolves with null, or an error message.
export const createChannel = (ref, spec) => change(ref, (ctx) => C.createChannel(ctx, {
    name: spec.name, visibility: spec.visibility || 'community', history: spec.history || 'shared', members: spec.members ?? [],
}));

export const addToChannel = (ref, channel, pk) => change(ref, (ctx) => C.addToChannel(ctx, channel, pk));
export const removeFromChannel = (ref, channel, pk) => change(ref, (ctx) => C.removeFromChannel(ctx, channel, pk));

// Calls onChange() whenever the community changes. Returns a stop function.
export function watchCommunity(ref, onChange) {
    let stop = () => {};
    let stopped = false;
    contextOf(ref).then((ctx) => { if (!stopped) stop = C.watch(ctx, () => onChange()); }, () => {});
    return () => { stopped = true; stop(); };
}

// What the WeJure screens call. Everything returns plain objects and arrays (or
// promises of them), so the ClojureScript side can use js->clj and needs no
// Map or Set interop. The logged-in session lives here.
import * as account from './account.js';
import { KIND, createPool, query } from './core.js';
import { fetchBlob, mediaServersOf, upload } from './media.js';
import { clear, restore, save, siteConfig } from './session.js';
import * as social from './social.js';

let current;

// The logged-in session, or null.
export function session() {
    if (current === undefined) current = restore();
    return current;
}

export const loggedIn = () => !!session();

// {pk, username, picture} of the logged-in user, or null.
export function me() {
    const s = session();
    return s && { pk: s.pk, username: s.alias, picture: s.picture ?? '' };
}

const message = (e) => e?.message ?? String(e);

// ---- accounts ----

// Login, registration and logout are each followed by a page load, which closes
// the relay connections; closing them here instead races the CLOSE messages the
// pool still sends, and the browser logs errors for those.

// Creates an account; photo is a File or null. Resolves with null, or an error message.
export async function register(username, password, photo) {
    const { relays, mediaServers } = siteConfig();
    if ((await account.claimants(createPool(), relays, username)).length) {
        return 'Username already exists. Please choose a different username.';
    }
    try {
        const s = await account.register(relays, username, password, { mediaServers });
        if (photo) {
            const m = await upload(s, new Uint8Array(await photo.arrayBuffer()), photo.type || 'application/octet-stream');
            await account.updateProfile(s, { picture: m.sha256 });
        }
        return null;
    } catch (e) {
        return `The account could not be saved: ${message(e)}`;
    }
}

// Resolves with null, or an error message.
export async function login(username, password) {
    const { relays, mediaServers } = siteConfig();
    try {
        const s = await account.login(relays, username, password, { mediaServers });
        const p = await account.profile(s, s.pk);
        save(s, { picture: p?.picture ?? '' });
        current = undefined;   // restored on next use, like after a reload
        return null;
    } catch (e) {
        return message(e) === 'wrong username or password' ? 'Wrong username or password.' : message(e);
    }
}

export function logout() {
    clear();
    current = undefined;
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

const profiles = new Map();

// {pk, username, about, picture}, or null for an unknown account.
export function profile(pk) {
    if (!/^[0-9a-f]{64}$/.test(pk)) return Promise.resolve(null);
    if (!profiles.has(pk)) {
        profiles.set(pk, account.profile(session(), pk).then((p) => p && {
            pk, username: p.name ?? '', about: p.about ?? '', picture: p.picture ?? '',
        }));
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

export async function updateBio(about) {
    await account.updateProfile(session(), { about });
    profiles.delete(session().pk);
}

export const isFollowing = async (pk) => (await social.follows(session())).includes(pk);
export const follow = (pk) => social.follow(session(), pk).then(() => null);
export const unfollow = (pk) => social.unfollow(session(), pk).then(() => null);

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
// follows), older than `until`. Resolves with {posts, next}; next is null at the end.
export async function postsPage({ authors, until, limit = 20 } = {}) {
    const page = await social.feedPage(session(), { authors: authors ?? undefined, until: until ?? undefined, limit });
    return { posts: await Promise.all(page.posts.map(postView)), next: page.next };
}

// Follows new posts and deletions. authors defaults to the people the user
// follows. Returns a function that stops it.
export function watchPosts({ authors, onPost, onDelete }) {
    const s = session();
    let stop = () => {};
    let stopped = false;
    (authors ? Promise.resolve(authors) : social.follows(s)).then((as) => {
        if (stopped) return;
        stop = social.watchFeed(s, as, {
            onPost: async (e) => onPost(await postView(e)),
            onDelete: (id, pk) => onDelete(id, pk),
        });
    });
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

export const deletePost = (id) => social.deletePost(session(), id).then(() => null);

// The recent posts of the people the user follows that contain the query.
export async function searchPosts(text) {
    const s = session();
    const authors = await social.follows(s);
    const events = await query(s.pool, s.relays, { kinds: [KIND.POST], authors, limit: 500 });
    const q = text.toLowerCase();
    return Promise.all(events.filter((e) => e.content.toLowerCase().includes(q)).map(postView));
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
export const sendMessage = (pk, text) => social.sendDM(session(), pk, text).then(() => null, (e) => message(e));

// Calls onChange when a message (or a community key) arrives. Returns a stop function.
export const watchInbox = (onChange) => social.watchInbox(session(), () => onChange());

export const block = (pk) => social.block(session(), pk).then(() => null);

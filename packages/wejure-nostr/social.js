// Posts, follows, the feed, blocking and direct messages: all standard Nostr.
import { getConversationKey, v2 as nip44 } from 'nostr-tools/nip44';
import * as nip04 from 'nostr-tools/nip04';
import { unwrapEvent, wrapEvent } from 'nostr-tools/nip59';
import { KIND, after, deletedIds, latest, publish, query, sign } from './core.js';
import { getEventHash } from 'nostr-tools/pure';
import { debounce, subscribe } from './live.js';
import { decryptAll } from './cache.js';
import { synced, watched } from './sync.js';

// A signed post, not yet sent, optionally with a picture already on Blossom ({sha256, type}).
export function newPost(s, text, media, { created_at } = {}) {
    const tags = media ? [['imeta', `x ${media.sha256}`, `m ${media.type}`]] : [];
    return sign(s, { kind: KIND.POST, content: text, tags, created_at });
}

export const publishEvent = (s, event) => publish(s.pool, s.relays, event);

export async function post(s, text, media, opts) {
    const event = newPost(s, text, media, opts);
    return { event, ...(await publish(s.pool, s.relays, event)) };
}

export const imageOf = (post) => post.tags.find((t) => t[0] === 'imeta')?.find((v) => v.startsWith('x '))?.slice(2) ?? null;

export async function deletePost(s, id) {
    return publish(s.pool, s.relays, sign(s, { kind: KIND.DELETION, tags: [['e', id], ['k', '1']] }));
}

const followsEvent = (s, pk) => latest(s.pool, s.relays, { kinds: [KIND.FOLLOWS], authors: [pk] });
const followed = (e) => (e ? e.tags.filter((t) => t[0] === 'p').map((t) => t[1]) : []);

export const follows = async (s, pk = s.pk) => followed(await followsEvent(s, pk));

async function changeFollows(s, change) {
    const prev = await followsEvent(s, s.pk);
    const tags = [...new Set(change(followed(prev)))].map((p) => ['p', p]);
    return publish(s.pool, s.relays, sign(s, { kind: KIND.FOLLOWS, tags, created_at: after(prev) }));
}
export const follow = (s, pk) => changeFollows(s, (pks) => [...pks, pk]);
export const unfollow = (s, pk) => changeFollows(s, (pks) => pks.filter((p) => p !== pk));

// The blocklist is a NIP-51 mute list whose entries are encrypted to the owner,
// so relays and other users cannot see who blocks whom.
const muteEvent = (s) => latest(s.pool, s.relays, { kinds: [KIND.MUTE_LIST], authors: [s.pk] });

// A mute list's private entries: encrypted to its owner, with NIP-44 or (by
// other Nostr apps) NIP-04; [] if there are none or they cannot be read.
function secretEntries(s, e) {
    if (!e?.content) return [];
    for (const decrypt of [() => nip44.decrypt(e.content, getConversationKey(s.sk, s.pk)), () => nip04.decrypt(s.sk, s.pk, e.content)]) {
        try {
            const tags = JSON.parse(decrypt());
            if (Array.isArray(tags)) return tags.filter((t) => Array.isArray(t) && typeof t[1] === 'string');
        } catch { /* the other scheme, or not readable */ }
    }
    return [];
}

// The people a mute list mutes, privately or (as other apps can) publicly.
const muted = (s, e) => new Set([...secretEntries(s, e), ...(e?.tags ?? [])].filter((t) => t[0] === 'p').map((t) => t[1]));

export const blocked = async (s) => muted(s, await muteEvent(s));

// Adds pk to the private entries; public entries stay as they are.
export async function block(s, pk) {
    const prev = await muteEvent(s);
    const secret = secretEntries(s, prev);
    if (!secret.some((t) => t[0] === 'p' && t[1] === pk)) secret.push(['p', pk]);
    const content = nip44.encrypt(JSON.stringify(secret), getConversationKey(s.sk, s.pk));
    return publish(s.pool, s.relays, sign(s, { kind: KIND.MUTE_LIST, tags: prev?.tags ?? [], content, created_at: after(prev) }));
}

// Of posts, those neither deleted by their author nor by a blocked user.
async function visible(s, posts) {
    if (!posts.length) return [];
    const authors = [...new Set(posts.map((p) => p.pubkey))];
    const deletions = await query(s.pool, s.relays, { kinds: [KIND.DELETION], authors, '#e': posts.map((p) => p.id) });
    const deleted = deletedIds([...posts, ...deletions]);
    const blockedSet = await blocked(s);
    return posts.filter((p) => !deleted.has(p.id) && !blockedSet.has(p.pubkey));
}

// A page cursor: "<seconds>:<ids>", the time of the page's oldest posts and
// the ids already shown at that second. Times have whole seconds, so several
// posts can share one; the next page starts at that second and skips those ids.
function parseCursor(cursor) {
    if (cursor === undefined || cursor === null) return { until: undefined, skip: [] };
    const [t, ids] = String(cursor).split(':');
    return { until: Number(t), skip: ids ? ids.split(',') : [] };
}

// One page of the feed: the newest posts of the people s follows, from the
// cursor on (undefined: from now). Relays filter and limit on their side, so a
// page costs the same however long everyone's history is. Deleted posts and
// blocked users are left out. Returns {posts, next}; next is the cursor of the
// next page, or null at the end.
export async function feedPage(s, { until: cursor, limit = 10, authors } = {}) {
    authors ??= await follows(s);
    const { until, skip } = parseCursor(cursor);
    const fetched = await query(s.pool, s.relays, { kinds: [KIND.POST], authors, until, limit: limit + skip.length });
    const page = fetched.filter((p) => !skip.includes(p.id)).slice(0, limit);
    const last = page.at(-1)?.created_at;
    const atLast = [...(last === until ? skip : []), ...page.filter((p) => p.created_at === last).map((p) => p.id)];
    return {
        posts: await visible(s, page),
        next: page.length === limit ? `${last}:${atLast.join(',')}` : null,
    };
}

// The recent posts of the people s follows (the newest 500 of each relay)
// that contain text, newest first, without deleted posts or blocked users.
export async function searchPosts(s, text) {
    const events = await query(s.pool, s.relays, { kinds: [KIND.POST], authors: await follows(s), limit: 500 });
    const q = text.toLowerCase();
    return visible(s, events.filter((e) => e.content.toLowerCase().includes(q)));
}

// Direct messages (NIP-17): the message is signed by the sender, encrypted to the
// recipient, and wrapped in an event from a throwaway key with a fuzzed time.
// Relays see only "someone sent something to <recipient>". A second copy is
// wrapped for the sender so their other devices see the conversation too.
export async function sendDM(s, toPk, text) {
    // ms orders messages sent within the same second (created_at has seconds only)
    const rumor = { kind: KIND.DM, content: text, tags: [['p', toPk], ['ms', String(Date.now())]] };
    for (const pk of [toPk, s.pk]) await publish(s.pool, s.relays, wrapEvent(rumor, s.sk, pk));
}

// Whether a rumor (the unsigned event inside a seal) is well formed; anyone can
// send anything.
const wellFormed = (r) => !!r && typeof r.content === 'string' && Number.isInteger(r.kind)
    && Number.isInteger(r.created_at) && Array.isArray(r.tags)
    && r.tags.every((t) => Array.isArray(t) && t.every((v) => typeof v === 'string'))
    && (() => { try { return getEventHash(r) === r.id; } catch { return false; } })();

// Every gift-wrapped message addressed to s that decrypts, as rumors. All of
// them, however many there are; after the first call, only new ones are fetched.
export async function unwrapAll(s) {
    const wraps = await synced(s, s.relays, { kinds: [KIND.GIFT_WRAP] }, '#p', [s.pk]);
    // each gift wrap is opened (and its seal's signature checked) once (cache.js);
    // null for wraps that are not for us, forged or malformed
    return (await decryptAll(s, wraps, (w) => {
        const r = unwrapEvent(w, s.sk);
        return wellFormed(r) ? r : null;
    })).filter(Boolean);
}

// The conversation between s and peerPk, oldest first. A message wrapped
// twice (a sender may do so) counts once.
export async function conversation(s, peerPk) {
    const to = (r) => r.tags.find((t) => t[0] === 'p')?.[1];
    const rumors = new Map((await unwrapAll(s)).map((r) => [r.id, r]));
    return [...rumors.values()]
        .filter((r) => r.kind === KIND.DM)
        .filter((r) => (r.pubkey === peerPk && to(r) === s.pk) || (r.pubkey === s.pk && to(r) === peerPk))
        .map((r) => ({ id: r.id, from: r.pubkey, text: r.content, at: r.created_at,
            ms: Number(r.tags.find((t) => t[0] === 'ms')?.[1]) || r.created_at * 1000 }))
        .sort((a, b) => a.ms - b.ms);
}

// Live feed: onPost(post) for each new post by authors who are not blocked,
// onDelete(id, pubkey) for each deletion they send (the caller drops the post
// only if pubkey wrote it), and onBlock(blocked), with the whole blocklist,
// whenever the user changes it, here or on another device (the caller drops
// the posts of the people on it). Posts wait until the blocklist is loaded.
export function watchFeed(s, authors, { onPost, onDelete, onBlock = () => {} }) {
    let list = null;   // the mute list the blocklist comes from
    let blockedSet = new Set();
    // Whether e is a newer mute list than the one in use (it then is).
    const take = (e) => {
        if (!e || e.pubkey !== s.pk || (list && e.created_at <= list.created_at)) return false;
        list = e;
        blockedSet = muted(s, e);
        return true;
    };
    const ready = muteEvent(s).then(take, () => false);
    const filters = [{ kinds: [KIND.POST], authors }, { kinds: [KIND.DELETION], authors }, { kinds: [KIND.MUTE_LIST], authors: [s.pk] }];
    return subscribe(s, filters, (e) => ready.then(() => {
        if (e.kind === KIND.MUTE_LIST) {
            if (take(e)) onBlock(new Set(blockedSet));
        } else if (e.kind === KIND.POST) {
            if (!blockedSet.has(e.pubkey)) onPost(e);
        } else {
            for (const [name, id] of e.tags) if (name === 'e') onDelete(id, e.pubkey);
        }
    }).catch((err) => console.warn('a feed listener failed:', err)));
}

// Calls onChange whenever something new is gift-wrapped to s (a direct message,
// or a key bundle for a community), once per burst. It listens to the mirror
// unwrapAll reads.
export function watchInbox(s, onChange) {
    return watched(s, s.relays, { kinds: [KIND.GIFT_WRAP] }, '#p', [s.pk], debounce(() => onChange()));
}

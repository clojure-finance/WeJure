// Posts, follows, the feed, blocking and direct messages: all standard Nostr.
import { getConversationKey, v2 as nip44 } from 'nostr-tools/nip44';
import { unwrapEvent, wrapEvent } from 'nostr-tools/nip59';
import { KIND, deletedIds, latest, publish, query, sign } from './core.js';
import { subscribe } from './live.js';

// A post, optionally with a picture already on Blossom ({sha256, type}).
export async function post(s, text, media, { created_at } = {}) {
    const tags = media ? [['imeta', `x ${media.sha256}`, `m ${media.type}`]] : [];
    const event = sign(s, { kind: KIND.POST, content: text, tags, created_at });
    return { event, ...(await publish(s.pool, s.relays, event)) };
}

export const imageOf = (post) => post.tags.find((t) => t[0] === 'imeta')?.find((v) => v.startsWith('x '))?.slice(2) ?? null;

export async function deletePost(s, id) {
    return publish(s.pool, s.relays, sign(s, { kind: KIND.DELETION, tags: [['e', id], ['k', '1']] }));
}

export async function follows(s, pk = s.pk) {
    const e = await latest(s.pool, s.relays, { kinds: [KIND.FOLLOWS], authors: [pk] });
    return e ? e.tags.filter((t) => t[0] === 'p').map((t) => t[1]) : [];
}

async function setFollows(s, pks) {
    return publish(s.pool, s.relays, sign(s, { kind: KIND.FOLLOWS, tags: [...new Set(pks)].map((p) => ['p', p]) }));
}
export const follow = async (s, pk) => setFollows(s, [...(await follows(s)), pk]);
export const unfollow = async (s, pk) => setFollows(s, (await follows(s)).filter((p) => p !== pk));

// The blocklist is a NIP-51 mute list whose entries are encrypted to the owner,
// so relays and other users cannot see who blocks whom.
export async function blocked(s) {
    const e = await latest(s.pool, s.relays, { kinds: [KIND.MUTE_LIST], authors: [s.pk] });
    if (!e || !e.content) return new Set();
    const tags = JSON.parse(nip44.decrypt(e.content, getConversationKey(s.sk, s.pk)));
    return new Set(tags.filter((t) => t[0] === 'p').map((t) => t[1]));
}

export async function block(s, pk) {
    const list = new Set([...(await blocked(s)), pk]);
    const content = nip44.encrypt(JSON.stringify([...list].map((p) => ['p', p])), getConversationKey(s.sk, s.pk));
    return publish(s.pool, s.relays, sign(s, { kind: KIND.MUTE_LIST, content }));
}

// One page of the feed: the newest posts of the people s follows, older than
// `until` (seconds). Relays filter and limit on their side, so a page costs the
// same however long everyone's history is. Deleted posts and blocked users are
// left out. Returns {posts, next}, where next is the `until` for the next page.
export async function feedPage(s, { until, limit = 10, authors } = {}) {
    authors ??= await follows(s);
    const posts = await query(s.pool, s.relays, { kinds: [KIND.POST], authors, until, limit });
    const deletions = posts.length
        ? await query(s.pool, s.relays, { kinds: [KIND.DELETION], authors, '#e': posts.map((p) => p.id) })
        : [];
    const deleted = deletedIds([...posts, ...deletions]);
    const blockedSet = await blocked(s);
    const page = posts.slice(0, limit);
    return {
        posts: page.filter((p) => !deleted.has(p.id) && !blockedSet.has(p.pubkey)),
        next: page.length === limit ? page[page.length - 1].created_at - 1 : null,
    };
}

// Direct messages (NIP-17): the message is signed by the sender, encrypted to the
// recipient, and wrapped in an event from a throwaway key with a fuzzed time.
// Relays see only "someone sent something to <recipient>". A second copy is
// wrapped for the sender so their other devices see the conversation too.
export async function sendDM(s, toPk, text) {
    const rumor = { kind: KIND.DM, content: text, tags: [['p', toPk]] };
    for (const pk of [toPk, s.pk]) await publish(s.pool, s.relays, wrapEvent(rumor, s.sk, pk));
}

// Every gift-wrapped message addressed to s that decrypts, as rumors.
export async function unwrapAll(s) {
    const wraps = await query(s.pool, s.relays, { kinds: [KIND.GIFT_WRAP], '#p': [s.pk], limit: 5000 });
    const rumors = [];
    for (const w of wraps) {
        try { rumors.push(unwrapEvent(w, s.sk)); } catch { /* not for us or forged */ }
    }
    return rumors;
}

// The conversation between s and peerPk, oldest first.
export async function conversation(s, peerPk) {
    const to = (r) => r.tags.find((t) => t[0] === 'p')?.[1];
    return (await unwrapAll(s))
        .filter((r) => r.kind === KIND.DM)
        .filter((r) => (r.pubkey === peerPk && to(r) === s.pk) || (r.pubkey === s.pk && to(r) === peerPk))
        .sort((a, b) => a.created_at - b.created_at)
        .map((r) => ({ from: r.pubkey, text: r.content, at: r.created_at }));
}

// Live feed: onPost(post) for each new post by authors, onDelete(id, pubkey)
// for each deletion they send (the caller drops the post only if pubkey wrote it).
export function watchFeed(s, authors, { onPost, onDelete }) {
    return subscribe(s, [{ kinds: [KIND.POST], authors }, { kinds: [KIND.DELETION], authors }], (e) => {
        if (e.kind === KIND.POST) onPost(e);
        else for (const [name, id] of e.tags) if (name === 'e') onDelete(id, e.pubkey);
    });
}

// Calls onChange whenever something new is gift-wrapped to s (a direct message,
// or a key bundle for a community).
export function watchInbox(s, onChange) {
    return subscribe(s, [{ kinds: [KIND.GIFT_WRAP], '#p': [s.pk] }], onChange);
}

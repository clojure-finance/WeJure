// Accounts: a secp256k1 key pair is the identity. To log in with a username and
// password from any device, the secret key is stored password-encrypted (NIP-49,
// scrypt) in an app-data event on the user's relays, tagged with the username.
// Several accounts can claim one username; login tries each claim.
import { generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { decrypt as nip49Decrypt, encrypt as nip49Encrypt } from 'nostr-tools/nip49';
import { KIND, after, createPool, latest, publish, query, relayUrls, sign } from './core.js';

const accountTag = (alias) => `wejure/account/${alias.toLowerCase()}`;

function session(sk, alias, relays, mediaServers, pool = createPool()) {
    return { sk, pk: getPublicKey(sk), alias, relays, mediaServers, pool };
}

// A new account's session, not yet published: it can already sign, for example
// to upload the profile picture before anything else is stored.
export const newAccount = (relays, alias, { mediaServers = [] } = {}) =>
    session(generateSecretKey(), alias, relays, mediaServers);

// Publishes a new account. The login record goes last, so a registration that
// fails halfway leaves no account that claims the username.
export async function publishAccount(s, password, { picture = '' } = {}) {
    const templates = [
        { kind: KIND.PROFILE, content: JSON.stringify({ name: s.alias, about: '', picture }) },
        { kind: KIND.RELAY_LIST, tags: s.relays.map((r) => ['r', r]) },
        { kind: KIND.FOLLOWS, tags: [['p', s.pk]] },   // users follow themselves, so their posts are in their feed
        { kind: KIND.MEDIA_SERVERS, tags: s.mediaServers.map((u) => ['server', u]) },
        { kind: KIND.APP_DATA, tags: [['d', accountTag(s.alias)]], content: nip49Encrypt(s.sk, password, 16) },
    ];
    const now = Math.floor(Date.now() / 1000);   // all different kinds, so the same time for all
    for (const t of templates) await publish(s.pool, s.relays, sign(s, { ...t, created_at: now }));
    return s;
}

export const register = (relays, alias, password, { mediaServers = [], picture = '' } = {}) =>
    publishAccount(newAccount(relays, alias, { mediaServers }), password, { picture });

// Logs in from a device that knows nothing but the relays, the username and the password.
export async function login(relays, alias, password, { mediaServers = [] } = {}) {
    const pool = createPool();
    const claims = await query(pool, relays, { kinds: [KIND.APP_DATA], '#d': [accountTag(alias)] });
    for (const claim of claims) {
        try {
            const sk = nip49Decrypt(claim.content, password);
            if (getPublicKey(sk) === claim.pubkey) return session(sk, alias, relays, mediaServers, pool);
        } catch { /* not this claim */ }
    }
    throw new Error('wrong username or password');
}

// The accounts claiming a username (usually one; see "Usernames" in the README).
export async function claimants(pool, relays, alias) {
    const claims = await query(pool, relays, { kinds: [KIND.APP_DATA], '#d': [accountTag(alias)] });
    return [...new Set(claims.map((c) => c.pubkey))];
}

// A profile event's content, or {} if it is not a JSON object (anyone can
// publish anything).
function profileOf(e) {
    try {
        const p = JSON.parse(e.content);
        return p && typeof p === 'object' && !Array.isArray(p) ? p : {};
    } catch {
        return {};
    }
}

// pk's profile (the raw fields, unchecked), or null if there is none.
export async function profile(s, pk) {
    const e = await latest(s.pool, s.relays, { kinds: [KIND.PROFILE], authors: [pk] });
    return e ? profileOf(e) : null;
}

export async function updateProfile(s, fields) {
    const prev = await latest(s.pool, s.relays, { kinds: [KIND.PROFILE], authors: [s.pk] });
    const content = JSON.stringify({ ...(prev ? profileOf(prev) : {}), ...fields });
    return publish(s.pool, s.relays, sign(s, { kind: KIND.PROFILE, content, created_at: after(prev) }));
}

// The relays a user writes to (NIP-65), read from whatever relays we know.
export async function relaysOf(s, pk) {
    const e = await latest(s.pool, s.relays, { kinds: [KIND.RELAY_LIST], authors: [pk] });
    return e ? relayUrls(e.tags.filter((t) => t[0] === 'r').map((t) => t[1])) : [];
}

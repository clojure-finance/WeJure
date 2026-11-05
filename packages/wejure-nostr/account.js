// Accounts: a secp256k1 key pair is the identity. To log in with a username and
// password from any device, the secret key is stored password-encrypted (NIP-49,
// scrypt) in an app-data event on the user's relays, tagged with the username.
// Several accounts can claim one username; login tries each claim.
import { generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { decrypt as nip49Decrypt, encrypt as nip49Encrypt } from 'nostr-tools/nip49';
import { bech32 } from '@scure/base';
import { KIND, after, closePool, createPool, latest, publish, query, relayUrls, sign } from './core.js';

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
        { kind: KIND.APP_DATA, tags: [['d', accountTag(s.alias)]], content: nip49Encrypt(s.sk, password, LOG_N) },
    ];
    const now = Math.floor(Date.now() / 1000);   // all different kinds, so the same time for all
    for (const t of templates) await publish(s.pool, s.relays, sign(s, { ...t, created_at: now }));
    return s;
}

export const register = (relays, alias, password, { mediaServers = [], picture = '' } = {}) =>
    publishAccount(newAccount(relays, alias, { mediaServers }), password, { picture });

const LOG_N = 16;      // scrypt cost of WeJure's password encryption (2^16)
const MAX_CLAIMS = 10;

// Whether a claim's key is encrypted as WeJure does it. Anyone can publish a
// claim for any username, with a scrypt cost of their choosing: one at 2^20
// costs a gigabyte and seconds to try, so only WeJure's cost is tried.
function wejureClaim(claim) {
    try {
        const { prefix, words } = bech32.decode(claim.content, 5000);
        return prefix === 'ncryptsec' && bech32.fromWords(words)[1] === LOG_N;
    } catch {
        return false;
    }
}

// Logs in from a device that knows nothing but the relays, the username and the password.
export async function login(relays, alias, password, { mediaServers = [] } = {}) {
    const pool = createPool();
    const claims = (await query(pool, relays, { kinds: [KIND.APP_DATA], '#d': [accountTag(alias)] })).filter(wejureClaim);
    for (const claim of claims.slice(0, MAX_CLAIMS)) {
        try {
            const sk = nip49Decrypt(claim.content, password);
            if (getPublicKey(sk) === claim.pubkey) return session(sk, alias, relays, mediaServers, pool);
        } catch { /* not this claim */ }
    }
    closePool(pool);
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

// The profiles of pks (the raw fields, unchecked), in one query: Map pk ->
// profile, leaving out those that have none.
export async function profiles(s, pks) {
    const out = new Map();
    for (const e of await query(s.pool, s.relays, { kinds: [KIND.PROFILE], authors: pks })) {
        if (!out.has(e.pubkey)) out.set(e.pubkey, profileOf(e));   // newest first
    }
    return out;
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

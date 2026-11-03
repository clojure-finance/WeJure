// The logged-in user in the browser, kept in sessionStorage so a reload keeps
// the session (as Gun's user.recall did). Relays and media servers come from
// window.WEJURE_CONFIG (public/config.js), defaulting to the server the page
// was loaded from.
import { getPublicKey } from 'nostr-tools/pure';
import { bytesToHex, hexToBytes } from 'nostr-tools/utils';
import { createPool, relayUrls } from './core.js';
import { httpUrls } from './media.js';

const KEY = 'wejure-session';

export function siteConfig() {
    const cfg = globalThis.WEJURE_CONFIG ?? {};
    const origin = globalThis.location?.origin ?? 'http://localhost:8020';
    const relays = relayUrls(cfg.relays);
    const mediaServers = httpUrls(Array.isArray(cfg.mediaServers) ? cfg.mediaServers : []);
    return {
        relays: relays.length ? relays : [origin.replace(/^http/, 'ws')],
        mediaServers: mediaServers.length ? mediaServers : [origin],
    };
}

// Remembers s (a session from account.js) in this browser tab.
export function save(s, { picture = '' } = {}) {
    sessionStorage.setItem(KEY, JSON.stringify({ sk: bytesToHex(s.sk), alias: s.alias, picture }));
}

// The remembered session, with a fresh relay pool, or null.
export function restore() {
    let saved;
    try { saved = JSON.parse(sessionStorage.getItem(KEY)); } catch { return null; }
    if (!saved?.sk) return null;
    const sk = hexToBytes(saved.sk);
    return { sk, pk: getPublicKey(sk), alias: saved.alias, picture: saved.picture, ...siteConfig(), pool: createPool() };
}

export function clear() {
    sessionStorage.removeItem(KEY);
    sessionStorage.removeItem('wejure-repaired');   // see repairLater in app.js
}

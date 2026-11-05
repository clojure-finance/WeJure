// Live updates. subscribe() calls back once for each new event matching any of
// the filters, and returns a function that stops it. Filters use `limit: 0`
// ("nothing stored, only what arrives from now on"), so callers load the past
// themselves. Each relay gets subscriptions of its own (the pool drops an id
// it has seen before checking the event, so a relay that sends a forged copy
// first would otherwise hide the real one). When a relay closes one, all of
// that relay's start over after a pause, asking for what arrived in the gap
// too. Every event received is also handed to the session's mirrors
// (sync.js). Only the feed uses this; the other screens listen to mirrors.
import { chunked, lateness, relayUrls } from './core.js';
import { offer } from './sync.js';

export function subscribe(s, filters, onEvent, relays = s.relays) {
    let stopped = false;
    const seen = new Set();
    const parts = filters.flatMap(chunked);
    const atRelay = (url) => {
        let subs = [];          // {closer, closed, replaced}
        let timer = null;
        let droppedAt = null;   // when the subscription dropped, until the new one has caught up
        const start = () => {
            const since = droppedAt;
            let caughtUp = 0;
            subs = parts.map((filter) => {
                const sub = { closed: false, replaced: false };
                sub.closer = s.pool.subscribe([url], since === null ? { ...filter, limit: 0 } : { ...filter, since: since - lateness(filter) }, {
                    onevent: (e) => {
                        if (seen.has(e.id)) return;   // the same event from several relays
                        seen.add(e.id);
                        offer(s.pool, e);
                        onEvent(e);
                    },
                    // the pool also reports "end of stored events" when it gives up, right
                    // before the close; only an answer from a subscription still open counts
                    oneose: () => queueMicrotask(() => {
                        if (!sub.closed && ++caughtUp === parts.length) droppedAt = null;
                    }),
                    onclose: () => {
                        sub.closed = true;
                        if (stopped || sub.replaced || timer || s.pool.closed) return;
                        droppedAt ??= Math.floor(Date.now() / 1000);
                        timer = setTimeout(restart, 2000);
                    },
                });
                return sub;
            });
        };
        // closing a subscription twice upsets nostr-tools' count of them
        const closeAll = () => subs.forEach((sub) => {
            sub.replaced = true;
            if (!sub.closed) {
                sub.closed = true;
                sub.closer.close();
            }
        });
        const restart = () => {
            timer = null;
            if (stopped) return;
            closeAll();
            start();
        };
        start();
        return () => {
            clearTimeout(timer);
            closeAll();
        };
    };
    const stops = relayUrls(relays).map(atRelay);
    return () => {
        stopped = true;
        stops.forEach((stop) => stop());
    };
}

// fn, called once `ms` after the last of a burst of calls (for refreshing a
// view after many events). Errors are logged, never left unhandled.
export function debounce(fn, ms = 300) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => Promise.resolve().then(() => fn(...args)).catch((e) => console.warn('refresh failed:', e)), ms);
    };
}

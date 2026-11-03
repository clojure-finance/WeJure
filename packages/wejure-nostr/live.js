// Live updates. subscribe() calls back once for each new event matching any of
// the filters, and returns a function that stops it. Filters use `limit: 0`
// ("nothing stored, only what arrives from now on"), so callers load the past
// themselves. If every relay connection drops, it starts over after a pause,
// asking for what arrived during the gap too. Every event received is also
// handed to the session's mirrors (sync.js).
import { chunked, lateness, relayUrls } from './core.js';
import { offer } from './sync.js';

export function subscribe(s, filters, onEvent, relays = s.relays) {
    relays = relayUrls(relays);
    let stopped = false;
    let timer = null;
    let closers = [];
    let droppedAt = null;   // when the connections dropped, while catching up
    const seen = new Set();
    if (!relays.length) return () => {};
    const start = () => {
        closers = filters.flatMap(chunked).map((filter) => s.pool.subscribe(relays,
            droppedAt === null ? { ...filter, limit: 0 } : { ...filter, since: droppedAt - lateness(filter) }, {
                onevent: (e) => {
                    if (seen.has(e.id)) return;   // the same event from several relays
                    seen.add(e.id);
                    offer(s.pool, e);
                    onEvent(e);
                },
                onclose: () => {
                    if (stopped || timer) return;
                    droppedAt ??= Math.floor(Date.now() / 1000);
                    timer = setTimeout(() => {
                        timer = null;
                        if (stopped) return;
                        closers.forEach((c) => c.close());
                        start();
                    }, 2000);
                },
            }));
    };
    start();
    return () => {
        stopped = true;
        clearTimeout(timer);
        closers.forEach((c) => c.close());
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

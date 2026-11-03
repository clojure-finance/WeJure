// Live updates. subscribe() calls back once for each new event matching any of
// the filters, and returns a function that stops it. Filters use `limit: 0`
// ("nothing stored, only what arrives from now on"), so callers load the past
// themselves. If every relay connection drops, it starts over after a pause.

export function subscribe(s, filters, onEvent, relays = s.relays) {
    let stopped = false;
    let timer = null;
    let closers = [];
    const seen = new Set();
    const start = () => {
        closers = filters.map((filter) => s.pool.subscribe(relays, { ...filter, limit: 0 }, {
            onevent: (e) => {
                if (seen.has(e.id)) return;   // the same event from several relays
                seen.add(e.id);
                onEvent(e);
            },
            onclose: () => {
                if (stopped || timer) return;
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

// fn, called at most once per `ms` after the last call (for refreshing a view
// after a burst of events).
export function debounce(fn, ms = 300) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

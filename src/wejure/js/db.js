// The single GunDB instance shared by account.js, profile.js, post.js and chat.js,
// and helpers for confirmed writes and stoppable subscriptions.
import GUN from 'gun';
import 'gun/sea';
import 'gun/lib/then';
import 'gun/lib/webrtc';

export const SEA = GUN.SEA;

// relay.js serves the local relay. To sync with other machines, add the URL of a
// publicly reachable relay here, e.g. "https://<host>/gun".
export const gun = GUN({ peers: ["http://localhost:8001/gun"] });

// recall({sessionStorage: true}) keeps the logged-in key pair in sessionStorage
// under "pair"; core.cljs treats its presence as "logged in".
export const user = gun.user().recall({ sessionStorage: true });

// Resolves once a relay has stored the put of value at node; rejects when this
// client or a relay refuses it, or no relay answers within timeoutMs. Gun
// calls a put's callback once per ack: first for its own in-memory graph,
// then once per peer, with the peer in ack._.via. Relays (the peers above)
// have a url; WebRTC peers are other browsers, which do not pass old writes
// on to a relay later, so their acks prove nothing either. With the default
// {acks: 1} the callback would see nothing but the local ack.
export function acked(node, value, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error("No answer from the relay.")), timeoutMs);
        node.put(value, (ack) => {
            const via = ack._ && ack._.via;
            if (via ? !via.url : !ack.err) return;               // a browser's ack, or the local one
            clearTimeout(timer);
            if (ack.err) reject(new Error(ack.err)); else resolve();
        }, { acks: 9 });
    });
}

// Calls onData(data, key) for the current value of chain and every change, like
// chain.on, and returns a function that stops the calls. Gun has no handle for
// a single listener (chain.off() tears the chain down for every listener in
// this gun instance); a listener can only remove itself through the event it
// is called with. So after stop, onData is never called again, and the gun
// listener detaches itself at its next event.
export function subscribe(chain, onData) {
    let stopped = false;
    chain.on((data, key, msg, ev) => {
        if (stopped) { ev.off(); return; }
        onData(data, key);
    });
    return () => { stopped = true; };
}

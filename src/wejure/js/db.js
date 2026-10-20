// The single GunDB instance shared by account.js, profile.js, post.js and chat.js.
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

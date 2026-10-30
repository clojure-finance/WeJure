import CryptoJS from 'crypto-js';
import { gun, user, acked } from './db';
import * as records from './records';
import { lookupPubs } from './profile';

// Existing accounts were created with SHA-256-hashed passwords, so keep hashing.
function hashPassword(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}

// onDone(err): err is null on success, otherwise a message to show.
export function login(name, password, onDone) {
    user.auth(name, hashPassword(password), ({ err }) => {
        if (err) {
            onDone(err);
            return;
        }
        const pub = user.is.pub;
        sessionStorage.setItem("username", name);
        sessionStorage.setItem("pub", pub);
        gun.get("~" + pub).get("profile").get("icon_cid").once((cid) => {
            if (cid) sessionStorage.setItem("icon_cid", cid);
            onDone(null);
        });
    });
}

// onDone(err): err is null on success, otherwise a message to show.
// The profile and the self-follow live in the new account's own user space,
// so the account is logged in just long enough to write them signed. It must
// be an explicit auth: user.create already sets user.is, but writes made
// before auth are not validly signed and are dropped by every peer.
// Registration waits for the relay to store both writes, so the page's
// post-registration reload cannot destroy a pending write and leave the account
// without a readable profile; a timeout is an error for the same reason.
export function register(name, password, iconCID, onDone) {
    lookupPubs(name).then((pubs) => {
        if (pubs.length > 0) {
            onDone("Username already exists. Please choose a different username.");
            return;
        }
        user.create(name, hashPassword(password), ({ err }) => {
            if (err) {
                onDone(err);
                return;
            }
            user.auth(name, hashPassword(password), ({ err: authErr }) => {
                if (authErr) {
                    onDone(authErr);
                    return;
                }
                Promise.all([
                    acked(user.get("profile"), records.userProfile(name, iconCID, ""), 20000),
                    acked(user.get("follows").get(user.is.pub), true, 20000),  // own posts appear in the feed
                ])
                    .then(() => {
                        user.leave();
                        sessionStorage.removeItem("pair");
                        onDone(null);
                    })
                    .catch((e) => onDone("The profile could not be saved: " + e.message + " Please try again."));
            });
        });
    });
}

export function logout() {
    user.leave();
    sessionStorage.clear();
}

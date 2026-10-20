import CryptoJS from 'crypto-js';
import { gun, user } from './db';
import * as records from './records';

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
        sessionStorage.setItem("username", name);
        gun.get("user").get(name).get("icon_cid").once((cid) => {
            if (cid) sessionStorage.setItem("icon_cid", cid);
            onDone(null);
        });
    });
}

// onDone(err): err is null on success, otherwise a message to show.
export function register(name, password, iconCID, onDone) {
    gun.get("user").get(name).once((existing) => {
        if (existing) {
            onDone("Username already exists. Please choose a different username.");
            return;
        }
        user.create(name, hashPassword(password), ({ err }) => {
            if (err) {
                onDone(err);
                return;
            }
            gun.get("user").get(name).put(records.userProfile(iconCID, ""));
            gun.get("user").get(name).get("is_following").get(name).put(true);   // own posts appear in the feed
            onDone(null);
        });
    });
}

export function logout() {
    user.leave();
    sessionStorage.clear();
}

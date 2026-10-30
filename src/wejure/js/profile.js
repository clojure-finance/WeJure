import { gun, user } from './db';
import * as records from './records';

function userNode(pub) {
    return gun.get("~" + pub);
}

// The pubs currently claiming an alias in gun's account system (~@alias).
// Normally zero or one; more than one means the alias is ambiguous (two
// accounts raced the same name) and the caller must not pick one itself.
export async function lookupPubs(alias) {
    const node = await gun.get("~@" + alias).then();
    if (!node) return [];
    return Object.keys(node).filter((key) => key.startsWith("~")).map((key) => key.slice(1));
}

// Alias resolution for the pages: {pubs: [...]}.
export function lookupUser(alias) {
    return lookupPubs(alias).then(records.aliasLookup);
}

// The profile record of a user, or null if the user is unknown.
export function getProfile(pub) {
    return userNode(pub).get("profile").then().then((profile) => profile || null);
}

export function getIconCID(pub) {
    return userNode(pub).get("profile").get("icon_cid").then();
}

export function getUserBio(pub) {
    return userNode(pub).get("profile").get("bio").then();
}

// Writes go through the authenticated user API, so they only ever touch the
// logged-in user's own space.
export function updateBio(bio) {
    user.get("profile").get("bio").put(bio);
}

// onStatus(boolean): whether the logged-in user follows pub.
export function getIsFollowing(selfPub, pub, onStatus) {
    userNode(selfPub).get("follows").get(pub).once((status) => onStatus(status === true));
}

export function followUser(pub) {
    user.get("follows").get(pub).put(true);
}

export function unfollowUser(pub) {
    user.get("follows").get(pub).put(null);
}

// Exact-alias user search: onResult({username, pub, icon_cid}) is called once
// per account claiming the alias (normally at most one).
export function searchUser(query, onResult) {
    lookupPubs(query).then((pubs) => {
        for (const pub of pubs) {
            userNode(pub).get("profile").once((profile) => {
                if (profile && records.aliasOf(profile) === query) {
                    onResult(records.userSearchResult(records.aliasOf(profile), pub, records.iconCIDOf(profile)));
                }
            });
        }
    });
}

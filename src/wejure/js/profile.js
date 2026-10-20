import { gun } from './db';
import * as records from './records';

// onResult({username, icon_cid}, exactMatch) is called once per matching user.
export function searchUser(query, onResult) {
    gun.get("user").map().once((info, username) => {
        if (info && username.includes(query)) {
            onResult(records.userSearchResult(username, records.iconCIDOf(info)), username === query);
        }
    });
}

export function getIconCID(username) {
    return gun.get("user").get(username).get("icon_cid").then();
}

export function getUserBio(username) {
    return gun.get("user").get(username).get("bio").then();
}

export function updateBio(username, bio) {
    gun.get("user").get(username).get("bio").put(bio);
}

// onStatus(boolean): whether self follows username.
export function getIsFollowing(self, username, onStatus) {
    gun.get("user").get(self).get("is_following").get(username).once((status) => onStatus(status === true));
}

export function followUser(self, username) {
    gun.get("user").get(self).get("is_following").get(username).put(true);
}

export function unfollowUser(self, username) {
    gun.get("user").get(self).get("is_following").get(username).put(false);
}

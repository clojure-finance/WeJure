import { gun, user } from './db';
import * as records from './records';

// A user's posts live in their own user space under "posts", keyed by
// newPostKey. Only the owner's signed writes reach that space, so a post's
// author is the pub whose space it was read from.
function postsOf(pub) {
    return gun.get("~" + pub).get("posts");
}

export function storePost(text, imageCID) {
    const date = new Date();
    user.get("posts").get(records.newPostKey(date)).put(records.post(date, text, imageCID));
}

export function deletePost(key) {
    user.get("posts").get(key).put(null);
}

// onPost(post, key, authorPub) is called once per existing post, and for posts
// added later.
export function loadPosts(pub, onPost) {
    postsOf(pub).map().once((post, key) => {
        if (post) onPost(post, key, pub);
    });
}

// Posts of everyone the user follows (registration makes users follow themselves).
export function loadFeed(selfPub, onPost) {
    gun.get("~" + selfPub).get("follows").map().once((following, pub) => {
        if (following === true) loadPosts(pub, onPost);
    });
}

// Case-insensitive substring search over the posts of everyone the user
// follows (users cannot be enumerated, and this also bounds the read).
export function searchPosts(selfPub, query, onPost) {
    const needle = query.toLowerCase();
    loadFeed(selfPub, (post, key, pub) => {
        const text = records.textOf(post);
        if (text && text.toLowerCase().includes(needle)) onPost(post, key, pub);
    });
}

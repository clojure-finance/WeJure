import { gun, user, acked, subscribe } from './db';
import * as records from './records';

// A user's posts live in their own user space under "posts", keyed by
// newPostKey. Only the owner's signed writes reach that space, so a post's
// author is the pub whose space it was read from.
function postsOf(pub) {
    return gun.get("~" + pub).get("posts");
}

// Stores a post and returns [key, saved]. The post reaches local subscriptions
// at once; saved resolves to null when the relay has stored it, otherwise to a
// message to show. A post the relay did not confirm is deleted again, so it
// cannot turn up later when the user has already been told it failed.
export function storePost(text, imageCID) {
    const date = new Date();
    const key = records.newPostKey(date);
    const node = user.get("posts").get(key);
    const saved = acked(node, records.post(date, text, imageCID)).then(
        () => null,
        (err) => {
            node.put(null);
            return "Your post could not be saved: " + err.message;
        });
    return [key, saved];
}

export function deletePost(key) {
    user.get("posts").get(key).put(null);
}

// onPost(post, key, authorPub) is called once per existing post and for posts
// added later; onPost(null, key, authorPub) when one of them is deleted.
// Returns a function that stops the calls.
export function loadPosts(pub, onPost) {
    const live = new Set();                             // gun repeats updates
    return subscribe(postsOf(pub).map(), (post, key) => {
        if (post && !live.has(key)) {
            live.add(key);
            onPost(post, key, pub);
        } else if (!post && live.delete(key)) {
            onPost(null, key, pub);
        }
    });
}

// Posts of everyone the user follows (registration makes users follow
// themselves), with deletions as in loadPosts. Returns a function that stops
// the calls.
export function loadFeed(selfPub, onPost) {
    const stops = new Map();                            // followed pub -> stop
    const stopFollows = subscribe(gun.get("~" + selfPub).get("follows").map(), (following, pub) => {
        if (following === true && !stops.has(pub)) stops.set(pub, loadPosts(pub, onPost));
    });
    return () => {
        stopFollows();
        stops.forEach((stop) => stop());
    };
}

// Case-insensitive substring search over the posts of everyone the user
// follows (users cannot be enumerated, and this also bounds the read).
// Returns a function that stops the calls.
export function searchPosts(selfPub, query, onPost) {
    const needle = query.toLowerCase();
    return loadFeed(selfPub, (post, key, pub) => {
        const text = post && records.textOf(post);
        if (!post || (text && text.toLowerCase().includes(needle))) onPost(post, key, pub);
    });
}

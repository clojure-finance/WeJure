import { gun } from './db';

// A user's posts live in the top-level node "post/<username>" (one node, not
// post -> username), keyed by the post's UTC timestamp string.
function postsOf(username) {
    return gun.get("post/" + username);
}

export function storePost(username, text, imageCID) {
    const now = new Date();
    const post = {
        username: username,
        timestamp: now.toUTCString(),
        text: text ?? null,
        image: imageCID ?? null,
        unixtime: now.getTime()
    };
    postsOf(username).get(post.timestamp).put(post);
}

export function deletePost(username, key) {
    postsOf(username).get(key).put(null);
}

// onPost(post, key) is called once per existing post, and for posts added later.
export function loadPosts(username, onPost) {
    postsOf(username).map().once((post, key) => {
        if (post) onPost(post, key);
    });
}

// Posts of everyone the user follows (registration makes users follow themselves).
export function loadFeed(username, onPost) {
    gun.get("user").get(username).get("is_following").map().once((following, followee) => {
        if (following === true) loadPosts(followee, onPost);
    });
}

// Case-insensitive substring search over the text of every user's posts.
export function searchPosts(query, onPost) {
    const needle = query.toLowerCase();
    gun.get("user").map().once((info, username) => {
        if (!info) return;
        loadPosts(username, (post, key) => {
            if (post.text && post.text.toLowerCase().includes(needle)) onPost(post, key);
        });
    });
}

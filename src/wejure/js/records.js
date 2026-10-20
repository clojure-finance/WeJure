// The records the JS layer stores in GunDB or hands to the ClojureScript pages.
//
// Their field names are an external data format: they are stored by the relays
// and read by js->clj. shadow-cljs compiles this directory with Closure's advanced
// optimizations, which rename unquoted property names, so every field is written
// and read here with a quoted key, which Closure leaves alone. The other modules
// build and read records only through these functions, never with object
// literals or dot access.
//
// (Gun's and SEA's own API names, such as the err of an ack or the sessionStorage
// option of recall, need no quoting: shadow-cljs keeps every property name that
// npm code uses.)

// user/<username>
export function userProfile(iconCID, bio) {
    return { "icon_cid": iconCID, "bio": bio };
}

export function iconCIDOf(profile) {
    return profile["icon_cid"];
}

// post/<username>/<timestamp>, keyed by the post's UTC timestamp string
export function post(username, date, text, imageCID) {
    return {
        "username": username,
        "timestamp": date.toUTCString(),
        "text": text ?? null,
        "image": imageCID ?? null,
        "unixtime": date.getTime()
    };
}

export function timestampOf(post) {
    return post["timestamp"];
}

export function textOf(post) {
    return post["text"];
}

// A direct or group chat message; stored encrypted, so only its readers see the fields.
export function message(sender, timeKey, content) {
    return {
        "timestamp": new Date(timeKey).toUTCString(),
        "sender": sender,
        "content": content
    };
}

// user/<username>/chat_list/chat/<roomID>
export function chatListEntry(peer, lastMessageTime) {
    return { "peer": peer, "last_message_time": lastMessageTime };
}

// user/<username>/chat_list/group/<groupID>
export function groupChatListEntry(lastMessageTime) {
    return { "last_message_time": lastMessageTime };
}

export function peerOf(entry) {
    return entry["peer"];
}

export function lastMessageTimeOf(entry) {
    return entry["last_message_time"];
}

// groups/<groupID>
export function group(groupName, creator, date) {
    return {
        "group_name": groupName,
        "creator": creator,
        "created": date.toUTCString(),
        "totallayer": 0
    };
}

// For the pages only, not stored: a user search hit and a chat contact.
export function userSearchResult(username, iconCID) {
    return { "username": username, "icon_cid": iconCID };
}

export function contact(id, avatar, lastMessageTime) {
    return { "id": id, "avatar": avatar, "last_message_time": lastMessageTime };
}

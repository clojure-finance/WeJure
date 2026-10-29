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
//
// Owned data lives in the writer's SEA user space (~<pub>), so a record's author
// is the owner of the node it was read from; records carry no username field.

// ~<pub>/profile
export function userProfile(alias, iconCID, bio) {
    return { "alias": alias, "icon_cid": iconCID, "bio": bio };
}

export function aliasOf(profile) {
    return profile["alias"];
}

export function iconCIDOf(profile) {
    return profile["icon_cid"];
}

export function bioOf(profile) {
    return profile["bio"];
}

// ~<pub>/posts/<key>, keyed by newPostKey so two posts in the same
// millisecond still get distinct keys.
export function newPostKey(date) {
    return date.getTime() + "-" + Math.random().toString(36).slice(2, 8);
}

export function post(date, text, imageCID) {
    return {
        "text": text ?? null,
        "image": imageCID ?? null,
        "unixtime": date.getTime()
    };
}

export function textOf(post) {
    return post["text"];
}

// A direct or group chat message; stored encrypted, so only its readers see the
// fields. The sender alias is display-only: authorship comes from whose outbox
// the message was read from.
export function message(senderAlias, timeKey, content) {
    return {
        "timestamp": new Date(timeKey).toUTCString(),
        "sender": senderAlias,
        "content": content
    };
}

// ~<pub>/chats/<roomID>: the owner's own record of a conversation
// (its messages live under the node's "msgs" edge).
export function chatListEntry(peerPub, lastMessageTime) {
    return { "peer": peerPub, "last_message_time": lastMessageTime };
}

// ~<pub>/chats/g:<groupID>
export function groupChatListEntry(creatorPub, lastMessageTime) {
    return { "creator": creatorPub, "last_message_time": lastMessageTime };
}

export function peerOf(entry) {
    return entry["peer"];
}

export function lastMessageTimeOf(entry) {
    return entry["last_message_time"];
}

// inbox/<pub>/<key>: how another user reaches someone's client (chat requests,
// group invites). The node is public and unowned, so entries count only when
// sig verifies against from.
export function inboxEntry(fromPub, sig) {
    return { "from": fromPub, "sig": sig };
}

export function inboxFromOf(entry) {
    return entry["from"];
}

export function inboxSigOf(entry) {
    return entry["sig"];
}

// The signed payloads of inbox entries.
export function chatPointer(roomID, at) {
    return { "room": roomID, "at": at };
}

export function groupPointer(groupID, creatorPub, at) {
    return { "group": groupID, "creator": creatorPub, "at": at };
}

export function pointerRoomOf(pointer) {
    return pointer["room"];
}

export function pointerGroupOf(pointer) {
    return pointer["group"];
}

export function pointerCreatorOf(pointer) {
    return pointer["creator"];
}

export function pointerAtOf(pointer) {
    return pointer["at"];
}

// ~<creatorPub>/groups/<groupID>
export function group(groupName, date) {
    return {
        "group_name": groupName,
        "created": date.toUTCString(),
        "totallayer": 0
    };
}

// For the pages only, not stored: an alias lookup, a user search hit and a
// chat contact.
export function aliasLookup(pubs) {
    return { "pubs": pubs };
}

export function userSearchResult(username, pub, iconCID) {
    return { "username": username, "pub": pub, "icon_cid": iconCID };
}

export function contact(pub, username, avatar, lastMessageTime) {
    return { "id": pub, "username": username, "avatar": avatar, "last_message_time": lastMessageTime };
}

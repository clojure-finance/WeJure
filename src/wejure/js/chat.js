import CryptoJS from 'crypto-js';
import { gun, SEA } from './db';
import * as records from './records';

function currentUser() {
    return sessionStorage.getItem("username");
}

function currentPair() {
    return JSON.parse(sessionStorage.getItem("pair"));
}

// The encryption public key (epub) of a user, or null if the user is unknown.
async function getEPub(alias) {
    const aliasNode = await gun.get("~@" + alias).then();
    const pubKey = aliasNode && Object.keys(aliasNode).find((key) => key.startsWith("~"));
    if (!pubKey) return null;
    return (await gun.get(pubKey).get("epub").then()) || null;
}

// Both participants derive the same room ID: SHA-256 of the sorted usernames.
function chatRoomID(a, b) {
    const [first, second] = a < b ? [a, b] : [b, a];
    return CryptoJS.SHA256(first + "-" + second).toString(CryptoJS.enc.Hex);
}

// ---------------------------------------------------------------------------
// Contacts and blacklist

// Subscribes to the contacts of username: everyone they follow or have chatted
// with, minus their blacklist. onContacts receives the full array
// [{id, avatar, last_message_time}] on every change. Returns a function that
// stops further calls.
export function init(username, onContacts) {
    const self = gun.get("user").get(username);
    const blocked = new Set();
    const followees = new Set();
    const lastMessageTime = new Map();
    const avatars = new Map();
    let stopped = false;

    const publish = () => {
        if (stopped) return;
        const ids = new Set([...followees, ...lastMessageTime.keys()]);
        onContacts([...ids]
            .filter((id) => id !== username && !blocked.has(id))
            .map((id) => records.contact(id, avatars.get(id) || null, lastMessageTime.get(id) || 0)));
    };

    const fetchAvatar = (id) => {
        if (avatars.has(id)) return;
        avatars.set(id, null);
        gun.get("user").get(id).get("icon_cid").once((cid) => {
            avatars.set(id, cid || null);
            publish();
        });
    };

    self.get("blacklist").map().on((isBlocked, id) => {
        if (isBlocked === true) blocked.add(id); else blocked.delete(id);
        publish();
    });
    self.get("is_following").map().on((following, id) => {
        if (following === true) {
            followees.add(id);
            fetchAvatar(id);
        } else {
            followees.delete(id);
        }
        publish();
    });
    self.get("chat_list").get("chat").map().on((entry) => {
        const peer = entry && records.peerOf(entry);
        if (!peer) return;
        lastMessageTime.set(peer, Math.max(lastMessageTime.get(peer) || 0, records.lastMessageTimeOf(entry) || 0));
        fetchAvatar(peer);
        publish();
    });

    publish();
    return () => { stopped = true; };
}

export function addToBlacklist(usernameToBlock) {
    const self = currentUser();
    gun.get("user").get(self).get("blacklist").get(usernameToBlock).put(true);
    gun.get("user").get(usernameToBlock).get("blockedBy").get(self).put(true);
}

export function removeFromBlacklist(usernameToUnblock) {
    const self = currentUser();
    gun.get("user").get(self).get("blacklist").get(usernameToUnblock).put(null);
    gun.get("user").get(usernameToUnblock).get("blockedBy").get(self).put(null);
}

// ---------------------------------------------------------------------------
// Direct messages, end-to-end encrypted with the ECDH secret of the two users

// Resolves to null on success, otherwise to a message to show.
export async function storeMessage(recipient, content) {
    const sender = currentUser();
    if (await gun.get("user").get(recipient).get("blacklist").get(sender).then()) {
        return "You are blocked by this user.";
    }
    if (await gun.get("user").get(sender).get("blacklist").get(recipient).then()) {
        return "You have blocked this user.";
    }
    const recipientEPub = await getEPub(recipient);
    if (!recipientEPub) return "Unknown user: " + recipient;

    const secret = await SEA.secret(recipientEPub, currentPair());
    const timeKey = Date.now();
    const message = records.message(sender, timeKey, content);
    const roomID = chatRoomID(sender, recipient);
    gun.get("chat").get(roomID).get(String(timeKey)).put(await SEA.encrypt(message, secret));

    // chat_list records let both sides list the conversation as a contact.
    gun.get("user").get(sender).get("chat_list").get("chat").get(roomID).put(records.chatListEntry(recipient, timeKey));
    gun.get("user").get(recipient).get("chat_list").get("chat").get(roomID).put(records.chatListEntry(sender, timeKey));
    return null;
}

// onMessage(peer, {timestamp, sender, content}, timeKey) is called once per
// message in the conversation with peer, including messages sent later.
export async function displayMessage(peer, onMessage) {
    const peerEPub = await getEPub(peer);
    if (!peerEPub) return;
    const secret = await SEA.secret(peerEPub, currentPair());
    gun.get("chat").get(chatRoomID(currentUser(), peer)).map().once(async (data, timeKey) => {
        const message = await SEA.decrypt(data, secret);
        if (message) onMessage(peer, message, timeKey);
    });
}

// ---------------------------------------------------------------------------
// Group chat (no UI yet). Membership changes start a new layer with a fresh
// random key, so members can read exactly the layers they belonged to.
//
//   groups/<groupID>                          {group_name, creator, created, totallayer}
//   groups/<groupID>/<layer>/members/<user>   true
//   groupKeys/<groupID>/<layer>/<user>        layer key, encrypted with SEA.secret(user epub, creator pair)
//   groupChat/<groupID>/<layer>/<timeKey>     message, encrypted with the layer key
//   user/<user>/chat_list/group/<groupID>     {last_message_time}
//
// Layers count from 1. Only the creator can change membership, because only the
// creator's key pair can encrypt layer keys that members can decrypt.

function groupNode(groupID) {
    return gun.get("groups").get(groupID);
}

async function getTotalLayers(groupID) {
    return (await groupNode(groupID).get("totallayer").then()) || 0;
}

async function getMembers(groupID, layer) {
    const members = await groupNode(groupID).get(String(layer)).get("members").then();
    if (!members) return [];
    return Object.keys(members).filter((member) => member !== "_" && members[member] === true);
}

async function isCreator(groupID) {
    return (await groupNode(groupID).get("creator").then()) === currentUser();
}

// Starts layer totallayer + 1 with the given members and a new layer key.
// Must run as the group creator. Members without a public key are skipped.
async function startLayer(groupID, members) {
    const layer = (await getTotalLayers(groupID)) + 1;
    const creatorPair = currentPair();
    const layerKey = SEA.random(32).toString("base64");
    const layerNode = groupNode(groupID).get(String(layer));
    for (const member of new Set(members)) {
        const memberEPub = await getEPub(member);
        if (!memberEPub) continue;
        const secret = await SEA.secret(memberEPub, creatorPair);
        gun.get("groupKeys").get(groupID).get(String(layer)).get(member).put(await SEA.encrypt(layerKey, secret));
        layerNode.get("members").get(member).put(true);
    }
    groupNode(groupID).get("totallayer").put(layer);
    return layer;
}

// The current user's key for a layer, or null if they were not a member of it.
async function getGroupKey(groupID, layer) {
    const encryptedKey = await gun.get("groupKeys").get(groupID).get(String(layer)).get(currentUser()).then();
    if (!encryptedKey) return null;
    const creatorEPub = await getEPub(await groupNode(groupID).get("creator").then());
    if (!creatorEPub) return null;
    const secret = await SEA.secret(creatorEPub, currentPair());
    return (await SEA.decrypt(encryptedKey, secret)) || null;
}

// Creates a group with the current user as creator and resolves to its ID.
export async function createGroup(groupName, members) {
    const creator = currentUser();
    const groupID = CryptoJS.SHA256(Date.now() + creator + Math.random()).toString(CryptoJS.enc.Hex);
    groupNode(groupID).put(records.group(groupName, creator, new Date()));
    await startLayer(groupID, [creator, ...members]);
    await storeGroupMessage(groupID, "Welcome to the group!");
    return groupID;
}

// Creator only. Resolves to null on success, otherwise to a message to show.
export async function addMemberToGroup(groupID, newMember) {
    if (!(await isCreator(groupID))) return "Only the group creator can add members.";
    const members = await getMembers(groupID, await getTotalLayers(groupID));
    await startLayer(groupID, [...members, newMember]);
    return null;
}

// Creator only. Resolves to null on success, otherwise to a message to show.
export async function removeMemberFromGroup(groupID, member) {
    if (!(await isCreator(groupID))) return "Only the group creator can remove members.";
    if (member === currentUser()) return "The group creator cannot be removed.";
    const members = await getMembers(groupID, await getTotalLayers(groupID));
    await startLayer(groupID, members.filter((m) => m !== member));
    return null;
}

// Resolves to null on success, otherwise to a message to show.
export async function storeGroupMessage(groupID, content) {
    const layer = await getTotalLayers(groupID);
    const layerKey = await getGroupKey(groupID, layer);
    if (!layerKey) return "You are not a member of this group.";
    const timeKey = Date.now();
    const message = records.message(currentUser(), timeKey, content);
    gun.get("groupChat").get(groupID).get(String(layer)).get(String(timeKey)).put(await SEA.encrypt(message, layerKey));
    for (const member of await getMembers(groupID, layer)) {
        gun.get("user").get(member).get("chat_list").get("group").get(groupID).put(records.groupChatListEntry(timeKey));
    }
    return null;
}

// onMessage(groupID, {timestamp, sender, content}, timeKey) is called once per
// message in every layer the current user belonged to.
export async function displayGroupMessages(groupID, onMessage) {
    const totalLayers = await getTotalLayers(groupID);
    for (let layer = 1; layer <= totalLayers; layer++) {
        const layerKey = await getGroupKey(groupID, layer);
        if (!layerKey) continue;
        gun.get("groupChat").get(groupID).get(String(layer)).map().once(async (data, timeKey) => {
            const message = await SEA.decrypt(data, layerKey);
            if (message) onMessage(groupID, message, timeKey);
        });
    }
}

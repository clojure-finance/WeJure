import CryptoJS from 'crypto-js';
import { gun, user, SEA, subscribe } from './db';
import * as records from './records';

function currentPub() {
    return sessionStorage.getItem("pub");
}

function currentUsername() {
    return sessionStorage.getItem("username");
}

function currentPair() {
    return JSON.parse(sessionStorage.getItem("pair"));
}

function userNode(pub) {
    return gun.get("~" + pub);
}

// The encryption public key (epub) of a user; SEA stores it in the user space root.
async function getEPub(pub) {
    return (await userNode(pub).get("epub").then()) || null;
}

// Both participants derive the same room ID: SHA-256 of the sorted pubs.
function chatRoomID(a, b) {
    const [first, second] = a < b ? [a, b] : [b, a];
    return CryptoJS.SHA256(first + "-" + second).toString(CryptoJS.enc.Hex);
}

// ---------------------------------------------------------------------------
// Blacklist: private to its owner. Values in ~self/blocks are encrypted with
// the owner's own pair, so nobody can read who blocks whom; blocking works
// reader-side (the blocker's client ignores the blocked user), the blocked
// user just sees silence.

async function isBlocked(pub) {
    const value = await userNode(currentPub()).get("blocks").get(pub).then();
    if (!value) return false;
    return (await SEA.decrypt(value, currentPair())) === true;
}

export async function addToBlacklist(pubToBlock) {
    user.get("blocks").get(pubToBlock).put(await SEA.encrypt(true, currentPair()));
}

export function removeFromBlacklist(pubToUnblock) {
    user.get("blocks").get(pubToUnblock).put(null);
}

// ---------------------------------------------------------------------------
// Contacts

// Subscribes to the contacts of the logged-in user: everyone they follow or
// have chatted with, minus their blacklist. A chat with someone new reaches
// this client as a signed pointer in the public inbox/<self> node; verified
// pointers become own chat entries, everything else is ignored. onContacts
// receives the full array [{id, username, avatar, last_message_time}] on
// every change. Returns a function that stops further calls and the
// subscriptions behind them.
export function init(onContacts) {
    const self = currentPub();
    const pair = currentPair();
    const blocked = new Set();
    const followees = new Set();
    const lastMessageTime = new Map();                  // peer pub -> ms
    const profiles = new Map();                         // pub -> {username, avatar}
    const chatTimes = new Map();                        // room id -> own entry's last_message_time
    const stops = [];
    let stopped = false;

    const publish = () => {
        if (stopped) return;
        const ids = new Set([...followees, ...lastMessageTime.keys()]);
        onContacts([...ids]
            .filter((id) => id !== self && !blocked.has(id))
            .map((id) => {
                const profile = profiles.get(id) || {};
                return records.contact(id, profile.username || id.slice(0, 8), profile.avatar || null,
                                       lastMessageTime.get(id) || 0);
            }));
    };

    const fetchProfile = (pub) => {
        if (profiles.has(pub)) return;
        profiles.set(pub, {});
        userNode(pub).get("profile").once((profile) => {
            if (profile) profiles.set(pub, { username: records.aliasOf(profile), avatar: records.iconCIDOf(profile) });
            publish();
        });
    };

    stops.push(subscribe(userNode(self).get("blocks").map(), async (value, pub) => {
        if (value && (await SEA.decrypt(value, pair)) === true) blocked.add(pub); else blocked.delete(pub);
        publish();
    }));
    stops.push(subscribe(userNode(self).get("follows").map(), (following, pub) => {
        if (following === true) {
            followees.add(pub);
            fetchProfile(pub);
        } else {
            followees.delete(pub);
        }
        publish();
    }));
    stops.push(subscribe(userNode(self).get("chats").map(), (entry, roomID) => {
        const peer = entry && records.peerOf(entry);
        if (!peer) return;                              // group entries and tombstones
        chatTimes.set(roomID, records.lastMessageTimeOf(entry) || 0);
        lastMessageTime.set(peer, Math.max(lastMessageTime.get(peer) || 0, records.lastMessageTimeOf(entry) || 0));
        fetchProfile(peer);
        publish();
    }));
    stops.push(subscribe(gun.get("inbox").get(self).map(), async (entry) => {
        const from = entry && records.inboxFromOf(entry);
        if (!from || from === self || blocked.has(from)) return;
        const pointer = await SEA.verify(records.inboxSigOf(entry), from);
        if (!pointer) return;                           // forged or damaged entry
        const at = records.pointerAtOf(pointer) || 0;
        const roomID = records.pointerRoomOf(pointer);
        if (roomID) {
            if (roomID !== chatRoomID(self, from)) return;
            if ((chatTimes.get(roomID) || 0) >= at) return;
            user.get("chats").get(roomID).put(records.chatListEntry(from, at));
        } else if (records.pointerGroupOf(pointer)) {
            user.get("chats").get("g:" + records.pointerGroupOf(pointer))
                .put(records.groupChatListEntry(records.pointerCreatorOf(pointer), at));
        }
    }));

    publish();
    return () => {
        stopped = true;
        stops.forEach((stop) => stop());
    };
}

// ---------------------------------------------------------------------------
// Direct messages, end-to-end encrypted with the ECDH secret of the two users.
// Each participant writes messages into their own user space (their outbox);
// a conversation is the merge of the two outboxes, so authorship is enforced
// by whose signed space a message was read from.

// Resolves to null on success, otherwise to a message to show.
export async function storeMessage(peerPub, content) {
    const self = currentPub();
    if (await isBlocked(peerPub)) return "You have blocked this user.";
    const peerEPub = await getEPub(peerPub);
    if (!peerEPub) return "Unknown user.";

    const secret = await SEA.secret(peerEPub, currentPair());
    const timeKey = Date.now();
    const message = records.message(currentUsername(), timeKey, content);
    const roomID = chatRoomID(self, peerPub);
    user.get("chats").get(roomID).get("msgs").get(String(timeKey)).put(await SEA.encrypt(message, secret));
    user.get("chats").get(roomID).put(records.chatListEntry(peerPub, timeKey));

    // A signed pointer in the peer's public inbox lets their client list the
    // conversation; their own chat entry is written by their client (init).
    const pointer = await SEA.sign(records.chatPointer(roomID, timeKey), currentPair());
    gun.get("inbox").get(peerPub).get(roomID).put(records.inboxEntry(self, pointer));
    return null;
}

// onMessage(peerPub, {timestamp, sender, content}, timeKey, own) is called once
// per message in the conversation with peerPub, including messages sent later.
// Returns a function that stops the calls and the subscriptions behind them.
export function displayMessage(peerPub, onMessage) {
    const self = currentPub();
    const roomID = chatRoomID(self, peerPub);
    const stops = [];
    let stopped = false;
    (async () => {
        const peerEPub = await getEPub(peerPub);
        if (!peerEPub || stopped) return;
        const secret = await SEA.secret(peerEPub, currentPair());
        const outbox = (pub, own) => {
            const seen = new Set();                     // gun repeats updates
            return subscribe(userNode(pub).get("chats").get(roomID).get("msgs").map(), async (data, timeKey) => {
                if (!data || seen.has(timeKey)) return;
                seen.add(timeKey);
                const message = await SEA.decrypt(data, secret);
                if (message && !stopped) onMessage(peerPub, message, timeKey, own);
            });
        };
        if (stopped) return;
        stops.push(outbox(self, true), outbox(peerPub, false));
    })();
    return () => {
        stopped = true;
        stops.forEach((stop) => stop());
    };
}

// ---------------------------------------------------------------------------
// Group chat (no UI yet). The group's definition - name, layers, member lists
// and encrypted layer keys - lives in the creator's user space, so only the
// creator can change membership; messages live in each member's own space
// (their group outbox), encrypted with the layer key. Membership changes start
// a new layer with a fresh random key, so members can read exactly the layers
// they belonged to.
//
//   ~creator/groups/<groupID>                        {group_name, created, totallayer}
//   ~creator/groups/<groupID>/<layer>/members/<pub>  true
//   ~creator/groups/<groupID>/<layer>/keys/<pub>     layer key, encrypted with SEA.secret(member epub, creator pair)
//   ~member/groupChats/<groupID>/<layer>/<timeKey>   message, encrypted with the layer key
//   ~member/chats/g:<groupID>                        {creator, last_message_time}
//
// Layers count from 1. A group is addressed by (creatorPub, groupID).

function groupNode(creatorPub, groupID) {
    return userNode(creatorPub).get("groups").get(groupID);
}

async function getTotalLayers(creatorPub, groupID) {
    return (await groupNode(creatorPub, groupID).get("totallayer").then()) || 0;
}

async function getMembers(creatorPub, groupID, layer) {
    const members = await groupNode(creatorPub, groupID).get(String(layer)).get("members").then();
    if (!members) return [];
    return Object.keys(members).filter((member) => member !== "_" && members[member] === true);
}

// Starts layer totallayer + 1 with the given member pubs and a new layer key,
// and invites them through their inboxes. Must run as the group creator.
// Members without a public key are skipped.
async function startLayer(groupID, memberPubs) {
    const self = currentPub();
    const creatorPair = currentPair();
    const layer = (await getTotalLayers(self, groupID)) + 1;
    const layerKey = SEA.random(32).toString("base64");
    const layerNode = user.get("groups").get(groupID).get(String(layer));
    for (const member of new Set(memberPubs)) {
        const memberEPub = await getEPub(member);
        if (!memberEPub) continue;
        const secret = await SEA.secret(memberEPub, creatorPair);
        layerNode.get("keys").get(member).put(await SEA.encrypt(layerKey, secret));
        layerNode.get("members").get(member).put(true);
        if (member !== self) {
            const pointer = await SEA.sign(records.groupPointer(groupID, self, Date.now()), creatorPair);
            gun.get("inbox").get(member).get(groupID).put(records.inboxEntry(self, pointer));
        }
    }
    user.get("groups").get(groupID).get("totallayer").put(layer);
    return layer;
}

// The current user's key for a layer, or null if they were not a member of it.
async function getGroupKey(creatorPub, groupID, layer) {
    const encryptedKey = await groupNode(creatorPub, groupID).get(String(layer)).get("keys").get(currentPub()).then();
    if (!encryptedKey) return null;
    const creatorEPub = await getEPub(creatorPub);
    if (!creatorEPub) return null;
    const secret = await SEA.secret(creatorEPub, currentPair());
    return (await SEA.decrypt(encryptedKey, secret)) || null;
}

// Creates a group with the current user as creator and resolves to its ID.
export async function createGroup(groupName, memberPubs) {
    const self = currentPub();
    const groupID = CryptoJS.SHA256(Date.now() + self + Math.random()).toString(CryptoJS.enc.Hex);
    user.get("groups").get(groupID).put(records.group(groupName, new Date()));
    await startLayer(groupID, [self, ...memberPubs]);
    await storeGroupMessage(self, groupID, "Welcome to the group!");
    return groupID;
}

// Creator only. Resolves to null on success, otherwise to a message to show.
export async function addMemberToGroup(creatorPub, groupID, newMemberPub) {
    if (creatorPub !== currentPub()) return "Only the group creator can add members.";
    const members = await getMembers(creatorPub, groupID, await getTotalLayers(creatorPub, groupID));
    await startLayer(groupID, [...members, newMemberPub]);
    return null;
}

// Creator only. Resolves to null on success, otherwise to a message to show.
export async function removeMemberFromGroup(creatorPub, groupID, memberPub) {
    if (creatorPub !== currentPub()) return "Only the group creator can remove members.";
    if (memberPub === currentPub()) return "The group creator cannot be removed.";
    const members = await getMembers(creatorPub, groupID, await getTotalLayers(creatorPub, groupID));
    await startLayer(groupID, members.filter((m) => m !== memberPub));
    return null;
}

// Resolves to null on success, otherwise to a message to show.
export async function storeGroupMessage(creatorPub, groupID, content) {
    const layer = await getTotalLayers(creatorPub, groupID);
    const layerKey = await getGroupKey(creatorPub, groupID, layer);
    if (!layerKey) return "You are not a member of this group.";
    const timeKey = Date.now();
    const message = records.message(currentUsername(), timeKey, content);
    user.get("groupChats").get(groupID).get(String(layer)).get(String(timeKey)).put(await SEA.encrypt(message, layerKey));
    user.get("chats").get("g:" + groupID).put(records.groupChatListEntry(creatorPub, timeKey));
    return null;
}

// onMessage(groupID, {timestamp, sender, content}, timeKey) is called once per
// message in every layer the current user belonged to, across all members'
// outboxes.
export async function displayGroupMessages(creatorPub, groupID, onMessage) {
    const totalLayers = await getTotalLayers(creatorPub, groupID);
    for (let layer = 1; layer <= totalLayers; layer++) {
        const layerKey = await getGroupKey(creatorPub, groupID, layer);
        if (!layerKey) continue;
        for (const member of await getMembers(creatorPub, groupID, layer)) {
            userNode(member).get("groupChats").get(groupID).get(String(layer)).map().once(async (data, timeKey) => {
                const message = await SEA.decrypt(data, layerKey);
                if (message) onMessage(groupID, message, timeKey);
            });
        }
    }
}

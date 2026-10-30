# WeJure: A Decentralized Social Network

WeJure is a peer-to-peer social network written in ClojureScript. Data lives in
[GunDB](https://gun.eco/), a decentralized graph database that syncs between
browsers through relay servers; images live on [IPFS](https://ipfs.tech/).
Accounts, signatures and end-to-end encryption use SEA, GunDB's cryptography layer.

## Features
- Accounts with a profile picture and a bio
- Posts with text and/or an image, kept in the composer until the relay has stored them; a feed of the people you follow; deleting your own posts, which disappear from other users' screens right away
- Following and unfollowing users
- Finding users by their exact name, and searching the posts of the people you follow by text
- End-to-end encrypted direct messages, and blocking users
- Group chat with layered encryption (backend only, see [Status](#status))

## Requirements
WeJure is built with [shadow-cljs](https://github.com/thheller/shadow-cljs), which needs:
- [Node.js](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/) 1.x
- [Java SDK (Adoptium)](https://adoptium.net/) 21 or newer

Running it also needs an [IPFS](https://ipfs.tech/) node ([Kubo](https://github.com/ipfs/kubo)).

## First-time setup
The setup scripts install the requirements, initialize IPFS and run `yarn install`.

**macOS**
```bash
./WejureStartup.sh
```

**Linux**
```bash
./setup_wejure_linux.sh
```

**Windows**
```powershell
Set-ExecutionPolicy RemoteSigned -Scope Process  # Allow script execution
.\WeJureWinStart.ps1
```

## Running
**macOS and Linux**
```bash
./WejureRun.sh
```

**Windows**
```powershell
.\WeJureWinRun.ps1
```

Then visit http://localhost:8020.

The scripts start three processes, which can also be started by hand:
1. the IPFS daemon: `ipfs daemon`
2. the GunDB relay: `cd src/wejure/js && node relay`
3. the shadow-cljs dev server: `yarn dev`

For an optimized build, run `yarn release`; it writes `public/js/main.js`. Serve `public/` with unknown paths falling back to `index.html`, since the app routes with real URLs such as `/home`.

## Configuration
- **IPFS**: the app uploads through the API on port 5001 and loads images from the gateway on port 8080 (both set in `src/wejure/common.cljs`). If the API listens elsewhere, run `ipfs config Addresses.API /ip4/127.0.0.1/tcp/5001`. The API must allow requests from the page, which the setup scripts configure:
  ```bash
  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:8020", "http://localhost:5001", "https://webui.ipfs.io"]'
  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'
  ```
- **GunDB relay**: `src/wejure/js/relay.js` listens on 127.0.0.1:8001 (override with the `HOST` and `PORT` environment variables). Users only see each other's data when their browsers reach a common relay (browsers that share one also connect to each other directly over WebRTC, found through the relay), so for more than one machine, run `relay.js` on a reachable host (for example `HOST=0.0.0.0 node relay`) and add its URL to `peers` in `src/wejure/js/db.js`. The relay loads SEA, so it checks signatures itself, and it refuses writes to the node names of the old shared data model (`user`, `post/*`, `chat`, `groups`, `groupKeys`, `groupChat`).

## Security and encryption
- **Accounts and identity**: GunDB SEA creates a key pair per user. A user's public key (`pub`) is their identity; the username is an alias registered in SEA's account system (`~@<alias>`) and repeated in the signed profile. Passwords are SHA-256-hashed before they reach SEA.
- **Data ownership**: everything a user owns (profile, posts, follows, blocks, chats, groups) lives in their SEA user space `~<pub>`. Every write there is signed, and writes not signed by the owner are rejected by the writer's own client, by the relay and by every reader, so nobody can change or delete another user's data. `test/e2e/security.spec.js` checks this.
- **Usernames**: aliases are first come, first served, but an open network cannot rule out two accounts racing for the same name. If more than one account claims an alias, `/user/<alias>` lists the claimants instead of picking one, so a later registration cannot take over an existing user's page. `/user/~<pub>` always names exactly one account.
- **Direct messages**: the sender and the recipient derive the same shared secret with ECDH (`SEA.secret(recipientEpub, senderPair)`), and each message is encrypted with AES-GCM (`SEA.encrypt(message, secret)`). Only the two participants can read it. Each participant writes their messages into their own user space, so who sent a message is determined by where it is stored, not by a field in it.
- **Reaching someone new**: nobody can write into another user's space, so a first message (or a group invitation) also leaves a pointer in the public node `inbox/<pub>`. The pointer is signed by the sender; the recipient's client verifies it and then records the conversation in its own space. Unsigned or forged pointers are ignored. The inbox is the one place others can write to, so it can be spammed, but a vandalized entry loses at most a notification, never a message.
- **Blocking**: the blacklist is encrypted with the owner's own key, so nobody else can see who blocks whom. Blocking works on the blocker's side: their client ignores the blocked user, who is not told.
- **Group chats**: the group's definition lives in its creator's user space, so only the creator can change membership. Every membership change starts a new *layer* with a fresh random key, which the creator encrypts separately for each member of that layer. Members can decrypt exactly the layers they belonged to: new members cannot read messages from before they joined, and removed members cannot read messages sent after they left.
- **Public data**: profiles, posts, follows and which conversations a user has (not their contents) are signed but stored unencrypted.

## Data model
GunDB paths (`a/b` means `gun.get("a").get("b")`; `~<pub>` is a user's SEA user space, written through `gun.user()`):

| Path | Content |
|------|---------|
| `~<pub>/profile` | `{alias, icon_cid, bio}`; `icon_cid` is an IPFS CID |
| `~<pub>/follows/<pub>` | `true`, or `null` once unfollowed (users follow themselves, so their own posts appear in their feed) |
| `~<pub>/blocks/<pub>` | `SEA.encrypt(true, ownPair)`, or `null` once unblocked |
| `~<pub>/posts/<post key>` | `{text, image, unixtime}`; the key is `<unixtime>-<random>`, so posts made in the same millisecond still get distinct keys |
| `~<pub>/chats/<roomID>` | `{peer, last_message_time}`: the owner's record of a conversation; `roomID` is the SHA-256 of the two pubs, sorted and joined with `-` |
| `~<pub>/chats/<roomID>/msgs/<time ms>` | the owner's sent messages, encrypted `{timestamp, sender, content}` |
| `~<pub>/chats/g:<groupID>` | `{creator, last_message_time}` for each group |
| `~<pub>/groups/<groupID>` | `{group_name, created, totallayer}`, for groups this user created |
| `~<pub>/groups/<groupID>/<layer>/members/<pub>` | `true` |
| `~<pub>/groups/<groupID>/<layer>/keys/<pub>` | the layer key, encrypted for that member |
| `~<pub>/groupChats/<groupID>/<layer>/<time ms>` | the owner's group messages, encrypted with the layer key |
| `inbox/<pub>/<roomID or groupID>` | `{from, sig}`: a pointer to a conversation or group, signed by `from` |

The record fields above are built and read only in `src/wejure/js/records.js`. Release builds compile `src/wejure/js/` with Closure's advanced optimizations, which rename unquoted property names; `records.js` writes every field with a quoted key, so they keep these names. Add new fields there, not as object literals or dot access in the other modules.

The browser keeps the session in `sessionStorage`: `username`, `pub`, `icon_cid` and the SEA key pair `pair`.

### Upgrading a relay from the old data model
Data written before the ownership redesign (October 2026) used shared nodes keyed by username, which anyone could overwrite. It is not migrated: stop the relay, delete its `radata` directory (`./remove_local_gun.sh` for a relay run from `src/wejure/js/`), update, and restart. Users re-register; the new relay refuses writes to the old node names.

## Code layout
- `src/wejure/core.cljs`: routes, and redirects between logged-in and logged-out pages
- `src/wejure/common.cljs`: session and IPFS helpers
- `src/wejure/components/`: one namespace per page, plus the navigation bar and `postCard.cljs`, the post list shared by the feed, profile and post-search pages
- `src/wejure/components/textField.cljs`: the MUI text field every page uses; it keeps the caret in place while typing
- `src/wejure/js/`: the GunDB layer, called from ClojureScript with callbacks or promises: `db.js` (the shared GunDB instance, plus helpers for writes the relay confirms and for subscriptions a page stops when it closes), `records.js` (the stored record formats), `account.js`, `profile.js`, `post.js`, `chat.js`; and `relay.js`, the relay server
- `test/e2e/`: the end-to-end tests: `wejure.spec.js` (every page, two users), `security.spec.js` (data ownership) and `reliability.spec.js` (posts the relay does not confirm, deletions reaching other users, chat subscriptions ending with the conversation)

## Testing
`yarn test:e2e` builds the release version and runs a browser test through every page with two users, plus tests that anonymous clients and other logged-in users cannot change anyone else's data, and tests of posting while the relay is unreachable, of deletions reaching other users and of chat subscriptions ending with the conversation. Install its browser once with `npx playwright install chromium`. The test starts its own relay (with empty data), an IPFS stand-in and a web server, on the ports the app uses (8001, 5001 and 8080, 8020), so stop any IPFS daemon, relay or dev server first.

## Deleting all data
1. Clear the site data (local storage) in every browser that opened WeJure.
2. Stop the relay and run `./remove_local_gun.sh`, which deletes `src/wejure/js/radata`.

## Status
The project is still under development.
- Group chat is implemented in `src/wejure/js/chat.js` (`createGroup`, `addMemberToGroup`, `removeMemberFromGroup`, `storeGroupMessage`, `displayGroupMessages`), but the chat page has no UI for groups yet.
- Unblocking (`removeFromBlacklist` in `chat.js`) has no UI yet.

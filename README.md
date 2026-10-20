# WeJure: A Decentralized Social Network

WeJure is a peer-to-peer social network written in ClojureScript. Data lives in
[GunDB](https://gun.eco/), a decentralized graph database that syncs between
browsers through relay servers; images live on [IPFS](https://ipfs.tech/).
Accounts, signatures and end-to-end encryption use SEA, GunDB's cryptography layer.

## Features
- Accounts with a profile picture and a bio
- Posts with text and/or an image; a feed of the people you follow; deleting your own posts
- Following and unfollowing users
- Searching users by name and posts by text
- End-to-end encrypted direct messages, and blocking users
- Group chat with layered encryption (backend only, see [Status](#status))

## Requirements
WeJure is built with [shadow-cljs](https://github.com/thheller/shadow-cljs), which needs:
- [Node.js](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/) 1.x
- [Java SDK (Adoptium)](https://adoptium.net/)

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
- **GunDB relay**: `src/wejure/js/relay.js` listens on 127.0.0.1:8001 (override with the `HOST` and `PORT` environment variables). Users only see each other's data when their browsers reach a common relay, so for more than one machine, run `relay.js` on a reachable host (for example `HOST=0.0.0.0 node relay`) and add its URL to `peers` in `src/wejure/js/db.js`.

## Security and encryption
- **Accounts**: GunDB SEA creates a key pair per user. Passwords are SHA-256-hashed before they reach SEA.
- **Direct messages**: the sender and the recipient derive the same shared secret with ECDH (`SEA.secret(recipientEpub, senderPair)`), and each message is encrypted with AES-GCM (`SEA.encrypt(message, secret)`). Only the two participants can read it.
- **Group chats**: every membership change starts a new *layer* with a fresh random key, which the group creator encrypts separately for each member of that layer. Members can decrypt exactly the layers they belonged to: new members cannot read messages from before they joined, and removed members cannot read messages sent after they left.
- **Public data**: profiles, posts, follows, blocks and the list of who has chatted with whom are stored unencrypted.

## Data model
GunDB paths (`a/b` means `gun.get("a").get("b")`, except `post/<username>`, which is a single top-level node):

| Path | Content |
|------|---------|
| `user/<username>` | `{icon_cid, bio}` |
| `user/<username>/is_following/<username>` | `true` or `false` (users follow themselves, so their own posts appear in their feed) |
| `user/<username>/blacklist/<username>` | `true` if blocked, `null` once unblocked |
| `user/<username>/blockedBy/<username>` | mirror of the blacklist |
| `user/<username>/chat_list/chat/<roomID>` | `{peer, last_message_time}` for each conversation |
| `user/<username>/chat_list/group/<groupID>` | `{last_message_time}` for each group |
| `post/<username>/<UTC timestamp>` | `{username, timestamp, text, image, unixtime}`; `image` is an IPFS CID |
| `chat/<roomID>/<time ms>` | encrypted `{timestamp, sender, content}`; `roomID` is the SHA-256 of the two usernames, sorted and joined with `-` |
| `groups/<groupID>` | `{group_name, creator, created, totallayer}` |
| `groups/<groupID>/<layer>/members/<username>` | `true` |
| `groupKeys/<groupID>/<layer>/<username>` | the layer key, encrypted for that member |
| `groupChat/<groupID>/<layer>/<time ms>` | encrypted `{timestamp, sender, content}` |

The browser keeps the session in `sessionStorage`: `username`, `icon_cid` and the SEA key pair `pair`.

## Code layout
- `src/wejure/core.cljs`: routes, and redirects between logged-in and logged-out pages
- `src/wejure/common.cljs`: session and IPFS helpers
- `src/wejure/components/`: one namespace per page, plus the navigation bar and `postCard.cljs`, the post list shared by the feed, profile and post-search pages
- `src/wejure/js/`: the GunDB layer, called from ClojureScript with callbacks or promises: `db.js` (the shared GunDB instance), `account.js`, `profile.js`, `post.js`, `chat.js`; and `relay.js`, the relay server

## Deleting all data
1. Clear the site data (local storage) in every browser that opened WeJure.
2. Stop the relay and run `./remove_local_gun.sh`, which deletes `src/wejure/js/radata`.

## Status
The project is still under development.
- Group chat is implemented in `src/wejure/js/chat.js` (`createGroup`, `addMemberToGroup`, `removeMemberFromGroup`, `storeGroupMessage`, `displayGroupMessages`), but the chat page has no UI for groups yet.
- Unblocking (`removeFromBlacklist` in `chat.js`) has no UI yet.

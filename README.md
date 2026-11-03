# WeJure: A Decentralized Social Network

WeJure is a decentralized social network written in ClojureScript: a public
feed like Twitter, and communities with channels and topics like Zulip. Data
travels as signed [Nostr](https://nostr.com/) events through relays, and
pictures live on [Blossom](https://github.com/hzrd149/blossom) media servers,
named by their hash. Nobody owns the network: any relay or media server can
go down or lie, and the app keeps working with the others.

## Features
- Accounts with a username and password, a bio and an optional profile picture; logging in works from any device
- Posts with text and/or a picture; a feed of the people you follow, page by page and updated live; posts show as "Sending…" until a relay has stored them; deleting your own posts, which disappear from other users' screens right away
- Following and unfollowing; finding users by their exact name; searching the recent posts of the people you follow
- End-to-end encrypted direct messages, and blocking users
- Communities: private (encrypted, invite only) or open (public, anyone can join), with channels (community-wide or private to some members), topics, the roles owner, admin, moderator and member, and owner changes by majority vote

## Quick start
Requirements: [Node.js](https://nodejs.org/) 22.13 or newer, and, to build the
ClojureScript, [Java](https://adoptium.net/) 21 or newer.

```bash
npm install
npm run release   # builds public/js/main.js
npm start         # http://localhost:8020
```

`npm start` runs `server/index.js`: one process that serves the app, a Nostr
relay and a Blossom media server on one port, with its data in `data/`.

For development, `npm run dev` runs the shadow-cljs watch build (hot reload)
together with the server, also at http://localhost:8020.

## Configuration
- **Relays and media servers** are set in `public/config.js`, without
  rebuilding. Empty lists mean "the server the page came from". To spread data
  across independent servers, list several, for example
  `relays: ["wss://relay-one.example", "wss://relay-two.example"]`. Any
  standard Nostr relay and Blossom server works. Each user's relay and media
  server lists are also saved in their account (NIP-65, BUD-03), so others
  can find their data. With more than one relay, each client copies its user's
  own events, and the messages addressed to them, to any relay that misses
  them, once per session, so a relay that was down catches up.
- **The server**:
  ```bash
  node server/index.js [--port 8020] [--host 127.0.0.1] [--data data] [--public public]
  ```
  `PORT` and `HOST` environment variables work too. To reach it from other
  machines, use `--host 0.0.0.0` behind a TLS proxy, so the relay is
  reachable as `wss://`. Its relay keeps deletion requests and refuses deleted
  events if anyone sends them again; it closes connections that send a
  message over 256 KB, and allows 100 subscriptions per connection (past that
  it closes the oldest). Its media server accepts uploads signed by any
  account (a public deployment would want limits there). It serves pictures,
  audio and video as such, and anything else as a sandboxed download, since it
  shares its origin with the app.

## Security and encryption
- **Identity**: an account is a secp256k1 key pair; the public key is the
  identity. To log in with a username and password from any device, the
  secret key is stored encrypted with the password (NIP-49, scrypt) on the
  relays. So a weak password can be guessed offline: use a long one. Anyone
  can publish such a claim for any username, so login tries only claims at
  WeJure's scrypt cost (2^16), and at most ten.
- **Data ownership**: every event is signed by its author and checked by
  every reader, so nobody can change or fake anyone else's posts, profile or
  follows. A relay can only withhold events, and the other relays have them:
  each relay is read on its own, so one that sends forged copies under real
  ids cannot hide the real events either. `test/node/redundancy.test.js`
  includes a relay that rewrites what it serves.
- **Usernames** are not unique on an open network. Registration refuses a
  name that is already taken, but two accounts can still race for one. Then
  `/user/<name>` lists the claimants instead of picking one, and
  `/user/~<public key>` always names exactly one account.
- **Pictures** are named by their SHA-256 and checked against it after
  download, so a media server cannot swap them.
- **Direct messages** use NIP-17. A message is signed by its sender, encrypted
  for the recipient, and wrapped in an event from a throwaway key with a
  blurred time. Relays see that someone received something, not from whom
  and not what.
- **Blocking** uses a NIP-51 mute list whose entries WeJure encrypts to its
  owner, so nobody can see who blocks whom; public and NIP-04 entries that
  other Nostr apps write count too. It works on the blocker's side.
- **Communities** are designed in [docs/COMMUNITIES.md](docs/COMMUNITIES.md).
  In private communities, relays see neither the community, the senders nor
  the topics (they can tell which messages under one key share a sender, not
  who that is, and which envelopes hold checkpoints). Members can read exactly
  the periods they belonged to. Removed members cannot slip in backdated
  messages or actions. Changing the owners needs a majority of them, so with
  three or more owners, one lost or rogue owner can neither take over nor
  freeze the community; a checkpoint likewise needs a majority of the owners,
  and devices keep the checkpoints they accepted.
- **The device cache**: each gift wrap and envelope is decrypted and checked
  once. The results, and the copies of relay data that let a page load fetch
  only what is new (see Fetching), are kept in IndexedDB, one database per
  account, encrypted (AES-GCM) with a key derived from the account key, and
  keyed by HMACs (of event ids, and of which filters and values the copies
  belong to), so it does not show what the user reads or follows. That key is
  only in the logged-in tab, so the cache is unreadable without the password.
  Logging out deletes the database, and other tabs of the account then close
  it and carry on in memory. Every event is checked against its id (the hash
  of its content), so a relay cannot slip other content in under an id the
  cache already knows.
- **Public data**: profiles, posts, follows, relay lists, and everything in
  open communities.
- **Data from strangers** (profiles, messages, relay lists, community
  operations) is checked for shape before use, so malformed data is dropped,
  not fatal.
- **Limits**: a stolen account key reveals what that account could read (no
  forward secrecy). Deletions are requests: relays that ignore NIP-09 may
  keep a deleted post, though WeJure hides it once any relay has the
  request. A flood of gift wraps or community events cannot hide older ones
  (reads page through everything, up to 100 000 events per request; a single
  second that holds more than a page is cut short), but it costs download
  time the first time on a device.

## Data model
Everything is a Nostr event (NIP-01). The kinds WeJure uses:

| Kind | What | Notes |
|------|------|-------|
| 0 | profile | `{name, about, picture}`; `picture` is a Blossom hash |
| 1 | post | the text; a picture as an `imeta` tag `x <sha256>` |
| 3 | follows | `p` tags; users follow themselves, so their own posts appear in their feed |
| 5 | deletion | NIP-09 |
| 1059 | gift wrap | NIP-59: direct messages (kind 14 inside) and community key bundles (kind 1463 inside) |
| 10000 | blocklist | NIP-51 mute list, its entries encrypted to the owner |
| 10002 | relay list | NIP-65 |
| 10063 | media server list | BUD-03 |
| 24242 | media upload authorization | BUD-02, sent to the media server, not stored |
| 30078 | app data | `d=wejure/account/<username>`: the password-encrypted key; `d=wejure/communities`: the user's community list, encrypted to them |
| 1460–1464 | communities | operations, messages, encrypted envelopes, key bundles, checkpoint snapshot parts (see docs/COMMUNITIES.md; the numbers are WeJure's own for now) |

The browser keeps the login in `sessionStorage` (`wejure-session`), so a reload
stays logged in and closing the tab logs out. Decrypted events are cached in
IndexedDB (`wejure-<public key>`, encrypted; see Security).

## Fetching
- **Mirrors** (`sync.js`): direct messages, community operations and channel
  messages are read through local copies of relay data. The first read
  fetches what a relay holds, page by page, and opens one live subscription
  per mirror and relay, which stays open for the page session. Later reads
  ask each relay only to confirm it has sent everything so far (one empty
  round trip); new events arrive through the subscription. Pages that follow
  changes (the chat, communities) listen to the mirrors, so each event
  arrives once per relay; only the feed subscribes on its own (`live.js`).
- **Catching up**: if a subscription drops, the next read catches up from the
  newest event that relay had sent, less a minute for slow clocks (two days
  for gift wraps, which are backdated on purpose); while a page listens, the
  subscription comes back after two seconds. The copies are saved in the
  device cache, so after a page load a read catches up the same way instead
  of fetching everything, and a community whose relays are all down still
  opens.
- **Channels** are paged: the first read fetches the newest 100 messages (in
  open communities, the newest 100 of the whole community), and older ones
  come when the reader scrolls up or presses "Load older messages".
- **Communities**: opening one fetches its operations, not its channels'
  messages, and only those since its latest checkpoint: owners' clients write
  and approve checkpoints on their own (see docs/COMMUNITIES.md), so a new
  device starts from a snapshot. The state is computed again only when new
  operations arrive.

`npm run bench` shows the effect: with 600 messages and 200 direct messages,
a member's page update when a message arrives went from about 4500 events and
160 ms to 1 event and 10 ms.

## Code layout
- `src/wejure/core.cljs`: routes, and redirects between logged-in and logged-out pages
- `src/wejure/common.cljs`: session helpers, and avatars and pictures loaded through the data layer
- `src/wejure/components/`: one namespace per page, the navigation bar, `postCard.cljs` (the post list shared by the feed, profile and search pages), `textField.cljs` (the MUI text field every page uses; it keeps the caret in place while typing), and the community pages `communitiesPage.cljs`, `communityPage.cljs` and `communitySettings.cljs`
- `packages/wejure-nostr/`: the data layer, a local npm package (`file:` dependency). It must stay outside the ClojureScript source paths, because release builds would rename its property names otherwise. Each module:
  - `app.js`: what the screens call; it returns plain objects;
  - `core.js`: publishing to several relays, merged reads, repair;
  - `sync.js`: mirrors, local copies of relay data kept current by live subscriptions (see Fetching);
  - `account.js`, `social.js`, `media.js`, `session.js`, `live.js`;
  - `cache.js`: decrypted events, in memory and in IndexedDB, and the saved mirrors;
  - `community-state.js`: the community rules, pure, checkpoints included;
  - `communities.js`: the community input and output.
- `server/`: `index.js` (app, relay and media server on one port), `store.js` (the relay's event store on `node:sqlite`), `blossom.js` (the media server)
- `public/config.js`: relays and media servers for this site
- `scripts/dev.js`: `npm run dev`
- `docs/COMMUNITIES.md`: the community design
- `test/node/`: the data layer against several real server instances that the tests crash (`harness.js`), plus a lying relay and a lying media server
- `test/e2e/`: browser tests of the release build
- `test/bench/`: `npm run bench`

## Testing
- `npm test`: the Node tests (about 1 min). They cover accounts, the feed,
  messages, media, the server's own protections, redundancy across crashing
  and lying relays, live updates, the device cache, fetching only what is new
  (with saved copies, on fake-indexeddb), paging through long channels, the
  community rules and attacks on them, and checkpoints.
- `npm run test:e2e`: builds the release version and runs Playwright through
  every page with several users, communities included (about 1 min). It
  fails on any console error or warning, page error or alert. Install its
  browser once with
  `npx playwright install chromium`. It starts its own server with empty
  data on port 8020, so stop any WeJure server there first.
- `npm run bench`: times loading, reading and sending in a community, and
  counts the events relays send for each (arguments: messages, default 300;
  members, 30; direct messages, 200; further members for the checkpoint part,
  300). It compares a new device opening a community of a few hundred
  operations without and with a checkpoint (334 events and 8 events), and
  times computing the state of 1000 and 5000 operations.

## Deleting all data
Stop the server and delete its `data/` directory. Logins live only in the
browser tab's session. Each browser's cache goes on logout, or with the
site's stored data.

## Status
The project is under development. Not built yet:
- unblocking;
- a size limit for the saved copies of relay data (see Fetching): they grow
  without limit, until logout;
- paging for direct messages: the first read on a device fetches them all;
- relays syncing with each other (NIP-77); clients repair their own data
  instead (see Configuration);
- deleting media;
- account recovery (a lost password is a lost account).

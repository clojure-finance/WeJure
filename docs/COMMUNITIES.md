# Communities: design

WeJure's group system on Nostr: communities with channels and topics, roles,
open and private communities. The decisions (November 2026):

- **Structure:** community > channels > topics, like Zulip. A channel is
  either community-wide or private to some members.
- **History:** a per-channel setting. `shared` (the default): new channel
  members can read what came before. `from-join`: they read only what comes after.
- **Roles:** owner, admin, moderator, member. Changing the set of owners needs
  a majority of the owners.
- **Modes:** `private` communities are encrypted and invite-only. `open`
  communities are public and anyone can join, though they can still have
  encrypted private channels.

The rules live in `packages/wejure-nostr/community-state.js` (pure: ops in,
state out), the input and output in `communities.js`. The tests are
`test/node/community-state.test.js` (hand-built histories, including
backdated and conflicting ops) and `communities.test.js` (against crashing
relays, with forged messages and ops).

Requirements carried over: fully distributed (no relay is in charge of
anything), still working when nodes go down, and nothing that WeJure's groups
already guarantee gets weaker.

## Why not MLS or NIP-29

- **NIP-29** groups live on one relay that enforces membership. If that relay
  goes down, the group goes with it.
- **MLS** (RFC 9420; on Nostr: Marmot) gives forward secrecy, but its members
  are devices, so a new phone cannot read anything sent before it joined. It
  also needs all members to apply changes in one agreed order, which needs a
  coordinating server, or forks when relays disagree. Communities need
  history and several devices per person, and must not depend on any one
  server.

So this design builds on WeJure's layered keys, generalized. A
password-protected key backup in the style of Matrix plays the part that MLS
skips. The cost: someone who steals an account key can read that account's
history (see "Limits").

## Building blocks

**Operations.** Every change to a community is an *operation* (op): a Nostr
event signed by the person making the change (kind 1460, JSON content
`{type, ...}`), tagged with the community and with `parent` tags naming the
latest valid ops its author had seen (at most 20; invalid ops, which anyone
can publish in an open community, are not built on). The ops form a DAG (like git commits), and
everyone computes the community's state from it with the same deterministic
rules. Nobody, not even a relay, has to put the ops in order.

**The community id** is `<founder pubkey>:<nonce>`. The genesis op is the
founder's `create` op carrying the nonce. Every other op must descend from it.

**Scopes and keys.** Each encrypted area has its own key chain: the scope
`state` (the op log itself) and one scope per encrypted channel (`ch:<id>`).
In private communities everything is encrypted. In open communities the op log
and community-wide channels are plaintext, and private channels are encrypted.
A *key op* (`create`, `channel-create` or `rekey`) announces a new key by its
id, `keyId = sha256("wejure-key-id:" + key)`. The key itself goes to each
member of the scope in a gift wrap (NIP-59), so every device of that member
can fetch it. A key counts only if its id appears in a valid key op, so keys
authenticate themselves through the signed op log, and it doesn't matter who
delivered them.

**Envelopes.** Encrypted ops and messages are signed by their author,
encrypted with the scope's key (NIP-44), and published as kind 1462 from a
throwaway key under the tag `h = sha256("wejure-envelope:" + key)`, a
different hash than the key's id, so a removed member who still reads the old
op log (and sees new key ids) cannot find the new envelopes. Relays see random
keys and random tags. A channel message's envelope also carries
`s = sha256("wejure-sender:" + key + ":" + sender's public key)`, so key holders
can ask for one member's latest messages without loading the channel's history
(see "Departed members"); relays can tell which envelopes under a key come
from the same sender, though not who it is (they mostly see that anyway: which
connection published each). Open plaintext ops and messages are published as
they are, tagged `h = <community id>`.

**Messages** (kind 1461): `{channel, topic, text}`, plus three kinds of tags.
`prev` tags name the sender's own latest messages in that channel, so each
person's messages per channel form a hash chain. `state` tags name the op
log's valid heads the sender saw, and the latest checkpoint. `ms` gives milliseconds, so messages sent within
the same second still sort correctly.

## Operations

| op | who | effect |
|---|---|---|
| `create {nonce, name, mode, join, relays, stateKeyId}` | founder | genesis; founder becomes owner |
| `settings {name?, description?, join?, relays?}` | admin+ | |
| `add {member, role}` | admin+ | role member or moderator; admin only by an owner |
| `join` | anyone | open communities with `join: open`, unless banned |
| `set-role {member, role}` | admin+ | admins: members and moderators; owners: up to admin |
| `remove {member, ban?, heads}` | moderator+ | only people ranked below the actor; never an owner |
| `leave {heads}` | self | not the last owner |
| `propose {action}` / `approve {proposal}` | owner | owner changes; applied once a majority of owners approved |
| `channel-create {channel, name, visibility, history, members?, keyId?}` | admin+ | |
| `channel-update`, `channel-archive` | admin+ | |
| `channel-add {channel, member}`, `channel-remove {channel, member, heads}` | admin+ | private channels |
| `channel-leave {channel, heads}` | self | private channels |
| `rekey {scope, keyId}` | any member of the scope | new key for the scope |
| `seal {member, channel, heads}` | channel members, admin+ | records a departed member's last messages |
| `hide {message}` | moderator+ | moderation |
| `retract {message}` | the message's author | deletes one's own message |
| `checkpoint {...}` / `approve-checkpoint {checkpoint}` | owners | see "Checkpoints"; no effect on the state |

## Computing the state

1. Drop ops with bad signatures or a wrong community tag. Ops whose parents
   are not all known wait for them (after a checkpoint, see "Checkpoints").
2. Order the DAG topologically. Among ops that are ready at the same time,
   take the smallest `(created_at, id)`. Every member gets the same order.
3. Replay in that order, checking each op against the state so far.
4. **Concurrent revocation rule.** An op by X is checked against X's role
   *lowered by any valid revocation of X that the op is concurrent with*
   (neither descends from the other). A revocation is a removal, ban,
   demotion or leave. So an admin who is demoted cannot get anything through
   by writing it "before" the demotion: a backdated op is concurrent with the
   demotion, so it fails. Validity can depend on revocations found later in
   the order, so replay repeats until the set of revocations stops changing.
   Revocations only point down the hierarchy, so that takes two or three
   passes in practice. After 10 passes it falls back to a growing set, which
   always terminates.
5. **Owners.** Adding, demoting or removing an owner happens through
   `propose`/`approve`. The action applies at the op that brings approvals
   from current owners above half of the owners. A community always keeps at
   least one owner. With three or more owners, one lost or rogue owner can
   neither take the owner role over nor freeze it (with two, every owner
   change needs both). Any owner can still remove non-owners on their own.

## Keys

- **Who gets a key:** the scope's members at the key op. State scope: every
  community member. Community-wide channel: every community member. Private
  channel: its members.
- **When to rekey:** a scope *needs a rekey* when its latest key op is not
  descended from every membership-reducing op of that scope (removal, ban,
  leave, channel-remove), and, for `from-join` channels, from every addition.
  That also catches the concurrent case: someone rekeys while unaware of a
  removal and delivers the key to the removed person.
- **Healing:** while a scope needs a rekey, nobody sends in it; the client
  first rekeys it (any member may). The person removing someone rekeys right
  away, so in practice this happens only after leaves and in races.
- **New members:** they get every state key, so they can read the op log and
  the checkpoints back to the genesis. For `shared` channels they get all past keys whoever adds
  them holds; for `from-join` channels the addition forces a rekey, so they
  hold only keys from after they joined.
- **Labels are not trusted:** a key bundle says which scope each key is for,
  but a client takes the scope from the key op that names the key.

## Departed members (no backdating)

A removed member still holds old keys and could write messages into an old
epoch, dated as if from before. Defense: a removal (or `leave`, or
`channel-remove`) records, for each channel the remover can read, the heads of
the departed member's message chain. Afterwards, only messages reachable from
those heads through `prev` count. A forged "old" message is not in the chain.
Members of channels the remover cannot read add the heads with `seal`, and
heads from all ops are combined. Until a channel is sealed, the departed
member's messages there still count. Clients load only a channel's recent
history, so the heads are not looked up there: the departing member's newest
messages are asked for directly, by their `s` tags (by author in plaintext
channels).

## Messages: what counts

A message counts if:

- it decrypts with a valid key of its channel (or is plaintext in a plaintext
  channel);
- it is signed, and names the right community and channel;
- one of its `state` tags names an op at which the sender had already been
  brought into the channel. Nobody can name their own join before it exists,
  so messages written before joining never count (otherwise someone could post
  a pile of spam and then join to make it appear);
- its sender is a member of the channel, or was one and the message is in
  their sealed chain. A member who departed and was brought back gets their
  sealed chain plus what they wrote after the latest return, not what they
  wrote while away;
- it has not been hidden by a moderator or retracted by its author.

Topics are free text inside the message, as in Zulip. A channel's topic list
is computed from its messages.

## Joining and finding communities

- **Private:** an admin publishes `add`, then sends a key bundle (gift wrap) to
  the new member: the community id, its relays, all state keys, and the
  channel keys the member is entitled to. A new device rebuilds everything from
  those bundles.
- **Open:** anyone with the id and relays reads the op log and can `join`
  (if `join` is `open`). Before the first checkpoint, clients page through
  all of a community's ops, ask for the founder's ops separately, and fetch
  missing parents by id, so a flood of ops from strangers cannot hide the
  genesis (not even one dated in a single second, which paging cannot split).
  Messages are only asked for from people who were ever members. When an
  admin adds someone, a key bundle without keys tells them about the
  community.
- Each user keeps their community list in an app-data event encrypted to
  themselves, so open communities come back on a new device too. Invitations
  to private communities show up as bundles, and the client lists only the
  ones the user accepted.
- Community events go to the relays named in the community's settings. Key
  bundles go there and to the recipient's own relays.

## Checkpoints

The op log grows with every join, removal, key change and moderation, and a
new device would have to fetch and replay all of it. A checkpoint lets it
start from a snapshot instead.

- **Proposing.** An owner's client proposes one every 500 valid ops, and
  whenever the owners change, with a `checkpoint` op on its valid heads:
  `{prev, hash, indexHash, state, index, owners, offset, count}`. `hash` is
  the SHA-256 of the snapshot of the state those heads give (roles, members,
  channels, key ops, which scopes need a new key after a removal or an
  addition, departure seals, hidden and retracted messages, open proposals,
  who was added by which op), as JSON in the order the replay created things; `state` and `index` are the ids of the events (kind 1464, in
  25 000-character parts, sealed under the state key in private communities)
  that hold the snapshot and the covered index (below); `owners` are the
  snapshot's owners; `prev` is the previous accepted checkpoint.
- **Approving.** A checkpoint counts once more than half of the owners named
  by the previous accepted checkpoint (the founder, before the first) have
  proposed or approved it (`approve-checkpoint {checkpoint}`). That is the
  majority that owner changes need, so faking one takes as many owners as a
  takeover does. Owners' clients approve on their own after recomputing the
  snapshot and index from the log and fetching the parts. An owner backs one
  proposal per checkpoint (switching only when its choice stops verifying),
  so among honest owners two cannot both win. Before proposing or approving,
  a client replaces a state key that a departed member holds.
- **Forks.** Owners who once had a majority keep their keys, so they could
  later sign a rival successor to a checkpoint, backdated (the founder alone,
  before the first). Dates cannot settle that, so a device follows the
  checkpoint it accepted before: its own, the one in the user's community
  list (each device records the latest it accepted there), or the one in the
  invitation (key bundles carry the sender's). From there, or without one, it
  follows a checkpoint only while it has a single accepted successor; at a
  fork it stops, replays the ops since the last checkpoint before it, and
  neither proposes nor approves.
- **The state** is then the latest accepted checkpoint's snapshot plus the
  ops that descend from it and are dated no earlier than it, ordered and
  replayed as above (revocations from before it are in the snapshot already);
  their parents from before it count as known. Ops that do not build on it
  are ignored by everyone. A client that writes one on an older view is told
  ("not allowed") and can write it again; one whose op reached the approvers
  too late does it again on its own once the checkpoint is accepted (not key
  ops: a dropped rekey is healed with a new key, a dropped channel made anew).
- **Fetching.** Checkpoint and approval ops carry a tag `c` (`checkpoint` in
  plaintext, `sha256("wejure-checkpoint:" + key)` on envelopes), so a new
  device fetches them, the snapshot, and only the ops dated from the
  checkpoint on. Nothing can hide from that: ops are dated no earlier than
  the latest checkpoint they build on (one dated before it is ignored), and
  an envelope no earlier than the op inside (an op in an older envelope does
  not count). Snapshots are kept in the device cache.
- **The covered index** answers what old messages ask: their `state` tags name
  ops from before the checkpoint, and "written after joining" asks whether the
  sender's add op is an ancestor of those. Per covered op, in order, it holds
  a 16-hex prefix of the id, and for ops that are not cuts (written
  concurrently) their latest cut and parents. Each checkpoint carries the
  index of the ops since the previous one; clients fetch them only when they
  read messages from before the latest checkpoint (an epoch whose index
  cannot be fetched is tried again a minute later; meanwhile its messages do
  not count).
- **Missing parts.** If a checkpoint's snapshot parts are gone, a client
  computes its snapshot from the previous checkpoint (or the genesis) and the
  ops since, and uses it if it has the approved hash.

## Limits (known, accepted for now)

- **No forward secrecy:** a stolen account key reveals the history that account
  could read. Rekeying protects the future.
- **Rekey cost** is one gift wrap per member of the scope. That's fine for
  hundreds of members; thousands would need sender keys or MLS-style trees.
- **Checkpoints need their owners:** if a majority of the latest
  checkpoint's owners (the founder, before the first) no longer uses WeJure,
  no checkpoint is accepted any more, for good; clients then replay the ops
  since the last one (slower, still correct). The same holds past a fork, for
  devices that stop there. Between checkpoints, a client replays the ops
  since the last one whenever new ops arrive (about 30 ms for 5000 ops).
- **Races:** a departed member's messages that the remover had not seen when
  sealing drop out of view, and messages sent with a key that turns out to
  need a rekey are readable by whoever got that key.
- **Open communities:** relays accept anyone's events tagged with the
  community, and clients ignore non-members. Spam costs relay storage, not
  attention.
- **Kind numbers** 1460–1464 are placeholders.

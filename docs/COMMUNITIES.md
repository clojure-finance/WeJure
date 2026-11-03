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
latest ops its author had seen. The ops form a DAG (like git commits), and
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
keys and random tags. Open plaintext ops and messages are published as they
are, tagged `h = <community id>`.

**Messages** (kind 1461): `{channel, topic, text}`, plus three kinds of tags.
`prev` tags name the sender's own latest messages in that channel, so each
person's messages per channel form a hash chain. `state` tags name the op
log's heads the sender saw. `ms` gives milliseconds, so messages sent within
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

## Computing the state

1. Drop ops with bad signatures, a wrong community tag, or unknown parents.
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
- **New members:** they get every state key, so they can check the op log back
  to the genesis. For `shared` channels they get all past keys whoever adds
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
member's messages there still count.

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
  (if `join` is `open`). Clients page through all of a community's ops, ask
  for the founder's ops separately on the first open, and fetch missing
  parents by id, so a flood of ops from strangers cannot hide the genesis
  (not even one dated in a single second, which paging cannot split). Messages
  are only asked for from people who were ever members. When an admin adds someone, a key bundle
  without keys tells them about the community.
- Each user keeps their community list in an app-data event encrypted to
  themselves, so open communities come back on a new device too. Invitations
  to private communities show up as bundles, and the client lists only the
  ones the user accepted.
- Community events go to the relays named in the community's settings. Key
  bundles go there and to the recipient's own relays.

## Limits (known, accepted for now)

- **No forward secrecy:** a stolen account key reveals the history that account
  could read. Rekeying protects the future.
- **Rekey cost** is one gift wrap per member of the scope. That's fine for
  hundreds of members; thousands would need sender keys or MLS-style trees.
- **Whole log:** every client fetches and replays the whole op log once per
  page session, and replays it again whenever new ops arrive (about 30 ms for
  5000 ops). Much larger communities will need signed checkpoints.
- **Races:** a departed member's messages that the remover had not seen when
  sealing drop out of view, and messages sent with a key that turns out to
  need a rekey are readable by whoever got that key.
- **Open communities:** relays accept anyone's events tagged with the
  community, and clients ignore non-members. Spam costs relay storage, not
  attention.
- **Kind numbers** 1460–1463 are placeholders.

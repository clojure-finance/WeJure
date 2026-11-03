// Reads what the relay stores, straight from the test process (not through the
// app), to check what was really saved.
const { SimplePool } = require('nostr-tools/pool');

const RELAY = 'ws://127.0.0.1:8020';

async function query(filter) {
    const pool = new SimplePool();
    try {
        return await pool.querySync([RELAY], filter, { maxWait: 3000 });
    } finally {
        pool.destroy();
    }
}

// The public keys claiming a username (normally one).
async function pubkeysOf(username) {
    const claims = await query({ kinds: [30078], '#d': [`wejure/account/${username.toLowerCase()}`] });
    return [...new Set(claims.map((e) => e.pubkey))];
}

async function pubkeyOf(username) {
    const pks = await pubkeysOf(username);
    if (pks.length !== 1) throw new Error(`${username} has ${pks.length} accounts`);
    return pks[0];
}

// The texts of a user's stored posts, sorted.
async function postTexts(username) {
    const pk = await pubkeyOf(username);
    return (await query({ kinds: [1], authors: [pk] })).map((e) => e.content).sort();
}

module.exports = { RELAY, query, pubkeyOf, postTexts };

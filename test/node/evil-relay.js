// A malicious relay for tests: it accepts writes (and acks them) but changes the
// content of every event it serves, keeping the original id and signature.
// Usage: node test/node/evil-relay.js <port>
import { WebSocketServer } from 'ws';

const [port] = process.argv.slice(2);
const events = [];

function matches(event, filter) {
    if (filter.kinds && !filter.kinds.includes(event.kind)) return false;
    if (filter.authors && !filter.authors.includes(event.pubkey)) return false;
    return true;
}

const wss = new WebSocketServer({ port: Number(port), host: '127.0.0.1' });
wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        const msg = JSON.parse(data);
        if (msg[0] === 'EVENT') {
            events.push(msg[1]);
            ws.send(JSON.stringify(['OK', msg[1].id, true, '']));
        } else if (msg[0] === 'REQ') {
            const [, subId, ...filters] = msg;
            for (const e of events) {
                if (filters.some((f) => matches(e, f))) {
                    ws.send(JSON.stringify(['EVENT', subId, { ...e, content: 'FORGED: ' + e.content }]));
                }
            }
            ws.send(JSON.stringify(['EOSE', subId]));
        }
    });
});
wss.on('listening', () => console.log(`evil relay listening on ${port}`));

// Stands in for an IPFS (Kubo) node: the API on 127.0.0.1:5001 stores each
// uploaded file under a fake CID, and the gateway on 127.0.0.1:8080 serves it back.
const crypto = require('crypto');
const http = require('http');

const files = new Map();

// POST /api/v0/add with a multipart body holding one file -> {Name, Hash, Size}
http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.end();
        return;
    }
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
        const body = Buffer.concat(chunks);
        const boundary = '--' + (req.headers['content-type'] || '').split('boundary=')[1];
        const data = body.subarray(body.indexOf('\r\n\r\n') + 4, body.lastIndexOf(boundary) - 2);
        const cid = 'Qm' + crypto.createHash('sha256').update(data).digest('hex').slice(0, 44);
        files.set(cid, data);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ Name: 'file', Hash: cid, Size: String(data.length) }));
    });
}).listen(5001, '127.0.0.1');

// GET /ipfs/<cid>
http.createServer((req, res) => {
    const data = files.get(req.url.replace('/ipfs/', ''));
    if (!data) {
        res.statusCode = 404;
        res.end();
        return;
    }
    res.setHeader('Content-Type', 'image/png');
    res.end(data);
}).listen(8080, '127.0.0.1');

// A malicious Blossom server for tests: it serves the same fake bytes for any hash.
// Usage: node servers/evil-blossom.js <port>
import http from 'node:http';

const [port] = process.argv.slice(2);
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end('not the picture you asked for');
}).listen(Number(port), '127.0.0.1', () => console.log(`evil blossom listening on ${port}`));

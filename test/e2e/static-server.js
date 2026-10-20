// Serves public/ on 127.0.0.1:8020. Paths that are not files get index.html,
// since the app routes with real URLs such as /home.
const fs = require('fs');
const http = require('http');
const path = require('path');

const root = path.resolve(__dirname, '../../public');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.ico': 'image/x-icon' };

http.createServer((req, res) => {
    let file = path.join(root, decodeURIComponent(req.url.split('?')[0]));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        file = path.join(root, 'index.html');
    }
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
}).listen(8020, '127.0.0.1');

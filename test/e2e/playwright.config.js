// End-to-end test of the release build ("yarn test:e2e" builds it first). Starts a
// fresh GunDB relay, an IPFS stand-in and a static server on the ports the app
// expects (8001, 5001 and 8080, 8020), so stop any IPFS node, relay or dev server first.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { defineConfig } = require('@playwright/test');

const relayData = fs.mkdtempSync(path.join(os.tmpdir(), 'wejure-relay-'));   // relay.js writes ./radata

module.exports = defineConfig({
    testDir: '.',
    timeout: 5 * 60 * 1000,
    expect: { timeout: 15 * 1000 },
    workers: 1,
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:8020',
        actionTimeout: 15 * 1000,
        viewport: { width: 1400, height: 900 },
    },
    webServer: [
        {
            command: `node ${path.resolve(__dirname, '../../src/wejure/js/relay.js')}`,
            cwd: relayData,
            url: 'http://127.0.0.1:8001/gun.js',
            reuseExistingServer: false,
        },
        {
            command: 'node ipfs-stub.js',
            cwd: __dirname,
            port: 5001,
            reuseExistingServer: false,
        },
        {
            command: 'node static-server.js',
            cwd: __dirname,
            url: 'http://127.0.0.1:8020/',
            reuseExistingServer: false,
        },
    ],
});

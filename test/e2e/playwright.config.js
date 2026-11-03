// End-to-end test of the release build ("npm run test:e2e" builds it first).
// Starts server/index.js (app, relay and media server) on port 8020 with fresh
// data, so stop any WeJure server or dev build on that port first.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { defineConfig } = require('@playwright/test');

const data = fs.mkdtempSync(path.join(os.tmpdir(), 'wejure-e2e-'));

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
    webServer: {
        command: `node server/index.js --port 8020 --data ${data}`,
        cwd: path.resolve(__dirname, '../..'),
        url: 'http://127.0.0.1:8020/',
        reuseExistingServer: false,
    },
});

// GunDB relay server. Run "node relay" in this directory; data is stored in ./radata.
// PORT and HOST override the defaults, e.g. HOST=0.0.0.0 to accept other machines.
const express = require('express');
const Gun = require('gun');
require('gun/sea');                 // verify signatures on the relay, not only in clients

// All application data lives in SEA user spaces (~pub) or the inbox node; the
// pre-ownership shared nodes are refused outright, so clients that bypass SEA
// cannot even pollute relay storage through them.
const LEGACY_SOULS = ["user", "chat", "groups", "groupKeys", "groupChat"];

function legacy(soul) {
    return LEGACY_SOULS.includes(soul) || soul.startsWith("post/");
}

Gun.on('opt', function (ctx) {
    this.to.next(ctx);
    if (ctx.once) return;
    ctx.on('in', function (msg) {
        if (msg.put && Object.keys(msg.put).some(legacy)) return;       // drop the write
        this.to.next(msg);
    });
});

const app = express();
const port = process.env.PORT || 8001;
const host = process.env.HOST || "127.0.0.1";
app.use(Gun.serve);

const server = app.listen(port, host, () => {
    console.log("Listening at " + host + ":" + port);
});

Gun({ web: server });

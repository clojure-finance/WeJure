// GunDB relay server. Run "node relay" in this directory; data is stored in ./radata.
// PORT and HOST override the defaults, e.g. HOST=0.0.0.0 to accept other machines.
const express = require('express');
const Gun = require('gun');

const app = express();
const port = process.env.PORT || 8001;
const host = process.env.HOST || "127.0.0.1";
app.use(Gun.serve);

const server = app.listen(port, host, () => {
    console.log("Listening at " + host + ":" + port);
});

Gun({ web: server });

// run "node relay"
const express = require('express');
const Gun = require('gun');

const app = express();
const port = 8001;
const host = "127.0.0.1";
app.use(Gun.serve);

const server = app.listen(port, host, () => {
    console.log("Listening at port " + port);
})

Gun({web: server});
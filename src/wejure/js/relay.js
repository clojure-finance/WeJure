// run "node relay"
const express = require('express')
const Gun = require('gun')

const app = express()
const port = 8001
app.use(Gun.serve)

const server = app.listen(port, () => {
    console.log("Listening at: http://localhost://" + port)
})

Gun({web: server})
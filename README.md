# WeJure: A Decentralized Social Network

## Features
- Runs on a peer-to-peer network
- Secured and immutable data 
- Transparency of data usage and source code

## Getting started
WeJure is developed using [shadow-cljs](https://github.com/thheller/shadow-cljs) (which requires node.js, yarn and Java SDK).<br/>
The following software are needed:
- [Node.js](https://nodejs.org) 
- [Yarn](https://www.yarnpkg.com)
- [Java SDK](https://adoptium.net/) 
- [InterPlanetary File System (IPFS)](https://ipfs.tech/)

Before running WeJure, run `yarn` to download all the dependencies.

To run or configure WeJure on your local environment, first navigate to `src/wejure/js` in terminal and run `node relay` to start a relay server for synchronizing data in gunDB. Next, run a local IPFS client to host IPFS. In the root directory, start a local server by the command `yarn dev`. Then visit [localhost:8020](http://localhost:8020).

## Special notes
- To delete all the gunDB data, clear the browser local storage in every browser that you used opened WeJure with. Then, delete the `radata` folder in `src/wejure/js`

## User guide
Users will need to create an account or sign in from the top right corner of the main page. After loggin in, users will be able to send messages to other users online.

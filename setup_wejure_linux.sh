#!/bin/bash
# One-time setup on Linux: Node.js (via nvm), Yarn, IPFS (Kubo), and the npm dependencies.
cd "$(dirname "$0")"
KUBO_VERSION=v0.30.0

# install nvm and load it into this shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"

# install Node.js 20 and make it the default
nvm install 20
nvm alias default 20
node -v

# enable Yarn through Corepack (the version is pinned in package.json)
corepack enable

# install IPFS (Kubo)
curl -fsSL -o /tmp/kubo.tar.gz "https://dist.ipfs.tech/kubo/$KUBO_VERSION/kubo_${KUBO_VERSION}_linux-amd64.tar.gz"
tar -xzf /tmp/kubo.tar.gz -C /tmp
sudo bash /tmp/kubo/install.sh
ipfs --version

# initialize IPFS and allow the WeJure page to call its API
ipfs init
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:8020", "http://localhost:5001", "https://webui.ipfs.io"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'

# install the npm dependencies
yarn install

echo "WeJure environment has been set up on Linux. Enjoy!"

#!/bin/bash
# One-time setup on macOS: Homebrew, Node.js, Yarn, IPFS (Kubo), and the npm dependencies.
cd "$(dirname "$0")"

# install Homebrew if missing
if ! command -v brew &> /dev/null
then
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    BREW=/opt/homebrew/bin/brew                     # Apple silicon
    [ -x "$BREW" ] || BREW=/usr/local/bin/brew      # Intel
    echo "eval \"\$($BREW shellenv)\"" >> ~/.zprofile
    eval "$($BREW shellenv)"
fi

# install Node.js, Yarn and IPFS
brew install node yarn ipfs

# initialize IPFS and allow the WeJure page to call its API
ipfs init
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:8020", "http://localhost:5001", "https://webui.ipfs.io"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'

# install the npm dependencies
yarn install

echo "WeJure is well set up. Enjoy!"

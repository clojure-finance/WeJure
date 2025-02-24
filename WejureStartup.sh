#!/bin/bash

# check if Homebrew is installed
if ! command -v brew &> /dev/null
then
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    # Add Homebrew to PATH
    echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.bash_profile 
    source ~/.bash_profile
    echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc  
    source ~/.zshrc
fi

# install Node.js and Yarn
brew install node yarn

# install IPFS
brew install ipfs

# initialize IPFS
ipfs init

# set up IPFS config
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"http://localhost:8020\", \"http://localhost:5001\", \"https://webui.ipfs.io\"]"
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'

# dependencies installation
yarn install

npm install crypto-js

echo "WeJure is well set up. Enjoy!"
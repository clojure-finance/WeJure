#!/bin/bash

# 安装 Homebrew（如果尚未安装）
if ! command -v brew &> /dev/null
then
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    # 配置环境变量
    echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.bash_profile 
    source ~/.bash_profile
    echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc  
    source ~/.zshrc
fi

# 安装 Node.js 和 Yarn
brew install node yarn

# 安装 IPFS
brew install ipfs

# 初始化 IPFS
ipfs init

# 配置 IPFS API 跨域访问
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"http://localhost:8020\", \"http://localhost:5001\", \"https://webui.ipfs.io\"]"
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'

# 安装依赖
yarn install

npm install crypto-js

echo "WeJure is well set up. Enjoy!"
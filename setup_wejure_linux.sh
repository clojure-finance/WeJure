#!/bin/bash

# 安装 nvm (Node 版本管理器)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# 重新加载 .bashrc 文件，使 nvm 命令生效
source ~/.bashrc

# 使用 nvm 安装 Node.js v20.18.0
nvm install 20.18.0

# 将 Node.js v20.18.0 设置为默认版本
nvm alias default 20.18.0

# 验证 Node.js 和 npm 版本
node -v
npm -v

# 启用 Corepack
corepack enable

# 安装 IPFS
npm install -g ipfs

# 初始化 IPFS
ipfs init

# 配置 IPFS API 跨域访问
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"http://localhost:8020\", \"http://localhost:5001\", \"https://webui.ipfs.io\"]"

# 安装依赖
npm install 
npm install crypto-js

echo "WeJure environment has been set up on Linux. Enjoy!"
#!/bin/bash

# 更新软件包列表并安装必需的依赖项
if command -v apt-get &> /dev/null
then
    sudo apt-get update
    sudo apt-get install build-essential procps curl file git -y
elif command -v yum &> /dev/null
then
    sudo yum groupinstall 'Development Tools' -y
    sudo yum install procps-ng curl file git -y
elif command -v pacman &> /dev/null
then
    sudo pacman -Syu --noconfirm base-devel procps-ng curl file git
else
    echo "请手动安装必要的依赖项：编译工具、procps、curl、file、git。"
    exit 1
fi

# 安装 Homebrew（如果尚未安装）
if ! command -v brew &> /dev/null
then
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    # 配置环境变量
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bash_profile
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.zshrc
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
fi

# 安装 Node.js 和 Yarn
brew install node yarn

# 安装 IPFS
brew install ipfs

# 将当前用户添加到 fuse 组（某些发行版可能需要）
if grep -q "fuse" /etc/group; then
    sudo usermod -aG fuse $USER
fi

# 初始化 IPFS
ipfs init

# 配置 IPFS API 跨域访问
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:8020", "http://localhost:5001", "https://webui.ipfs.io"]'

# 安装依赖
yarn install

# 安装 crypto-js
npm install crypto-js

echo "WeJure is well set up. Enjoy!"
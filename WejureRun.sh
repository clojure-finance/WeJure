#!/bin/bash

# 启动 IPFS 守护进程
if ! pgrep -x "ipfs" > /dev/null
then
    ipfs daemon &
else
    echo "IPFS daemon is already running."
fi
# ipfs daemon &

# 启动 Gun 中继服务器
osascript -e 'tell application "Terminal"
    do script "cd '$(pwd)'/src/wejure/js && node relay"
end tell'

# 编译并启动 WeJure 开发服务器
osascript -e 'tell application "Terminal"
    do script "cd '$(pwd)' && yarn dev"
end tell'

echo "WeJure is running, please visit http://localhost:8020 to enjoy!"
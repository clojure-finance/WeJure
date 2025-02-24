#!/bin/bash

# check if ipfs is running
if ! pgrep -x "ipfs" > /dev/null
then
    ipfs daemon &
else
    echo "IPFS daemon is already running."
fi

# start the GUN relay server
osascript -e 'tell application "Terminal"
    do script "cd '$(pwd)'/src/wejure/js && node relay"
end tell'

# compile the WeJure
osascript -e 'tell application "Terminal"
    do script "cd '$(pwd)' && yarn dev"
end tell'

echo "WeJure is running, please visit http://localhost:8020 to enjoy!"
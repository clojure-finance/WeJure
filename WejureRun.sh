#!/bin/bash
# Starts IPFS, the GunDB relay and the shadow-cljs dev server (macOS and Linux).
cd "$(dirname "$0")"

# start the IPFS daemon unless it is running
if ! pgrep -x "ipfs" > /dev/null
then
    ipfs daemon &
else
    echo "IPFS daemon is already running."
fi

if [ "$(uname)" = "Darwin" ]
then
    # relay and dev server in their own Terminal windows
    osascript -e 'tell application "Terminal"
        do script "cd '"$(pwd)"'/src/wejure/js && node relay"
    end tell'
    osascript -e 'tell application "Terminal"
        do script "cd '"$(pwd)"' && yarn dev"
    end tell'
    echo "WeJure is running, please visit http://localhost:8020 to enjoy!"
else
    # relay in the background (stopped on exit), dev server in the foreground
    (cd src/wejure/js && node relay) &
    RELAY_PID=$!
    trap 'kill $RELAY_PID' EXIT
    echo "WeJure will be served at http://localhost:8020 once the build completes."
    yarn dev
fi

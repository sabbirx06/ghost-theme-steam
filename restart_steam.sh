#!/usr/bin/env fish

echo "Stopping Steam..."
# Kill by process name (not -f) to avoid matching this script's own path
pkill -TERM steam 2>/dev/null; or true
pkill -TERM steamwebhelper 2>/dev/null; or true

# Wait until steam is fully gone
for i in (seq 1 15)
    sleep 1
    if not pgrep -x steam > /dev/null 2>&1
        break
    end
    echo "Waiting for Steam to exit... ($i)"
end

# Force kill anything remaining
pkill -9 steam 2>/dev/null; or true
pkill -9 steamwebhelper 2>/dev/null; or true
sleep 1

echo "Relaunching Steam..."
nohup /usr/bin/steam -silent > /tmp/steam_restart.log 2>&1 &

echo "Steam relaunched."

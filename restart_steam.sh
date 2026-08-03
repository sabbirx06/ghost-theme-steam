#!/usr/bin/env bash

echo "Stopping Steam..."
pkill -TERM -x steam 2>/dev/null || true
pkill -TERM -f steamwebhelper 2>/dev/null || true

for i in {1..10}; do
    if ! pgrep -x steam > /dev/null 2>&1; then
        break
    fi
    echo "Waiting for Steam to exit... ($i)"
    sleep 1
done

pkill -9 -x steam 2>/dev/null || true
pkill -9 -f steamwebhelper 2>/dev/null || true
sleep 1

echo "Relaunching Steam in Desktop session..."
if command -v systemd-run >/dev/null 2>&1; then
    systemd-run --user --unit=steam-desktop-app /usr/bin/steam -dev steam://open/main >/dev/null 2>&1 || true
else
    DISPLAY=${DISPLAY:-:0} WAYLAND_DISPLAY=${WAYLAND_DISPLAY:-wayland-0} nohup /usr/bin/steam -dev steam://open/main > /tmp/steam_restart.log 2>&1 & disown
fi

echo "Steam relaunched."

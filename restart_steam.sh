#!/bin/bash
echo "Stopping Steam..."
pkill -9 -f steamwebhelper 2>/dev/null || true
pkill -9 -f steam 2>/dev/null || true
sleep 2
echo "Relaunching Steam..."
nohup steam steam://open/main >/dev/null 2>&1 &
echo "Steam process launched!"

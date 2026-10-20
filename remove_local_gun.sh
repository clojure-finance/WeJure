#!/bin/bash
# Deletes the GunDB data stored by the local relay. Stop the relay first.
rm -rf "$(dirname "$0")/src/wejure/js/radata"

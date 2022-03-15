#!/bin/sh
echo '.gitignore' > .gitignore

#Take out ipfs daemon for now, testing js-ipfs
#chmod +x install-scripts/ipfs.sh
#sudo bash install-scripts/ipfs.sh

chmod +x install-scripts/npm-http-server
sudo bash install-scripts/npm-http-server
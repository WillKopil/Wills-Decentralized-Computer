#!/bin/bash
echo '.gitignore' > .gitignore

#Take out ipfs daemon for now, testing js-ipfs
#chmod +x install-scripts/ipfs.sh
#sudo bash install-scripts/ipfs.sh

echo "npm http-server installing..."
chmod +x install-scripts/npm-http-server
sudo bash install-scripts/npm-http-server
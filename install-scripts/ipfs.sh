#!/bin/sh
wget https://dist.ipfs.io/go-ipfs/v0.12.0/go-ipfs_v0.12.0_linux-amd64.tar.gz
tar -xvzf go-ipfs_v0.12.0_linux-amd64.tar.gz
cd go-ipfs
sudo bash install.sh
cd ~
echo 'this echo is working TEST'
sudo echo 'go-ipfs' >> .gitignore
sudo rm -f go-ipfs_v0.12.0_linux-amd64.tar.gz
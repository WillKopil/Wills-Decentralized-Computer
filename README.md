# Wills-Decentralized-Computer

## Introduction 

With Gitpod making ephemeral computers so accessible and IPFS giving a great file storage component I will being using Github to create and store custom settings for my environment

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/WillKopil/Wills-Decentralized-Computer)

The first thing you should know is the `.gitpod.yml` will run all the commands listed when the ephemeral computer starts

> NOTE: In order to save space in the `.gitpod.yml` file we will simply execute a bash script --> `gitpod-init.sh`

Our packages that we install won't be needed in github so we will also be sure to automaticly add them into the `.gitignore` file in the install scripts

## Packages

We really need our computer to have a permanent decentralized storage so we will install ipfs (inter planetary file system) with `install-script/ipfs.sh`

For development we will use the npm packge http-server. It will serve files out of the `app/public` directory. To start the server just run these commands
```
cd app
https-server
```





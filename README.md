# ERC721 Wallet

## Motivation

There are many ERC721 wallets out there already, but none that work truely
permissionless in the sense that any ERC721 can be added. This wallet's aim is
to allow any ERC721 be transferred with Metamask and eventually Ledger or
Trezor.


## Installation

```
$ git clone git@github.com:TimDaub/ERC721-wallet.git
$ npm i
$ npm run dev
```

## Run a production build with docker

```
$ docker build -t app .
$ docker run -d -p 80:80 app
```

## Contribute & License

This is an open source project licensed under the permissive Apache 2 license.
Any contributions will be merged as quickly as possible. We highly welcome
outside contributions. Please send your PR!

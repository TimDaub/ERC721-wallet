# ERC721 Wallet [![Build Status](https://travis-ci.com/TimDaub/ERC721-wallet.svg?branch=master)](https://travis-ci.com/TimDaub/ERC721-wallet) [![Codecov branch](https://img.shields.io/codecov/c/github/TimDaub/ERC721-wallet/master.svg)](https://codecov.io/github/TimDaub/ERC721-wallet?branch=master)

## Demo

Check out the demo here: https://www.mycollectibles.io/

## Motivation

There are many ERC721 wallets out there already, but none that work truely
permissionless in the sense that any ERC721 can be added. This wallet's aim is
to allow any ERC721 be transferred with Metamask and eventually Ledger or
Trezor.

## Support

|Token|Support|
|---|---|
|Any OpenZeppelin ERC721 contract|Fully supported|
|CryptoKitties.co|Fully supported|
|KnownOrigin.io|Fully supported|
|left.gallery|Fully supported|
|mokens.io|Fully supported|
|ensnifty.com|Actions supported, CORS issues|
|mlbcryptobaseball.com|Partially supported|
|Ethermon Adventure|Partially supported|
|Any 0xcert ERC721 contract|Not yet supported|

We're looking for donations of NFTs (0x2418ECF0617EC94343afe7301c71E7E9dfC5E523) for testing. Additionally, we're looking for contributors implementing their custom ERC721s. For more guidance simply open an issue.

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

Or by pulling the image from docker hub directly:

```
$ docker run -p 80:80 timdaub/erc721-wallet
```

## Contribute & License

This is an open source project licensed under the permissive Apache 2 license.
Any contributions will be merged as quickly as possible. We highly welcome
outside contributions. Please send your PR!

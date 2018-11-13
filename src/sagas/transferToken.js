// @format
import { call, take, put, takeLatest } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
const Tx = require("ethereumjs-tx");
import buffer from "buffer";
import Eth from "@ledgerhq/hw-app-eth";
import TransportU2F from "@ledgerhq/hw-transport-u2f";

import {
  transferTokenSuccess,
  transferTokenFailure
} from "../actions/transferToken";
import ERC721 from "../abis/ERC721.json";

function* transferToken({
  payload: {
    web3,
    from,
    to,
    tokenId,
    contract,
    provider,
    path,
    networkId,
    gasPrice
  }
}) {
  const erc721Contract = new web3.eth.Contract(ERC721, contract);
  if (provider === "metamask") {
    let tx;
    try {
      tx = yield erc721Contract.methods
        .transferFrom(from, to, tokenId)
        .send({ from });
    } catch (err) {
      yield put(transferTokenFailure(err));
    }
    yield put(transferTokenSuccess(tx.transactionHash));
  } else if (provider === "ledger") {
    const transport = yield TransportU2F.create();
    const eth = new Eth(transport);

    const gasLimit = yield erc721Contract.methods
      .transferFrom(from, to, tokenId)
      .estimateGas();
    const count = yield web3.eth.getTransactionCount(from);
    const rawTx = {
      from: from,
      to: contract,
      nonce: web3.utils.toHex(count),
      gasPrice: web3.utils.toHex(web3.utils.toWei(gasPrice.toString(), "gwei")),
      gasLimit,
      data: erc721Contract.methods.transferFrom(from, to, tokenId).encodeABI()
    };

    const tx = new Tx(rawTx);
    // Taken from:
    // https://github.com/LedgerHQ/ledgerjs/blob/master/packages/web3-subprovider/src/index.js#L142
    tx.raw[6] = Buffer.from([networkId]); // v
    tx.raw[7] = Buffer.from([]); // r
    tx.raw[8] = Buffer.from([]); // s

    const result = yield eth.signTransaction(
      path,
      tx.serialize().toString("hex")
    );
    tx.v = buffer.Buffer.from(result.v, "hex");
    tx.r = buffer.Buffer.from(result.r, "hex");
    tx.s = buffer.Buffer.from(result.s, "hex");
    const signedTransaction = `0x${tx.serialize().toString("hex")}`;
    try {
      web3.eth.sendSignedTransaction(signedTransaction);
    } catch (err) {
      yield put(transferTokenFailure(err));
    }
    yield put(transferTokenSuccess("abc"));
  }
}

export function* transferTokenWatcher() {
  yield takeLatest("TRANSFER_TOKEN_BEGIN", transferToken);
}

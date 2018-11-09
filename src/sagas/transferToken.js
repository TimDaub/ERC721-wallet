// @format
import { put, takeLatest } from "redux-saga/effects";
import {
  transferTokenSuccess,
  transferTokenFailure
} from "../actions/transferToken";
import ERC721 from "../abis/ERC721.json";

function* transferToken({ payload: { web3, from, to, tokenId, contract } }) {
  console.log(from);
  var erc721Contract = new web3.eth.Contract(ERC721, contract);
  let tx;
  try {
    tx = yield erc721Contract.methods
      .transferFrom(from, to, tokenId)
      .send({ from });
  } catch (err) {
    yield put(transferTokenFailure(err));
  }
  yield put(transferTokenSuccess());
}

export function* transferTokenWatcher() {
  yield takeLatest("TRANSFER_TOKEN_BEGIN", transferToken);
}

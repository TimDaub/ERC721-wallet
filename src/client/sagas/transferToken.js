// @format
import { put, takeLatest } from "redux-saga/effects";
import { transferTokenSuccess, transferTokenFailure } from "../actions/index";
import getWeb3 from "../utils/getWeb3";
import ERC721 from "../abis/ERC721.json";

function* transferToken({ payload: { from, to, tokenId } }) {
  const web3 = yield getWeb3();
  var contract = new web3.eth.Contract(
    ERC721,
    "0x9326f84fcca8a136da3a4f71bbffbde6635c58da"
  );
  console.log(from, to, tokenId);
  const tx = yield contract.methods
    .transferFrom(from, to, tokenId)
    .send({ from });
  console.log(tx);
  yield put(transferTokenSuccess(tx));
}

export function* transferTokenWatcher() {
  yield takeLatest("TRANSFER_TOKEN_BEGIN", transferToken);
}

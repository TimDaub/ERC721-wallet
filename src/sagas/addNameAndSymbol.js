// @format
import { put, takeLatest, all } from "redux-saga/effects";

import {
  addNameAndSymbolSuccess,
  addNameAndSymbolFailure
} from "../actions/addNameAndSymbol";
import ERC721 from "../abis/ERC721.json";
import config from "../config";

function* addNameAndSymbol({ payload: { contract } }) {
  const web3 = config.web3;
  try {
    contract = new web3.eth.Contract(ERC721, contract);
  } catch (err) {
    yield put(addNameAndSymbolFailure(err));
  }
  let name, symbol;
  try {
    [name, symbol] = yield all([
      contract.methods.name().call(),
      contract.methods.symbol().call()
    ]);
  } catch (err) {
    yield put(addNameAndSymbolFailure(err));
  }
  yield put(addNameAndSymbolSuccess(name, symbol));
}

export function* addNameAndSymbolWatcher() {
  yield takeLatest("ADD_NAME_AND_SYMBOL_BEGIN", addNameAndSymbol);
}

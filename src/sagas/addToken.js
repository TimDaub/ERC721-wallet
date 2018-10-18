// @format
import { put, takeLatest } from "redux-saga/effects";
import { addTokenSuccess, addTokenFailure } from "../actions/addToken";
import ERC721 from "../abis/ERC721.json";

function* addToken({ payload: { contract } }) {
  let tokens = localStorage.getItem("tokens");
  if (tokens === null) {
    tokens = contract;
    localStorage.setItem("tokens", contract);
  } else {
    tokens += "," + contract;
    localStorage.setItem("tokens", tokens);
  }

  yield put(addTokenSuccess(tokens));
}

export function* addTokenWatcher() {
  yield takeLatest("ADD_TOKEN_BEGIN", addToken);
}

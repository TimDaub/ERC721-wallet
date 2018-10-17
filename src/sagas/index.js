// @format
import { all } from "redux-saga/effects";
import { transactionsWatcher } from "./transactions";
import { transferTokenWatcher } from "./transferToken";
import { addTokenWatcher } from "./addToken";

export default function* root() {
  yield all([transactionsWatcher(), transferTokenWatcher(), addTokenWatcher()]);
}

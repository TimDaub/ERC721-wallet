// @format
import { all } from "redux-saga/effects";
import { fetchTransactionsWatcher } from "./fetchTransactions";
import { transferTokenWatcher } from "./transferToken";

export default function* root() {
  yield all([fetchTransactionsWatcher(), transferTokenWatcher()]);
}

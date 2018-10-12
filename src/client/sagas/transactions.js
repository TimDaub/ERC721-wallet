// @format
import { put, takeLatest } from "redux-saga/effects";

import {
  fetchTransactionsSuccess,
  fetchTransactionsFailure
} from "../actions/index";

function* fetchTransactions({ payload: { address } }) {
  let res;
  try {
    res = yield fetch(
      "http://api.etherscan.io/api?module=account&action=txlist&address=" +
        address +
        "&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken"
    ).then(res => res.json());
  } catch (err) {
    yield put(fetchTransactionsFailure(err));
  }
  const { result } = res;
  yield put(fetchTransactionsSuccess(result));
}

export function* transactionsWatcher() {
  yield takeLatest("FETCH_TRANSACTIONS_BEGIN", fetchTransactions);
}

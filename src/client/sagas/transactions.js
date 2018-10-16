// @format
import { put, takeLatest } from "redux-saga/effects";
import {
  fetchTransactionsSuccess,
  fetchTransactionsFailure
} from "../actions/index";
import getWeb3 from "../utils/getWeb3";
import Utils from "web3-utils";
import ERC721 from "../abis/ERC721.json";

function* fetchTransactions({ payload: { address } }) {
  const web3 = yield getWeb3();
  var contract = new web3.eth.Contract(
    ERC721,
    "0x9326f84fcca8a136da3a4f71bbffbde6635c58da"
  );
  const events = yield contract.getPastEvents("Transfer", {
    fromBlock: 0,
    toBlock: "latest",
    topics: [
      Utils.sha3("Transfer(address,address,uint256)"),
      null,
      Utils.padLeft(address, 64)
    ]
  });

  const returnValues = events.map(event => event.returnValues);
  const tokenURIPromises = returnValues.map(val =>
    contract.methods.tokenURI(val._tokenId).call()
  );
  const tokenURIs = yield Promise.all(tokenURIPromises);

  const tokenJSONPromises = tokenURIs.map(uri =>
    fetch(uri).then(res => res.json())
  );
  const tokenJSON = yield Promise.all(tokenJSONPromises);
  for (let i = 0; i < returnValues.length; i++) {
    returnValues[i].token = tokenJSON[i];
  }

  yield put(fetchTransactionsSuccess(returnValues));
}

export function* transactionsWatcher() {
  yield takeLatest("FETCH_TRANSACTIONS_BEGIN", fetchTransactions);
}

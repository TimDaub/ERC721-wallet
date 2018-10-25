// @format
import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  fetchTransactionsSuccess,
  fetchTransactionsFailure
} from "../actions/fetchTransactions";
import getWeb3 from "../utils/getWeb3";
import Utils from "web3-utils";
import ERC721 from "../abis/ERC721.json";
import config from "../config";

function* fetchTransactions(address, contractAddress) {
  const web3 = config.web3;
  const contract = new web3.eth.Contract(ERC721, contractAddress);
  const outputs = yield call(
    contract.getPastEvents.bind(contract),
    "Transfer",
    {
      fromBlock: 0,
      toBlock: "latest",
      topics: [
        Utils.sha3("Transfer(address,address,uint256)"),
        Utils.padLeft(address, 64),
        null
      ]
    }
  );
  const inputs = yield call(contract.getPastEvents.bind(contract), "Transfer", {
    fromBlock: 0,
    toBlock: "latest",
    topics: [
      Utils.sha3("Transfer(address,address,uint256)"),
      null,
      Utils.padLeft(address, 64)
    ]
  });

  for (let i = 0; i < outputs.length; i++) {
    const outputTokenId = outputs[i].returnValues._tokenId;
    for (let j = 0; j < inputs.length; j++) {
      const inputTokenId = inputs[j].returnValues._tokenId;
      if (outputTokenId === inputTokenId) {
        inputs.splice(j, 1);
      }
    }
  }

  const returnValues = inputs.map(event => event.returnValues);
  const tokenURIPromises = returnValues.map(({ _tokenId }) =>
    contract.methods.tokenURI(_tokenId).call()
  );
  let tokenURIs;
  try {
    tokenURIs = yield call(Promise.all.bind(Promise), tokenURIPromises);
  } catch (e) {
    // TODO: This isn't the right way to overcome this error. What to do?
    tokenURIs = [];
    for (let promises in tokenURIPromises) {
      tokenURIs.push("https://cantdecodestring.com");
    }
  }

  const tokenNamePromises = returnValues.map(() =>
    contract.methods.name().call()
  );
  const tokenNames = yield call(Promise.all.bind(Promise), tokenNamePromises);

  const tokenJSONPromises = tokenURIs.map(uri =>
    fetch(uri)
      .then(res => res.json())
      .catch(err => null)
  );
  const tokenJSON = yield call(Promise.all.bind(Promise), tokenJSONPromises);
  for (let i = 0; i < returnValues.length; i++) {
    returnValues[i].token = tokenJSON[i];
    returnValues[i].name = tokenNames[i];
    returnValues[i].contract = contractAddress;
  }

  return returnValues;
}

export function* fetchTransactionsBatch(action) {
  const { address, contracts } = action.payload;
  const results = yield all(
    contracts.map(contract => call(fetchTransactions, address, contract))
  );
  const transactions = {};
  for (let [i, contract] of contracts.entries()) {
    transactions[contract] = results[i];
  }
  yield put({ type: "FETCH_TRANSACTIONS_SUCCESS", payload: { transactions } });
}

export function* fetchTransactionsWatcher() {
  yield takeEvery("FETCH_TRANSACTIONS_BEGIN", fetchTransactionsBatch);
}

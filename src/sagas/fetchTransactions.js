// @format
import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  fetchTransactionsSuccess,
  fetchTransactionsFailure
} from "../actions/fetchTransactions";
import Utils from "web3-utils";
import ERC721 from "../abis/ERC721.json";

function* fetchTransactions(web3, address, contractAddress) {
  const networkId = yield web3.eth.net.getId();

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

  const manifestations = tokenJSON.map(({ rightsOf }) => rightsOf);
  const manifestationsPromises = manifestations.map(ipfsHash =>
    fetch("https://ipfs.io/ipfs/" + ipfsHash)
      .then(res => res.json())
      .catch(err => null)
  );
  const manifestationsJSON = yield call(
    Promise.all.bind(Promise),
    manifestationsPromises
  );
  console.log(manifestationsJSON);

  for (let i = 0; i < returnValues.length; i++) {
    returnValues[i].token = tokenJSON[i];
    returnValues[i].name = tokenNames[i];
    returnValues[i].contract = contractAddress;
  }

  return returnValues;
}

export function* fetchTransactionsBatch(action) {
  const { web3, address, contracts } = action.payload;
  let results;
  try {
    results = yield all(
      contracts.map(contract =>
        call(fetchTransactions, web3, address, contract)
      )
    );
  } catch (err) {
    yield put(fetchTransactionsFailure(err));
  }
  const transactions = {};
  for (let [i, contract] of contracts.entries()) {
    transactions[contract] = results[i];
  }
  yield put(fetchTransactionsSuccess(transactions));
}

export function* fetchTransactionsWatcher() {
  yield takeEvery("FETCH_TRANSACTIONS_BEGIN", fetchTransactionsBatch);
}

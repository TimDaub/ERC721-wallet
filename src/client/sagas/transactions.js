// @format
import { put, takeLatest } from "redux-saga/effects";
import BigNumber from "bn.js";

import {
  fetchTransactionsSuccess,
  fetchTransactionsFailure
} from "../actions/index";
import getWeb3 from "../utils/getWeb3";

const erc721Methods = [
  "balanceOf(address)",
  "ownerOf(uint256)",
  "approve(address,uint256)",
  "getApproved(uint256)",
  "setApprovalForAll(address,bool)",
  "isApprovedForAll(address,address)",
  "transferFrom(address,address,uint256)",
  "safeTransferFrom(address,address,uint256)",
  "safeTransferFrom(address,address,uint256,bytes)"
];

const cryptoKittiesMethods = [
  "name()",
  "symbol()",
  "totalSupply()",
  "balanceOf(address)",
  "ownerOf(uint256)",
  "approve(address,uint256)",
  "transfer(address,uint256)",
  "transferFrom(address,address,uint256)",
  "tokensOfOwner(address)",
  "tokenMetadata(uint256,string)"
];

const erc165Interfaces = [erc721Methods, cryptoKittiesMethods];

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

  const web3 = yield getWeb3();
  const txPromises = result.map(tx => web3.eth.getTransaction(tx.hash));
  const txs = yield Promise.all(txPromises);
  const erc721TxsPromises = txs.map(supportsERC721);
  const isERC721 = yield Promise.all(erc721TxsPromises);
  for (let i = 0; i < isERC721.length; i++) {
    if (!isERC721[i]) {
      txs.splice(i, 1);
    }
  }

  console.log(txs);
  yield put(fetchTransactionsSuccess(txs));
}

async function generateERC165Hash(selectors) {
  const web3 = await getWeb3();
  let argsInterface = new BigNumber(0);
  for (let selector of selectors) {
    argsInterface = argsInterface.xor(
      new BigNumber(
        Number(await web3.eth.abi.encodeFunctionSignature(selector))
      )
    );
  }
  return argsInterface;
}
// Credit: https://github.com/jonathanBuhler/ethql/blob/feature/ERC165/src/model/core/EthqlAccount.ts#L28
async function supportsERC721(tx) {
  const web3 = await getWeb3();

  let erc165Hashes = [];
  for (let erc165Interface of erc165Interfaces) {
    erc165Hashes.push(generateERC165Hash(erc165Interface));
  }
  erc165Hashes = await Promise.all(erc165Hashes);

  let erc165CallPromises = [];
  for (let erc165Hash of erc165Hashes) {
    erc165CallPromises.push(
      web3.eth.call({
        to: tx.to,
        data: "0x01ffc9a7" + erc165Hashes[0].toString(16)
      })
    );
  }
  let erc165Rules = await Promise.all(erc165CallPromises);
  erc165Rules = erc165Rules.map(Number);

  const additionalContractRules = [
    [NaN, 0].includes(
      Number(await web3.eth.call({ to: tx.to, data: "0x01ffc9a701ffc9a7" }))
    ) ||
      [NaN, 1].includes(
        Number(await web3.eth.call({ to: tx.to, data: "0x01ffc9a7ffffffff" }))
      )
  ];

  const contractRules = [additionalContractRules, ...erc165Rules];
  return contractRules.reduce((initVal, currVal) => initVal && currVal);
}

export function* transactionsWatcher() {
  yield takeLatest("FETCH_TRANSACTIONS_BEGIN", fetchTransactions);
}

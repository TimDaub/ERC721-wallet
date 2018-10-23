// @format
import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import Web3 from "web3";

const fetchTransactions = require("../../src/sagas/transactions").__get__(
  "fetchTransactions"
);
import ERC721 from "../../src/abis/ERC721.json";
import config from "../../src/config";

describe("transaction fetching", () => {
  it("should process transactions correctly and return a token", async () => {
    const contractAddress = "0x9326f84fcca8a136da3a4f71bbffbde6635c58da";
    const address = "0x51Ff1fab76079d20418d1c74DA65653FfE3fD0aa";
    localStorage.setItem("tokens", contractAddress);

    config.web3 = {
      eth: {
        Contract: jest.fn(() => {
          return {
            getPastEvents: jest
              .fn()
              .mockReturnValueOnce([{ returnValues: { _tokenId: 1 } }]) //outputs
              .mockReturnValueOnce([{ returnValues: { _tokenId: 2 } }]), // inputs
            methods: {
              tokenURI: jest.fn(() => jest.fn(() => "https://example.com")),
              name: jest.fn(() => jest.fn(() => "name"))
            }
          };
        })
      }
    };

    const contract = new config.web3.eth.Contract(ERC721, contractAddress);
    return expectSaga(fetchTransactions, {
      payload: { address }
    })
      .put({
        type: "FETCH_TRANSACTIONS_SUCCESS",
        payload: {
          transactions: {
            [contractAddress]: [
              {
                _tokenId: 2,
                token: null,
                name: "name",
                contract: contractAddress
              }
            ]
          }
        }
      })
      .run();
  });

  it("should process transactions correctly and return no token", async () => {
    const contractAddress = "0x9326f84fcca8a136da3a4f71bbffbde6635c58da";
    const address = "0x51Ff1fab76079d20418d1c74DA65653FfE3fD0aa";
    localStorage.setItem("tokens", contractAddress);

    config.web3 = {
      eth: {
        Contract: jest.fn(() => {
          return {
            getPastEvents: jest
              .fn()
              .mockReturnValueOnce([{ returnValues: { _tokenId: 1 } }]) //outputs
              .mockReturnValueOnce([{ returnValues: { _tokenId: 1 } }]), // inputs
            methods: {
              tokenURI: jest.fn(() => jest.fn(() => "https://example.com")),
              name: jest.fn(() => jest.fn(() => "name"))
            }
          };
        })
      }
    };

    const contract = new config.web3.eth.Contract(ERC721, contractAddress);
    return expectSaga(fetchTransactions, {
      payload: { address }
    })
      .put({
        type: "FETCH_TRANSACTIONS_SUCCESS",
        payload: {
          transactions: {
            [contractAddress]: []
          }
        }
      })
      .run();
  });

  it("shouldn't process transactions but return an empty array", async () => {
    const contractAddress = "0x9326f84fcca8a136da3a4f71bbffbde6635c58da";
    const address = "0x51Ff1fab76079d20418d1c74DA65653FfE3fD0aa";

    const contract = new config.web3.eth.Contract(ERC721, contractAddress);
    return expectSaga(fetchTransactions, {
      payload: { address }
    })
      .put({
        type: "FETCH_TRANSACTIONS_SUCCESS",
        payload: {
          transactions: {
            [contractAddress]: []
          }
        }
      })
      .run();
  });
});

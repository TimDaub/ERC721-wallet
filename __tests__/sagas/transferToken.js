// @format
import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";

const transferToken = require("../../src/sagas/transferToken").__get__(
  "transferToken"
);

expectSaga.DEFAULT_TIMEOUT = 500;

jest.mock("ipfs-api", () => {
  return jest.fn().mockImplementation(() => {
    return {
      files: {
        add: jest.fn(() => [{ hash: "0xabc" }])
      }
    };
  });
});

describe("token transfer", () => {
  it("it transfers a token to an address", async () => {
    const from = "0x2418ECF0617EC94343afe7301c71E7E9dfC5E523";
    const to = "0x51Ff1fab76079d20418d1c74DA65653FfE3fD0aa";
    const token = {};
    const contract = "0x9326f84fcca8a136da3a4f71bbffbde6635c58da";

    const web3Mock = {
      eth: {
        Contract: jest.fn(() => {
          return {
            methods: {
              transferFrom: jest.fn(() => jest.fn(() => "transaction"))
            }
          };
        })
      }
    };

    const fileMock = {
      files: [new Blob([""], { type: "text/html" })]
    };

    const tokenHashMock = "0xabc";

    return expectSaga(transferToken, {
      payload: {
        web3: web3Mock,
        from,
        to,
        token,
        contract,
        file: fileMock,
        tokenHash: tokenHashMock
      }
    })
      .put({
        type: "TRANSFER_TOKEN_SUCCESS"
      })
      .run();
  });
});

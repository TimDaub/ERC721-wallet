// @format
import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";

const transferToken = require("../../src/sagas/transferToken").__get__(
  "transferToken"
);
import config from "../../src/config";

describe("token transfer", () => {
  it("it does transfer a token to an address", async () => {
    const from = "0x2418ECF0617EC94343afe7301c71E7E9dfC5E523";
    const to = "0x51Ff1fab76079d20418d1c74DA65653FfE3fD0aa";
    const tokenId = 0;
    const contract = "0x9326f84fcca8a136da3a4f71bbffbde6635c58da";

    config.web3 = {
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

    return expectSaga(transferToken, {
      payload: { from, to, tokenId, contract }
    })
      .put({
        type: "TRANSFER_TOKEN_SUCCESS"
      })
      .run();
  });
});

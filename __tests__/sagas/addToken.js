// @format
import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";

const addToken = require("../../src/sagas/addToken").__get__("addToken");

describe("token adding", () => {
  it("it should add a token to local storage", async () => {
    const contract = "0x9326f84fcca8a136da3a4f71bbffbde6635c58da";

    return expectSaga(addToken, {
      payload: { contract }
    })
      .put({
        type: "ADD_TOKEN_SUCCESS",
        payload: {
          contracts: contract
        }
      })
      .run();
  });

  it("it should add two token to local storage", async () => {
    const contract1 = "0x9326f84fcca8a136da3a4f71bbffbde6635c58da";
    const contract2 = "0x06012c8cf97bead5deae237070f9587f8e7a266d";

    expectSaga(addToken, {
      payload: { contract: contract1 }
    });
    return expectSaga(addToken, {
      payload: { contract: contract2 }
    })
      .put({
        type: "ADD_TOKEN_SUCCESS",
        payload: {
          contracts: `${contract1},${contract2}`
        }
      })
      .run();
  });
});

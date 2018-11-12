// @format
import { take, put, takeLatest, call } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import IPFS from "ipfs-api";
import buffer from "buffer";

import {
  transferTokenSuccess,
  transferTokenFailure
} from "../actions/transferToken";
import ERC721 from "../abis/ERC721.json";
import config from "../config";

const ipfs = IPFS(config.ipfsGateway, "5001", { protocol: "https" });

function upload(file) {
  return eventChannel(emit => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const buf = buffer.Buffer(reader.result);
      let result;
      try {
        result = await ipfs.files.add(buf, { pin: true });
      } catch (err) {
        emit(err);
      }
      emit(result[0].hash);
      emit(END);
    };
    reader.readAsArrayBuffer(file.files[0]);
    return () => {};
  });
}

function* transferToken({
  payload: { web3, from, to, token, contract, file, tokenHash }
}) {
  const chan = yield call(upload, file);
  let licenseHash;
  try {
    licenseHash = yield take(chan);
  } catch (err) {
    yield put(transferTokenFailure(err));
  }

  const newToken = Object.assign(token, {
    license: licenseHash,
    source: tokenHash
  });
  const res = yield call(
    ipfs.files.add,
    Buffer.from(JSON.stringify(newToken)),
    { pin: true }
  );
  const newTokenHash = res[0].hash;

  var erc721Contract = new web3.eth.Contract(ERC721, contract);
  let tx;
  try {
    tx = yield erc721Contract.methods
      .mint(to, `https://${config.ipfsGateway}/ipfs/${newTokenHash}`)
      .send({
        from: from
      });
  } catch (err) {
    yield put(transferTokenFailure(err));
  }
  yield put(transferTokenSuccess());
}

export function* transferTokenWatcher() {
  yield takeLatest("TRANSFER_TOKEN_BEGIN", transferToken);
}

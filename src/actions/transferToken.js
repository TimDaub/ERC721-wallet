// @format
export const TRANSFER_TOKEN_BEGIN = "TRANSFER_TOKEN_BEGIN";
export const TRANSFER_TOKEN_SUCCESS = "TRANSFER_TOKEN_SUCCESS";
export const TRANSFER_TOKEN_FAILURE = "TRANFER_TOKEN_FAILURE";

export const transferTokenBegin = (
  web3,
  from,
  to,
  tokenId,
  contract,
  provider,
  path,
  networkId,
  gasPrice
) => ({
  type: TRANSFER_TOKEN_BEGIN,
  payload: {
    web3,
    from,
    to,
    tokenId,
    contract,
    provider,
    path,
    networkId,
    gasPrice
  }
});

export const transferTokenSuccess = txHash => ({
  type: TRANSFER_TOKEN_SUCCESS,
  payload: { txHash }
});

export const transferTokenFailure = error => ({
  type: TRANSFER_TOKEN_FAILURE,
  payload: { error }
});

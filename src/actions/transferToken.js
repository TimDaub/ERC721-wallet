// @format
export const TRANSFER_TOKEN_BEGIN = "TRANSFER_TOKEN_BEGIN";
export const TRANSFER_TOKEN_SUCCESS = "TRANSFER_TOKEN_SUCCESS";
export const TRANSFER_TOKEN_FAILURE = "TRANFER_TOKEN_FAILURE";

export const transferTokenBegin = (from, to, tokenId, contract) => ({
  type: TRANSFER_TOKEN_BEGIN,
  payload: { from, to, tokenId, contract }
});

export const transferTokenSuccess = () => ({
  type: TRANSFER_TOKEN_SUCCESS
});

export const transferTokenFailure = error => ({
  type: TRANSFER_TOKEN_FAILURE,
  payload: { error }
});

export const TRANSFER_TOKEN_BEGIN = "TRANSFER_TOKEN_BEGIN";
export const TRANSFER_TOKEN_SUCCESS = "TRANSFER_TOKEN_SUCCESS";
export const TRANSFER_TOKEN_FAILURE = "TRANFER_TOKEN_FAILURE";

export const transferTokenBegin = (from, to, tokenId) => ({
  type: TRANSFER_TOKEN_BEGIN,
  payload: { from, to, tokenId }
});

export const transferTokenSuccess = transaction => ({
  type: TRANSFER_TOKEN_SUCCESS,
  payload: { transaction }
});

export const transferTokenFailure = error => ({
  type: TRANSFER_TOKEN_FAILURE,
  payload: { error }
});

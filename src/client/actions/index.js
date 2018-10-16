// @format
import axios from "axios";

export const FETCH_TRANSACTIONS_BEGIN = "FETCH_TRANSACTIONS_BEGIN";
export const FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS";
export const FETCH_TRANSACTIONS_FAILURE = "FETCH_TRANSACTIONS_FAILURE";

export const TRANSFER_TOKEN_BEGIN = "TRANSFER_TOKEN_BEGIN";
export const TRANSFER_TOKEN_SUCCESS = "TRANSFER_TOKEN_SUCCESS";
export const TRANSFER_TOKEN_FAILURE = "TRANFER_TOKEN_FAILURE";

export const fetchTransactionsBegin = address => ({
  type: FETCH_TRANSACTIONS_BEGIN,
  payload: { address }
});

export const fetchTransactionsSuccess = transactions => ({
  type: FETCH_TRANSACTIONS_SUCCESS,
  payload: { transactions }
});

export const fetchTransactionsFailure = error => ({
  type: FETCH_TRANSACTIONS_FAILURE,
  payload: { error }
});

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

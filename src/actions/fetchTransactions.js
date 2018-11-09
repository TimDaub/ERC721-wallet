export const FETCH_TRANSACTIONS_BEGIN = "FETCH_TRANSACTIONS_BEGIN";
export const FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS";
export const FETCH_TRANSACTIONS_FAILURE = "FETCH_TRANSACTIONS_FAILURE";

export const fetchTransactionsBegin = (web3, address, contracts) => ({
  type: FETCH_TRANSACTIONS_BEGIN,
  payload: { web3, address, contracts }
});

export const fetchTransactionsSuccess = transactions => ({
  type: FETCH_TRANSACTIONS_SUCCESS,
  payload: { transactions }
});

export const fetchTransactionsFailure = error => ({
  type: FETCH_TRANSACTIONS_FAILURE,
  payload: { error }
});

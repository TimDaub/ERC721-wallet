import {
  FETCH_TRANSACTIONS_BEGIN,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
} from '../actions/fetchTransactions'

const initialState = {
  items: [],
  loading: false,
  error: null
}

export default function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.transactions
      }

    case FETCH_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      }

    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}

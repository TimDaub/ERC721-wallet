// @format
import {
  TRANSFER_TOKEN_BEGIN,
  TRANSFER_TOKEN_SUCCESS,
  TRANSFER_TOKEN_FAILURE
} from "../actions/transferToken";

const initialState = {
  txHash: null,
  loading: false,
  error: null
};

export default function transferTokenReducer(state = initialState, action) {
  switch (action.type) {
    case TRANSFER_TOKEN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case TRANSFER_TOKEN_SUCCESS:
      return {
        ...state,
        txHash: action.payload.txHash,
        loading: false
      };

    case TRANSFER_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

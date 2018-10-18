// @format
import {
  ADD_TOKEN_BEGIN,
  ADD_TOKEN_SUCCESS,
  ADD_TOKEN_FAILURE
} from "../actions/addToken";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function addTokenReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TOKEN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ADD_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.contracts
      };

    case ADD_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

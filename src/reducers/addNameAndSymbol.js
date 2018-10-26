// @format
import {
  ADD_NAME_AND_SYMBOL_BEGIN,
  ADD_NAME_AND_SYMBOL_SUCCESS,
  ADD_NAME_AND_SYMBOL_FAILURE,
  ADD_NAME_AND_SYMBOL_RESET
} from "../actions/addNameAndSymbol";

const initialState = {
  name: "",
  symbol: "",
  loading: false,
  error: null
};

export default function addTokenReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NAME_AND_SYMBOL_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ADD_NAME_AND_SYMBOL_SUCCESS:
      return {
        ...state,
        loading: false,
        name: action.payload.name,
        symbol: action.payload.symbol
      };

    case ADD_NAME_AND_SYMBOL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case ADD_NAME_AND_SYMBOL_RESET:
      state = initialState;
      return {
        ...state,
        loading: false,
        error: null
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

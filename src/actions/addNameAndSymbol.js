// @format
export const ADD_NAME_AND_SYMBOL_BEGIN = "ADD_NAME_AND_SYMBOL_BEGIN";
export const ADD_NAME_AND_SYMBOL_SUCCESS = "ADD_NAME_AND_SYMBOL_SUCCESS";
export const ADD_NAME_AND_SYMBOL_FAILURE = "ADD_NAME_AND_SYMBOL_FAILURE";
export const ADD_NAME_AND_SYMBOL_RESET = "ADD_NAME_AND_SYMBOL_RESET";

export const addNameAndSymbolBegin = contract => ({
  type: ADD_NAME_AND_SYMBOL_BEGIN,
  payload: { contract }
});

export const addNameAndSymbolSuccess = (name, symbol) => ({
  type: ADD_NAME_AND_SYMBOL_SUCCESS,
  payload: { name, symbol }
});

export const addNameAndSymbolFailure = error => ({
  type: ADD_NAME_AND_SYMBOL_FAILURE,
  payload: { error }
});

export const addNameAndSymbolReset = () => ({
  type: ADD_NAME_AND_SYMBOL_RESET,
  payload: {}
});

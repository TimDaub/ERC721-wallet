export const ADD_TOKEN_BEGIN = "ADD_TOKEN_BEGIN";
export const ADD_TOKEN_SUCCESS = "ADD_TOKEN_SUCCESS";
export const ADD_TOKEN_FAILURE = "ADD_TOKEN_FAILURE";

export const addTokenBegin = contract => ({
  type: ADD_TOKEN_BEGIN,
  payload: { contract }
});

export const addTokenSuccess = () => ({
  type: ADD_TOKEN_SUCCESS,
  payload: {}
});

export const addTokenFailure = error => ({
  type: ADD_TOKEN_FAILURE,
  payload: { error }
});

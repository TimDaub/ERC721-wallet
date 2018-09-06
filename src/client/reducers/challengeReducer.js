import {
  FETCH_CHALLENGE_BEGIN,
  FETCH_CHALLENGE_SUCCESS,
  FETCH_CHALLENGE_FAILURE,
} from '../actions/index.js';

const initialState = {
  challenge: '',
  loading: false,
  error: null
};

export default function challengeReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_CHALLENGE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CHALLENGE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.challenge
      };

    case FETCH_CHALLENGE_FAILURE:
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

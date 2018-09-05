import axios from 'axios'

export const FETCH_CHALLENGE_BEGIN   = 'FETCH_CHALLENGE_BEGIN';
export const FETCH_CHALLENGE_SUCCESS = 'FETCH_CHALLENGE_SUCCESS';
export const FETCH_CHALLENGE_FAILURE = 'FETCH_CHALLENGE_FAILURE';

export const fetchChallengeBegin = () => ({
    type: FETCH_CHALLENGE_BEGIN
});

export const fetchChallengeSuccess = challenge => ({
    type: FETCH_CHALLENGE_SUCCESS,
    payload: { challenge }
});

export const fetchChallengeError = error => ({
    type: FETCH_CHALLENGE_FAILURE,
    payload: { error }
});


export function fetchChallenge() {
  return dispatch => {
    dispatch(fetchChallengeBegin());
    return axios.get("/api/auth/" + web3.eth.accounts[0])
      .then(res => {
        res = res.data[1]
        dispatch(fetchChallengeSuccess(res));
      })
      .catch(error => dispatch(fetchChallengeError(error)));
  };
}

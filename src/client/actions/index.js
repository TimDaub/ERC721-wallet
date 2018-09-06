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
    dispatch(fetchChallengeBegin())
    return axios.get("/api/auth/" + web3.eth.accounts[0])
      .then(res => {
        const challenge = res.data
        const from = web3.eth.accounts[0]
        const params = [challenge, from]
        const method = 'eth_signTypedData'
        web3.currentProvider.sendAsync({
          method,
          params,
          from
        }, async (err, result) => {
          const signature = result.result
          if (err) {
            dispatch(fetchChallengeError(error))
          }
          if (result.error) {
            dispatch(fetchChallengeError(error))
          }
          axios.get('/api/auth/' + challenge[1].value + '/' + signature)
            .then(res => {
              if (res.data === web3.eth.accounts[0]) {
                dispatch(fetchChallengeSuccess(res))
              } else {
                dispatch(fetchChallengeError(
                  new Error("Couldn't authenticate")
                ))
              }
            })
        })
      })
      .catch(error => dispatch(fetchChallengeError(error)))
  }
}

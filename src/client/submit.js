import axios from 'axios'
import { SubmissionError } from 'redux-form'

export function submitSignUp(values) {
  return axios.post('/api/users', values)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
        throw new SubmissionError(err)
    })
}

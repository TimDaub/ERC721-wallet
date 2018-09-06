import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import challengeReducer from './challengeReducer'

const rootReducer = combineReducers({
  form: formReducer,
  challenge: challengeReducer
})

export default rootReducer

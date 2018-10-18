import { combineReducers } from 'redux'
import transactionsReducer from './transactionsReducer'
import addTokenReducer from './addTokenReducer'

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  contracts: addTokenReducer
})

export default rootReducer

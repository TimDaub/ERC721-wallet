import { combineReducers } from 'redux'
import transactionsReducer from './transactionsReducer'

const rootReducer = combineReducers({
  transactions: transactionsReducer
})

export default rootReducer

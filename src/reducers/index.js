import { combineReducers } from 'redux'
import transactionsReducer from './transactionsReducer'
import addTokenReducer from './addTokenReducer'
import addNameAndSymbol from './addNameAndSymbol'

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  contracts: addTokenReducer,
  contractMetadata: addNameAndSymbol
})

export default rootReducer

import { combineReducers } from 'redux'
import transactionsReducer from './transactionsReducer'
import addTokenReducer from './addTokenReducer'
import addNameAndSymbol from './addNameAndSymbol'
import transferTokenReducer from './transferTokenReducer'

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  contracts: addTokenReducer,
  contractMetadata: addNameAndSymbol,
  transfer: transferTokenReducer
})

export default rootReducer

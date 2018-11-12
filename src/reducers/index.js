// @format
import { combineReducers } from "redux";
import transactionsReducer from "./transactionsReducer";
import transferTokenReducer from "./transferTokenReducer";

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  transfer: transferTokenReducer
});

export default rootReducer;

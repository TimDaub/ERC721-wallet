import { all } from 'redux-saga/effects'
import { transactionsWatcher } from './transactions'

export default function* root() {
  yield all([
      transactionsWatcher(),
  ])
}

import { all } from 'redux-saga/effects'
import { transactionsWatcher } from './transactions'
import { transferTokenWatcher } from './transferToken'

export default function* root() {
  yield all([
      transactionsWatcher(),
      transferTokenWatcher(),
  ])
}

import { all } from 'redux-saga/effects'
import watchInitApp from '@/store/sagas/initAppSaga'

export default function* rootSaga() {
  yield all([watchInitApp()])
}

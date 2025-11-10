import { all } from 'redux-saga/effects';
import watchInitApp from '@/store/sagas/initAppSaga';
import localStorageSaga from '@/store/sagas/localStorageSaga';
import postsSaga from '@/store/sagas/postsSaga';
import commentsSaga from '@/store/sagas/commentsSaga';

export default function* rootSaga(): Generator {
  yield all([watchInitApp(), localStorageSaga(), postsSaga(), commentsSaga()]);
}

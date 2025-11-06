import { takeLatest } from 'redux-saga/effects'
import { initApp } from '@/store/actions/appActions'

function* initializeApp() {
  try {
    yield console.log('Saga is running')
  } catch (error) {
    console.error('Error in initializeApp:', error)
  }
}

function* watchInitApp() {
  yield takeLatest(initApp.type, initializeApp)
}

export default watchInitApp

import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { settingsReducer } from '@/store/reducers/settings'
import rootSaga from '@/store/sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(rootSaga)

export default store

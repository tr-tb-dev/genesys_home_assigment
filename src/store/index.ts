import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import settingsReducer from '@/store/reducers/settings/settings-reducer';
import appReducer from '@/store/reducers/app/app-reducer';
import postsReducer from '@/store/reducers/posts/posts-reducer';
import commentsReducer from '@/store/reducers/comments/comments-reducer';
import rootSaga from '@/store/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    settings: settingsReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

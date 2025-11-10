import { takeLatest, put, call, take, fork, cancel } from 'redux-saga/effects';
import { eventChannel, EventChannel, Task } from 'redux-saga';
import { hackernewsAPI } from '@/services/hackernews';
import {
  fetchNewPosts,
  fetchNewPostsSuccess,
  fetchNewPostsFailure,
  fetchTopPosts,
  fetchTopPostsSuccess,
  fetchTopPostsFailure,
  loadNewPostItem,
  loadTopPostItem,
  updateNewPostItem,
  updateTopPostItem,
} from '@/store/reducers/posts/posts-actions';
import type { HNItem, HNItemId } from '@/types/hackernews';
import { paginateArray } from '@/helpers/paginationHelper';
import { getErrorMessage } from '@/helpers/errorHelper';
import { getPostsPerPage } from '@/helpers/configHelper';

const POSTS_PER_PAGE = getPostsPerPage();

let newPostTasks: Task[] = [];
let topPostTasks: Task[] = [];

function createItemChannel(itemId: HNItemId): EventChannel<HNItem> {
  return eventChannel((emitter) => {
    const unsubscribe = hackernewsAPI.subscribeToItem(itemId, (item) => {
      if (item) {
        emitter(item);
      }
    });
    return unsubscribe;
  });
}

function* handleFetchNewPosts(action: ReturnType<typeof fetchNewPosts>): Generator {
  try {
    for (const task of newPostTasks) {
      yield cancel(task);
    }
    newPostTasks = [];

    const page = action.payload?.page || 1;
    const allPostIds: HNItemId[] = yield call(hackernewsAPI.getNewPostIds);

    const { paginatedItems: pagePostIds, totalPages } = paginateArray(allPostIds, page, POSTS_PER_PAGE);

    const items = pagePostIds.map((id) => ({ id }));

    yield put(
      fetchNewPostsSuccess({
        items,
        page,
        totalPages,
      })
    );

    for (let i = 0; i < pagePostIds.length; i++) {
      const item: HNItem = yield call(hackernewsAPI.getItem, pagePostIds[i]);
      if (item) {
        yield put(loadNewPostItem({ item, index: i }));
      }
      const task: Task = yield fork(watchNewPostItem, pagePostIds[i], i);
      newPostTasks.push(task);
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch new posts');
    yield put(fetchNewPostsFailure(errorMessage));
  }
}

function* handleFetchTopPosts(action: ReturnType<typeof fetchTopPosts>): Generator {
  try {
    for (const task of topPostTasks) {
      yield cancel(task);
    }
    topPostTasks = [];

    const page = action.payload?.page || 1;
    const allPostIds: HNItemId[] = yield call(hackernewsAPI.getTopPostIds);

    const { paginatedItems: pagePostIds, totalPages } = paginateArray(allPostIds, page, POSTS_PER_PAGE);

    const items = pagePostIds.map((id) => ({ id }));

    yield put(
      fetchTopPostsSuccess({
        items,
        page,
        totalPages,
      })
    );

    for (let i = 0; i < pagePostIds.length; i++) {
      const item: HNItem = yield call(hackernewsAPI.getItem, pagePostIds[i]);
      if (item) {
        yield put(loadTopPostItem({ item, index: i }));
      }
      const task: Task = yield fork(watchTopPostItem, pagePostIds[i], i);
      topPostTasks.push(task);
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch top posts');
    yield put(fetchTopPostsFailure(errorMessage));
  }
}

function* watchNewPostItem(itemId: HNItemId, index: number): Generator {
  const channel: EventChannel<HNItem> = yield call(createItemChannel, itemId);
  try {
    while (true) {
      const item: HNItem = yield take(channel);
      yield put(updateNewPostItem({ item, index }));
    }
  } finally {
    channel.close();
  }
}

function* watchTopPostItem(itemId: HNItemId, index: number): Generator {
  const channel: EventChannel<HNItem> = yield call(createItemChannel, itemId);
  try {
    while (true) {
      const item: HNItem = yield take(channel);
      yield put(updateTopPostItem({ item, index }));
    }
  } finally {
    channel.close();
  }
}

export default function* postsSaga(): Generator {
  yield takeLatest(fetchNewPosts.type, handleFetchNewPosts);
  yield takeLatest(fetchTopPosts.type, handleFetchTopPosts);
}

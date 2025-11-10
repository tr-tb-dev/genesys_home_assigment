import { takeLatest, takeEvery, put, call } from 'redux-saga/effects';
import { hackernewsAPI } from '@/services/hackernews';
import {
  fetchComments,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  loadCommentItem,
  updateCommentItem,
} from '@/store/reducers/comments/comments-actions';
import type { HNItemId } from '@/types/hackernews';
import { getErrorMessage } from '@/helpers/errorHelper';

function* handleFetchComments(action: ReturnType<typeof fetchComments>): Generator {
  try {
    const parentId = action.payload;

    if (!parentId) {
      yield put(fetchCommentsSuccess([]));
      return;
    }

    const parentItem = yield call(hackernewsAPI.getItem, parentId);

    if (!parentItem || !parentItem.kids || parentItem.kids.length === 0) {
      yield put(fetchCommentsSuccess([]));
      return;
    }

    const commentIds = parentItem.kids;
    const initialComments = commentIds.map((id: HNItemId) => ({ id }));

    yield put(fetchCommentsSuccess(initialComments));

    for (const commentId of commentIds) {
      yield put(loadCommentItem(commentId));
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    yield put(fetchCommentsFailure(errorMessage));
  }
}

function* handleLoadCommentItem(action: ReturnType<typeof loadCommentItem>): Generator {
  try {
    const itemId = action.payload;

    if (!itemId) {
      return;
    }

    const item = yield call(hackernewsAPI.getItem, itemId);

    if (item) {
      yield put(updateCommentItem(item));

      if (item.kids && item.kids.length > 0) {
        for (const childId of item.kids) {
          yield put(loadCommentItem(childId));
        }
      }
    }
  } catch (error) {
    console.error('Error loading comment item:', error);
  }
}

export default function* commentsSaga() {
  yield takeLatest(fetchComments.type, handleFetchComments);
  yield takeEvery(loadCommentItem.type, handleLoadCommentItem);
}

import { CommentsState } from '@/types/hackernews';
import { Action } from '@/helpers/actionHelper';
import {
  fetchComments,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  updateCommentItem,
  resetComments,
} from './comments-actions';

const initialState: CommentsState = {
  items: [],
  loading: false,
  error: null,
  parentId: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CommentsAction = Action<any>;

const _fetchComments = (state: CommentsState, action: CommentsAction): CommentsState => ({
  ...state,
  loading: true,
  error: null,
  parentId: action.payload,
});

const _fetchCommentsSuccess = (state: CommentsState, action: CommentsAction): CommentsState => ({
  ...state,
  items: action.payload,
  loading: false,
  error: null,
});

const _fetchCommentsFailure = (state: CommentsState, action: CommentsAction): CommentsState => ({
  ...state,
  loading: false,
  error: action.payload,
});

const _updateCommentItem = (state: CommentsState, action: CommentsAction): CommentsState => {
  const updatedItem = action.payload;
  const itemIndex = state.items.findIndex((item) => item.id === updatedItem.id);

  if (itemIndex === -1) {
    return {
      ...state,
      items: [...state.items, updatedItem],
    };
  }

  const updatedItems = [...state.items];
  updatedItems[itemIndex] = updatedItem;

  return {
    ...state,
    items: updatedItems,
  };
};

const _resetComments = (): CommentsState => initialState;

type ReducerMap = {
  [key: string]: (state: CommentsState, action: CommentsAction) => CommentsState;
};

const reducers: ReducerMap = {
  [fetchComments.type]: _fetchComments,
  [fetchCommentsSuccess.type]: _fetchCommentsSuccess,
  [fetchCommentsFailure.type]: _fetchCommentsFailure,
  [updateCommentItem.type]: _updateCommentItem,
  [resetComments.type]: _resetComments,
};

const commentsReducer = (state = initialState, action: CommentsAction): CommentsState =>
  reducers[action.type] ? reducers[action.type](state, action) : state;

export default commentsReducer;

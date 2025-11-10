import { makeActionCreator } from '@/helpers/actionHelper';
import { HNItem } from '@/types/hackernews';

export const fetchComments = makeActionCreator<number>('COMMENTS_FETCH');
export const fetchCommentsSuccess = makeActionCreator<Partial<HNItem>[]>('COMMENTS_FETCH_SUCCESS');
export const fetchCommentsFailure = makeActionCreator<string>('COMMENTS_FETCH_FAILURE');
export const loadCommentItem = makeActionCreator<number>('COMMENTS_LOAD_ITEM');
export const updateCommentItem = makeActionCreator<Partial<HNItem>>('COMMENTS_UPDATE_ITEM');
export const resetComments = makeActionCreator('COMMENTS_RESET');

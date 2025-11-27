import { useSelector } from 'react-redux';
import { selectDataSource } from '@/store/reducers/settings/settings-selectors';
import { DataSource } from '@/enums/settings';
import Comments from './Comments';
import CommentsTanStack from './CommentsTanStack';

function CommentsWrapper() {
  const dataSource = useSelector(selectDataSource);

  return dataSource === DataSource.TanStack ? <CommentsTanStack /> : <Comments />;
}

export default CommentsWrapper;

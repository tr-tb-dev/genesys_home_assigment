import { useSelector } from 'react-redux';
import { selectDataSource } from '@/store/reducers/settings/settings-selectors';
import { DataSource } from '@/enums/settings';
import TopPosts from './TopPosts';
import TopPostsTanStack from './TopPostsTanStack';

function TopPostsWrapper() {
  const dataSource = useSelector(selectDataSource);

  return dataSource === DataSource.TanStack ? <TopPostsTanStack /> : <TopPosts />;
}

export default TopPostsWrapper;

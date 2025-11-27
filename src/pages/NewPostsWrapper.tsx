import { useSelector } from 'react-redux';
import { selectDataSource } from '@/store/reducers/settings/settings-selectors';
import { DataSource } from '@/enums/settings';
import NewPosts from './NewPosts';
import NewPostsTanStack from './NewPostsTanStack';

function NewPostsWrapper() {
  const dataSource = useSelector(selectDataSource);

  return dataSource === DataSource.TanStack ? <NewPostsTanStack /> : <NewPosts />;
}

export default NewPostsWrapper;

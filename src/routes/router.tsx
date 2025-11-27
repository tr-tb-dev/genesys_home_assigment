import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import NewPostsWrapper from '@/pages/NewPostsWrapper';
import TopPostsWrapper from '@/pages/TopPostsWrapper';
import CommentsWrapper from '@/pages/CommentsWrapper';
import NotFound from '@/pages/NotFound';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <NewPostsWrapper />,
        },
        {
          path: 'top',
          element: <TopPostsWrapper />,
        },
        {
          path: 'comments/:postId',
          element: <CommentsWrapper />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

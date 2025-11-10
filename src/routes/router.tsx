import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import NewPosts from '@/pages/NewPosts';
import TopPosts from '@/pages/TopPosts';
import Comments from '@/pages/Comments';
import NotFound from '@/pages/NotFound';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <NewPosts />,
        },
        {
          path: 'top',
          element: <TopPosts />,
        },
        {
          path: 'comments/:postId',
          element: <Comments />,
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

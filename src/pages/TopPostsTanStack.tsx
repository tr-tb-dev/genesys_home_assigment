import { useSearchParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { selectViewMode } from '@/store/reducers/settings/settings-selectors';
import { ViewMode } from '@/enums/settings';
import PostListItem from '@/components/posts/PostListItem/PostListItem';
import PostGridItem from '@/components/posts/PostGridItem/PostGridItem';
import Pagination from '@/components/posts/Pagination/Pagination';
import { getPageFromUrl } from '@/helpers/urlHelper';
import { calculateStartRank } from '@/helpers/paginationHelper';
import { getPostsPerPage } from '@/helpers/configHelper';
import { HNItem, HNItemId } from '@/types/hackernews';

const POSTS_PER_PAGE = getPostsPerPage();
const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';

async function fetchTopPostIds(): Promise<HNItemId[]> {
  const response = await fetch(`${API_BASE_URL}/topstories.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch top post IDs: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function fetchItem(id: HNItemId): Promise<HNItem | null> {
  const response = await fetch(`${API_BASE_URL}/item/${id}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch item ${id}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function fetchTopPosts(page: number): Promise<{ posts: HNItem[]; totalPages: number }> {
  const allPostIds = await fetchTopPostIds();
  const totalPages = Math.ceil(allPostIds.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const pagePostIds = allPostIds.slice(startIndex, endIndex);

  const posts = await Promise.all(
    pagePostIds.map(async (id) => {
      const item = await fetchItem(id);
      return item;
    })
  );

  return { posts: posts.filter((item): item is HNItem => item !== null), totalPages };
}

function TopPostsTanStack() {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewMode = useSelector(selectViewMode);
  const pageFromUrl = getPageFromUrl(searchParams);

  const { data, isLoading, error } = useQuery({
    queryKey: ['topPosts', pageFromUrl],
    queryFn: () => fetchTopPosts(pageFromUrl),
    staleTime: 60000,
    retry: 2,
  });

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startRank = calculateStartRank(pageFromUrl, POSTS_PER_PAGE);
  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 0;

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <FormattedMessage id="topPosts.title" />
      </Typography>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error instanceof Error ? error.message : 'An error occurred'}
        </Alert>
      )}

      {!isLoading && !error && posts.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          No posts found.
        </Typography>
      )}

      {!isLoading && posts.length > 0 && (
        <>
          {viewMode === ViewMode.List ? (
            <>
              {posts.map((post, index) => (
                <PostListItem key={post.id} item={post} rank={startRank + index} />
              ))}
            </>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              {posts.map((post, index) => (
                <PostGridItem key={post.id} item={post} rank={startRank + index} />
              ))}
            </Box>
          )}
          <Pagination currentPage={pageFromUrl} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </Box>
  );
}

export default TopPostsTanStack;

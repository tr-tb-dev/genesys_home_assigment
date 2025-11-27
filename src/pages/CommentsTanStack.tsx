import { useMemo, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Box, Typography, CircularProgress, Alert, Button, Card, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useQuery } from '@tanstack/react-query';
import { formatRelativeTime } from '@/helpers/timeHelper';
import type { HNItem, HNItemId } from '@/types/hackernews';

const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';

async function fetchItem(id: HNItemId): Promise<HNItem | null> {
  const response = await fetch(`${API_BASE_URL}/item/${id}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch item ${id}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function fetchCommentsRecursively(itemId: HNItemId): Promise<Partial<HNItem>[]> {
  const item = await fetchItem(itemId);
  if (!item) return [];

  const comments: Partial<HNItem>[] = [];

  if (item.kids && item.kids.length > 0) {
    const childComments = await Promise.all(
      item.kids.map(async (kidId) => {
        const kidItem = await fetchItem(kidId);
        if (!kidItem) return [];

        const nestedComments = kidItem.kids ? await fetchCommentsRecursively(kidId) : [];
        return [kidItem, ...nestedComments];
      })
    );

    comments.push(...childComments.flat());
  }

  return comments;
}

async function fetchPostComments(postId: number): Promise<Partial<HNItem>[]> {
  const post = await fetchItem(postId);
  if (!post || !post.kids || post.kids.length === 0) {
    return [];
  }

  const allComments = await Promise.all(
    post.kids.map(async (kidId) => {
      const topLevelComment = await fetchItem(kidId);
      if (!topLevelComment) return [];

      const nestedComments = topLevelComment.kids ? await fetchCommentsRecursively(kidId) : [];
      return [topLevelComment, ...nestedComments];
    })
  );

  return allComments.flat();
}

interface CommentItemProps {
  item: Partial<HNItem>;
  allComments: Partial<HNItem>[];
  depth?: number;
}

function CommentItem({ item, allComments, depth = 0 }: CommentItemProps) {
  const intl = useIntl();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const links = contentRef.current.querySelectorAll('a');
      links.forEach((link) => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    }
  }, [item.text]);

  const childComments = useMemo(() => {
    if (!item.kids || item.kids.length === 0) {
      return [];
    }
    return item.kids
      .map((kidId) => allComments.find((c) => c.id === kidId))
      .filter((c): c is Partial<HNItem> => c !== undefined);
  }, [item.kids, allComments]);

  if (!item.text && !item.deleted) {
    return null;
  }

  return (
    <Box marginLeft={depth * 0.8} role="article" aria-label={`Comment by ${item.by || 'user'}`}>
      <Card sx={{ marginBottom: 2 }} data-testid="comment-item">
        <CardContent>
          <Box display="flex" gap={2} marginBottom={1}>
            {item.by && (
              <Typography variant="body2" fontWeight="bold">
                {item.by}
              </Typography>
            )}
            {item.time && (
              <Typography variant="caption" color="text.secondary">
                {formatRelativeTime(item.time, intl)}
              </Typography>
            )}
          </Box>

          {item.deleted ? (
            <Typography variant="body2" color="text.secondary" fontStyle="italic">
              [deleted]
            </Typography>
          ) : (
            item.text && (
              <Typography
                ref={contentRef}
                variant="body2"
                component="div"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            )
          )}
        </CardContent>
      </Card>

      {childComments.map((childComment) => (
        <CommentItem key={childComment.id} item={childComment} allComments={allComments} depth={depth + 1} />
      ))}
    </Box>
  );
}

function CommentsTanStack() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const postIdNum = postId ? parseInt(postId, 10) : 0;

  const { data: comments = [], isLoading, error } = useQuery({
    queryKey: ['comments', postIdNum],
    queryFn: () => fetchPostComments(postIdNum),
    enabled: !!postId,
    staleTime: 300000,
    retry: 2,
  });

  const topLevelComments = useMemo(() => {
    if (!postId) return [];
    return comments.filter((comment) => comment.parent === postIdNum);
  }, [comments, postId, postIdNum]);

  return (
    <Box maxWidth="1200px" margin="0 auto" padding={3}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ marginBottom: 2 }} aria-label="Go back">
        <FormattedMessage id="comments.back" />
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        <FormattedMessage id="comments.title" />
      </Typography>

      {isLoading && (
        <Box display="flex" justifyContent="center" marginY={4} role="status" aria-live="polite">
          <CircularProgress aria-label="Loading comments" />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error instanceof Error ? error.message : 'An error occurred'}
        </Alert>
      )}

      {!isLoading && !error && topLevelComments.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          <FormattedMessage id="comments.noComments" />
        </Typography>
      )}

      {!isLoading && topLevelComments.length > 0 && (
        <Box role="list" aria-label="Comments list">
          {topLevelComments.map((comment) => (
            <CommentItem key={comment.id} item={comment} allComments={comments} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default CommentsTanStack;

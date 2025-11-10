import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Box, Typography, CircularProgress, Alert, Button, Card, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchComments } from '@/store/reducers/comments/comments-actions';
import {
  selectComments,
  selectCommentsLoading,
  selectCommentsError,
} from '@/store/reducers/comments/comments-selectors';
import { formatRelativeTime } from '@/helpers/timeHelper';
import { useIntl } from 'react-intl';
import type { HNItem } from '@/types/hackernews';

interface CommentItemProps {
  item: Partial<HNItem>;
  allComments: Partial<HNItem>[];
  depth?: number;
}

function CommentItem({ item, allComments, depth = 0 }: CommentItemProps) {
  const intl = useIntl();

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
    <Box marginLeft={depth * 3} role="article" aria-label={`Comment by ${item.by || 'user'}`}>
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
            item.text && <Typography variant="body2" component="div" dangerouslySetInnerHTML={{ __html: item.text }} />
          )}
        </CardContent>
      </Card>

      {childComments.map((childComment) => (
        <CommentItem key={childComment.id} item={childComment} allComments={allComments} depth={depth + 1} />
      ))}
    </Box>
  );
}

function Comments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const comments = useSelector(selectComments);
  const loading = useSelector(selectCommentsLoading);
  const error = useSelector(selectCommentsError);

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(parseInt(postId, 10)));
    }
  }, [dispatch, postId]);

  // Csak a top-level kommenteket jelenítjük meg (amelyek parent-je a postId)
  const topLevelComments = useMemo(() => {
    if (!postId) return [];
    const postIdNum = parseInt(postId, 10);
    return comments.filter((comment) => comment.parent === postIdNum);
  }, [comments, postId]);

  return (
    <Box maxWidth="1200px" margin="0 auto" padding={3}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ marginBottom: 2 }} aria-label="Go back">
        <FormattedMessage id="comments.back" />
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        <FormattedMessage id="comments.title" />
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" marginY={4} role="status" aria-live="polite">
          <CircularProgress aria-label="Loading comments" />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && topLevelComments.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          <FormattedMessage id="comments.noComments" />
        </Typography>
      )}

      {!loading && topLevelComments.length > 0 && (
        <Box role="list" aria-label="Comments list">
          {topLevelComments.map((comment) => (
            <CommentItem key={comment.id} item={comment} allComments={comments} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Comments;

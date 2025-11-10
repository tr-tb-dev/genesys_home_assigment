import { HNItem } from '@/types/hackernews';
import { Box, Card, CardContent, Typography, Link, Chip } from '@mui/material';
import { useIntl, FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { formatRelativeTime } from '@/helpers/timeHelper';
import { extractDomain } from '@/helpers/urlHelper';

interface PostListItemProps {
  item: Partial<HNItem>;
  rank: number;
}

function PostListItem({ item, rank }: PostListItemProps) {
  const intl = useIntl();

  return (
    <Card sx={{ mb: 2 }} data-testid="post-list-item" role="article" aria-label={`Post: ${item.title}`}>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="h6" color="text.secondary" sx={{ minWidth: '30px' }}>
            {rank}.
          </Typography>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              {item.url ? (
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography variant="h6" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                    {item.title}
                  </Typography>
                </Link>
              ) : (
                <Typography variant="h6">{item.title}</Typography>
              )}
              {extractDomain(item.url) && (
                <Typography variant="caption" color="text.secondary">
                  ({extractDomain(item.url)})
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              {item.score !== undefined && (
                <Chip
                  label={`${item.score} ${intl.formatMessage({ id: 'posts.points' })}`}
                  size="small"
                  color="primary"
                />
              )}
              {item.by && (
                <Typography variant="body2" color="text.secondary">
                  by {item.by}
                </Typography>
              )}
              {item.time && (
                <Typography variant="body2" color="text.secondary">
                  {formatRelativeTime(item.time, intl)}
                </Typography>
              )}
              {item.descendants !== undefined &&
                (item.descendants === 0 ? (
                  <Typography variant="body2" color="primary">
                    <FormattedMessage id="posts.noComments" />
                  </Typography>
                ) : (
                  item.id && (
                    <Link component={RouterLink} to={`/comments/${item.id}`} sx={{ textDecoration: 'none' }}>
                      <Typography variant="body2" color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                        {item.descendants} comments
                      </Typography>
                    </Link>
                  )
                ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PostListItem;

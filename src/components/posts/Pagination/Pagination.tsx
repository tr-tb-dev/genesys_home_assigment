import { Box, Button, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Box
      component="nav"
      role="navigation"
      aria-label="Pagination"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, my: 3 }}
    >
      <Button variant="outlined" onClick={handlePrevious} disabled={currentPage === 1} aria-label="Previous page">
        <FormattedMessage id="pagination.previous" />
      </Button>
      <Typography variant="body1" aria-label={`Current page ${currentPage}`} aria-live="polite">
        {currentPage} / {totalPages}
      </Typography>
      <Button variant="outlined" onClick={handleNext} disabled={currentPage === totalPages} aria-label="Next page">
        <FormattedMessage id="pagination.next" />
      </Button>
    </Box>
  );
}

export default Pagination;

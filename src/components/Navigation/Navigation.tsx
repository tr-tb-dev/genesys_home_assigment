import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ViewModeToggle from '@/components/settings/ViewModeToggle/ViewModeToggle';
import ThemeToggle from '@/components/settings/ThemeToggle/ThemeToggle';
import LanguageSelector from '@/components/settings/LanguageSelector/LanguageSelector';
import FontSizeToggle from '@/components/settings/FontSizeToggle/FontSizeToggle';

function Navigation() {
  const theme = useTheme();
  const location = useLocation();

  return (
    <AppBar
      position="static"
      component="nav"
      aria-label="Main navigation"
      sx={{
        backgroundColor: theme.palette.navigation.background,
        borderBottom: `2px solid ${theme.palette.navigation.active}`,
      }}
    >
      <Toolbar>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          aria-label="Hacker News Home"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.25rem',
            letterSpacing: 2,
            color: theme.palette.navigation.text,
            borderColor: theme.palette.navigation.text,
            marginRight: 4,
          }}
        >
          HN
        </Button>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          <Button
            component={Link}
            to="/"
            data-testid="nav-new-posts"
            aria-current={location.pathname === '/' ? 'page' : undefined}
            sx={{
              color: location.pathname === '/' ? theme.palette.navigation.active : theme.palette.navigation.text,
              fontWeight: location.pathname === '/' ? 700 : 500,
              '&:hover': {
                backgroundColor: theme.palette.navigation.hover,
                color: theme.palette.navigation.active,
              },
            }}
          >
            <FormattedMessage id="navigation.newPosts" />
          </Button>
          <Button
            component={Link}
            to="/top"
            data-testid="nav-top-posts"
            aria-current={location.pathname === '/top' ? 'page' : undefined}
            sx={{
              color: location.pathname === '/top' ? theme.palette.navigation.active : theme.palette.navigation.text,
              fontWeight: location.pathname === '/top' ? 700 : 500,
              '&:hover': {
                backgroundColor: theme.palette.navigation.hover,
                color: theme.palette.navigation.active,
              },
            }}
          >
            <FormattedMessage id="navigation.topPosts" />
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} aria-label="Settings">
          <ViewModeToggle />
          <FontSizeToggle />
          <LanguageSelector />
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;

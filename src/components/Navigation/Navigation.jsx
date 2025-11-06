import { Link, useLocation } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector'

function Navigation() {
  const theme = useTheme()
  const location = useLocation()

  return (
    <AppBar
      position="static"
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

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <LanguageSelector />
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation

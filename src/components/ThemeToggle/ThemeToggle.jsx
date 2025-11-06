import { IconButton } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectTheme, setTheme } from '@/store/reducers/settings'

function ThemeToggle() {
  const themeMode = useSelector(selectTheme)
  const theme = useTheme()
  const dispatch = useDispatch()

  const handleToggle = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light'
    dispatch(setTheme(newTheme))
  }

  return (
    <IconButton
      onClick={handleToggle}
      aria-label="toggle theme"
      sx={{
        color: theme.palette.navigation.text,
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: theme.palette.navigation.hover,
          color: theme.palette.navigation.active,
        },
        transition: 'all 0.3s ease',
      }}
    >
      {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  )
}

export default ThemeToggle

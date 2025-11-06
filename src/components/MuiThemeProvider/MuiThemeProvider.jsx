import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useSelector } from 'react-redux'
import { selectTheme } from '@/store/reducers/settings'
import { lightTheme, darkTheme } from '@/theme'

function MuiThemeProvider({ children }) {
  const themeMode = useSelector(selectTheme)
  const theme = themeMode === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default MuiThemeProvider

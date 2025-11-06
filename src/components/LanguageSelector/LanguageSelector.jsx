import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectLanguage, setLanguage } from '@/store/reducers/settings'

function LanguageSelector() {
  const currentLanguage = useSelector(selectLanguage)
  const theme = useTheme()
  const dispatch = useDispatch()

  const handleToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'hu' : 'en'
    dispatch(setLanguage(newLanguage))
  }

  return (
    <Button
      onClick={handleToggle}
      aria-label="toggle language"
      sx={{
        color: theme.palette.navigation.text,
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: theme.palette.navigation.hover,
          color: theme.palette.navigation.active,
        },
        transition: 'all 0.3s ease',
        minWidth: 'auto',
      }}
    >
      {currentLanguage.toUpperCase()}
    </Button>
  )
}

export default LanguageSelector

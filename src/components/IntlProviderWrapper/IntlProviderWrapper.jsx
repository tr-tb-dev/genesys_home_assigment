import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import { selectLanguage } from '@/store/reducers/settings'
import translationsEn from '@/translations/translations-en.json'
import translationsHu from '@/translations/translations-hu.json'

const messages = {
  en: translationsEn,
  hu: translationsHu,
}

function IntlProviderWrapper({ children }) {
  const language = useSelector(selectLanguage)

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      {children}
    </IntlProvider>
  )
}

export default IntlProviderWrapper

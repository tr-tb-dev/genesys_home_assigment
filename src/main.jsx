import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from '@/store'
import { initApp } from '@/store/actions/appActions'
import { router } from '@/routes'
import IntlProviderWrapper from '@/components/IntlProviderWrapper/IntlProviderWrapper'
import MuiThemeProvider from '@/components/MuiThemeProvider/MuiThemeProvider'
import './main.css'

store.dispatch(initApp())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiThemeProvider>
        <IntlProviderWrapper>
          <RouterProvider router={router} />
        </IntlProviderWrapper>
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>
)

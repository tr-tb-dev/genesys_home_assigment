import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import store from '@/store';
import { initApp } from '@/store/actions/appActions';
import IntlProviderWrapper from '@/components/providers/IntlProviderWrapper/IntlProviderWrapper';
import MuiThemeProvider from '@/components/providers/MuiThemeProvider/MuiThemeProvider';
import AppRoot from '@/components/providers/AppRoot/AppRoot';
import './main.css';

const queryClient = new QueryClient();

store.dispatch(initApp());

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MuiThemeProvider>
          <IntlProviderWrapper>
            <AppRoot />
          </IntlProviderWrapper>
        </MuiThemeProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

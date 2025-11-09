import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { IntlProvider } from 'react-intl';
import FontSizeToggle from '@/components/settings/FontSizeToggle/FontSizeToggle';
import { FontSize } from '@/enums/settings';
import { createMockStore, createMockTheme } from './_settingsTestHelpers';

const messages = {
  'settings.fontSize.toggle': 'Toggle font size',
};

describe('FontSizeToggle', () => {
  it('should update store when font size toggle button is clicked', () => {
    const store = createMockStore();
    const muiTheme = createMockTheme();

    render(
      <Provider store={store}>
        <IntlProvider locale="en" messages={messages}>
          <ThemeProvider theme={muiTheme}>
            <FontSizeToggle />
          </ThemeProvider>
        </IntlProvider>
      </Provider>
    );

    const button = screen.getByTestId('font-size-toggle-button');

    expect(store.getState().settings.fontSize).toBe(FontSize.Large);

    fireEvent.click(button);
    expect(store.getState().settings.fontSize).toBe(FontSize.Small);
  });
});

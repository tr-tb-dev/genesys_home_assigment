import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import LanguageSelector from '@/components/settings/LanguageSelector/LanguageSelector';
import { Language } from '@/enums/settings';
import { createMockStore, createMockTheme } from './_settingsTestHelpers';

describe('LanguageSelector', () => {
  it('should update store when language selector button is clicked', () => {
    const store = createMockStore();
    const muiTheme = createMockTheme();

    render(
      <Provider store={store}>
        <ThemeProvider theme={muiTheme}>
          <LanguageSelector />
        </ThemeProvider>
      </Provider>
    );

    const button = screen.getByTestId('language-selector-button');

    expect(store.getState().settings.language).toBe(Language.English);

    fireEvent.click(button);
    expect(store.getState().settings.language).toBe(Language.Hungarian);
  });
});

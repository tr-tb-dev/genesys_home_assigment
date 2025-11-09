import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import ThemeToggle from '@/components/settings/ThemeToggle/ThemeToggle';
import { ThemeMode } from '@/enums/settings';
import { createMockStore, createMockTheme } from './_settingsTestHelpers';

describe('ThemeToggle', () => {
  it('should update store when theme toggle button is clicked', () => {
    const store = createMockStore();
    const muiTheme = createMockTheme();

    render(
      <Provider store={store}>
        <ThemeProvider theme={muiTheme}>
          <ThemeToggle />
        </ThemeProvider>
      </Provider>
    );

    const button = screen.getByTestId('theme-toggle-button');

    expect(store.getState().settings.theme).toBe(ThemeMode.Dark);

    fireEvent.click(button);
    expect(store.getState().settings.theme).toBe(ThemeMode.Light);
  });
});

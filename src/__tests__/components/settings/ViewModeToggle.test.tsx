import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import ViewModeToggle from '@/components/settings/ViewModeToggle/ViewModeToggle';
import { ViewMode } from '@/enums/settings';
import { createMockStore } from './_settingsTestHelpers';

describe('ViewModeToggle', () => {
  it('should update store when view mode toggle button is clicked', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <ViewModeToggle />
      </Provider>
    );

    const button = screen.getByTestId('view-mode-toggle-button');

    expect(store.getState().settings.viewMode).toBe(ViewMode.List);

    fireEvent.click(button);
    expect(store.getState().settings.viewMode).toBe(ViewMode.Grid);
  });
});

import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '@/store/reducers/settings/settings-reducer';
import { ThemeMode, Language, ViewMode, FontSize } from '@/enums/settings';
import { createDarkTheme } from '@/theme/theme';

export const createMockStore = () => {
  return configureStore({
    reducer: {
      settings: settingsReducer,
    },
    preloadedState: {
      settings: {
        theme: ThemeMode.Dark,
        language: Language.English,
        viewMode: ViewMode.List,
        fontSize: FontSize.Large,
      },
    },
  });
};

export const createMockTheme = () => {
  return createDarkTheme(FontSize.Large);
};

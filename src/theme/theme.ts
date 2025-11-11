import { createTheme, Theme } from '@mui/material/styles';
import { FontSize } from '@/enums/settings';

declare module '@mui/material/styles' {
  interface Palette {
    navigation: {
      background: string;
      text: string;
      hover: string;
      active: string;
    };
  }
  interface PaletteOptions {
    navigation?: {
      background?: string;
      text?: string;
      hover?: string;
      active?: string;
    };
  }
}

export const createLightTheme = (fontSize: FontSize): Theme =>
  createTheme({
    spacing: 10,
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
      text: {
        primary: '#212121',
        secondary: '#757575',
      },
      navigation: {
        background: '#1976d2',
        text: '#ffffff',
        hover: '#1565c0',
        active: '#42a5f5',
      },
    },
    typography: {
      fontFamily: '"Roboto Mono", "Courier New", monospace',
      fontSize: fontSize,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          a: {
            color: '#1976d2',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      },
    },
  });

export const createDarkTheme = (fontSize: FontSize): Theme =>
  createTheme({
    spacing: 10,
    palette: {
      mode: 'dark',
      primary: {
        main: '#00e676',
        light: '#66ffa6',
        dark: '#00b248',
        contrastText: '#000000',
      },
      background: {
        default: '#0d1117',
        paper: '#161b22',
      },
      text: {
        primary: '#c9d1d9',
        secondary: '#8b949e',
      },
      navigation: {
        background: '#010409',
        text: '#00e676',
        hover: '#161b22',
        active: '#00e676',
      },
    },
    typography: {
      fontFamily: '"Roboto Mono", "Courier New", monospace',
      fontSize: fontSize,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          a: {
            color: '#00e676',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      },
    },
  });

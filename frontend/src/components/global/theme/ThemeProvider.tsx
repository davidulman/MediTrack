import { PaletteColorOptions, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, createTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import 'dayjs/locale/de';
import 'dayjs/locale/en-gb';
// import { deDE as deDataGrid } from '@mui/x-data-grid';

import { useSelector } from 'react-redux';
import { themeTokens } from './themePalette';
import { useMemo } from 'react';
import { deDE as MuiDE } from '@mui/material/locale';
import { RootState } from '../../../redux/store';
interface ThemeCompProps {
  children: React.ReactNode;
}

declare module '@mui/material/styles' {
  interface Palette {
    mode: 'light' | 'dark';
    avi: {
      main: string;
    };
    loader: {
      main: string;
    };
    active: {
      main: string;
    };
    notActive: {
      main: string;
    };
    footer: {
      main: string;
    };
    box: {
      main: string;
    };
    card: {
      main: string;
      [key: string]: string;
    };
    darkMode: {
      main: string;
    };
    lightMode: {
      main: string;
    };
    sideBar: {
      main: string;
    };
    toggle: {
      main: string;
    };
  }
  interface PaletteOptions {
    aviDark?: PaletteColorOptions;
    aviLight?: PaletteColorOptions;
    card?: PaletteColorOptions;
    avi?: PaletteColorOptions;
    loader?: PaletteColorOptions;
    active?: PaletteColorOptions;
    notActive?: PaletteColorOptions;
    footer?: PaletteColorOptions;
    box?: PaletteColorOptions;
    sideBar?: PaletteColorOptions;
    aviToggle?: PaletteColorOptions;
  }
}
type PaletteMode = 'light' | 'dark';

export const AppThemeProvider: React.FC<ThemeCompProps> = ({ children }) => {
  const darkMode = useSelector(
    (state: RootState) => state.Ui.darkMode.darkMode
  );

  const currentLanguage = useSelector((state: RootState) => state.Ui.language);
  const currentDatePickerLanguage = currentLanguage.currentDatePickerLanguage;

  const currentComponentLanguage =
    currentLanguage.currentComponentLanguage as string;

  const darkCheck = darkMode === 'dark';

  const themeInfo = {
    typography: {
      fontFamily: ['Open Sans', 'Noto Sans', 'sans-serif'].join(','),
    },

    palette: {
      mode: darkCheck ? ('dark' as PaletteMode) : ('light' as PaletteMode),
      primary: {
        ...themeTokens.primary,
        main: themeTokens.primary[500],
        light: themeTokens.primary[300],
        dark: themeTokens.primary[600],
      },
      secondary: {
        main: darkCheck ? themeTokens.neutral[500] : themeTokens.neutral[900],
      },
      card: {
        main: darkCheck
          ? themeTokens.secondary[400]
          : themeTokens.secondary[800],
      },
      loader: {
        main: '#c8e7ff',
      },
      active: {
        ...themeTokens.success,
        main: themeTokens.success[500],
      },
      notActive: {
        ...themeTokens.error,
        main: themeTokens.error[600],
      },

      footer: {
        ...themeTokens.neutral,
        main: themeTokens.neutral[200],
      },

      darkMode: {
        ...themeTokens.dark,
        main: themeTokens.dark[500],
      },
      lightMode: {
        ...themeTokens.light,
        main: themeTokens.light[500],
      },
      toggle: {
        main: themeTokens.primary[500],
      },
      box: {
        main: darkCheck ? themeTokens.primary[900] : themeTokens.primary[200],
      },

      sideBar: {
        main: darkCheck ? themeTokens.darkBlue[600] : themeTokens.white[200],
      },

      background: {
        default: darkCheck ? themeTokens.darkBlue[600] : themeTokens.white[200],
        paper: darkCheck ? themeTokens.blue[600] : themeTokens.white[100],
      },
    },
  };

  const theme = useMemo(
    () =>
      createTheme(
        themeInfo,
        // currentComponentLanguage === 'deDE' ? deDataGrid : {},
        currentComponentLanguage === 'deDE' ? MuiDE : {}
      ),
    [darkMode, currentLanguage]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={currentDatePickerLanguage}
      >
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

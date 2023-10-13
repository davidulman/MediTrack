import { createSlice } from '@reduxjs/toolkit';
import { MedicalTypeEnum } from '../components/pages/medical history/enums/MedicalType';

const initialState = {
  language: {
    currentLanguage: localStorage.getItem('appLanguage') || 'de-DE',
    currentDatePickerLanguage:
      localStorage.getItem('appLanguage') === 'de-DE' ? 'de' : 'en-gb',
    currentComponentLanguage:
      localStorage.getItem('appLanguage') === 'de-DE' ? 'deDE' : 'enGB',
  },
  darkMode: {
    darkMode:
      localStorage.getItem('darkMode') === 'dark'
        ? 'dark'
        : localStorage.getItem('darkMode') === 'light'
        ? 'light'
        : 'auto',
    autoDarkMode:
      localStorage.getItem('darkModeDetection') === 'true' ? true : false,

    darkModeSetting:
      localStorage.getItem('darkModeDetection') === 'true'
        ? 'auto'
        : localStorage.getItem('darkMode'),

    autoDarkModeModal: false,
  },

  settings: {
    openModal: false,
  },

  navbar: {
    open: false,
  },

  authPage: {
    currentView: 'login',
  },

  medicalHistory: {
    currentView: MedicalTypeEnum.MEDICAL_CONDITIONS,
  },
  breadcrumbs: {
    currentBreadcrumb: null,
    removePrefix: false,
  },
};

export const uiSlice = createSlice({
  name: 'Ui',
  initialState,
  reducers: {
    darkMode: (state) => {
      state.darkMode.darkMode = 'dark';
    },
    lightMode: (state) => {
      state.darkMode.darkMode = 'light';
    },
    setDarkMode: (state) => {
      state.darkMode.darkMode = 'dark';
      state.darkMode.autoDarkMode = false;
      state.darkMode.darkModeSetting = 'dark';
    },
    setLightMode: (state) => {
      state.darkMode.darkMode = 'light';
      state.darkMode.autoDarkMode = false;
      state.darkMode.darkModeSetting = 'light';
    },
    setAutoDarkMode: (state) => {
      state.darkMode.darkMode = 'auto';
      state.darkMode.autoDarkMode = true;
      state.darkMode.darkModeSetting = 'auto';
    },
    setAutoMode: (state) => {
      state.darkMode.autoDarkMode = true;
    },
    setRemoveAutoMode: (state) => {
      state.darkMode.autoDarkMode = false;
    },
    setAutoDarkModeModal: (state) => {
      state.darkMode.autoDarkModeModal = true;
    },
    setRemoveAutoDarkModeModal: (state) => {
      state.darkMode.autoDarkModeModal = false;
    },
    setLanguage: (state, action) => {
      state.language.currentLanguage = action.payload.currentLanguage;
      state.language.currentComponentLanguage =
        action.payload.currentComponentLanguage;
      state.language.currentDatePickerLanguage =
        action.payload.currentDatePickerLanguage;
    },
    toggleSettingsModal: (state) => {
      state.settings.openModal = !state.settings.openModal;
    },
    toggleNavBar: (state) => {
      state.navbar.open = !state.navbar.open;
    },

    setAuthPageView: (state, action) => {
      state.authPage.currentView = action.payload;
    },
    setMedicalHistoryView: (state, action) => {
      state.medicalHistory.currentView = action.payload;
    },
    setBreadcrumb: (state, action) => {
      state.breadcrumbs.currentBreadcrumb = action.payload;
    },
    setBreadcrumbNoPrflx: (state, action) => {
      state.breadcrumbs.currentBreadcrumb = action.payload;
      state.breadcrumbs.removePrefix = true;
    },
    resetBreadcrumb: (state) => {
      state.breadcrumbs.currentBreadcrumb = null;
      state.breadcrumbs.removePrefix = false;
    },
  },
});

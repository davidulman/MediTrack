import { useDispatch } from 'react-redux';
import { uiSlice } from '../../../redux/uiSlice';

export type DarkModeValue = 'light' | 'dark' | 'auto';

const setDarkMode = () => {
  localStorage.setItem('darkMode', 'dark');
  localStorage.setItem('darkModeDetection', 'false');
};

const setLightMode = () => {
  localStorage.setItem('darkMode', 'light');
  localStorage.setItem('darkModeDetection', 'false');
};

const authDarkMode = () => {
  localStorage.setItem('darkModeDetection', 'true');
  localStorage.setItem('darkMode', 'auto');
};

export const darkModeCheck = (
  uiNavi: { darkMode: string },
  dispatch: ReturnType<typeof useDispatch>
): void => {
  if (
    localStorage.getItem('darkModeDetection') === 'true' ||
    uiNavi.darkMode === 'auto'
  ) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches === true) {
      dispatch(uiSlice.actions.darkMode());
    } else {
      dispatch(uiSlice.actions.lightMode());
    }
  }
};

export const darkModeHandler = (
  darkModeState: { darkMode: string },
  dispatch: ReturnType<typeof useDispatch>
) => {
  if (darkModeState.darkMode === 'light') {
    dispatch(uiSlice.actions.setDarkMode());
    setDarkMode();
  } else {
    dispatch(uiSlice.actions.setLightMode());
    setLightMode();
  }
};

export const darkModeChangeHandler = (
  newValue: DarkModeValue,
  dispatch: ReturnType<typeof useDispatch>
) => {
  if (newValue === 'light') {
    dispatch(uiSlice.actions.setLightMode());
    setLightMode();
  } else if (newValue === 'dark') {
    dispatch(uiSlice.actions.setDarkMode());
    setDarkMode();
  } else {
    dispatch(uiSlice.actions.setAutoDarkMode());
    authDarkMode();
  }
};

export const darkModelOpener = (dispatch: ReturnType<typeof useDispatch>) => {
  dispatch(uiSlice.actions.toggleSettingsModal());
};

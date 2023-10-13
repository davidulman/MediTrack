import { Dispatch } from '@reduxjs/toolkit';
import { uiSlice } from '../../redux/uiSlice';

export const checkLanguage = (dispatch: Dispatch) => {
  const getLocalStorage = localStorage.getItem('appLanguage');
  if (getLocalStorage === 'null' || !getLocalStorage) {
    localStorage.setItem('appLanguage', 'en-GB');
    dispatch(uiSlice.actions.setLanguage('en-GB'));
  }
};

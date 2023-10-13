import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './uiSlice';
import { authSlice } from './auth';
import { useDispatch } from 'react-redux';
import { registerApi } from './registerSlice';
import { medicalHistoryApi } from './medicalSlice';

export const store = configureStore({
  reducer: {
    Ui: uiSlice.reducer,
    Auth: authSlice.reducer,
    Register: registerApi.reducer,
    MedicalHistory: medicalHistoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      registerApi.middleware,
      medicalHistoryApi.middleware
    ),
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;

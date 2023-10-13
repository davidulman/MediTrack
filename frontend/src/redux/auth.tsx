/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { baseUrl } from '../components/global/config/config';
import { AuthSlice } from '../types/redux/authTypes';
const initialState: AuthSlice = {
  entities: undefined,
  loading: false,
  isError: 'idle',
  isLogin: 'idle',
  error: undefined,
  isAuth: false,
  auth: 'idle',
  loginTime: 'idle',
  logout: false,
  refreshCount: 0,
};

export const refreshToken = createAsyncThunk('auth/refresh', async (t: any) => {
  const url = `${baseUrl}/refresh`;
  try {
    const res = await axios.get(url, { withCredentials: true });
    return res.data;
  } catch (error: any) {
    enqueueSnackbar(t('login.loginExpired'), {
      variant: 'error',
    });
    throw error.response.data;
  }
});

export const login = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }) => {
    const url = `${baseUrl}/login`;
    try {
      const res = await axios.post(url, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error: any) {
      enqueueSnackbar(
        'Login has failed. Please check your email and password.',
        {
          variant: 'error',
        }
      );
      throw error.response.data;
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  const url = `${baseUrl}/logout`;
  const res = await axios.get(url, { withCredentials: true });
  return res.data;
});

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    logout: (state) => {
      state.logout = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
      state.auth = 'pending';
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload as never;
      state.refreshCount += 1;
      state.isError = false;
      state.isAuth = true;
      state.auth = 'success';
      state.loginTime = Date.now();
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isAuth = false;
      state.auth = 'failed';
      state.error = {
        message: action.error.message,
      };
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.auth = 'pending';
      state.isLogin = 'pending';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload as never;
      state.isError = false;
      state.isAuth = true;
      state.loginTime = Date.now();
      state.auth = 'success';
      state.isLogin = 'success';
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isAuth = false;
      state.error = action.error as never;
      state.auth = 'failed';
      state.isLogin = 'failed';
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.auth = 'pending';
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.entities = undefined;
      state.isError = 'idle';
      state.isAuth = false;
      state.auth = 'loggedOut';
      state.logout = false;
      state.isLogin = 'idle';
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.entities = undefined;
      state.isError = true;
      state.isAuth = false;
      state.error = action.error as never;
      state.auth = 'loggedOut';
      enqueueSnackbar('Something went wrong', {
        variant: 'error',
      });
    });
  },
});

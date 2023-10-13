import { ApiError } from './errorType';

export interface AuthSlice {
  entities:
    | {
        sub: string;
        firstName: string;
        lastName: string;
        email: string;
        accessToken: string;
        refreshToken: string;
        iat?: number;
        exp?: number;
      }
    | undefined;
  loading: boolean;
  isError: 'idle' | boolean;
  error: ApiError | undefined;
  isAuth: boolean;
  isLogin: 'idle' | 'pending' | 'success' | 'failed';
  loginTime: 'idle' | number;
  auth: 'idle' | 'pending' | 'success' | 'failed' | 'loggedOut';
  logout: 'idle' | boolean;
  refreshCount: number;
}

import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { logout, refreshToken } from '../../redux/auth';
import { useTranslation } from 'react-i18next';
import Loader from '../global/Loader/Loader';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authState = useSelector((s: RootState) => s.Auth);

  const isAuth = authState.isAuth;
  const authStatus = authState.auth;
  const authInfo = `${authState.entities?.firstName} ${authState.entities?.lastName}`;
  const isLogin = authState.isLogin;
  const logOut = authState.logout;
  const isLoading = authState.loading;

  const authFailed = authStatus === 'failed';
  const isLoginLoading = isLogin === 'pending';
  const isLoginFailed = isLogin === 'failed';
  const isLoginSuccess = isLogin === 'success';
  const authIsLoading = authStatus === 'pending' || authStatus === 'idle';

  const shouldRefreshToken = authIsLoading && !isLoginLoading && !logOut;

  const refreshTokenHandler = async () => {
    await dispatch(refreshToken(t));
  };

  const logoutHandler = async () => {
    navigate('/login');
    await dispatch(logout());
    enqueueSnackbar(t('login.loggedOut'), { variant: 'success' });
  };

  useLayoutEffect(() => {
    if (shouldRefreshToken) refreshTokenHandler();
    if (authFailed || isLoginFailed || logOut) logoutHandler();
    if (isLoginSuccess) {
      navigate('/');
      enqueueSnackbar(`${t('login.loggedInAs')} ${authInfo}`, {
        variant: 'success',
      });
    }
  }, [isAuth, isLogin, logOut]);

  if (isLoading || authIsLoading || isLoginLoading) return <Loader />;

  return <>{children}</>;
};

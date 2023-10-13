import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export const PrivateRoute: React.FC = () => {
  const authState = useSelector((s: RootState) => s.Auth);
  const authStatus = authState.auth;
  const authSuccess = authStatus === 'success';

  return authSuccess ? <Outlet /> : <Navigate to="/login" />;
};

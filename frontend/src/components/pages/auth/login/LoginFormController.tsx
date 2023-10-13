import { AviForm, useAviForm } from 'avi-form';
import { fields } from './LoginForm';
import { useTranslation } from 'react-i18next';
import { RootState, useAppDispatch } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../../redux/auth';
import { memo, useEffect } from 'react';
export const LoginFormController: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const authState = useSelector((s: RootState) => s.Auth);
  const isAuth = authState.isAuth;
  const authStatus = authState.auth;
  const matchAuth = authStatus === 'success' && isAuth;
  const navigate = useNavigate();

  useEffect(() => {
    if (matchAuth) {
      navigate('/');
    }
  }, [matchAuth, navigate]);

  const { formProps } = useAviForm({
    fields: fields(t),
    onSubmit: async (values) => {
      await dispatch(login(values));
    },
  });

  return <AviForm formProps={formProps} />;
});

import { AviForm, useAviForm } from 'avi-form';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { fields } from './RegisterForm';
import { useRegisterMutation } from '../../../../redux/registerSlice';
import Loader from '../../../global/Loader/Loader';
import { useDispatch } from 'react-redux';
import { uiSlice } from '../../../../redux/uiSlice';
import { AuthView } from '../enums/AuthView';
import { useSnackbar } from 'notistack';

export const RegisterFormController: React.FC = memo(() => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [
    createUser,
    {
      isLoading: isRegistering,
      isSuccess: isRegistered,
      //   isError: registerError,
    },
  ] = useRegisterMutation();

  useEffect(() => {
    if (isRegistered) {
      dispatch(uiSlice.actions.setAuthPageView(AuthView.LOGIN));
      enqueueSnackbar(t('register.createMsg'), {
        variant: 'success',
      });
    }
  }, [isRegistered, dispatch, enqueueSnackbar, t]);

  const { formProps } = useAviForm({
    fields: fields(t),
    onSubmit: async (values) => {
      await createUser(values);
    },
  });

  return (
    <>
      {isRegistering && <Loader />}
      <AviForm formProps={formProps} />
    </>
  );
});

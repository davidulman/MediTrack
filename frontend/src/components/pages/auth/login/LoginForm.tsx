import { createButton, createHeader, createTextField } from 'avi-form';
import { TFunction } from 'i18next';

export const fields = (t: TFunction) => [
  createHeader({
    label: t('login.signIn'),
  }),
  createTextField({
    name: 'email',
    label: t('login.email'),
    otherTextFieldProps: {
      required: true,
    },
  }),
  createTextField({
    name: 'password',
    label: t('login.password'),
    otherTextFieldProps: {
      required: true,
      type: 'password',
    },
  }),

  createButton({
    name: 'Login',
    label: t('login.login'),
    type: 'submit',
    otherGridProps: {
      textAlign: 'center',
    },
  }),
];

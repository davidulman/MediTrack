import { createButton, createHeader, createTextField } from 'avi-form';
import { TFunction } from 'i18next';

export const fields = (t: TFunction) => [
  createHeader({
    label: t('register.title'),
  }),

  createTextField({
    name: 'firstName',
    label: t('register.firstName'),
    md: 6,
    otherTextFieldProps: {
      required: true,
    },
  }),
  createTextField({
    name: 'lastName',
    label: t('register.lastName'),
    md: 6,
    otherTextFieldProps: {
      required: true,
    },
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
    name: 'register',
    label: t('menu.register'),
    type: 'submit',
    otherGridProps: {
      textAlign: 'center',
    },
  }),
];

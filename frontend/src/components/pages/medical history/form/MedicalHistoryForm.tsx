import {
  createAutocomplete,
  createButton,
  createDatePicker,
  createHeader,
  createTextField,
} from 'avi-form';
import { TFunction } from 'i18next';

export const medicalHistoryFields = (t: TFunction) => [
  createHeader({
    label: t('medicalHistoryForm.header'),
  }),
  createAutocomplete({
    name: 'medicalType',
    label: t('medicalHistoryForm.medicalType'),
    options: t('medicalHistoryForm.medicalTypeOptions', {
      returnObjects: true,
    }),
    md: 6,
    otherAutocompleteProps: {
      getOptionLabel: (option) => option.label,
    },
    otherTextFieldProps: {
      required: true,
    },
  }),
  createTextField({
    name: 'medicalDescription',
    label: t('medicalHistoryForm.medicalDescription'),
    md: 6,
    otherTextFieldProps: {
      required: true,
    },
  }),

  createDatePicker({
    name: 'startDate',
    label: t('medicalHistoryForm.startDate'),
    md: 4.5,
  }),

  createDatePicker({
    name: 'endDate',
    label: t('medicalHistoryForm.endDate'),
    md: 4.5,
  }),
  createAutocomplete({
    name: 'severity',
    label: t('medicalHistoryForm.severity'),
    options: t('medicalHistoryForm.medicalSeverityOptions', {
      returnObjects: true,
    }),
    otherTextFieldProps: {
      required: true,
    },
    otherAutocompleteProps: {
      getOptionLabel: (option) => option.label,
    },
    md: 3,
  }),
  createTextField({
    name: 'notes',
    label: t('medicalHistoryForm.notes'),
    otherTextFieldProps: {
      multiline: true,
    },
    md: 4,
  }),

  createTextField({
    name: 'doctorName',
    label: t('medicalHistoryForm.doctorName'),
    md: 4,
  }),
  createTextField({
    name: 'hospitalName',
    label: t('medicalHistoryForm.hospitalName'),
    md: 4,
  }),

  createButton({
    label: t('medicalHistoryForm.submit'),
    type: 'submit',
    otherGridProps: {
      textAlign: 'center',
    },
  }),
];

import { TFunction } from 'i18next';
import {
  DarkModeOutlined,
  LightModeOutlined,
  SettingsBrightness,
  Login,
  AppRegistration,
  MedicationLiquid,
} from '@mui/icons-material';
import { LiaAllergiesSolid } from 'react-icons/lia';
import { FaBookMedical, FaTruckMedical } from 'react-icons/fa6';

import '/node_modules/flag-icons/css/flag-icons.min.css';
import { MedicalTypeEnum } from '../../pages/medical history/enums/MedicalType';
import { MedicalTypeTranslation } from '../../../types/translation/MedicalTypeTranslation';
export const DARK_MODAL_VALUES = (t: TFunction) => [
  {
    value: 'dark',
    label: t('settingModal.dark'),
    icon: <DarkModeOutlined />,
  },
  {
    value: 'auto',
    label: t('settingModal.system'),
    icon: <SettingsBrightness />,
  },
  {
    value: 'light',
    label: t('settingModal.light'),
    icon: <LightModeOutlined />,
  },
];
export const LANGUAGES_VALUES = (t: TFunction) => [
  {
    value: 'en-GB',
    label: t('settingModal.english'),
    icon: <span className="fi fi-gb "></span>,
  },
  {
    value: 'de-DE',
    label: t('settingModal.german'),
    icon: <span className="fi fi-de"></span>,
  },
];

export const TOGGLE_VALUES_LOGIN = (t: TFunction) => [
  {
    value: 'login',
    label: t('menu.login'),
    icon: <Login />,
  },
  {
    value: 'register',
    label: t('menu.register'),
    icon: <AppRegistration />,
  },
];

export const TOGGLE_VALUES_MEDICAL_HISTORY = (i: MedicalTypeTranslation) => [
  {
    value: MedicalTypeEnum.MEDICAL_CONDITIONS,
    label: i[MedicalTypeEnum.MEDICAL_CONDITIONS],
    icon: <FaBookMedical size="1.4rem" />,
  },
  {
    value: MedicalTypeEnum.SURGERIES,
    label: i[MedicalTypeEnum.SURGERIES].split(' ')[0],
    icon: <FaTruckMedical size="1.4rem" />,
  },
  {
    value: MedicalTypeEnum.ALLERGIES,
    label: i[MedicalTypeEnum.ALLERGIES],
    icon: <LiaAllergiesSolid size="1.4rem" />,
  },
  {
    value: MedicalTypeEnum.MEDICATIONS,
    label: i[MedicalTypeEnum.MEDICATIONS],
    icon: <MedicationLiquid />,
  },
];

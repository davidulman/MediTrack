import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import deDE from './lang/de-DE.json';
import enGB from './lang/en-GB.json';
export const defaultNamespace = 'default';
export const defaultLanguage = localStorage.getItem('appLanguage') || 'en-GB';

const resources = {
  'en-GB': {
    [defaultNamespace]: enGB,
  },
  'de-DE': {
    [defaultNamespace]: deDE,
  },
};

i18n.use(initReactI18next).init({
  defaultNS: defaultNamespace,
  ns: [defaultNamespace],
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

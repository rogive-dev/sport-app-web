/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from './translations/en';
import { de } from './translations/de';
import { es } from './translations/es';
import { pt } from './translations/pt';
import { es_cl } from './translations/es-cl';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
    pt: { translation: pt },
    escl: { translation: es_cl },
    es: { translation: es },
  },
  lng: 'es',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: { translation: require('../locales/en.json') },
      zh: { translation: require('../locales/zh.json') },
    },
    lng: 'en', // 设置默认语言为英语
    fallbackLng: 'en', // 如果找不到语言包，默认使用英语
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

import i18n from "i18next";
// import path from 'path';
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./en/translation.json";
import translationAZ from "./az/translation.json";
import translationRU from "./ru/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },

  az: {
    translation: translationAZ,
  },
  ru: {
    translation: translationRU,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    supportedLngs: ["en", "az" , "ru"],
    fallbackLng: "az",
    detection: {
      order: ["localStorage", "cookie", "htmlTag", "path", "subdomain"],
      caches: ["localStorage", "cookie"],
    },
  })
  .then(() => console.log("i18n initialized successfully"))
  .catch((error) => console.error("i18n initialization failed", error));

export default i18n;

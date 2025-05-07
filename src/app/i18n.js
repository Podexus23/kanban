import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      changeLanguage: "Choose Language",
      theme: {
        chooseTheme: "Choose theme",
        dark: "Dark",
        light: "Light",
      },
      desk: {
        add: "Add new desk",
        remove: "Remove desk",
        edit: "Edit desk",
        confirmNewTitle: "Confirm title",
        newDeskTitle: "New Desk #",
      },
      task: {
        add: "Add new task",
        remove: "Remove task",
        edit: "Edit task",
        editTitle: "Edit title",
        editDescription: "Edit description",
        confirmNewTitle: "Confirm title",
        confirmNewDescription: "Confirm description",
      },
      input: { title: "Please fill out this field" },
    },
  },
  ru: {
    translation: {
      changeLanguage: "Выберите язык",
      theme: {
        chooseTheme: "Выбрать тему",
        dark: "Тёмная",
        light: "Светлая",
      },
      desk: {
        add: "Добавить новую доску",
        remove: "Убрать доску",
        edit: "Редактировать доску",
        confirmNewTitle: "Подтвердить заголовок",
        newDeskTitle: "Новая доска #",
      },
      task: {
        add: "Добавить новую задачу",
        remove: "Убрать задачу",
        edit: "Педактировать задачу",
        editTitle: "Редактировать заголовок",
        editDescription: "Редактировать описание",
        confirmNewTitle: "Подтвердить заголовок",
        confirmNewDescription: "Подтвердить описание",
      },
      input: { title: "Пожалуйста, заполните поле" },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

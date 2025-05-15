import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import styles from "./App.module.css";

import DesksPlace from "./features/DesksPlace/DesksPlace.jsx";
import Button from "./components/Button.jsx";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import { initializeTheme, toggleTheme } from "./features/theme/themeSlice.js";

const makeTask = () => {
  return {
    text: faker.lorem.lines({ min: 1, max: 1 }),
    title: faker.lorem.words({ min: 2, max: 6 }),
    id: faker.string.uuid(),
  };
};

const initDesks = [
  {
    name: "To Do",
    data: [...Array.from({ length: 3 }, () => makeTask())],
  },
  {
    name: "In Progress",
    data: [...Array.from({ length: 3 }, () => makeTask())],
  },
  {
    name: "Done",
    data: [...Array.from({ length: 3 }, () => makeTask())],
  },
];

function App() {
  const [lng, setLng] = useLocalStorage("doska_lng", "en");
  const [deskData, setDeskData] = useLocalStorage("doska_data", initDesks);
  const { t, i18n } = useTranslation();

  // const stateData = useSelector((state) => state.desks);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <div>
        <p>{t("changeLanguage")}</p>
        <Button
          name={"ru"}
          size={"small"}
          onClick={() => {
            setLng("ru");
            i18n.changeLanguage("ru");
          }}
        />
        <Button
          name={"en"}
          size={"small"}
          onClick={() => {
            setLng("en");
            i18n.changeLanguage("en");
          }}
        />
      </div>
      <div>
        <p>{t("theme.chooseTheme")}</p>
        <Button
          name={
            theme === "light"
              ? `🌙 ${t("theme.dark")}`
              : `☀️ ${t("theme.light")}`
          }
          size={"medium"}
          onClick={() => {
            dispatch(toggleTheme());
          }}
        />
      </div>

      <DesksPlace desks={deskData} onSetDesk={setDeskData} />
    </div>
  );
}

export default App;

import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./App.module.css";

import DesksPlace from "./features/DesksPlace/DesksPlace.jsx";
import Button from "./components/Button.jsx";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import { initializeTheme, toggleTheme } from "./features/theme/themeSlice.js";
import { initializeDesksData } from "./features/DesksPlace/desksSlice.js";
import SortableList from "./components/DndTest.jsx";
import DnDDesk from "./components/DnDTest2.jsx";

function App() {
  const [_, setLng] = useLocalStorage("doska_lng", "en");
  const { t, i18n } = useTranslation();

  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeTheme());
    dispatch(initializeDesksData());
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

      <DesksPlace />
      <DnDDesk />
    </div>
  );
}

export default App;

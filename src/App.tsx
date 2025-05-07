import { useTranslation } from "react-i18next";
import DesksPlace from "./components/features/DesksPlace/DesksPlace";
import styles from "./App.module.css";
import Button from "./components/Button";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle.tsx";

function App() {
  const { t, i18n } = useTranslation();
  const desks = ["To Do", "In Progress", "Done"];

  return (
    <ThemeProvider>
      <div className={styles.app}>
        <div>
          <p>{t("changeLanguage")}</p>
          <Button
            name={"ru"}
            size={"small"}
            onClick={() => i18n.changeLanguage("ru")}
          />
          <Button
            name={"en"}
            size={"small"}
            onClick={() => i18n.changeLanguage("en")}
          />
        </div>
        <div>
          <p>{t("theme.chooseTheme")}</p>
          <ThemeToggle />
        </div>

        <DesksPlace desks={desks} />
      </div>
    </ThemeProvider>
  );
}

export default App;

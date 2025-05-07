import DesksPlace from "./components/features/DesksPlace/DesksPlace";
import styles from "./App.module.css";
import { useTranslation } from "react-i18next";
import Button from "./components/Button";

function App() {
  const { t, i18n } = useTranslation();
  const desks = ["To Do", "In Progress", "Done"];

  return (
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

      <DesksPlace desks={desks} />
    </div>
  );
}

export default App;

import { useTranslation } from "react-i18next";
import DesksPlace from "./components/features/DesksPlace/DesksPlace";
import styles from "./App.module.css";
import Button from "./components/Button";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle.tsx";
import useLocalStorage from "./hooks/useLocalStorage.tsx";
import { faker } from "@faker-js/faker";

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
    data: [...Array.from({ length: 3 }, (_, index) => makeTask())],
  },
  {
    name: "In Progress",
    data: [...Array.from({ length: 3 }, (_, index) => makeTask())],
  },
  {
    name: "Done",
    data: [...Array.from({ length: 3 }, (_, index) => makeTask())],
  },
];

function App() {
  const [lng, setLng] = useLocalStorage("doska_lng", "en");
  const [deskData, setDeskData] = useLocalStorage("doska_data", initDesks);
  const { t, i18n } = useTranslation();

  return (
    <ThemeProvider>
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
          <ThemeToggle />
        </div>

        <DesksPlace desks={deskData} onSetDesk={setDeskData} />
      </div>
    </ThemeProvider>
  );
}

export default App;

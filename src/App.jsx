import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import styles from "./App.module.css";

import DesksPlace from "./features/DesksPlace/DesksPlace.jsx";
import Button from "./components/Button.jsx";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import { initializeTheme, toggleTheme } from "./features/theme/themeSlice.js";
import {
  addDesk,
  initializeDesksData,
  removeDesk,
  renameDesk,
  updateDeskData,
} from "./features/DesksPlace/desksSlice.js";

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
  const [_, setLng] = useLocalStorage("doska_lng", "en");
  const [deskData, setDeskData] = useLocalStorage("doska_data", initDesks);
  const { t, i18n } = useTranslation();

  const { theme } = useSelector((state) => state.theme);
  const { desks } = useSelector((state) => state.desks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeTheme());
    dispatch(initializeDesksData());
  }, [dispatch]);
  console.log(desks);

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
      //desk test
      <div>
        <button
          style={{ padding: "10px", fontSize: "1rem" }}
          onClick={() => {
            dispatch(addDesk({ name: "some new desk", data: [] }));
          }}
        >
          add desk
        </button>
        <button
          style={{ padding: "10px", fontSize: "1rem" }}
          onClick={() => {
            dispatch(removeDesk("To Do"));
          }}
        >
          remove desk
        </button>
        <button
          style={{ padding: "10px", fontSize: "1rem" }}
          onClick={() => {
            dispatch(renameDesk("To Do", "To Done"));
          }}
        >
          rename desk
        </button>
        <button
          style={{ padding: "10px", fontSize: "1rem" }}
          onClick={() => {
            dispatch(
              updateDeskData("Done", [
                { text: "some data", title: "this is title", id: "this is id" },
              ])
            );
          }}
        >
          update desk
        </button>
      </div>
      <DesksPlace desks={deskData} onSetDesk={setDeskData} />
    </div>
  );
}

export default App;

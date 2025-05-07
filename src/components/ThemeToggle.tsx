import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      className={styles.button}
      // aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? `🌙 ${t("theme.dark")}` : `☀️ ${t("theme.light")}`}
    </button>
  );
};

export default ThemeToggle;

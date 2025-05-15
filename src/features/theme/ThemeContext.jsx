import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("doska_theme", "light");
  document.documentElement.setAttribute("data-theme", theme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

//here is a global context to toggle the theme

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

//this function provides our context to all the wraped elements
function ThemeContextProvider({ children }) {
  //theme state
  const [isDark, setIsDark] = useState(true);

  //function to add/remove all the classnames in the document to toggle between dark and light theme
  useEffect(() => {
    // Apply theme class to document for Tailwind
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  //function to invert the theme
  const toggleTheme = () => setIsDark(!isDark);
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;

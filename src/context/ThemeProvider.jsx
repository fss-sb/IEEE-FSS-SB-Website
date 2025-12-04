import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

//this function provides our context to all the wraped elements
function ThemeContextProvider({ children }) {
  //theme state - initialize from localStorage if available
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    // If theme exists in localStorage, use it
    if (savedTheme !== null) {
      return savedTheme === "dark";
    }

    // Default to dark theme if no preference saved
    return true;
  });

  //function to add/remove all the classnames in the document to toggle between dark and light theme
  useEffect(() => {
    // Apply theme class to document for Tailwind
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark"); // Save to localStorage
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light"); // Save to localStorage
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

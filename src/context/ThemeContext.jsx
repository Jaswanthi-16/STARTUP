import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext(undefined);

/**
 * ThemeProvider component that wraps the app to provide theme state management.
 * @param {Object} props - React props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element}
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('startup-crm-theme', false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  /**
   * Toggles the current theme between light and dark
   */
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Custom hook to consume the ThemeContext
 * @returns {{
 *   isDarkMode: boolean,
 *   toggleTheme: () => void
 * }}
 * @throws {Error} If used outside of ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeContext };

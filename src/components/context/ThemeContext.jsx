import React, { createContext, useState, useContext } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

// Create the context
const ThemeContext = createContext();

// Custom hook for using the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

  // Define the theme based on the current mode
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <div className={isDarkMode ? 'bg-[#333] text-white' : 'bg-[#f5f5f5]  text-black'}>
          {children}
        </div>
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

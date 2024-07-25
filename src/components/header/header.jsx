import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header className={`w-[5%]  pb-[70px] ml-[1380px] flex justify-between items-center p-4 ${isDarkMode ? 'bg-[#333] text-white' : 'bg-[#f5f5f5] text-gray-800'}`}>
        <button
          onClick={toggleTheme}
          className={`flex items-center px-4 py-2 rounded ${
            isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-600 hover:bg-gray-500 text-white'
          }`}
        >
          {isDarkMode ? (
            <>
              <LightModeIcon className="mr-2" /> LIGHT 
            </>
          ) : (
            <>
              <DarkModeIcon className="mr-2" /> DARK
            </>
          )}
        </button>
        {/* Other header content */}
      </header>
    </ThemeProvider>
  );
};

export default Header;

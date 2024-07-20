import React from 'react';
import { useTheme } from './ThemeContext'; // Adjust the import path as needed

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded focus:outline-none ${
        theme === 'dark' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'
      }`}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
};

export default ThemeToggleButton;

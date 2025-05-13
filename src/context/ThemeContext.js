import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  REACT: 'react',
  PURPLE: 'purple',
  OCEAN: 'ocean',
  SUNSET: 'sunset'
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [colorTheme, setColorTheme] = useState(THEMES.OCEAN);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const changeColorTheme = (theme) => {
    setColorTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme, 
      colorTheme, 
      changeColorTheme,
      THEMES 
    }}>
      <div className={`theme-${colorTheme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 
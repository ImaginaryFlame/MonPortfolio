import React, { useState, useEffect } from 'react';

const ThemeConfig = ({ onThemeChange }) => {
  const themes = {
    flamme: {
      background: '/assets/img/flame-bg.webp',
      name: 'Flamme Imaginaire'
    },
    fantasy: {
      background: '/assets/img/fantasy-bg.webp', 
      name: 'Fantasy'
    },
    cyberpunk: {
      background: '/assets/img/cyberpunk-bg.webp',
      name: 'Cyberpunk'
    },
    space: {
      background: '/assets/img/space-bg.webp',
      name: 'Space'
    }
  };

  const [currentTheme, setCurrentTheme] = useState('flamme');

  useEffect(() => {
    onThemeChange(themes[currentTheme]);
  }, [currentTheme, onThemeChange]);

  const handleThemeChange = (themeKey) => {
    setCurrentTheme(themeKey);
  };

  return {
    currentTheme: themes[currentTheme],
    handleThemeChange,
    themes
  };
};

export default ThemeConfig;
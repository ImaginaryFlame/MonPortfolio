import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Projects from './Projects';
import Banner from './Home/Banner';
import SkillsSection from './Home/SkillsSection';
import { useLanguage } from '../hooks/useLanguage.jsx';

const themes = [
  {
    background: '/assets/img/F7xrYybWcAEztt2.webp',
    name: 'moonscape'
  }
];

const ThemeContext = React.createContext();

const Home = () => {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  useEffect(() => {
    setCurrentTheme(themes[0]);
  }, []);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className="w-full">
        <Banner theme={currentTheme} />
        <SkillsSection />
        <Projects />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default Home;
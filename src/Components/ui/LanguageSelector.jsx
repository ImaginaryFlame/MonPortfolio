import React, { useState, useEffect, useRef } from 'react';

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('FR');
  const dropdownRef = useRef(null);

  const languages = [
    { 
      code: 'FR', 
      name: 'Français', 
      flag: (
        <svg width="16" height="12" viewBox="0 0 3 2" className="inline-block">
          <rect width="1" height="2" fill="#002654"/>
          <rect x="1" width="1" height="2" fill="#FFFFFF"/>
          <rect x="2" width="1" height="2" fill="#CE1126"/>
        </svg>
      )
    },
    { 
      code: 'EN', 
      name: 'English', 
      flag: (
        <svg width="16" height="10" viewBox="0 0 60 30" className="inline-block">
          <clipPath id="t">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
          </clipPath>
          <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#t)"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
        </svg>
      )
    },
    { 
      code: 'PT', 
      name: 'Português', 
      flag: (
        <svg width="16" height="11" viewBox="0 0 3 2" className="inline-block">
          <rect width="3" height="2" fill="#FF0000"/>
          <rect width="1.2" height="2" fill="#006600"/>
        </svg>
      )
    },
    { 
      code: 'JP', 
      name: '日本語', 
      flag: (
        <svg width="16" height="11" viewBox="0 0 3 2" className="inline-block">
          <rect width="3" height="2" fill="#FFFFFF"/>
          <circle cx="1.5" cy="1" r="0.6" fill="#BC002D"/>
        </svg>
      )
    }
  ];

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language.code);
    setIsOpen(false);
    console.log(`Langue changée vers: ${language.name}`);
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full hover:from-orange-500 hover:to-red-600 transition-all duration-500 ease-out hover:transform hover:scale-105 hover:shadow-lg shadow-lg flex items-center justify-center"
        title={`Langue: ${currentLanguage?.name}`}
      >
        <span className="flex items-center justify-center">
          {currentLanguage?.flag}
        </span>
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 mt-2 w-48 bg-gradient-to-b from-slate-800/95 to-blue-900/95 backdrop-blur-sm border border-slate-600 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        <div className="py-2">
          {languages.map((language, index) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-orange-600/90 hover:to-red-600/90 ${
                selectedLanguage === language.code
                  ? 'bg-gradient-to-r from-orange-500/80 to-red-500/80 text-white'
                  : 'text-white hover:text-white'
              }`}
            >
              <span className="flex items-center justify-center w-6">
                {language.flag}
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{language.name}</span>
                <span className="text-xs opacity-75">{language.code}</span>
              </div>
              {selectedLanguage === language.code && (
                <span className="ml-auto text-orange-400">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LanguageSelector; 
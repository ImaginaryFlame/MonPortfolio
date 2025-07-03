import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Projects from './Projects';
import { fetchProjectsForGallery, urlFor, getProjectDestination } from '../config/sanityClient';
import { useLanguage } from '../hooks/useLanguage.jsx';

// Configuration des thèmes avec leurs couleurs adaptées
const themes = [
  {
    background: '/assets/img/F7xrYybWcAEztt2.webp',
    name: 'moonscape',
    colors: {
      primary: 'purple-500',
      secondary: 'blue-400',
      accent: 'indigo-300',
      text: 'purple-300',
      button: 'purple-600',
      buttonHover: 'purple-700',
      shadow: 'purple-500/25'
    }
  },
  {
    background: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2125&q=80',
    name: 'cyberpunk',
    colors: {
      primary: 'cyan-500',
      secondary: 'teal-400',
      accent: 'cyan-300',
      text: 'cyan-300',
      button: 'cyan-600',
      buttonHover: 'cyan-700',
      shadow: 'cyan-500/25'
    }
  },
  {
    background: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    name: 'sunset',
    colors: {
      primary: 'orange-500',
      secondary: 'red-400',
      accent: 'yellow-300',
      text: 'orange-300',
      button: 'orange-600',
      buttonHover: 'orange-700',
      shadow: 'orange-500/25'
    }
  },
  {
    background: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    name: 'forest',
    colors: {
      primary: 'green-500',
      secondary: 'emerald-400',
      accent: 'lime-300',
      text: 'green-300',
      button: 'green-600',
      buttonHover: 'green-700',
      shadow: 'green-500/25'
    }
  }
];

// Context pour partager le thème - exporté en haut pour éviter les problèmes de Fast Refresh
export const ThemeContext = React.createContext();

// Section Compétences
const SkillsSection = ({ theme }) => {
  const { t } = useLanguage();
  
  const skills = [
    {
      category: t.skills.categories.development,
      icon: "💻",
      items: [
        { name: "Java", level: 40 },
        { name: "JavaScript", level: 30 },
        { name: "React", level: 30 },
        { name: "C++", level: 20 },
        { name: "C#", level: 20 }
      ]
    },
    {
      category: t.skills.categories.design,
      icon: "🎨",
      items: [
        { name: "Photoshop", level: 50 },
        { name: "Blender", level: 20 },
        { name: "After Effects", level: 15 },
        { name: "Clip Studio Paint", level: 15 },
        { name: "Maya", level: 15 }
      ]
    },
    {
      category: t.skills.categories.content,
      icon: "📹",
      items: [
        { name: "Écriture", level: 65 },
        { name: "Community Management", level: 65 },
        { name: "Streaming", level: 55 },
        { name: "DaVinci Resolve", level: 45 },
        { name: "Filmora", level: 30 },
        { name: "Final Draft", level: 45 }
      ]
    },
    {
      category: t.skills.categories.tools,
      icon: "⚙️",
      items: [
        { name: "Obsidian", level: 80 },
        { name: "Sanity CMS", level: 40 },
        { name: "Notion", level: 30 },
        { name: "Git", level: 30 },
        { name: "Figma", level: 20 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background avec overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${theme.background}')` }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Titre de section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold title-gradient mb-6 drop-shadow-2xl">
            {t.skills.title}
          </h2>
          <p className="text-xl description-gradient max-w-3xl mx-auto drop-shadow-lg">
            {t.skills.description}
          </p>
        </div>

        {/* Grille des compétences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillCategory, index) => (
            <div
              key={skillCategory.category}
              className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 
                         hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Header de catégorie */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{skillCategory.icon}</div>
                <h3 className="text-xl font-bold text-white">{skillCategory.category}</h3>
              </div>
              
              {/* Liste des compétences */}
              <div className="space-y-4">
                {skillCategory.items.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                      <span className="text-purple-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${index * 0.2 + skillIndex * 0.1}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats générales */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "1+", label: t.skills.stats.experience },
            { number: "3+", label: t.skills.stats.projects },
            { number: "4", label: t.skills.stats.universes },
            { number: "∞", label: t.skills.stats.passion }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



const Banner = ({ theme }) => {
  const { t } = useLanguage();
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = t.banner.roles;
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [isWaiting, setIsWaiting] = useState(false);
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0 });
  const period = 3000; // Temps d'attente plus long pour lire
  const typingSpeed = 120; // Vitesse de frappe plus lente et régulière
  const deletingSpeed = 60; // Vitesse de suppression plus rapide

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);
    
    setText(updatedText);
    
    if (isDeleting) {
      setDelta(deletingSpeed);
    } else {
      setDelta(typingSpeed + Math.random() * 50); // Variation naturelle
    }
    
    if (!isDeleting && updatedText === fullText) {
      setIsWaiting(true);
      setDelta(period);
      setTimeout(() => {
        setIsDeleting(true);
        setIsWaiting(false);
      }, period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  useEffect(() => {
    if (!isWaiting) {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => clearInterval(ticker);
    }
  }, [text, delta, loopNum, isDeleting, isWaiting]);

  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculer la position relative de la souris par rapport au centre du bouton
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Limiter le déplacement de la flèche (maximum 15px dans chaque direction)
    const maxOffset = 15;
    const limitedX = Math.max(-maxOffset, Math.min(maxOffset, mouseX * 0.3));
    const limitedY = Math.max(-maxOffset, Math.min(maxOffset, mouseY * 0.3));
    
    setArrowPosition({ x: limitedX, y: limitedY });
  };

  const handleMouseLeave = () => {
    // Remettre la flèche au centre quand la souris quitte le bouton
    setArrowPosition({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-24">
      <div 
        className="absolute inset-0 bg-cover transition-all duration-1000"
        style={{ 
          backgroundImage: `url('${theme.background}')`,
          backgroundPosition: 'center 20%'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Couche 1 : Particules brillantes d'ambiance - INDÉPENDANTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={`ambient-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Couche 2 : Strass magiques flottants - INDÉPENDANTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={`large-strass-${i}`}
            className="absolute animate-ambient-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${8 + Math.random() * 6}s`
            }}
          >
            <div 
              className="w-4 h-4 bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 
                         rounded-full animate-ambient-glow opacity-70"
              style={{
                filter: 'blur(0.8px)',
                boxShadow: '0 0 12px rgba(147, 51, 234, 0.8), 0 0 24px rgba(147, 51, 234, 0.4)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Couche 3 : Strass moyens - INDÉPENDANTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={`medium-strass-${i}`}
            className="absolute animate-ambient-orbit"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${12 + Math.random() * 8}s`
            }}
          >
            <div 
              className="w-3 h-3 bg-gradient-to-r from-blue-300 via-violet-400 to-purple-500 
                         rounded-full animate-ambient-pulse opacity-60"
              style={{
                filter: 'blur(0.6px)',
                boxShadow: '0 0 10px rgba(99, 102, 241, 0.6), 0 0 20px rgba(99, 102, 241, 0.3)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Couche 4 : Petits strass rapides - INDÉPENDANTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={`small-strass-${i}`}
            className="absolute animate-ambient-drift"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            <div 
              className="w-2 h-2 bg-gradient-to-r from-pink-300 via-rose-400 to-violet-400 
                         rounded-full animate-ambient-twinkle opacity-80"
              style={{
                filter: 'blur(0.4px)',
                boxShadow: '0 0 8px rgba(236, 72, 153, 0.5), 0 0 16px rgba(236, 72, 153, 0.2)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Couche 5 : Strass géants occasionnels - INDÉPENDANTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={`giant-strass-${i}`}
            className="absolute animate-ambient-giant"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <div 
              className="w-6 h-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 
                         rounded-full animate-ambient-mega opacity-50"
              style={{
                filter: 'blur(1px)',
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.4), 0 0 60px rgba(251, 191, 36, 0.2)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Couche 6 : Paillettes déconnectées - TOTALEMENT INDÉPENDANTES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`disconnected-sparkle-${i}`}
            className="absolute animate-disconnected-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            <div 
              className="w-2.5 h-2.5 bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-400 
                         rounded-full animate-disconnected-glow opacity-60"
              style={{
                filter: 'blur(0.5px)',
                boxShadow: '0 0 10px rgba(20, 184, 166, 0.7), 0 0 20px rgba(20, 184, 166, 0.4)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Couche 7 : Micro paillettes déconnectées - AUTONOMES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={`micro-disconnected-${i}`}
            className="absolute animate-disconnected-dance"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          >
            <div 
              className="w-1 h-1 bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300 
                         rounded-full animate-disconnected-pulse opacity-70"
              style={{
                filter: 'blur(0.2px)',
                boxShadow: '0 0 6px rgba(139, 92, 246, 0.6), 0 0 12px rgba(139, 92, 246, 0.3)'
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        <div className="mb-8">
          <span className="text-xl font-medium drop-shadow-lg transition-colors duration-500 animate-fade-in" 
                style={{ color: '#E0E0E0', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            {t.banner.welcome}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl animate-slide-up" 
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          {t.banner.greeting}
          <br />
          {t.banner.andIAmAlso} <span className="relative inline-block">
            {/* Texte principal avec effet de brillance */}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 
                            drop-shadow-lg transition-all duration-300 animate-gradient-shift`}
                  style={{ 
                    textShadow: '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
                    backgroundSize: '200% 200%'
                  }}>
            {text}
            </span>
            

            
            {/* Curseur clignotant amélioré */}
            <span className="relative inline-block">
              <span className={`inline-block w-1 h-12 md:h-16 ml-1 bg-gradient-to-b from-violet-400 via-purple-400 to-blue-400 
                              animate-blink-smooth shadow-lg`}
                    style={{ 
                      boxShadow: '0 0 12px rgba(147, 51, 234, 0.8), 0 0 25px rgba(147, 51, 234, 0.5)',
                      transform: 'translateY(0.1em)'
                    }}>
              </span>
            </span>
          </span>
        </h1>
        
        <p className="text-xl max-w-3xl mx-auto mb-12 leading-relaxed text-gray-200 drop-shadow-lg animate-fade-in-delay" 
           style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          {t.banner.description}
        </p>

        <button 
          onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group flex flex-col items-center gap-2 px-12 py-2 button-gradient
                   text-white rounded-full font-semibold text-lg transition-all duration-500 
                   hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105
                   drop-shadow-lg mx-auto animate-bounce-in relative overflow-hidden"
        >
          {/* Effet de brillance sur le bouton */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                        transition-transform duration-1000 ease-out"></div>
          
          <span className="relative z-10">{t.banner.cta}</span>
          <span className="flex justify-center relative z-10">
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 36 36" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="animate-bounce"
              style={{
                transform: `translate(${arrowPosition.x}px, ${arrowPosition.y}px)`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              <polyline 
                points="8,14 18,26 28,14" 
                stroke="#fff" 
                strokeWidth="4" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </span>
        </button>
      </div>

      {/* Styles CSS personnalisés */}
      <style>
        {`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes button-gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes button-shimmer {
          0% { 
            background-position: -200% center; 
            opacity: 0;
          }
          50% { 
            background-position: 200% center; 
            opacity: 0.2;
          }
          100% { 
            background-position: 400% center; 
            opacity: 0;
          }
        }
        
        @keyframes blink-smooth {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        /* ANIMATIONS PAILLETTES D'AMBIANCE - INDÉPENDANTES */
        @keyframes ambient-float {
          0% { 
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0;
          }
          20% { 
            opacity: 1;
          }
          50% { 
            transform: translate(50px, -70px) rotate(180deg) scale(1.4);
            opacity: 0.9;
          }
          80% { 
            opacity: 0.8;
          }
          100% { 
            transform: translate(-40px, -140px) rotate(360deg) scale(0.6);
            opacity: 0;
          }
        }
        
        @keyframes ambient-orbit {
          0% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          25% { 
            opacity: 0.7;
            transform: translate(70px, 30px) rotate(90deg);
          }
          50% { 
            opacity: 1;
            transform: translate(50px, -70px) rotate(180deg);
          }
          75% { 
            opacity: 0.5;
            transform: translate(-30px, -50px) rotate(270deg);
          }
          100% { 
            opacity: 0;
            transform: translate(-70px, 30px) rotate(360deg);
          }
        }
        
        @keyframes ambient-drift {
          0% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          25% { 
            opacity: 1;
          }
          50% { 
            transform: translate(-60px, 90px) rotate(300deg);
            opacity: 0.9;
          }
          75% { 
            opacity: 0.6;
          }
          100% { 
            transform: translate(120px, -50px) rotate(600deg);
            opacity: 0;
          }
        }
        
        @keyframes ambient-giant {
          0% { 
            transform: translate(0, 0) rotate(0deg) scale(0);
            opacity: 0;
          }
          15% { 
            opacity: 0.4;
            transform: scale(0.6);
          }
          50% { 
            transform: translate(30px, -120px) rotate(200deg) scale(1.6);
            opacity: 0.9;
          }
          85% { 
            opacity: 0.3;
            transform: translate(-50px, -220px) rotate(340deg) scale(0.4);
          }
          100% { 
            transform: translate(-80px, -280px) rotate(360deg) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes ambient-glow {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            filter: blur(0.9px) brightness(1);
          }
          30% { 
            transform: scale(1.5) rotate(120deg);
            filter: blur(0.3px) brightness(1.8);
          }
          60% { 
            transform: scale(0.6) rotate(240deg);
            filter: blur(1.4px) brightness(0.6);
          }
          90% { 
            transform: scale(1.3) rotate(300deg);
            filter: blur(0.5px) brightness(1.4);
          }
        }
        
        @keyframes ambient-pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(0.7);
            filter: blur(0.7px) brightness(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.3);
            filter: blur(0.2px) brightness(1.6);
          }
        }
        
        @keyframes ambient-twinkle {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(0.5);
          }
          50% { 
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        @keyframes ambient-mega {
          0%, 100% { 
            opacity: 0.1;
            transform: scale(0.4) rotate(0deg);
            filter: blur(1.2px) brightness(1);
          }
          40% { 
            opacity: 0.9;
            transform: scale(1.4) rotate(144deg);
            filter: blur(0.4px) brightness(2.2);
          }
          70% { 
            opacity: 0.5;
            transform: scale(0.8) rotate(288deg);
            filter: blur(1.8px) brightness(1.1);
          }
        }
        
        /* ANIMATIONS PAILLETTES DÉCONNECTÉES - AUTONOMES */
        @keyframes disconnected-float {
          0% { 
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0;
          }
          25% { 
            opacity: 0.8;
            transform: translate(80px, -40px) rotate(120deg) scale(1.2);
          }
          50% { 
            opacity: 1;
            transform: translate(-30px, -90px) rotate(240deg) scale(0.9);
          }
          75% { 
            opacity: 0.6;
            transform: translate(40px, -130px) rotate(300deg) scale(1.3);
          }
          100% { 
            transform: translate(-60px, -180px) rotate(360deg) scale(0.7);
            opacity: 0;
          }
        }
        
        @keyframes disconnected-glow {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            filter: blur(0.5px) brightness(1);
          }
          33% { 
            transform: scale(1.6) rotate(100deg);
            filter: blur(0.2px) brightness(2);
          }
          66% { 
            transform: scale(0.5) rotate(200deg);
            filter: blur(0.8px) brightness(0.8);
          }
        }
        
        @keyframes disconnected-dance {
          0% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          20% { 
            opacity: 1;
            transform: translate(25px, 15px) rotate(72deg);
          }
          40% { 
            transform: translate(-15px, -25px) rotate(144deg);
            opacity: 0.8;
          }
          60% { 
            transform: translate(35px, -35px) rotate(216deg);
            opacity: 1;
          }
          80% { 
            transform: translate(-25px, -45px) rotate(288deg);
            opacity: 0.7;
          }
          100% { 
            transform: translate(10px, -60px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes disconnected-pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(0.6);
            filter: blur(0.2px) brightness(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.4);
            filter: blur(0.1px) brightness(1.8);
          }
        }

        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 3s ease-in-out infinite;
        }
        
        .animate-blink-smooth {
          animation: blink-smooth 1s infinite;
        }
        
        /* CLASSES ANIMATIONS PAILLETTES D'AMBIANCE */
        .animate-ambient-float {
          animation: ambient-float 12s ease-in-out infinite;
        }
        
        .animate-ambient-orbit {
          animation: ambient-orbit 18s ease-in-out infinite;
        }
        
        .animate-ambient-drift {
          animation: ambient-drift 10s ease-in-out infinite;
        }
        
        .animate-ambient-giant {
          animation: ambient-giant 25s ease-in-out infinite;
        }
        
        .animate-ambient-glow {
          animation: ambient-glow 5s ease-in-out infinite;
        }
        
        .animate-ambient-pulse {
          animation: ambient-pulse 4s ease-in-out infinite;
        }
        
        .animate-ambient-twinkle {
          animation: ambient-twinkle 3s ease-in-out infinite;
        }
        
        .animate-ambient-mega {
          animation: ambient-mega 8s ease-in-out infinite;
        }
        
        /* CLASSES ANIMATIONS PAILLETTES DÉCONNECTÉES */
        .animate-disconnected-float {
          animation: disconnected-float 8s ease-in-out infinite;
        }
        
        .animate-disconnected-glow {
          animation: disconnected-glow 4s ease-in-out infinite;
        }
        
        .animate-disconnected-dance {
          animation: disconnected-dance 5s ease-in-out infinite;
        }
        
        .animate-disconnected-pulse {
          animation: disconnected-pulse 2s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.5s both;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out 1s both;
        }
        
        .button-gradient {
          background: linear-gradient(135deg, #7c3aed, #9333ea, #3b82f6, #7c3aed);
          background-size: 200% 200%;
          animation: button-gradient-shift 5s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }
        
        .button-gradient::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.25),
            transparent
          );
          background-size: 200% 100%;
          animation: button-shimmer 7s ease-in-out infinite;
          pointer-events: none;
          border-radius: inherit;
          z-index: 1;
        }
        
        .button-gradient > * {
          position: relative;
          z-index: 2;
        }
        
        .button-gradient:hover {
          background: linear-gradient(135deg, #6d28d9, #7c3aed, #2563eb, #6d28d9);
          background-size: 200% 200%;
          animation: button-gradient-shift 4s ease-in-out infinite;
        }
        
        @keyframes title-gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes title-shimmer {
          0% { 
            background-position: -200% center; 
            opacity: 0;
          }
          50% { 
            background-position: 200% center; 
            opacity: 0.3;
          }
          100% { 
            background-position: 400% center; 
            opacity: 0;
          }
        }
        
        .title-gradient {
          background: linear-gradient(90deg, #ffffff, #f8f8f8, #ffffff, #f0f0f0, #ffffff);
          background-size: 300% 100%;
          animation: title-gradient-shift 4s ease-in-out infinite;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
        
        .description-gradient {
          background: linear-gradient(90deg, #e0e0e0, #f0f0f0, #e0e0e0, #d0d0d0, #e0e0e0);
          background-size: 300% 100%;
          animation: title-gradient-shift 5s ease-in-out infinite;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }
        `}
      </style>
    </section>
  );
};

const Home = () => {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  useEffect(() => {
    setCurrentTheme(themes[0]);
  }, []);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className="w-full">
        <Banner theme={currentTheme} />
        <SkillsSection theme={currentTheme} />
        
        {/* Galerie interactive principale - remplace l'aperçu */}
        <Projects />
        
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default Home;
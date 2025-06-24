import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const UniversNarratifs = () => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  
  // Animation d'entrée
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Gestion du mouvement de la souris pour les effets parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const univers = [
    {
      title: t.universes.projects.flammeImaginaire.title,
      path: "/creation/univers-narratifs/flamme-imaginaire",
      description: "Une licence transmédia ambitieuse mêlant shōnen, slice of life, aventure psychologique et comédie satirique. L'histoire suit Travis Wetu Cardoso dans un monde fracturé inspiré de Vesontio (Besançon alternatif), explorant les luttes identitaires avec un humour oscillant entre cartoon et satire.",
      image: "/assets/img/flammeimaginaire-banner.webp",
      isMainSeries: true,
      colors: {
        primary: '#FF6B35',
        secondary: '#F7931E',
        accent: '#FFD700',
        glow: 'rgba(255, 107, 53, 0.5)'
      },
      icon: '🔥',
      tags: ['Shōnen', 'Slice of Life', 'Comédie', 'Psychologique'],
      genre: 'Transmédia',
      status: 'En développement'
    },
    {
      title: t.universes.projects.herosFee.title,
      path: "/creation/univers-narratifs/fable-heros-fee",
      description: "Un conte féérique moderne où la magie rencontre la réalité contemporaine. Une aventure épique à travers des royaumes enchantés peuplés de créatures mystiques et de héros au destin entrelacé.",
      image: "/assets/img/herosfee-banner.webp",
      connectedTo: "flamme-imaginaire",
      colors: {
        primary: '#9C27B0',
        secondary: '#E91E63',
        accent: '#FF9800',
        glow: 'rgba(156, 39, 176, 0.5)'
      },
      icon: '🧚‍♀️',
      tags: ['Fantasy', 'Magie', 'Aventure', 'Féérique'],
      genre: 'Conte Moderne',
      status: 'Concept'
    },
    {
      title: t.universes.projects.vinceBelii.title,
      path: "/creation/univers-narratifs/vince-belii",
      description: "Une saga de guerre et de stratégie politique dans un monde médiéval-fantasy où les familles nobles s'affrontent pour le pouvoir. Intrigues, batailles épiques et développement de personnages complexes.",
      image: "/assets/img/vincebelii-banner.webp",
      colors: {
        primary: '#2196F3',
        secondary: '#03DAC6',
        accent: '#BB86FC',
        glow: 'rgba(33, 150, 243, 0.5)'
      },
      icon: '⚔️',
      tags: ['Guerre', 'Stratégie', 'Politique', 'Medieval'],
      genre: 'Epic Fantasy',
      status: 'Planification'
    },
    {
      title: t.universes.projects.pandemie.title,
      path: "/creation/univers-narratifs/pandemie-lara",
      description: "Un thriller post-apocalyptique explorant la survie humaine dans un monde ravagé. Une histoire d'espoir, de résilience et de reconstruction sociale face à l'adversité.",
      image: "/assets/img/pandemielara-banner.webp",
      colors: {
        primary: '#4CAF50',
        secondary: '#8BC34A',
        accent: '#CDDC39',
        glow: 'rgba(76, 175, 80, 0.5)'
      },
      icon: '🌿',
      tags: ['Post-Apo', 'Survie', 'Thriller', 'Espoir'],
      genre: 'Science-Fiction',
      status: 'Développement'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden relative">
      {/* Particules de fond animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Gradient de fond réactif */}
      <div 
        className="absolute inset-0 opacity-10 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                      ${hoveredCard ? univers.find((_, i) => i === hoveredCard)?.colors.primary : '#4F46E5'} 0%, 
                      transparent 50%)`
        }}
      />
      
      <div 
        ref={containerRef}
        className={`relative z-10 max-w-7xl mx-auto p-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header avec animation */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
              {t.universes.title}
            </h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
          </div>
          <p className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed">
            Explorez les mondes extraordinaires nés de l'imagination, chacun avec ses propres règles, mystères et aventures épiques.
          </p>
        </div>

        {/* Grille des univers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {univers.map((univers, index) => (
            <Link 
              to={univers.path}
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-700 transform hover:scale-[1.02] ${
                univers.isMainSeries ? 'lg:col-span-2 lg:h-[500px]' : 'h-[400px]'
              }`}
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Container avec glassmorphism */}
              <div className="relative h-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
                
                {/* Bordure animée */}
                <div 
                  className="absolute inset-0 rounded-3xl p-[2px] transition-all duration-500"
                  style={{
                    background: hoveredCard === index 
                      ? `linear-gradient(45deg, ${univers.colors.primary}, ${univers.colors.secondary}, ${univers.colors.accent}, ${univers.colors.primary})`
                      : 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                    backgroundSize: '300% 300%',
                    animation: hoveredCard === index ? 'gradientMove 3s ease infinite' : 'none'
                  }}
                >
                  <div className="h-full bg-gray-900/80 rounded-3xl"></div>
                </div>

                {/* Image de fond avec parallax */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <img 
                    src={univers.image} 
                    alt={univers.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    style={{
                      transform: hoveredCard === index ? 'scale(1.15)' : 'scale(1.05)'
                    }}
                  />
                  
                  {/* Overlay avec gradient animé */}
                  <div 
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: hoveredCard === index 
                        ? `linear-gradient(135deg, ${univers.colors.primary}20, ${univers.colors.secondary}40, black)`
                        : 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.8))'
                    }}
                  />
                </div>

                {/* Effet de lueur au hover */}
                <div 
                  className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                    hoveredCard === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    boxShadow: `0 0 50px ${univers.colors.glow}, inset 0 0 50px ${univers.colors.glow}20`
                  }}
                />

                {/* Layout supérieur réorganisé */}
                <div className="absolute top-0 left-0 right-0 p-6 z-20">
                  <div className="flex justify-between items-start">
                    {/* Tags à gauche */}
                    <div className="flex flex-col gap-2 max-w-[60%]">
                      {/* Status badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border transition-all duration-300 ${
                            hoveredCard === index 
                              ? 'bg-white/25 text-white border-white/40' 
                              : 'bg-black/40 text-gray-200 border-gray-500'
                          }`}
                          style={{
                            backgroundColor: hoveredCard === index ? `${univers.colors.primary}40` : undefined,
                            borderColor: hoveredCard === index ? `${univers.colors.primary}60` : undefined
                          }}
                        >
                          ● {univers.status}
                        </span>
                        <span 
                          className={`px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm transition-all duration-300 ${
                            hoveredCard === index 
                              ? 'bg-white/20 text-white' 
                              : 'bg-black/30 text-gray-300'
                          }`}
                        >
                          {univers.genre}
                        </span>
                      </div>
                      
                      {/* Tags principaux */}
                      <div className="flex flex-wrap gap-1.5">
                        {univers.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm border transition-all duration-300 transform hover:scale-105 ${
                              hoveredCard === index 
                                ? 'bg-white/20 text-white border-white/30 shadow-lg' 
                                : 'bg-black/30 text-gray-300 border-gray-600'
                            }`}
                            style={{
                              boxShadow: hoveredCard === index ? `0 0 10px ${univers.colors.glow}` : 'none',
                              animationDelay: `${tagIndex * 100}ms`
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Icône à droite */}
                    <div 
                      className={`text-4xl transition-all duration-500 ${
                        hoveredCard === index ? 'scale-125 rotate-12' : 'scale-100'
                      }`}
                      style={{
                        filter: hoveredCard === index ? `drop-shadow(0 0 20px ${univers.colors.glow})` : 'none'
                      }}
                    >
                      {univers.icon}
                    </div>
                  </div>

                  {/* Badge de connexion centré en dessous */}
                  {univers.connectedTo && (
                    <div className="flex justify-center mt-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-400/30">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-purple-300 font-medium">
                          {t.universes.connectedToMain}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contenu principal */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="space-y-4">
                    {/* Titre avec animation */}
                    <h3 
                      className={`font-bold transition-all duration-300 ${
                        univers.isMainSeries ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'
                      }`}
                      style={{
                        color: hoveredCard === index ? univers.colors.accent : 'white',
                        textShadow: hoveredCard === index ? `0 0 20px ${univers.colors.glow}` : 'none'
                      }}
                    >
                      {univers.title}
                    </h3>
                    
                    {/* Description */}
                    <p className={`text-gray-300 leading-relaxed transition-all duration-300 ${
                      univers.isMainSeries ? 'text-lg max-w-3xl' : 'text-base'
                    } ${hoveredCard === index ? 'text-white' : ''}`}>
                      {univers.description}
                    </p>

                    {/* Bouton d'action animé */}
                    <div className="flex items-center gap-3 mt-6">
                      <div 
                        className={`flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                          hoveredCard === index 
                            ? 'bg-white/20 border-white/30 scale-105' 
                            : 'bg-black/30 border-gray-600'
                        }`}
                        style={{
                          boxShadow: hoveredCard === index ? `0 0 20px ${univers.colors.glow}` : 'none'
                        }}
                      >
                        <span className="font-medium">Explorer l'univers</span>
                        <svg 
                          className={`w-5 h-5 transition-transform duration-300 ${
                            hoveredCard === index ? 'translate-x-1' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>

                      {/* Indicateur de contenu */}
                      <div className="flex items-center gap-1">
                        {[...Array(Math.floor(Math.random() * 3) + 3)].map((_, i) => (
                          <div 
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              hoveredCard === index ? 'bg-white scale-125' : 'bg-gray-500'
                            }`}
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Effet de particules au hover */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full opacity-60 animate-float"
                        style={{
                          backgroundColor: univers.colors.accent,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${2 + Math.random() * 3}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Section statistiques */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Univers Créés', value: '4', icon: '🌍' },
            { label: 'Personnages', value: '50+', icon: '👥' },
            { label: 'Heures de Lore', value: '200+', icon: '📚' },
            { label: 'Illustrations', value: '100+', icon: '🎨' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles CSS intégrés */}
      <style jsx>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default UniversNarratifs; 
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const Labo = () => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  
  // Changer le titre de l'onglet
  useEffect(() => {
    document.title = "🧪 Flame's Lab | MonPortfolio - Laboratoire Technique";
    return () => {
      document.title = "MonPortfolio - Flamme Créative | Univers Narratifs, Labo Tech & Studio";
    };
  }, []);
  
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
  
  const laboSections = [
    {
      id: 'design',
      title: 'DESIGN & INTERFACE',
      description: 'Créations visuelles et interfaces utilisateurs - Prototypes interactifs et études UX/UI pour des expériences numériques innovantes',
      color: '#8B5CF6',
      image: null,
      featured: true,
      status: 'Design actif',
      tags: ['UI/UX Design', 'Prototypes', 'Interface'],
      icon: '🎨'
    },
    {
      id: 'dev',
      title: 'DÉVELOPPEMENT',
      description: 'Projets techniques et démos interactives - Applications web, prototypes de jeux et expérimentations technologiques',
      color: '#10B981',
      image: null,
      status: 'En développement',
      tags: ['Web Dev', 'Portfolio', 'Prototypes Jeu', 'Tech'],
      icon: '⚡'
    },
    {
      id: 'academique',
      title: 'PROJETS ACADÉMIQUES',
      description: 'Travaux universitaires et concours - Projets primés développés dans le cadre de ma formation et de compétitions académiques',
      color: '#F59E0B',
      image: null,
      status: 'Formation CNAM',
      tags: ['Académique', 'Concours', 'Innovation'],
      icon: '🎓',
      isAwardWinning: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden relative pt-20 md:pt-24">
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
                      ${hoveredCard !== null ? laboSections[hoveredCard]?.color : '#4F46E5'} 0%, 
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-green-500 to-yellow-500 animate-gradient-x">
              🧪 FLAME'S LAB
            </h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
          </div>
          <p className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed">
            Laboratoire de création technique et académique où naissent les innovations et expérimentations numériques.
          </p>
        </div>

        {/* Grille des sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {laboSections.map((section, index) => (
            <Link 
              to={`/creation/labo/${section.id}`}
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-700 transform hover:scale-[1.02] ${
                section.featured ? 'lg:col-span-2 lg:h-[500px]' : 'h-[400px]'
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
                      ? `linear-gradient(45deg, ${section.color}, ${section.color}20, ${section.color}40, ${section.color}60)`
                      : 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                    backgroundSize: '300% 300%',
                    animation: hoveredCard === index ? 'gradientMove 3s ease infinite' : 'none'
                  }}
                >
                  <div className="h-full bg-gray-900/80 rounded-3xl"></div>
                </div>

                {/* Image de fond avec parallax */}
                {section.image && (
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <img 
                      src={section.image} 
                      alt={section.title}
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
                          ? `linear-gradient(135deg, ${section.color}20, ${section.color}40, black)`
                          : 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.8))'
                      }}
                    />
                  </div>
                )}

                {/* Effet de lueur au hover */}
                <div 
                  className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                    hoveredCard === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    boxShadow: `0 0 50px ${section.color}20, inset 0 0 50px ${section.color}40`
                  }}
                />

                {/* Layout supérieur réorganisé */}
                <div className="absolute top-0 left-0 right-0 p-6 z-20">
                  <div className="flex justify-between items-start">
                    {/* Tags à gauche */}
                    <div className="flex flex-col gap-2 max-w-[70%]">
                      {/* Status badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border transition-all duration-300 ${
                            hoveredCard === index 
                              ? 'bg-white/25 text-white border-white/40' 
                              : 'bg-black/40 text-gray-200 border-gray-500'
                          }`}
                          style={{
                            backgroundColor: hoveredCard === index ? `${section.color}40` : undefined,
                            borderColor: hoveredCard === index ? `${section.color}60` : undefined
                          }}
                        >
                          ● {section.status}
                        </span>
                      </div>
                      
                      {/* Tags principaux */}
                      <div className="flex flex-wrap gap-1.5">
                        {section.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm border transition-all duration-300 transform hover:scale-105 ${
                              hoveredCard === index 
                                ? 'bg-white/20 text-white border-white/30 shadow-lg' 
                                : 'bg-black/30 text-gray-300 border-gray-600'
                            }`}
                            style={{
                              boxShadow: hoveredCard === index ? `0 0 10px ${section.color}20` : 'none',
                              animationDelay: `${tagIndex * 50}ms`
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
                        filter: hoveredCard === index ? `drop-shadow(0 0 20px ${section.color}20)` : 'none'
                      }}
                    >
                      {section.icon}
                    </div>
                  </div>

                  {/* Badge pour les projets primés */}
                  {section.isAwardWinning && (
                    <div className="flex justify-center mt-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-400/30">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-yellow-300 font-medium">
                          Projets Primés
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
                        section.featured ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'
                      }`}
                      style={{
                        color: hoveredCard === index ? section.color : 'white',
                        textShadow: hoveredCard === index ? `0 0 20px ${section.color}20` : 'none'
                      }}
                    >
                      {section.title}
                    </h3>
                    
                    {/* Description */}
                    <p className={`text-gray-300 leading-relaxed transition-all duration-300 ${
                      section.featured ? 'text-lg max-w-3xl' : 'text-base'
                    } ${hoveredCard === index ? 'text-white' : ''}`}>
                      {section.description}
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
                          boxShadow: hoveredCard === index ? `0 0 20px ${section.color}20` : 'none'
                        }}
                      >
                        <span className="font-medium">Explorer le labo</span>
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
                          backgroundColor: section.color,
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
            { label: 'Projets Techniques', value: '3', icon: '⚡' },
            { label: 'Prototypes de Jeu', value: '3', icon: '🎮' },
            { label: 'Langages Maîtrisés', value: '5', icon: '💻', tooltip: 'C++, C#, Java, JavaScript, React' },
            { label: 'Prix Remportés', value: '1', icon: '🏆' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group relative"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
              
              {/* Tooltip */}
              {stat.tooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
                  {stat.tooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
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

export default Labo; 
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
      id: 'flamme-imaginaire',
      title: 'LE HÉROS À LA FLAMME IMAGINAIRE',
      description: 'La licence principale d\'Imaginary Flame.\n\nUne histoire de fantasy urbaine, mêlant rêve et fiction, suivant le voyage initiatique d\'un jeune garçon cherchant à trouver une raison de vivre, d\'être aimé, d\'aider autrui et de fuir ses peurs et la réalité à travers l\'héroïsme et des aventures extra-dimensionnelles.',
      color: '#9333EA',
      image: null,
      featured: true,
      status: ['Série Animée', 'Mangas', 'Films d\'Animation'],
      tags: ['Fantasy Urbaine', 'Voyage Initiatique', 'Rêve & Fiction', 'Extra-Dimensionnel'],
      icon: '🔥'
    },
    {
      id: 'heros-fee',
      title: 'LA FABLE DU HÉROS ET LA FÉE',
      description: 'Spin-off connecté au Héros à la Flamme Imaginaire.\n\nÉpopée post-apocalyptique mêlant fantasy et science-fiction - Deux âmes perdues, un humain et une fée, unis par le destin pour sauver un monde qui les a rejetés.',
      color: '#EC4899',
      image: "/assets/img/F7xrYybWcAEztt2.webp",
      status: 'Trilogie en cours',
      tags: ['Fantasy Épique', 'Fées & Légendes', 'Trilogie'],
      icon: '🧚‍♀️',
      connectedTo: 'flamme-imaginaire'
    },
    {
      id: 'vince-belii',
      title: 'VINCE DE BELII',
      description: 'Light novel introspectif - L\'histoire personnelle d\'un jeune homme en quête d\'identité',
      color: '#8B5CF6',
      image: "/assets/img/262133663-288-k338692.webp",
      status: ['Visual Novel', 'Roman'],
      tags: ['Light Novel', 'Introspectif', 'Coming-of-age'],
      icon: '🚴‍♂️',
      isOriginalWork: true
    },
    {
      id: 'pandemie-lara',
      title: 'LA PANDÉMIE DE LARA',
      description: 'Post-apocalyptique et survie - Un monde dévasté où l\'humanité lutte pour survivre',
      color: '#DC2626',
      image: null,
      status: 'Concept exploratoire',
      tags: ['Post-Apocalyptique', 'Survie', 'Thriller'],
      icon: '🧟‍♀️',
      isOriginalWork: true
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
                      ${hoveredCard ? univers.find((_, i) => i === hoveredCard)?.color : '#4F46E5'} 0%, 
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
              LES UNIVERS DE FLAME
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
              to={`/creation/univers-narratifs/${univers.id}`}
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-700 transform hover:scale-[1.02] ${
                univers.featured ? 'lg:col-span-2 lg:h-[500px]' : 'h-[400px]'
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
                      ? `linear-gradient(45deg, ${univers.color}, ${univers.color}20, ${univers.color}40, ${univers.color}60)`
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
                      transform: hoveredCard === index ? 'scale(1.15)' : 'scale(1.05)',
                      // Amélioration spécifique pour Vince de Belii
                      ...(univers.id === 'vince-belii' && {
                        objectPosition: 'center 30%',
                        filter: 'brightness(1.1) contrast(1.05)',
                        transform: hoveredCard === index ? 'scale(1.18)' : 'scale(1.08)'
                      })
                    }}
                  />
                  
                  {/* Overlay avec gradient animé */}
                  <div 
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: hoveredCard === index 
                        ? `linear-gradient(135deg, ${univers.color}20, ${univers.color}40, black)`
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
                    boxShadow: `0 0 50px ${univers.color}20, inset 0 0 50px ${univers.color}40`
                  }}
                />

                {/* Layout supérieur réorganisé */}
                <div className="absolute top-0 left-0 right-0 p-6 z-20">
                  <div className="flex justify-between items-start">
                    {/* Tags à gauche */}
                    <div className="flex flex-col gap-2 max-w-[70%]">
                      {/* Status badge */}
                      <div className="flex items-center gap-2 mb-2">
                        {Array.isArray(univers.status) ? (
                          univers.status.map((status, statusIndex) => (
                            <span 
                              key={statusIndex}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border transition-all duration-300 ${
                                hoveredCard === index 
                                  ? 'bg-white/25 text-white border-white/40' 
                                  : 'bg-black/40 text-gray-200 border-gray-500'
                              }`}
                              style={{
                                backgroundColor: hoveredCard === index ? `${univers.color}40` : undefined,
                                borderColor: hoveredCard === index ? `${univers.color}60` : undefined
                              }}
                            >
                              ● {status}
                            </span>
                          ))
                        ) : (
                        <span 
                          className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border transition-all duration-300 ${
                            hoveredCard === index 
                              ? 'bg-white/25 text-white border-white/40' 
                              : 'bg-black/40 text-gray-200 border-gray-500'
                          }`}
                          style={{
                            backgroundColor: hoveredCard === index ? `${univers.color}40` : undefined,
                            borderColor: hoveredCard === index ? `${univers.color}60` : undefined
                          }}
                        >
                          ● {univers.status}
                        </span>
                        )}
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
                              boxShadow: hoveredCard === index ? `0 0 10px ${univers.color}20` : 'none',
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
                        filter: hoveredCard === index ? `drop-shadow(0 0 20px ${univers.color}20)` : 'none'
                      }}
                    >
                      {univers.icon}
                    </div>
                  </div>

                  {/* Badge de connexion centré en dessous */}
                  {univers.featured && (
                    <div className="flex justify-center mt-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-400/30">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-purple-300 font-medium">
                          Licence Principale
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Badge de connexion pour les univers connectés */}
                  {univers.connectedTo && (
                    <div className="flex justify-center mt-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/20 backdrop-blur-sm rounded-full border border-pink-400/30">
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-pink-300 font-medium">
                          Connecté à la Flamme Imaginaire
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Badge pour les œuvres originales */}
                  {univers.isOriginalWork && (
                    <div className="flex justify-center mt-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-blue-300 font-medium">
                          Œuvre Originale
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
                        univers.featured ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'
                      }`}
                      style={{
                        color: hoveredCard === index ? univers.color : 'white',
                        textShadow: hoveredCard === index ? `0 0 20px ${univers.color}20` : 'none'
                      }}
                    >
                      {univers.title}
                    </h3>
                    
                    {/* Description */}
                    <p className={`text-gray-300 leading-relaxed transition-all duration-300 ${
                      univers.featured ? 'text-lg max-w-3xl' : 'text-base'
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
                          boxShadow: hoveredCard === index ? `0 0 20px ${univers.color}20` : 'none'
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
                          backgroundColor: univers.color,
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
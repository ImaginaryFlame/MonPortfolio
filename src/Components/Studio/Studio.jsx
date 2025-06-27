import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const Studio = () => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  
  // Changer le titre de l'onglet
  useEffect(() => {
    document.title = "🎭 Flame's Studio | MonPortfolio - Création de Contenu";
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
  
  const studioSections = [
    {
      id: 'video',
      title: 'CONTENU YOUTUBE',
      description: 'Production YouTube complète - Vidéos longues, Shorts créatifs et miniatures accrocheuses pour un storytelling visuel impactant',
      color: '#EF4444',
      image: null,
      featured: true,
      status: 'Création active',
      tags: ['Vidéos', 'Shorts', 'Miniatures', 'Analytics'],
      icon: '🎬'
    },
    {
      id: 'twitch',
      title: 'CONTENU TWITCH',
      description: 'Live streaming et gaming - Streams interactifs, clips viraux et contenu communautaire pour une audience engagée',
      color: '#9146FF',
      image: null,
      featured: true,
      status: 'Live streaming',
      tags: ['Streams', 'Clips', 'Gaming', 'Community'],
      icon: '📺'
    },
    {
      id: 'social',
      title: 'CONTENU SOCIAL',
      description: 'Communication digitale et engagement - Threads captivants et contenus optimisés pour les réseaux sociaux et l\'interaction communautaire',
      color: '#3B82F6',
      image: null,
      status: 'Communauté active',
      tags: ['Twitter Threads', 'Engagement', 'Community'],
      icon: '📱'
    },
    {
      id: 'branding',
      title: 'BRANDING',
      description: 'Identité visuelle cohérente - Création de charte graphique, templates et éléments de marque pour une présence digitale distinctive',
      color: '#A855F7',
      image: null,
      status: 'Brand Evolution',
      tags: ['Identité Visuelle', 'Templates', 'Charte'],
      icon: '🎨'
    }
  ];

  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${hoveredCard !== null ? studioSections[hoveredCard]?.color : '#4F46E5'} 0%, transparent 50%)`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden relative pt-20 md:pt-24">
      {/* Particules de fond animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Gradient de fond réactif */}
      <div 
        className="absolute inset-0 opacity-10 transition-all duration-1000"
        style={gradientStyle}
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-blue-500 to-purple-500">
              🎭 FLAME'S STUDIO
            </h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
          </div>
          <p className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed">
            Studio de création de contenu numérique et audiovisuel pour bâtir une présence digitale captivante et authentique.
          </p>
        </div>

        {/* Grille des sections */}
        <div className="space-y-8">
          {/* Sections vidéo (YouTube et Twitch) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {studioSections.slice(0, 2).map((section, index) => (
              <Link 
                to={`/creation/studio/${section.id}`}
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-3xl transition-all duration-700 transform hover:scale-105 h-[450px]"
              >
                {/* Container avec glassmorphism */}
                <div className="relative h-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
                  
                  {/* Bordure animée */}
                  <div 
                    className="absolute inset-0 rounded-3xl p-[2px] transition-all duration-500"
                    style={{
                      background: hoveredCard === index 
                        ? `linear-gradient(45deg, ${section.color}, ${section.color}40)`
                        : 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1))'
                    }}
                  >
                    <div className="h-full bg-gray-900/80 rounded-3xl"></div>
                  </div>

                  {/* Effet de lueur au hover */}
                  <div 
                    className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                      hoveredCard === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      boxShadow: `0 0 50px ${section.color}20`
                    }}
                  />

                  {/* Layout supérieur */}
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
                          >
                            ● {section.status}
                          </span>
                        </div>
                        
                        {/* Tags principaux */}
                        <div className="flex flex-wrap gap-1.5">
                          {section.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm border transition-all duration-300 ${
                                hoveredCard === index 
                                  ? 'bg-white/20 text-white border-white/30' 
                                  : 'bg-black/30 text-gray-300 border-gray-600'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Icône à droite */}
                      <div 
                        className={`text-4xl transition-all duration-500 ${
                          hoveredCard === index ? 'scale-125' : 'scale-100'
                        }`}
                      >
                        {section.icon}
                      </div>
                    </div>
                  </div>

                  {/* Contenu principal */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="space-y-4">
                      {/* Titre avec animation */}
                      <h3 
                        className="text-2xl lg:text-3xl font-bold transition-all duration-300"
                        style={{
                          color: hoveredCard === index ? section.color : 'white'
                        }}
                      >
                        {section.title}
                      </h3>
                      
                      {/* Description */}
                      <p className={`text-gray-300 leading-relaxed transition-all duration-300 text-base ${
                        hoveredCard === index ? 'text-white' : ''
                      }`}>
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
                        >
                          <span className="font-medium">Explorer le studio</span>
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
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Autres sections (Social et Branding) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {studioSections.slice(2).map((section, index) => (
              <Link 
                to={`/creation/studio/${section.id}`}
                key={index + 2}
                onMouseEnter={() => setHoveredCard(index + 2)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-3xl transition-all duration-700 transform hover:scale-105 h-[400px]"
              >
                {/* Container avec glassmorphism */}
                <div className="relative h-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
                  
                  {/* Bordure animée */}
                  <div 
                    className="absolute inset-0 rounded-3xl p-[2px] transition-all duration-500"
                    style={{
                      background: hoveredCard === index + 2
                        ? `linear-gradient(45deg, ${section.color}, ${section.color}40)`
                        : 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1))'
                    }}
                  >
                    <div className="h-full bg-gray-900/80 rounded-3xl"></div>
                  </div>

                  {/* Effet de lueur au hover */}
                  <div 
                    className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                      hoveredCard === index + 2 ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      boxShadow: `0 0 50px ${section.color}20`
                    }}
                  />

                  {/* Layout supérieur */}
                  <div className="absolute top-0 left-0 right-0 p-6 z-20">
                    <div className="flex justify-between items-start">
                      {/* Tags à gauche */}
                      <div className="flex flex-col gap-2 max-w-[70%]">
                        {/* Status badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <span 
                            className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border transition-all duration-300 ${
                              hoveredCard === index + 2
                                ? 'bg-white/25 text-white border-white/40' 
                                : 'bg-black/40 text-gray-200 border-gray-500'
                            }`}
                          >
                            ● {section.status}
                          </span>
                        </div>
                        
                        {/* Tags principaux */}
                        <div className="flex flex-wrap gap-1.5">
                          {section.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm border transition-all duration-300 ${
                                hoveredCard === index + 2
                                  ? 'bg-white/20 text-white border-white/30' 
                                  : 'bg-black/30 text-gray-300 border-gray-600'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Icône à droite */}
                      <div 
                        className={`text-4xl transition-all duration-500 ${
                          hoveredCard === index + 2 ? 'scale-125' : 'scale-100'
                        }`}
                      >
                        {section.icon}
                      </div>
                    </div>
                  </div>

                  {/* Contenu principal */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="space-y-4">
                      {/* Titre avec animation */}
                      <h3 
                        className="text-2xl lg:text-3xl font-bold transition-all duration-300"
                        style={{
                          color: hoveredCard === index + 2 ? section.color : 'white'
                        }}
                      >
                        {section.title}
                      </h3>
                      
                      {/* Description */}
                      <p className={`text-gray-300 leading-relaxed transition-all duration-300 text-base ${
                        hoveredCard === index + 2 ? 'text-white' : ''
                      }`}>
                        {section.description}
                      </p>

                      {/* Bouton d'action animé */}
                      <div className="flex items-center gap-3 mt-6">
                        <div 
                          className={`flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                            hoveredCard === index + 2
                              ? 'bg-white/20 border-white/30 scale-105' 
                              : 'bg-black/30 border-gray-600'
                          }`}
                        >
                          <span className="font-medium">Explorer le studio</span>
                          <svg 
                            className={`w-5 h-5 transition-transform duration-300 ${
                              hoveredCard === index + 2 ? 'translate-x-1' : ''
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section statistiques */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Vidéos Créées', value: '25+', icon: '🎬' },
            { label: 'Heures de Contenu', value: '50+', icon: '⏱️' },
            { label: 'Templates Conçus', value: '15', icon: '🎨' },
            { label: 'Projets Brand', value: '8', icon: '✨' }
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
    </div>
  );
};

export default Studio; 
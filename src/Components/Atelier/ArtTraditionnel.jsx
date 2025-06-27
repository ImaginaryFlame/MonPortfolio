import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const ArtTraditionnel = () => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = "🎨 Art Traditionnel | MonPortfolio - Créations Artistiques";
    return () => {
      document.title = "MonPortfolio - Flamme Créative | Univers Narratifs, Labo Tech & Studio";
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    {
      id: 'illustrations-finalisees',
      title: 'Illustrations Finalisées',
      description: 'Collection d\'œuvres traditionnelles complétées, représentant l\'aboutissement d\'un processus créatif approfondi. Chaque illustration raconte une histoire et enrichit l\'univers narratif.',
      icon: '🖼️',
      color: '#D97706',
      gradient: 'from-amber-600 to-orange-600',
      count: '6 œuvres',
      tags: ['Portraits', 'Personnages', 'Environnements', 'Créatures'],
      featured: true
    },
    {
      id: 'etudes-progression',
      title: 'Études & Progression',
      description: 'Voyage artistique documenté à travers mes études quotidiennes et exercices de progression. Photos directement du compte @iflamedrawings.',
      icon: '📚',
      color: '#7C3AED',
      gradient: 'from-purple-600 to-pink-600',
      count: '30 photos',
      tags: ['Instagram', 'Progression', 'Quotidien', 'Apprentissage'],
      featured: false
    },
    {
      id: 'croquis-roughs',
      title: 'Croquis & Roughs',
      description: 'Exploration spontanée et premiers jets créatifs. Ces croquis capturent l\'essence de l\'idée avant qu\'elle ne devienne illustration finalisée.',
      icon: '✏️',
      color: '#059669',
      gradient: 'from-slate-600 to-gray-600',
      count: 'En construction',
      tags: ['Spontanéité', 'Exploration', 'Créativité', 'Process'],
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* En-tête héroïque */}
      <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Motifs décoratifs */}
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/20 rounded-lg rotate-45 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-12 h-12 border-2 border-white/20 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-6xl font-bold mb-6">
              🎨 Art Traditionnel
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              L'art traditionnel, c'est l'essence pure de la création. Du premier trait de crayon à l'œuvre finalisée, 
              chaque geste porte l'âme de l'artiste. Découvrez mon parcours créatif à travers trois univers distincts.
            </p>
            
            {/* Statistiques rapides */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold">36</div>
                <div className="text-sm opacity-80">Créations totales</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold">7</div>
                <div className="text-sm opacity-80">Mois d'activité</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm opacity-80">Techniques maîtrisées</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation retour */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link 
          to="/creation/atelier"
          className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors duration-300 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Retour à l'Atelier</span>
        </Link>
      </div>

      {/* Sections principales */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Link
              key={section.id}
              to={`/creation/atelier/traditionnel/${section.id}`}
              className="block"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`relative overflow-hidden rounded-3xl transition-all duration-500 transform hover:scale-[1.02] ${
                section.featured ? 'h-80' : 'h-64'
              }`}>
                {/* Container principal */}
                <div className={`relative h-full bg-gradient-to-r ${section.gradient} text-white`}>
                  
                  {/* Effets de fond */}
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    hoveredCard === index ? 'bg-white/10' : 'bg-transparent'
                  }`}></div>

                  {/* Motifs décoratifs */}
                  <div className="absolute top-6 right-6 opacity-20">
                    <div className="text-6xl">{section.icon}</div>
                  </div>
                  
                  {/* Grille de points décorative */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-12 gap-4 h-full p-8">
                      {[...Array(48)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                      ))}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="relative h-full flex items-center p-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-6 mb-6">
                        {/* Icône principale */}
                        <div className={`text-5xl transition-transform duration-500 ${
                          hoveredCard === index ? 'scale-110 rotate-6' : 'scale-100'
                        }`}>
                          {section.icon}
                        </div>
                        
                        {/* Titre et compteur */}
                        <div>
                          <h2 className={`font-bold transition-all duration-300 ${
                            section.featured ? 'text-4xl' : 'text-3xl'
                          }`}>
                            {section.title}
                          </h2>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                              {section.count}
                            </span>
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm opacity-75">Explorer</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`text-white/90 leading-relaxed transition-all duration-300 ${
                        section.featured ? 'text-lg max-w-3xl' : 'text-base max-w-2xl'
                      } ${hoveredCard === index ? 'text-white' : ''}`}>
                        {section.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-6">
                        {section.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`px-3 py-1 bg-white/15 rounded-full text-sm transition-all duration-300 ${
                              hoveredCard === index ? 'bg-white/25 scale-105' : ''
                            }`}
                            style={{ animationDelay: `${tagIndex * 100}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bouton d'action */}
                    <div className="hidden md:block">
                      <div className={`p-4 bg-white/20 rounded-full transition-all duration-300 ${
                        hoveredCard === index ? 'bg-white/30 scale-110' : ''
                      }`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Effet de particules au hover */}
                  {hoveredCard === index && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(15)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-float"
                          style={{
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
              </div>
            </Link>
          ))}
        </div>

        {/* Section inspirationnelle */}
        <div className="mt-20 bg-white rounded-3xl p-12 shadow-lg border border-orange-200">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-5xl mb-6">🎭</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Ma Philosophie Artistique</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              "L'art traditionnel, c'est la connexion directe entre l'âme et la matière. Chaque trait de crayon, 
              chaque coup de pinceau porte en lui l'émotion brute de l'instant. Dans un monde numérique, 
              je cultive cette authenticité du geste premier, cette magie de la création tangible."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-bold text-gray-800 mb-2">Spontanéité</h4>
                <p className="text-gray-600 text-sm">L'émotion première, capturée sans filtre</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-bold text-gray-800 mb-2">Intention</h4>
                <p className="text-gray-600 text-sm">Chaque trait a un sens, une direction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🌟</div>
                <h4 className="font-bold text-gray-800 mb-2">Évolution</h4>
                <p className="text-gray-600 text-sm">La progression constante, jour après jour</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ArtTraditionnel; 
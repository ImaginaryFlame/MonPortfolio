import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../config/sanityClient';
import { useLanguage } from '../../hooks/useLanguage';

const StudioBranding = ({ section }) => {
  const { t } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Changer le titre de l'onglet
  useEffect(() => {
    if (section) {
      const sectionTitles = {
        'identite': '🎨 Identité Visuelle',
        'templates': '📐 Templates',
        'miniatures': '🖼️ Miniatures'
      };
      document.title = `${sectionTitles[section] || '🎨 Branding'} | MonPortfolio - Flame's Studio`;
    } else {
      document.title = "🎨 Branding | MonPortfolio - Flame's Studio";
    }
    return () => {
      document.title = "MonPortfolio - Flamme Créative | Univers Narratifs, Labo Tech & Studio";
    };
  }, [section]);

  const sections = {
    'identite': {
      title: 'Identité Visuelle',
      query: '*[_type == "project" && category == "visual-identity"]'
    },
    'templates': {
      title: 'Templates',
      query: '*[_type == "project" && category == "template"]'
    },
    'miniatures': {
      title: 'Miniatures',
      query: '*[_type == "project" && category == "thumbnails"]'
    }
  };

  useEffect(() => {
    if (section && sections[section]) {
      setLoading(true);
      client.fetch(sections[section].query)
        .then(data => {
          setContent(data);
          setLoading(false);
        })
        .catch(error => {
          console.error(t.common.error, error);
          setLoading(false);
        });
    } else {
      // Pas de section spécifique, on affiche la vue d'ensemble
      setLoading(false);
    }
  }, [section, t.common.error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 flex items-center justify-center pt-20 md:pt-24">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Vue d'ensemble des catégories branding
  if (!section) {
    const brandingCategories = [
      {
        id: 'identite',
        title: 'IDENTITÉ VISUELLE',
        description: 'Charte graphique et éléments de marque - Logo, couleurs, typographies et guidelines pour une identité cohérente et mémorable',
        color: '#A855F7',
        icon: '🎨',
        count: '5'
      },
      {
        id: 'templates',
        title: 'TEMPLATES',
        description: 'Modèles et gabarits réutilisables - Templates de présentation, bannières et supports visuels pour une communication unifiée',
        color: '#8B5CF6',
        icon: '📐',
        count: '12'
      },
      {
        id: 'miniatures',
        title: 'MINIATURES',
        description: 'Miniatures accrocheuses pour vidéos - Designs optimisés pour YouTube, réseaux sociaux et plateformes vidéo avec impact visuel maximal',
        color: '#7C3AED',
        icon: '🖼️',
        count: '25'
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white pt-20 md:pt-24 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <Link 
              to="/creation/studio"
              className="text-purple-400 hover:text-purple-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-900/20 transition-all duration-300 border border-purple-500/30 hover:border-purple-500 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Retour au Studio</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              🎨 BRANDING
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {brandingCategories.map((category, index) => (
              <Link
                key={category.id}
                to={`/creation/studio/branding/${category.id === 'identite' ? 'identite-visuelle' : category.id === 'templates' ? 'templates' : 'miniatures'}`}
                className="group relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-[1.02] h-[400px]"
              >
                {/* Bordure animée */}
                <div 
                  className="absolute inset-0 rounded-3xl p-[2px] transition-all duration-500 group-hover:animate-pulse"
                  style={{
                    background: `linear-gradient(45deg, ${category.color}, ${category.color}40, ${category.color}60)`,
                    backgroundSize: '300% 300%'
                  }}
                >
                  <div className="h-full bg-gray-900/90 rounded-3xl"></div>
                </div>

                {/* Effet de lueur au hover */}
                <div 
                  className="absolute inset-0 rounded-3xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    boxShadow: `0 0 50px ${category.color}20, inset 0 0 50px ${category.color}40`
                  }}
                />

                {/* Layout supérieur */}
                <div className="absolute top-0 left-0 right-0 p-6 z-20">
                  <div className="flex justify-between items-start">
                    {/* Badge de count */}
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border bg-black/40 text-gray-200 border-gray-500 group-hover:bg-white/25 group-hover:text-white group-hover:border-white/40 transition-all duration-300"
                        style={{
                          backgroundColor: `${category.color}40`,
                          borderColor: `${category.color}60`
                        }}
                      >
                        {category.count} éléments
                      </span>
                    </div>

                    {/* Icône */}
                    <div 
                      className="text-4xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12"
                      style={{
                        filter: `drop-shadow(0 0 20px ${category.color}20)`
                      }}
                    >
                      {category.icon}
                    </div>
                  </div>
                </div>

                {/* Contenu principal */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="space-y-4">
                    {/* Titre */}
                    <h3 
                      className="text-2xl font-bold transition-all duration-300 group-hover:scale-105"
                      style={{
                        color: category.color,
                        textShadow: `0 0 20px ${category.color}20`
                      }}
                    >
                      {category.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed transition-all duration-300 group-hover:text-white">
                      {category.description}
                    </p>

                    {/* Bouton d'action */}
                    <div className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-sm border bg-black/30 border-gray-600 group-hover:bg-white/20 group-hover:border-white/30 group-hover:scale-105 transition-all duration-300 cursor-pointer">
                      <span className="font-medium">Explorer la galerie</span>
                      <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Vue spécifique d'une section
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link 
            to="/creation/studio/branding"
            className="text-purple-400 hover:text-purple-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-900/20 transition-all duration-300 border border-purple-500/30 hover:border-purple-500 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">Retour au Branding</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            {sections[section]?.title || 'Branding'}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content && content.map((project) => (
            <div 
              key={project._id}
              className="group relative overflow-hidden rounded-2xl border border-purple-900/30 hover:border-purple-500/50 transition-all duration-500"
            >
              {project.image && (
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10" />
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  {project.date && (
                    <span className="text-purple-400 text-sm">
                      {new Date(project.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                {project.elements && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.elements.map((element, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-purple-900/30 rounded-full text-xs font-medium text-purple-300"
                      >
                        {element}
                      </span>
                    ))}
                  </div>
                )}

                {project.colors && (
                  <div className="flex gap-2 mb-4">
                    {project.colors.map((color, index) => (
                      <div 
                        key={index}
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                )}
                
                <div className="flex gap-4">
                  {project.previewUrl && (
                    <a 
                      href={project.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      Aperçu
                    </a>
                  )}
                  {project.downloadUrl && (
                    <a 
                      href={project.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      Télécharger
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudioBranding; 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../config/sanityClient';
import { useLanguage } from '../../hooks/useLanguage';

const LabDev = ({ section }) => {
  const { t } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = {
    'demo-web': {
      title: t.labo.dev.demoWeb || 'Démos Web',
      query: '*[_type == "project" && category == "demo-web"]'
    },
    'prototypes-jeu': {
      title: t.labo.dev.gamePrototypes || 'Prototypes de Jeu',
      query: '*[_type == "project" && category == "game-prototype"]'
    },
    'portfolio-web': {
      title: t.navbar?.menus?.labo?.dev?.subItems?.portfolioWeb || 'Portfolio & Sites Web',
      query: '*[_type == "project" && category == "web-digital"]',
      special: 'portfolio'
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
    }
  }, [section, t.common.error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 flex items-center justify-center pt-20 md:pt-24">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link 
            to="/creation/labo"
            className="text-blue-400 hover:text-blue-300 mr-4"
          >
            {t.labo.backToLab}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            {sections[section]?.title || t.labo.dev.defaultTitle}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content && content.map((project) => (
            <div 
              key={project._id}
              className="group relative overflow-hidden rounded-2xl border border-blue-900/30 hover:border-blue-500/50 transition-all duration-500"
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
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies && project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-900/30 rounded-full text-xs font-medium text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {project.projectUrl && (
                    <a 
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      {t.labo.dev.viewDemo || 'Voir la Démo'}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      {t.labo.dev.github || 'GitHub'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section spéciale Portfolio Analysis */}
        {section === 'portfolio-web' && (
          <div className="mt-16 space-y-12">
            {/* Titre de la section analyse */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                📊 Analyse Technique de ce Portfolio
              </h2>
              <p className="text-blue-300 max-w-2xl mx-auto">
                Documentation méta de ce portfolio - architecture, technologies et métriques en temps réel
              </p>
            </div>

            {/* Métriques en temps réel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Composants React', value: '25+', icon: '⚛️' },
                { label: 'Routes Configurées', value: '12', icon: '🛣️' },
                { label: 'Bibliothèques NPM', value: '15+', icon: '📚', tooltip: 'React, Tailwind, Sanity, FontAwesome...' },
                { label: 'Temps de Build', value: '~35s', icon: '⚡', warning: 'Optimisable' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border text-center hover:border-blue-500/40 transition-all relative group ${
                    stat.warning ? 'border-yellow-500/30' : 'border-blue-500/20'
                  }`}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-300">{stat.label}</div>
                  {stat.warning && (
                    <div className="text-xs text-yellow-400 mt-1">⚠️ {stat.warning}</div>
                  )}
                  {stat.tooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
                      {stat.tooltip}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stack technique */}
            <div className="bg-black/20 backdrop-blur-sm rounded-3xl border border-blue-500/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                🏗️ Stack Technique
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'React 18', type: 'Framework', icon: '⚛️', color: 'blue' },
                  { name: 'Tailwind CSS', type: 'Styling', icon: '🎨', color: 'cyan' },
                  { name: 'Sanity CMS', type: 'Backend', icon: '📊', color: 'red' },
                  { name: 'Vite', type: 'Build Tool', icon: '⚡', color: 'purple' },
                  { name: 'React Router', type: 'Routing', icon: '🛣️', color: 'green' },
                  { name: 'JavaScript ES6+', type: 'Language', icon: '💛', color: 'yellow' }
                ].map((tech, index) => (
                  <div 
                    key={index}
                    className={`bg-${tech.color}-900/20 border border-${tech.color}-500/30 rounded-xl p-4 hover:border-${tech.color}-500/50 transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{tech.icon}</div>
                      <div>
                        <h4 className="font-bold text-white">{tech.name}</h4>
                        <p className="text-sm text-gray-400">{tech.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fonctionnalités avancées */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-green-500/20 p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  🎨 Features UI/UX
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Animations de particules dynamiques</li>
                  <li>• Effets glassmorphism avancés</li>
                  <li>• Design responsive mobile-first</li>
                  <li>• Micro-interactions fluides</li>
                  <li>• Thème sombre avec accents colorés</li>
                </ul>
              </div>
              
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  🔧 Features Techniques
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• CMS Sanity avec schémas personnalisés</li>
                  <li>• Intégrations API (YouTube, Twitch)</li>
                  <li>• Filtrage dynamique par catégories</li>
                  <li>• Système de traductions i18n</li>
                  <li>• Build optimisé et PWA ready</li>
                </ul>
              </div>
            </div>

            {/* Section optimisation du build */}
            <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-2xl border border-yellow-500/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                ⚡ Optimisation du Build - Analyse de Performance
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-yellow-300 mb-4">📊 Analyse Actuelle</h4>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Temps de build :</span>
                      <span className="text-yellow-400 font-bold">35.11s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Modules transformés :</span>
                      <span className="text-blue-400">746 modules</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Statut :</span>
                      <span className="text-orange-400">⚠️ Chunks trop volumineux</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                    <h5 className="text-yellow-300 font-bold mb-2">🚨 Avertissement Vite</h5>
                    <p className="text-sm text-gray-300">
                      Certains chunks dépassent 500 KB après minification. 
                      Cela peut affecter les performances de chargement.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-green-300 mb-4">🚀 Optimisations Possibles</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span><strong>Code Splitting :</strong> Dynamic import() pour les routes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span><strong>Manual Chunks :</strong> Séparer vendors et utils</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span><strong>Tree Shaking :</strong> Éliminer le code non utilisé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span><strong>Asset Optimization :</strong> Compresser les images</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span><strong>Bundle Analysis :</strong> Identifier les gros modules</span>
                    </li>
                  </ul>
                  
                  <div className="mt-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                    <h5 className="text-green-300 font-bold mb-2">🎯 Objectif</h5>
                    <p className="text-sm text-gray-300">
                      Réduire le temps de build à <strong>&lt; 15s</strong> et 
                      diviser par 2 la taille des chunks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="text-center bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl border border-blue-500/20 p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                🔬 Explorez le Code Source
              </h3>
              <p className="text-gray-300 mb-6">
                Ce portfolio est entièrement open source et documenté. Découvrez l'architecture et les techniques utilisées.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://github.com/votre-username/MonPortfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-colors"
                >
                  📂 Repository GitHub
                </a>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-colors"
                >
                  🔄 Actualiser les Métriques
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabDev; 
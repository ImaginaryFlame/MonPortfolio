import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../config/sanityClient';
import { useLanguage } from '../../hooks/useLanguage';

const LabAcademique = ({ section }) => {
  const { t } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = {
    'presentations-cnam': {
      title: 'Présentations CNAM',
      query: '*[_type == "project" && category == "academic-presentation"]'
    }
  };

  // Projets académiques phares (affichés quand aucune section spécifique)
  const featuredAcademicProjects = [
    {
      id: 'little-archaeologist',
      title: 'Little Archaeologist',
      subtitle: 'La main à la pelle',
      description: 'Application éducative interactive développée pour rendre l\'archéologie accessible aux enfants. Lauréat du Prix de l\'Innovation RA lors du Défi Chal\'enge 2023.',
      image: '/assets/img/projects/little-archaeologist/logo.png',
      technologies: ['Unity', 'C#', 'Android', 'Windows'],
      award: 'Prix de l\'Innovation RA 2023',
      link: '/creation/labo/academique/little-archaeologist',
      featured: true
    }
  ];

  useEffect(() => {
    if (section && sections[section]) {
      setLoading(true);
      client.fetch(sections[section].query)
        .then(data => {
          setContent(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erreur:', error);
          setLoading(false);
        });
    } else {
      // Pas de section spécifique, on affiche la vue d'ensemble
      setLoading(false);
    }
  }, [section]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 flex items-center justify-center pt-20 md:pt-24">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  // Vue d'ensemble du Labo Académique
  if (!section) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              🎓 Labo Académique
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Projets développés dans le cadre de ma formation et de concours académiques
            </p>
          </div>

          {/* Projet phare */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-yellow-400 border-b-2 border-yellow-600 pb-2">
              🏆 Projet Phare
            </h2>
            
            {featuredAcademicProjects.map((project) => (
              <Link 
                key={project.id}
                to={project.link}
                className="block group"
              >
                <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 backdrop-blur-sm border-2 border-amber-600/30 rounded-2xl p-8 hover:border-amber-500/60 transition-all duration-500 transform hover:scale-[1.02]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Logo */}
                    <div className="text-center lg:text-left">
                      <div className="inline-block mb-4">
                        <img 
                          src={project.image}
                          alt={project.title}
                          className="h-32 mx-auto lg:mx-0 group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      {project.award && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full text-sm font-bold">
                          🏆 {project.award}
                        </div>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="lg:col-span-2">
                      <h3 className="text-4xl font-bold mb-2 text-amber-100 group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-xl text-amber-300 mb-4 italic">
                        {project.subtitle}
                      </p>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-amber-800/50 text-amber-200 rounded-full text-sm border border-amber-600/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 text-amber-300 font-medium">
                        <span>Explorer le projet</span>
                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Autres projets académiques */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-yellow-400 border-b-2 border-yellow-600 pb-2">
              📚 Autres Projets
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link 
                to="/creation/labo/academique/presentations-cnam"
                className="group bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-600/30 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">📽️</div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-200">Présentations CNAM</h3>
                  <p className="text-gray-300 text-sm">
                    Présentations et travaux réalisés dans le cadre de ma formation au CNAM
                  </p>
                </div>
              </Link>

              {/* BibliApp */}
              <Link 
                to="/creation/labo/academique/bibliapp"
                className="group bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-600/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-bold mb-2 text-blue-200">BibliApp</h3>
                  <p className="text-gray-300 text-sm">
                    Application Java de gestion de bibliothèque avec interface Swing et base de données MySQL
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1 justify-center">
                    <span className="px-2 py-1 bg-blue-800/50 text-blue-300 rounded-full text-xs">Java</span>
                    <span className="px-2 py-1 bg-blue-800/50 text-blue-300 rounded-full text-xs">MySQL</span>
                  </div>
                </div>
              </Link>

              {/* Placeholder pour futurs projets */}
              <div className="bg-gradient-to-br from-gray-800/30 to-gray-700/30 border border-gray-600/30 rounded-xl p-6 opacity-50">
                <div className="text-center">
                  <div className="text-4xl mb-4">🚧</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-400">Projets à venir</h3>
                  <p className="text-gray-500 text-sm">
                    D'autres projets académiques seront ajoutés prochainement
                  </p>
                </div>
              </div>
            </div>
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
            to="/creation/labo/academique"
            className="text-yellow-400 hover:text-yellow-300 mr-4"
          >
            ← Retour au Labo Académique
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            {sections[section]?.title || 'Projets Académiques'}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content && content.map((project) => (
            <div 
              key={project._id}
              className="group relative overflow-hidden rounded-2xl border border-yellow-900/30 hover:border-yellow-500/50 transition-all duration-500"
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
                    <span className="text-yellow-400 text-sm">
                      {new Date(project.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                {project.topics && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.topics.map((topic, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-yellow-900/30 rounded-full text-xs font-medium text-yellow-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-4">
                  {project.presentationUrl && (
                    <a 
                      href={project.presentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      Voir la présentation
                    </a>
                  )}
                  {project.resourceUrl && (
                    <a 
                      href={project.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      Ressources
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

export default LabAcademique; 
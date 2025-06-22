import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../config/sanityClient';

const StudioBranding = ({ section }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = {
    'identite': {
      title: "Identité Visuelle",
      query: '*[_type == "project" && category == "visual-identity"]'
    },
    'templates': {
      title: "Templates",
      query: '*[_type == "project" && category == "template"]'
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
          console.error("Erreur lors du chargement des données:", error);
          setLoading(false);
        });
    }
  }, [section]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link 
            to="/creation/studio"
            className="text-purple-400 hover:text-purple-300 mr-4"
          >
            ← Retour au Studio
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            {sections[section]?.title || "Branding"}
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
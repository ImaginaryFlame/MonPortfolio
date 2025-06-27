import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../config/sanityClient';
import { useLanguage } from '../../hooks/useLanguage';

const LabDesign = ({ section }) => {
  const { t } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = {
    'ui-ux': {
      title: t.labo.design.uiUx,
      query: '*[_type == "project" && category == "ui-ux"]'
    },
    'prototypes': {
      title: t.labo.design.interactivePrototypes,
      query: '*[_type == "project" && category == "prototypes"]'
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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link 
            to="/creation/labo/design"
            className="text-cyan-400 hover:text-cyan-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-cyan-900/20 transition-all duration-300 border border-cyan-500/30 hover:border-cyan-500 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">{t.labo.design.backToLab}</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            {sections[section]?.title || t.labo.design.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content && content.map((project) => (
            <div 
              key={project._id}
              className="group relative overflow-hidden rounded-2xl border border-cyan-900/30 hover:border-cyan-500/50 transition-all duration-500"
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
                
                {project.projectUrl && (
                  <a 
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm font-medium transition-colors duration-300"
                  >
                    {t.labo.design.viewProject}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabDesign; 
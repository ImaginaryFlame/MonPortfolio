import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../../../config/sanityClient';
import { useLanguage } from '../../../hooks/useLanguage';

const PandemieLara = ({ section }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = {
    personnages: {
      title: t.universes.sections.personnages,
      query: '*[_type == "personnage" && universe == "pandemie-lara"]'
    },
    "regions-lieux": {
      title: t.universes.sections.regionsLieux,
      query: '*[_type == "region" && universe == "pandemie-lara"]'
    },
    objets: {
      title: t.universes.sections.objets,
      query: '*[_type == "objet" && universe == "pandemie-lara"]'
    },
    factions: {
      title: t.universes.sections.factions,
      query: '*[_type == "faction" && universe == "pandemie-lara"]'
    },
    bestiaires: {
      title: t.universes.sections.bestiaires,
      query: '*[_type == "creature" && universe == "pandemie-lara"]'
    }
  };

  const handleGoBack = () => {
    navigate('/creation/univers-narratifs/pandemie-lara');
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

  if (!section) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 p-8">
        {/* Styles CSS pour les animations */}
        <style jsx>{`
          .tile-shimmer {
            position: relative;
            overflow: hidden;
          }
          
          .tile-shimmer::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            animation: shimmer 2s infinite;
          }
          
          .tile-glow {
            transition: all 0.3s ease;
          }
          
          .tile-glow:hover {
            box-shadow: 0 0 30px rgba(239, 68, 68, 0.3), 0 0 60px rgba(249, 115, 22, 0.2);
            transform: translateY(-5px) scale(1.02);
          }
          
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          .section-red { border-color: #ef4444; }
          .section-red:hover { border-color: #f87171; box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
          
          .section-orange { border-color: #f97316; }
          .section-orange:hover { border-color: #fb923c; box-shadow: 0 0 20px rgba(249, 115, 22, 0.4); }
          
          .section-amber { border-color: #f59e0b; }
          .section-amber:hover { border-color: #fbbf24; box-shadow: 0 0 20px rgba(245, 158, 11, 0.4); }
          
          .section-yellow { border-color: #eab308; }
          .section-yellow:hover { border-color: #facc15; box-shadow: 0 0 20px rgba(234, 179, 8, 0.4); }
          
          .section-rose { border-color: #f43f5e; }
          .section-rose:hover { border-color: #fb7185; box-shadow: 0 0 20px rgba(244, 63, 94, 0.4); }
        `}</style>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate('/creation/univers-narratifs')}
              className="text-red-400 hover:text-red-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-900/20 transition-all duration-300 border border-red-500/30 hover:border-red-500 bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Retour aux Univers</span>
            </button>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              {t.universes.projects.pandemie.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(sections).map(([key, value], index) => {
              const sectionColors = [
                'section-red', 'section-orange', 'section-amber', 
                'section-yellow', 'section-rose'
              ];
              const colorClass = sectionColors[index % sectionColors.length];
              
              return (
                <Link
                  key={key}
                  to={`/creation/univers-narratifs/pandemie-lara/${key}`}
                  className={`tile-shimmer tile-glow p-6 rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 transition-all duration-500 hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-800/90 ${colorClass}`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-2 text-white group-hover:text-red-300 transition-colors duration-300">
                      {value.title}
                    </h2>
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50"></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500 mx-auto"></div>
            <div className="animate-spin rounded-full h-32 w-32 border-l-2 border-r-2 border-orange-500 absolute top-0 left-1/2 transform -translate-x-1/2" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="mt-6 text-xl bg-gradient-to-r from-red-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
            Chargement de l'apocalypse...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 p-8">
      {/* Styles CSS pour les animations */}
      <style jsx>{`
        .content-tile-shimmer {
          position: relative;
          overflow: hidden;
        }
        
        .content-tile-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          animation: shimmer 3s infinite;
          z-index: 1;
        }
        
        .content-tile-glow {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid transparent;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(249, 115, 22, 0.05), rgba(245, 158, 11, 0.1));
        }
        
        .content-tile-glow:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 
            0 20px 40px rgba(239, 68, 68, 0.15),
            0 10px 20px rgba(249, 115, 22, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          border-color: rgba(239, 68, 68, 0.5);
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(249, 115, 22, 0.1), rgba(245, 158, 11, 0.15));
        }
        
        .content-tile-inner {
          position: relative;
          z-index: 2;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .title-gradient {
          background: linear-gradient(-45deg, #ef4444, #f97316, #f59e0b, #eab308);
          background-size: 400% 400%;
          animation: gradientShift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <button 
            onClick={handleGoBack}
            className="text-red-400 hover:text-red-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-900/20 transition-all duration-300 border border-red-500/30 hover:border-red-500 bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">Retour</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold title-gradient">
            {sections[section].title}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content && content.map((item, index) => (
            <div 
              key={item._id}
              className="content-tile-shimmer content-tile-glow p-6 rounded-xl"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className="content-tile-inner">
                <h2 className="text-xl font-bold mb-2 text-white hover:text-red-300 transition-colors duration-300">
                  {item.name || item.title}
                </h2>
                <p className="text-gray-300 mb-3">{item.description}</p>
                <div className="mt-4 flex justify-end">
                  <span className="text-red-400 transform transition-transform duration-300 hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PandemieLara; 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../../../config/sanityClient';
import { useLanguage } from '../../../hooks/useLanguage';

const VinceDeBelii = ({ section }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = {
    personnages: {
      title: t.universes.sections.personnages,
      query: '*[_type == "personnage" && universe == "vince-belii"]'
    },
    familles: {
      title: t.universes.sections.familles,
      query: '*[_type == "famille" && universe == "vince-belii"]'
    },
    lieux: {
      title: t.universes.sections.lieux,
      query: '*[_type == "region" && universe == "vince-belii"]'
    }
  };

  const handleGoBack = () => {
    navigate('/creation/univers-narratifs/vince-belii');
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
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(168, 85, 247, 0.2);
            transform: translateY(-5px) scale(1.02);
          }
          
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          .section-purple { border-color: #8b5cf6; }
          .section-purple:hover { border-color: #a78bfa; box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
          
          .section-violet { border-color: #a855f7; }
          .section-violet:hover { border-color: #c084fc; box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          
          .section-fuchsia { border-color: #d946ef; }
          .section-fuchsia:hover { border-color: #e879f9; box-shadow: 0 0 20px rgba(217, 70, 239, 0.4); }
          
          .section-indigo { border-color: #6366f1; }
          .section-indigo:hover { border-color: #818cf8; box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
        `}</style>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate('/creation/univers-narratifs')}
              className="text-purple-400 hover:text-purple-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-900/20 transition-all duration-300 border border-purple-500/30 hover:border-purple-500 bg-gradient-to-r from-purple-900/20 to-violet-900/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Retour aux Univers</span>
            </button>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {t.universes.projects.vinceBelii.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(sections).map(([key, value], index) => {
              const sectionColors = [
                'section-purple', 'section-violet', 'section-fuchsia', 'section-indigo'
              ];
              const colorClass = sectionColors[index % sectionColors.length];
              
              return (
                <Link
                  key={key}
                  to={`/creation/univers-narratifs/vince-belii/${key}`}
                  className={`tile-shimmer tile-glow p-6 rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 transition-all duration-500 hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-800/90 ${colorClass}`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors duration-300">
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
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <div className="animate-spin rounded-full h-32 w-32 border-l-2 border-r-2 border-violet-500 absolute top-0 left-1/2 transform -translate-x-1/2" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="mt-6 text-xl bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Chargement des souvenirs de Belii...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 p-8">
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
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.05), rgba(217, 70, 239, 0.1));
        }
        
        .content-tile-glow:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 
            0 20px 40px rgba(139, 92, 246, 0.15),
            0 10px 20px rgba(168, 85, 247, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          border-color: rgba(139, 92, 246, 0.5);
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(168, 85, 247, 0.1), rgba(217, 70, 239, 0.15));
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
          background: linear-gradient(-45deg, #8b5cf6, #a855f7, #d946ef, #6366f1);
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
            className="text-purple-400 hover:text-purple-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-900/20 transition-all duration-300 border border-purple-500/30 hover:border-purple-500 bg-gradient-to-r from-purple-900/20 to-violet-900/20 backdrop-blur-sm"
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
                <h2 className="text-xl font-bold mb-2 text-white hover:text-purple-300 transition-colors duration-300">
                  {item.name || item.title}
                </h2>
                <p className="text-gray-300 mb-3">{item.description}</p>
                <div className="mt-4 flex justify-end">
                  <span className="text-purple-400 transform transition-transform duration-300 hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VinceDeBelii; 
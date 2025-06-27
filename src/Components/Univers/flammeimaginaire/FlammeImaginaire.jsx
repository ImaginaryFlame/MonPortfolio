import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../../../config/sanityClient';
import { useLanguage } from '../../../hooks/useLanguage';

const FlammeImaginaire = ({ section }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const sections = {
    personnages: {
      title: t.universes.sections.personnages,
      query: '*[_type == "personnage" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    "regions-lieux": {
      title: t.universes.sections.regionsLieux,
      query: '*[_type == "region" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    objets: {
      title: t.universes.sections.objets,
      query: '*[_type == "objet" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    concepts: {
      title: t.universes.sections.conceptsMetaphysiques,
      query: '*[_type == "conceptmetaphysique" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    factions: {
      title: t.universes.sections.factions,
      query: '*[_type == "faction" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    creatures: {
      title: t.universes.sections.creatures,
      query: '*[_type == "bestiaires" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    evenements: {
      title: t.universes.sections.evenements,
      query: '*[_type == "evenement" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    dogmes: {
      title: t.universes.sections.dogmesReligieux,
      query: '*[_type == "dogmeReligieux" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    traditions: {
      title: t.universes.sections.traditionsAncestrales,
      query: '*[_type == "traditionAncestrale" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    celebrations: {
      title: t.universes.sections.celebrations,
      query: '*[_type == "celebrations" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    }
  };

  const handleGoBack = () => {
    navigate('/creation/univers-narratifs/flamme-imaginaire');
  };

  useEffect(() => {
    if (section && sections[section]) {
      setLoading(true);
      // Vérifions d'abord si l'univers existe
      client.fetch('*[_type == "univers" && nom == "Le Héros à la Flamme Imaginaire"][0]')
        .then(univers => {
          console.log('Univers trouvé:', univers);
          if (univers) {
            return client.fetch(sections[section].query);
          } else {
            throw new Error('Univers non trouvé');
          }
        })
        .then(data => {
          console.log('Données de la section récupérées:', data);
          setContent(data);
          setLoading(false);
        })
        .catch(error => {
          console.error(t.common.error, error);
          setLoading(false);
        });
    }
  }, [section, t.common.error]);

  const handleItemClick = async (item) => {
    setLoading(true);
    try {
      // Récupérer les détails complets de l'élément
      const detailedQuery = `*[_type == "${item._type}" && _id == "${item._id}"][0]{
        ...,
        "imageUrl": image.asset->url,
        univers->,
        races[]->,
        origine->,
        equipement[]->,
        appartenances[]{
          ...,
          faction->
        },
        relationsSimplifiees[]{
          ...,
          personnage->
        },
        relations[]{
          ...,
          personnage->
        }
      }`;
      
      const detailedItem = await client.fetch(detailedQuery);
      setSelectedItem(detailedItem);
      setShowModal(true);
    } catch (error) {
      console.error(t.common.error, error);
    }
    setLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const renderPersonnageDetails = (personnage) => {
    return (
      <div className="space-y-6">
        {personnage.imageUrl && (
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img 
              src={personnage.imageUrl}
              alt={personnage.nom?.fr || personnage.nom}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">{t.universes.characterDetails.generalInfo}</h3>
            <div className="space-y-2 text-sm">
              {personnage.age && <p><strong>{t.universes.characterDetails.age}:</strong> {personnage.age} {t.universes.characterDetails.years}</p>}
              {personnage.sexe && <p><strong>{t.universes.characterDetails.gender}:</strong> {personnage.sexe}</p>}
              {personnage.origine && <p><strong>{t.universes.characterDetails.origin}:</strong> {personnage.origine.nom}</p>}
              {personnage.races && personnage.races.length > 0 && (
                <p><strong>{t.universes.characterDetails.race}:</strong> {personnage.races.map(race => race.nom).join(', ')}</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">{t.universes.characterDetails.personality}</h3>
            <p className="text-sm text-gray-300">
              {personnage.resumePersonnalite || t.universes.actions.noDescription}
            </p>
          </div>
        </div>

        {personnage.apparence && (
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">{t.universes.characterDetails.appearance}</h3>
            <p className="text-sm text-gray-300">{personnage.apparence.fr || personnage.apparence}</p>
          </div>
        )}

        {personnage.relationsSimplifiees && personnage.relationsSimplifiees.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">{t.universes.characterDetails.relations}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {personnage.relationsSimplifiees.map((relation, index) => (
                <div key={index} className="bg-gray-800/50 p-2 rounded">
                  <p className="text-sm">
                    <strong>{relation.personnage?.nom?.fr || relation.personnage?.nom}:</strong> {relation.typeRelation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {personnage.objectifs && personnage.objectifs.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">{t.universes.characterDetails.objectives}</h3>
            <div className="space-y-2">
              {personnage.objectifs.map((objectif, index) => (
                <div key={index} className="bg-gray-800/50 p-3 rounded">
                  <p className="font-medium">{objectif.objectif}</p>
                  {objectif.description && <p className="text-sm text-gray-300 mt-1">{objectif.description}</p>}
                  {objectif.priorite && (
                    <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                      objectif.priorite === 'critique' ? 'bg-red-600' :
                      objectif.priorite === 'elevee' ? 'bg-orange-600' :
                      objectif.priorite === 'moyenne' ? 'bg-yellow-600' : 'bg-gray-600'
                    }`}>
                      {t.universes.characterDetails.priority[objectif.priorite] || objectif.priorite}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderGenericDetails = (item) => {
    return (
      <div className="space-y-4">
        {item.imageUrl && (
          <div className="relative h-48 rounded-lg overflow-hidden">
            <img 
              src={item.imageUrl}
              alt={item.nom || item.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <p className="text-gray-300">{item.description || item.resume || t.universes.actions.noDescription}</p>
        </div>
        {item.type && (
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">{t.universes.characterDetails.type}</h3>
            <p className="text-sm">{item.type}</p>
          </div>
        )}
      </div>
    );
  };

  if (!section) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 p-8">
        {/* Styles CSS pour les animations */}
        <style jsx>{`
          .tile-gradient-animation {
            background: linear-gradient(-45deg, #1e3a8a, #3b82f6, #8b5cf6, #ec4899);
            background-size: 400% 400%;
            animation: gradientShift 4s ease infinite;
          }
          
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
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.2);
            transform: translateY(-5px) scale(1.02);
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          .section-blue { border-color: #3b82f6; }
          .section-blue:hover { border-color: #60a5fa; box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
          
          .section-purple { border-color: #8b5cf6; }
          .section-purple:hover { border-color: #a78bfa; box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
          
          .section-pink { border-color: #ec4899; }
          .section-pink:hover { border-color: #f472b6; box-shadow: 0 0 20px rgba(236, 72, 153, 0.4); }
          
          .section-green { border-color: #10b981; }
          .section-green:hover { border-color: #34d399; box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          
          .section-orange { border-color: #f97316; }
          .section-orange:hover { border-color: #fb923c; box-shadow: 0 0 20px rgba(249, 115, 22, 0.4); }
          
          .section-red { border-color: #ef4444; }
          .section-red:hover { border-color: #f87171; box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
        `}</style>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate('/creation/univers-narratifs')}
              className="text-blue-400 hover:text-blue-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-900/20 transition-all duration-300 border border-blue-500/30 hover:border-blue-500 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Retour aux Univers</span>
            </button>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t.universes.projects.flammeImaginaire.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(sections).map(([key, value], index) => {
              const sectionColors = [
                'section-blue', 'section-purple', 'section-pink', 
                'section-green', 'section-orange', 'section-red'
              ];
              const colorClass = sectionColors[index % sectionColors.length];
              
              return (
                <Link
                  key={key}
                  to={`/creation/univers-narratifs/flamme-imaginaire/${key}`}
                  className={`tile-shimmer tile-glow p-6 rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 transition-all duration-500 hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-800/90 ${colorClass}`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">
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
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <div className="animate-spin rounded-full h-32 w-32 border-l-2 border-r-2 border-purple-500 absolute top-0 left-1/2 transform -translate-x-1/2" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="mt-6 text-xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Chargement des mystères de la Flamme Imaginaire...
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
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.1));
        }
        
        .content-tile-glow:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 
            0 20px 40px rgba(59, 130, 246, 0.15),
            0 10px 20px rgba(139, 92, 246, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          border-color: rgba(59, 130, 246, 0.5);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.15));
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
          background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #ec4899, #f97316);
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
            className="text-blue-400 hover:text-blue-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-900/20 transition-all duration-300 border border-blue-500/30 hover:border-blue-500 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 backdrop-blur-sm"
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
              onClick={() => handleItemClick(item)}
              className="content-tile-shimmer content-tile-glow p-6 rounded-xl cursor-pointer"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className="content-tile-inner">
                {item.image && (
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.nom?.fr || item.nom || item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                )}
                <h2 className="text-xl font-bold mb-2 text-white hover:text-blue-300 transition-colors duration-300">
                  {item.nom?.fr || item.nom || item.title}
                </h2>
                <p className="text-gray-300 line-clamp-3 mb-3">
                  {item.description || item.resume || item.resumePersonnalite}
                </p>
                {item.type && (
                  <p className="text-blue-400 mb-2 text-sm px-2 py-1 bg-blue-500/20 rounded-full inline-block">
                    {item.type}
                  </p>
                )}
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-400">{t.universes.actions.clickForDetails}</span>
                  <span className="text-blue-400 transform transition-transform duration-300 hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal pour les détails */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-blue-400">
                {selectedItem.nom?.fr || selectedItem.nom || selectedItem.title}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                {t.universes.actions.close}
              </button>
            </div>
            <div className="p-6">
              {selectedItem._type === 'personnage' 
                ? renderPersonnageDetails(selectedItem)
                : renderGenericDetails(selectedItem)
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlammeImaginaire; 
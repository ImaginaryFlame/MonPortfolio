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
            <h1 className="text-4xl md:text-6xl font-bold">
              {t.universes.projects.flammeImaginaire.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(sections).map(([key, value]) => (
              <Link
                key={key}
                to={`/creation/univers-narratifs/flamme-imaginaire/${key}`}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-500/30 hover:border-blue-500 transition-all duration-300"
              >
                <h2 className="text-xl font-bold mb-2">{value.title}</h2>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 p-8">
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
          <h1 className="text-3xl md:text-4xl font-bold">
            {sections[section].title}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content && content.map((item) => (
            <div 
              key={item._id}
              onClick={() => handleItemClick(item)}
              className="p-6 rounded-xl bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-500/30 hover:border-blue-500 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl"
            >
              {item.image && (
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.nom?.fr || item.nom || item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-xl font-bold mb-2">{item.nom?.fr || item.nom || item.title}</h2>
              <p className="text-gray-300 line-clamp-3">{item.description || item.resume || item.resumePersonnalite}</p>
              {item.type && (
                <p className="text-blue-400 mt-2 text-sm">{item.type}</p>
              )}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-400">{t.universes.actions.clickForDetails}</span>
                <span className="text-blue-400">→</span>
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
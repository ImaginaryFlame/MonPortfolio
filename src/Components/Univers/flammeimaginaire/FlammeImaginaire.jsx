import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../../config/sanityClient';

const FlammeImaginaire = ({ section }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const sections = {
    personnages: {
      title: "Personnages",
      query: '*[_type == "personnage" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    "regions-lieux": {
      title: "Régions & Lieux",
      query: '*[_type == "region" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    objets: {
      title: "Objets",
      query: '*[_type == "objet" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    concepts: {
      title: "Concepts Métaphysiques",
      query: '*[_type == "conceptmetaphysique" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    factions: {
      title: "Factions",
      query: '*[_type == "faction" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    creatures: {
      title: "Créatures",
      query: '*[_type == "bestiaires" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    evenements: {
      title: "Événements",
      query: '*[_type == "evenement" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    dogmes: {
      title: "Dogmes Religieux",
      query: '*[_type == "dogmeReligieux" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    traditions: {
      title: "Traditions Ancestrales",
      query: '*[_type == "traditionAncestrale" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    },
    celebrations: {
      title: "Célébrations",
      query: '*[_type == "celebrations" && univers._ref in *[_type=="univers" && nom=="Le Héros à la Flamme Imaginaire"]._id]'
    }
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
          console.error("Erreur lors du chargement des données:", error);
          setLoading(false);
        });
    }
  }, [section]);

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
      console.error("Erreur lors du chargement des détails:", error);
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
            <h3 className="text-lg font-semibold text-orange-400 mb-2">Informations générales</h3>
            <div className="space-y-2 text-sm">
              {personnage.age && <p><strong>Âge:</strong> {personnage.age} ans</p>}
              {personnage.sexe && <p><strong>Sexe:</strong> {personnage.sexe}</p>}
              {personnage.origine && <p><strong>Origine:</strong> {personnage.origine.nom}</p>}
              {personnage.races && personnage.races.length > 0 && (
                <p><strong>Race(s):</strong> {personnage.races.map(race => race.nom).join(', ')}</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-2">Personnalité</h3>
            <p className="text-sm text-gray-300">
              {personnage.resumePersonnalite || "Aucune description disponible"}
            </p>
          </div>
        </div>

        {personnage.apparence && (
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-2">Apparence</h3>
            <p className="text-sm text-gray-300">{personnage.apparence.fr || personnage.apparence}</p>
          </div>
        )}

        {personnage.relationsSimplifiees && personnage.relationsSimplifiees.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-2">Relations</h3>
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
            <h3 className="text-lg font-semibold text-orange-400 mb-2">Objectifs</h3>
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
                      {objectif.priorite}
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
          <p className="text-gray-300">{item.description || item.resume || "Aucune description disponible"}</p>
        </div>
        {item.type && (
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-2">Type</h3>
            <p className="text-sm">{item.type}</p>
          </div>
        )}
      </div>
    );
  };

  if (!section) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Le Héros à la Flamme Imaginaire
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(sections).map(([key, value]) => (
              <Link
                key={key}
                to={`/creation/univers-narratifs/flamme-imaginaire/${key}`}
                className="p-6 rounded-xl bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-500/30 hover:border-orange-500 transition-all duration-300"
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link 
            to="/creation/univers-narratifs/flamme-imaginaire"
            className="text-orange-400 hover:text-orange-300 mr-4"
          >
            ← Retour
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            {sections[section].title}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content && content.map((item) => (
            <div 
              key={item._id}
              onClick={() => handleItemClick(item)}
              className="p-6 rounded-xl bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-500/30 hover:border-orange-500 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl"
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
                <p className="text-orange-400 mt-2 text-sm">{item.type}</p>
              )}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-400">Cliquez pour voir les détails</span>
                <span className="text-orange-400">→</span>
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
              <h2 className="text-2xl font-bold text-orange-400">
                {selectedItem.nom?.fr || selectedItem.nom || selectedItem.title}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
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
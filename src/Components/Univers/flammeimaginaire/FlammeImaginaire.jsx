import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../../config/sanityClient';

const FlammeImaginaire = ({ section }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

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
              className="p-6 rounded-xl bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-500/30"
            >
              {item.image && (
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.nom || item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-xl font-bold mb-2">{item.nom || item.title}</h2>
              <p className="text-gray-300">{item.description || item.resume}</p>
              {item.type && (
                <p className="text-orange-400 mt-2 text-sm">{item.type}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlammeImaginaire; 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../../config/sanityClient';

const VinceDeBelii = ({ section }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = {
    personnages: {
      title: "Personnages",
      query: '*[_type == "personnage" && universe == "vincebelii"]'
    },
    familles: {
      title: "Familles",
      query: '*[_type == "famille" && universe == "vincebelii"]'
    },
    lieux: {
      title: "Lieux",
      query: '*[_type == "region" && universe == "vincebelii"]'
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

  if (!section) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Vince de Belii
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(sections).map(([key, value]) => (
              <Link
                key={key}
                to={`/creation/univers-narratifs/vince-belii/${key}`}
                className="p-6 rounded-xl bg-gradient-to-br from-red-900/50 to-orange-900/50 border border-red-500/30 hover:border-red-500 transition-all duration-300"
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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link 
            to="/creation/univers-narratifs/vince-belii"
            className="text-red-400 hover:text-red-300 mr-4"
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
              className="p-6 rounded-xl bg-gradient-to-br from-red-900/50 to-orange-900/50 border border-red-500/30"
            >
              {item.image && (
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.name || item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-xl font-bold mb-2">{item.name || item.title}</h2>
              <p className="text-gray-300">{item.description}</p>
              {item.role && (
                <p className="text-red-400 mt-2 text-sm">{item.role}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VinceDeBelii; 
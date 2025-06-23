import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { client } from '../../../config/sanityClient';
import { useLanguage } from '../../../hooks/useLanguage';

const HerosFee = ({ section }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = {
    personnages: {
      title: t.universes.sections.personnages,
      query: '*[_type == "personnage" && universe == "herosfee"]'
    },
    "regions-lieux": {
      title: t.universes.sections.regionsLieux,
      query: '*[_type == "region" && universe == "herosfee"]'
    },
    objets: {
      title: t.universes.sections.objets,
      query: '*[_type == "objet" && universe == "herosfee"]'
    },
    factions: {
      title: t.universes.sections.factions,
      query: '*[_type == "faction" && universe == "herosfee"]'
    },
    races: {
      title: t.universes.sections.races,
      query: '*[_type == "race" && universe == "herosfee"]'
    },
    evenements: {
      title: t.universes.sections.evenementsHistoriques,
      query: '*[_type == "evenement" && universe == "herosfee"]'
    },
    bestiaires: {
      title: t.universes.sections.bestiaires,
      query: '*[_type == "creature" && universe == "herosfee"]'
    },
    celebrations: {
      title: t.universes.sections.celebrationsFetes,
      query: '*[_type == "celebrations" && universe == "herosfee"]'
    },
    cosmogonies: {
      title: t.universes.sections.cosmogonies,
      query: '*[_type == "conceptmetaphysique" && universe == "herosfee"]'
    }
  };

  const handleGoBack = () => {
    navigate('/creation/univers-narratifs/fable-heros-fee');
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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate('/creation/univers-narratifs')}
              className="text-sky-400 hover:text-sky-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-sky-900/20 transition-all duration-300 border border-sky-500/30 hover:border-sky-500 bg-gradient-to-r from-sky-900/20 to-pink-900/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Retour aux Univers</span>
            </button>
            <h1 className="text-4xl md:text-6xl font-bold">
              {t.universes.projects.herosFee.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(sections).map(([key, value]) => (
              <Link
                key={key}
                to={`/creation/univers-narratifs/fable-heros-fee/${key}`}
                className="p-6 rounded-xl bg-gradient-to-br from-sky-900/50 to-pink-900/50 border border-sky-500/30 hover:border-sky-500 transition-all duration-300"
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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <button 
            onClick={handleGoBack}
            className="text-sky-400 hover:text-sky-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-sky-900/20 transition-all duration-300 border border-sky-500/30 hover:border-sky-500 bg-gradient-to-r from-sky-900/20 to-pink-900/20 backdrop-blur-sm"
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
          {content && content.map((item, index) => (
            <div 
              key={item._id}
              className="p-6 rounded-xl bg-gradient-to-br from-sky-900/50 to-pink-900/50 border border-sky-500/30"
            >
              <h2 className="text-xl font-bold mb-2">{item.name || item.title}</h2>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HerosFee; 
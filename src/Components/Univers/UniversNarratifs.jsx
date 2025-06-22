import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const UniversNarratifs = () => {
  const { t } = useLanguage();
  
  const univers = [
    {
      title: t.universes.projects.flammeImaginaire.title,
      path: "/creation/univers-narratifs/flamme-imaginaire",
      description: t.universes.projects.flammeImaginaire.description,
      image: "/assets/img/flammeimaginaire-banner.webp",
      isMainSeries: true
    },
    {
      title: t.universes.projects.herosFee.title,
      path: "/creation/univers-narratifs/fable-heros-fee",
      description: t.universes.projects.herosFee.description,
      image: "/assets/img/herosfee-banner.webp",
      connectedTo: "flamme-imaginaire"
    },
    {
      title: t.universes.projects.vinceBelii.title,
      path: "/creation/univers-narratifs/vince-belii",
      description: t.universes.projects.vinceBelii.description,
      image: "/assets/img/vincebelii-banner.webp"
    },
    {
      title: t.universes.projects.pandemie.title,
      path: "/creation/univers-narratifs/pandemie-lara",
      description: t.universes.projects.pandemie.description,
      image: "/assets/img/pandemielara-banner.webp"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
          {t.universes.title}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {univers.map((univers, index) => (
            <Link 
              to={univers.path}
              key={index}
              className={`group relative overflow-hidden rounded-2xl border border-gray-700 hover:border-primary transition-all duration-500 ${
                univers.isMainSeries ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10" />
              
              <img 
                src={univers.image} 
                alt={univers.title}
                className={`w-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500 ${
                  univers.isMainSeries ? 'h-96' : 'h-64'
                }`}
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className={`font-bold mb-2 ${
                  univers.isMainSeries ? 'text-3xl' : 'text-xl'
                }`}>{univers.title}</h3>
                <p className={`text-gray-300 ${
                  univers.isMainSeries ? 'text-base' : 'text-sm'
                }`}>{univers.description}</p>
                {univers.connectedTo && (
                  <span className="inline-block mt-2 text-sm text-purple-400">
                    {t.universes.connectedToMain}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversNarratifs; 
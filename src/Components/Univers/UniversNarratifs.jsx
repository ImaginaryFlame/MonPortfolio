import React from 'react';
import { Link } from 'react-router-dom';

const UniversNarratifs = () => {
  const univers = [
    {
      title: "LE HÉROS À LA FLAMME IMAGINAIRE",
      path: "/creation/univers-narratifs/flamme-imaginaire",
      description: "Une épopée fantastique sur le pouvoir de l'imagination",
      image: "/assets/img/flammeimaginaire-banner.webp",
      isMainSeries: true
    },
    {
      title: "LA FABLE DU HÉROS ET LA FÉE",
      path: "/creation/univers-narratifs/fable-heros-fee",
      description: "Un conte moderne mêlant magie et aventure",
      image: "/assets/img/herosfee-banner.webp",
      connectedTo: "flamme-imaginaire"
    },
    {
      title: "VINCE DE BELII",
      path: "/creation/univers-narratifs/vince-belii",
      description: "Une saga familiale aux multiples rebondissements",
      image: "/assets/img/vincebelii-banner.webp"
    },
    {
      title: "LA PANDÉMIE DE LARA",
      path: "/creation/univers-narratifs/pandemie-lara",
      description: "Un thriller post-apocalyptique haletant",
      image: "/assets/img/pandemielara-banner.webp"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
          Univers Narratifs
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
                    Connecté à l'univers principal
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
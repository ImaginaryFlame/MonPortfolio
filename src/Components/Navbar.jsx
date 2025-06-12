import React, { useState } from 'react';

const Navbar = ({ theme }) => {
  const [isPortailsOpen, setIsPortailsOpen] = useState(false);
  const [portailType, setPortailType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const togglePortails = () => {
    if (!isPortailsOpen) {
      setIsPortailsOpen(true);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setIsPortailsOpen(false);
        setPortailType(null);
        setSelectedItem(null);
        setIsAnimating(false);
      }, 300);
    }
  };
  
  const handlePortailChange = (key) => {
    if (portailType === key) {
      setIsAnimating(true);
      setTimeout(() => {
        setPortailType(null);
        setSelectedItem(null);
        setIsAnimating(false);
      }, 200);
    } else {
      if (portailType) {
        setIsAnimating(true);
        setTimeout(() => {
          setPortailType(key);
          setSelectedItem(null);
          setIsAnimating(false);
        }, 250);
      } else {
        setPortailType(key);
        setSelectedItem(null);
      }
    }
  };
  
  const handleItemClick = (item, index) => {
    if (item.subItems) {
      if (selectedItem === index) {
        setIsAnimating(true);
        setTimeout(() => {
          setSelectedItem(null);
          setIsAnimating(false);
        }, 200);
      } else {
        if (selectedItem !== null) {
          setIsAnimating(true);
          setTimeout(() => {
            setSelectedItem(index);
            setIsAnimating(false);
          }, 200);
        } else {
          setSelectedItem(index);
        }
      }
    }
  };

  const menuItems = {
    narratif: {
      title: "LES UNIVERS DE FLAME",
      items: [
        { 
          name: "LE HEROS A LA FLAMME IMAGINAIRE", 
          path: "/creation/univers-narratifs/heros-flamme",
          subItems: [
            { name: "Personnages", path: "/creation/univers-narratifs/heros-flamme/personnages" },
            { name: "Régions du monde & Lieux", path: "/creation/univers-narratifs/heros-flamme/regions-lieux" },
            { name: "Objets", path: "/creation/univers-narratifs/heros-flamme/objets" },
            { name: "Factions", path: "/creation/univers-narratifs/heros-flamme/factions" },
            { name: "Races", path: "/creation/univers-narratifs/heros-flamme/races" },
            { name: "Évènements historiques", path: "/creation/univers-narratifs/heros-flamme/evenements-historiques" },
            { name: "Bestiaires", path: "/creation/univers-narratifs/heros-flamme/especes-non-intelligentes" },
            { name: "Célébrations et fêtes", path: "/creation/univers-narratifs/heros-flamme/celebrations-fetes" },
            { name: "Cosmogonies", path: "/creation/univers-narratifs/heros-flamme/cosmogonies" },
            { name: "Moodboard", path: "/creation/univers-narratifs/heros-flamme/moodboard" }
          ]
        },
        { 
          name: "LA FABLE DU HÉROS ET LA FÉE", 
          path: "/creation/univers-narratifs/fable-heros-fee",
          subItems: [
            { name: "Personnages", path: "/creation/univers-narratifs/fable-heros-fee/personnages" },
            { name: "Régions du monde & Lieux", path: "/creation/univers-narratifs/fable-heros-fee/regions-lieux" },
            { name: "Objets", path: "/creation/univers-narratifs/fable-heros-fee/objets" },
            { name: "Factions", path: "/creation/univers-narratifs/fable-heros-fee/factions" },
            { name: "Races", path: "/creation/univers-narratifs/fable-heros-fee/races" },
            { name: "Évènements historiques", path: "/creation/univers-narratifs/fable-heros-fee/evenements-historiques" },
            { name: "Bestiaires", path: "/creation/univers-narratifs/fable-heros-fee/especes-non-intelligentes" },
            { name: "Célébrations et fêtes", path: "/creation/univers-narratifs/fable-heros-fee/celebrations-fetes" },
            { name: "Cosmogonies", path: "/creation/univers-narratifs/fable-heros-fee/cosmogonies" },
            { name: "Moodboard", path: "/creation/univers-narratifs/fable-heros-fee/moodboard" }
          ]
        },
        { 
          name: "Vince de Belii", 
          path: "/creation/univers-narratifs/vince-belii",
          subItems: [
            { name: "Personnages", path: "/creation/univers-narratifs/vince-belii/personnages" },
            { name: "Familles", path: "/creation/univers-narratifs/vince-belii/familles" },
            { name: "Lieux", path: "/creation/univers-narratifs/vince-belii/lieux" },
            { name: "Moodboard", path: "/creation/univers-narratifs/vince-belii/moodboard" }
          ]
        }
      ]
    },
    labo: {
      title: "LABO DE FLAME",
      items: [
        { 
          name: "Design & Interface", 
          path: "/creation/labo/design",
          subItems: [
            { name: "UI/UX Design", path: "/creation/labo/design/ui-ux" },
            { name: "Prototypes Interactifs", path: "/creation/labo/design/prototypes" }
          ]
        },
        { 
          name: "Développement", 
          path: "/creation/labo/dev",
          subItems: [
            { name: "Démo Web", path: "/creation/labo/dev/demo-web" },
            { name: "Prototypes de Jeu", path: "/creation/labo/dev/prototypes-jeu" }
          ]
        },
        { 
          name: "Projets Académiques", 
          path: "/creation/labo/academique",
          subItems: [
            { name: "Présentations CNAM", path: "/creation/labo/academique/presentations-cnam" }
          ]
        }
      ]
    },
    studio: {
      title: "LE STUDIO DE FLAME",
      items: [
        { 
          name: "Contenu Vidéo", 
          path: "/creation/studio/video",
          subItems: [
            { name: "Vidéos YouTube", path: "/creation/studio/video/videos-youtube" },
            { name: "Réels & Shorts", path: "/creation/studio/video/reels-shorts" },
            { name: "Miniatures", path: "/creation/studio/video/miniatures" }
          ]
        },
        { 
          name: "Contenu Social", 
          path: "/creation/studio/social",
          subItems: [
            { name: "Threads Twitter", path: "/creation/studio/social/threads-twitter" },
          ]
        },
        { 
          name: "Branding", 
          path: "/creation/studio/branding",
          subItems: [
            { name: "Identité Visuelle", path: "/creation/studio/branding/identite-visuelle" },
            { name: "Templates", path: "/creation/studio/branding/templates" }
          ]
        }
      ]
    },
    atelier: {
      title: "ATELIER DE FLAME",
      items: [
        { 
          name: "Art Traditionnel", 
          path: "/creation/atelier/traditionnel",
          subItems: [
            { name: "Illustrations Finalisées", path: "/creation/atelier/traditionnel/illustrations-finalisees" },
            { name: "Études & Progression", path: "/creation/atelier/traditionnel/etudes-progression" },
            { name: "Croquis & Roughs", path: "/creation/atelier/traditionnel/croquis-roughs" }
          ]
        },
        { 
          name: "Art Numérique", 
          path: "/creation/atelier/numerique",
          subItems: [
            { name: "Concept Art", path: "/creation/atelier/numerique/concept-art" },
            { name: "Illustrations Digitales", path: "/creation/atelier/numerique/illustrations-digitales" },
            { name: "Animations 2D", path: "/creation/atelier/numerique/animations-2d" }
          ]
        },
        { 
          name: "Modélisation 3D", 
          path: "/creation/atelier/3d",
          subItems: [
            { name: "Modèles 3D", path: "/creation/atelier/3d/modeles" },
            { name: "Textures & Matériaux", path: "/creation/atelier/3d/textures-materiaux" },
            { name: "Animations 3D", path: "/creation/atelier/3d/animations-3d" }
          ]
        },
        { 
          name: "Work in Progress", 
          path: "/creation/atelier/wip",
          subItems: [
            { name: "Projets en Cours", path: "/creation/atelier/wip/projets-cours" },
            { name: "Expérimentations", path: "/creation/atelier/wip/experimentations" }
          ]
        }
      ]
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <nav className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 p-2 rounded-full shadow-2xl backdrop-blur-sm">
        {/* Logo */}
        <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-12">
          <span className="text-white text-xl font-bold">⚡</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1">
          <a 
            href="/" 
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full hover:from-orange-500 hover:to-red-600 transition-all duration-300 hover:transform hover:scale-105 text-sm uppercase tracking-wide shadow-lg"
          >
            HOME
          </a>
          
          <a 
            href="/about" 
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full hover:from-orange-500 hover:to-red-600 transition-all duration-300 hover:transform hover:scale-105 text-sm uppercase tracking-wide shadow-lg"
          >
            ABOUT
          </a>

          <div className="relative">
            <button
              onClick={togglePortails}
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full hover:from-orange-500 hover:to-red-600 transition-all duration-300 hover:transform hover:scale-105 text-sm uppercase tracking-wide shadow-lg"
            >
              PORTAILS DE CRÉATION
            </button>

            {isPortailsOpen && (
              <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-4 flex space-x-8 z-40 transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                {/* Boutons principaux */}
                <div className="flex flex-col space-y-3 items-start">
                  {Object.entries(menuItems).map(([key, value], index) => (
                    <button
                      key={key}
                      onClick={() => handlePortailChange(key)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      className={`px-5 py-3 rounded-lg text-sm font-medium uppercase transition-all whitespace-nowrap backdrop-blur-md border ${
                        portailType === key 
                          ? 'bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white scale-105 shadow-xl border-orange-300' 
                          : 'bg-gradient-to-r from-slate-800/90 to-blue-900/90 text-white hover:from-orange-600/90 hover:to-red-600/90 border-slate-600'
                      } hover:transform hover:-translate-y-1`}
                    >
                      {value.title}
                    </button>
                  ))}
                </div>

                {/* Sous-menus */}
                {portailType && (
                  <div className={`flex space-x-6 transition-all duration-400 ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
                    <div className="flex flex-col gap-3 min-w-[200px]">
                      {menuItems[portailType].items.map((item, index) => (
                        <div key={index} className="relative">
                          {item.subItems ? (
                            <button
                              onClick={() => handleItemClick(item, index)}
                              style={{ animationDelay: `${index * 0.08}s` }}
                              className={`text-left px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg w-full backdrop-blur-md border ${
                                selectedItem === index 
                                  ? 'bg-gradient-to-r from-blue-800/95 to-blue-600/95 text-white scale-105 border-blue-400' 
                                  : 'bg-gradient-to-r from-orange-500/95 to-red-600/95 text-white hover:from-blue-700/95 hover:to-blue-500/95 border-orange-400'
                              } hover:transform hover:-translate-y-1`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold">{item.name}</span>
                                <span className={`transition-transform duration-300 ${selectedItem === index ? 'rotate-90' : ''}`}>▶</span>
                              </div>
                            </button>
                          ) : (
                            <a
                              href={item.path}
                              style={{ animationDelay: `${index * 0.08}s` }}
                              className="bg-gradient-to-r from-orange-500/95 to-red-600/95 text-white text-left px-6 py-3 rounded-lg font-semibold hover:from-blue-700/95 hover:to-blue-500/95 transition-all duration-300 shadow-lg block w-full text-sm backdrop-blur-md border border-orange-400 hover:transform hover:-translate-y-1"
                            >
                              {item.name}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Sous-sous-menus */}
                    {selectedItem !== null && menuItems[portailType].items[selectedItem]?.subItems && (
                      <div className={`flex flex-col gap-2 min-w-[200px] transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                        {menuItems[portailType].items[selectedItem].subItems.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.path}
                            style={{ animationDelay: `${subIndex * 0.06}s` }}
                            className="bg-gradient-to-r from-yellow-400/95 to-orange-500/95 text-gray-900 text-left px-4 py-3 rounded-lg font-semibold hover:from-blue-400/95 hover:to-blue-600/95 hover:text-white transition-all duration-300 shadow-md text-sm backdrop-blur-md border border-yellow-300 hover:transform hover:-translate-y-1"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <a 
            href="/contact" 
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full hover:from-orange-500 hover:to-red-600 transition-all duration-300 hover:transform hover:scale-105 text-sm uppercase tracking-wide shadow-lg"
          >
            CONTACT
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
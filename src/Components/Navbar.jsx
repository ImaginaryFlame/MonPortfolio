import React, { useState, useEffect } from 'react';

const Navbar = ({ theme }) => {
  const [isPortailsOpen, setIsPortailsOpen] = useState(false);
  const [portailType, setPortailType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Gestion du scroll pour l'apparition/disparition de la navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
      
      // Ferme le menu si on scrolle
      if (isPortailsOpen && currentScrollY > 100) {
        togglePortails();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setIsVisible(true); // Apparition initiale

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isPortailsOpen]);

  const togglePortails = () => {
    if (!isPortailsOpen) {
      setIsPortailsOpen(true);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedItem(null);
      }, 100);
      setTimeout(() => {
        setPortailType(null);
      }, 200);
      setTimeout(() => {
        setIsPortailsOpen(false);
        setIsAnimating(false);
      }, 500);
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
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out transform ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="flex justify-center pt-4 px-4">
        <nav className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 p-2 rounded-full shadow-2xl">
          {/* Logo avec animation améliorée */}
          <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center transform transition-all duration-500 ease-out hover:scale-110 hover:rotate-12 hover:shadow-lg">
            <span className="text-white text-xl font-bold transition-transform duration-500 ease-out">⚡</span>
          </div>

          {/* Navigation Links avec animations améliorées */}
          <div className="flex items-center space-x-1">
            <a 
              href="/" 
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full hover:from-orange-500 hover:to-red-600 transition-all duration-500 ease-out hover:transform hover:scale-105 hover:shadow-lg text-sm uppercase tracking-wide shadow-lg"
            >
              HOME
            </a>
            
            <a 
              href="/about" 
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full hover:from-orange-500 hover:to-red-600 transition-all duration-500 ease-out hover:transform hover:scale-105 hover:shadow-lg text-sm uppercase tracking-wide shadow-lg"
            >
              ABOUT
            </a>

            <div className="relative">
              <button
                onClick={togglePortails}
                className={`px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full transition-all duration-500 ease-out hover:from-orange-500 hover:to-red-600 hover:transform hover:scale-105 hover:shadow-lg text-sm uppercase tracking-wide shadow-lg ${
                  isPortailsOpen ? 'scale-105 shadow-xl from-orange-500 to-red-600' : ''
                }`}
              >
                PORTAILS DE CRÉATION
              </button>

              {/* Menu principal avec animations améliorées */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 top-full mt-4 flex space-x-8 z-40 transition-all duration-500 ease-out
                  ${isPortailsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
                  ${isAnimating ? 'animate-fadeOut' : ''}
                `}
              >
                {/* Boutons principaux avec animations séquentielles */}
                <div className="flex flex-col space-y-3 items-start">
                  {Object.entries(menuItems).map(([key, value], index) => (
                    <button
                      key={key}
                      onClick={() => handlePortailChange(key)}
                      className={`px-5 py-3 rounded-lg text-sm font-medium uppercase transition-all duration-500 ease-out whitespace-nowrap border
                        ${isPortailsOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                        ${isAnimating ? 'animate-fadeSlideOut' : ''}
                        ${portailType === key 
                          ? 'bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white scale-105 shadow-xl border-orange-300' 
                          : 'bg-gradient-to-r from-slate-800/90 to-blue-900/90 text-white hover:from-orange-600/90 hover:to-red-600/90 border-slate-600'
                        } hover:transform hover:-translate-y-1 hover:shadow-lg`}
                      style={{ 
                        transitionDelay: isPortailsOpen ? `${index * 100}ms` : `${(Object.entries(menuItems).length - index - 1) * 100}ms`,
                        animation: isPortailsOpen 
                          ? `fadeSlideIn 500ms ${index * 100}ms ease-out forwards`
                          : isAnimating ? `fadeSlideOut 500ms ${(Object.entries(menuItems).length - index - 1) * 100}ms ease-out forwards` : 'none'
                      }}
                    >
                      {value.title}
                    </button>
                  ))}
                </div>

                {/* Sous-menus avec animations améliorées */}
                {portailType && (
                  <div className={`flex space-x-6 transition-all duration-500 ease-out
                    ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
                  `}>
                    <div className="flex flex-col gap-3 min-w-[200px]">
                      {menuItems[portailType].items.map((item, index) => (
                        <div 
                          key={index} 
                          className="relative"
                          style={{ 
                            animation: isPortailsOpen 
                              ? `fadeSlideIn 500ms ${index * 100}ms ease-out forwards`
                              : isAnimating ? `fadeSlideOut 500ms ${(menuItems[portailType].items.length - index - 1) * 100}ms ease-out forwards` : 'none',
                            opacity: isAnimating ? 1 : 0
                          }}
                        >
                          {item.subItems ? (
                            <button
                              onClick={() => handleItemClick(item, index)}
                              className={`text-left px-6 py-3 rounded-lg font-medium transition-all duration-500 ease-out shadow-lg w-full border
                                ${selectedItem === index 
                                  ? 'bg-gradient-to-r from-blue-800/95 to-blue-600/95 text-white scale-105 border-blue-400' 
                                  : 'bg-gradient-to-r from-orange-500/95 to-red-600/95 text-white hover:from-blue-700/95 hover:to-blue-500/95 border-orange-400'
                                } hover:transform hover:-translate-y-1 hover:shadow-lg`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold">{item.name}</span>
                                <span className={`transition-transform duration-500 ease-out ${selectedItem === index ? 'rotate-90' : ''}`}>▶</span>
                              </div>
                            </button>
                          ) : (
                            <a
                              href={item.path}
                              className="bg-gradient-to-r from-orange-500/95 to-red-600/95 text-white text-left px-6 py-3 rounded-lg font-semibold hover:from-blue-700/95 hover:to-blue-500/95 transition-all duration-500 ease-out shadow-lg block w-full text-sm border border-orange-400 hover:transform hover:-translate-y-1 hover:shadow-lg"
                            >
                              {item.name}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Sous-sous-menus avec animations améliorées */}
                    {selectedItem !== null && menuItems[portailType].items[selectedItem]?.subItems && (
                      <div className={`flex flex-col gap-2 min-w-[200px] transition-all duration-500 ease-out
                        ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                      `}>
                        {menuItems[portailType].items[selectedItem].subItems.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.path}
                            className="bg-gradient-to-r from-yellow-400/95 to-orange-500/95 text-gray-900 text-left px-4 py-3 rounded-lg font-semibold hover:from-blue-400/95 hover:to-blue-600/95 hover:text-white transition-all duration-500 ease-out shadow-md text-sm border border-yellow-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
                            style={{ 
                              animation: isPortailsOpen 
                                ? `fadeSlideIn 500ms ${subIndex * 100}ms ease-out forwards`
                                : isAnimating ? `fadeSlideOut 500ms ${(menuItems[portailType].items[selectedItem].subItems.length - subIndex - 1) * 100}ms ease-out forwards` : 'none',
                              opacity: isAnimating ? 1 : 0
                            }}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <a 
              href="/contact" 
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full hover:from-orange-500 hover:to-red-600 transition-all duration-500 ease-out hover:transform hover:scale-105 hover:shadow-lg text-sm uppercase tracking-wide shadow-lg"
            >
              CONTACT
            </a>
          </div>
        </nav>

        {/* Overlay semi-transparent */}
        {isPortailsOpen && (
          <div 
            className="fixed inset-0 bg-black/20 transition-opacity duration-500 ease-out"
            style={{
              opacity: isAnimating ? 0 : 1,
              pointerEvents: isAnimating ? 'none' : 'auto'
            }}
            onClick={togglePortails}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
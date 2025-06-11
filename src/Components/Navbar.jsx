import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPortailsOpen, setIsPortailsOpen] = useState(false);
  const [portailType, setPortailType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousPortailType, setPreviousPortailType] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
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
        setPreviousPortailType(portailType);
        setIsAnimating(true);
        setTimeout(() => {
          setPortailType(key);
          setSelectedItem(null);
          setIsAnimating(false);
          setPreviousPortailType(null);
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
            { name: "Cosmogonies & Lore", path: "/creation/univers-narratifs/heros-flamme/cosmogonies" },
            { name: "Personnages", path: "/creation/univers-narratifs/heros-flamme/personnages" },
            { name: "Races & Factions", path: "/creation/univers-narratifs/heros-flamme/races-factions" },
            { name: "Monde & Géographie", path: "/creation/univers-narratifs/heros-flamme/monde-geographie" },
            { name: "Histoire & Événements", path: "/creation/univers-narratifs/heros-flamme/histoire-evenements" },
            { name: "Objets & Artefacts", path: "/creation/univers-narratifs/heros-flamme/objets-artefacts" },
            { name: "Bestiaire", path: "/creation/univers-narratifs/heros-flamme/bestiaire" },
            { name: "Culture & Traditions", path: "/creation/univers-narratifs/heros-flamme/culture-traditions" },
            { name: "Moodboard", path: "/creation/univers-narratifs/heros-flamme/moodboard" }
          ]
        },
        { 
          name: "LA FABLE DU HÉROS ET LA FÉE", 
          path: "/creation/univers-narratifs/fable-heros-fee",
          subItems: [
            { name: "Cosmogonies & Lore", path: "/creation/univers-narratifs/fable-heros-fee/cosmogonies" },
            { name: "Personnages", path: "/creation/univers-narratifs/fable-heros-fee/personnages" },
            { name: "Races & Factions", path: "/creation/univers-narratifs/fable-heros-fee/races-factions" },
            { name: "Monde & Géographie", path: "/creation/univers-narratifs/fable-heros-fee/monde-geographie" },
            { name: "Histoire & Événements", path: "/creation/univers-narratifs/fable-heros-fee/histoire-evenements" },
            { name: "Objets & Artefacts", path: "/creation/univers-narratifs/fable-heros-fee/objets-artefacts" },
            { name: "Bestiaire", path: "/creation/univers-narratifs/fable-heros-fee/bestiaire" },
            { name: "Culture & Traditions", path: "/creation/univers-narratifs/fable-heros-fee/culture-traditions" },
            { name: "Moodboard", path: "/creation/univers-narratifs/fable-heros-fee/moodboard" }
          ]
        },
        { 
          name: "VINCE DE BELII", 
          path: "/creation/univers-narratifs/vince-belii",
          subItems: [
            { name: "Personnages & Familles", path: "/creation/univers-narratifs/vince-belii/personnages-familles" },
            { name: "Lieux & Décors", path: "/creation/univers-narratifs/vince-belii/lieux-decors" },
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
            { name: "Prototypes Interactifs", path: "/creation/labo/design/prototypes" },
          ]
        },
        { 
          name: "Développement", 
          path: "/creation/labo/dev",
          subItems: [
            { name: "Démo Web", path: "/creation/labo/dev/demo-web" },
            { name: "Prototypes de Jeu", path: "/creation/labo/dev/prototypes-jeu" },
          ]
        },
        { 
          name: "Projets Académiques", 
          path: "/creation/labo/academique",
          subItems: [
            { name: "Présentations CNAM", path: "/creation/labo/academique/presentations-cnam" },
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
            { name: "Stories Instagram", path: "/creation/studio/social/stories-instagram" },
            { name: "Posts LinkedIn", path: "/creation/studio/social/posts-linkedin" }
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

  // Styles CSS intégrés
  const styles = `
    @keyframes portalFadeIn {
      0% {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes slideInFromRight {
      0% {
        opacity: 0;
        transform: translateX(50px) scale(0.9);
      }
      100% {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }

    @keyframes slideOutToLeft {
      0% {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateX(-50px) scale(0.9);
      }
    }

    @keyframes staggeredTileFadeIn {
      0% {
        opacity: 0;
        transform: translateY(15px) rotate(-1deg);
      }
      100% {
        opacity: 1;
        transform: translateY(0) rotate(0deg);
      }
    }

    @keyframes submenuSlideUp {
      0% {
        opacity: 0;
        transform: translateY(20px) translateX(10px) scale(0.95);
      }
      100% {
        opacity: 1;
        transform: translateY(0) translateX(0) scale(1);
      }
    }

    @keyframes submenuSlideDown {
      0% {
        opacity: 1;
        transform: translateY(0) translateX(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-20px) translateX(-10px) scale(0.95);
      }
    }

    .portal-animate {
      animation: portalFadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .slide-in-right {
      animation: slideInFromRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    .slide-out-left {
      animation: slideOutToLeft 0.3s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
    }

    .tile {
      opacity: 0;
      animation: staggeredTileFadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .submenu-enter {
      animation: submenuSlideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    .submenu-exit {
      animation: submenuSlideDown 0.3s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
    }

    .hover-lift:hover {
      transform: translateY(-2px) scale(1.02);
    }

    .glass-effect {
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .navbar-shadow {
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 4px 20px rgba(255, 100, 0, 0.2);
    }
  `;

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  return (
    <>
      {/* Navbar fixe en haut */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <nav className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 p-2 rounded-full navbar-shadow">
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
                <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-4 flex space-x-8 z-40 ${isAnimating ? 'slide-out-left' : 'portal-animate'}`}>
                  {/* Boutons principaux */}
                  <div className="flex flex-col space-y-3 items-start">
                    {Object.entries(menuItems).map(([key, value], index) => (
                      <button
                        key={key}
                        onClick={() => handlePortailChange(key)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        className={`px-5 py-3 rounded-lg text-sm font-medium uppercase transition-all whitespace-nowrap hover-lift glass-effect ${
                          portailType === key 
                            ? 'bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white scale-105 shadow-xl border-orange-300' 
                            : 'bg-gradient-to-r from-slate-800/90 to-blue-900/90 text-white hover:from-orange-600/90 hover:to-red-600/90 border-slate-600'
                        }`}
                      >
                        {value.title}
                      </button>
                    ))}
                  </div>

                  {/* Sous-menus */}
                  {portailType && (
                    <div className={`flex space-x-6 ${isAnimating && !previousPortailType ? 'submenu-exit' : 'slide-in-right'}`}>
                      <div className="flex flex-col gap-3 min-w-[200px]">
                        {menuItems[portailType].items.map((item, index) => (
                          <div key={index} className="relative">
                            {item.subItems ? (
                              <button
                                onClick={() => handleItemClick(item, index)}
                                style={{ animationDelay: `${index * 0.08}s` }}
                                className={`tile text-left px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover-lift w-full glass-effect ${
                                  selectedItem === index 
                                    ? 'bg-gradient-to-r from-blue-800/95 to-blue-600/95 text-white scale-105 border-blue-400' 
                                    : 'bg-gradient-to-r from-orange-500/95 to-red-600/95 text-white hover:from-blue-700/95 hover:to-blue-500/95 border-orange-400'
                                }`}
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
                                className="tile bg-gradient-to-r from-orange-500/95 to-red-600/95 text-white text-left px-6 py-3 rounded-lg font-semibold hover:from-blue-700/95 hover:to-blue-500/95 transition-all duration-300 shadow-lg hover-lift block w-full text-sm glass-effect border border-orange-400"
                              >
                                {item.name}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Sous-sous-menus */}
                      {selectedItem !== null && menuItems[portailType].items[selectedItem]?.subItems && (
                        <div className={`flex flex-col gap-2 min-w-[200px] ${isAnimating ? 'submenu-exit' : 'submenu-enter'}`}>
                          {menuItems[portailType].items[selectedItem].subItems.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.path}
                              style={{ animationDelay: `${subIndex * 0.06}s` }}
                              className="tile bg-gradient-to-r from-yellow-400/95 to-orange-500/95 text-gray-900 text-left px-4 py-3 rounded-lg font-semibold hover:from-blue-400/95 hover:to-blue-600/95 hover:text-white transition-all duration-300 shadow-md text-sm hover-lift glass-effect border border-yellow-300"
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
    </>
  );
};

export default Navbar;
import { useState } from 'react';

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
          name: "Le héros à la Flamme Imaginaire", 
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
          name: "La Fable du Héros et la Fée", 
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
          name: "Vince de Belii", 
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
            { name: "Wireframes", path: "/creation/labo/design/wireframes" }
          ]
        },
        { 
          name: "Développement", 
          path: "/creation/labo/dev",
          subItems: [
            { name: "Démo Web", path: "/creation/labo/dev/demo-web" },
            { name: "Prototypes de Jeu", path: "/creation/labo/dev/prototypes-jeu" },
            { name: "Outils & Scripts", path: "/creation/labo/dev/outils-scripts" }
          ]
        },
        { 
          name: "Projets Académiques", 
          path: "/creation/labo/academique",
          subItems: [
            { name: "Présentations CNAM", path: "/creation/labo/academique/presentations-cnam" },
            { name: "Recherches & Analyses", path: "/creation/labo/academique/recherches" }
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

  return (
    <>
      <style>{`
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

        .focus-transition {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: left;
        }

        .menu-transition {
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .hover-lift {
          transition: transform 0.2s ease;
        }

        .hover-lift:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .flame-gradient {
          background: linear-gradient(135deg, #FF4500, #FF6347, #FFD700, #FFA500);
        }

        .cosmic-gradient {
          background: linear-gradient(135deg, #0F0F23, #1a1a3a, #2563eb, #1e40af);
        }

        .energy-glow {
          box-shadow: 0 0 25px rgba(255, 69, 0, 0.6), 0 0 50px rgba(255, 165, 0, 0.3);
        }

        .cosmic-glow {
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.5), 0 0 40px rgba(30, 64, 175, 0.3);
        }

        .fire-glow {
          box-shadow: 0 0 15px rgba(255, 99, 71, 0.7), 0 0 30px rgba(255, 69, 0, 0.4);
        }

        .blue-fire-glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 35px rgba(147, 197, 253, 0.4);
        }

        .submenu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 8px;
          max-width: 400px;
        }

        .category-separator {
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          margin: 8px 0;
        }
      `}</style>

      <nav className="cosmic-gradient p-4 flex justify-center items-center fixed w-full top-0 z-50">
        <div className="flex items-center space-x-2 relative">
          <a href="/" className="flex items-center group">
            <div className="w-10 h-10 rounded-full flame-gradient flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 energy-glow">
              <span className="text-white text-xl font-bold">⚡</span>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-2">
            <a href="/" className="flame-gradient px-6 py-2 rounded-full text-white hover:from-red-500 hover:to-yellow-400 transition-all font-medium energy-glow">HOME</a>
            <a href="/about" className="flame-gradient px-6 py-2 rounded-full text-white hover:from-red-500 hover:to-yellow-400 transition-all font-medium energy-glow">ABOUT</a>

            <button onClick={togglePortails} className="flame-gradient px-6 py-2 rounded-full text-white hover:from-red-500 hover:to-yellow-400 transition-all font-medium whitespace-nowrap energy-glow">
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
                      className={`px-5 py-3 rounded-full text-sm font-medium uppercase transition-all whitespace-nowrap focus-transition hover-lift ${
                        portailType === key 
                          ? 'flame-gradient text-white scale-105 shadow-lg energy-glow' 
                          : 'bg-gradient-to-r from-slate-900 to-blue-900 text-white hover:from-orange-600 hover:to-red-600 cosmic-glow'
                      }`}
                    >
                      {value.title}
                    </button>
                  ))}
                </div>

                {/* Sous-menus optimisés */}
                {portailType && (
                  <div className={`flex space-x-6 ${isAnimating && !previousPortailType ? 'submenu-exit' : 'slide-in-right'}`}>
                    <div className="flex flex-col gap-3 min-w-[200px]">
                      {menuItems[portailType].items.map((item, index) => (
                        <div key={index} className="relative">
                          {item.subItems ? (
                            <button
                              onClick={() => handleItemClick(item, index)}
                              style={{ animationDelay: `${index * 0.08}s` }}
                              className={`tile text-left px-6 py-3 rounded-3xl font-medium transition-all duration-300 shadow-md hover-lift menu-transition w-full ${
                                selectedItem === index 
                                  ? 'bg-gradient-to-r from-blue-800 to-blue-600 text-white blue-fire-glow scale-105' 
                                  : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-blue-700 hover:to-blue-500 fire-glow'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{item.name}</span>
                                <span className={`transition-transform duration-300 ${selectedItem === index ? 'rotate-90' : ''}`}>▶</span>
                              </div>
                            </button>
                          ) : (
                            <a
                              href={item.path}
                              style={{ animationDelay: `${index * 0.08}s` }}
                              className="tile bg-gradient-to-r from-orange-500 to-red-600 text-white text-left px-6 py-3 rounded-3xl font-medium hover:from-blue-700 hover:to-blue-500 transition-all duration-300 shadow-md hover-lift fire-glow block w-full"
                            >
                              {item.name}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Sous-sous-menus en grille optimisée */}
                    {selectedItem !== null && menuItems[portailType].items[selectedItem]?.subItems && (
                      <div className={`submenu-grid ${isAnimating ? 'submenu-exit' : 'submenu-enter'}`}>
                        {menuItems[portailType].items[selectedItem].subItems.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.path}
                            style={{ animationDelay: `${subIndex * 0.06}s` }}
                            className="tile bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-center px-4 py-2 rounded-2xl font-medium hover:from-blue-400 hover:to-blue-600 hover:text-white transition-all duration-300 shadow-sm text-sm hover-lift"
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


            <a href="/contact" className="flame-gradient px-6 py-2 rounded-full text-white hover:from-red-500 hover:to-yellow-400 transition-all font-medium energy-glow">CONTACT</a>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden flame-gradient px-4 py-2 rounded-full text-white hover:from-red-500 hover:to-yellow-400 transition-all font-medium energy-glow">
            MENU
          </button>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 cosmic-gradient p-4 rounded-b-lg shadow-lg">
              <div className="flex flex-col space-y-2">
                <a href="/" className="flame-gradient px-4 py-2 rounded-full text-white text-center energy-glow">HOME</a>
                <a href="/about" className="flame-gradient px-4 py-2 rounded-full text-white text-center energy-glow">ABOUT</a>
                <button onClick={togglePortails} className="flame-gradient px-4 py-2 rounded-full text-white energy-glow">
                  PORTAILS DE CRÉATION
                </button>

                <a href="/contact" className="flame-gradient px-4 py-2 rounded-full text-white text-center energy-glow">CONTACT</a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
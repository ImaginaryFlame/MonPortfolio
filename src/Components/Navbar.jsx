import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPortailsOpen, setIsPortailsOpen] = useState(false);
  const [portailType, setPortailType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const togglePortails = () => setIsPortailsOpen(!isPortailsOpen);
  
  const handleItemClick = (item, index) => {
    if (item.subItems) {
      setSelectedItem(selectedItem === index ? null : index);
    }
  };

  const menuItems = {
    narratif: {
      title: "LES UNIVERS DE FLAME",
      color: "#ff6b35",
      glowColor: "#ff6b35",
      items: [
        { 
          name: "Le héros à la Flamme Imaginaire", 
          path: "/creation/univers-narratifs/heros-flamme",
          subItems: [
            { name: "Personnages", path: "/creation/univers-narratifs/heros-flamme/personnages" },
            { name: "Régions du monde & Lieux", path: "/creation/univers-narratifs/heros-flamme/regions-lieux" },
            { name: "Objets", path: "/creation/univers-narratifs/heros-flamme/objets" },
            { name: "Factions", path: "/creation/univers-narratifs/heros-flamme/factions" },
            { name: "Races", path: "/creation/univers-narratifs/heros-flamme/races" },
            { name: "Évènements historiques", path: "/creation/univers-narratifs/heros-flamme/evenements-historiques" },
            { name: "Espèces non-intelligentes", path: "/creation/univers-narratifs/heros-flamme/especes-non-intelligentes" },
            { name: "Célébrations et fêtes", path: "/creation/univers-narratifs/heros-flamme/celebrations-fetes" },
            { name: "Cosmogonies", path: "/creation/univers-narratifs/heros-flamme/cosmogonies" },
            { name: "Moodboard", path: "/creation/univers-narratifs/heros-flamme/moodboard" }
          ]
        },
        { 
          name: "La Fable du Héros et la Fée", 
          path: "/creation/univers-narratifs/fable-heros-fee",
          subItems: [
            { name: "Personnages", path: "/creation/univers-narratifs/fable-heros-fee/personnages" },
            { name: "Régions du monde & Lieux", path: "/creation/univers-narratifs/fable-heros-fee/regions-lieux" },
            { name: "Objets", path: "/creation/univers-narratifs/fable-heros-fee/objets" },
            { name: "Factions", path: "/creation/univers-narratifs/fable-heros-fee/factions" },
            { name: "Races", path: "/creation/univers-narratifs/fable-heros-fee/races" },
            { name: "Évènements historiques", path: "/creation/univers-narratifs/fable-heros-fee/evenements-historiques" },
            { name: "Espèces non-intelligentes", path: "/creation/univers-narratifs/fable-heros-fee/especes-non-intelligentes" },
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
      color: "#00d4ff",
      glowColor: "#00d4ff",
      items: [
        { name: "UI/UX", path: "/creation/labo/ui-ux" },
        { name: "Présentation de projets CNAM", path: "/creation/labo/projets-cnam" },
        { name: "Prototypes de jeu", path: "/creation/labo/prototypes" },
        { name: "Démo Web", path: "/creation/labo/demo-web" }
      ]
    },
    studio: {
      title: "LE STUDIO DE FLAME",
      color: "#ff3d71",
      glowColor: "#ff3d71",
      items: [
        { name: "Vidéos YouTube", path: "/creation/studio/videos" },
        { name: "Miniatures YouTube", path: "/creation/studio/miniatures" },
        { name: "Réels & shorts", path: "/creation/studio/reels-shorts" },
        { name: "Threads Twitter", path: "/creation/studio/threads" }
      ]
    },
    atelier: {
      title: "ATELIER DE FLAME",
      color: "#7b68ee",
      glowColor: "#7b68ee",
      items: [
        { 
          name: "Dessins traditionnels", 
          path: "/creation/atelier/dessins-traditionnels",
          subItems: [
            { name: "Progression en dessin", path: "/creation/atelier/dessins-traditionnels/progression-dessin" },
            { name: "Illustrations finalisées", path: "/creation/atelier/dessins-traditionnels/illustrations-finalisees" }
          ]
        },
        { 
          name: "Dessin numérique", 
          path: "/creation/atelier/dessin-numerique",
          subItems: [
            { name: "Illustrations digitales", path: "/creation/atelier/dessin-numerique/illustrations-digitales" },
            { name: "Concept Art", path: "/creation/atelier/dessin-numerique/concept-art" },
            { name: "Character Design", path: "/creation/atelier/dessin-numerique/character-design" }
          ]
        },
        { name: "Animations", path: "/creation/atelier/animations" },
        { name: "WIP", path: "/creation/atelier/wip" },
        { name: "Roughs", path: "/creation/atelier/roughs" },
        { name: "Modèles 3D", path: "/creation/atelier/3d" }
      ]
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        @keyframes portalFloat {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            filter: drop-shadow(0 0 10px currentColor);
          }
          50% {
            filter: drop-shadow(0 0 20px currentColor) drop-shadow(0 0 30px currentColor);
          }
        }

        @keyframes energyFlow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        @keyframes hoverGlow {
          0% {
            box-shadow: 0 0 10px currentColor, inset 0 0 10px rgba(255,255,255,0.1);
          }
          100% {
            box-shadow: 0 0 30px currentColor, 0 0 50px currentColor, inset 0 0 20px rgba(255,255,255,0.2);
          }
        }

        .portal-container {
          animation: portalFloat 0.6s ease-out forwards;
          font-family: 'Orbitron', monospace;
          background: linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(25, 25, 45, 0.95));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .gaming-button {
          position: relative;
          background: linear-gradient(135deg, rgba(40, 40, 70, 0.8), rgba(20, 20, 40, 0.9));
          border: 2px solid;
          border-radius: 15px;
          padding: 15px 25px;
          margin: 8px 0;
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          min-width: 280px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .gaming-button::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, currentColor, transparent, currentColor);
          border-radius: 15px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gaming-button:hover::before {
          opacity: 1;
          animation: energyFlow 2s linear infinite;
        }

        .gaming-button:hover {
          transform: translateY(-3px) scale(1.02);
          animation: hoverGlow 1s ease-in-out infinite alternate;
          background: linear-gradient(135deg, rgba(60, 60, 100, 0.9), rgba(40, 40, 70, 0.9));
        }

        .gaming-button.active {
          transform: scale(1.05);
          animation: glowPulse 2s ease-in-out infinite;
          background: linear-gradient(135deg, rgba(80, 80, 120, 0.9), rgba(60, 60, 100, 0.9));
        }

        .sub-menu-container {
          position: absolute;
          right: -320px;
          top: 0;
          background: linear-gradient(135deg, rgba(20, 20, 40, 0.95), rgba(35, 35, 55, 0.95));
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 15px;
          min-width: 300px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
          animation: portalFloat 0.4s ease-out forwards;
        }

        .sub-gaming-button {
          background: linear-gradient(135deg, rgba(30, 30, 50, 0.8), rgba(20, 20, 35, 0.9));
          border: 1px solid;
          border-radius: 10px;
          padding: 10px 20px;
          margin: 5px 0;
          font-family: 'Orbitron', monospace;
          font-weight: 400;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
          display: block;
          text-decoration: none;
          text-align: center;
        }

        .sub-gaming-button:hover {
          transform: translateX(5px);
          box-shadow: 0 0 15px currentColor;
          background: linear-gradient(135deg, rgba(50, 50, 80, 0.9), rgba(40, 40, 65, 0.9));
        }

        .portal-title {
          text-align: center;
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: 18px;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #ffffff;
          text-shadow: 0 0 10px currentColor;
        }

        .close-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 35;
        }
      `}</style>

      <nav className="bg-black p-4 flex justify-center items-center fixed w-full top-0 z-50">
        <div className="flex items-center space-x-2 relative">
          <a href="/" className="flex items-center group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
              <span className="text-black text-xl font-bold">⚡</span>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-2">
            <a href="/" className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium">HOME</a>
            <a href="/about" className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium">ABOUT</a>

            <button onClick={togglePortails} className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium whitespace-nowrap">
              PORTAILS DE CRÉATION
            </button>

            {isPortailsOpen && (
              <>
                <div className="close-overlay" onClick={() => setIsPortailsOpen(false)}></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-6 z-40">
                  <div className="portal-container">
                    <div className="portal-title">🚀 PORTAILS DE CRÉATION 🚀</div>
                    
                    <div className="flex flex-col items-center space-y-2 relative">
                      {Object.entries(menuItems).map(([key, value], index) => (
                        <div key={key} className="relative">
                          <button
                            onClick={() => setPortailType(portailType === key ? null : key)}
                            onMouseEnter={() => setHoveredItem(key)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className={`gaming-button ${portailType === key ? 'active' : ''}`}
                            style={{ 
                              color: value.color,
                              borderColor: value.color,
                              animationDelay: `${index * 0.1}s`
                            }}
                          >
                            {value.title}
                            {value.items.some(item => item.subItems) && (
                              <span className="ml-2 text-xs">▶</span>
                            )}
                          </button>

                          {portailType === key && (
                            <div className="sub-menu-container">
                              <div className="flex flex-col space-y-1">
                                {value.items.map((item, itemIndex) => (
                                  <div key={itemIndex} className="relative">
                                    {item.subItems ? (
                                      <button
                                        onClick={() => handleItemClick(item, itemIndex)}
                                        className="sub-gaming-button w-full"
                                        style={{ 
                                          color: value.color,
                                          borderColor: value.color,
                                          animationDelay: `${itemIndex * 0.05}s`
                                        }}
                                      >
                                        {item.name}
                                        <span className="ml-2 text-xs">▼</span>
                                      </button>
                                    ) : (
                                      <a
                                        href={item.path}
                                        className="sub-gaming-button"
                                        style={{ 
                                          color: value.color,
                                          borderColor: value.color,
                                          animationDelay: `${itemIndex * 0.05}s`
                                        }}
                                      >
                                        {item.name}
                                      </a>
                                    )}

                                    {selectedItem === itemIndex && item.subItems && (
                                      <div className="ml-4 mt-2 space-y-1">
                                        {item.subItems.map((subItem, subIndex) => (
                                          <a
                                            key={subIndex}
                                            href={subItem.path}
                                            className="sub-gaming-button block text-sm py-2 px-3"
                                            style={{ 
                                              color: value.color,
                                              borderColor: value.color,
                                              opacity: 0.8,
                                              animationDelay: `${subIndex * 0.03}s`
                                            }}
                                          >
                                            › {subItem.name}
                                          </a>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            <a href="/blog" className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium">BLOG</a>
            <a href="/contact" className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium">CONTACT</a>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden bg-white px-4 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium">
            MENU
          </button>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-black border-t border-white mt-4 p-4 flex flex-col space-y-2 md:hidden">
              <a href="/" className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium text-center" onClick={() => setIsMenuOpen(false)}>HOME</a>
              <a href="/about" className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium text-center" onClick={() => setIsMenuOpen(false)}>ABOUT</a>
              <button onClick={() => {togglePortails(); setIsMenuOpen(false);}} className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium">
                PORTAILS DE CRÉATION
              </button>
              <a href="/blog" className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium text-center" onClick={() => setIsMenuOpen(false)}>BLOG</a>
              <a href="/contact" className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium text-center" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
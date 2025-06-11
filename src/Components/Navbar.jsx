import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPortailsOpen, setIsPortailsOpen] = useState(false);
  const [portailType, setPortailType] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const togglePortails = () => setIsPortailsOpen(!isPortailsOpen);

  const menuItems = {
    narratif: {
      title: "LES UNIVERS DE FLAME",
      items: [
        { name: "Le héros à la Flamme Imaginaire", path: "/creation/univers-narratifs/heros-flamme" },
        { name: "La Fable du Héros et la Fée", path: "/creation/univers-narratifs/fable-heros-fee" },
        { name: "Vince de Belii", path: "/creation/univers-narratifs/vince-belii" }
      ]
    },
    labo: {
      title: "LABO DE FLAME",
      items: [
        { name: "UI/UX", path: "/creation/labo/ui-ux" },
        { name: "Présentation de projets CNAM", path: "/creation/labo/projets-cnam" },
        { name: "Prototypes de jeu", path: "/creation/labo/prototypes" },
        { name: "Démo Web", path: "/creation/labo/demo-web" }
      ]
    },
    studio: {
      title: "LE STUDIO DE FLAME",
      items: [
        { name: "Vidéos YouTube", path: "/creation/studio/videos" },
        { name: "Miniatures YouTube", path: "/creation/studio/miniatures" },
        { name: "Réels & shorts", path: "/creation/studio/reels-shorts" },
        { name: "Threads Twitter", path: "/creation/studio/threads" }
      ]
    },
    atelier: {
      title: "ATELIER DE FLAME",
      items: [
        { name: "Dessins traditionnels", path: "/creation/atelier/dessins" },
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
        @keyframes portalFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .portal-animate {
          animation: portalFadeIn 0.45s ease-out forwards;
        }

        @keyframes staggeredTileFadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tile {
          opacity: 0;
          animation: staggeredTileFadeIn 0.4s ease-out forwards;
        }

        .focus-transition {
          transition: all 0.3s ease;
          transform-origin: left;
        }
      `}</style>

      <nav className="bg-black p-4 flex justify-center items-center fixed w-full top-0 z-50">
        <div className="flex items-center space-x-2 relative">
          <Link to="/" className="flex items-center group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
              <span className="text-black text-xl font-bold">⚡</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium">HOME</Link>
            <Link to="/about" className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium">ABOUT</Link>

            <button onClick={togglePortails} className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium whitespace-nowrap">
              PORTAILS DE CRÉATION
            </button>

            {isPortailsOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 flex space-x-8 portal-animate z-40">
                {/* Boutons principaux centrés */}
                <div className="flex flex-col space-y-2 items-start">
                  {Object.entries(menuItems).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setPortailType(portailType === key ? null : key)}
                      className={`px-4 py-2 rounded-full text-sm font-medium uppercase transition-all whitespace-nowrap border focus-transition ${
                        portailType === key ? 'bg-white text-black scale-105 shadow-md' : 'bg-black text-white border-white hover:bg-white hover:text-black'
                      }`}
                    >
                      {value.title}
                    </button>
                  ))}
                </div>

                {/* Sous-menus */}
                {portailType && (
                  <div className="flex flex-col gap-2">
                    {menuItems[portailType].items.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        className="tile bg-white text-black text-center px-6 py-3 rounded-3xl border border-black font-medium hover:bg-black hover:text-white transition-all duration-300 shadow-md"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Link to="/blog" className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium">BLOG</Link>
            <Link to="/contact" className="bg-white px-6 py-2 rounded-full text-black hover:bg-black hover:text-white border border-white transition-all font-medium">CONTACT</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

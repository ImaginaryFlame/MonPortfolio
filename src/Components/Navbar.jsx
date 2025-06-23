import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from './ui/LanguageSelector';
import { useLanguage } from '../hooks/useLanguage.jsx';

const Navbar = ({ theme }) => {
  const { t } = useLanguage();
  const [isPortailsOpen, setIsPortailsOpen] = useState(false);
  const [portailType, setPortailType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const timeoutRef = useRef(null);
  const navbarRef = useRef(null);

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

  // Gestionnaire de clic en dehors de la navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        if (isPortailsOpen) {
          setIsAnimating(true);
          setTimeout(() => {
            setSelectedItem(null);
          }, 50);
          setTimeout(() => {
            setPortailType(null);
          }, 100);
          setTimeout(() => {
            setIsPortailsOpen(false);
            setIsAnimating(false);
          }, 200);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPortailsOpen]);

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
      }, 150);
    } else {
      if (portailType) {
        setIsAnimating(true);
        setTimeout(() => {
          setPortailType(key);
          setSelectedItem(null);
          setIsAnimating(false);
        }, 150);
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
        }, 100);
      } else {
        if (selectedItem !== null) {
          setIsAnimating(true);
          setTimeout(() => {
            setSelectedItem(index);
            setIsAnimating(false);
          }, 100);
        } else {
          setSelectedItem(index);
        }
      }
    }
  };

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setSelectedItem(index);
    setIsHovering(true);
    setAnimationKey(prev => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    timeoutRef.current = setTimeout(() => {
      if (!isHovering) {
        setSelectedItem(null);
      }
    }, 700);
  };

  const menuItems = {
    narratif: {
      title: t.navbar.narrativeUniverses,
      items: [
        { 
          name: t.navbar.menus.narratif.flammeImaginaire.title, 
          path: "/creation/univers-narratifs/flamme-imaginaire",
          subItems: [
            { name: t.navbar.menus.narratif.flammeImaginaire.subItems.personnages, path: "/creation/univers-narratifs/flamme-imaginaire/personnages" },
            { name: t.navbar.menus.narratif.flammeImaginaire.subItems.regionsLieux, path: "/creation/univers-narratifs/flamme-imaginaire/regions-lieux" },
            { name: t.navbar.menus.narratif.flammeImaginaire.subItems.objets, path: "/creation/univers-narratifs/flamme-imaginaire/objets" },
            { name: t.navbar.menus.narratif.flammeImaginaire.subItems.concepts, path: "/creation/univers-narratifs/flamme-imaginaire/concepts" },
            { name: t.navbar.menus.narratif.flammeImaginaire.subItems.factions, path: "/creation/univers-narratifs/flamme-imaginaire/factions" },
            { name: t.navbar.menus.narratif.flammeImaginaire.subItems.creatures, path: "/creation/univers-narratifs/flamme-imaginaire/creatures" },
            { name: t.navbar.menus.narratif.flammeImaginaire.subItems.evenements, path: "/creation/univers-narratifs/flamme-imaginaire/evenements" },
            { name: t.navbar.menus.narratif.flammeImaginaire.subItems.dogmes, path: "/creation/univers-narratifs/flamme-imaginaire/dogmes" },
            { name: t.navbar.menus.narratif.flammeImaginaire.subItems.traditions, path: "/creation/univers-narratifs/flamme-imaginaire/traditions" },
            { name: t.navbar.menus.narratif.flammeImaginaire.subItems.celebrations, path: "/creation/univers-narratifs/flamme-imaginaire/celebrations" }
          ]
        },
        { 
          name: t.navbar.menus.narratif.herosFee.title, 
          path: "/creation/univers-narratifs/fable-heros-fee",
          subItems: [
            { name: t.navbar.menus.narratif.herosFee.subItems.personnages, path: "/creation/univers-narratifs/fable-heros-fee/personnages" },
            { name: t.navbar.menus.narratif.herosFee.subItems.regionsLieux, path: "/creation/univers-narratifs/fable-heros-fee/regions-lieux" },
            { name: t.navbar.menus.narratif.herosFee.subItems.objets, path: "/creation/univers-narratifs/fable-heros-fee/objets" },
            { name: t.navbar.menus.narratif.herosFee.subItems.factions, path: "/creation/univers-narratifs/fable-heros-fee/factions" },
            { name: t.navbar.menus.narratif.herosFee.subItems.races, path: "/creation/univers-narratifs/fable-heros-fee/races" },
            { name: t.navbar.menus.narratif.herosFee.subItems.evenementsHistoriques, path: "/creation/univers-narratifs/fable-heros-fee/evenements-historiques" },
            { name: t.navbar.menus.narratif.herosFee.subItems.bestiaires, path: "/creation/univers-narratifs/fable-heros-fee/bestiaires" },
            { name: t.navbar.menus.narratif.herosFee.subItems.celebrationsFetes, path: "/creation/univers-narratifs/fable-heros-fee/celebrations-fetes" },
            { name: t.navbar.menus.narratif.herosFee.subItems.cosmogonies, path: "/creation/univers-narratifs/fable-heros-fee/cosmogonies" },
            { name: t.navbar.menus.narratif.herosFee.subItems.moodboard, path: "/creation/univers-narratifs/fable-heros-fee/moodboard" }
          ]
        },
        { 
          name: t.navbar.menus.narratif.vinceBelii.title, 
          path: "/creation/univers-narratifs/vince-belii",
          subItems: [
            { name: t.navbar.menus.narratif.vinceBelii.subItems.personnages, path: "/creation/univers-narratifs/vince-belii/personnages" },
            { name: t.navbar.menus.narratif.vinceBelii.subItems.familles, path: "/creation/univers-narratifs/vince-belii/familles" },
            { name: t.navbar.menus.narratif.vinceBelii.subItems.lieux, path: "/creation/univers-narratifs/vince-belii/lieux" },
            { name: t.navbar.menus.narratif.vinceBelii.subItems.moodboard, path: "/creation/univers-narratifs/vince-belii/moodboard" }
          ]
        },
        { 
          name: t.navbar.menus.narratif.pandemie.title, 
          path: "/creation/univers-narratifs/pandemie-lara",
          subItems: [
            { name: t.navbar.menus.narratif.pandemie.subItems.personnages, path: "/creation/univers-narratifs/pandemie-lara/personnages" },
            { name: t.navbar.menus.narratif.pandemie.subItems.regionsLieux, path: "/creation/univers-narratifs/pandemie-lara/regions-lieux" },
            { name: t.navbar.menus.narratif.pandemie.subItems.objets, path: "/creation/univers-narratifs/pandemie-lara/objets" },
            { name: t.navbar.menus.narratif.pandemie.subItems.factions, path: "/creation/univers-narratifs/pandemie-lara/factions" },
            { name: t.navbar.menus.narratif.pandemie.subItems.bestiaires, path: "/creation/univers-narratifs/pandemie-lara/bestiaires" },
            { name: t.navbar.menus.narratif.pandemie.subItems.moodboard, path: "/creation/univers-narratifs/pandemie-lara/moodboard" }
          ]
        }
      ]
    },
    labo: {
      title: t.navbar.flameLab,
      items: [
        { 
          name: t.navbar.menus.labo.design.title, 
          path: "/creation/labo/design",
          subItems: [
            { name: t.navbar.menus.labo.design.subItems.uiUx, path: "/creation/labo/design/ui-ux" },
            { name: t.navbar.menus.labo.design.subItems.prototypes, path: "/creation/labo/design/prototypes" }
          ]
        },
        { 
          name: t.navbar.menus.labo.dev.title, 
          path: "/creation/labo/dev",
          subItems: [
            { name: t.navbar.menus.labo.dev.subItems.demoWeb, path: "/creation/labo/dev/demo-web" },
            { name: t.navbar.menus.labo.dev.subItems.prototypesJeu, path: "/creation/labo/dev/prototypes-jeu" }
          ]
        },
        { 
          name: t.navbar.menus.labo.academic.title, 
          path: "/creation/labo/academique",
          subItems: [
            { name: t.navbar.menus.labo.academic.subItems.presentationsCnam, path: "/creation/labo/academique/presentations-cnam" }
          ]
        }
      ]
    },
    studio: {
      title: t.navbar.flameStudio,
      items: [
        { 
          name: t.navbar.menus.studio.video.title, 
          path: "/creation/studio/video",
          subItems: [
            { name: t.navbar.menus.studio.video.subItems.youtube, path: "/creation/studio/video/videos-youtube" },
            { name: t.navbar.menus.studio.video.subItems.reels, path: "/creation/studio/video/reels-shorts" },
            { name: t.navbar.menus.studio.video.subItems.miniatures, path: "/creation/studio/video/miniatures" }
          ]
        },
        { 
          name: t.navbar.menus.studio.social.title, 
          path: "/creation/studio/social",
          subItems: [
            { name: t.navbar.menus.studio.social.subItems.twitter, path: "/creation/studio/social/threads-twitter" },
          ]
        },
        { 
          name: t.navbar.menus.studio.branding.title, 
          path: "/creation/studio/branding",
          subItems: [
            { name: t.navbar.menus.studio.branding.subItems.identite, path: "/creation/studio/branding/identite-visuelle" },
            { name: t.navbar.menus.studio.branding.subItems.templates, path: "/creation/studio/branding/templates" }
          ]
        }
      ]
    },
    atelier: {
      title: t.navbar.flameAtelier,
      items: [
        { 
          name: t.navbar.menus.atelier.traditionnel.title, 
          path: "/creation/atelier/traditionnel",
          subItems: [
            { name: t.navbar.menus.atelier.traditionnel.subItems.illustrations, path: "/creation/atelier/traditionnel/illustrations-finalisees" },
            { name: t.navbar.menus.atelier.traditionnel.subItems.etudes, path: "/creation/atelier/traditionnel/etudes-progression" },
            { name: t.navbar.menus.atelier.traditionnel.subItems.croquis, path: "/creation/atelier/traditionnel/croquis-roughs" }
          ]
        },
        { 
          name: t.navbar.menus.atelier.numerique.title, 
          path: "/creation/atelier/numerique",
          subItems: [
            { name: t.navbar.menus.atelier.numerique.subItems.conceptArt, path: "/creation/atelier/numerique/concept-art" },
            { name: t.navbar.menus.atelier.numerique.subItems.illustrations, path: "/creation/atelier/numerique/illustrations-digitales" },
            { name: t.navbar.menus.atelier.numerique.subItems.animations2d, path: "/creation/atelier/numerique/animations-2d" }
          ]
        },
        { 
          name: t.navbar.menus.atelier.modelisation3d.title, 
          path: "/creation/atelier/3d",
          subItems: [
            { name: t.navbar.menus.atelier.modelisation3d.subItems.modeles, path: "/creation/atelier/3d/modeles" },
            { name: t.navbar.menus.atelier.modelisation3d.subItems.textures, path: "/creation/atelier/3d/textures-materiaux" },
            { name: t.navbar.menus.atelier.modelisation3d.subItems.animations3d, path: "/creation/atelier/3d/animations-3d" }
          ]
        },
        { 
          name: t.navbar.menus.atelier.wip.title, 
          path: "/creation/atelier/wip",
          subItems: [
            { name: t.navbar.menus.atelier.wip.subItems.projets, path: "/creation/atelier/wip/projets-cours" },
            { name: t.navbar.menus.atelier.wip.subItems.experimentations, path: "/creation/atelier/wip/experimentations" }
          ]
        }
      ]
    }
  };

  return (
    <div 
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >

      
      <div className="flex justify-center pt-4 px-4">
        <nav className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 p-2 rounded-full shadow-2xl">
          {/* Logo avec animation améliorée */}
          <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center transform transition-all duration-500 ease-out hover:scale-110 hover:rotate-12 hover:shadow-lg overflow-hidden">
            <img 
              src="/assets/img/20220726_002242.webp" 
              alt="Logo" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Navigation Links avec animations améliorées */}
          <div className="flex items-center space-x-1">
            <Link 
              to="/" 
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full hover:from-orange-500 hover:to-red-600 transition-all duration-300 ease-out hover:transform hover:scale-105 hover:shadow-lg text-sm uppercase tracking-wide shadow-lg"
            >
              {t.navbar.home}
            </Link>
            
            <Link 
              to="/about" 
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full hover:from-orange-500 hover:to-red-600 transition-all duration-300 ease-out hover:transform hover:scale-105 hover:shadow-lg text-sm uppercase tracking-wide shadow-lg"
            >
              {t.navbar.about}
            </Link>

            <div className="relative">
              <button
                onClick={togglePortails}
                className={`px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full transition-all duration-300 ease-out hover:from-orange-500 hover:to-red-600 hover:transform hover:scale-105 hover:shadow-lg text-sm uppercase tracking-wide shadow-lg ${
                  isPortailsOpen ? 'scale-105 shadow-xl from-orange-500 to-red-600' : ''
                }`}
              >
                {t.navbar.portals}
              </button>

              {/* Menu principal avec animations améliorées */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 top-full mt-4 flex space-x-8 z-40 ${
                  isPortailsOpen 
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                    : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
                } transition-all duration-300 ease-out`}
              >
                {/* Boutons principaux */}
                <div className="flex flex-col space-y-3 items-start">
                  {Object.entries(menuItems).map(([key, value], index) => (
                    <button
                      key={key}
                      onClick={() => handlePortailChange(key)}
                      className={`px-5 py-3 rounded-lg text-sm font-medium uppercase whitespace-nowrap border transition-all duration-300 ease-out ${
                        portailType === key 
                          ? 'bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white scale-105 shadow-xl border-orange-300' 
                          : 'bg-gradient-to-r from-slate-800/90 to-blue-900/90 text-white hover:from-orange-600/90 hover:to-red-600/90 border-slate-600'
                      } hover:transform hover:-translate-y-1 hover:shadow-lg`}
                    >
                      {value.title}
                    </button>
                  ))}
                </div>

                {/* Sous-menus */}
                {portailType && !isAnimating && (
                  <div className="flex space-x-6"
                       style={{
                         animation: 'fadeIn 0.3s ease-out forwards',
                         opacity: 0
                       }}>
                    <div className="flex flex-col gap-3 min-w-[200px]">
                      {menuItems[portailType].items.map((item, index) => (
                        <div key={index} className="relative">
                          {item.subItems ? (
                            <Link
                              to={item.path}
                              className="text-left px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-out shadow-lg w-full border bg-gradient-to-r from-orange-500/95 to-red-600/95 text-white hover:from-blue-700/95 hover:to-blue-500/95 border-orange-400 hover:transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-between"
                              onMouseEnter={() => handleMouseEnter(index)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <span className="text-sm font-semibold">{item.name}</span>
                              <span className={`transition-transform duration-300 ease-out ${selectedItem === index ? 'rotate-90' : ''}`}>▶</span>
                            </Link>
                          ) : (
                            <Link
                              to={item.path}
                              className="bg-gradient-to-r from-orange-500/95 to-red-600/95 text-white text-left px-6 py-3 rounded-lg font-semibold hover:from-blue-700/95 hover:to-blue-500/95 transition-all duration-300 ease-out shadow-lg block w-full text-sm border border-orange-400 hover:transform hover:-translate-y-1 hover:shadow-lg"
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Sous-sous-menus */}
                    {selectedItem !== null && menuItems[portailType].items[selectedItem]?.subItems && (
                      <div 
                        className="flex flex-col gap-2 min-w-[200px] opacity-100 translate-y-0 scale-100 transition-all duration-200 ease-out"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {menuItems[portailType].items[selectedItem].subItems.map((subItem, subIndex) => (
                          <Link
                            key={`${animationKey}-${subIndex}`}
                            to={subItem.path}
                            className="bg-gradient-to-r from-yellow-400/95 to-orange-500/95 text-gray-900 text-left px-4 py-3 rounded-lg font-semibold hover:from-blue-400/95 hover:to-blue-600/95 hover:text-white shadow-md text-sm border border-yellow-300 hover:transform hover:-translate-y-1 hover:shadow-lg opacity-0"
                            style={{ 
                              animation: `fadeInUp 0.2s ease-out ${subIndex * 30}ms forwards`
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <Link 
              to="/contact" 
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full hover:from-orange-500 hover:to-red-600 transition-all duration-300 ease-out hover:transform hover:scale-105 hover:shadow-lg text-sm uppercase tracking-wide shadow-lg"
            >
              {t.navbar.contact}
            </Link>

            <div className="flex items-center">
              <LanguageSelector />
            </div>
          </div>
        </nav>

        {/* Overlay semi-transparent */}
        {isPortailsOpen && (
          <div 
            className="fixed inset-0 bg-black/20 transition-opacity duration-300 ease-out z-30"
            onClick={togglePortails}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
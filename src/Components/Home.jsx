import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import Contact from './Contact';
import Projects from './Projects';

// Configuration des thèmes avec leurs couleurs adaptées
const themes = [
  {
    background: '/assets/img/F7xrYybWcAEztt2.webp',
    name: 'moonscape',
    colors: {
      primary: 'purple-500',
      secondary: 'blue-400',
      accent: 'indigo-300',
      text: 'purple-300',
      button: 'purple-600',
      buttonHover: 'purple-700',
      shadow: 'purple-500/25'
    }
  },
  {
    background: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2125&q=80',
    name: 'cyberpunk',
    colors: {
      primary: 'cyan-500',
      secondary: 'teal-400',
      accent: 'cyan-300',
      text: 'cyan-300',
      button: 'cyan-600',
      buttonHover: 'cyan-700',
      shadow: 'cyan-500/25'
    }
  },
  {
    background: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    name: 'sunset',
    colors: {
      primary: 'orange-500',
      secondary: 'red-400',
      accent: 'yellow-300',
      text: 'orange-300',
      button: 'orange-600',
      buttonHover: 'orange-700',
      shadow: 'orange-500/25'
    }
  },
  {
    background: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    name: 'forest',
    colors: {
      primary: 'green-500',
      secondary: 'emerald-400',
      accent: 'lime-300',
      text: 'green-300',
      button: 'green-600',
      buttonHover: 'green-700',
      shadow: 'green-500/25'
    }
  }
];

// Context pour partager le thème
export const ThemeContext = React.createContext();


// Nouvelle section de galerie inspirée de micro.so et menuxl.fr
const ProjectGallery = ({ theme }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [randomProjects, setRandomProjects] = useState([]);

  // Tous les projets disponibles
  const allProjects = [
    {
      id: 1,
      title: "Héros à la Flamme Imaginaire - Chapitre 1",
      category: "Héros à la Flamme",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "story",
      section: "flame-hero"
    },
    {
      id: 2,
      title: "La Fée des Rivières",
      category: "Fable du Héros et la Fée",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "story",
      section: "fairy-tale"
    },
    {
      id: 3,
      title: "Concept Art - Dragon",
      category: "Design & Art",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "artwork",
      section: "subItems"
    },
    {
      id: 4,
      title: "Interface Gaming",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "design",
      section: "subItems"
    },
    {
      id: 5,
      title: "Héros à la Flamme - Combat Final",
      category: "Héros à la Flamme",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "story",
      section: "flame-hero"
    },
    {
      id: 6,
      title: "La Forêt Enchantée",
      category: "Fable du Héros et la Fée",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "story",
      section: "fairy-tale"
    },
    {
      id: 7,
      title: "Character Design - Mage",
      category: "Character Design",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "character",
      section: "subItems"
    },
    {
      id: 8,
      title: "Animation 2D",
      category: "Animation",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "animation",
      section: "subItems"
    }
  ];

  // Fonction pour mélanger un tableau
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Sélectionner aléatoirement 10 projets
  useEffect(() => {
    const shuffledProjects = shuffleArray(allProjects);
    setRandomProjects(shuffledProjects.slice(0, 10));
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleProjectClick = (project) => {
    // Ici vous pouvez gérer la navigation selon le type de projet
    switch (project.section) {
      case 'flame-hero':
        console.log('Navigation vers Héros à la Flamme Imaginaire:', project.title);
        break;
      case 'fairy-tale':
        console.log('Navigation vers La Fable du Héros et la Fée:', project.title);
        break;
      case 'subItems':
        console.log('Navigation vers fichier subItems:', project.title);
        break;
      default:
        console.log('Projet sélectionné:', project.title);
    }
  };

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      {/* Background avec overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${theme.background}')` }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="relative z-10">
        {/* Titre de section */}
        <div className="max-w-7xl mx-auto px-8 mb-12">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-2xl">
              Galerie Interactive
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
              Explorez mes créations - histoires, designs et projets créatifs. 
              Faites défiler horizontalement pour découvrir l'univers complet.
            </p>
          </div>
        </div>

        {/* Galerie défilante */}
        <div className="relative">
          {/* Indicateur de défilement gauche */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none" />
          
          {/* Indicateur de défilement droite */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none" />

          {/* Container de la galerie */}
          <div 
            ref={scrollRef}
            className="flex gap-8 px-8 pb-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {randomProjects.map((project, index) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-80 group cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                {/* Card du projet */}
                <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-900 shadow-2xl 
                               transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25">
                  
                  {/* Image */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 
                               group-hover:scale-110"
                  />
                  
                  {/* Overlay avec gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge de catégorie */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full 
                                   text-white text-sm font-medium border border-purple-400/30">
                      {project.category}
                    </span>
                  </div>

                  {/* Icône selon le type */}
                  <div className="absolute top-4 right-4 opacity-70">
                    {project.type === 'story' && (
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    )}
                    {project.type !== 'story' && (
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Contenu en bas */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 
                                   transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    {/* Flèche d'action */}
                    <div className="flex items-center justify-between">
                      <div className="text-gray-300 text-sm">
                        Cliquez pour explorer
                      </div>
                      <div className="transform transition-transform duration-300 group-hover:translate-x-1">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Effet de hover */}
                  <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 
                                 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Instructions de défilement */}
          <div className="text-center mt-8">
            <p className="text-gray-300 text-sm flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Faites glisser pour explorer plus de projets
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
         onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
           onClick={e => e.stopPropagation()}>
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3
                       hover:bg-white transition-all duration-200 z-10 shadow-lg
                       hover:scale-110 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="h-[50vh] overflow-hidden rounded-t-2xl">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        <div className="p-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{project.title}</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {project.content}
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {project.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 
                         text-purple-800 rounded-full text-sm font-semibold
                         border border-purple-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Détails du projet</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ce projet représente une exploration créative unique, mêlant innovation technique et 
              vision artistique. Chaque élément a été soigneusement pensé pour créer une expérience 
              immersive et mémorable.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 
                               text-white rounded-lg font-semibold transition-all duration-300 
                               hover:from-purple-700 hover:to-blue-700 hover:shadow-lg
                               transform hover:scale-105 active:scale-95">
                Voir le projet complet
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg 
                               font-semibold transition-all duration-300 
                               hover:border-gray-400 hover:bg-gray-50">
                Code source
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Banner = ({ theme }) => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Web Développeur", "Web Designer", "UI/UX Designer", "Youtubeur", "Streamer", "Game Developer", "Prince d'Angola", "Héros à mi-temps", "Écrivain", "Scénariste", "Tiktoker", "Twittos", "Animateur 2D/3D"];
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
    
    setText(updatedText);
    
    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }
    
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, delta, loopNum, isDeleting]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url('${theme.background}')` }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        <div className="mb-8">
          <span className="text-xl font-medium drop-shadow-lg transition-colors duration-500" style={{ color: '#E0E0E0', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            BIENVENUE DANS MON UNIVERS !
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          Salut, je suis
          <br />
          <span className={`text-${theme.colors.secondary} border-r-2 border-${theme.colors.secondary} animate-pulse drop-shadow-lg transition-colors duration-500`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            {text}
          </span>
        </h1>
        
        <p className="text-xl max-w-3xl mx-auto mb-12 leading-relaxed text-gray-200 drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          Créateur passionné, je donne vie à mes idées à travers le code et le dessin. Explorez mon univers créatif et découvrez mes projets !!
        </p>
        
        <button 
          onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
          className="group flex flex-col items-center gap-2 px-12 py-2 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 
                   text-white rounded-full font-semibold text-lg transition-all duration-300 
                   hover:from-violet-700 hover:via-purple-700 hover:to-blue-600
                   hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105
                   drop-shadow-lg mx-auto"
        >
          <span>EXPLOREZ MON MONDE</span>
          <span className="flex justify-center">
            {/* Flèche minimaliste blanche, style V épais, non remplie */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" 
                 className="transform transition-all duration-300 group-hover:scale-150 animate-bounce">
              <polyline points="8,14 18,26 28,14" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group
                 transform transition-all duration-500 hover:scale-105"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 
                   group-hover:scale-110"
      />
      
      <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 
                      ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center 
                        text-white p-6 text-center">
          <h3 className="text-2xl font-bold mb-3 transform transition-transform duration-300
                         translate-y-4 group-hover:translate-y-0">
            {project.title}
          </h3>
          <p className="text-sm opacity-90 mb-4 transform transition-all duration-300 delay-75
                        translate-y-4 group-hover:translate-y-0">
            {project.content.substring(0, 100)}...
          </p>
          <div className="flex flex-wrap gap-2 justify-center transform transition-all duration-300 delay-150
                          translate-y-4 group-hover:translate-y-0">
            {project.tags.slice(0, 2).map((tag, tagIndex) => (
              <span 
                key={tagIndex}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full 
                           text-xs font-medium border border-white/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute top-4 right-4 transform transition-all duration-300
                        opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    setCurrentTheme(themes[0]);
  }, []);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className="w-full">
        <Banner theme={currentTheme} />
        <ProjectGallery theme={currentTheme} />
        
        {/* Section Projects avec les trois onglets */}
        <Projects />

        {/* Section de contact avec fond sombre et effet de flou */}
        {/* <div className="w-full bg-black/60 backdrop-blur-sm py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-8 text-center">

            <h2 className="text-4xl font-bold text-white mb-8 drop-shadow-2xl">
              Intéressé par une collaboration ?
            </h2>

            <p className="text-xl text-gray-200 mb-10 drop-shadow-lg max-w-2xl mx-auto">
              N'hésitez pas à me contacter pour discuter de vos projets créatifs
            </p>

            <button 
              onClick={() => setShowContact(true)}
              className={`px-10 py-4 bg-${currentTheme.colors.button} text-white rounded-xl 
                        font-semibold text-lg transition-all duration-300 
                        hover:bg-${currentTheme.colors.buttonHover} hover:shadow-xl 
                        hover:scale-105 drop-shadow-lg`}
            >
              Me Contacter
            </button>
          </div>
        </div> */}

        <ProjectModal 
          project={selectedProject}
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
        />

        {showContact && <Contact onClose={() => setShowContact(false)} />}
        
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default Home;
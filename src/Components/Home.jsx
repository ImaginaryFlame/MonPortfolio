import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import Projects from './Projects';
import { fetchProjects, urlFor } from '../config/sanityClient';
import { useLanguage } from '../hooks/useLanguage.jsx';

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

// Section Compétences
const SkillsSection = ({ theme }) => {
  const { t } = useLanguage();
  
  const skills = [
    {
      category: t('skills.categories.development'),
      icon: "💻",
      items: [
        { name: "JavaScript", level: 45 },
        { name: "React", level: 40 },
        { name: "Java", level: 35 },
        { name: "C++", level: 30 },
        { name: "C#", level: 25 }
      ]
    },
    {
      category: t('skills.categories.design'),
      icon: "🎨",
      items: [
        { name: "Blender", level: 40 },
        { name: "Photoshop", level: 50 },
        { name: "After Effects", level: 35 },
        { name: "Clip Studio Paint", level: 45 },
        { name: "Maya", level: 25 }
      ]
    },
    {
      category: t('skills.categories.content'),
      icon: "📹",
      items: [
        { name: "DaVinci Resolve", level: 40 },
        { name: "Filmora", level: 55 },
        { name: "Streaming", level: 35 },
        { name: "Community Management", level: 50 },
        { name: "Écriture", level: 60 }
      ]
    },
    {
      category: t('skills.categories.tools'),
      icon: "⚙️",
      items: [
        { name: "Git", level: 30 },
        { name: "Figma", level: 35 },
        { name: "Obsidian", level: 55 },
        { name: "Final Draft", level: 45 },
        { name: "Sanity CMS", level: 40 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background avec overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${theme.background}')` }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Titre de section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-2xl">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
            {t('skills.description')}
          </p>
        </div>

        {/* Grille des compétences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillCategory, index) => (
            <div
              key={skillCategory.category}
              className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 
                         hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Header de catégorie */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{skillCategory.icon}</div>
                <h3 className="text-xl font-bold text-white">{skillCategory.category}</h3>
              </div>

              {/* Liste des compétences */}
              <div className="space-y-4">
                {skillCategory.items.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                      <span className="text-purple-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${index * 0.2 + skillIndex * 0.1}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats générales */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "1+", label: t('skills.stats.experience') },
            { number: "3+", label: t('skills.stats.projects') },
            { number: "4", label: t('skills.stats.universes') },
            { number: "∞", label: t('skills.stats.passion') }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Nouvelle section de galerie avec vrais projets Sanity
const ProjectGallery = ({ theme }) => {
  const { t } = useLanguage();
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [randomProjects, setRandomProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour mélanger un tableau
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Récupérer les projets depuis Sanity
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projects = await fetchProjects();
        
        // Mélanger et prendre 7 projets aléatoires
        const shuffledProjects = shuffleArray(projects);
        setRandomProjects(shuffledProjects.slice(0, 7));
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        setRandomProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
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
    console.log('Projet sélectionné:', project.title);
    // Ici vous pouvez ajouter la navigation vers le projet
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'arts':
        return 'from-purple-600/80 to-pink-600/80';
      case 'dev':
        return 'from-blue-600/80 to-cyan-600/80';
      case 'video':
        return 'from-red-600/80 to-orange-600/80';
      default:
        return 'from-gray-600/80 to-gray-700/80';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'arts':
        return t('gallery.categories.arts');
      case 'dev':
        return t('gallery.categories.dev');
      case 'video':
        return t('gallery.categories.video');
      default:
        return category;
    }
  };

  if (loading) {
    return (
      <section id="gallery" className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('${theme.background}')` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        <div className="relative z-10 flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </section>
    );
  }

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
              {t('gallery.title')}
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
              {t('gallery.description')}
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
                key={project._id}
                className="flex-shrink-0 w-80 group cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                {/* Card du projet */}
                <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-900 shadow-2xl 
                               transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25">
                  
                  {/* Image */}
                  {project.image ? (
                    <img 
                      src={urlFor(project.image).width(400).height(400).url()} 
                      alt={project.title?.fr || project.title || 'Projet'}
                      className="w-full h-full object-cover transition-transform duration-700 
                                 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 
                                    flex items-center justify-center">
                      <div className="text-white text-6xl opacity-50">🎨</div>
                    </div>
                  )}
                  
                  {/* Overlay avec gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge de catégorie */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(project.category)} 
                                   backdrop-blur-sm rounded-full text-white text-sm font-medium 
                                   border border-white/20`}>
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>

                  {/* Icône selon le type */}
                  <div className="absolute top-4 right-4 opacity-70">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Contenu en bas */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 
                                   transition-colors duration-300">
                      {project.title?.fr || project.title || 'Projet sans titre'}
                    </h3>
                    
                    {project.description && (
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {typeof project.description === 'object' 
                          ? project.description.fr || project.description.en || ''
                          : project.description.substring(0, 100) + '...'
                        }
                      </p>
                    )}
                    
                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full 
                                       text-xs text-gray-300 border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Flèche d'action */}
                    <div className="flex items-center justify-between">
                      <div className="text-gray-300 text-sm">
                        {t('gallery.clickToExplore')}
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
              {t('gallery.scrollInstructions')}
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





const Banner = ({ theme }) => {
  const { t } = useLanguage();
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = t('banner.roles');
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
          className="absolute inset-0 bg-cover transition-all duration-1000"
          style={{ 
            backgroundImage: `url('${theme.background}')`,
            backgroundPosition: 'center 20%'
          }}
        ></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
              <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
          <div className="mb-8">
           <span className="text-xl font-medium drop-shadow-lg transition-colors duration-500" style={{ color: '#E0E0E0', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
             {t('banner.welcome')}
           </span>
         </div>
         
         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
           {t('banner.greeting')}
           <br />
           <span className={`text-${theme.colors.secondary} border-r-2 border-${theme.colors.secondary} animate-pulse drop-shadow-lg transition-colors duration-500`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
             {text}
           </span>
         </h1>
         
         <p className="text-xl max-w-3xl mx-auto mb-12 leading-relaxed text-gray-200 drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
           {t('banner.description')}
         </p>
         
         <button 
           onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
           className="group flex flex-col items-center gap-2 px-12 py-2 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 
                    text-white rounded-full font-semibold text-lg transition-all duration-300 
                    hover:from-violet-700 hover:via-purple-700 hover:to-blue-600
                    hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105
                    drop-shadow-lg mx-auto"
         >
           <span>{t('banner.cta')}</span>
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

const Home = () => {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  useEffect(() => {
    setCurrentTheme(themes[0]);
  }, []);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className="w-full">
        <Banner theme={currentTheme} />
        <ProjectGallery theme={currentTheme} />
        <SkillsSection theme={currentTheme} />
        
        {/* Section Projects avec les trois onglets */}
        <Projects />

        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default Home;
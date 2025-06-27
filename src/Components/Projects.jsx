import { useRef, useEffect, useState } from 'react';
import { 
  fetchTags,
  urlFor 
} from '../config/sanityClient';
import { useLanguage } from '../hooks/useLanguage.jsx';

const Projects = ({ projects = [], loading = false, error = null }) => {
  const { t } = useLanguage();
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState('all');
  const [tags, setTags] = useState([]);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [selectedTagIndex, setSelectedTagIndex] = useState(null);
  const [isTagHovering, setIsTagHovering] = useState(false);
  const burgerMenuRef = useRef(null);
  const tagTimeoutRef = useRef(null);

  // CATÉGORIES PRINCIPALES
  const mainCategories = [
    { id: 'arts', name: 'Arts Visuels & Narratifs', color: '#EC4899', categoryValue: 'arts-visuels-narratifs' },
    { id: 'dev', name: 'Développement & Tech', color: '#3B82F6', categoryValue: 'developpement-tech' },
    { id: 'video', name: 'Vidéaste', color: '#EF4444', categoryValue: 'videaste' },
    { id: 'game', name: 'Game Development', color: '#10B981', categoryValue: 'game-development' },
    { id: 'web', name: 'Web & Digital', color: '#14B8A6', categoryValue: 'web-digital' }
  ];

  // Mapping des catégories vers les types de tags
  const categoryToTagTypeMapping = {
    'arts-visuels-narratifs': 'projets-arts',
    'developpement-tech': 'projets-dev',
    'videaste': 'projets-video', 
    'game-development': 'projets-game',
    'web-digital': 'projets-web'
  };

  // Fonction pour récupérer les tags des projets
  const loadTags = async () => {
    try {
      const allTags = await fetchTags();
      const projectTagTypes = ['projets-arts', 'projets-dev', 'projets-video', 'projets-game', 'projets-web'];
      const projectTags = allTags.filter(tag => projectTagTypes.includes(tag.category));
      setTags(projectTags);
    } catch (error) {
      console.error('Erreur lors de la récupération des tags:', error);
    }
  };

  // Mettre à jour les projets quand les props changent
  useEffect(() => {
    if (projects && projects.length > 0) {
      setAllProjects(projects);
      setFilteredProjects(projects);
    }
  }, [projects]);

  // Charger seulement les tags au montage
  useEffect(() => {
    loadTags();
  }, []);

  // Fermer le burger menu au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (burgerMenuRef.current && !burgerMenuRef.current.contains(event.target)) {
        setIsBurgerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (categoryId) => {
    const wasActiveCategory = activeCategory === categoryId;
    
    setActiveCategory(categoryId);
    setActiveTag('all');

    if (categoryId === 'all') {
      setFilteredProjects(allProjects);
      setIsBurgerOpen(false);
    } else {
      const category = mainCategories.find(cat => cat.id === categoryId);
      if (category) {
        const filtered = allProjects.filter(project => 
          project.category === category.categoryValue
        );
        setFilteredProjects(filtered);
        
        if (wasActiveCategory) {
          setIsBurgerOpen(!isBurgerOpen);
        } else {
          setIsBurgerOpen(true);
        }
      }
    }
  };

  const handleTagSelect = (tagId) => {
    setActiveTag(tagId);

    if (tagId === 'all') {
      if (activeCategory !== 'all') {
        handleCategorySelect(activeCategory);
      } else {
        setFilteredProjects(allProjects);
      }
    } else {
      const filtered = allProjects.filter(project => 
        project.tags && project.tags.some(tag => tag && tag._id === tagId)
      );
      setFilteredProjects(filtered);
    }
  };

  const getTagsForActiveCategory = () => {
    if (activeCategory === 'all') return tags;
    
    const category = mainCategories.find(cat => cat.id === activeCategory);
    if (!category) return [];
    
    const tagType = categoryToTagTypeMapping[category.categoryValue];
    return tags.filter(tag => tag.category === tagType);
  };

  const handleBurgerTagSelect = (tagId) => {
    handleTagSelect(tagId);
    setIsBurgerOpen(false);
    setSelectedTagIndex(null);
  };

  const handleTagMouseEnter = (index) => {
    if (tagTimeoutRef.current) {
      clearTimeout(tagTimeoutRef.current);
    }
    setSelectedTagIndex(index);
    setIsTagHovering(true);
  };

  const handleTagMouseLeave = () => {
    setIsTagHovering(false);
    tagTimeoutRef.current = setTimeout(() => {
      if (!isTagHovering) {
        setSelectedTagIndex(null);
      }
    }, 200);
  };

  const handleTagClick = (tagId, index) => {
    if (selectedTagIndex === index) {
      setSelectedTagIndex(null);
    } else {
      handleBurgerTagSelect(tagId);
    }
  };

  return (
    <section className="relative min-h-screen bg-gray-900 py-20 px-4 overflow-hidden pt-20 md:pt-24" id="projects">
      {/* Animation des étoiles */}
      <div className="stars-1 absolute inset-0"></div>
      <div className="stars-2 absolute inset-0"></div>
      <div className="stars-3 absolute inset-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header avec titre et burger menu */}
        <div className="flex items-start justify-between mb-12 gap-4">
          {/* Titre de la section */}
          <div className="flex-1 text-center md:text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold title-gradient mb-4">
              {t.projects.title}
            </h2>
            <p className="text-lg md:text-xl description-gradient max-w-3xl mx-auto">
              {t.projects.description}
            </p>
          </div>

          {/* Burger Menu - Visible seulement si une catégorie est active */}
          {activeCategory !== 'all' && (
            <div className="relative flex-shrink-0" ref={burgerMenuRef}>
              <button
                onClick={() => setIsBurgerOpen(!isBurgerOpen)}
                className="flex flex-col items-center justify-center w-10 h-10 md:w-12 md:h-12 
                         bg-black/40 backdrop-blur-sm rounded-full border border-white/10 
                         hover:border-purple-500/30 transition-all duration-300 hover:scale-105 group
                         mt-2 md:mt-0"
              >
                {/* Icône burger animée */}
                <div className="space-y-1">
                  <div className={`w-4 md:w-5 h-0.5 bg-white transition-all duration-300 
                                ${isBurgerOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <div className={`w-4 md:w-5 h-0.5 bg-white transition-all duration-300 
                                ${isBurgerOpen ? 'opacity-0' : ''}`} />
                  <div className={`w-4 md:w-5 h-0.5 bg-white transition-all duration-300 
                                ${isBurgerOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
                
                {/* Indicateur de sous-filtres disponibles */}
                {getTagsForActiveCategory().length > 0 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full 
                                border-2 border-white animate-pulse" />
                )}
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center text-white text-xl">
            {t.projects.loading}
          </div>
        ) : error ? (
          <div className="text-center text-red-400 text-xl">
            {t.projects.error}: {error}
          </div>
        ) : (
          <div>
            {/* NAVIGATION PRINCIPALE - CATÉGORIES */}
            <div className="flex justify-center mb-8 relative z-[70]">
              <div className="inline-flex bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-full p-2 gap-2 pill-container flex-wrap shadow-2xl">
                
                {/* BOUTON "TOUS LES PROJETS" */}
                <button
                  onClick={() => handleCategorySelect('all')}
                  className={`px-6 py-3 rounded-full font-bold transition-all duration-500 whitespace-nowrap relative overflow-hidden text-sm md:text-base ${
                    activeCategory === 'all'
                      ? 'category-button-active category-gradient-all text-white shadow-2xl transform scale-105 border-2 border-purple-400/50'
                      : 'text-gray-300 hover:text-white category-button-inactive bg-gray-700/30 hover:bg-gray-600/40'
                  }`}
                >
                  <span className="relative z-10">Tous les projets</span>
                  {activeCategory === 'all' && (
                    <>
                      <div className="absolute inset-0 category-shimmer"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"></div>
                    </>
                  )}
                </button>

                {/* BOUTONS DES CATÉGORIES PRINCIPALES */}
                {mainCategories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`px-4 py-3 rounded-full font-semibold transition-all duration-500 whitespace-nowrap relative overflow-hidden text-sm ${
                      activeCategory === category.id
                        ? `category-button-active category-gradient-${category.id} text-white shadow-2xl transform scale-105 border border-white/20`
                        : 'text-gray-300 hover:text-white category-button-inactive bg-gray-700/30 hover:bg-gray-600/40'
                    }`}
                    style={{ 
                      boxShadow: activeCategory === category.id ? `0 0 30px ${category.color}40` : 'none'
                    }}
                  >
                    <span className="relative z-10">{category.name}</span>
                    {activeCategory === category.id && (
                      <>
                        <div className="absolute inset-0 category-shimmer"></div>
                        <div className="absolute inset-0" style={{ backgroundColor: `${category.color}20` }}></div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* MENU DES FILTRES */}
            {isBurgerOpen && (
              <div className="w-full flex justify-center mb-8 animate-fade-in">
                <div className="flex space-x-4">
                  {/* Colonne des tags */}
                  <div className="flex flex-col gap-2 min-w-[160px]">
                    {/* Bouton "Tous" */}
                    <button
                      onClick={() => handleBurgerTagSelect('all')}
                      className={`text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg border text-sm ${
                        activeTag === 'all'
                          ? 'bg-gradient-to-r from-purple-500/95 to-purple-600/95 text-white border-purple-400'
                          : 'bg-gradient-to-r from-slate-800/90 to-blue-900/90 text-white hover:from-purple-600/90 hover:to-purple-600/90 border-slate-600'
                      } hover:transform hover:-translate-y-1 hover:shadow-lg`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs">🎯</span>
                        <span className="font-semibold">Tous</span>
                        {activeTag === 'all' && (
                          <span className="ml-auto text-purple-200">✓</span>
                        )}
                      </div>
                    </button>

                    {/* Tags de la catégorie */}
                    {getTagsForActiveCategory().map((tag, index) => (
                      <button
                        key={tag._id}
                        onClick={() => handleTagClick(tag._id, index)}
                        onMouseEnter={() => handleTagMouseEnter(index)}
                        onMouseLeave={handleTagMouseLeave}
                        className={`text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg border text-sm flex items-center justify-between ${
                          activeTag === tag._id
                            ? 'bg-gradient-to-r from-purple-500/95 to-purple-600/95 text-white border-purple-400'
                            : 'bg-gradient-to-r from-slate-800/90 to-blue-900/90 text-white hover:from-purple-600/90 hover:to-purple-600/90 border-slate-600'
                        } hover:transform hover:-translate-y-1 hover:shadow-lg`}
                      >
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: tag.color }}
                          />
                          <span className="font-semibold">{tag.name}</span>
                        </div>
                        <span className={`transition-transform duration-300 ${
                          selectedTagIndex === index ? 'rotate-90' : ''
                        }`}>▶</span>
                      </button>
                    ))}

                    {/* Message si aucun tag */}
                    {getTagsForActiveCategory().length === 0 && (
                      <div className="text-center py-4 px-4 bg-gradient-to-r from-slate-800/90 to-blue-900/90 rounded-lg border border-slate-600">
                        <div className="text-xl mb-2 opacity-50">🚫</div>
                        <p className="text-gray-400 text-xs italic">
                          Aucun filtre disponible
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Colonne des options avancées */}
                  {selectedTagIndex !== null && (
                    <div 
                      className="flex flex-col gap-2 min-w-[160px] animate-fade-in"
                      onMouseEnter={() => setIsTagHovering(true)}
                      onMouseLeave={handleTagMouseLeave}
                    >
                      {[
                        { icon: "🔍", label: "Recherche" },
                        { icon: "📅", label: "Trier par date" },
                        { icon: "⭐", label: "Favoris" },
                        { icon: "🔄", label: "Récents" }
                      ].map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          className="bg-gradient-to-r from-yellow-400/95 to-orange-500/95 text-gray-900 text-left px-3 py-2 rounded-lg font-semibold hover:from-blue-400/95 hover:to-blue-600/95 hover:text-white shadow-md text-sm border border-yellow-300 hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                          onClick={() => {
                            console.log(`Option sélectionnée: ${option.label}`);
                            setSelectedTagIndex(null);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span>{option.icon}</span>
                            <span>{option.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* GRILLE DES PROJETS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in relative z-0">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project._id || index} 
                  className="group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.image ? urlFor(project.image).width(400).height(300).url() : null} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    
                    {/* Placeholder si pas d'image */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center" style={{ display: project.image ? 'none' : 'flex' }}>
                      <div className="text-gray-400 text-4xl">📁</div>
                    </div>
                    
                    {/* Overlay qui apparaît au hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {project.title}
                        </h4>
                        <p className="text-gray-200 text-sm mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                          {project.description}
                        </p>
                        
                        {/* Tags de qualification du projet */}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                            {project.tags
                              .filter(tag => tag && tag.name)
                              .slice(0, 3)
                              .map((tag, tagIndex) => (
                                <span 
                                  key={tagIndex} 
                                  className="px-2 py-1 text-white text-xs font-medium rounded-full backdrop-blur-sm border border-white/20 shadow-lg"
                                  style={{ 
                                    backgroundColor: tag.color || '#6B7280'
                                  }}
                                >
                                  {tag.name}
                                </span>
                              ))}
                            {project.tags.filter(tag => tag && tag.name).length > 3 && (
                              <span className="px-2 py-1 bg-gray-600/80 text-white text-xs font-medium rounded-full backdrop-blur-sm border border-white/20">
                                +{project.tags.filter(tag => tag && tag.name).length - 3}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* Technologies */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                              <span 
                                key={techIndex} 
                                className="px-2 py-1 bg-gradient-to-r from-purple-500/80 to-blue-500/80 
                                           text-white text-xs font-medium rounded-full backdrop-blur-sm 
                                           border border-white/20 shadow-lg"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Message si aucun projet */}
              {filteredProjects.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 text-xl">
                    {t.projects.noProjects}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Styles CSS personnalisés pour les animations de catégories */}
      <style>{`
        /* Animations de base */
        @keyframes category-gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes category-shimmer {
          0% { 
            background-position: -200% center; 
            opacity: 0;
          }
          50% { 
            background-position: 200% center; 
            opacity: 0.3;
          }
          100% { 
            background-position: 400% center; 
            opacity: 0;
          }
        }
        
        @keyframes category-glow-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(147, 51, 234, 0.2);
          }
          50% { 
            box-shadow: 0 0 30px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.4);
          }
        }

        /* Classes pour les boutons de catégories */
        .category-button-active {
          position: relative;
          background-size: 200% 200%;
          animation: category-gradient-shift 4s ease-in-out infinite, category-glow-pulse 3s ease-in-out infinite;
        }
        
        .category-button-inactive {
          transition: all 0.3s ease;
        }
        
        .category-button-inactive:hover {
          background: linear-gradient(135deg, rgba(128, 90, 213, 0.2), rgba(139, 92, 246, 0.3));
          transform: translateY(-2px) scale(1.02);
        }
        
        .category-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          background-size: 200% 100%;
          animation: category-shimmer 3s ease-in-out infinite;
          border-radius: inherit;
        }

        /* Gradients spécifiques pour chaque catégorie */
        .category-gradient-all {
          background: linear-gradient(135deg, #7c3aed, #9333ea, #3b82f6, #8b5cf6, #7c3aed);
        }
        
        .category-gradient-arts {
          background: linear-gradient(135deg, #ec4899, #f472b6, #be185d, #ec4899);
        }
        
        .category-gradient-dev {
          background: linear-gradient(135deg, #3b82f6, #60a5fa, #1d4ed8, #3b82f6);
        }
        
        .category-gradient-video {
          background: linear-gradient(135deg, #ef4444, #f87171, #dc2626, #ef4444);
        }
        
        .category-gradient-game {
          background: linear-gradient(135deg, #10b981, #34d399, #059669, #10b981);
        }
        
        .category-gradient-web {
          background: linear-gradient(135deg, #14b8a6, #5eead4, #0d9488, #14b8a6);
        }

        /* Effet de hover amélioré */
        .category-button-active:hover {
          animation-duration: 2s;
          transform: scale(1.08) translateY(-3px) !important;
        }
        
        .category-button-active:hover .category-shimmer {
          animation-duration: 1.5s;
        }
      `}</style>
    </section>
  );
};

export default Projects;
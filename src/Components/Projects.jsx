import { useRef, useEffect, useState } from 'react';
import { 
  fetchProjects, 
  fetchSubcategories, 
  fetchProjectsByCategory, 
  fetchProjectsBySubcategory,
  urlFor 
} from '../config/sanityClient';
import { useLanguage } from '../hooks/useLanguage.jsx';

const Projects = () => {
  const { t } = useLanguage();
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [activeSubCategory, setActiveSubCategory] = useState('all');

  const [categories, setCategories] = useState({
    arts: [],
    dev: [],
    video: []
  });

  // Fonction pour récupérer les sous-catégories
  const loadCategories = async () => {
    try {
      const subcategories = await fetchSubcategories();

      // Organiser les sous-catégories par catégorie principale
      const categorizedData = {
        arts: subcategories.filter(cat => cat.mainCategory === 'arts'),
        dev: subcategories.filter(cat => cat.mainCategory === 'dev'),
        video: subcategories.filter(cat => cat.mainCategory === 'video')
      };

      setCategories(categorizedData);
    } catch (error) {
      console.error('Erreur lors de la récupération des sous-catégories:', error);
    }
  };

  const loadProjects = async () => {
    try {
      setLoading(true);
      
      const projects = await fetchProjects();
      setAllProjects(projects);
      setFilteredProjects(projects);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    loadProjects();
  }, []);

  const handleSelect = (key) => {
    setActiveTab(key);
    setActiveSubCategory('all'); // Réinitialiser la sous-catégorie lors du changement de catégorie principale

    if (key === 'all') {
      setFilteredProjects(allProjects);
    } else {
      const filtered = allProjects.filter(project => 
        project.category === key
      );
      setFilteredProjects(filtered);
    }
  };

  const handleSubCategorySelect = (subCategoryId) => {
    setActiveSubCategory(subCategoryId);

    if (subCategoryId === 'all') {
      // Si "Toutes" est sélectionné, filtrer uniquement par catégorie principale
      const filtered = allProjects.filter(project => 
        activeTab === 'all' || project.category === activeTab
      );
      setFilteredProjects(filtered);
    } else {
      // Filtrer par sous-catégorie
      const filtered = allProjects.filter(project => 
        project.subcategory && project.subcategory._id === subCategoryId
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <section className="relative min-h-screen bg-gray-900 py-20 px-4 overflow-hidden" id="projects">
      {/* Animation des étoiles - peut être gardée avec le CSS existant */}
      <div className="stars-1 absolute inset-0"></div>
      <div className="stars-2 absolute inset-0"></div>
      <div className="stars-3 absolute inset-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Titre de la section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold title-gradient mb-4">
            {t.projects.title}
          </h2>
          <p className="text-xl description-gradient max-w-3xl mx-auto">
            {t.projects.description}
          </p>
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
            {/* Navigation des catégories */}
            <div className="flex justify-center mb-12 relative z-[70]">
              <div className="inline-flex bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full p-1 gap-1 pill-container">
                {/* Bouton "Tous les projets" */}
                <button
                  onClick={() => handleSelect('all')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-500 whitespace-nowrap pill-button relative overflow-hidden ${
                    activeTab === 'all'
                      ? 'pill-active text-white shadow-lg transform scale-105'
                      : 'text-gray-300 hover:text-white pill-hover'
                  }`}
                  style={{ animationDelay: '0s' }}
                >
                  <span className="relative z-10">{t.projects.allProjects}</span>
                </button>

                {/* Boutons des catégories */}
                {Object.entries(categories).map(([category, subCategories], index) => (
                  <div key={category} className="relative group">
                    {subCategories.length > 0 ? (
                      <>
                        <button
                          onClick={() => handleSelect(category)}
                          className={`px-6 py-3 rounded-full font-medium transition-all duration-500 whitespace-nowrap cursor-pointer pill-button relative overflow-hidden ${
                            activeTab === category
                              ? 'pill-active text-white shadow-lg transform scale-105'
                              : 'text-gray-300 hover:text-white pill-hover'
                          }`}
                          style={{ animationDelay: `${(index + 1) * 0.5}s` }}
                        >
                          <span className="relative z-10">
                            {category === 'arts' && t.projects.categories.arts}
                            {category === 'dev' && t.projects.categories.dev}
                            {category === 'video' && t.projects.categories.video}
                          </span>
                        </button>
                        
                        {/* Menu déroulant avec z-index élevé */}
                        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                          <div className="py-2">
                            <button 
                              onClick={() => handleSubCategorySelect('all')}
                              className={`w-full text-left px-4 py-2 text-white hover:bg-gray-700/70 transition-colors ${activeSubCategory === 'all' ? 'bg-gray-700/50' : ''}`}
                            >
                              {t.projects.allSubcategories}
                            </button>
                            <div className="border-t border-gray-600/50 my-1"></div>
                            {subCategories.map(subCat => (
                              <button
                                key={subCat._id}
                                onClick={() => handleSubCategorySelect(subCat._id)}
                                className={`w-full text-left px-4 py-2 text-white hover:bg-gray-700/70 transition-colors ${activeSubCategory === subCat._id ? 'bg-gray-700/50' : ''}`}
                              >
                                {subCat.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => handleSelect(category)}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-500 whitespace-nowrap pill-button relative overflow-hidden ${
                          activeTab === category
                            ? 'pill-active text-white shadow-lg transform scale-105'
                            : 'text-gray-300 hover:text-white pill-hover'
                        }`}
                        style={{ animationDelay: `${(index + 1) * 0.5}s` }}
                      >
                        <span className="relative z-10">
                          {category === 'arts' && t.projects.categories.arts}
                          {category === 'dev' && t.projects.categories.dev}
                          {category === 'video' && t.projects.categories.video}
                        </span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Grille des projets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in relative z-0">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project._id || index} 
                  className="group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.image ? urlFor(project.image).width(400).height(300).url() : '/assets/placeholder.jpg'} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay qui apparaît au hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h4 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {project.title}
                        </h4>
                        <p className="text-gray-200 text-sm mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                          {project.description}
                        </p>
                        
                        {/* Badge de sous-catégorie */}
                        {project.subcategory && (
                          <div className="inline-block px-3 py-1 bg-purple-600/80 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                            {project.subcategory.name}
                          </div>
                        )}
                        
                        {/* Technologies */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
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
      
      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes title-gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes title-shimmer {
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
        
        @keyframes pill-gradient-flow {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pill-slide-shimmer {
          0% {
            transform: translateX(-100%) rotate(-10deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) rotate(10deg);
            opacity: 0;
          }
        }
        
        @keyframes pill-continuous-slide {
          0% {
            left: -100%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        
        @keyframes pill-pulse {
          0%, 100% {
            box-shadow: 0 0 10px rgba(147, 51, 234, 0.3), 0 0 20px rgba(59, 130, 246, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.6), 0 0 40px rgba(59, 130, 246, 0.4);
          }
        }
        
        .pill-container {
          animation: pill-pulse 3s ease-in-out infinite;
        }
        
        .pill-button {
          position: relative;
          overflow: hidden;
        }
        
        .pill-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.6),
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: pill-continuous-slide 3s ease-in-out infinite;
          animation-delay: inherit;
          z-index: 1;
          border-radius: inherit;
        }
        
        .pill-active {
          background: linear-gradient(
            45deg,
            #7c3aed,
            #3b82f6,
            #8b5cf6,
            #6366f1,
            #7c3aed
          );
          background-size: 300% 300%;
          animation: pill-gradient-flow 4s ease-in-out infinite;
          position: relative;
        }
        
        .pill-active::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 40%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.1) 60%,
            transparent 70%
          );
          animation: pill-slide-shimmer 3s ease-in-out infinite;
          z-index: 2;
        }
        
        .pill-hover {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .pill-hover:hover {
          background: linear-gradient(45deg, rgba(107, 114, 128, 0.5), rgba(75, 85, 99, 0.5));
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .title-gradient {
          background: linear-gradient(90deg, #ffffff, #f8f8f8, #ffffff, #f0f0f0, #ffffff);
          background-size: 300% 100%;
          animation: title-gradient-shift 4s ease-in-out infinite;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
        
        .description-gradient {
          background: linear-gradient(90deg, #e0e0e0, #f0f0f0, #e0e0e0, #d0d0d0, #e0e0e0);
          background-size: 300% 100%;
          animation: title-gradient-shift 5s ease-in-out infinite;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}

export default Projects;
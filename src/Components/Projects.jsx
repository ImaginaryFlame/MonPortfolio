import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFilter, FiX, FiTag, FiLayers, FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllContentForGallery, fetchTags, urlFor, getTagColor } from '../config/sanityClient';
import { useLanguage } from '../hooks/useLanguage';

const Projects = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [allContent, setAllContent] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);
  const [groupByUniverse, setGroupByUniverse] = useState(false);
  const [showAllContent, setShowAllContent] = useState(false);

  // Nombre maximum de projets à afficher dans "Tous" par défaut
  const MAX_CONTENT_DISPLAY = 8;

  // CATÉGORIES PRINCIPALES avec icônes et couleurs mises à jour
  const mainCategories = [
    { id: 'all', name: 'Tous', color: '#8B5CF6', categoryValue: '', icon: '🎯' },
    { id: 'arts', name: 'Arts Visuels & Narratifs', color: '#EC4899', categoryValue: 'arts-visuels-narratifs', icon: '🎨' },
    { id: 'dev', name: 'Développement & Tech', color: '#3B82F6', categoryValue: 'developpement-tech', icon: '💻' },
    { id: 'video', name: 'Vidéaste', color: '#EF4444', categoryValue: 'videaste', icon: '🎬' },
    { id: 'game', name: 'Game Development', color: '#10B981', categoryValue: 'game-development', icon: '🎮' },
    { id: 'web', name: 'Web & Digital', color: '#14B8A6', categoryValue: 'web-digital', icon: '🌐' }
  ];

  // Récupérer tous les contenus depuis Sanity
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [contentData, tagsData] = await Promise.all([
          fetchAllContentForGallery(),
          fetchTags()
        ]);
        
        setAllContent(contentData);
        setAllTags(tagsData);
        
        console.log('📊 Données récupérées pour la section projets:', {
          content: contentData.length,
          tags: tagsData.length,
          byType: contentData.reduce((acc, item) => {
            acc[item.contentType] = (acc[item.contentType] || 0) + 1;
            return acc;
          }, {}),
          withUniverseContext: contentData.filter(item => item.hasUniverseContext).length,
          narrativeProjects: contentData.filter(item => item.isNarrativeProject).length
        });
      } catch (error) {
        console.error('❌ Erreur lors du chargement des données:', error);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Statistiques des liaisons d'univers
  const universeStats = useMemo(() => {
    const universes = new Map();
    
    allContent.forEach(item => {
      if (item.universInfo) {
        const universId = item.universInfo._id;
        if (!universes.has(universId)) {
          universes.set(universId, {
            ...item.universInfo,
            totalElements: 0,
            byType: {}
          });
        }
        
        const universeData = universes.get(universId);
        universeData.totalElements++;
        universeData.byType[item.contentType] = (universeData.byType[item.contentType] || 0) + 1;
      }
    });
    
    return Array.from(universes.values()).sort((a, b) => b.totalElements - a.totalElements);
  }, [allContent]);

  // Filtrer les contenus selon les critères sélectionnés
  const filteredContent = useMemo(() => {
    let filtered = allContent;

    // Filtre par catégorie
    if (selectedCategory) {
      filtered = filtered.filter(item => item.displayCategory === selectedCategory);
    }

    // Filtre par tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(item => {
        if (!item.tags || !Array.isArray(item.tags)) return false;
        return selectedTags.every(tagId => 
          item.tags.some(tag => tag._id === tagId)
        );
      });
    }

    // Filtre par terme de recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.displayTitle?.toLowerCase().includes(term) ||
        item.displayDescription?.toLowerCase().includes(term) ||
        item.contentType?.toLowerCase().includes(term) ||
        item.universInfo?.nom?.toLowerCase().includes(term)
      );
    }

    // Limitation pour l'affichage "Tous" (sauf si on veut voir tout le contenu)
    if (!selectedCategory && !showAllContent && !searchTerm && selectedTags.length === 0) {
      // Mélange aléatoire et limitation pour "Tous"
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      filtered = shuffled.slice(0, MAX_CONTENT_DISPLAY);
    }

    console.log('🔍 Contenus filtrés:', {
      total: allContent.length,
      filtered: filtered.length,
      category: selectedCategory,
      tags: selectedTags,
      search: searchTerm,
      showingAll: showAllContent,
      withUniverseContext: filtered.filter(item => item.hasUniverseContext).length
    });

    return filtered;
  }, [allContent, selectedCategory, selectedTags, searchTerm, showAllContent]);

  // Regrouper par univers si demandé
  const contentToDisplay = useMemo(() => {
    if (!groupByUniverse || selectedCategory !== 'arts-visuels-narratifs') {
      return { type: 'list', data: filteredContent };
    }
    
    const grouped = new Map();
    const ungrouped = [];
    
    filteredContent.forEach(item => {
      if (item.universInfo) {
        const universId = item.universInfo._id;
        if (!grouped.has(universId)) {
          grouped.set(universId, {
            universe: item.universInfo,
            items: []
          });
        }
        grouped.get(universId).items.push(item);
      } else {
        ungrouped.push(item);
      }
    });
    
    return { 
      type: 'grouped', 
      data: Array.from(grouped.values()).sort((a, b) => b.items.length - a.items.length),
      ungrouped 
    };
  }, [filteredContent, groupByUniverse, selectedCategory]);

  // Fonction pour gérer la sélection de catégorie
  const handleCategoryClick = (categoryValue) => {
    // Si on clique sur "Tous" ou sur la même catégorie, on revient à l'affichage de tous
    if (categoryValue === '' || selectedCategory === categoryValue) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(categoryValue);
    }
    setSelectedTags([]); // Reset tags when changing category
    setGroupByUniverse(false); // Reset grouping when changing category
    setShowAllContent(false); // Reset show all when changing category
  };

  // Fonction pour gérer la sélection de tags
  const handleTagClick = (tagId) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  // Fonction pour réinitialiser tous les filtres
  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedTags([]);
    setSearchTerm('');
  };

  // Navigation vers le contenu
  const handleContentClick = (content) => {
    const destination = content.destinationUrl;
    
    if (destination.startsWith('http')) {
      window.open(destination, '_blank');
    } else {
      navigate(destination);
    }
  };

  // Composant pour afficher un tag avec sa couleur
  const TagDisplay = ({ tag, isSelected = false, onClick = null, size = 'sm' }) => {
    const tagColor = getTagColor(tag);
    
    const sizeClasses = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base'
    };

    return (
      <motion.button
        onClick={onClick}
        disabled={!onClick}
        whileHover={onClick ? { scale: 1.05 } : {}}
        whileTap={onClick ? { scale: 0.95 } : {}}
        className={`
          ${sizeClasses[size]} rounded-full font-medium transition-all duration-200
          ${isSelected 
            ? 'text-white shadow-lg transform scale-105' 
            : 'text-white/80 hover:text-white hover:shadow-md'
          }
          ${onClick ? 'cursor-pointer' : 'cursor-default'}
        `}
        style={{
          backgroundColor: isSelected ? tagColor : `${tagColor}40`,
          borderColor: tagColor,
          border: `2px solid ${tagColor}`
        }}
        title={tag.description || tag.name}
      >
        <FiTag className="inline mr-1" size={12} />
        {tag.name}
      </motion.button>
    );
  };

  // Obtenir l'icône pour le type de contenu
  const getContentTypeIcon = (contentType) => {
    switch (contentType) {
      case 'project': return '📁';
      case 'personnage': return '👤';
      case 'bestiaire': return '🐉';
      case 'region': return '🗺️';
      case 'univers': return '🌌';
      case 'faction': return '⚔️';
      default: return '✨';
    }
  };

  // Composant pour une carte de contenu
  const ContentCard = ({ content }) => {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="group cursor-pointer"
        onClick={() => handleContentClick(content)}
      >
        <div className="relative h-96 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm 
                       border border-white/10 hover:border-purple-500/30 transition-all duration-300
                       hover:shadow-xl hover:shadow-purple-500/25">
          
          {/* Image */}
          {content.displayImage ? (
            <img
              src={urlFor(content.displayImage).width(400).height(300).url()}
              alt={content.displayTitle}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-purple-600/50 to-blue-600/50 
                            flex items-center justify-center transition-all duration-500
                            group-hover:from-purple-500/60 group-hover:to-blue-500/60">
              <div className="text-white text-4xl opacity-60 transition-all duration-500 
                              group-hover:opacity-90 group-hover:scale-110">
                {getContentTypeIcon(content.contentType)}
              </div>
            </div>
          )}
          
          {/* Badge type de contenu avec informations de liaison */}
          <div className="absolute top-3 left-3 space-y-2">
            <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full 
                           text-white text-xs font-medium border border-white/30">
              {getContentTypeIcon(content.contentType)} {content.contentType}
            </span>
            
            {/* Badge univers si lié */}
            {content.universInfo && (
              <div className="flex items-center gap-1">
                <span className="px-2 py-1 bg-purple-500/70 backdrop-blur-sm rounded-full 
                               text-white text-xs font-medium border border-purple-300/50">
                  🌌 {content.universInfo.nom}
                </span>
              </div>
            )}
            
            {/* Indicateur de projets narratifs avec liaisons */}
            {content.isNarrativeProject && content.linkedElementsCount > 0 && (
              <div className="flex items-center gap-1">
                <span className="px-2 py-1 bg-blue-500/70 backdrop-blur-sm rounded-full 
                               text-white text-xs font-medium border border-blue-300/50">
                  🔗 {content.linkedElementsCount} éléments liés
                </span>
              </div>
            )}
            
            {/* Indicateur pour les univers hub */}
            {content.isUniverseHub && content.linkedElementsCount > 0 && (
              <div className="flex items-center gap-1">
                <span className="px-2 py-1 bg-gold-500/70 backdrop-blur-sm rounded-full 
                               text-white text-xs font-medium border border-yellow-300/50">
                  ⭐ Hub - {content.linkedElementsCount} contenus
                </span>
              </div>
            )}
          </div>
          
          {/* Contenu */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 
                           group-hover:text-purple-300 transition-colors duration-300">
              {content.displayTitle}
            </h3>
            
            {content.displayDescription && (
              <p className="text-gray-300 text-sm mb-3 line-clamp-2 
                           group-hover:text-gray-200 transition-colors duration-300">
                {content.displayDescription.substring(0, 100)}...
              </p>
            )}
            
            {/* Aperçu des éléments liés pour les projets narratifs */}
            {content.linkedElements && content.linkedElements.length > 0 && (
              <div className="mb-3">
                <div className="text-xs text-purple-300 mb-1">Éléments d'univers liés :</div>
                <div className="flex flex-wrap gap-1">
                  {content.linkedElements.slice(0, 3).map((linkedElement, index) => (
                    <span 
                      key={index}
                      className="px-1.5 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded border border-purple-400/30"
                    >
                      {getContentTypeIcon(linkedElement.type)} {linkedElement.data.nom || linkedElement.data.title}
                    </span>
                  ))}
                  {content.linkedElements.length > 3 && (
                    <span className="px-1.5 py-0.5 text-xs text-purple-400 bg-purple-500/10 rounded">
                      +{content.linkedElements.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {/* Tags */}
            {content.tags && content.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {content.tags.slice(0, 3).map((tag) => (
                  <TagDisplay 
                    key={tag._id} 
                    tag={tag} 
                    size="xs"
                  />
                ))}
                {content.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs text-gray-400 bg-white/10 rounded-full">
                    +{content.tags.length - 3}
                  </span>
                )}
              </div>
            )}
            
            {/* Technologies pour les projets */}
            {content.technologies && content.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {content.technologies.slice(0, 3).map((tech, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {content.technologies.length > 3 && (
                  <span className="px-2 py-1 text-xs text-gray-400">
                    +{content.technologies.length - 3}
                  </span>
                )}
              </div>
            )}
            
            {/* Indicateur de clic avec contexte */}
            <div className="flex items-center justify-between mt-auto">
              <div className="text-gray-400 text-sm group-hover:text-purple-300 transition-colors">
                {content.hasUniverseContext ? 'Explorer l\'univers' : 'Cliquer pour explorer'}
              </div>
              <div className="transform transition-all duration-300 group-hover:translate-x-1">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Effet de hover spécial pour les éléments liés à un univers */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 
                         transition-opacity duration-300 pointer-events-none ${
                           content.hasUniverseContext 
                             ? 'bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10' 
                             : 'bg-purple-500/10'
                         }`} />
          
          {/* Bordure spéciale pour les projets narratifs avec liaisons */}
          {content.isNarrativeProject && content.linkedElementsCount > 0 && (
            <div className="absolute inset-0 rounded-xl border-2 border-transparent 
                           group-hover:border-gradient-to-r group-hover:from-purple-400 
                           group-hover:via-blue-400 group-hover:to-pink-400 
                           transition-all duration-500"></div>
          )}
          
          {/* Indicateur visuel pour les univers hub */}
          {content.isUniverseHub && (
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 
                           transition-all duration-300">
              <div className="bg-yellow-500/90 backdrop-blur-sm rounded-full p-1.5 
                             animate-pulse group-hover:animate-none">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Erreur</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div id="projects" className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Mes Projets
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
            Une sélection complète de mes créations : projets, personnages, univers narratifs, et bien plus encore.
          </p>
          
          {/* Indicateur de contenu total */}
          <div className="flex justify-center items-center gap-6 text-sm">
            <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <span className="text-purple-400 font-semibold">{allContent.length}</span>
              <span className="text-gray-300 ml-1">contenus au total</span>
            </div>
            
            {(selectedCategory || selectedTags.length > 0 || searchTerm) && (
              <div className="bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-400/30">
                <span className="text-blue-300 font-semibold">{filteredContent.length}</span>
                <span className="text-gray-300 ml-1">
                  {filteredContent.length === 1 ? 'résultat' : 'résultats'}
                </span>
              </div>
            )}
            
            {!selectedCategory && selectedTags.length === 0 && !searchTerm && (
              <div className="bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-green-400/30">
                <span className="text-green-300 font-semibold">🎯</span>
                <span className="text-gray-300 ml-1">
                  {showAllContent ? 'Affichage complet' : `Sélection (${MAX_CONTENT_DISPLAY} sur ${allContent.length})`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Barre de navigation des catégories */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {mainCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryClick(category.categoryValue)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-3 ${
                  selectedCategory === category.categoryValue
                    ? 'text-white shadow-xl shadow-purple-500/25'
                    : 'text-white/80 hover:text-white hover:shadow-lg'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.categoryValue 
                    ? category.color 
                    : `${category.color}30`,
                  borderColor: category.color,
                  border: `2px solid ${category.color}`
                }}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Barre de recherche et bouton filtres */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un projet, personnage, univers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white 
                       placeholder-gray-400 transition-all duration-300"
            />
          </div>
          
          {/* Options de regroupement pour Arts Visuels & Narratifs */}
          {selectedCategory === 'arts-visuels-narratifs' && (
            <button
              onClick={() => setGroupByUniverse(!groupByUniverse)}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                groupByUniverse 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M19 11H5m14-7H5m14 14H5" />
              </svg>
              {groupByUniverse ? 'Vue liste' : 'Grouper par univers'}
            </button>
          )}
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              showFilters 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20'
            }`}
          >
            <FiFilter size={20} />
            Filtres
            {(selectedCategory || selectedTags.length > 0) && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                {(selectedCategory ? 1 : 0) + selectedTags.length}
              </span>
            )}
          </button>
        </div>

        {/* Statistiques des univers pour Arts Visuels & Narratifs */}
        {selectedCategory === 'arts-visuels-narratifs' && universeStats.length > 0 && (
          <div className="mb-8">
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                🌌 Univers narratifs ({universeStats.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {universeStats.slice(0, 6).map((universe) => (
                  <div 
                    key={universe._id}
                    className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-purple-400/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white text-sm">{universe.nom}</span>
                      <span className="text-purple-400 text-xs font-bold">
                        {universe.totalElements} éléments
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(universe.byType).map(([type, count]) => (
                        <span 
                          key={type}
                          className="px-1.5 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded"
                        >
                          {getContentTypeIcon(type)} {count}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {universeStats.length > 6 && (
                <div className="text-center mt-3">
                  <span className="text-gray-400 text-sm">
                    +{universeStats.length - 6} autres univers
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Panneau de filtres */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                {/* Filtres par tags */}
                {allTags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <FiTag size={20} />
                      Tags ({allTags.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 30).map((tag) => (
                        <TagDisplay
                          key={tag._id}
                          tag={tag}
                          isSelected={selectedTags.includes(tag._id)}
                          onClick={() => handleTagClick(tag._id)}
                          size="sm"
                        />
                      ))}
                      {allTags.length > 30 && (
                        <span className="px-3 py-1.5 text-sm text-gray-400 bg-white/10 rounded-full">
                          +{allTags.length - 30} autres
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions de filtrage */}
                <div className="flex justify-between items-center pt-4 border-t border-white/20">
                  <div className="text-sm text-gray-300">
                    {contentToDisplay.type === 'grouped' 
                      ? `${contentToDisplay.data.length} univers avec ${contentToDisplay.data.reduce((acc, group) => acc + group.items.length, 0)} éléments`
                      : `${filteredContent.length} élément${filteredContent.length !== 1 ? 's' : ''} trouvé${filteredContent.length !== 1 ? 's' : ''}`
                    }
                  </div>
                  
                  {(selectedCategory || selectedTags.length > 0 || searchTerm) && (
                    <button
                      onClick={clearAllFilters}
                      className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <FiX size={16} />
                      Effacer les filtres
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Affichage des contenus */}
        <AnimatePresence mode="wait">
          {contentToDisplay.type === 'grouped' ? (
            // Affichage groupé par univers
            <motion.div
              key="grouped-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {contentToDisplay.data.map((universeGroup) => (
                <div key={universeGroup.universe._id} className="space-y-4">
                  {/* Header de l'univers */}
                  <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm 
                                 rounded-xl p-4 border border-purple-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">🌌</div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {universeGroup.universe.nom}
                          </h3>
                          <p className="text-purple-300 text-sm">
                            {universeGroup.items.length} élément{universeGroup.items.length !== 1 ? 's' : ''} dans cet univers
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(
                          universeGroup.items.reduce((acc, item) => {
                            acc[item.contentType] = (acc[item.contentType] || 0) + 1;
                            return acc;
                          }, {})
                        ).map(([type, count]) => (
                          <span 
                            key={type}
                            className="px-2 py-1 text-xs bg-white/10 text-white rounded-full"
                          >
                            {getContentTypeIcon(type)} {count}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Grille des éléments de l'univers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ml-4">
                    {universeGroup.items.map((content) => (
                      <ContentCard key={content._id} content={content} />
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Éléments non groupés */}
              {contentToDisplay.ungrouped.length > 0 && (
                <div className="space-y-4">
                  <div className="bg-gray-600/20 backdrop-blur-sm rounded-xl p-4 border border-gray-500/30">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📂</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Autres contenus</h3>
                        <p className="text-gray-300 text-sm">
                          {contentToDisplay.ungrouped.length} élément{contentToDisplay.ungrouped.length !== 1 ? 's' : ''} non lié{contentToDisplay.ungrouped.length !== 1 ? 's' : ''} à un univers
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ml-4">
                    {contentToDisplay.ungrouped.map((content) => (
                      <ContentCard key={content._id} content={content} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            // Affichage en liste normale
            filteredContent.length > 0 ? (
              <div>
                <motion.div
                  key="content-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredContent.map((content) => (
                    <ContentCard key={content._id} content={content} />
                  ))}
                </motion.div>
                
                {/* Bouton "Voir plus" pour l'affichage "Tous" */}
                {!selectedCategory && !showAllContent && !searchTerm && selectedTags.length === 0 && 
                 allContent.length > MAX_CONTENT_DISPLAY && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setShowAllContent(true)}
                      className="group px-8 py-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 
                               hover:from-blue-600/50 hover:to-purple-600/50 border border-blue-500/50 
                               hover:border-blue-400/70 rounded-full text-white font-medium 
                               transition-all duration-300 hover:scale-105 hover:shadow-xl 
                               hover:shadow-blue-500/25 backdrop-blur-sm"
                    >
                      <span className="flex items-center gap-2">
                        Voir tous les {allContent.length} contenus
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                  </div>
                )}
                
                {/* Bouton "Voir moins" quand on affiche tout */}
                {!selectedCategory && showAllContent && !searchTerm && selectedTags.length === 0 && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setShowAllContent(false)}
                      className="group px-8 py-4 bg-gradient-to-r from-gray-600/30 to-gray-700/30 
                               hover:from-gray-600/50 hover:to-gray-700/50 border border-gray-500/50 
                               hover:border-gray-400/70 rounded-full text-white font-medium 
                               transition-all duration-300 hover:scale-105 hover:shadow-xl 
                               hover:shadow-gray-500/25 backdrop-blur-sm"
                    >
                      <span className="flex items-center gap-2">
                        Afficher moins
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M5 15l7-7 7 7" />
                        </svg>
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Aucun contenu trouvé
                </h3>
                <p className="text-gray-300 mb-6">
                  Essayez de modifier vos critères de recherche ou de supprimer les filtres.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Afficher tout le contenu
                </button>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
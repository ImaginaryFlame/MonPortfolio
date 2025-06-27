import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVideo, 
  faFilter, 
  faSearch,
  faSpinner,
  faExclamationTriangle,
  faRefresh,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import useYouTubeVideos from '../../hooks/useYouTubeVideos';
import YouTubeVideoCard from '../ui/YouTubeVideoCard';

// Configuration de votre chaîne YouTube
const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || '';

const YouTubeStudioVideo = ({ section }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date'); // 'date', 'views', 'likes', 'title'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

  // Changer le titre de l'onglet
  useEffect(() => {
    if (section) {
      const sectionTitles = {
        'videos': '🎬 Vidéos YouTube',
        'shorts': '📱 Shorts YouTube'
      };
      document.title = `${sectionTitles[section] || '🎬 Contenu YouTube'} | MonPortfolio - Flame's Studio`;
    } else {
      document.title = "🎬 Contenu YouTube | MonPortfolio - Flame's Studio";
    }
    return () => {
      document.title = "MonPortfolio - Flamme Créative | Univers Narratifs, Labo Tech & Studio";
    };
  }, [section]);

  // Hook pour récupérer les vidéos YouTube
  const {
    videos,
    channelInfo,
    stats,
    loading,
    error,
    hasMore,
    isConfigured,
    loadVideos,
    loadMore,
    refresh,
    searchVideos,
    changeVideoType
  } = useYouTubeVideos(YOUTUBE_CHANNEL_ID, {
    maxResults: 25,
    videoType: selectedCategory,
    autoLoad: true,
    enablePagination: true
  });

  // Fonction de tri des vidéos
  const sortVideos = (videos, sortBy, sortOrder) => {
    return [...videos].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.publishedAt);
          bValue = new Date(b.publishedAt);
          break;
        case 'views':
          aValue = a.viewCount;
          bValue = b.viewCount;
          break;
        case 'likes':
          aValue = a.likeCount;
          bValue = b.likeCount;
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  // Filtrer et trier les vidéos
  const getFilteredAndSortedVideos = () => {
    if (!videos || videos.length === 0) return [];
    
    let filtered = videos;
    
    // Filtrage par section si spécifiée
    if (section) {
      switch (section) {
        case 'videos':
          filtered = videos.filter(video => !video.isShort);
          break;
        case 'shorts':
          filtered = videos.filter(video => video.isShort);
          break;
        default:
          filtered = videos;
      }
    }
    
    // Filtrage par catégorie sélectionnée
    if (selectedCategory !== 'all') {
      switch (selectedCategory) {
        case 'normal':
          filtered = filtered.filter(video => !video.isShort);
          break;
        case 'shorts':
          filtered = filtered.filter(video => video.isShort);
          break;
      }
    }
    
    // Tri
    return sortVideos(filtered, sortBy, sortOrder);
  };

  const filteredAndSortedVideos = getFilteredAndSortedVideos();

  // Séparer les vidéos par type pour l'affichage
  const videosByType = {
    shorts: filteredAndSortedVideos.filter(video => video.isShort),
    normal: filteredAndSortedVideos.filter(video => !video.isShort)
  };

  // Configuration vérifiée
  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white pt-20 md:pt-24 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-8">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-6xl text-red-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Configuration YouTube manquante</h2>
            <p className="text-gray-300 mb-6">
              Pour afficher vos vidéos YouTube, vous devez configurer l'API YouTube.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white pt-20 md:pt-24 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec navigation */}
        <div className="flex items-center mb-8">
          <Link 
            to="/creation/studio/video"
            className="text-red-400 hover:text-red-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-900/20 transition-all duration-300"
          >
            <span>← Retour</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            🎬 Contenu Vidéo YouTube
          </h1>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-8 space-y-4">
          {/* Recherche */}
          <form onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              searchVideos(searchQuery);
            } else {
              loadVideos();
            }
          }} className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher dans vos vidéos..."
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors duration-200"
              />
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors duration-200"
            >
              Rechercher
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                loadVideos();
              }}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </form>

          {/* Filtres et tri */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faFilter} />
                Filtres & Tri
              </button>
              
              {showFilters && (
                <div className="flex flex-wrap items-center gap-4">
                  {/* Filtres par type */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Type :</span>
                    {['all', 'normal', 'shorts'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setSelectedCategory(filter)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                          selectedCategory === filter
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {filter === 'all' ? 'Toutes' : filter === 'normal' ? 'Vidéos' : 'Shorts'}
                      </button>
                    ))}
                  </div>
                  
                  {/* Tri */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Trier par :</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:border-red-500 focus:outline-none"
                    >
                      <option value="date">Date</option>
                      <option value="views">Vues</option>
                      <option value="likes">Likes</option>
                      <option value="title">Titre</option>
                    </select>
                    
                    <button
                      onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                      className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm hover:bg-gray-600 transition-colors duration-200"
                      title={sortOrder === 'desc' ? 'Décroissant' : 'Croissant'}
                    >
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-400">
                {filteredAndSortedVideos.length} vidéo{filteredAndSortedVideos.length !== 1 ? 's' : ''}
              </div>
              <button
                onClick={refresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faRefresh} className={loading ? 'animate-spin' : ''} />
                Actualiser
              </button>
            </div>
          </div>
        </div>

        {/* Gestion des erreurs */}
        {error && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400" />
              <div>
                <p className="font-medium">Erreur de chargement</p>
                <p className="text-sm text-gray-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* État de chargement */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-300">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-2xl" />
              <span className="text-lg">Chargement des vidéos...</span>
            </div>
          </div>
        )}

        {/* Affichage organisé par sections */}
        {!loading && filteredAndSortedVideos.length > 0 && (
          <div className="space-y-12">
            {/* Section Vidéos normales */}
            {(selectedCategory === 'all' || selectedCategory === 'normal') && videosByType.normal.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    🎬 Vidéos ({videosByType.normal.length})
                  </h2>
                  <div className="h-px bg-gradient-to-r from-red-500 to-transparent flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {videosByType.normal.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <YouTubeVideoCard 
                        video={video}
                        size="medium"
                        showStats={true}
                        showDescription={false}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Section Shorts */}
            {(selectedCategory === 'all' || selectedCategory === 'shorts') && videosByType.shorts.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    📱 Shorts ({videosByType.shorts.length})
                  </h2>
                  <div className="h-px bg-gradient-to-r from-orange-500 to-transparent flex-1"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {videosByType.shorts.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <YouTubeVideoCard 
                        video={video}
                        size="small"
                        showStats={true}
                        showDescription={false}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Message si aucune vidéo */}
        {!loading && filteredAndSortedVideos.length === 0 && (
          <div className="text-center py-12">
            <FontAwesomeIcon icon={faVideo} className="text-6xl text-gray-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">
              {searchQuery ? 'Aucune vidéo trouvée' : 'Aucune vidéo disponible'}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `Aucune vidéo ne correspond à "${searchQuery}"`
                : 'Les vidéos apparaîtront ici une fois chargées depuis YouTube'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  loadVideos();
                }}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors duration-200"
              >
                Voir toutes les vidéos
              </button>
            )}
          </div>
        )}

        {/* Bouton charger plus */}
        {hasMore && !loading && filteredAndSortedVideos.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Charger plus de vidéos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeStudioVideo; 
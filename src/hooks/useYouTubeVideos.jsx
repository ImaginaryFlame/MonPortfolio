import { useState, useEffect, useCallback } from 'react';
import youtubeAPI from '../services/youtubeAPI';

/**
 * Hook personnalisé pour gérer les vidéos YouTube
 * @param {string} channelId - ID de la chaîne YouTube
 * @param {Object} options - Options de configuration
 * @returns {Object} - État et fonctions pour gérer les vidéos
 */
const useYouTubeVideos = (channelId, options = {}) => {
  const {
    maxResults = 50,
    videoType = 'all', // 'all', 'shorts', 'normal'
    autoLoad = true,
    cacheTime = 5 * 60 * 1000, // 5 minutes en millisecondes
    enablePagination = true
  } = options;

  // États
  const [videos, setVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]); // Cache de toutes les vidéos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState('');
  const [channelInfo, setChannelInfo] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  // État pour les statistiques
  const [stats, setStats] = useState({
    totalVideos: 0,
    totalViews: 0,
    totalLikes: 0,
    shortsCount: 0,
    normalVideosCount: 0
  });

  /**
   * Vérifie si le cache est encore valide
   */
  const isCacheValid = useCallback(() => {
    if (!lastFetch) return false;
    return Date.now() - lastFetch < cacheTime;
  }, [lastFetch, cacheTime]);

  /**
   * Calcule les statistiques des vidéos
   */
  const calculateStats = useCallback((videosList) => {
    const totalVideos = videosList.length;
    const totalViews = videosList.reduce((sum, video) => sum + video.viewCount, 0);
    const totalLikes = videosList.reduce((sum, video) => sum + video.likeCount, 0);
    const shortsCount = videosList.filter(video => video.isShort).length;
    const normalVideosCount = totalVideos - shortsCount;

    setStats({
      totalVideos,
      totalViews,
      totalLikes,
      shortsCount,
      normalVideosCount
    });
  }, []);

  /**
   * Filtre les vidéos selon le type demandé
   */
  const filterVideos = useCallback((videosList, type) => {
    return youtubeAPI.filterVideosByType(videosList, type);
  }, []);

  /**
   * Charge les informations de la chaîne
   */
  const loadChannelInfo = useCallback(async () => {
    if (!channelId || !youtubeAPI.isConfigured()) return;

    try {
      const info = await youtubeAPI.getChannelInfo(channelId);
      setChannelInfo(info);
    } catch (err) {
      console.error('Erreur lors du chargement des infos chaîne:', err);
    }
  }, [channelId]);

  /**
   * Charge les vidéos depuis YouTube
   */
  const loadVideos = useCallback(async (pageToken = '', append = false) => {
    if (!channelId || !youtubeAPI.isConfigured()) {
      setError('Configuration YouTube manquante');
      return;
    }

    // Si on a un cache valide et qu'on ne pagine pas, on l'utilise
    if (!append && isCacheValid() && allVideos.length > 0) {
      const filtered = filterVideos(allVideos, videoType);
      setVideos(filtered);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await youtubeAPI.getChannelVideos(channelId, maxResults, pageToken);
      
      if (append) {
        const newAllVideos = [...allVideos, ...response.videos];
        setAllVideos(newAllVideos);
        calculateStats(newAllVideos);
        
        const filtered = filterVideos(newAllVideos, videoType);
        setVideos(filtered);
      } else {
        setAllVideos(response.videos);
        calculateStats(response.videos);
        
        const filtered = filterVideos(response.videos, videoType);
        setVideos(filtered);
      }

      setNextPageToken(response.nextPageToken || '');
      setHasMore(!!response.nextPageToken);
      setLastFetch(Date.now());

    } catch (err) {
      console.error('Erreur lors du chargement des vidéos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [channelId, maxResults, videoType, allVideos, isCacheValid, filterVideos, calculateStats]);

  /**
   * Charge plus de vidéos (pagination)
   */
  const loadMore = useCallback(() => {
    if (!loading && hasMore && nextPageToken && enablePagination) {
      loadVideos(nextPageToken, true);
    }
  }, [loading, hasMore, nextPageToken, enablePagination, loadVideos]);

  /**
   * Recharge les vidéos (force le rechargement)
   */
  const refresh = useCallback(() => {
    setAllVideos([]);
    setLastFetch(null);
    loadVideos();
  }, [loadVideos]);

  /**
   * Recherche des vidéos par mots-clés
   */
  const searchVideos = useCallback(async (query) => {
    if (!query.trim() || !youtubeAPI.isConfigured()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await youtubeAPI.searchVideos(query, channelId);
      const filtered = filterVideos(results, videoType);
      setVideos(filtered);
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [channelId, videoType, filterVideos]);

  /**
   * Obtient une vidéo spécifique par son ID
   */
  const getVideoById = useCallback(async (videoId) => {
    if (!videoId || !youtubeAPI.isConfigured()) return null;

    try {
      return await youtubeAPI.getVideo(videoId);
    } catch (err) {
      console.error('Erreur lors de la récupération de la vidéo:', err);
      return null;
    }
  }, []);

  /**
   * Change le type de vidéos à afficher
   */
  const changeVideoType = useCallback((newType) => {
    if (newType !== videoType && allVideos.length > 0) {
      const filtered = filterVideos(allVideos, newType);
      setVideos(filtered);
    }
  }, [allVideos, videoType, filterVideos]);

  // Effet pour charger automatiquement les vidéos
  useEffect(() => {
    if (autoLoad && channelId && youtubeAPI.isConfigured()) {
      loadChannelInfo();
      loadVideos();
    }
  }, [autoLoad, channelId, loadChannelInfo, loadVideos]);

  // Effet pour filtrer les vidéos quand le type change
  useEffect(() => {
    if (allVideos.length > 0) {
      const filtered = filterVideos(allVideos, videoType);
      setVideos(filtered);
    }
  }, [videoType, allVideos, filterVideos]);

  return {
    // Données
    videos,
    channelInfo,
    stats,
    
    // États
    loading,
    error,
    hasMore,
    
    // Configuration
    isConfigured: youtubeAPI.isConfigured(),
    
    // Actions
    loadVideos: () => loadVideos(),
    loadMore,
    refresh,
    searchVideos,
    getVideoById,
    changeVideoType,
    
    // Utilitaires
    isCacheValid: isCacheValid()
  };
};

export default useYouTubeVideos; 
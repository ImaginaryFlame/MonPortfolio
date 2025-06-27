import { useState, useEffect, useCallback } from 'react';
import twitchAPI from '../services/twitchAPI';

/**
 * Hook personnalisé pour gérer les streams Twitch
 * @param {string} username - Nom d'utilisateur Twitch
 * @param {Object} options - Options de configuration
 * @returns {Object} - État et fonctions pour gérer les streams
 */
const useTwitchStreams = (username, options = {}) => {
  const {
    maxResults = 20,
    includeClips = true,
    autoLoad = true,
    cacheTime = 5 * 60 * 1000, // 5 minutes en millisecondes
    refreshInterval = 30 * 1000 // 30 secondes pour les streams live
  } = options;

  // États
  const [streams, setStreams] = useState([]);
  const [clips, setClips] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [channelStats, setChannelStats] = useState({
    followerCount: 0,
    gameId: '',
    gameName: '',
    title: '',
    language: 'fr'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [currentStream, setCurrentStream] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  // État pour les statistiques globales
  const [stats, setStats] = useState({
    totalStreams: 0,
    totalViews: 0,
    totalClips: 0,
    averageViewers: 0,
    mostPopularGame: '',
    totalStreamTime: 0
  });

  // État pour le statut d'affiliation
  const [affiliateStatus, setAffiliateStatus] = useState({
    isAffiliate: false,
    isPartner: false,
    broadcasterType: '',
    canReceiveSubscriptions: false,
    statusText: 'Streamer'
  });

  /**
   * Vérifie si le cache est encore valide
   */
  const isCacheValid = useCallback(() => {
    if (!lastFetch) return false;
    return Date.now() - lastFetch < cacheTime;
  }, [lastFetch, cacheTime]);

  /**
   * Calcule les statistiques des streams
   */
  const calculateStats = useCallback((streamsList, clipsList) => {
    const totalStreams = streamsList.length;
    const totalViews = streamsList.reduce((sum, stream) => sum + (stream.viewCount || 0), 0);
    const totalClips = clipsList.length;
    const averageViewers = totalStreams > 0 ? Math.round(totalViews / totalStreams) : 0;
    
    // Calculer le jeu le plus populaire
    const gameCount = {};
    streamsList.forEach(stream => {
      if (stream.gameName) {
        gameCount[stream.gameName] = (gameCount[stream.gameName] || 0) + 1;
      }
    });
    
    const mostPopularGame = Object.keys(gameCount).reduce((a, b) => 
      gameCount[a] > gameCount[b] ? a : b, ''
    );

    // Estimer le temps total de stream (approximatif)
    const totalStreamTime = streamsList.length * 2; // Estimation de 2h par stream en moyenne

    setStats({
      totalStreams,
      totalViews,
      totalClips,
      averageViewers,
      mostPopularGame,
      totalStreamTime
    });
  }, []);

  /**
   * Charge les informations de l'utilisateur
   */
  const loadUserInfo = useCallback(async () => {
    if (!username || !twitchAPI.isConfigured()) return null;

    try {
      const info = await twitchAPI.getUserInfo(username);
      setUserInfo(info);
      
      // Vérifier le statut d'affiliation
      const affiliateInfo = await twitchAPI.checkAffiliateStatus(info);
      setAffiliateStatus(affiliateInfo);
      
      return info;
    } catch (err) {
      console.error('Erreur lors du chargement des infos utilisateur:', err);
      return null;
    }
  }, [username]);

  /**
   * Charge les statistiques du canal
   */
  const loadChannelStats = useCallback(async (userId) => {
    if (!userId || !twitchAPI.isConfigured()) return;

    try {
      const stats = await twitchAPI.getChannelStats(userId);
      setChannelStats(stats);
    } catch (err) {
      console.error('Erreur lors du chargement des stats du canal:', err);
    }
  }, []);

  /**
   * Charge les streams depuis Twitch
   */
  const loadStreams = useCallback(async (forceRefresh = false) => {
    if (!username || !twitchAPI.isConfigured()) {
      setError('Configuration Twitch manquante');
      return;
    }

    // Si on a un cache valide et qu'on ne force pas le refresh
    if (!forceRefresh && isCacheValid() && streams.length > 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Charger les infos utilisateur si pas encore fait
      let user = userInfo;
      if (!user) {
        user = await loadUserInfo();
      }

      if (!user) {
        throw new Error('Impossible de récupérer les informations utilisateur');
      }

      // Charger les streams
      const streamData = await twitchAPI.getStreams(user.id, { maxResults });
      setStreams(streamData.streams);
      setIsLive(streamData.isLive);
      setCurrentStream(streamData.currentStream);

      // Charger les clips si demandé
      let clipsData = [];
      if (includeClips) {
        clipsData = await twitchAPI.getClips(user.id, { maxResults: 10 });
        setClips(clipsData);
      }

      // Charger les stats du canal
      await loadChannelStats(user.id);

      // Calculer les statistiques
      calculateStats(streamData.streams, clipsData);

      setLastFetch(Date.now());

    } catch (err) {
      console.error('Erreur lors du chargement des streams:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [username, maxResults, includeClips, isCacheValid, streams.length, userInfo, loadUserInfo, loadChannelStats, calculateStats]);

  /**
   * Recharge les streams (force le rechargement)
   */
  const refresh = useCallback(() => {
    setLastFetch(null);
    loadStreams(true);
  }, [loadStreams]);

  /**
   * Charge plus de clips
   */
  const loadMoreClips = useCallback(async (period = 'week') => {
    if (!userInfo || !twitchAPI.isConfigured()) return;

    try {
      setLoading(true);
      const newClips = await twitchAPI.getClips(userInfo.id, { 
        maxResults: 20, 
        period 
      });
      setClips(newClips);
    } catch (err) {
      console.error('Erreur lors du chargement des clips:', err);
    } finally {
      setLoading(false);
    }
  }, [userInfo]);

  /**
   * Recherche des streams par jeu
   */
  const searchStreamsByGame = useCallback(async (gameName) => {
    if (!gameName.trim() || !twitchAPI.isConfigured()) return [];

    try {
      setLoading(true);
      const results = await twitchAPI.searchStreamsByGame(gameName);
      return results;
    } catch (err) {
      console.error('Erreur lors de la recherche par jeu:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtient le statut live en temps réel
   */
  const checkLiveStatus = useCallback(async () => {
    if (!userInfo || !twitchAPI.isConfigured()) return false;

    try {
      const streamData = await twitchAPI.getStreams(userInfo.id, { maxResults: 1 });
      setIsLive(streamData.isLive);
      setCurrentStream(streamData.currentStream);
      return streamData.isLive;
    } catch (err) {
      console.error('Erreur lors de la vérification du statut live:', err);
      return false;
    }
  }, [userInfo]);

  // Effet pour charger automatiquement les données
  useEffect(() => {
    if (autoLoad && username && twitchAPI.isConfigured()) {
      loadStreams();
    }
  }, [autoLoad, username, loadStreams]);

  // Effet pour rafraîchir automatiquement le statut live
  useEffect(() => {
    if (!isLive || !refreshInterval) return;

    const interval = setInterval(() => {
      checkLiveStatus();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [isLive, refreshInterval, checkLiveStatus]);

  // Formatage des nombres
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Formatage de la durée
  const formatDuration = (hours) => {
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days}j ${remainingHours}h`;
    }
    return `${hours}h`;
  };

  return {
    // Données
    streams,
    clips,
    userInfo,
    channelStats,
    stats,
    currentStream,
    affiliateStatus,
    
    // États
    loading,
    error,
    isLive,
    
    // Configuration
    isConfigured: twitchAPI.isConfigured(),
    
    // Actions
    loadStreams: () => loadStreams(true),
    refresh,
    loadMoreClips,
    searchStreamsByGame,
    checkLiveStatus,
    
    // Utilitaires
    formatNumber,
    formatDuration,
    isCacheValid: isCacheValid()
  };
};

export default useTwitchStreams; 
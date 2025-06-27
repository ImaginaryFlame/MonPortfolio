import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faEye, 
  faThumbsUp, 
  faComment,
  faTrophy,
  faFire,
  faRocket,
  faCrown,
  faChartLine,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import useYouTubeVideos from '../../hooks/useYouTubeVideos';

// Configuration de votre chaîne YouTube
const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || '';

const YouTubeStudioDashboard = () => {
  // Hook pour récupérer les vidéos YouTube avec gestion d'erreur
  const hookResult = useYouTubeVideos(YOUTUBE_CHANNEL_ID, {
    maxResults: 50,
    autoLoad: true
  });

  // Extraction sécurisée des données
  const {
    videos = [],
    channelInfo = null,
    stats = { normalVideosCount: 0, shortsCount: 0 },
    loading = false,
    isConfigured = false
  } = hookResult || {};

  // Définir les catégories vidéo au début pour qu'elles soient toujours disponibles
  const videoCategories = [
    {
      id: 'videos',
      title: 'VIDÉOS',
      description: 'Contenu vidéo long format - Tutoriels, analyses, présentations et contenus éducatifs approfondis',
      color: '#EF4444',
      icon: '🎬',
      count: stats?.normalVideosCount || 0
    },
    {
      id: 'shorts',
      title: 'SHORTS & RÉELS & TIKTOKS',
      description: 'Contenu court et viral - Vidéos dynamiques optimisées pour les plateformes sociales modernes',
      color: '#F59E0B',
      icon: '📱',
      count: stats?.shortsCount || 0
    }
  ];

  // Changer le titre de l'onglet
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.title = "🎬 Dashboard Vidéo | MonPortfolio - Flame's Studio";
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      document.title = "MonPortfolio - Flamme Créative | Univers Narratifs, Labo Tech & Studio";
    };
  }, []);

  // Calculer les statistiques impressionnantes
  const getImpressiveStats = () => {
    if (!videos || videos.length === 0) {
      return null;
    }

    try {
      const totalViews = videos.reduce((sum, video) => sum + (video.viewCount || 0), 0);
      const totalLikes = videos.reduce((sum, video) => sum + (video.likeCount || 0), 0);
      const totalComments = videos.reduce((sum, video) => sum + (video.commentCount || 0), 0);
      
      const avgViews = Math.round(totalViews / videos.length);
      const bestVideo = videos.reduce((best, current) => 
        (current.viewCount || 0) > (best.viewCount || 0) ? current : best, videos[0]);
      
      // Calcul de l'engagement rate
      const engagementRate = totalViews > 0 ? ((totalLikes + totalComments) / totalViews * 100) : 0;

      // Vidéos à succès
      const mostViewed1M = videos.filter(v => (v.viewCount || 0) >= 1000000).length;
      const mostViewed100K = videos.filter(v => (v.viewCount || 0) >= 100000).length;
      const mostViewed10K = videos.filter(v => (v.viewCount || 0) >= 10000).length;

      return {
        totalViews,
        totalLikes,
        totalComments,
        avgViews,
        engagementRate: engagementRate.toFixed(2),
        bestVideo,
        mostViewed1M,
        mostViewed100K,
        mostViewed10K
      };
    } catch (error) {
      console.error('Erreur dans getImpressiveStats:', error);
      return null;
    }
  };

  const impressiveStats = getImpressiveStats();

  // Fonction pour obtenir le nombre d'abonnés (avec fallback)
  const getSubscriberCount = () => {
    if (channelInfo?.statistics?.subscriberCount) {
      return parseInt(channelInfo.statistics.subscriberCount);
    }
    
    if (impressiveStats?.totalViews) {
      const estimated = Math.floor(impressiveStats.totalViews / 100);
      return estimated;
    }
    
    return 0;
  };

  const currentSubscribers = getSubscriberCount();

  // Formatage des nombres
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Si pas configuré, afficher un message et les catégories basiques
  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white pt-20 md:pt-24 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <Link 
              to="/creation/studio"
              className="text-red-400 hover:text-red-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-900/20 transition-all duration-300 border border-red-500/30 hover:border-red-500 bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Retour au Studio</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              🎬 CONTENU VIDÉO
            </h1>
          </div>

          <div className="bg-orange-900/20 border border-orange-500/50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-xl font-bold">Configuration YouTube</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Pour accéder aux statistiques en temps réel et à vos vraies vidéos YouTube, configurez l'API YouTube dans votre fichier .env
            </p>
            <div className="text-sm text-gray-400 bg-gray-800/50 rounded-lg p-3">
              <code>VITE_YOUTUBE_API_KEY=votre_clé_api<br/>VITE_YOUTUBE_CHANNEL_ID=votre_id_chaîne</code>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {videoCategories.map((category) => (
              <Link
                key={category.id}
                to={`/creation/studio/video/${category.id}`}
                className="group relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-all duration-700 transform hover:scale-[1.02] h-[400px]"
              >
                <div 
                  className="absolute inset-0 rounded-3xl p-[2px] transition-all duration-500 group-hover:animate-pulse"
                  style={{
                    background: `linear-gradient(45deg, ${category.color}, ${category.color}40, ${category.color}60)`
                  }}
                >
                  <div className="h-full bg-gray-900/90 rounded-3xl"></div>
                </div>

                <div 
                  className="absolute inset-0 rounded-3xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    boxShadow: `0 0 50px ${category.color}20, inset 0 0 50px ${category.color}40`
                  }}
                />

                <div className="absolute top-0 left-0 right-0 p-6 z-20">
                  <div className="flex justify-between items-start">
                    <span 
                      className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border bg-black/40 text-gray-200 border-gray-500 group-hover:bg-white/25 group-hover:text-white group-hover:border-white/40 transition-all duration-300"
                      style={{
                        backgroundColor: `${category.color}40`,
                        borderColor: `${category.color}60`
                      }}
                    >
                      Mode Manuel
                    </span>

                    <div 
                      className="text-4xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12"
                      style={{
                        filter: `drop-shadow(0 0 20px ${category.color}20)`
                      }}
                    >
                      {category.icon}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="space-y-4">
                    <h3 
                      className="text-2xl font-bold transition-all duration-300 group-hover:scale-105"
                      style={{
                        color: category.color,
                        textShadow: `0 0 20px ${category.color}20`
                      }}
                    >
                      {category.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed transition-all duration-300 group-hover:text-white">
                      {category.description}
                    </p>

                    <div className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-sm border bg-black/30 border-gray-600 group-hover:bg-white/20 group-hover:border-white/30 group-hover:scale-105 transition-all duration-300 cursor-pointer">
                      <span className="font-medium">Explorer les vidéos</span>
                      <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // État de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white pt-20 md:pt-24 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <Link 
              to="/creation/studio"
              className="text-red-400 hover:text-red-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-900/20 transition-all duration-300 border border-red-500/30 hover:border-red-500 bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Retour au Studio</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              🎬 CONTENU VIDÉO
            </h1>
          </div>
          <div className="text-center">
            <div className="animate-pulse text-xl">Chargement des statistiques...</div>
          </div>
        </div>
      </div>
    );
  }

  // Affichage principal avec données
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white pt-20 md:pt-24 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-12">
          <Link 
            to="/creation/studio"
            className="text-red-400 hover:text-red-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-900/20 transition-all duration-300 border border-red-500/30 hover:border-red-500 bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">Retour au Studio</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            🎬 CONTENU VIDÉO
          </h1>
        </div>

        {/* Dashboard de statistiques */}
        {impressiveStats && (
          <div className="mb-12">
            <div className="bg-gradient-to-br from-red-900/20 via-orange-900/20 via-yellow-900/20 to-green-900/20 border border-red-500/30 rounded-3xl p-8 mb-8 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  🏆 Performance Globale & Objectif 2026
                </h2>
                <p className="text-gray-300">
                  Impact, engagement et progression vers 10K abonnés
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 rounded-xl bg-black/20 border border-red-500/30 hover:scale-105 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2 text-red-400">
                    <FontAwesomeIcon icon={faEye} className="text-xl" />
                  </div>
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    {formatNumber(impressiveStats.totalViews)}
                  </div>
                  <div className="text-sm text-gray-300">Vues totales</div>
                </div>

                <div className="text-center p-6 rounded-xl bg-black/20 border border-orange-500/30 hover:scale-105 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2 text-orange-400">
                    <FontAwesomeIcon icon={faThumbsUp} className="text-xl" />
                  </div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {formatNumber(impressiveStats.totalLikes)}
                  </div>
                  <div className="text-sm text-gray-300">Likes totaux</div>
                </div>

                <div className="text-center p-6 rounded-xl bg-black/20 border border-yellow-500/30 hover:scale-105 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2 text-yellow-400">
                    <FontAwesomeIcon icon={faChartLine} className="text-xl" />
                  </div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {impressiveStats.engagementRate}%
                  </div>
                  <div className="text-sm text-gray-300">Engagement</div>
                </div>

                <div className="text-center p-6 rounded-xl bg-black/20 border border-green-500/30 hover:scale-105 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2 text-green-400">
                    <FontAwesomeIcon icon={faPlay} className="text-xl" />
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {videos.length}
                  </div>
                  <div className="text-sm text-gray-300">Vidéos créées</div>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent"></div>
                <div className="px-4 flex items-center gap-2 text-green-400">
                  <span className="text-lg">🎯</span>
                  <span className="text-lg font-bold">Objectif 2026 : 10K Abonnés</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent"></div>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-2xl font-bold mb-1 text-green-400">
                      {formatNumber(currentSubscribers)}
                    </div>
                    <div className="text-sm text-gray-300">Abonnés actuels</div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold mb-1 text-blue-400">
                      {formatNumber(10000 - currentSubscribers)}
                    </div>
                    <div className="text-sm text-gray-300">Restants</div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold mb-1 text-purple-400">
                      {Math.round((currentSubscribers / 10000) * 100)}%
                    </div>
                    <div className="text-sm text-gray-300">Progression</div>
                  </div>
                </div>
                
                <div className="relative mt-6">
                  <div className="w-full bg-gray-700/50 rounded-full h-6 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${Math.min((currentSubscribers / 10000) * 100, 100)}%`
                      }}
                    />
                  </div>
                  
                  <div className="absolute -top-8 left-0 right-0 flex justify-between text-xs text-gray-400">
                    <span>0</span>
                    <span>2.5K</span>
                    <span>5K</span>
                    <span>7.5K</span>
                    <span className="text-green-400 font-bold">10K 🎯</span>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-400 mt-4">
                  <span className="bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30">
                    {10000 - currentSubscribers} abonnés restants pour atteindre l'objectif
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="text-yellow-400">
                    <FontAwesomeIcon icon={faTrophy} />
                  </div>
                  Records & Milestones
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-yellow-400/10 transition-colors duration-200">
                    <span className="text-gray-300">🥇 Vidéos +1M vues</span>
                    <span className="font-bold text-yellow-400">
                      {impressiveStats.mostViewed1M}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-orange-400/10 transition-colors duration-200">
                    <span className="text-gray-300">🥈 Vidéos +100K vues</span>
                    <span className="font-bold text-orange-400">
                      {impressiveStats.mostViewed100K}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-bronze-400/10 transition-colors duration-200">
                    <span className="text-gray-300">🥉 Vidéos +10K vues</span>
                    <span className="font-bold text-amber-400">
                      {impressiveStats.mostViewed10K}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-blue-400/10 transition-colors duration-200">
                    <span className="text-gray-300">📊 Vues moyennes</span>
                    <span className="font-bold text-blue-400">
                      {formatNumber(impressiveStats.avgViews)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border border-red-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="text-red-400">
                    <FontAwesomeIcon icon={faCrown} />
                  </div>
                  Vidéo Star
                </h3>
                {impressiveStats.bestVideo && (
                  <div className="space-y-3">
                    <div className="font-medium text-white line-clamp-2">
                      {impressiveStats.bestVideo.title}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faEye} className="text-red-400" />
                        <span>{formatNumber(impressiveStats.bestVideo.viewCount || 0)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faThumbsUp} className="text-orange-400" />
                        <span>{formatNumber(impressiveStats.bestVideo.likeCount || 0)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Votre contenu le plus performant
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Catégories vidéos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {videoCategories.map((category) => (
            <Link
              key={category.id}
              to={`/creation/studio/video/${category.id}`}
              className="group relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-all duration-700 transform hover:scale-[1.02] h-[400px]"
            >
              <div 
                className="absolute inset-0 rounded-3xl p-[2px] transition-all duration-500 group-hover:animate-pulse"
                style={{
                  background: `linear-gradient(45deg, ${category.color}, ${category.color}40, ${category.color}60)`
                }}
              >
                <div className="h-full bg-gray-900/90 rounded-3xl"></div>
              </div>

              <div 
                className="absolute inset-0 rounded-3xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  boxShadow: `0 0 50px ${category.color}20, inset 0 0 50px ${category.color}40`
                }}
              />

              <div className="absolute top-0 left-0 right-0 p-6 z-20">
                <div className="flex justify-between items-start">
                  <span 
                    className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border bg-black/40 text-gray-200 border-gray-500 group-hover:bg-white/25 group-hover:text-white group-hover:border-white/40 transition-all duration-300"
                    style={{
                      backgroundColor: `${category.color}40`,
                      borderColor: `${category.color}60`
                    }}
                  >
                    {category.count} vidéos
                  </span>

                  <div 
                    className="text-4xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12"
                    style={{
                      filter: `drop-shadow(0 0 20px ${category.color}20)`
                    }}
                  >
                    {category.icon}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="space-y-4">
                  <h3 
                    className="text-2xl font-bold transition-all duration-300 group-hover:scale-105"
                    style={{
                      color: category.color,
                      textShadow: `0 0 20px ${category.color}20`
                    }}
                  >
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed transition-all duration-300 group-hover:text-white">
                    {category.description}
                  </p>

                  <div className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-sm border bg-black/30 border-gray-600 group-hover:bg-white/20 group-hover:border-white/30 group-hover:scale-105 transition-all duration-300 cursor-pointer">
                    <span className="font-medium">Explorer les vidéos</span>
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Contenus à la une */}
        {videos.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 text-3xl">
                <span className="text-red-400">🎬</span>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  Contenus à la une
                </h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 via-orange-500/30 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.slice(0, 6).map((video, index) => (
                <div 
                  key={video.id || index}
                  className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-red-500/50 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm"
                >
                  {/* Image container */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={video.thumbnail || video.snippet?.thumbnails?.maxres?.url || video.snippet?.thumbnails?.high?.url || video.snippet?.thumbnails?.medium?.url}
                      alt={video.title || video.snippet?.title || "Vidéo"}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMUYyOTM3Ii8+CjxwYXRoIGQ9Ik0xMjggOTBMMTkyIDEyNkwxMjggMTYyVjkwWiIgZmlsbD0iI0VGNDQ0NCIvPgo8L3N2Zz4K';
                      }}
                    />
                    
                    {/* Overlay gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded-md font-medium backdrop-blur-sm">
                      {video.duration || video.contentDetails?.duration || "N/A"}
                    </div>
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-red-600/90 text-white rounded-full p-4 backdrop-blur-sm hover:bg-red-500 transition-colors duration-200">
                        <FontAwesomeIcon icon={faPlay} className="text-xl ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content section */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-red-300 transition-colors duration-300" 
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: '2.5rem'
                        }}>
                      {video.title || video.snippet?.title || "Titre indisponible"}
                    </h3>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-gray-400">
                        <span className="flex items-center gap-1 hover:text-red-400 transition-colors duration-200">
                          <FontAwesomeIcon icon={faEye} className="text-xs" />
                          <span className="font-medium">
                            {formatNumber(parseInt(video.viewCount || video.statistics?.viewCount || 0))}
                          </span>
                        </span>
                        <span className="flex items-center gap-1 hover:text-orange-400 transition-colors duration-200">
                          <FontAwesomeIcon icon={faThumbsUp} className="text-xs" />
                          <span className="font-medium">
                            {formatNumber(parseInt(video.likeCount || video.statistics?.likeCount || 0))}
                          </span>
                        </span>
                      </div>
                      
                      {/* Category badge */}
                      <span className="text-xs bg-red-900/30 text-red-300 px-2 py-1 rounded-full border border-red-500/30">
                        Vidéo
                      </span>
                    </div>
                    
                    {/* Published date */}
                    {(video.publishedAt || video.snippet?.publishedAt) && (
                      <div className="text-xs text-gray-500">
                        {new Date(video.publishedAt || video.snippet.publishedAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    )}
                  </div>
                  
                  {/* Hover border effect */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-red-500/50 transition-all duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeStudioDashboard; 
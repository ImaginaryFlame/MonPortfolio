import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useYouTubeVideos from '../../hooks/useYouTubeVideos';

// Configuration de votre chaîne YouTube
const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || '';

const YouTubeStudioDashboardSimple = () => {
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
    document.title = "🎬 Dashboard Vidéo | MonPortfolio - Flame's Studio";
    return () => {
      document.title = "MonPortfolio - Flamme Créative | Univers Narratifs, Labo Tech & Studio";
    };
  }, []);

  // Calculer les statistiques de base
  const getBasicStats = () => {
    if (!videos || videos.length === 0) return null;

    try {
      const totalViews = videos.reduce((sum, video) => sum + (video.viewCount || 0), 0);
      const totalLikes = videos.reduce((sum, video) => sum + (video.likeCount || 0), 0);
      
      return {
        totalViews,
        totalLikes,
        totalVideos: videos.length,
        avgViews: Math.round(totalViews / videos.length)
      };
    } catch (error) {
      console.error('Erreur dans getBasicStats:', error);
      return null;
    }
  };

  const basicStats = getBasicStats();

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
          {/* Header principal */}
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

          {/* Message de configuration */}
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
            <div className="flex gap-4 mt-4">
              <Link 
                to="/creation/studio/video" 
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
              >
                🚀 Dashboard avancé
              </Link>
              <a 
                href="https://console.developers.google.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
              >
                🔧 Console Google API
              </a>
            </div>
          </div>

          {/* Catégories basiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {videoCategories.map((category, index) => (
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
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border bg-black/40 text-gray-200 border-gray-500 group-hover:bg-white/25 group-hover:text-white group-hover:border-white/40 transition-all duration-300"
                        style={{
                          backgroundColor: `${category.color}40`,
                          borderColor: `${category.color}60`
                        }}
                      >
                        Mode Manuel
                      </span>
                    </div>

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

  // État de chargement avec titre visible
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
            <div className="animate-pulse text-xl">Chargement des vidéos YouTube...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white pt-20 md:pt-24 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header principal */}
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

        {/* Statistiques basiques */}
        {basicStats && (
          <div className="bg-gradient-to-r from-red-900/20 via-orange-900/20 to-yellow-900/20 border border-red-500/30 rounded-3xl p-8 mb-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                🏆 Statistiques YouTube
              </h2>
              <p className="text-gray-300">Performance de votre chaîne</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-xl bg-black/20">
                <div className="text-3xl font-bold text-red-400 mb-2">
                  {formatNumber(basicStats.totalViews)}
                </div>
                <div className="text-sm text-gray-300">Vues totales</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-black/20">
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  {formatNumber(basicStats.totalLikes)}
                </div>
                <div className="text-sm text-gray-300">Likes totaux</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-black/20">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {formatNumber(basicStats.avgViews)}
                </div>
                <div className="text-sm text-gray-300">Moyenne/vidéo</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-black/20">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {basicStats.totalVideos}
                </div>
                <div className="text-sm text-gray-300">Vidéos créées</div>
              </div>
            </div>
          </div>
        )}

        {/* Catégories principales - toujours affichées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {videoCategories.map((category, index) => (
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
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border bg-black/40 text-gray-200 border-gray-500 group-hover:bg-white/25 group-hover:text-white group-hover:border-white/40 transition-all duration-300"
                      style={{
                        backgroundColor: `${category.color}40`,
                        borderColor: `${category.color}60`
                      }}
                    >
                      {category.count} vidéos
                    </span>
                  </div>

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

        {/* Aperçu des vidéos récentes */}
        {videos && videos.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ✨ Vidéos récentes
              </h2>
              <p className="text-gray-300">Découvrez vos dernières créations</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos
                .slice(0, 6)
                .map((video, index) => (
                  <div
                    key={video.id}
                    className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="aspect-video bg-gray-700 flex items-center justify-center">
                      <span className="text-4xl">🎬</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{formatNumber(video.viewCount || 0)} vues</span>
                        <span>{video.isShort ? 'Short' : 'Vidéo'}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeStudioDashboardSimple; 
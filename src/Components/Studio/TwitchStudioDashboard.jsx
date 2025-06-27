import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faEye, 
  faHeart, 
  faUsers,
  faTrophy,
  faFire,
  faRocket,
  faCrown,
  faChartLine,
  faClock,
  faGamepad,
  faVideo,
  faUserPlus,
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import useTwitchStreams from '../../hooks/useTwitchStreams';

// Configuration de votre chaîne Twitch
const TWITCH_USERNAME = import.meta.env.VITE_TWITCH_USERNAME || '';

// Objectifs pour juillet 2026
const FOLLOWER_GOAL = 300;
const SUBSCRIBER_GOAL = 50;
const TARGET_DATE = new Date('2026-07-03');

const TwitchStudioDashboard = () => {
  // Hook pour récupérer les streams Twitch
  const {
    streams,
    clips,
    userInfo,
    channelStats,
    stats,
    currentStream,
    affiliateStatus,
    loading,
    error,
    isLive,
    isConfigured,
    loadStreams,
    refresh,
    formatNumber,
    formatDuration
  } = useTwitchStreams(TWITCH_USERNAME, {
    maxResults: 50,
    includeClips: true,
    autoLoad: true
  });

  // Définir les catégories de contenu
  const contentCategories = [
    {
      id: 'streams',
      title: 'STREAMS',
      description: 'Lives et rediffusions - Gaming, discussions et créations en direct avec la communauté',
      color: '#9146FF',
      icon: '📺',
      count: stats?.totalStreams || 0
    },
    {
      id: 'clips',
      title: 'CLIPS',
      description: 'Moments forts viraux - Extraits marquants des streams et highlights communautaires',
      color: '#FF6441',
      icon: '🎬',
      count: stats?.totalClips || 0
    }
  ];

  // Changer le titre de l'onglet
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.title = "📺 Dashboard Twitch | MonPortfolio - Flame's Studio";
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      document.title = "MonPortfolio - Flamme Créative | Univers Narratifs, Labo Tech & Studio";
    };
  }, []);

  // Calculer les statistiques impressionnantes
  const getImpressiveStats = () => {
    if (!streams || streams.length === 0) {
      return null;
    }

    try {
      const totalViews = streams.reduce((sum, stream) => sum + (stream.viewCount || 0), 0);
      const totalClips = clips?.length || 0;
      
      const avgViews = Math.round(totalViews / streams.length);
      const bestStream = streams.reduce((best, current) => 
        (current.viewCount || 0) > (best.viewCount || 0) ? current : best, streams[0]);
      
      // Calculer le taux d'engagement approximatif (clips/streams)
      const engagementRate = streams.length > 0 ? (totalClips / streams.length * 100) : 0;

      return {
        totalViews,
        totalStreams: streams.length,
        totalClips,
        avgViews,
        engagementRate: engagementRate.toFixed(1),
        bestStream,
        totalStreamTime: stats?.totalStreamTime || 0,
        mostPopularGame: stats?.mostPopularGame || 'Aucun'
      };
    } catch (error) {
      console.error('Erreur dans getImpressiveStats:', error);
      return null;
    }
  };

  const impressiveStats = getImpressiveStats();

  // Fonction pour obtenir le nombre de followers et subs
  const getFollowerCount = () => {
    return channelStats?.followerCount || 0;
  };

  const getSubscriberCount = () => {
    // Utiliser les vraies données de subscribers si disponibles
    if (channelStats?.subscriberCount !== undefined) {
      return channelStats.subscriberCount;
    }
    // Pour un affilié récent (depuis hier), c'est probablement 0
    return 0;
  };

  const currentFollowers = getFollowerCount();
  const currentSubscribers = getSubscriberCount();

  // Calculer les jours restants
  const daysRemaining = Math.ceil((TARGET_DATE - new Date()) / (1000 * 60 * 60 * 24));
  const isTargetPassed = daysRemaining < 0;

  // Si pas configuré, afficher un message et les catégories basiques
  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white pt-20 md:pt-24 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <Link 
              to="/creation/studio"
              className="text-purple-400 hover:text-purple-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-900/20 transition-all duration-300 border border-purple-500/30 hover:border-purple-500 bg-gradient-to-r from-purple-900/20 to-violet-900/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Retour au Studio</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              📺 CONTENU TWITCH
            </h1>
          </div>

          <div className="bg-purple-900/20 border border-purple-500/50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-xl font-bold">Configuration Twitch</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Pour accéder aux statistiques en temps réel et à vos vrais streams Twitch, configurez l'API Twitch dans votre fichier .env
            </p>
            <div className="text-sm text-gray-400 bg-gray-800/50 rounded-lg p-3">
              <code>VITE_TWITCH_CLIENT_ID=votre_client_id<br/>VITE_TWITCH_CLIENT_SECRET=votre_client_secret<br/>VITE_TWITCH_USERNAME=votre_username</code>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {contentCategories.map((category) => (
              <Link
                key={category.id}
                to={`/creation/studio/twitch/${category.id}`}
                className="group relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-[1.02] h-[400px]"
              >
                <div 
                  className="absolute inset-0 rounded-3xl p-[2px] transition-all duration-500"
                  style={{
                    background: `linear-gradient(45deg, ${category.color}, ${category.color}40, ${category.color}60)`
                  }}
                >
                  <div className="h-full bg-gray-900/90 rounded-3xl"></div>
                </div>

                <div className="absolute top-0 left-0 right-0 p-6 z-20">
                  <div className="flex justify-between items-start">
                    <span 
                      className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border bg-black/40 text-gray-200 border-gray-500"
                      style={{
                        backgroundColor: `${category.color}40`,
                        borderColor: `${category.color}60`
                      }}
                    >
                      {category.count} contenus
                    </span>

                    <div className="text-4xl">
                      {category.icon}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="space-y-4">
                    <h3 
                      className="text-2xl font-bold"
                      style={{
                        color: category.color
                      }}
                    >
                      {category.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-sm border bg-black/30 border-gray-600">
                      <span className="font-medium">Explorer le contenu</span>
                      <svg 
                        className="w-5 h-5" 
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white pt-20 md:pt-24 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <Link 
              to="/creation/studio"
              className="text-purple-400 hover:text-purple-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-900/20 transition-all duration-300 border border-purple-500/30 hover:border-purple-500 bg-gradient-to-r from-purple-900/20 to-violet-900/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Retour au Studio</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              📺 CONTENU TWITCH
            </h1>
          </div>
          <div className="text-center">
            <div className="animate-pulse text-xl">Chargement des statistiques Twitch...</div>
          </div>
        </div>
      </div>
    );
  }

  // Affichage principal avec données complètes
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white pt-20 md:pt-24 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-12">
          <Link 
            to="/creation/studio"
            className="text-purple-400 hover:text-purple-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-900/20 transition-all duration-300 border border-purple-500/30 hover:border-purple-500 bg-gradient-to-r from-purple-900/20 to-violet-900/20 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">Retour au Studio</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-pink-500 bg-clip-text text-transparent">
            📺 CONTENU TWITCH
          </h1>
        </div>

        {/* Statut Affiliation */}
        {(affiliateStatus?.isAffiliate || affiliateStatus?.isPartner) && (
          <div className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 border-2 border-purple-500 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-purple-400 font-bold text-lg">
                  {affiliateStatus?.isPartner ? '👑 PARTENAIRE' : '🎉 AFFILIÉ'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">
                  {affiliateStatus?.isPartner 
                    ? 'Statut Partenaire Twitch' 
                    : 'Félicitations ! Vous êtes affilié Twitch'
                  }
                </h3>
                <p className="text-gray-300">
                  {affiliateStatus?.canReceiveSubscriptions 
                    ? 'Les subscribers peuvent vous soutenir avec de vrais abonnements payants !' 
                    : 'En cours de configuration...'
                  }
                </p>
              </div>
              <div className="px-6 py-3 bg-purple-600 rounded-lg font-bold">
                <span className="text-white">💎 {currentSubscribers} Subs</span>
              </div>
            </div>
          </div>
        )}

        {/* Statut Live */}
        {isLive && currentStream && (
          <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-500 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-bold text-lg">EN DIRECT</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{currentStream.title}</h3>
                <p className="text-gray-300">{currentStream.gameName} • {formatNumber(currentStream.viewCount)} viewers</p>
              </div>
              <a 
                href={currentStream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors"
              >
                Regarder
              </a>
            </div>
          </div>
        )}

        {/* Dashboard avec statistiques */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-purple-900/20 via-violet-900/20 to-pink-900/20 border border-purple-500/30 rounded-3xl p-8 mb-8 backdrop-blur-sm">
            <div className="text-center mb-8">
                              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                  🎯 Objectifs Juillet 2026
                </h2>
                <p className="text-gray-300">
                  Progression vers 300 followers et 50 subs • {isTargetPassed ? 'Objectif dépassé !' : `${daysRemaining} jours restants`}
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 rounded-xl bg-black/20 border border-purple-500/30 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center gap-2 mb-2 text-purple-400">
                  <FontAwesomeIcon icon={faEye} className="text-xl" />
                </div>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {formatNumber(impressiveStats?.totalViews || 0)}
                </div>
                <div className="text-sm text-gray-300">Vues totales</div>
              </div>

              <div className="text-center p-6 rounded-xl bg-black/20 border border-violet-500/30 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center gap-2 mb-2 text-violet-400">
                  <FontAwesomeIcon icon={faUsers} className="text-xl" />
                </div>
                <div className="text-3xl font-bold text-violet-400 mb-2">
                  {formatNumber(currentFollowers)}
                </div>
                <div className="text-sm text-gray-300">Followers</div>
              </div>

              <div className="text-center p-6 rounded-xl bg-black/20 border border-pink-500/30 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center gap-2 mb-2 text-pink-400">
                  <FontAwesomeIcon icon={faUserPlus} className="text-xl" />
                </div>
                <div className="text-3xl font-bold text-pink-400 mb-2">
                  {currentSubscribers}
                </div>
                <div className="text-sm text-gray-300">
                  Subscribers {affiliateStatus?.canReceiveSubscriptions ? '(Données réelles)' : '(Non disponible)'}
                </div>
              </div>

              <div className="text-center p-6 rounded-xl bg-black/20 border border-indigo-500/30 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center gap-2 mb-2 text-indigo-400">
                  <FontAwesomeIcon icon={faPlay} className="text-xl" />
                </div>
                <div className="text-3xl font-bold text-indigo-400 mb-2">
                  {impressiveStats?.totalStreams || 0}
                </div>
                <div className="text-sm text-gray-300">Streams réalisés</div>
              </div>
            </div>

            {/* Objectifs Followers et Subs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Objectif Followers */}
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-purple-400">
                    <FontAwesomeIcon icon={faUsers} className="mr-2" />
                    Objectif Followers
                  </h3>
                  <span className="text-sm text-gray-400">{Math.round((currentFollowers / FOLLOWER_GOAL) * 100)}%</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-2xl font-bold mb-1 text-purple-400">
                      {formatNumber(currentFollowers)}
                    </div>
                    <div className="text-xs text-gray-300">Actuels</div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold mb-1 text-violet-400">
                      {formatNumber(FOLLOWER_GOAL - currentFollowers)}
                    </div>
                    <div className="text-xs text-gray-300">Restants</div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold mb-1 text-pink-400">
                      {FOLLOWER_GOAL}
                    </div>
                    <div className="text-xs text-gray-300">Objectif</div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-700/50 rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${Math.min((currentFollowers / FOLLOWER_GOAL) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Objectif Subscribers */}
              <div className="bg-pink-900/20 border border-pink-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-pink-400">
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Objectif Subs
                  </h3>
                  <span className="text-sm text-gray-400">{Math.round((currentSubscribers / SUBSCRIBER_GOAL) * 100)}%</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-2xl font-bold mb-1 text-pink-400">
                      {currentSubscribers}
                    </div>
                    <div className="text-xs text-gray-300">Actuels</div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold mb-1 text-violet-400">
                      {SUBSCRIBER_GOAL - currentSubscribers}
                    </div>
                    <div className="text-xs text-gray-300">Restants</div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold mb-1 text-purple-400">
                      {SUBSCRIBER_GOAL}
                    </div>
                    <div className="text-xs text-gray-300">Objectif</div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-700/50 rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-400 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${Math.min((currentSubscribers / SUBSCRIBER_GOAL) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {impressiveStats && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 border border-violet-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <div className="text-yellow-400">
                      <FontAwesomeIcon icon={faTrophy} />
                    </div>
                    Records & Performances
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-violet-400/10 transition-colors duration-200">
                      <span className="text-gray-300">🎮 Jeu populaire</span>
                      <span className="font-bold text-violet-400">
                        {impressiveStats.mostPopularGame}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-purple-400/10 transition-colors duration-200">
                      <span className="text-gray-300">⏱️ Temps de stream</span>
                      <span className="font-bold text-purple-400">
                        {formatDuration(impressiveStats.totalStreamTime)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-pink-400/10 transition-colors duration-200">
                      <span className="text-gray-300">📊 Viewers moyens</span>
                      <span className="font-bold text-pink-400">
                        {formatNumber(impressiveStats.avgViews)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-indigo-400/10 transition-colors duration-200">
                      <span className="text-gray-300">🔥 Taux engagement</span>
                      <span className="font-bold text-indigo-400">
                        {impressiveStats.engagementRate}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-900/30 to-red-900/30 border border-pink-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <div className="text-pink-400">
                      <FontAwesomeIcon icon={faCrown} />
                    </div>
                    Stream Star
                  </h3>
                  {impressiveStats.bestStream && (
                    <div className="space-y-3">
                      <div className="font-medium text-white line-clamp-2">
                        {impressiveStats.bestStream.title}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faEye} className="text-pink-400" />
                          <span>{formatNumber(impressiveStats.bestStream.viewCount || 0)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faGamepad} className="text-purple-400" />
                          <span>{impressiveStats.bestStream.gameName || 'Gaming'}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        Votre stream le plus performant
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Catégories de contenu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {contentCategories.map((category) => (
            <Link
              key={category.id}
              to={`/creation/studio/twitch/${category.id}`}
              className="group relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-[1.02] h-[400px]"
            >
              <div 
                className="absolute inset-0 rounded-3xl p-[2px] transition-all duration-500"
                style={{
                  background: `linear-gradient(45deg, ${category.color}, ${category.color}40, ${category.color}60)`
                }}
              >
                <div className="h-full bg-gray-900/90 rounded-3xl"></div>
              </div>

              <div className="absolute top-0 left-0 right-0 p-6 z-20">
                <div className="flex justify-between items-start">
                  <span 
                    className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border bg-black/40 text-gray-200 border-gray-500"
                    style={{
                      backgroundColor: `${category.color}40`,
                      borderColor: `${category.color}60`
                    }}
                  >
                    {category.count} contenus
                  </span>

                  <div className="text-4xl">
                    {category.icon}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="space-y-4">
                  <h3 
                    className="text-2xl font-bold"
                    style={{
                      color: category.color
                    }}
                  >
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-sm border bg-black/30 border-gray-600">
                    <span className="font-medium">Explorer le contenu</span>
                    <svg 
                      className="w-5 h-5" 
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

        {/* Aperçu récent - Streams et Clips */}
        {((streams && streams.length > 0) || (clips && clips.length > 0)) && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 text-3xl">
                <span className="text-purple-400">📺</span>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                  Contenus récents
                </h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 via-violet-500/30 to-transparent"></div>
            </div>
            
            {/* Streams récents */}
            {streams && streams.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faVideo} className="text-purple-400" />
                  <span>Streams récents</span>
                  <span className="text-sm text-gray-400">({streams.length})</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {streams.slice(0, 3).map((stream) => (
                    <div 
                      key={stream.id} 
                      className="group bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50 hover:border-purple-500/30 hover:scale-105 relative backdrop-blur-sm"
                    >
                      {stream.isLive && (
                        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse font-bold">
                          <FontAwesomeIcon icon={faCircle} className="mr-1" />
                          LIVE
                        </div>
                      )}
                      <div className="relative overflow-hidden">
                        <img 
                          src={stream.thumbnail || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMUYyOTM3Ii8+CjxwYXRoIGQ9Ik0xMjggOTBMMTkyIDEyNkwxMjggMTYyVjkwWiIgZmlsbD0iIzlENDZGRiIvPgo8L3N2Zz4K'}
                          alt={stream.title}
                          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded font-medium">
                          {stream.duration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-white text-sm mb-2 line-clamp-2">{stream.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faEye} />
                            {formatNumber(stream.viewCount || 0)}
                          </span>
                          {stream.gameName && (
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faGamepad} />
                              <span className="truncate">{stream.gameName}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clips récents */}
            {clips && clips.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faVideo} className="text-orange-400" />
                  <span>Clips populaires</span>
                  <span className="text-sm text-gray-400">({clips.length})</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {clips.slice(0, 4).map((clip) => (
                    <div 
                      key={clip.id} 
                      className="group bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50 hover:border-orange-500/30 hover:scale-105 relative backdrop-blur-sm"
                    >
                      {/* Badge viral */}
                      {(clip.viewCount || 0) > 1000 && (
                        <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          <FontAwesomeIcon icon={faFire} className="mr-1" />
                          VIRAL
                        </div>
                      )}
                      <div className="relative overflow-hidden">
                        <img 
                          src={clip.thumbnail || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMUYyOTM3Ii8+CjxwYXRoIGQ9Ik0xMjggOTBMMTkyIDEyNkwxMjggMTYyVjkwWiIgZmlsbD0iI0ZGNEM0MSIvPgo8L3N2Zz4K'}
                          alt={clip.title}
                          className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded font-medium">
                          {clip.duration ? `${Math.round(clip.duration)}s` : "N/A"}
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-white text-xs mb-2 line-clamp-2">{clip.title}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faEye} />
                            {formatNumber(clip.viewCount || 0)}
                          </span>
                          {clip.creatorName && (
                            <span className="truncate">{clip.creatorName}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TwitchStudioDashboard;

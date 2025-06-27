import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faEye, 
  faGamepad,
  faClock,
  faCalendarAlt,
  faFilter,
  faSearch,
  faVideo,
  faUser,
  faFire,
  faTrophy
} from '@fortawesome/free-solid-svg-icons';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import useTwitchStreams from '../../hooks/useTwitchStreams';

// Configuration
const TWITCH_USERNAME = import.meta.env.VITE_TWITCH_USERNAME || '';

const TwitchClips = () => {
  const {
    clips,
    userInfo,
    loading,
    error,
    isConfigured,
    loadMoreClips,
    refresh,
    formatNumber
  } = useTwitchStreams(TWITCH_USERNAME, {
    maxResults: 20,
    includeClips: true,
    autoLoad: true
  });

  const [filterGame, setFilterGame] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent, views, duration
  const [period, setPeriod] = useState('week'); // day, week, month

  // Changer le titre de l'onglet
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.title = "🎬 Mes Clips | MonPortfolio - Flame's Studio";
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      document.title = "MonPortfolio - Flamme Créative | Univers Narratifs, Labo Tech & Studio";
    };
  }, []);

  // Charger les clips quand la période change
  useEffect(() => {
    if (isConfigured && userInfo) {
      loadMoreClips(period);
    }
  }, [period, isConfigured, userInfo, loadMoreClips]);

  // Filtrer et trier les clips
  const filteredClips = clips
    ?.filter(clip => {
      if (filterGame && clip.gameId && !clip.gameId.toLowerCase().includes(filterGame.toLowerCase())) {
        return false;
      }
      if (searchTerm && !clip.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return (b.viewCount || 0) - (a.viewCount || 0);
        case 'duration':
          return (b.duration || 0) - (a.duration || 0);
        case 'recent':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    }) || [];

  // Obtenir la liste des jeux uniques
  const uniqueGames = [...new Set(clips?.map(clip => clip.gameId).filter(Boolean))] || [];

  // Calculer les statistiques des clips
  const clipStats = {
    totalViews: clips?.reduce((sum, clip) => sum + (clip.viewCount || 0), 0) || 0,
    totalClips: clips?.length || 0,
    avgViews: clips?.length > 0 ? Math.round(clips.reduce((sum, clip) => sum + (clip.viewCount || 0), 0) / clips.length) : 0,
    bestClip: clips?.reduce((best, current) => 
      (current.viewCount || 0) > (best.viewCount || 0) ? current : best, clips?.[0]) || null
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white pt-20 md:pt-24 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <Link 
              to="/creation/studio/twitch"
              className="text-purple-400 hover:text-purple-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-900/20 transition-all duration-300 border border-purple-500/30 hover:border-purple-500 bg-gradient-to-r from-purple-900/20 to-violet-900/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Retour Twitch</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              🎬 MES CLIPS
            </h1>
          </div>

          <div className="bg-purple-900/20 border border-purple-500/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-xl font-bold">Configuration Twitch requise</h2>
            </div>
            <p className="text-gray-300">
              Configurez l'API Twitch dans votre fichier .env pour accéder à vos clips.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white pt-20 md:pt-24 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <Link 
              to="/creation/studio/twitch"
              className="text-purple-400 hover:text-purple-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-900/20 transition-all duration-300 border border-purple-500/30 hover:border-purple-500 bg-gradient-to-r from-purple-900/20 to-violet-900/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Retour Twitch</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              🎬 MES CLIPS
            </h1>
          </div>
          <div className="text-center">
            <div className="animate-pulse text-xl">Chargement des clips...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white pt-20 md:pt-24 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            to="/creation/studio/twitch"
            className="text-purple-400 hover:text-purple-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-900/20 transition-all duration-300 border border-purple-500/30 hover:border-purple-500 bg-gradient-to-r from-purple-900/20 to-violet-900/20 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">Retour Twitch</span>
          </Link>
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
              🎬 MES CLIPS
            </h1>
            <p className="text-gray-300">
              Vos moments forts et highlights ({clips?.length || 0} clips cette {period === 'day' ? 'journée' : period === 'week' ? 'semaine' : 'mois'})
            </p>
          </div>
          <button
            onClick={refresh}
            className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Actualiser
          </button>
        </div>

        {/* Statistiques des clips */}
        {clipStats.totalClips > 0 && (
          <div className="bg-gradient-to-br from-orange-900/20 via-red-900/20 to-pink-900/20 border border-orange-500/30 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faTrophy} className="text-orange-400" />
              <span>Performance des Clips</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-black/20">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  {clipStats.totalClips}
                </div>
                <div className="text-sm text-gray-300">Clips totaux</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-black/20">
                <div className="text-2xl font-bold text-red-400 mb-1">
                  {formatNumber(clipStats.totalViews)}
                </div>
                <div className="text-sm text-gray-300">Vues totales</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-black/20">
                <div className="text-2xl font-bold text-pink-400 mb-1">
                  {formatNumber(clipStats.avgViews)}
                </div>
                <div className="text-sm text-gray-300">Vues moyennes</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-black/20">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {clipStats.bestClip ? formatNumber(clipStats.bestClip.viewCount || 0) : '0'}
                </div>
                <div className="text-sm text-gray-300">Meilleur clip</div>
              </div>
            </div>
          </div>
        )}

        {/* Filtres et recherche */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 backdrop-blur-sm border border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Période */}
            <div className="relative">
              <FontAwesomeIcon icon={faCalendarAlt} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none appearance-none"
              >
                <option value="day">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
              </select>
            </div>

            {/* Recherche */}
            <div className="relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un clip..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Filtre par jeu */}
            <div className="relative">
              <FontAwesomeIcon icon={faGamepad} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterGame}
                onChange={(e) => setFilterGame(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none appearance-none"
              >
                <option value="">Tous les jeux</option>
                {uniqueGames.map(game => (
                  <option key={game} value={game}>{game}</option>
                ))}
              </select>
            </div>

            {/* Tri */}
            <div className="relative">
              <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none appearance-none"
              >
                <option value="recent">Plus récents</option>
                <option value="views">Plus vues</option>
                <option value="duration">Plus longs</option>
              </select>
            </div>

            {/* Statistiques */}
            <div className="flex items-center justify-center bg-orange-900/30 rounded-lg px-4 py-2">
              <span className="text-orange-300 font-semibold">
                {filteredClips.length} clip{filteredClips.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Liste des clips */}
        {filteredClips.length === 0 ? (
          <div className="text-center py-12">
            <FontAwesomeIcon icon={faVideo} className="text-6xl text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">Aucun clip trouvé</h3>
            <p className="text-gray-500">
              {clips?.length === 0 
                ? `Vous n'avez pas encore de clips pour cette ${period === 'day' ? 'journée' : period === 'week' ? 'semaine' : 'mois'}.`
                : "Aucun clip ne correspond à vos critères de recherche."
              }
            </p>
            {clips?.length === 0 && (
              <div className="mt-4">
                <button
                  onClick={() => setPeriod('month')}
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors duration-200"
                >
                  Voir le mois complet
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredClips.map((clip, index) => (
              <div 
                key={clip.id}
                className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <img 
                    src={clip.thumbnail || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMUYyOTM3Ii8+CjxwYXRoIGQ9Ik0xMjggOTBMMTkyIDEyNkwxMjggMTYyVjkwWiIgZmlsbD0iI0ZGNEM0MSIvPgo8L3N2Zz4K'}
                    alt={clip.title}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMUYyOTM3Ii8+CjxwYXRoIGQ9Ik0xMjggOTBMMTkyIDEyNkwxMjggMTYyVjkwWiIgZmlsbD0iI0ZGNEM0MSIvPgo8L3N2Zz4K';
                    }}
                  />
                  
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded-md font-medium backdrop-blur-sm">
                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                    {clip.duration ? `${Math.round(clip.duration)}s` : "N/A"}
                  </div>
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
                    <div className="bg-orange-600/90 text-white rounded-full p-3 backdrop-blur-sm hover:bg-orange-500 transition-colors duration-200">
                      <FontAwesomeIcon icon={faPlay} className="text-lg ml-1" />
                    </div>
                  </div>

                  {/* Badge "Viral" pour les clips populaires */}
                  {(clip.viewCount || 0) > 1000 && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      <FontAwesomeIcon icon={faFire} className="mr-1" />
                      VIRAL
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-orange-300 transition-colors duration-300" 
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '2.5rem'
                      }}>
                    {clip.title}
                  </h3>
                  
                  {/* Creator */}
                  {clip.creatorName && (
                    <div className="flex items-center gap-2 text-xs text-orange-300">
                      <FontAwesomeIcon icon={faUser} />
                      <span>Créé par {clip.creatorName}</span>
                    </div>
                  )}
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-gray-400">
                      <span className="flex items-center gap-1 hover:text-orange-400 transition-colors duration-200">
                        <FontAwesomeIcon icon={faEye} className="text-xs" />
                        <span className="font-medium">
                          {formatNumber(clip.viewCount || 0)}
                        </span>
                      </span>
                    </div>
                    
                    {/* Date */}
                    <span className="text-xs text-gray-500">
                      {new Date(clip.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <a
                      href={clip.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 px-3 bg-orange-600/20 hover:bg-orange-600 text-orange-300 hover:text-white rounded-lg transition-all duration-200 border border-orange-500/30 hover:border-orange-500 text-xs font-medium"
                    >
                      <FontAwesomeIcon icon={faPlay} className="mr-1" />
                      Voir
                    </a>
                    {clip.embedUrl && (
                      <a
                        href={clip.embedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 bg-gray-600/20 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200 border border-gray-500/30 hover:border-gray-500 text-xs"
                      >
                        Embed
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-orange-500/50 transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TwitchClips; 
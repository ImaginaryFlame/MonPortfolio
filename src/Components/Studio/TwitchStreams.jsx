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
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import useTwitchStreams from '../../hooks/useTwitchStreams';

// Configuration
const TWITCH_USERNAME = import.meta.env.VITE_TWITCH_USERNAME || '';

const TwitchStreams = () => {
  const {
    streams,
    userInfo,
    currentStream,
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
    includeClips: false,
    autoLoad: true
  });

  const [filterGame, setFilterGame] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent, views, duration

  // Changer le titre de l'onglet
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.title = "📺 Mes Streams | MonPortfolio - Flame's Studio";
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      document.title = "MonPortfolio - Flamme Créative | Univers Narratifs, Labo Tech & Studio";
    };
  }, []);

  // Filtrer et trier les streams
  const filteredStreams = streams
    ?.filter(stream => {
      if (filterGame && stream.gameName && !stream.gameName.toLowerCase().includes(filterGame.toLowerCase())) {
        return false;
      }
      if (searchTerm && !stream.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return (b.viewCount || 0) - (a.viewCount || 0);
        case 'duration':
          return b.duration?.localeCompare(a.duration) || 0;
        case 'recent':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    }) || [];

  // Obtenir la liste des jeux uniques avec debugging
  const uniqueGames = [...new Set(streams?.map(stream => stream.gameName).filter(Boolean))] || [];
  
  // Ajouter "Juste Discussion" s'il y a des streams sans jeu défini
  const hasStreamsWithoutGame = streams?.some(stream => !stream.gameName || stream.gameName === 'Juste Discussion');
  if (hasStreamsWithoutGame && !uniqueGames.includes('Juste Discussion')) {
    uniqueGames.push('Juste Discussion');
  }
  
  // Debug: log des données pour vérifier les jeux (version simplifiée)
  useEffect(() => {
    if (streams && streams.length > 0) {
      const debugUniqueGames = [...new Set(streams.map(stream => stream.gameName).filter(Boolean))];
      console.log('🎯 Jeux finaux dans UI:', debugUniqueGames);
    }
  }, [streams]);

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
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              📺 MES STREAMS
            </h1>
          </div>

          <div className="bg-purple-900/20 border border-purple-500/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-xl font-bold">Configuration Twitch requise</h2>
            </div>
            <p className="text-gray-300">
              Configurez l'API Twitch dans votre fichier .env pour accéder à vos streams et VODs.
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
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              📺 MES STREAMS
            </h1>
          </div>
          <div className="text-center">
            <div className="animate-pulse text-xl">Chargement des streams...</div>
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
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-pink-500 bg-clip-text text-transparent mb-2">
              📺 MES STREAMS
            </h1>
            <p className="text-gray-300">
              Vos streams en direct et rediffusions ({streams?.length || 0} au total)
            </p>
          </div>
          <button
            onClick={refresh}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Actualiser
          </button>
        </div>

        {/* Statut Live */}
        {isLive && currentStream && (
          <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-500 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCircle} className="text-red-500 animate-pulse" />
                <span className="text-red-400 font-bold text-lg">EN DIRECT MAINTENANT</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{currentStream.title}</h3>
                <p className="text-gray-300">
                  {currentStream.gameName} • {formatNumber(currentStream.viewCount)} viewers
                </p>
              </div>
              <a 
                href={currentStream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors"
              >
                <FontAwesomeIcon icon={faPlay} className="mr-2" />
                Regarder
              </a>
            </div>
          </div>
        )}

        {/* Filtres et recherche */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 backdrop-blur-sm border border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Recherche */}
            <div className="relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un stream..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Filtre par jeu */}
            <div className="relative">
              <FontAwesomeIcon icon={faGamepad} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterGame}
                onChange={(e) => setFilterGame(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none appearance-none"
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
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none appearance-none"
              >
                <option value="recent">Plus récents</option>
                <option value="views">Plus vues</option>
                <option value="duration">Plus longs</option>
              </select>
            </div>

            {/* Statistiques */}
            <div className="flex items-center justify-center bg-purple-900/30 rounded-lg px-4 py-2">
              <span className="text-purple-300 font-semibold">
                {filteredStreams.length} stream{filteredStreams.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Liste des streams */}
        {filteredStreams.length === 0 ? (
          <div className="text-center py-12">
            <FontAwesomeIcon icon={faVideo} className="text-6xl text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">Aucun stream trouvé</h3>
            <p className="text-gray-500">
              {streams?.length === 0 
                ? "Vous n'avez pas encore de streams enregistrés."
                : "Aucun stream ne correspond à vos critères de recherche."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStreams.map((stream, index) => (
              <div 
                key={stream.id}
                className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm"
              >
                {/* Badge Live */}
                {stream.isLive && (
                  <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs px-3 py-1 rounded-full animate-pulse font-bold">
                    <FontAwesomeIcon icon={faCircle} className="mr-1" />
                    LIVE
                  </div>
                )}

                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <img 
                    src={stream.thumbnail || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMUYyOTM3Ii8+CjxwYXRoIGQ9Ik0xMjggOTBMMTkyIDEyNkwxMjggMTYyVjkwWiIgZmlsbD0iIzlENDZGRiIvPgo8L3N2Zz4K'}
                    alt={stream.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMUYyOTM3Ii8+CjxwYXRoIGQ9Ik0xMjggOTBMMTkyIDEyNkwxMjggMTYyVjkwWiIgZmlsbD0iIzlENDZGRiIvPgo8L3N2Zz4K';
                    }}
                  />
                  
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded-md font-medium backdrop-blur-sm">
                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                    {stream.duration || "N/A"}
                  </div>
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
                    <div className="bg-purple-600/90 text-white rounded-full p-4 backdrop-blur-sm hover:bg-purple-500 transition-colors duration-200">
                      <FontAwesomeIcon icon={faPlay} className="text-xl ml-1" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-purple-300 transition-colors duration-300" 
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '2.5rem'
                      }}>
                    {stream.title}
                  </h3>
                  
                  {/* Game - Toujours affiché */}
                  <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-900/20 px-3 py-1.5 rounded-full border border-purple-500/30">
                    <FontAwesomeIcon icon={faGamepad} />
                    <span className="font-medium">{stream.gameName || 'Aucun jeu défini'}</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-gray-400">
                      <span className="flex items-center gap-1 hover:text-purple-400 transition-colors duration-200">
                        <FontAwesomeIcon icon={faEye} className="text-xs" />
                        <span className="font-medium">
                          {formatNumber(stream.viewCount || 0)}
                        </span>
                      </span>
                    </div>
                    
                    {/* Date */}
                    <span className="text-xs text-gray-500">
                      {new Date(stream.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                  
                  {/* Action button */}
                  <a
                    href={stream.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 px-4 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white rounded-lg transition-all duration-200 border border-purple-500/30 hover:border-purple-500"
                  >
                    <FontAwesomeIcon icon={stream.isLive ? faPlay : faVideo} className="mr-2" />
                    {stream.isLive ? 'Regarder Live' : 'Voir VOD'}
                  </a>
                </div>
                
                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-purple-500/50 transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TwitchStreams; 
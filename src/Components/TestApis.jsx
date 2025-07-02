import React, { useState, useEffect } from 'react';
import youtubeAPI from '../services/youtubeAPI';
import twitchAPI from '../services/twitchAPI';

const TestApis = () => {
  const [youtubeStatus, setYoutubeStatus] = useState('non testé');
  const [twitchStatus, setTwitchStatus] = useState('non testé');
  const [youtubeData, setYoutubeData] = useState(null);
  const [twitchData, setTwitchData] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, { message, time: new Date().toLocaleTimeString() }]);
    console.log(message);
  };

  const testYouTube = async () => {
    addLog('🔍 Test YouTube commencé...');
    setYoutubeStatus('test en cours...');
    
    try {
      // Test configuration
      if (!youtubeAPI.isConfigured()) {
        throw new Error('API YouTube non configurée');
      }
      
      const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
      addLog(`📺 Test avec Channel ID: ${channelId}`);
      
      // Test infos chaîne
      const channelInfo = await youtubeAPI.getChannelInfo(channelId);
      addLog(`✅ Chaîne trouvée: ${channelInfo.snippet.title}`);
      
      // Test vidéos
      const videos = await youtubeAPI.getChannelVideos(channelId, 5);
      addLog(`📹 ${videos.videos.length} vidéos récupérées`);
      
      setYoutubeData({
        channel: channelInfo.snippet.title,
        subscribers: channelInfo.statistics.subscriberCount,
        videoCount: channelInfo.statistics.videoCount,
        videos: videos.videos
      });
      
      setYoutubeStatus('✅ Succès');
    } catch (error) {
      addLog(`❌ Erreur YouTube: ${error.message}`);
      setYoutubeStatus('❌ Échec');
    }
  };

  const testTwitch = async () => {
    addLog('🔍 Test Twitch commencé...');
    setTwitchStatus('test en cours...');
    
    try {
      // Test configuration
      if (!twitchAPI.isConfigured()) {
        throw new Error('API Twitch non configurée');
      }
      
      const username = import.meta.env.VITE_TWITCH_USERNAME;
      addLog(`🟣 Test avec Username: ${username}`);
      
      // Test infos utilisateur
      const userInfo = await twitchAPI.getUserInfo(username);
      addLog(`✅ Utilisateur trouvé: ${userInfo.displayName}`);
      
      // Test streams
      const streams = await twitchAPI.getStreams(userInfo.id, { maxResults: 5 });
      addLog(`📺 ${streams.streams.length} streams récupérés`);
      
      setTwitchData({
        user: userInfo.displayName,
        viewCount: userInfo.viewCount,
        broadcasterType: userInfo.broadcasterType,
        streams: streams.streams
      });
      
      setTwitchStatus('✅ Succès');
    } catch (error) {
      addLog(`❌ Erreur Twitch: ${error.message}`);
      setTwitchStatus('❌ Échec');
    }
  };

  useEffect(() => {
    addLog('🚀 Page de test chargée');
    addLog(`YouTube API Key: ${import.meta.env.VITE_YOUTUBE_API_KEY ? 'Configuré' : 'Manquant'}`);
    addLog(`YouTube Channel ID: ${import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'Manquant'}`);
    addLog(`Twitch Client ID: ${import.meta.env.VITE_TWITCH_CLIENT_ID ? 'Configuré' : 'Manquant'}`);
    addLog(`Twitch Username: ${import.meta.env.VITE_TWITCH_USERNAME || 'Manquant'}`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🔧 Test des APIs</h1>
        
        {/* Boutons de test */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">📺 YouTube API</h2>
            <p className="mb-4">Statut: <span className="font-mono">{youtubeStatus}</span></p>
            <button 
              onClick={testYouTube}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              disabled={youtubeStatus === 'test en cours...'}
            >
              Tester YouTube
            </button>
            
            {youtubeData && (
              <div className="mt-4 p-4 bg-gray-700 rounded">
                <h3 className="font-bold">Résultats:</h3>
                <p>Chaîne: {youtubeData.channel}</p>
                <p>Abonnés: {youtubeData.subscribers}</p>
                <p>Vidéos: {youtubeData.videoCount}</p>
                <p>Vidéos récupérées: {youtubeData.videos.length}</p>
              </div>
            )}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🟣 Twitch API</h2>
            <p className="mb-4">Statut: <span className="font-mono">{twitchStatus}</span></p>
            <button 
              onClick={testTwitch}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
              disabled={twitchStatus === 'test en cours...'}
            >
              Tester Twitch
            </button>
            
            {twitchData && (
              <div className="mt-4 p-4 bg-gray-700 rounded">
                <h3 className="font-bold">Résultats:</h3>
                <p>Utilisateur: {twitchData.user}</p>
                <p>Vues totales: {twitchData.viewCount}</p>
                <p>Type: {twitchData.broadcasterType}</p>
                <p>Streams récupérés: {twitchData.streams.length}</p>
              </div>
            )}
          </div>
        </div>

        {/* Logs en temps réel */}
        <div className="bg-black p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">📋 Logs de debug</h2>
          <div className="h-64 overflow-y-auto font-mono text-sm space-y-1">
            {logs.map((log, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-gray-500">[{log.time}]</span>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Variables d'environnement */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">🔧 Configuration actuelle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
            <div>
              <p>VITE_YOUTUBE_API_KEY: {import.meta.env.VITE_YOUTUBE_API_KEY ? '✅ Configuré' : '❌ Manquant'}</p>
              <p>VITE_YOUTUBE_CHANNEL_ID: {import.meta.env.VITE_YOUTUBE_CHANNEL_ID || '❌ Manquant'}</p>
            </div>
            <div>
              <p>VITE_TWITCH_CLIENT_ID: {import.meta.env.VITE_TWITCH_CLIENT_ID ? '✅ Configuré' : '❌ Manquant'}</p>
              <p>VITE_TWITCH_CLIENT_SECRET: {import.meta.env.VITE_TWITCH_CLIENT_SECRET ? '✅ Configuré' : '❌ Manquant'}</p>
              <p>VITE_TWITCH_USERNAME: {import.meta.env.VITE_TWITCH_USERNAME || '❌ Manquant'}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-blue-400 hover:text-blue-300">← Retour à l'accueil</a>
        </div>
      </div>
    </div>
  );
};

export default TestApis; 
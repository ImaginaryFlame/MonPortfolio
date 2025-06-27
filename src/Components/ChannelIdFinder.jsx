import React, { useState } from 'react';
import { findChannelIdFromVideo } from '../utils/findChannelId';

const ChannelIdFinder = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const findChannelId = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    // Afficher les informations de debug
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    setDebugInfo({
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey ? apiKey.length : 0,
      apiKeyPreview: apiKey ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 5)}` : 'Non définie'
    });
    
    try {
      const videoId = 'MU6R-bxXaOg'; // Votre vidéo
      
      // Test direct de l'API YouTube
      const testResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
      );
      
      const testData = await testResponse.json();
      
      if (testData.error) {
        setError(`Erreur API YouTube: ${testData.error.message}`);
        setDebugInfo(prev => ({
          ...prev,
          apiResponse: testData.error
        }));
        return;
      }
      
      if (testData.items && testData.items.length > 0) {
        const channelId = testData.items[0].snippet.channelId;
        const channelTitle = testData.items[0].snippet.channelTitle;
        
        setResult({
          channelId,
          channelTitle
        });
        
        setDebugInfo(prev => ({
          ...prev,
          success: true,
          videoData: testData.items[0]
        }));
      } else {
        setError('Vidéo non trouvée');
      }
      
    } catch (err) {
      setError(`Erreur réseau: ${err.message}`);
      setDebugInfo(prev => ({
        ...prev,
        networkError: err.message
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-8 text-center">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            🔍 Trouveur d'ID de Chaîne YouTube
          </h1>
          
          <p className="text-gray-300 mb-6">
            Votre vidéo : <span className="text-orange-400">MU6R-bxXaOg</span>
          </p>

          {/* Informations de debug */}
          {debugInfo && (
            <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-left">
              <h3 className="text-blue-400 font-bold mb-2">🔧 Informations de debug :</h3>
              <div className="text-sm space-y-1">
                <p>• Clé API trouvée : <span className={debugInfo.hasApiKey ? 'text-green-400' : 'text-red-400'}>
                  {debugInfo.hasApiKey ? '✅ Oui' : '❌ Non'}
                </span></p>
                <p>• Longueur clé API : <span className="text-gray-300">{debugInfo.apiKeyLength} caractères</span></p>
                <p>• Aperçu clé API : <span className="font-mono text-gray-300">{debugInfo.apiKeyPreview}</span></p>
                {debugInfo.apiResponse && (
                  <div className="mt-2 p-2 bg-red-900/30 rounded">
                    <p className="text-red-400">Réponse API : {JSON.stringify(debugInfo.apiResponse, null, 2)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            onClick={findChannelId}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? '🔄 Recherche en cours...' : '🎯 Trouver mon ID de chaîne'}
          </button>

          {error && (
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
              <p className="text-red-400">❌ {error}</p>
              <div className="text-gray-300 text-sm mt-4 text-left">
                <p className="font-bold mb-2">💡 Solutions possibles :</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Vérifiez que l'API YouTube Data v3 est activée dans Google Cloud Console</li>
                  <li>Vérifiez que votre clé API n'a pas de restrictions</li>
                  <li>Créez une nouvelle clé API si nécessaire</li>
                  <li>Redémarrez l'application après modification du .env</li>
                </ol>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-6 p-6 bg-green-900/20 border border-green-500/50 rounded-lg text-left">
              <h3 className="text-xl font-bold text-green-400 mb-4">✅ ID de chaîne trouvé !</h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">📺 Nom de la chaîne :</span>
                  <span className="ml-2 font-bold text-white">{result.channelTitle}</span>
                </div>
                
                <div>
                  <span className="text-gray-400">🔑 ID de la chaîne :</span>
                  <span className="ml-2 font-mono bg-gray-800 px-2 py-1 rounded text-orange-400">
                    {result.channelId}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">📋 Ajoutez ceci dans votre fichier .env :</p>
                <code className="block bg-black/50 p-3 rounded text-green-400 text-sm">
                  REACT_APP_YOUTUBE_API_KEY=AIzaSyCZaCS5fQbai7pEbbZYq5-yJuNW6W8SSnI<br/>
                  REACT_APP_YOUTUBE_CHANNEL_ID={result.channelId}
                </code>
              </div>

              <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-blue-300 text-sm">
                  💡 Une fois ajouté dans .env, redémarrez l'application et allez sur /creation/studio/video
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Composant temporaire - Supprimez ce fichier une fois l'ID trouvé
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChannelIdFinder; 
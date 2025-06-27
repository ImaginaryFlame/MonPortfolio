// Utilitaire pour trouver l'ID de chaîne depuis une vidéo
export const findChannelIdFromVideo = async (videoId) => {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  
  if (!apiKey) {
    console.error('Clé API YouTube manquante');
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );
    
    const data = await response.json();
    
    if (data.error) {
      console.error('Erreur API YouTube:', data.error.message);
      return null;
    }
    
    if (data.items && data.items.length > 0) {
      const channelId = data.items[0].snippet.channelId;
      const channelTitle = data.items[0].snippet.channelTitle;
      
      console.log('🎯 ID de chaîne trouvé !');
      console.log('📺 Nom de la chaîne:', channelTitle);
      console.log('🔑 ID de la chaîne:', channelId);
      console.log('📋 Ajoutez ceci dans votre .env :');
      console.log(`REACT_APP_YOUTUBE_CHANNEL_ID=${channelId}`);
      
      return {
        channelId,
        channelTitle
      };
    }
    
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    return null;
  }
};

// Fonction à utiliser dans la console du navigateur
window.findMyChannelId = () => {
  const videoId = 'MU6R-bxXaOg'; // Votre vidéo
  findChannelIdFromVideo(videoId);
}; 
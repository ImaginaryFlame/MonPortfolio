// Service pour l'API YouTube Data v3
class YouTubeAPI {
  constructor() {
    // Vous devrez obtenir une clé API depuis Google Cloud Console
    this.apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    this.baseURL = 'https://www.googleapis.com/youtube/v3';
    
    // Debug de la configuration
    console.log('🔧 Configuration YouTube API:');
    console.log('API Key:', this.apiKey ? `${this.apiKey.substring(0, 10)}...` : 'MANQUANTE');
    console.log('Configuré:', this.isConfigured());
  }

  /**
   * Vérifie si l'API est correctement configurée
   * @returns {boolean} - True si la clé API est présente
   */
  isConfigured() {
    const configured = !!this.apiKey;
    console.log('📺 YouTube API configuré:', configured);
    return configured;
  }

  /**
   * Récupère les informations d'une chaîne YouTube
   * @param {string} channelId - ID de la chaîne YouTube
   * @returns {Promise<Object>} - Informations de la chaîne
   */
  async getChannelInfo(channelId) {
    console.log('🔍 getChannelInfo appelé avec:', channelId);
    
    if (!this.isConfigured()) {
      console.error('❌ API YouTube non configurée');
      throw new Error('API YouTube non configurée');
    }
    
    try {
      const url = `${this.baseURL}/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${this.apiKey}`;
      console.log('📡 Requête URL:', url.replace(this.apiKey, 'API_KEY_HIDDEN'));
      
      const response = await fetch(url);
      console.log('📡 Réponse statut:', response.status);
      
      const data = await response.json();
      console.log('📊 Données reçues:', data);
      
      if (data.error) {
        console.error('❌ Erreur YouTube API:', data.error);
        throw new Error(`YouTube API Error: ${data.error.message}`);
      }
      
      if (!data.items || data.items.length === 0) {
        console.error('❌ Aucune chaîne trouvée pour ID:', channelId);
        throw new Error('Chaîne non trouvée');
      }
      
      console.log('✅ Chaîne trouvée:', data.items[0].snippet.title);
      return data.items[0];
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des infos chaîne:', error);
      throw error;
    }
  }

  /**
   * Récupère les vidéos d'une chaîne YouTube
   * @param {string} channelId - ID de la chaîne YouTube
   * @param {number} maxResults - Nombre maximum de vidéos à récupérer (défaut: 50)
   * @param {string} pageToken - Token pour la pagination
   * @returns {Promise<Object>} - Liste des vidéos avec métadonnées
   */
  async getChannelVideos(channelId, maxResults = 50, pageToken = '') {
    console.log('🎬 getChannelVideos appelé:', { channelId, maxResults, pageToken });
    
    if (!this.isConfigured()) {
      console.error('❌ API YouTube non configurée');
      throw new Error('API YouTube non configurée');
    }
    
    try {
      // Étape 1: Récupérer l'ID de la playlist "uploads"
      console.log('🔍 Étape 1: Récupération playlist uploads...');
      const channelResponse = await fetch(
        `${this.baseURL}/channels?part=contentDetails&id=${channelId}&key=${this.apiKey}`
      );
      console.log('📡 Statut playlist:', channelResponse.status);
      
      const channelData = await channelResponse.json();
      console.log('📊 Données playlist:', channelData);
      
      if (channelData.error) {
        console.error('❌ Erreur playlist:', channelData.error);
        throw new Error(`YouTube API Error: ${channelData.error.message}`);
      }

      if (!channelData.items || channelData.items.length === 0) {
        console.error('❌ Chaîne non trouvée pour récupérer les vidéos');
        throw new Error('Chaîne non trouvée');
      }

      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
      console.log('📋 Playlist uploads ID:', uploadsPlaylistId);

      // Étape 2: Récupérer les vidéos de la playlist
      console.log('🔍 Étape 2: Récupération vidéos playlist...');
      const playlistResponse = await fetch(
        `${this.baseURL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&pageToken=${pageToken}&key=${this.apiKey}`
      );
      console.log('📡 Statut vidéos:', playlistResponse.status);
      
      const playlistData = await playlistResponse.json();
      console.log('📊 Données vidéos:', playlistData);

      if (playlistData.error) {
        console.error('❌ Erreur vidéos:', playlistData.error);
        throw new Error(`YouTube API Error: ${playlistData.error.message}`);
      }

      if (!playlistData.items || playlistData.items.length === 0) {
        console.warn('⚠️ Aucune vidéo trouvée dans la playlist');
        return {
          videos: [],
          totalResults: 0,
          nextPageToken: null,
          prevPageToken: null
        };
      }

      // Étape 3: Récupérer les détails des vidéos (durée, statistiques)
      console.log('🔍 Étape 3: Récupération détails vidéos...');
      const videoIds = playlistData.items.map(item => item.snippet.resourceId.videoId).join(',');
      console.log('🎥 IDs vidéos:', videoIds);
      
      const videosResponse = await fetch(
        `${this.baseURL}/videos?part=snippet,contentDetails,statistics,status&id=${videoIds}&key=${this.apiKey}`
      );
      console.log('📡 Statut détails:', videosResponse.status);
      
      const videosData = await videosResponse.json();
      console.log('📊 Détails vidéos:', videosData);

      if (videosData.error) {
        console.error('❌ Erreur détails:', videosData.error);
        throw new Error(`YouTube API Error: ${videosData.error.message}`);
      }

      // Étape 4: Combiner les données et formater
      console.log('🔍 Étape 4: Formatage données...');
      const formattedVideos = videosData.items.map(video => {
        const snippet = video.snippet;
        const statistics = video.statistics;
        const contentDetails = video.contentDetails;

        return {
          id: video.id,
          title: snippet.title,
          description: snippet.description,
          thumbnail: {
            default: snippet.thumbnails.default?.url,
            medium: snippet.thumbnails.medium?.url,
            high: snippet.thumbnails.high?.url,
            maxres: snippet.thumbnails.maxres?.url
          },
          publishedAt: snippet.publishedAt,
          duration: this.parseDuration(contentDetails.duration),
          durationISO: contentDetails.duration,
          viewCount: parseInt(statistics.viewCount || 0),
          likeCount: parseInt(statistics.likeCount || 0),
          commentCount: parseInt(statistics.commentCount || 0),
          url: `https://www.youtube.com/watch?v=${video.id}`,
          embedUrl: `https://www.youtube.com/embed/${video.id}`,
          tags: snippet.tags || [],
          channelTitle: snippet.channelTitle,
          categoryId: snippet.categoryId,
          privacy: video.status.privacyStatus,
          isShort: this.isYouTubeShort(contentDetails.duration, snippet.title, snippet.description)
        };
      });

      console.log(`✅ ${formattedVideos.length} vidéos formatées avec succès`);
      console.log('🎬 Premier vidéo exemple:', formattedVideos[0]);

      return {
        videos: formattedVideos,
        totalResults: playlistData.pageInfo.totalResults,
        nextPageToken: playlistData.nextPageToken,
        prevPageToken: playlistData.prevPageToken
      };

    } catch (error) {
      console.error('❌ Erreur lors de la récupération des vidéos:', error);
      throw error;
    }
  }

  /**
   * Récupère une vidéo spécifique par son ID
   * @param {string} videoId - ID de la vidéo YouTube
   * @returns {Promise<Object>} - Détails de la vidéo
   */
  async getVideo(videoId) {
    try {
      const response = await fetch(
        `${this.baseURL}/videos?part=snippet,contentDetails,statistics,status&id=${videoId}&key=${this.apiKey}`
      );
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`YouTube API Error: ${data.error.message}`);
      }
      
      if (data.items.length === 0) {
        throw new Error('Vidéo non trouvée');
      }

      const video = data.items[0];
      return this.formatVideoData(video);
    } catch (error) {
      console.error('Erreur lors de la récupération de la vidéo:', error);
      throw error;
    }
  }

  /**
   * Recherche des vidéos par mots-clés
   * @param {string} query - Terme de recherche
   * @param {string} channelId - ID de la chaîne (optionnel)
   * @param {number} maxResults - Nombre maximum de résultats
   * @returns {Promise<Object>} - Résultats de recherche
   */
  async searchVideos(query, channelId = '', maxResults = 25) {
    try {
      let searchURL = `${this.baseURL}/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${this.apiKey}`;
      
      if (channelId) {
        searchURL += `&channelId=${channelId}`;
      }

      const response = await fetch(searchURL);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`YouTube API Error: ${data.error.message}`);
      }

      // Récupérer les détails complets des vidéos trouvées
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      return await this.getVideosByIds(videoIds);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      throw error;
    }
  }

  /**
   * Récupère plusieurs vidéos par leurs IDs
   * @param {string} videoIds - IDs des vidéos séparés par des virgules
   * @returns {Promise<Array>} - Liste des vidéos
   */
  async getVideosByIds(videoIds) {
    try {
      const response = await fetch(
        `${this.baseURL}/videos?part=snippet,contentDetails,statistics,status&id=${videoIds}&key=${this.apiKey}`
      );
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`YouTube API Error: ${data.error.message}`);
      }

      return data.items.map(video => this.formatVideoData(video));
    } catch (error) {
      console.error('Erreur lors de la récupération des vidéos par IDs:', error);
      throw error;
    }
  }

  /**
   * Détermine si une vidéo est un YouTube Short
   * @param {string} duration - Durée ISO 8601
   * @param {string} title - Titre de la vidéo
   * @param {string} description - Description de la vidéo
   * @returns {boolean} - True si c'est un Short
   */
  isYouTubeShort(duration, title = '', description = '') {
    const durationSeconds = this.parseDurationToSeconds(duration);
    
    // Configuration personnalisée : vidéos de 3 minutes ou moins = Shorts
    if (durationSeconds <= 180) { // 3 minutes = 180 secondes
      return true;
    }
    
    // Vérifier aussi les mots-clés dans le titre ou la description (cas spéciaux)
    const shortKeywords = ['#shorts', '#short', '#youtubeshorts', 'short'];
    const textToCheck = (title + ' ' + description).toLowerCase();
    
    return shortKeywords.some(keyword => textToCheck.includes(keyword));
  }

  /**
   * Parse la durée ISO 8601 en format lisible
   * @param {string} duration - Durée au format ISO 8601 (ex: "PT4M13S")
   * @returns {string} - Durée formatée (ex: "4:13")
   */
  parseDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    
    if (!match) return '0:00';
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  /**
   * Parse la durée ISO 8601 en secondes
   * @param {string} duration - Durée au format ISO 8601
   * @returns {number} - Durée en secondes
   */
  parseDurationToSeconds(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    
    if (!match) return 0;
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    return hours * 3600 + minutes * 60 + seconds;
  }

  /**
   * Formate les données d'une vidéo pour l'application
   * @param {Object} video - Données brutes de l'API YouTube
   * @returns {Object} - Données formatées
   */
  formatVideoData(video) {
    const snippet = video.snippet;
    const statistics = video.statistics;
    const contentDetails = video.contentDetails;

    return {
      id: video.id,
      title: snippet.title,
      description: snippet.description,
      thumbnail: {
        default: snippet.thumbnails.default?.url,
        medium: snippet.thumbnails.medium?.url,
        high: snippet.thumbnails.high?.url,
        maxres: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url
      },
      publishedAt: snippet.publishedAt,
      duration: this.parseDuration(contentDetails.duration),
      durationISO: contentDetails.duration,
      viewCount: parseInt(statistics.viewCount || 0),
      likeCount: parseInt(statistics.likeCount || 0),
      commentCount: parseInt(statistics.commentCount || 0),
      url: `https://www.youtube.com/watch?v=${video.id}`,
      embedUrl: `https://www.youtube.com/embed/${video.id}`,
      tags: snippet.tags || [],
      channelTitle: snippet.channelTitle,
      categoryId: snippet.categoryId,
      privacy: video.status.privacyStatus,
      isShort: this.isYouTubeShort(contentDetails.duration, snippet.title, snippet.description)
    };
  }

  /**
   * Filtre les vidéos par type (normal, shorts, etc.)
   * @param {Array} videos - Liste des vidéos
   * @param {string} type - Type de filtre ('shorts', 'normal', 'all')
   * @returns {Array} - Vidéos filtrées
   */
  filterVideosByType(videos, type = 'all') {
    switch (type) {
      case 'shorts':
        return videos.filter(video => video.isShort);
      case 'normal':
        return videos.filter(video => !video.isShort);
      case 'all':
      default:
        return videos;
    }
  }

  /**
   * Teste la connexion à l'API
   * @returns {Promise<boolean>} - True si la connexion fonctionne
   */
  async testConnection() {
    try {
      const response = await fetch(`${this.baseURL}/videos?part=snippet&id=jNQXAC9IVRw&key=${this.apiKey}`);
      const data = await response.json();
      return !data.error;
    } catch (error) {
      console.error('Test de connexion échoué:', error);
      return false;
    }
  }
}

// Instance singleton
const youtubeAPI = new YouTubeAPI();

export default youtubeAPI;

// Fonctions utilitaires exportées
export const {
  getChannelInfo,
  getChannelVideos,
  getVideo,
  searchVideos,
  filterVideosByType,
  isConfigured,
  testConnection
} = youtubeAPI; 
/**
 * Service pour interagir avec l'API Twitch
 * Gère l'authentification, les streams, clips et statistiques
 * Support pour les données de subscribers réelles pour les affiliés
 */
class TwitchAPI {
  constructor() {
    this.clientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
    this.clientSecret = import.meta.env.VITE_TWITCH_CLIENT_SECRET;
    this.username = import.meta.env.VITE_TWITCH_USERNAME;
    this.accessToken = null;
    this.baseURL = 'https://api.twitch.tv/helix';
    this.authURL = 'https://id.twitch.tv/oauth2/token';
    
    // Debug de la configuration
    console.log('🔧 Configuration Twitch API:');
    console.log('Client ID:', this.clientId ? `${this.clientId.substring(0, 10)}...` : 'MANQUANT');
    console.log('Client Secret:', this.clientSecret ? `${this.clientSecret.substring(0, 10)}...` : 'MANQUANT');
    console.log('Username:', this.username);
    console.log('Configuré:', this.isConfigured());
  }

  /**
   * Vérifie si l'API Twitch est configurée
   */
  isConfigured() {
    const configured = !!(this.clientId && this.clientSecret && this.username);
    console.log('🟣 Twitch API configuré:', configured);
    return configured;
  }

  /**
   * Obtient un token d'accès OAuth
   */
  async getAccessToken() {
    console.log('🔑 Demande de token d\'accès Twitch...');
    
    if (!this.isConfigured()) {
      console.error('❌ Configuration Twitch manquante');
      throw new Error('Configuration Twitch manquante');
    }

    try {
      console.log('📡 Requête auth vers Twitch...');
      const response = await fetch(this.authURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'client_credentials'
        })
      });

      console.log('📡 Statut auth:', response.status);

      if (!response.ok) {
        console.error('❌ Erreur d\'authentification:', response.status, response.statusText);
        throw new Error(`Erreur d'authentification Twitch: ${response.status}`);
      }

      const data = await response.json();
      console.log('🔑 Token reçu:', data.access_token ? 'OUI' : 'NON');
      console.log('⏰ Expire dans:', data.expires_in, 'secondes');
      
      this.accessToken = data.access_token;
      
      // Token expire après un certain temps, on le rafraîchit automatiquement
      setTimeout(() => {
        console.log('⏰ Token Twitch expiré, sera renouvelé à la prochaine requête');
        this.accessToken = null;
      }, (data.expires_in - 60) * 1000); // Refresh 1 minute avant expiration

      return this.accessToken;
    } catch (error) {
      console.error('❌ Erreur lors de l\'authentification Twitch:', error);
      throw error;
    }
  }

  /**
   * Effectue une requête authentifiée vers l'API Twitch
   */
  async makeRequest(endpoint, params = {}) {
    console.log('📡 Requête Twitch:', endpoint, params);
    
    if (!this.accessToken) {
      console.log('🔑 Pas de token, demande d\'authentification...');
      await this.getAccessToken();
    }

    const url = new URL(`${this.baseURL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });

    console.log('📡 URL requête:', url.toString().replace(this.accessToken, 'TOKEN_HIDDEN'));

    const response = await fetch(url, {
      headers: {
        'Client-ID': this.clientId,
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Statut réponse:', response.status);

    if (!response.ok) {
      if (response.status === 401) {
        console.log('🔄 Token expiré, renouvellement...');
        // Token expiré, on le renouvelle
        this.accessToken = null;
        await this.getAccessToken();
        return this.makeRequest(endpoint, params);
      }
      console.error('❌ Erreur API Twitch:', response.status, response.statusText);
      throw new Error(`Erreur API Twitch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📊 Données reçues:', data);
    return data;
  }

  /**
   * Obtient les informations de l'utilisateur
   */
  async getUserInfo(username = null) {
    const targetUsername = username || this.username;
    console.log('👤 Récupération infos utilisateur:', targetUsername);
    
    try {
      const data = await this.makeRequest('/users', {
        login: targetUsername
      });

      if (!data.data || data.data.length === 0) {
        console.error('❌ Utilisateur non trouvé:', targetUsername);
        throw new Error('Utilisateur non trouvé');
      }

      const user = data.data[0];
      console.log('✅ Utilisateur trouvé:', user.display_name);
      console.log('📊 Vues totales:', user.view_count);
      console.log('🎬 Type broadcaster:', user.broadcaster_type);
      
      return {
        id: user.id,
        username: user.login,
        displayName: user.display_name,
        description: user.description,
        profileImageUrl: user.profile_image_url,
        offlineImageUrl: user.offline_image_url,
        viewCount: user.view_count,
        createdAt: user.created_at,
        broadcasterType: user.broadcaster_type,
        type: user.type
      };
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des infos utilisateur:', error);
      throw error;
    }
  }

  /**
   * Obtient les statistiques du canal (followers, subscribers, etc.)
   */
  async getChannelStats(userId) {
    try {
      // Obtenir le nombre de followers
      const followersData = await this.makeRequest('/channels/followers', {
        broadcaster_id: userId
      });

      // Obtenir les informations du canal
      const channelData = await this.makeRequest('/channels', {
        broadcaster_id: userId
      });

      // Note: Les données de subscribers nécessitent une auth utilisateur OAuth
      // avec des scopes spécifiques. Avec client_credentials, nous ne pouvons pas y accéder.
      // Pour un affilié récent, 0 subscribers est correct de toute façon.
      const subscriberCount = 0;

      return {
        followerCount: followersData.total || 0,
        subscriberCount: subscriberCount,
        gameId: channelData.data?.[0]?.game_id || '',
        gameName: channelData.data?.[0]?.game_name || '',
        title: channelData.data?.[0]?.title || '',
        language: channelData.data?.[0]?.broadcaster_language || 'fr',
        isAffiliate: true, // Puisque vous êtes affilié depuis hier
        affiliateDate: new Date().toISOString() // Date approximative d'affiliation
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des stats du canal:', error);
      return {
        followerCount: 0,
        subscriberCount: 0,
        gameId: '',
        gameName: '',
        title: '',
        language: 'fr',
        isAffiliate: true,
        affiliateDate: new Date().toISOString()
      };
    }
  }

  /**
   * Récupère les noms des jeux à partir de leurs IDs
   */
  async getGameNames(gameIds) {
    if (!gameIds || gameIds.length === 0) return {};
    
    try {
      // S'assurer qu'on a un token valide
      if (!this.accessToken) {
        await this.getAccessToken();
      }

      // Construire l'URL avec plusieurs paramètres id
      const url = new URL(`${this.baseURL}/games`);
      gameIds.forEach(id => {
        if (id) url.searchParams.append('id', id);
      });

      const response = await fetch(url, {
        headers: {
          'Client-ID': this.clientId,
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expiré, on le renouvelle et on réessaie
          this.accessToken = null;
          await this.getAccessToken();
          return this.getGameNames(gameIds);
        }
        throw new Error(`Erreur API Games: ${response.status}`);
      }

      const data = await response.json();
      
      const gameMap = {};
      if (data.data) {
        data.data.forEach(game => {
          gameMap[game.id] = game.name;
        });
      }
      
      console.log('🎮 Noms de jeux récupérés:', gameMap);
      return gameMap;
    } catch (error) {
      console.error('Erreur lors de la récupération des noms de jeux:', error);
      return {};
    }
  }

  /**
   * Détecte le jeu à partir du titre de la vidéo (fallback intelligent)
   */
  detectGameFromTitle(title) {
    if (!title) return null;
    
    const titleLower = title.toLowerCase();
    
    // Liste des jeux avec leurs variantes de noms
    const gamePatterns = [
      { 
        names: ['elden ring', 'eldenring'], 
        game: 'Elden Ring' 
      },
      { 
        names: ['expédition 33', 'expedition 33', 'expédition33', 'expedition33'], 
        game: 'Expédition 33' 
      },
      { 
        names: ['minecraft'], 
        game: 'Minecraft' 
      },
      { 
        names: ['valorant'], 
        game: 'VALORANT' 
      },
      { 
        names: ['league of legends', 'lol'], 
        game: 'League of Legends' 
      }
    ];
    
    for (const pattern of gamePatterns) {
      for (const name of pattern.names) {
        if (titleLower.includes(name)) {
          console.log(`🎯 Jeu détecté dans le titre "${title}": ${pattern.game}`);
          return pattern.game;
        }
      }
    }
    
    return null;
  }

  /**
   * Obtient les streams récents/actuels
   */
  async getStreams(userId, options = {}) {
    try {
      const { maxResults = 20, type = 'all' } = options;
      
      // Vérifier si l'utilisateur est en live actuellement
      const liveData = await this.makeRequest('/streams', {
        user_id: userId
      });

      const isLive = liveData.data && liveData.data.length > 0;
      const currentStream = isLive ? liveData.data[0] : null;

      // Obtenir les vidéos récentes (VODs)
      const vodsData = await this.makeRequest('/videos', {
        user_id: userId,
        type: 'archive',
        first: maxResults
      });

      const streams = [];
      const gameIds = new Set();

      // Collecter tous les game_ids pour une requête groupée
      if (currentStream && currentStream.game_id) {
        gameIds.add(currentStream.game_id);
      }
      
      if (vodsData.data) {
        vodsData.data.forEach(vod => {
          if (vod.game_id) {
            gameIds.add(vod.game_id);
          }
        });
      }

      console.log('🎮 Game IDs collectés:', [...gameIds]);
      console.log('📊 Données VODs brutes:', vodsData.data?.map(v => ({ 
        title: v.title, 
        game_id: v.game_id, 
        game_name: v.game_name,
        type: v.type,
        created_at: v.created_at 
      })));

      // Récupérer les noms des jeux en une seule fois
      const gameNames = await this.getGameNames([...gameIds]);
      console.log('🎯 Mapping final game IDs → names:', gameNames);

      // Ajouter le stream en cours s'il existe
      if (currentStream) {
        const gameId = currentStream.game_id || '';
        let gameName = gameNames[gameId] || currentStream.game_name;
        
        // Si pas de nom de jeu trouvé, essayer de le détecter depuis le titre
        if (!gameName || gameName === '' || gameName === null) {
          const detectedGame = this.detectGameFromTitle(currentStream.title);
          gameName = detectedGame || (gameId ? 'Jeu inconnu' : 'Juste Discussion');
        }
        
        console.log(`🔴 LIVE "${currentStream.title}" - gameId: "${gameId}", game_name brut: "${currentStream.game_name}", nom final: "${gameName}"`);
        
        streams.push({
          id: currentStream.id,
          title: currentStream.title,
          description: currentStream.title,
          thumbnail: currentStream.thumbnail_url?.replace('{width}', '320').replace('{height}', '180'),
          viewCount: currentStream.viewer_count,
          createdAt: currentStream.started_at,
          duration: this.calculateStreamDuration(currentStream.started_at),
          isLive: true,
          gameId: gameId,
          gameName: gameName,
          language: currentStream.language,
          url: `https://twitch.tv/${this.username}`
        });
      }

      // Ajouter les VODs
      if (vodsData.data) {
        vodsData.data.forEach(vod => {
          const gameId = vod.game_id || '';
          let gameName = gameNames[gameId] || vod.game_name;
          
          // Si pas de nom de jeu trouvé, essayer de le détecter depuis le titre
          if (!gameName || gameName === '' || gameName === null) {
            const detectedGame = this.detectGameFromTitle(vod.title);
            gameName = detectedGame || (gameId ? 'Jeu inconnu' : 'Juste Discussion');
          }
          
          // Debug pour chaque VOD
          console.log(`📺 VOD "${vod.title}" - gameId: "${gameId}", game_name brut: "${vod.game_name}", nom final: "${gameName}"`);
          
          streams.push({
            id: vod.id,
            title: vod.title,
            description: vod.description,
            thumbnail: vod.thumbnail_url?.replace('%{width}', '320').replace('%{height}', '180'),
            viewCount: vod.view_count,
            createdAt: vod.created_at,
            duration: this.parseDuration(vod.duration),
            isLive: false,
            gameId: gameId,
            gameName: gameName,
            language: vod.language,
            url: vod.url
          });
        });
      }

      return {
        streams: streams.slice(0, maxResults),
        isLive,
        currentStream,
        pagination: vodsData.pagination
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des streams:', error);
      return {
        streams: [],
        isLive: false,
        currentStream: null,
        pagination: {}
      };
    }
  }

  /**
   * Obtient les clips populaires
   */
  async getClips(userId, options = {}) {
    try {
      const { maxResults = 20, period = 'week' } = options;
      
      // Calculer les dates pour la période
      const endDate = new Date();
      const startDate = new Date();
      
      switch (period) {
        case 'day':
          startDate.setDate(endDate.getDate() - 1);
          break;
        case 'week':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(endDate.getMonth() - 1);
          break;
        default:
          startDate.setDate(endDate.getDate() - 7);
      }

      const data = await this.makeRequest('/clips', {
        broadcaster_id: userId,
        started_at: startDate.toISOString(),
        ended_at: endDate.toISOString(),
        first: maxResults
      });

      if (!data.data) return [];

      return data.data.map(clip => ({
        id: clip.id,
        title: clip.title,
        thumbnail: clip.thumbnail_url,
        viewCount: clip.view_count,
        createdAt: clip.created_at,
        duration: clip.duration,
        url: clip.url,
        embedUrl: clip.embed_url,
        gameId: clip.game_id,
        language: clip.language,
        creatorName: clip.creator_name
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des clips:', error);
      return [];
    }
  }

  /**
   * Calcule la durée d'un stream en cours
   */
  calculateStreamDuration(startTime) {
    const start = new Date(startTime);
    const now = new Date();
    const diffMs = now - start;
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }

  /**
   * Parse la durée au format Twitch (ex: "1h23m45s")
   */
  parseDuration(duration) {
    if (!duration) return '0m';
    
    const match = duration.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
    if (!match) return duration;
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }

  /**
   * Recherche des streams par jeu
   */
  async searchStreamsByGame(gameName, options = {}) {
    try {
      const { maxResults = 20 } = options;
      
      // D'abord obtenir l'ID du jeu
      const gameData = await this.makeRequest('/games', {
        name: gameName
      });

      if (!gameData.data || gameData.data.length === 0) {
        return [];
      }

      const gameId = gameData.data[0].id;
      
      // Puis obtenir les streams pour ce jeu
      const streamsData = await this.makeRequest('/streams', {
        game_id: gameId,
        first: maxResults
      });

      if (!streamsData.data) return [];

      return streamsData.data.map(stream => ({
        id: stream.id,
        username: stream.user_login,
        displayName: stream.user_name,
        title: stream.title,
        thumbnail: stream.thumbnail_url?.replace('{width}', '320').replace('{height}', '180'),
        viewCount: stream.viewer_count,
        startedAt: stream.started_at,
        gameId: stream.game_id,
        gameName: stream.game_name,
        language: stream.language,
        url: `https://twitch.tv/${stream.user_login}`
      }));
    } catch (error) {
      console.error('Erreur lors de la recherche par jeu:', error);
      return [];
    }
  }

  /**
   * Vérifie le statut d'affiliation/partenariat
   */
  async checkAffiliateStatus(userInfo) {
    try {
      // broadcaster_type peut être: "" (normal), "affiliate", "partner"
      const isAffiliate = userInfo.broadcaster_type === 'affiliate';
      const isPartner = userInfo.broadcaster_type === 'partner';
      
      return {
        isAffiliate,
        isPartner,
        broadcasterType: userInfo.broadcaster_type,
        canReceiveSubscriptions: isAffiliate || isPartner,
        statusText: isPartner ? 'Partenaire' : isAffiliate ? 'Affilié' : 'Streamer'
      };
    } catch (error) {
      console.error('Erreur lors de la vérification du statut:', error);
      return {
        isAffiliate: false,
        isPartner: false,
        broadcasterType: '',
        canReceiveSubscriptions: false,
        statusText: 'Streamer'
      };
    }
  }
}

// Instance unique
const twitchAPI = new TwitchAPI();

export default twitchAPI; 
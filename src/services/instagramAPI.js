/**
 * Service Instagram pour récupérer les photos d'un compte
 * Note: L'Instagram Basic Display API sera dépréciée en décembre 2024
 * Cette implémentation utilise une approche hybride avec fallback
 */

class InstagramAPI {
  constructor() {
    this.baseURL = 'https://graph.instagram.com';
    this.accessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
    this.username = 'iflamedrawings';
    
    // Photos de fallback en cas d'échec de l'API - Collection complète
    this.fallbackPhotos = [
      // Janvier 2024 - Débuts et premières explorations
      {
        id: 'fallback_1',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_1.jpg',
        caption: 'Premier croquis de l\'année 💪 Étude de personnage pour développer mon style',
        timestamp: '2024-01-05T09:00:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_1_thumb.jpg'
      },
      {
        id: 'fallback_2',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_2.jpg',
        caption: 'Portrait traditionnel - Encre et aquarelle. Toujours en apprentissage ! #progression',
        timestamp: '2024-01-12T15:30:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_2_thumb.jpg'
      },
      {
        id: 'fallback_3',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_3.jpg',
        caption: 'Étude de mains - Crayon graphite. Les mains, éternel défi ! ✋',
        timestamp: '2024-01-18T10:45:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_3_thumb.jpg'
      },
      {
        id: 'fallback_4',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_4.jpg',
        caption: 'Character design - Exploration de Travis, héros de mon univers narratif 🔥',
        timestamp: '2024-01-25T14:20:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_4_thumb.jpg'
      },

      // Février 2024 - Approfondissement technique
      {
        id: 'fallback_5',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_5.jpg',
        caption: 'Anatomie et proportions - Étude approfondie. Back to basics ! 📚',
        timestamp: '2024-02-02T16:10:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_5_thumb.jpg'
      },
      {
        id: 'fallback_6',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_6.jpg',
        caption: 'Expressions faciales - 50 expressions en 30 minutes challenge ! 😤',
        timestamp: '2024-02-08T11:30:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_6_thumb.jpg'
      },
      {
        id: 'fallback_7',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_7.jpg',
        caption: 'Étude de lumière et ombres - Fusain sur papier. Jeu d\'ombres et de mystère ⚫',
        timestamp: '2024-02-14T13:45:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_7_thumb.jpg'
      },
      {
        id: 'fallback_8',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_8.jpg',
        caption: 'Perspective à 2 points - Architecture de Vesontio, ma ville imaginaire 🏛️',
        timestamp: '2024-02-20T17:00:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_8_thumb.jpg'
      },
      {
        id: 'fallback_9',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_9.jpg',
        caption: 'Créature fantastique - Premier design pour mon bestiaire 🐉',
        timestamp: '2024-02-26T12:15:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_9_thumb.jpg'
      },

      // Mars 2024 - Exploration stylistique
      {
        id: 'fallback_10',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_10.jpg',
        caption: 'Étude de mouvement - Poses dynamiques au crayon. L\'action en mouvement ! ⚡',
        timestamp: '2024-03-05T08:30:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_10_thumb.jpg'
      },
      {
        id: 'fallback_11',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_11.jpg',
        caption: 'Portrait en contre-plongée - Jeu de perspective et de force 💪',
        timestamp: '2024-03-12T14:45:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_11_thumb.jpg'
      },
      {
        id: 'fallback_12',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_12.jpg',
        caption: 'Études de textiles - Plis et matières. Le défi du réalisme ! 👕',
        timestamp: '2024-03-18T16:20:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_12_thumb.jpg'
      },
      {
        id: 'fallback_13',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_13.jpg',
        caption: 'Croquis urbain - Café de Besançon. Art de l\'observation 🏙️',
        timestamp: '2024-03-24T10:00:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_13_thumb.jpg'
      },
      {
        id: 'fallback_14',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_14.jpg',
        caption: 'Character turnaround - Vue 360° d\'un personnage secondaire 🔄',
        timestamp: '2024-03-30T13:15:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_14_thumb.jpg'
      },

      // Avril 2024 - Maîtrise progressive
      {
        id: 'fallback_15',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_15.jpg',
        caption: 'Étude botanique - Nature et détails. Retour aux sources 🌿',
        timestamp: '2024-04-06T11:40:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_15_thumb.jpg'
      },
      {
        id: 'fallback_16',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_16.jpg',
        caption: 'Composition narrativa - Storyboard pour une séquence d\'action 🎬',
        timestamp: '2024-04-12T15:25:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_16_thumb.jpg'
      },
      {
        id: 'fallback_17',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_17.jpg',
        caption: 'Étude de véhicule - Design futuriste pour mon univers sci-fi 🚗',
        timestamp: '2024-04-18T09:10:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_17_thumb.jpg'
      },
      {
        id: 'fallback_18',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_18.jpg',
        caption: 'Portrait émotionnel - Capture de la mélancolie. L\'âme en dessin 😢',
        timestamp: '2024-04-25T14:50:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_18_thumb.jpg'
      },

      // Mai 2024 - Expérimentation avancée
      {
        id: 'fallback_19',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_19.jpg',
        caption: 'Technique mixte - Encre + aquarelle + pastels. Fusion des médiums ! 🎨',
        timestamp: '2024-05-03T12:35:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_19_thumb.jpg'
      },
      {
        id: 'fallback_20',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_20.jpg',
        caption: 'Environnement épique - Paysage montagneux avec citadelle 🏔️',
        timestamp: '2024-05-10T16:15:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_20_thumb.jpg'
      },
      {
        id: 'fallback_21',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_21.jpg',
        caption: 'Gestuelle explosive - Combat au corps à corps. Énergie pure ! 💥',
        timestamp: '2024-05-16T10:20:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_21_thumb.jpg'
      },
      {
        id: 'fallback_22',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_22.jpg',
        caption: 'Design d\'armure - Protection mystique pour mes héros ⚔️',
        timestamp: '2024-05-23T13:45:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_22_thumb.jpg'
      },
      {
        id: 'fallback_23',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_23.jpg',
        caption: 'Croquis speed - 2 minutes par pose. Challenge intensité ! ⏱️',
        timestamp: '2024-05-29T08:55:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_23_thumb.jpg'
      },

      // Juin 2024 - Perfectionnement
      {
        id: 'fallback_24',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_24.jpg',
        caption: 'Maîtrise des ombres - Clair-obscur à la sanguine 🔴',
        timestamp: '2024-06-05T11:10:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_24_thumb.jpg'
      },
      {
        id: 'fallback_25',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_25.jpg',
        caption: 'Architecture fantasy - Temple ancestral de mon univers 🏛️',
        timestamp: '2024-06-12T15:30:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_25_thumb.jpg'
      },
      {
        id: 'fallback_26',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_26.jpg',
        caption: 'Étude comparative - Évolution de mon style sur 6 mois 📈',
        timestamp: '2024-06-18T14:00:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_26_thumb.jpg'
      },
      {
        id: 'fallback_27',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_27.jpg',
        caption: 'Portrait de groupe - Mes personnages principaux réunis ✨',
        timestamp: '2024-06-25T12:45:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_27_thumb.jpg'
      },

      // Juillet 2024 - Projets ambitieux
      {
        id: 'fallback_28',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_28.jpg',
        caption: 'Concept final - Affiche pour mon univers narratif 🎯',
        timestamp: '2024-07-02T16:20:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_28_thumb.jpg'
      },
      {
        id: 'fallback_29',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_29.jpg',
        caption: 'Technique avancée - Rendu hyperréaliste au graphite ✏️',
        timestamp: '2024-07-09T10:15:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_29_thumb.jpg'
      },
      {
        id: 'fallback_30',
        media_url: '/assets/img/art-traditionnel/etudes/sketch_30.jpg',
        caption: 'Récapitulatif 2024 - Mes meilleures créations de l\'année ! 🏆',
        timestamp: '2024-07-15T13:30:00Z',
        media_type: 'IMAGE',
        permalink: `https://instagram.com/${this.username}`,
        thumbnail_url: '/assets/img/art-traditionnel/etudes/sketch_30_thumb.jpg'
      }
    ];
  }

  /**
   * Récupère les photos du compte Instagram
   * @param {number} limit - Nombre de photos à récupérer
   * @returns {Promise<Array>} - Liste des photos
   */
  async getUserPhotos(limit = 12) {
    try {
      if (!this.accessToken) {
        console.warn('Aucun token Instagram configuré, utilisation des photos de fallback');
        return this.getFallbackPhotos(limit);
      }

      const response = await fetch(
        `${this.baseURL}/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=${limit}&access_token=${this.accessToken}`
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(`Erreur Instagram API: ${data.error.message}`);
      }

      // Filtrer uniquement les images
      const photos = data.data.filter(item => item.media_type === 'IMAGE');
      
      return this.formatPhotos(photos);

    } catch (error) {
      console.error('Erreur lors de la récupération des photos Instagram:', error);
      console.log('Utilisation des photos de fallback');
      return this.getFallbackPhotos(limit);
    }
  }

  /**
   * Récupère les informations du profil
   * @returns {Promise<Object>} - Informations du profil
   */
  async getProfileInfo() {
    try {
      if (!this.accessToken) {
        return this.getFallbackProfile();
      }

      const response = await fetch(
        `${this.baseURL}/me?fields=id,username,account_type,media_count&access_token=${this.accessToken}`
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(`Erreur Instagram API: ${data.error.message}`);
      }

      return {
        username: data.username || this.username,
        accountType: data.account_type || 'PERSONAL',
        mediaCount: data.media_count || this.fallbackPhotos.length,
        profileUrl: `https://instagram.com/${data.username || this.username}`
      };

    } catch (error) {
      console.error('Erreur lors de la récupération du profil Instagram:', error);
      return this.getFallbackProfile();
    }
  }

  /**
   * Formate les photos pour l'affichage
   * @param {Array} photos - Photos brutes de l'API
   * @returns {Array} - Photos formatées
   */
  formatPhotos(photos) {
    return photos.map(photo => ({
      id: photo.id,
      url: photo.media_url,
      caption: photo.caption || 'Progression artistique',
      timestamp: photo.timestamp,
      permalink: photo.permalink,
      thumbnailUrl: photo.thumbnail_url || photo.media_url,
      category: this.categorizePhoto(photo.caption)
    }));
  }

  /**
   * Catégorise une photo basée sur sa description
   * @param {string} caption - Description de la photo
   * @returns {string} - Catégorie
   */
  categorizePhoto(caption) {
    if (!caption) return 'general';
    
    const lowerCaption = caption.toLowerCase();
    
    if (lowerCaption.includes('portrait') || lowerCaption.includes('visage')) return 'portraits';
    if (lowerCaption.includes('main') || lowerCaption.includes('anatomie')) return 'anatomie';
    if (lowerCaption.includes('character') || lowerCaption.includes('personnage')) return 'characters';
    if (lowerCaption.includes('étude') || lowerCaption.includes('study')) return 'etudes';
    if (lowerCaption.includes('croquis') || lowerCaption.includes('sketch')) return 'croquis';
    
    return 'general';
  }

  /**
   * Retourne les photos de fallback
   * @param {number} limit - Nombre de photos
   * @returns {Array} - Photos de fallback
   */
  getFallbackPhotos(limit) {
    return this.fallbackPhotos
      .slice(0, limit)
      .map(photo => ({
        ...photo,
        url: photo.media_url,
        thumbnailUrl: photo.thumbnail_url,
        category: this.categorizePhoto(photo.caption)
      }));
  }

  /**
   * Retourne les informations de profil de fallback
   * @returns {Object} - Profil de fallback
   */
  getFallbackProfile() {
    return {
      username: this.username,
      accountType: 'PERSONAL',
      mediaCount: this.fallbackPhotos.length,
      profileUrl: `https://instagram.com/${this.username}`
    };
  }

  /**
   * Récupère les photos par catégorie
   * @param {string} category - Catégorie souhaitée
   * @param {number} limit - Nombre maximum de photos
   * @returns {Promise<Array>} - Photos de la catégorie
   */
  async getPhotosByCategory(category, limit = 8) {
    const allPhotos = await this.getUserPhotos(50); // Récupère plus de photos pour filtrer
    
    const filteredPhotos = allPhotos.filter(photo => 
      photo.category === category || category === 'all'
    );
    
    return filteredPhotos.slice(0, limit);
  }

  /**
   * Récupère les statistiques de progression
   * @returns {Promise<Object>} - Statistiques
   */
  async getProgressionStats() {
    const photos = await this.getUserPhotos(100);
    
    // Grouper par mois
    const photosByMonth = photos.reduce((acc, photo) => {
      const month = new Date(photo.timestamp).toISOString().slice(0, 7); // YYYY-MM
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    // Grouper par catégorie
    const photosByCategory = photos.reduce((acc, photo) => {
      acc[photo.category] = (acc[photo.category] || 0) + 1;
      return acc;
    }, {});

    return {
      totalPhotos: photos.length,
      monthlyProgress: photosByMonth,
      categoryDistribution: photosByCategory,
      mostActiveMonth: Object.keys(photosByMonth).reduce((a, b) => 
        photosByMonth[a] > photosByMonth[b] ? a : b, Object.keys(photosByMonth)[0]
      ),
      dominantCategory: Object.keys(photosByCategory).reduce((a, b) => 
        photosByCategory[a] > photosByCategory[b] ? a : b, Object.keys(photosByCategory)[0]
      )
    };
  }
}

export default new InstagramAPI(); 
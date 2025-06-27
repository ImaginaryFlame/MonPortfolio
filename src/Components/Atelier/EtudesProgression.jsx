import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import instagramAPI from '../../services/instagramAPI';

const EtudesProgression = () => {
  const { t } = useLanguage();
  const [photos, setPhotos] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  const categories = [
    { id: 'all', name: 'Toutes les études', icon: '🎨' },
    { id: 'portraits', name: 'Portraits', icon: '👤' },
    { id: 'anatomie', name: 'Anatomie', icon: '🖐️' },
    { id: 'characters', name: 'Personnages', icon: '🧙‍♂️' },
    { id: 'etudes', name: 'Études', icon: '📚' },
    { id: 'croquis', name: 'Croquis', icon: '✏️' },
    { id: 'general', name: 'Général', icon: '🎭' }
  ];

  useEffect(() => {
    const loadInstagramData = async () => {
      try {
        setLoading(true);
        
        // Charger les photos, profil et statistiques en parallèle
        const [photosData, profileData, statsData] = await Promise.all([
          instagramAPI.getUserPhotos(30),
          instagramAPI.getProfileInfo(),
          instagramAPI.getProgressionStats()
        ]);

        setPhotos(photosData);
        setProfileInfo(profileData);
        setStats(statsData);
        setFilteredPhotos(photosData);
        
      } catch (error) {
        console.error('Erreur lors du chargement des données Instagram:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInstagramData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter(photo => photo.category === selectedCategory));
    }
  }, [selectedCategory, photos]);

  const openModal = (photo, index) => {
    setSelectedImage(photo);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredPhotos.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredPhotos[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredPhotos.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredPhotos[prevIndex]);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProgressionMessage = () => {
    if (!stats) return "Chargement des statistiques...";
    
    const messages = [
      `🎯 ${stats.totalPhotos} études réalisées au total`,
      `📈 Mois le plus productif : ${stats.mostActiveMonth}`,
      `🎨 Spécialité dominante : ${stats.dominantCategory}`,
      `🔥 Progression constante depuis 2024`
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <span className="text-purple-600 font-medium">Chargement des études...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">📚 Études & Progression</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Voyage artistique documenté à travers mes études quotidiennes. Photos du compte @iflamedrawings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-purple-100 to-pink-100">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="text-4xl mb-2">✏️</div>
                    <p className="text-gray-600 text-sm">Étude artistique</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-800 text-sm mb-2">{photo.caption}</p>
                <div className="text-xs text-gray-500">
                  {new Date(photo.timestamp).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {profileInfo && (
          <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Suivez ma progression</h3>
            <a
              href={profileInfo.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
            >
              <span>📸</span>
              <span>@{profileInfo.username}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default EtudesProgression; 
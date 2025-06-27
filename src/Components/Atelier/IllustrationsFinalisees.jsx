import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const IllustrationsFinalisees = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Illustrations finalisées (données statiques pour l'instant)
  const illustrations = [
    {
      id: 1,
      title: "Portrait de Travis - Héros à la Flamme Imaginaire",
      image: "/assets/img/art-traditionnel/illustrations/travis_portrait.jpg",
      medium: "Encre et aquarelle",
      size: "A4 (21x29.7cm)",
      year: "2024",
      description: "Portrait finalisé du protagoniste principal de l'univers narratif, réalisé à l'encre de Chine et aquarelle.",
      tags: ["Portrait", "Personnage principal", "Encre", "Aquarelle"],
      category: "Personnages"
    },
    {
      id: 2,
      title: "Paysage de Vesontio - Concept Art",
      image: "/assets/img/art-traditionnel/illustrations/vesontio_landscape.jpg",
      medium: "Crayon et pastel",
      size: "A3 (29.7x42cm)",
      year: "2024",
      description: "Vue panoramique de la ville alternative de Vesontio, mélange de modernité et d'architecture ancienne.",
      tags: ["Paysage", "Concept Art", "Crayon", "Pastel"],
      category: "Environnements"
    },
    {
      id: 3,
      title: "Character Sheet - Personnages secondaires",
      image: "/assets/img/art-traditionnel/illustrations/character_sheet.jpg",
      medium: "Encre et marqueurs",
      size: "A2 (42x59.4cm)",
      year: "2024",
      description: "Planche de références pour les personnages secondaires de l'univers narratif.",
      tags: ["Character Design", "Références", "Encre", "Marqueurs"],
      category: "Personnages"
    },
    {
      id: 4,
      title: "Créatures fantastiques - Bestiaire",
      image: "/assets/img/art-traditionnel/illustrations/creatures.jpg",
      medium: "Crayon graphite et rehauts blancs",
      size: "A4 (21x29.7cm)",
      year: "2024",
      description: "Études détaillées des créatures peuplant les univers narratifs.",
      tags: ["Créatures", "Fantasy", "Crayon", "Bestiaire"],
      category: "Créatures"
    },
    {
      id: 5,
      title: "Objets magiques et artefacts",
      image: "/assets/img/art-traditionnel/illustrations/artefacts.jpg",
      medium: "Aquarelle et encre",
      size: "A4 (21x29.7cm)",
      year: "2024",
      description: "Collection d'objets mystiques et d'artefacts des différents univers.",
      tags: ["Objets", "Magie", "Aquarelle", "Artefacts"],
      category: "Objets"
    },
    {
      id: 6,
      title: "Poster promotionnel - Flamme Imaginaire",
      image: "/assets/img/art-traditionnel/illustrations/poster.jpg",
      medium: "Technique mixte",
      size: "A1 (59.4x84.1cm)",
      year: "2024",
      description: "Illustration promotionnelle pour l'univers du Héros à la Flamme Imaginaire.",
      tags: ["Poster", "Promotion", "Technique mixte", "Composition"],
      category: "Promotionnel"
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les catégories', count: illustrations.length },
    { id: 'Personnages', name: 'Personnages', count: illustrations.filter(i => i.category === 'Personnages').length },
    { id: 'Environnements', name: 'Environnements', count: illustrations.filter(i => i.category === 'Environnements').length },
    { id: 'Créatures', name: 'Créatures', count: illustrations.filter(i => i.category === 'Créatures').length },
    { id: 'Objets', name: 'Objets', count: illustrations.filter(i => i.category === 'Objets').length },
    { id: 'Promotionnel', name: 'Promotionnel', count: illustrations.filter(i => i.category === 'Promotionnel').length }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredIllustrations, setFilteredIllustrations] = useState(illustrations);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredIllustrations(illustrations);
    } else {
      setFilteredIllustrations(illustrations.filter(ill => ill.category === selectedCategory));
    }
  }, [selectedCategory]);

  const openModal = (illustration, index) => {
    setSelectedImage(illustration);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredIllustrations.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredIllustrations[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredIllustrations.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredIllustrations[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* En-tête */}
      <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            🎨 Illustrations Finalisées
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Collection d'œuvres traditionnelles complétées, représentant l'aboutissement d'un processus créatif approfondi. 
            Chaque illustration raconte une histoire et enrichit l'univers narratif en développement.
          </p>
          <div className="mt-8 flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-amber-400 rounded-full"></span>
              <span>Techniques traditionnelles</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
              <span>Œuvres finalisées</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-red-400 rounded-full"></span>
              <span>Qualité portfolio</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">Total d'œuvres</p>
                <p className="text-3xl font-bold text-amber-900">{illustrations.length}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <span className="text-2xl">🎨</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Techniques</p>
                <p className="text-3xl font-bold text-orange-900">6</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <span className="text-2xl">🖌️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Catégories</p>
                <p className="text-3xl font-bold text-red-900">{categories.length - 1}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <span className="text-2xl">📂</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">Année</p>
                <p className="text-3xl font-bold text-amber-900">2024</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres par catégorie */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Filtrer par catégorie</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-400 hover:text-orange-600'
                }`}
              >
                {category.name} <span className="text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Galerie d'illustrations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIllustrations.map((illustration, index) => (
            <div
              key={illustration.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => openModal(illustration, index)}
            >
              {/* Image */}
              <div className="relative h-64 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🎨</div>
                    <p className="text-gray-600 font-medium">{illustration.title}</p>
                    <p className="text-sm text-gray-500 mt-2">{illustration.medium}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-medium text-gray-700">{illustration.category}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Informations */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {illustration.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {illustration.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center space-x-1">
                    <span>🖌️</span>
                    <span>{illustration.medium}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>📐</span>
                    <span>{illustration.size}</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {illustration.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {illustration.tags.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{illustration.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucune illustration */}
        {filteredIllustrations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Aucune illustration dans cette catégorie</h3>
            <p className="text-gray-600">Sélectionnez une autre catégorie pour voir les œuvres disponibles.</p>
          </div>
        )}
      </div>

      {/* Modal d'affichage */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative">
              {/* Boutons de navigation */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-300 z-10"
              >
                ✕
              </button>
              
              {filteredIllustrations.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 z-10"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 z-10"
                  >
                    →
                  </button>
                </>
              )}

              {/* Image */}
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 h-96 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-6">🎨</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-600">{selectedImage.medium} • {selectedImage.size}</p>
                </div>
              </div>

              {/* Informations détaillées */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Description</h4>
                    <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                    
                    <h4 className="font-bold text-gray-800 mb-2">Détails techniques</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Technique :</span>
                        <span className="font-medium">{selectedImage.medium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Format :</span>
                        <span className="font-medium">{selectedImage.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Année :</span>
                        <span className="font-medium">{selectedImage.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Catégorie :</span>
                        <span className="font-medium">{selectedImage.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IllustrationsFinalisees; 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LittleArcheologist = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentArtifactIndex, setCurrentArtifactIndex] = useState(0);
  const [galleryMode, setGalleryMode] = useState(null); // 'images' ou 'artifacts'

  const projectData = {
    title: "Little Archeologist",
    subtitle: "La main à la pelle",
    description: "Application éducative interactive développée pour rendre l'archéologie accessible aux enfants les plus éloignés des institutions. Lauréat du Prix de l'Innovation RA lors du Défi Chal'enge 2023.",
    
    features: [
      {
        title: "Exploration Interactive",
        description: "Plongez dans une véritable enquête archéologique grâce à l'innovation technologique. Observez et analysez des objets de fouille comme un véritable archéologue. Notre application permet aux élèves de manipuler virtuellement des objets en 3D."
      },
      {
        title: "Approche Pédagogique",
        description: "Développée en partenariat avec 'La Main à La Pâte', cette application propose une méthode d'apprentissage innovante adaptée aux programmes de cycle 3. Les activités développent l'esprit critique et la curiosité des élèves."
      },
      {
        title: "Multi-plateforme",
        description: "Disponible sur Android et Windows pour une accessibilité maximale dans les établissements scolaires. Interface tactile optimisée pour tablettes et smartphones."
      }
    ],

    technologies: ["Unity", "C#", "Android Development", "Windows Development", "3D Modeling", "UI/UX Design"],
    
    // Équipe complète de Little Archaeologist
    team: [
      { name: "Sivis Barros Dianpamba", role: "Designer UI / Monteur vidéo" },
      { name: "Manon Lemonnier", role: "Chef de projet / 3D et Texturing" },
      { name: "Oussama", role: "Chef de projet / Développeur" },
      { name: "Ylies Nejara", role: "Développeur" },
      { name: "Audric Boullier", role: "Développeur / Intégrateur" },
      { name: "Arnaud Carbonnel", role: "3D et Texturing / Réalisateur / Monteur vidéo" },
      { name: "Hanaé Jeanneton-Blateau", role: "Chargée de communication" },
      { name: "Mylan Picornot", role: "Communicant / Pitch" },
      { name: "Matthias Jambon", role: "Designer application / Directeur artistique" }
    ],

    // Liens réels
    projectUrl: "https://yliesn.itch.io/archeo",
    
    downloads: [
      { 
        name: "LittleArcheologist_Android_v.0.1.3.apk", 
        size: "217 MB", 
        platform: "Android",
        localPath: "C:\\Users\\Ben H\\Downloads\\LittleArcheologist_Android_v.0.1.3.apk",
        downloadUrl: "https://yliesn.itch.io/archeo"  // Lien direct vers la page de téléchargement
      },
      { 
        name: "LittleArcheologist_Win_v.0.1.3.zip", 
        size: "165 MB", 
        platform: "Windows",
        localPath: "C:\\Users\\Ben H\\Downloads\\LittleArcheologist_Win_v.0.1.3.zip",
        downloadUrl: "https://yliesn.itch.io/archeo"  // Lien direct vers la page de téléchargement
      }
    ],

    // Objets archéologiques 3D avec vraies images
    artifacts: [
      { 
        name: "Urne funéraire", 
        image: "/assets/img/projects/little-archaeologist/Urne.PNG",
        description: "Modèle 3D interactif d'une urne antique"
      },
      { 
        name: "Bol ancien", 
        image: "/assets/img/projects/little-archaeologist/Bol.PNG",
        description: "Bol archéologique avec détails précis"
      },
      { 
        name: "Assiette historique", 
        image: "/assets/img/projects/little-archaeologist/Assiette.PNG",
        description: "Assiette antique reconstituée"
      }
    ],

    // Images complètes de l'application
    images: [
      { 
        src: "/assets/img/projects/little-archaeologist/Image2.webp", 
        alt: "Bannière officielle Little Archeologist",
        caption: "Bannière officielle du projet"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/LITTLE_ARCHEOLOGIST1.png", 
        alt: "Logo principal Little Archeologist",
        caption: "Logo principal de l'application"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/IMG_8065.png", 
        alt: "Interface principale",
        caption: "Interface principale de navigation"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/imageqgrqre.png", 
        alt: "Exploration d'objets",
        caption: "Interface d'exploration interactive"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/imagegrqegreq.png", 
        alt: "Outils d'analyse",
        caption: "Outils d'analyse et mesures"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/grqgrq.png", 
        alt: "Vue détaillée",
        caption: "Vue détaillée des objets archéologiques"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/UrneMesure_1.png", 
        alt: "Système de mesure",
        caption: "Système de mesure des objets archéologiques"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/hnfdhd.png", 
        alt: "Interface d'analyse",
        caption: "Interface d'analyse détaillée"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/imagednhbd.png", 
        alt: "Vue d'ensemble",
        caption: "Vue d'ensemble de l'application"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/ndngdn.png", 
        alt: "Fonctionnalités avancées",
        caption: "Fonctionnalités avancées d'exploration"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/imagebfdwbfdws.png", 
        alt: "Interface utilisateur",
        caption: "Interface utilisateur optimisée"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/imagebfwdbfw.png", 
        alt: "Exploration complète",
        caption: "Système d'exploration complète"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/imagebfdwbfw.png", 
        alt: "Interface avancée",
        caption: "Interface avancée de manipulation"
      }
    ],

    // Slides de présentation du projet
    presentationSlides: [
      { 
        src: "/assets/img/projects/little-archaeologist/PRESENTATION PROJET CHAL'ENGE-1_00001.webp", 
        alt: "Slide 1 - Introduction",
        caption: "Introduction du projet"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/PRESENTATION PROJET CHAL'ENGE-1_00002.webp", 
        alt: "Slide 2 - Contexte",
        caption: "Contexte et objectifs"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/PRESENTATION PROJET CHAL'ENGE-1_00003.webp", 
        alt: "Slide 3 - Approche",
        caption: "Approche pédagogique"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/PRESENTATION PROJET CHAL'ENGE-1_00004.webp", 
        alt: "Slide 4 - Développement",
        caption: "Processus de développement"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/PRESENTATION PROJET CHAL'ENGE-1_00005.webp", 
        alt: "Slide 5 - Fonctionnalités",
        caption: "Fonctionnalités principales"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/PRESENTATION PROJET CHAL'ENGE-1_00006.webp", 
        alt: "Slide 6 - Équipe",
        caption: "Présentation de l'équipe"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/PRESENTATION PROJET CHAL'ENGE-1_00007.webp", 
        alt: "Slide 7 - Résultats",
        caption: "Résultats et impact"
      },
      { 
        src: "/assets/img/projects/little-archaeologist/PRESENTATION PROJET CHAL'ENGE-1_00008.webp", 
        alt: "Slide 8 - Conclusion",
        caption: "Conclusion et perspectives"
      }
    ]
  };

  // Fonctions de navigation pour les galeries
  const openImageGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setGalleryMode('images');
    setSelectedImage(projectData.images[index]);
  };

  const openArtifactGallery = (index = 0) => {
    setCurrentArtifactIndex(index);
    setGalleryMode('artifacts');
    setSelectedImage(projectData.artifacts[index]);
  };

  const nextImage = () => {
    if (galleryMode === 'images') {
      const nextIndex = (currentImageIndex + 1) % projectData.images.length;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(projectData.images[nextIndex]);
    } else if (galleryMode === 'artifacts') {
      const nextIndex = (currentArtifactIndex + 1) % projectData.artifacts.length;
      setCurrentArtifactIndex(nextIndex);
      setSelectedImage(projectData.artifacts[nextIndex]);
    }
  };

  const prevImage = () => {
    if (galleryMode === 'images') {
      const prevIndex = currentImageIndex === 0 ? projectData.images.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(projectData.images[prevIndex]);
    } else if (galleryMode === 'artifacts') {
      const prevIndex = currentArtifactIndex === 0 ? projectData.artifacts.length - 1 : currentArtifactIndex - 1;
      setCurrentArtifactIndex(prevIndex);
      setSelectedImage(projectData.artifacts[prevIndex]);
    }
  };

  const closeGallery = () => {
    setSelectedImage(null);
    setGalleryMode(null);
  };

  // Gestion de la navigation par clavier
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage || !galleryMode) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextImage();
          break;
        case 'Escape':
          e.preventDefault();
          closeGallery();
          break;
      }
    };

    if (selectedImage && galleryMode) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedImage, galleryMode, currentImageIndex, currentArtifactIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-100 to-orange-200 text-gray-800 pt-20 md:pt-24">
      {/* Header avec thème archéologique - couleurs de l'app */}
      <div className="relative overflow-hidden bg-gradient-to-br from-yellow-200 via-amber-200 to-orange-300">
        <div className="absolute inset-0 bg-[url('/assets/img/projects/little-archaeologist/Image2.webp')] bg-center bg-no-repeat bg-contain opacity-10"></div>
        
        {/* Bordure décorative grecque */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 opacity-20"></div>
        <div className="absolute top-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto p-8 py-16">
          <div className="text-center mb-12">
            {/* Bannière officielle Little Archeologist */}
            <div className="inline-block mb-8 p-6 bg-white/30 rounded-2xl shadow-2xl backdrop-blur-sm border-4 border-amber-400">
              <img 
                src="/assets/img/projects/little-archaeologist/Image2.webp" 
                alt="Little Archeologist - Bannière officielle"
                className="h-40 md:h-48 mx-auto rounded-lg"
              />
            </div>
            
            <p className="text-xl text-amber-800 max-w-4xl mx-auto leading-relaxed mb-8 bg-white/20 backdrop-blur-sm rounded-lg p-6">
              {projectData.description}
            </p>

            {/* Liens externes */}
            <div className="flex justify-center gap-4 mb-8">
              <a 
                href={projectData.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-medium hover:from-orange-700 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎮 Voir sur itch.io
              </a>
              <div className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg font-medium shadow-lg">
                🏆 Prix Innovation RA 2023
              </div>
            </div>
          </div>
        </div>
        
        {/* Bordure décorative grecque bas */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 opacity-20"></div>
        <div className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400"></div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Technologies utilisées */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-900 border-b-4 border-amber-600 pb-2">
            🛠️ Technologies utilisées
          </h2>
          <div className="flex flex-wrap gap-3">
            {projectData.technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-amber-200 text-amber-900 rounded-lg border-2 border-amber-400 hover:bg-amber-300 transition-all duration-300 font-medium shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Fonctionnalités principales */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-900 border-b-4 border-amber-600 pb-2">
            ✨ Fonctionnalités principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectData.features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-yellow-100 to-amber-100 backdrop-blur-sm border-2 border-amber-300 rounded-xl p-6 hover:border-amber-500 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3 text-amber-900">{feature.title}</h3>
                <p className="text-amber-800 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Objets archéologiques 3D */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-900 border-b-4 border-amber-600 pb-2">
            🏺 Objets archéologiques 3D
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectData.artifacts.map((artifact, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-yellow-100 to-amber-100 backdrop-blur-sm border-2 border-amber-300 rounded-xl p-6 hover:border-amber-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => openArtifactGallery(index)}
              >
                <div className="text-center">
                  <div className="w-full h-48 mx-auto mb-4 bg-white rounded-lg overflow-hidden border-2 border-amber-200 group-hover:border-amber-400 transition-all duration-300">
                    <img 
                      src={artifact.image}
                      alt={artifact.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-amber-900">{artifact.name}</h3>
                  <p className="text-amber-700 text-sm mt-2">{artifact.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Screenshots */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-900 border-b-4 border-amber-600 pb-2">
            📱 Captures d'écran de l'application
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projectData.images.map((image, index) => (
              <div 
                key={index}
                className="group cursor-pointer"
                onClick={() => openImageGallery(index)}
              >
                <div className="relative overflow-hidden rounded-xl border-2 border-amber-400 hover:border-amber-600 transition-all duration-300 bg-gradient-to-br from-yellow-100 to-amber-100">
                  <div className="w-full h-48 bg-white flex items-center justify-center overflow-hidden">
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback si l'image ne charge pas
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-amber-200/50 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">📱</div>
                        <p className="text-amber-800 text-sm font-medium">{image.caption}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium">🔍 Cliquer pour agrandir</p>
                    </div>
                  </div>
                  {/* Titre en bas */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/80 to-transparent p-3">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Équipe */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-900 border-b-4 border-amber-600 pb-2">
            👥 Notre équipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectData.team.map((member, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-amber-300 rounded-lg p-4 hover:bg-gradient-to-br hover:from-amber-100 hover:to-orange-100 hover:border-amber-500 transition-all duration-300"
              >
                <h3 className="font-bold text-amber-900">{member.name}</h3>
                <p className="text-amber-700 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photos de l'équipe */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-900 border-b-4 border-amber-600 pb-2">
            📸 Photos de l'équipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              className="group cursor-pointer"
              onClick={() => setSelectedImage({ 
                src: "/assets/img/projects/little-archaeologist/sdfhhswd.webp", 
                alt: "Équipe Little Archeologist - Photo 1",
                caption: "L'équipe de développement au travail"
              })}
            >
              <div className="relative overflow-hidden rounded-xl border-2 border-amber-400 hover:border-amber-600 transition-all duration-300 bg-gradient-to-br from-yellow-100 to-amber-100">
                <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden">
                  <img 
                    src="/assets/img/projects/little-archaeologist/sdfhhswd.webp"
                    alt="Équipe Little Archeologist - Photo 1"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">🔍 Cliquer pour agrandir</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/80 to-transparent p-3">
                  <p className="text-white text-sm font-medium">L'équipe de développement au travail</p>
                </div>
              </div>
            </div>
            
            <div 
              className="group cursor-pointer"
              onClick={() => setSelectedImage({ 
                src: "/assets/img/projects/little-archaeologist/Image1(1).webp", 
                alt: "Équipe Little Archeologist - Photo 2",
                caption: "Présentation du projet en équipe"
              })}
            >
              <div className="relative overflow-hidden rounded-xl border-2 border-amber-400 hover:border-amber-600 transition-all duration-300 bg-gradient-to-br from-yellow-100 to-amber-100">
                <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden">
                  <img 
                    src="/assets/img/projects/little-archaeologist/Image1(1).webp"
                    alt="Équipe Little Archeologist - Photo 2"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">🔍 Cliquer pour agrandir</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/80 to-transparent p-3">
                  <p className="text-white text-sm font-medium">Présentation du projet en équipe</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Téléchargements */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-900 border-b-4 border-amber-600 pb-2">
            📥 Téléchargements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectData.downloads.map((download, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-amber-400 rounded-xl p-6 hover:border-amber-600 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-amber-900">{download.platform}</h3>
                  <span className="text-3xl">
                    {download.platform === 'Android' ? '📱' : '💻'}
                  </span>
                </div>
                <p className="text-amber-800 mb-2 font-medium">{download.name}</p>
                <p className="text-amber-700 text-sm mb-4">Taille: {download.size}</p>
                <div className="space-y-2">
                  <a 
                    href={download.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-center shadow-md"
                  >
                    📱 Télécharger {download.platform}
                  </a>
                  <a 
                    href={projectData.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-center shadow-md"
                  >
                    🌐 Voir sur itch.io
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ressources additionnelles avec fond download.webp */}
        <div className="mb-12 relative">
          {/* Image de fond */}
          <div className="absolute inset-0 bg-[url('/assets/img/projects/little-archaeologist/download.webp')] bg-center bg-cover rounded-2xl opacity-10"></div>
          
          <div className="relative z-10 bg-gradient-to-br from-amber-50/90 to-orange-100/90 backdrop-blur-sm rounded-2xl p-8 border-4 border-amber-300">
            <h2 className="text-3xl font-bold mb-6 text-amber-900 border-b-4 border-amber-600 pb-2">
              📚 Ressources du projet
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button 
                onClick={() => window.open('/assets/img/projects/little-archaeologist/Unity-Project/index.html', '_blank')}
                className="bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-blue-300 rounded-xl p-4 text-center hover:border-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-bold text-blue-900 mb-2">Unity Dev Control</h3>
                <p className="text-blue-700 text-sm">Projet Unity source complet</p>
              </button>
              <button 
                onClick={() => window.open('/assets/img/projects/little-archaeologist/PRESENTATION PROJET CHAL\'ENGE-1.pptx', '_blank')}
                className="bg-gradient-to-br from-red-100 to-pink-100 border-2 border-red-300 rounded-xl p-4 text-center hover:border-red-500 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-bold text-red-900 mb-2">Présentation PowerPoint</h3>
                <p className="text-red-700 text-sm">PRESENTATION PROJET CHAL'ENGE-1.pptx</p>
              </button>
              <button 
                onClick={() => openImageGallery(0)}
                className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300 rounded-xl p-4 text-center hover:border-green-500 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="text-3xl mb-2">📱</div>
                <h3 className="font-bold text-green-900 mb-2">Screenshots HD</h3>
                <p className="text-green-700 text-sm">13 captures avec navigation</p>
              </button>
              <button 
                onClick={() => openArtifactGallery(0)}
                className="bg-gradient-to-br from-purple-100 to-violet-100 border-2 border-purple-300 rounded-xl p-4 text-center hover:border-purple-500 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="text-3xl mb-2">🏺</div>
                <h3 className="font-bold text-purple-900 mb-2">Modèles 3D</h3>
                <p className="text-purple-700 text-sm">3 objets avec navigation</p>
              </button>
            </div>
            
            {/* Note sur les ressources */}
            <div className="mt-8 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-400 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-amber-900 mb-3">📁 Ressources complètes disponibles</h3>
              <p className="text-amber-800 leading-relaxed">
                Toutes les ressources du projet sont maintenant intégrées dans ce portfolio : 
                <strong>13 captures d'écran</strong>, <strong>8 slides de présentation</strong>, 
                <strong>3 modèles 3D d'objets archéologiques</strong>, et la <strong>présentation PowerPoint complète</strong>.
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <div className="px-3 py-1 bg-amber-200 text-amber-900 rounded-full text-sm font-medium">
                  📱 Images: Format PNG/WebP
                </div>
                <div className="px-3 py-1 bg-amber-200 text-amber-900 rounded-full text-sm font-medium">
                  📊 Présentation: PowerPoint
                </div>
                <div className="px-3 py-1 bg-amber-200 text-amber-900 rounded-full text-sm font-medium">
                  🎯 Source: Unity C#
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Bouton retour */}
        <div className="text-center">
          <Link 
            to="/creation/labo/academique"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ← Retour au Labo Académique
          </Link>
        </div>
      </div>

      {/* Modal pour les images avec navigation */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeGallery();
            }
          }}
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            {/* Bouton fermer */}
            <button 
              onClick={closeGallery}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-300 z-10"
            >
              ✕
            </button>
            
            {/* Boutons de navigation (uniquement en mode galerie) */}
            {galleryMode && (
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
                
                {/* Compteur d'images */}
                <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-10">
                  {galleryMode === 'images' 
                    ? `${currentImageIndex + 1} / ${projectData.images.length}` 
                    : `${currentArtifactIndex + 1} / ${projectData.artifacts.length}`
                  }
                </div>
              </>
            )}
            
            {/* Affichage de la vraie image si disponible */}
            {selectedImage.src || selectedImage.image ? (
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src={selectedImage.src || selectedImage.image}
                  alt={selectedImage.alt || selectedImage.name}
                  className="max-w-full max-h-[80vh] object-contain"
                />
                <div className="p-4 bg-gradient-to-br from-yellow-100 to-amber-100">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-amber-900 mb-2">
                        {selectedImage.caption || selectedImage.name}
                      </h3>
                      {selectedImage.description && (
                        <p className="text-amber-800 text-sm">{selectedImage.description}</p>
                      )}
                    </div>
                    {galleryMode && (
                      <div className="ml-4 text-amber-700 text-sm">
                        {galleryMode === 'images' ? '📱 Screenshots' : '🏺 Modèles 3D'}
                      </div>
                    )}
                  </div>
                  
                  {/* Navigation par touches dans la description */}
                  {galleryMode && (
                    <div className="mt-3 pt-3 border-t border-amber-300 text-center">
                      <p className="text-amber-700 text-xs">
                        Utilisez ← → pour naviguer ou cliquez sur les flèches
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-yellow-100 to-amber-100 p-8 rounded-lg text-center border-4 border-amber-400">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold text-amber-900 mb-4">{selectedImage.caption}</h3>
                <p className="text-amber-800">
                  Image disponible dans vos fichiers locaux.<br/>
                  <span className="text-sm text-amber-700">
                    Copiez vos images dans public/assets/img/projects/little-archaeologist/ pour les voir s'afficher.
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LittleArcheologist; 
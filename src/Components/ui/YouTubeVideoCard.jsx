import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faEye, 
  faThumbsUp, 
  faComment, 
  faClock, 
  faExternalLinkAlt,
  faCalendarAlt 
} from '@fortawesome/free-solid-svg-icons';

const YouTubeVideoCard = ({ 
  video, 
  onClick, 
  showStats = true, 
  showDescription = false,
  className = "",
  size = "medium" // 'small', 'medium', 'large'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Formatage des nombres
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Tronquer le texte
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Configuration des tailles
  const sizeConfig = {
    small: {
      container: 'w-64',
      image: 'h-36',
      title: 'text-sm',
      stats: 'text-xs',
      titleLines: 40
    },
    medium: {
      container: 'w-80',
      image: 'h-45',
      title: 'text-base',
      stats: 'text-sm',
      titleLines: 60
    },
    large: {
      container: 'w-96',
      image: 'h-54',
      title: 'text-lg',
      stats: 'text-base',
      titleLines: 80
    }
  };

  const config = sizeConfig[size];

  const handleCardClick = () => {
    if (onClick) {
      onClick(video);
    } else {
      // Ouvrir dans un nouvel onglet par défaut
      window.open(video.url, '_blank');
    }
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    window.open(video.url, '_blank');
  };

  return (
    <motion.div
      className={`${config.container} bg-gradient-to-br from-slate-900/90 to-slate-800/90 
                  rounded-xl overflow-hidden cursor-pointer group
                  backdrop-blur-sm border border-slate-700/50
                  hover:shadow-2xl hover:shadow-orange-500/20 
                  transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 }
      }}
      onClick={handleCardClick}
    >
      {/* Thumbnail avec overlay */}
      <div className={`relative ${config.image} overflow-hidden`}>
        {!imageError ? (
          <>
            <img
              src={video.thumbnail.maxres || video.thumbnail.high}
              alt={video.title}
              className={`w-full h-full object-cover transition-all duration-300 
                         group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 animate-pulse" />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <FontAwesomeIcon icon={faPlay} className="text-4xl text-slate-400" />
          </div>
        )}

        {/* Overlay avec bouton play */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            className="bg-orange-500 text-white p-4 rounded-full hover:bg-orange-600 
                      transition-colors duration-200 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayClick}
          >
            <FontAwesomeIcon icon={faPlay} className="text-xl ml-1" />
          </motion.button>
        </div>

        {/* Badge pour les Shorts */}
        {video.isShort && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
            SHORT
          </div>
        )}

        {/* Durée */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          <FontAwesomeIcon icon={faClock} className="mr-1" />
          {video.duration}
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4 space-y-3">
        {/* Titre */}
        <h3 className={`${config.title} font-semibold text-white leading-tight 
                       group-hover:text-orange-400 transition-colors duration-200`}>
          {truncateText(video.title, config.titleLines)}
        </h3>

        {/* Description (optionnelle) */}
        {showDescription && video.description && (
          <p className="text-sm text-slate-300 leading-relaxed">
            {truncateText(video.description, 100)}
          </p>
        )}

        {/* Date de publication */}
        <div className="flex items-center text-slate-400 text-xs">
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
          {formatDate(video.publishedAt)}
        </div>

        {/* Statistiques */}
        {showStats && (
          <div className={`flex items-center justify-between ${config.stats} text-slate-300`}>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faEye} className="mr-1 text-slate-400" />
                {formatNumber(video.viewCount)}
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faThumbsUp} className="mr-1 text-slate-400" />
                {formatNumber(video.likeCount)}
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faComment} className="mr-1 text-slate-400" />
                {formatNumber(video.commentCount)}
              </div>
            </div>
            
            {/* Lien externe */}
            <motion.a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </motion.a>
          </div>
        )}

        {/* Tags (optionnel) */}
        {video.tags && video.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {video.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
            {video.tags.length > 3 && (
              <span className="text-slate-400 text-xs">
                +{video.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default YouTubeVideoCard; 
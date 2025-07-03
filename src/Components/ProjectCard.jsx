import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiTag, FiCalendar, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { urlFor, getTagColor } from '../config/sanityClient';

// Configuration des catégories avec leurs couleurs et icônes
const categoryConfig = {
  'arts-visuels-narratifs': { color: '#EC4899', icon: '🎨', name: 'Arts Visuels & Narratifs' },
  'developpement-tech': { color: '#3B82F6', icon: '💻', name: 'Développement & Tech' },
  'videaste': { color: '#EF4444', icon: '🎬', name: 'Vidéaste' },
  'game-development': { color: '#10B981', icon: '🎮', name: 'Game Development' },
  'web-digital': { color: '#14B8A6', icon: '🌐', name: 'Web & Digital' }
};

// Configuration des statuts
const statusConfig = {
  'in-progress': { icon: '🚧', name: 'En cours', color: '#F59E0B' },
  'completed': { icon: '✅', name: 'Terminé', color: '#10B981' },
  'paused': { icon: '⏸️', name: 'En pause', color: '#6B7280' },
  'concept': { icon: '💡', name: 'Concept', color: '#8B5CF6' },
  'planned': { icon: '🎯', name: 'Planifié', color: '#3B82F6' }
};

// Composant pour afficher un tag avec sa couleur
const TagDisplay = ({ tag, size = 'sm', showDescription = false }) => {
  const tagColor = getTagColor(tag);
  
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base'
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`
        ${sizeClasses[size]} rounded-full font-medium transition-all duration-200
        text-white shadow-sm inline-flex items-center gap-1
      `}
      style={{ backgroundColor: tagColor }}
      title={showDescription && tag.description ? tag.description : tag.name}
    >
      <FiTag size={10} />
      {tag.name}
    </motion.span>
  );
};

// Composant principal ProjectCard
const ProjectCard = ({ 
  project, 
  variant = 'default', // 'default', 'compact', 'featured'
  showTags = true,
  showTechnologies = true,
  showDescription = true,
  maxTags = 3,
  maxTechnologies = 4,
  className = '',
  onClick = null
}) => {
  // Configuration de la catégorie
  const categoryInfo = categoryConfig[project.category] || {
    color: '#6B7280',
    icon: '📁',
    name: project.category || 'Non catégorisé'
  };

  // Configuration du statut
  const statusInfo = statusConfig[project.status] || null;

  // Formatage des dates
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  // Classes CSS selon la variante
  const getCardClasses = () => {
    const baseClasses = "bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300";
    
    switch (variant) {
      case 'compact':
        return `${baseClasses} hover:shadow-md ${className}`;
      case 'featured':
        return `${baseClasses} hover:shadow-2xl hover:scale-[1.02] border-2 border-purple-200 dark:border-purple-700 ${className}`;
      default:
        return `${baseClasses} hover:shadow-xl hover:-translate-y-1 ${className}`;
    }
  };

  // Hauteur de l'image selon la variante
  const getImageHeight = () => {
    switch (variant) {
      case 'compact':
        return 'h-32';
      case 'featured':
        return 'h-64';
      default:
        return 'h-48';
    }
  };

  const cardContent = (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={variant !== 'compact' ? { y: -5 } : {}}
      className={getCardClasses()}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Image du projet */}
      <div className={`relative ${getImageHeight()} overflow-hidden`}>
        {project.image ? (
          <img
            src={urlFor(project.image).width(400).height(300).url()}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center text-white text-xl font-bold"
            style={{ backgroundColor: categoryInfo.color }}
          >
            <span className="text-4xl">{categoryInfo.icon}</span>
          </div>
        )}
        
        {/* Overlays et badges */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Badge catégorie */}
        <div className="absolute top-3 left-3">
          <span
            className="px-3 py-1 rounded-full text-white text-sm font-medium backdrop-blur-sm"
            style={{ backgroundColor: `${categoryInfo.color}CC` }}
          >
            {categoryInfo.icon} {variant === 'compact' ? '' : categoryInfo.name}
          </span>
        </div>

        {/* Badge statut */}
        {statusInfo && (
          <div className="absolute top-3 right-3">
            <span
              className="px-2 py-1 rounded-full text-white text-xs font-medium backdrop-blur-sm"
              style={{ backgroundColor: `${statusInfo.color}CC` }}
              title={statusInfo.name}
            >
              {statusInfo.icon}
            </span>
          </div>
        )}

        {/* Badge featured */}
        {project.featured && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 rounded-full bg-yellow-500 text-white text-xs font-medium">
              ⭐ Mis en avant
            </span>
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-6">
        {/* Titre et dates */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {project.title}
          </h3>
          
          {/* Dates */}
          {(project.startDate || project.endDate) && variant !== 'compact' && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FiCalendar size={14} />
              {formatDate(project.startDate)}
              {project.endDate && formatDate(project.startDate) !== formatDate(project.endDate) && (
                <> - {formatDate(project.endDate)}</>
              )}
            </div>
          )}
        </div>
        
        {/* Description */}
        {showDescription && project.description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
            {variant === 'compact' 
              ? `${project.description.substring(0, 80)}...`
              : project.description
            }
          </p>
        )}

        {/* Tags */}
        {showTags && project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, maxTags).map((tag) => (
              <TagDisplay 
                key={tag._id} 
                tag={tag} 
                size={variant === 'compact' ? 'xs' : 'sm'}
                showDescription={variant === 'featured'}
              />
            ))}
            {project.tags.length > maxTags && (
              <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-full">
                +{project.tags.length - maxTags}
              </span>
            )}
          </div>
        )}

        {/* Technologies */}
        {showTechnologies && project.technologies && project.technologies.length > 0 && variant !== 'compact' && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, maxTechnologies).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > maxTechnologies && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{project.technologies.length - maxTechnologies}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        {variant !== 'compact' && (
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink size={14} />
                Voir le projet
              </a>
            )}
            
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub size={14} />
                Code
              </a>
            )}
            
            {project.slug && (
              <Link
                to={`/projets/${project.slug.current}`}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Détails
              </Link>
            )}
          </div>
        )}

        {/* Actions compactes pour la variante compact */}
        {variant === 'compact' && (project.projectUrl || project.githubUrl || project.slug) && (
          <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink size={12} />
                Voir
              </a>
            )}
            
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-800 text-white rounded text-xs hover:bg-gray-900 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub size={12} />
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  return cardContent;
};

export default ProjectCard;
export { TagDisplay };
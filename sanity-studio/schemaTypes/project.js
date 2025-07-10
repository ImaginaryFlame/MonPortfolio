import { createRichTextField } from './utils/richTextConfig.js';

export default {
  name: "project",
  title: "🎨 Projet",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required()
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    },

    {
      name: "description",
      title: "Description courte",
      ...createRichTextField('basic'),
      validation: (Rule) => Rule.max(200).warning("Gardez la description courte pour un meilleur affichage")
    },

    {
      name: "longDescription",
      title: "Description détaillée",
      ...createRichTextField('medium'),
      description: "Description complète du projet avec tous les détails"
    },

    {
      name: "category",
      title: "Catégorie principale",
      type: "string",
      options: {
        list: [
          { title: "🎨 Arts Visuels & Narratifs", value: "arts-visuels-narratifs" },
          { title: "💻 Développement & Tech", value: "developpement-tech" },
          { title: "🎬 Vidéaste", value: "videaste" },
          { title: "🎮 Game Development", value: "game-development" },
          { title: "🌐 Web & Digital", value: "web-digital" }
        ]
      },
      validation: (Rule) => Rule.required(),
      description: "Catégorie principale de ce projet - détermine quels tags sont disponibles"
    },

    {
      name: "projectType",
      title: "Type de projet spécifique",
      type: "string",
      options: {
        list: [
          // Arts Visuels & Narratifs
          { title: "📖 Roman/Livre", value: "roman" },
          { title: "👤 Character Design", value: "character-design" },
          { title: "✏️ Croquis/Esquisse", value: "croquis" },
          { title: "🎨 Illustration", value: "illustration" },
          { title: "🗺️ Worldbuilding", value: "worldbuilding" },
          { title: "📜 Lore/Histoire", value: "lore" },
          
          // Développement & Tech
          { title: "🌐 Site Web", value: "website" },
          { title: "📱 Application", value: "application" },
          { title: "🔧 API/Backend", value: "api" },
          { title: "📚 Bibliothèque", value: "library" },
          { title: "🛠️ Outil", value: "tool" },
          
          // Vidéaste
          { title: "🎬 Vidéo YouTube", value: "video-youtube" },
          { title: "🎥 Court-métrage", value: "short-film" },
          { title: "📺 Stream", value: "stream" },
          { title: "🎞️ Montage", value: "editing" },
          
          // Game Development
          { title: "🎮 Jeu Complet", value: "full-game" },
          { title: "🧩 Prototype", value: "prototype" },
          { title: "🎨 Assets", value: "game-assets" },
          { title: "🏗️ Level Design", value: "level-design" },
          
          // Web & Digital
          { title: "💼 Portfolio", value: "portfolio" },
          { title: "🎨 UI/UX Design", value: "ui-ux" },
          { title: "📊 Dashboard", value: "dashboard" },
          { title: "🛒 E-commerce", value: "ecommerce" }
        ]
      },
      description: "Type spécifique pour une redirection précise"
    },

    // LIAISONS VERS LES UNIVERS ET PERSONNAGES
    {
      name: "linkedUnivers",
      title: "Univers lié",
      type: "reference",
      to: [{ type: "univers" }],
      description: "Si ce projet appartient à un univers narratif spécifique"
    },

    {
      name: "linkedPersonnage",
      title: "Personnage lié",
      type: "reference", 
      to: [{ type: "personnage" }],
      description: "Si ce projet concerne un personnage spécifique (character design, croquis, etc.)"
    },

    {
      name: "linkedRegion",
      title: "Région liée",
      type: "reference",
      to: [{ type: "region" }],
      description: "Si ce projet concerne une région spécifique (worldbuilding, cartes, etc.)"
    },

    // DESTINATION PERSONNALISÉE
    {
      name: "customDestination",
      title: "Destination personnalisée",
      type: "object",
      fields: [
        {
          name: "destinationType",
          title: "Type de destination",
          type: "string",
          options: {
            list: [
              { title: "🌟 Univers Narratif", value: "univers" },
              { title: "👤 Page Personnage", value: "personnage" },
              { title: "🧪 Labo (Dev/Tech)", value: "labo" },
              { title: "🎬 Studio (Vidéo)", value: "studio" },
              { title: "🎨 Atelier (Art)", value: "atelier" },
              { title: "📊 Page Projets", value: "projets" },
              { title: "🔗 URL Externe", value: "external" }
            ]
          }
        },
        {
          name: "specificSection",
          title: "Section spécifique",
          type: "string",
          description: "Ex: 'personnages', 'regions', 'dev/portfolio-web', etc.",
          hidden: ({ parent }) => parent?.destinationType === 'external'
        },
        {
          name: "externalUrl",
          title: "URL externe",
          type: "url",
          hidden: ({ parent }) => parent?.destinationType !== 'external'
        }
      ],
      description: "Définir manuellement où ce projet doit rediriger quand on clique dessus"
    },

    {
      name: "tags",
      title: "Tags de qualification",
      type: "array",
      of: [{ 
        type: "reference", 
        to: [{ type: "tag" }],
        options: {
          filter: ({ document }) => {
            if (!document?.category) {
              return {};
            }
            return {
              filter: 'category == $category',
              params: { category: document.category }
            }
          }
        }
      }],
      description: "Tags pour qualifier ce projet - Filtrés selon la catégorie choisie"
    },

    {
      name: "image",
      title: "Image principale",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: "Image de présentation principale du projet"
    },

    {
      name: "images",
      title: "Images additionnelles",
      type: "array",
      of: [{ 
        type: "image",
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: "caption",
            title: "Légende",
            type: "string"
          },
          {
            name: "imageType",
            title: "Type d'image",
            type: "string",
            options: {
              list: [
                { title: "📸 Image finale", value: "final" },
                { title: "✏️ Croquis", value: "sketch" },
                { title: "🎨 Work in Progress", value: "wip" },
                { title: "📝 Concept Art", value: "concept" },
                { title: "🖼️ Référence", value: "reference" }
              ]
            }
          }
        ]
      }],
      description: "Galerie d'images supplémentaires (croquis, WIP, concepts, etc.)"
    },

    {
      name: "projectUrl",
      title: "URL du projet",
      type: "url",
      description: "Lien vers le projet en ligne (site web, application, etc.)"
    },

    {
      name: "githubUrl",
      title: "URL GitHub",
      type: "url",
      description: "Lien vers le dépôt GitHub du projet"
    },

    {
      name: "youtubeUrl",
      title: "URL YouTube",
      type: "url",
      description: "Lien vers une vidéo YouTube liée au projet"
    },

    {
      name: "technologies",
      title: "Technologies utilisées",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      },
      description: "Liste des technologies, frameworks, outils utilisés"
    },

    {
      name: "status",
      title: "Statut du projet",
      type: "string",
      options: {
        list: [
          { title: "🚧 En cours", value: "in-progress" },
          { title: "✅ Terminé", value: "completed" },
          { title: "⏸️ En pause", value: "paused" },
          { title: "💡 Concept", value: "concept" },
          { title: "🎯 Planifié", value: "planned" }
        ]
      },
      initialValue: "in-progress"
    },

    {
      name: "startDate",
      title: "Date de début",
      type: "date",
      description: "Date de début du projet"
    },

    {
      name: "endDate",
      title: "Date de fin",
      type: "date",
      description: "Date de fin du projet (si terminé)"
    },

    {
      name: "featured",
      title: "Projet mis en avant",
      type: "boolean",
      initialValue: false,
      description: "Afficher ce projet en priorité sur la page d'accueil"
    },

    {
      name: "isPublished",
      title: "📖 Publié",
      type: "boolean",
      initialValue: true,
      description: "Contrôle si ce projet est visible sur le site (décochez pour masquer complètement)"
    },

    {
      name: "showInGallery",
      title: "Afficher dans la galerie d'accueil",
      type: "boolean",
      initialValue: true,
      description: "Afficher ce projet dans la galerie défilante de la page d'accueil"
    },

    {
      name: "priority",
      title: "Priorité d'affichage",
      type: "number",
      validation: (Rule) => Rule.min(1).max(10),
      initialValue: 5,
      description: "Priorité pour l'ordre d'affichage (1 = plus important, 10 = moins important)"
    }
  ],

  preview: {
    select: {
      title: "title",
      category: "category",
      projectType: "projectType",
      linkedUnivers: "linkedUnivers.nom",
      linkedPersonnage: "linkedPersonnage.nom",
      status: "status",
      featured: "featured",
      isPublished: "isPublished",
      media: "image"
    },
    prepare(selection) {
      const { title, category, projectType, linkedUnivers, linkedPersonnage, status, featured, isPublished, media } = selection;
      
      // Formater la catégorie
      const categoryEmojis = {
        'arts-visuels-narratifs': '🎨',
        'developpement-tech': '💻',
        'videaste': '🎬',
        'game-development': '🎮',
        'web-digital': '🌐'
      };
      
      const statusEmojis = {
        'in-progress': '🚧',
        'completed': '✅',
        'paused': '⏸️',
        'concept': '💡',
        'planned': '🎯'
      };
      
      const categoryEmoji = categoryEmojis[category] || '📁';
      const statusEmoji = statusEmojis[status] || '';
      const featuredEmoji = featured ? '⭐ ' : '';
      const publishedEmoji = isPublished === false ? '👁️ ' : '';
      
      // Construire le sous-titre avec les liaisons
      let subtitle = `${categoryEmoji} ${category || 'Sans catégorie'}`;
      if (projectType) {
        subtitle += ` • ${projectType}`;
      }
      if (linkedUnivers) {
        subtitle += ` • 🌟 ${linkedUnivers}`;
      }
      if (linkedPersonnage) {
        subtitle += ` • 👤 ${linkedPersonnage}`;
      }
      subtitle += ` ${statusEmoji}`;
      
      // Ajouter l'état de publication
      if (isPublished === false) {
        subtitle += ' • 🚫 NON PUBLIÉ';
      }
      
      return {
        title: `${publishedEmoji}${featuredEmoji}${title || "Sans titre"}`,
        subtitle: subtitle,
        media: media
      };
    }
  },

  orderings: [
    {
      title: 'Priorité',
      name: 'priorityDesc',
      by: [
        {field: 'priority', direction: 'asc'},
        {field: 'featured', direction: 'desc'},
        {field: '_createdAt', direction: 'desc'}
      ]
    },
    {
      title: 'Par univers',
      name: 'universAsc',
      by: [
        {field: 'linkedUnivers.nom', direction: 'asc'},
        {field: 'priority', direction: 'asc'}
      ]
    },
    {
      title: 'Par type de projet',
      name: 'typeAsc',
      by: [
        {field: 'projectType', direction: 'asc'},
        {field: 'priority', direction: 'asc'}
      ]
    },
    {
      title: 'Date de création',
      name: 'createdAtDesc',
      by: [
        {field: '_createdAt', direction: 'desc'}
      ]
    }
  ]
}; 
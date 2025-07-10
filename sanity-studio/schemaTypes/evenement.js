import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';
import { createRichTextField } from './utils/richTextConfig.js';

export default {
  name: 'evenement',
  title: '📅 Événement',
  type: 'document',
  fields: [
    {
      name: 'nom',
      type: 'string',
      title: 'Nom',
      validation: Rule => Rule.required()
    },
    {
      name: 'univers',
      type: 'reference',
      title: '🌍 Univers d\'origine',
      to: [{ type: 'univers' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      type: 'string',
      title: 'Type d\'événement',
      options: {
        list: [
          { title: '⚔️ Bataille', value: 'bataille' },
          { title: '🏰 Siège', value: 'siege' },
          { title: '🤝 Traité', value: 'traite' },
          { title: '👑 Couronnement', value: 'couronnement' },
          { title: '🎭 Révolution', value: 'revolution' },
          { title: '🌋 Catastrophe', value: 'catastrophe' },
          { title: '✨ Miracle', value: 'miracle' },
          { title: '📚 Découverte', value: 'decouverte' },
          { title: '🏛️ Fondation', value: 'fondation' },
          { title: '💫 Prophétie', value: 'prophetie' }
        ]
      }
    },
    {
      name: 'resume',
      title: 'Résumé',
      description: 'Brève description de l\'événement',
      ...createRichTextField('basic')
    },
    {
      name: 'chronologie',
      type: 'object',
      title: '⏳ Chronologie',
      fields: [
        {
          name: 'debut',
          type: 'string',
          title: 'Date de début'
        },
        {
          name: 'fin',
          type: 'string',
          title: 'Date de fin'
        },
        {
          name: 'duree',
          type: 'string',
          title: 'Durée'
        },
        {
          name: 'periode',
          type: 'reference',
          title: 'Période historique',
          to: [{ type: 'evenement' }]
        },
        {
          name: 'precedents',
          type: 'array',
          title: 'Événements précédents',
          of: [{
            type: 'reference',
            to: [{ type: 'evenement' }]
          }]
        },
        {
          name: 'suivants',
          type: 'array',
          title: 'Événements suivants',
          of: [{
            type: 'reference',
            to: [{ type: 'evenement' }]
          }]
        }
      ]
    },
    {
      name: 'deroulement',
      type: 'object',
      title: '📖 Déroulement',
      fields: [
        {
          name: 'phases',
          type: 'array',
          title: 'Phases',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom de la phase'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'importance',
                type: 'string',
                title: 'Importance',
                options: {
                  list: [
                    { title: '⭐ Cruciale', value: 'cruciale' },
                    { title: '🌟 Majeure', value: 'majeure' },
                    { title: '✨ Mineure', value: 'mineure' }
                  ]
                }
              }
            ]
          }]
        },
        {
          name: 'lieux',
          type: 'array',
          title: 'Lieux',
          of: [{
            type: 'reference',
            to: [{ type: 'region' }]
          }]
        }
      ]
    },
    {
      name: 'participants',
      type: 'object',
      title: '👥 Participants',
      fields: [
        {
          name: 'principaux',
          type: 'array',
          title: 'Acteurs principaux',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'acteur',
                type: 'reference',
                title: 'Acteur',
                to: [
                  { type: 'personnage' },
                  { type: 'faction' }
                ]
              },
              {
                name: 'role',
                type: 'string',
                title: 'Rôle',
                options: {
                  list: [
                    { title: '👑 Leader', value: 'leader' },
                    { title: '⚔️ Commandant', value: 'commandant' },
                    { title: '🎭 Instigateur', value: 'instigateur' },
                    { title: '🛡️ Défenseur', value: 'defenseur' },
                    { title: '⚡ Catalyseur', value: 'catalyseur' },
                    { title: '🤝 Médiateur', value: 'mediateur' },
                    { title: '👁️ Témoin', value: 'temoin' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description du rôle',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'factions',
          type: 'array',
          title: 'Factions impliquées',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'faction',
                type: 'reference',
                title: 'Faction',
                to: [{ type: 'faction' }]
              },
              {
                name: 'camp',
                type: 'string',
                title: 'Camp',
                options: {
                  list: [
                    { title: '⚔️ Agresseur', value: 'agresseur' },
                    { title: '🛡️ Défenseur', value: 'defenseur' },
                    { title: '🤝 Allié', value: 'allie' },
                    { title: '🎭 Neutre', value: 'neutre' },
                    { title: '🕊️ Médiateur', value: 'mediateur' }
                  ]
                }
              },
              {
                name: 'objectifs',
                title: 'Objectifs',
                ...createRichTextField('basic')
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'consequences',
      type: 'object',
      title: '🌟 Conséquences',
      fields: [
        {
          name: 'immediates',
          type: 'array',
          title: 'Conséquences immédiates',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'domaine',
                type: 'string',
                title: 'Domaine',
                options: {
                  list: [
                    { title: '⚔️ Militaire', value: 'militaire' },
                    { title: '👥 Social', value: 'social' },
                    { title: '💰 Économique', value: 'economique' },
                    { title: '🎭 Culturel', value: 'culturel' },
                    { title: '🏛️ Politique', value: 'politique' },
                    { title: '✨ Magique', value: 'magique' },
                    { title: '🌍 Environnemental', value: 'environnemental' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'impact',
                type: 'string',
                title: 'Impact',
                options: {
                  list: [
                    { title: '💥 Catastrophique', value: 'catastrophique' },
                    { title: '⚠️ Majeur', value: 'majeur' },
                    { title: '📝 Modéré', value: 'modere' },
                    { title: '✨ Mineur', value: 'mineur' }
                  ]
                }
              }
            ]
          }]
        },
        {
          name: 'longTerme',
          type: 'array',
          title: 'Conséquences à long terme',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'duree',
                type: 'string',
                title: 'Durée',
                options: {
                  list: [
                    { title: '🌱 Génération', value: 'generation' },
                    { title: '⭐ Siècle', value: 'siecle' },
                    { title: '✨ Millénaire', value: 'millenaire' },
                    { title: '🌌 Permanent', value: 'permanent' }
                  ]
                }
              }
            ]
          }]
        },
        {
          name: 'heritage',
          title: 'Héritage historique',
          ...createRichTextField('medium')
        }
      ]
    },
    {
      name: 'symbolisme',
      type: 'object',
      title: '💫 Symbolisme',
      fields: [
        {
          name: 'interpretation',
          title: 'Interprétation',
          description: 'Signification symbolique de l\'événement',
          ...createRichTextField('basic')
        },
        {
          name: 'representations',
          type: 'array',
          title: 'Représentations culturelles',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'type',
                type: 'string',
                title: 'Type',
                options: {
                  list: [
                    { title: '🎨 Art', value: 'art' },
                    { title: '📚 Littérature', value: 'litterature' },
                    { title: '🎭 Théâtre', value: 'theatre' },
                    { title: '🎵 Musique', value: 'musique' },
                    { title: '🗣️ Tradition orale', value: 'tradition' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'image',
      type: 'image',
      title: '🖼️ Image représentative',
      options: {
        hotspot: true
      }
    },

    // Champs de visibilité
    ...visibilityFields
  ],
  preview: {
    select: {
      title: 'nom',
      subtitle: 'type',
      media: 'image',
      featured: 'featured',
      isPublished: 'isPublished'
    },
    prepare(selection) {
      const { title, subtitle, media, featured, isPublished } = selection;
      
      const featuredEmoji = featured ? '⭐ ' : '';
      const publishedEmoji = isPublished === false ? '👁️ ' : '';
      
      return {
        title: `${publishedEmoji}${featuredEmoji}${title || 'Sans nom'}`,
        subtitle: (subtitle || '') + (isPublished === false ? ' • 🚫 NON PUBLIÉ' : ''),
        media: media
      };
    }
  },
  orderings: [
    ...visibilityOrderings,
    {
      title: 'Nom A-Z',
      name: 'nomAsc',
      by: [{ field: 'nom', direction: 'asc' }]
    },
    {
      title: 'Par type',
      name: 'typeAsc',
      by: [
        { field: 'type', direction: 'asc' },
        { field: 'nom', direction: 'asc' }
      ]
    }
  ]
}
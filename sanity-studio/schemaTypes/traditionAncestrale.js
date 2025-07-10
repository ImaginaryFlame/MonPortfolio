import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';
import { createRichTextField } from './utils/richTextConfig.js';

export default {
    name: 'traditionAncestrale',
    title: '📜 Tradition Ancestrale',
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
      title: 'Type de tradition',
        options: {
          list: [
          { title: '🎭 Art martial', value: 'art_martial' },
          { title: '🧘 Pratique spirituelle', value: 'spirituelle' },
          { title: '🎨 Art traditionnel', value: 'art' },
          { title: '🌿 Médecine ancestrale', value: 'medecine' },
          { title: '🏺 Artisanat', value: 'artisanat' },
          { title: '🎪 Rituel', value: 'rituel' },
          { title: '🎵 Musique et danse', value: 'musique' },
          { title: '📚 Savoir oral', value: 'savoir' }
          ]
        }
      },
      { 
      name: 'resume',
      title: 'Résumé',
      description: 'Brève description de la tradition',
      ...createRichTextField('basic')
    },
    {
      name: 'origines',
      type: 'object',
      title: '📚 Origines',
      fields: [
        {
          name: 'histoire',
          title: 'Histoire',
          description: 'Histoire et origines de la tradition',
          ...createRichTextField('medium')
        },
        {
          name: 'fondateurs',
          type: 'array',
          title: 'Fondateurs',
          of: [{
            type: 'reference',
            to: [{ type: 'personnage' }]
          }]
        },
        {
          name: 'lignee',
          type: 'array',
          title: 'Lignée de transmission',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'maitre',
                type: 'reference',
                title: 'Maître',
                to: [{ type: 'personnage' }]
              },
              {
                name: 'periode',
                type: 'string',
                title: 'Période'
              },
              {
                name: 'contributions',
                title: 'Contributions',
                ...createRichTextField('basic')
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'principes',
      type: 'object',
      title: '🎯 Principes fondamentaux',
      fields: [
        {
          name: 'philosophie',
          title: 'Philosophie',
          ...createRichTextField('medium')
        },
        {
          name: 'valeurs',
          type: 'array',
          title: 'Valeurs',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'regles',
          type: 'array',
          title: 'Règles et codes',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom'
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
                    { title: '⭐ Fondamentale', value: 'fondamentale' },
                    { title: '🌟 Majeure', value: 'majeure' },
                    { title: '✨ Mineure', value: 'mineure' }
                  ]
                }
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'pratiques',
      type: 'object',
      title: '🔄 Pratiques',
      fields: [
        {
          name: 'techniques',
          type: 'array',
          title: 'Techniques',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'niveau',
                type: 'string',
                title: 'Niveau',
                options: {
                  list: [
                    { title: '🌱 Base', value: 'base' },
                    { title: '🌿 Intermédiaire', value: 'intermediaire' },
                    { title: '🌳 Avancé', value: 'avance' },
                    { title: '✨ Secret', value: 'secret' }
                  ]
                }
              },
              {
                name: 'prerequis',
                title: 'Prérequis',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'entrainement',
          type: 'object',
          title: 'Entraînement',
          fields: [
            {
              name: 'methodes',
              title: 'Méthodes',
              ...createRichTextField('medium')
            },
            {
              name: 'etapes',
              type: 'array',
              title: 'Étapes de progression',
              of: [{
                type: 'object',
                fields: [
                  {
                    name: 'nom',
                    type: 'string',
                    title: 'Nom'
                  },
                  {
                    name: 'description',
                    title: 'Description',
                    ...createRichTextField('basic')
                  },
                  {
                    name: 'duree',
                    type: 'string',
                    title: 'Durée approximative'
                  }
                ]
              }]
            }
          ]
        },
        {
          name: 'rituels',
          type: 'array',
          title: 'Rituels',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'occasion',
                type: 'string',
                title: 'Occasion',
                options: {
                  list: [
                    { title: '🎓 Initiation', value: 'initiation' },
                    { title: '⬆️ Passage de grade', value: 'grade' },
                    { title: '🌅 Quotidien', value: 'quotidien' },
                    { title: '🌙 Saisonnier', value: 'saisonnier' },
                    { title: '⭐ Spécial', value: 'special' }
                  ]
                }
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'organisation',
      type: 'object',
      title: '⚜️ Organisation',
      fields: [
        {
          name: 'hierarchie',
          type: 'array',
          title: 'Hiérarchie',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'titre',
                type: 'string',
                title: 'Titre'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'responsabilites',
                title: 'Responsabilités',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'ecoles',
          type: 'array',
          title: 'Écoles',
          of: [{
            type: 'reference',
            to: [{ type: 'faction' }]
          }]
        },
        {
          name: 'transmission',
        title: 'Mode de transmission',
          ...createRichTextField('medium')
        }
      ]
    },
    {
      name: 'influence',
      type: 'object',
      title: '🌟 Influence',
      fields: [
        {
          name: 'impact',
          type: 'array',
          title: 'Impact culturel',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'domaine',
                type: 'string',
                title: 'Domaine',
                options: {
                  list: [
                    { title: '👥 Social', value: 'social' },
                    { title: '🎭 Culturel', value: 'culturel' },
                    { title: '⚔️ Martial', value: 'martial' },
                    { title: '🙏 Spirituel', value: 'spirituel' },
                    { title: '🎨 Artistique', value: 'artistique' },
                    { title: '💪 Physique', value: 'physique' }
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
        },
        {
          name: 'heritage',
          title: 'Héritage contemporain',
          ...createRichTextField('medium')
        },
        {
          name: 'adaptations',
        type: 'array',
          title: 'Adaptations modernes',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom'
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
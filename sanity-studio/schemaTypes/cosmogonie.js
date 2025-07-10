import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';
import { createRichTextField } from './utils/richTextConfig.js';

export default {
  name: 'cosmogonie',
  title: '✨ Cosmogonie',
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
      title: 'Type de cosmogonie',
      options: {
        list: [
          { title: '🌌 Création primordiale', value: 'creation' },
          { title: '🔄 Cycle éternel', value: 'cycle' },
          { title: '🌱 Émergence naturelle', value: 'emergence' },
          { title: '🤖 Design artificiel', value: 'artificiel' },
          { title: '🎭 Illusion cosmique', value: 'illusion' },
          { title: '🌊 Chaos primordial', value: 'chaos' },
          { title: '✨ Manifestation divine', value: 'divin' },
          { title: '🧬 Évolution cosmique', value: 'evolution' }
        ]
      }
    },
    {
      name: 'resume',
      title: 'Résumé',
      description: 'Brève description de la cosmogonie',
      ...createRichTextField('basic')
    },
    {
      name: 'origines',
      type: 'object',
      title: '🌌 Origines',
      fields: [
        {
          name: 'creation',
          title: 'Création du monde',
          ...createRichTextField('medium')
        },
        {
          name: 'etapes',
          type: 'array',
          title: 'Étapes de la création',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom de l\'étape'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'ordre',
                type: 'number',
                title: 'Ordre chronologique'
              }
            ]
          }]
        },
        {
          name: 'forces',
          type: 'array',
          title: 'Forces primordiales',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom de la force'
              },
              {
                name: 'nature',
                type: 'string',
                title: 'Nature',
                options: {
                  list: [
                    { title: '✨ Énergie', value: 'energie' },
                    { title: '🌊 Élément', value: 'element' },
                    { title: '🧠 Conscience', value: 'conscience' },
                    { title: '⚡ Force', value: 'force' },
                    { title: '🌀 Principe', value: 'principe' }
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
      name: 'structure',
      type: 'object',
      title: '🏗️ Structure cosmique',
      fields: [
        {
          name: 'dimensions',
          type: 'array',
          title: 'Dimensions et plans',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom'
              },
              {
                name: 'nature',
                type: 'string',
                title: 'Nature',
                options: {
                  list: [
                    { title: '🌍 Physique', value: 'physique' },
                    { title: '✨ Spirituel', value: 'spirituel' },
                    { title: '🧠 Mental', value: 'mental' },
                    { title: '⚡ Énergétique', value: 'energetique' },
                    { title: '🌀 Astral', value: 'astral' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'habitants',
                type: 'array',
                title: 'Habitants',
                of: [{
                  type: 'reference',
                  to: [
                    { type: 'race' },
                    { type: 'bestiaires' }
                  ]
                }]
              }
            ]
          }]
        },
        {
          name: 'lois',
          type: 'array',
          title: 'Lois universelles',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom de la loi'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'consequences',
                title: 'Conséquences',
                ...createRichTextField('basic')
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'entites',
      type: 'object',
      title: '👥 Entités cosmiques',
      fields: [
        {
          name: 'divinites',
          type: 'array',
          title: 'Divinités',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom'
              },
              {
                name: 'domaine',
                type: 'array',
                title: 'Domaines',
                of: [{
                  type: 'string',
                  options: {
                    list: [
                      { title: '⚡ Énergie', value: 'energie' },
                      { title: '🌊 Eau', value: 'eau' },
                      { title: '🔥 Feu', value: 'feu' },
                      { title: '🌪️ Air', value: 'air' },
                      { title: '🗻 Terre', value: 'terre' },
                      { title: '✨ Lumière', value: 'lumiere' },
                      { title: '🌑 Ténèbres', value: 'tenebres' },
                      { title: '💫 Vie', value: 'vie' },
                      { title: '💀 Mort', value: 'mort' },
                      { title: '⚔️ Guerre', value: 'guerre' },
                      { title: '🕊️ Paix', value: 'paix' },
                      { title: '❤️ Amour', value: 'amour' },
                      { title: '🎨 Art', value: 'art' },
                      { title: '📚 Savoir', value: 'savoir' }
                    ]
                  }
                }]
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'manifestations',
                title: 'Manifestations',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'forces',
          type: 'array',
          title: 'Forces cosmiques',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom'
              },
              {
                name: 'nature',
                type: 'string',
                title: 'Nature',
                options: {
                  list: [
                    { title: '🌌 Cosmique', value: 'cosmique' },
                    { title: '🧬 Naturelle', value: 'naturelle' },
                    { title: '✨ Mystique', value: 'mystique' },
                    { title: '🤖 Artificielle', value: 'artificielle' }
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
      name: 'cycles',
      type: 'object',
      title: '🔄 Cycles cosmiques',
      fields: [
        {
          name: 'temporels',
          type: 'array',
          title: 'Cycles temporels',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom du cycle'
              },
              {
                name: 'duree',
                type: 'string',
                title: 'Durée'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'impact',
                title: 'Impact',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'evenements',
          type: 'array',
          title: 'Événements cycliques',
          of: [{
            type: 'reference',
            to: [{ type: 'evenement' }]
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
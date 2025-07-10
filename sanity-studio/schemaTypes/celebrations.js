import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';
import { createRichTextField } from './utils/richTextConfig.js';

export default {
  name: 'celebrations',
  title: '🎉 Célébration',
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
      title: 'Type de célébration',
      options: {
        list: [
          { title: '🎊 Festival', value: 'festival' },
          { title: '🏛️ Cérémonie', value: 'ceremonie' },
          { title: '⚔️ Rituel', value: 'rituel' },
          { title: '🎭 Carnaval', value: 'carnaval' },
          { title: '🙏 Fête religieuse', value: 'fete_religieuse' },
          { title: '👑 Commémoration', value: 'commemoration' },
          { title: '🌱 Fête saisonnière', value: 'fete_saisonniere' },
          { title: '🎪 Foire', value: 'foire' }
        ]
      }
    },
    {
      name: 'resume',
      title: 'Résumé',
      description: 'Brève description de la célébration',
      ...createRichTextField('basic')
    },
    {
      name: 'histoire',
      title: 'Histoire',
      description: 'Histoire et origines de la célébration',
      ...createRichTextField('medium')
    },
    {
      name: 'deroulement',
      type: 'object',
      title: '📅 Déroulement',
      fields: [
        {
          name: 'frequence',
          type: 'string',
          title: 'Fréquence',
          options: {
            list: [
              { title: '📆 Annuelle', value: 'annuelle' },
              { title: '🌙 Mensuelle', value: 'mensuelle' },
              { title: '🌞 Saisonnière', value: 'saisonniere' },
              { title: '⭐ Exceptionnelle', value: 'exceptionnelle' },
              { title: '🔄 Cyclique', value: 'cyclique' }
            ]
          }
        },
        {
          name: 'duree',
          type: 'object',
          title: 'Durée',
          fields: [
            {
              name: 'nombre',
              type: 'number',
              title: 'Nombre'
            },
            {
              name: 'unite',
              type: 'string',
              title: 'Unité',
              options: {
                list: [
                  { title: '⏰ Heures', value: 'heures' },
                  { title: '📅 Jours', value: 'jours' },
                  { title: '📅 Semaines', value: 'semaines' },
                  { title: '🌙 Mois', value: 'mois' }
                ]
              }
            }
          ]
        },
        {
          name: 'etapes',
          type: 'array',
          title: 'Étapes',
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
        }
      ]
    },
    {
      name: 'participants',
      type: 'object',
      title: '👥 Participants',
      fields: [
        {
          name: 'organisateurs',
          type: 'array',
          title: 'Organisateurs',
          of: [{
            type: 'reference',
            to: [{ type: 'faction' }]
          }]
        },
        {
          name: 'roles',
          type: 'array',
          title: 'Rôles spécifiques',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'titre',
                type: 'string',
                title: 'Titre du rôle'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'conditions',
                title: 'Conditions d\'accès',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'restrictions',
          type: 'array',
          title: 'Restrictions de participation',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'type',
                type: 'string',
                title: 'Type de restriction',
                options: {
                  list: [
                    { title: '👥 Sociale', value: 'sociale' },
                    { title: '🏰 Géographique', value: 'geographique' },
                    { title: '✨ Magique', value: 'magique' },
                    { title: '⚔️ Martiale', value: 'martiale' },
                    { title: '🎭 Culturelle', value: 'culturelle' }
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
      name: 'elements',
      type: 'object',
      title: '🎭 Éléments de célébration',
      fields: [
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
                title: 'Nom du rituel'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'symbolisme',
                title: 'Symbolisme',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'objets',
          type: 'array',
          title: 'Objets rituels',
          of: [{
            type: 'reference',
            to: [{ type: 'objet' }]
          }]
        },
        {
          name: 'musiques',
          type: 'array',
          title: 'Musiques et chants',
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
                name: 'paroles',
                type: 'text',
                title: 'Paroles',
                rows: 5
              }
            ]
          }]
        },
        {
          name: 'costumes',
          type: 'array',
          title: 'Costumes et tenues',
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
                name: 'symbolisme',
                title: 'Symbolisme',
                ...createRichTextField('basic')
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'signification',
      type: 'object',
      title: '💫 Signification',
      fields: [
        {
          name: 'symbolisme',
          title: 'Symbolisme',
          description: 'Signification symbolique de la célébration',
          ...createRichTextField('basic')
        },
        {
          name: 'valeurs',
          type: 'array',
          title: 'Valeurs célébrées',
          of: [{
            type: 'string',
            options: {
              list: [
                { title: '⚔️ Honneur', value: 'honneur' },
                { title: '🤝 Unité', value: 'unite' },
                { title: '✨ Spiritualité', value: 'spiritualite' },
                { title: '🌱 Nature', value: 'nature' },
                { title: '💪 Force', value: 'force' },
                { title: '🎨 Art', value: 'art' },
                { title: '❤️ Amour', value: 'amour' },
                { title: '🌟 Espoir', value: 'espoir' },
                { title: '📚 Savoir', value: 'savoir' },
                { title: '⚖️ Justice', value: 'justice' }
              ]
            }
          }]
        },
        {
          name: 'impact',
          type: 'array',
          title: 'Impact social',
          of: [{
            type: 'string',
            options: {
              list: [
                { title: '🤝 Cohésion sociale', value: 'cohesion' },
                { title: '🎭 Expression culturelle', value: 'expression' },
                { title: '✨ Renouveau spirituel', value: 'renouveau' },
                { title: '💫 Transmission', value: 'transmission' },
                { title: '⚖️ Régulation sociale', value: 'regulation' }
              ]
            }
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
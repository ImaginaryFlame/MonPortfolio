import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';
import { createRichTextField } from './utils/richTextConfig.js';

export default {
  name: 'objet',
  title: '🎁 Objet',
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
      title: 'Type d\'objet',
      options: {
        list: [
          { title: '⚔️ Arme', value: 'arme' },
          { title: '🛡️ Armure', value: 'armure' },
          { title: '💍 Bijou', value: 'bijou' },
          { title: '📜 Parchemin', value: 'parchemin' },
          { title: '📚 Livre', value: 'livre' },
          { title: '🔮 Artefact', value: 'artefact' },
          { title: '⚗️ Potion', value: 'potion' },
          { title: '🎭 Masque', value: 'masque' },
          { title: '🗝️ Clé', value: 'cle' },
          { title: '🏺 Relique', value: 'relique' }
        ]
      }
    },
    {
      name: 'resume',
      title: 'Résumé',
      description: 'Brève description de l\'objet',
      ...createRichTextField('basic')
    },
    {
      name: 'caracteristiques',
      type: 'object',
      title: '📋 Caractéristiques',
      fields: [
        {
          name: 'apparence',
          title: 'Apparence',
          ...createRichTextField('basic')
        },
        {
          name: 'materiaux',
          type: 'array',
          title: 'Matériaux',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom du matériau'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'proprietes',
                type: 'array',
                title: 'Propriétés',
                of: [{ type: 'string' }]
              }
            ]
          }]
        },
        {
          name: 'dimensions',
          type: 'object',
          title: 'Dimensions',
          fields: [
            {
              name: 'taille',
              type: 'string',
              title: 'Taille'
            },
            {
              name: 'poids',
              type: 'string',
              title: 'Poids'
            }
          ]
        },
        {
          name: 'etat',
          type: 'string',
          title: 'État de conservation',
          options: {
            list: [
              { title: '✨ Parfait', value: 'parfait' },
              { title: '🌟 Bon', value: 'bon' },
              { title: '📝 Usé', value: 'use' },
              { title: '⚠️ Endommagé', value: 'endommage' },
              { title: '💔 Brisé', value: 'brise' }
            ]
          }
        }
      ]
    },
    {
      name: 'pouvoirs',
      type: 'object',
      title: '✨ Pouvoirs',
      fields: [
        {
          name: 'capacites',
          type: 'array',
          title: 'Capacités',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom de la capacité'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'type',
                type: 'string',
                title: 'Type',
                options: {
                  list: [
                    { title: '✨ Magique', value: 'magique' },
                    { title: '⚡ Énergétique', value: 'energetique' },
                    { title: '🧪 Alchimique', value: 'alchimique' },
                    { title: '🤖 Technologique', value: 'technologique' },
                    { title: '🧠 Psychique', value: 'psychique' }
                  ]
                }
              },
              {
                name: 'conditions',
                title: 'Conditions d\'utilisation',
                ...createRichTextField('basic')
              },
              {
                name: 'limitations',
                title: 'Limitations',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'enchantements',
          type: 'array',
          title: '🔮 Enchantements',
          of: [{
            type: 'reference',
            to: [{ type: 'systemeEsoterique' }]
          }]
        }
      ]
    },
    {
      name: 'histoire',
      type: 'object',
      title: '📚 Histoire',
      fields: [
        {
          name: 'origine',
          title: 'Origine',
          ...createRichTextField('medium')
        },
        {
          name: 'createur',
          type: 'reference',
          title: 'Créateur',
          to: [
            { type: 'personnage' },
            { type: 'faction' }
          ]
        },
        {
          name: 'proprietaires',
          type: 'array',
          title: 'Propriétaires',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'proprietaire',
                type: 'reference',
                title: 'Propriétaire',
                to: [
                  { type: 'personnage' },
                  { type: 'faction' }
                ]
              },
              {
                name: 'periode',
                type: 'string',
                title: 'Période de possession'
              },
              {
                name: 'circonstances',
                title: 'Circonstances',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'evenements',
          type: 'array',
          title: 'Événements marquants',
          of: [{
            type: 'reference',
            to: [{ type: 'evenement' }]
          }]
        }
      ]
    },
    {
      name: 'utilisation',
      type: 'object',
      title: '🔧 Utilisation',
      fields: [
        {
          name: 'fonctions',
          type: 'array',
          title: 'Fonctions',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom de la fonction'
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
          name: 'restrictions',
          type: 'array',
          title: 'Restrictions d\'utilisation',
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
                    { title: '✨ Magique', value: 'magique' },
                    { title: '💪 Physique', value: 'physique' },
                    { title: '🧠 Mentale', value: 'mentale' },
                    { title: '⚔️ Martiale', value: 'martiale' }
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
          name: 'risques',
          type: 'array',
          title: 'Risques et dangers',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'severite',
                type: 'string',
                title: 'Sévérité',
                options: {
                  list: [
                    { title: '⚠️ Mineur', value: 'mineur' },
                    { title: '⛔ Majeur', value: 'majeur' },
                    { title: '💀 Fatal', value: 'fatal' }
                  ]
                }
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'symbolisme',
      type: 'object',
      title: '💫 Symbolisme',
      fields: [
        {
          name: 'signification',
          title: 'Signification',
          description: 'Signification symbolique de l\'objet',
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
import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';
import { createRichTextField } from './utils/richTextConfig.js';

export default {
  name: 'bestiaires',
  title: '🐾 Bestiaire',
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
      title: 'Type de créature',
      options: {
        list: [
          { title: '🐉 Dragon', value: 'dragon' },
          { title: '🦁 Bête', value: 'bete' },
          { title: '👻 Esprit', value: 'esprit' },
          { title: '🧟 Mort-vivant', value: 'mort_vivant' },
          { title: '🌱 Plante', value: 'plante' },
          { title: '🦎 Reptile', value: 'reptile' },
          { title: '🐦 Oiseau', value: 'oiseau' },
          { title: '🐟 Poisson', value: 'poisson' },
          { title: '🦊 Mammifère', value: 'mammifere' },
          { title: '🕷️ Arthropode', value: 'arthropode' },
          { title: '🦠 Microorganisme', value: 'microorganisme' },
          { title: '👽 Extraterrestre', value: 'extraterrestre' },
          { title: '🤖 Artificiel', value: 'artificiel' },
          { title: '🧪 Mutant', value: 'mutant' }
        ]
      }
    },
    {
      name: 'resume',
      title: 'Résumé',
      description: 'Brève description de la créature',
      ...createRichTextField('basic')
    },
    {
      name: 'caracteristiquesPhysiques',
      type: 'object',
      title: '🧬 Caractéristiques physiques',
      fields: [
        {
          name: 'apparence',
          title: 'Apparence',
          ...createRichTextField('basic')
        },
        {
          name: 'taille',
          type: 'object',
          title: 'Taille',
          fields: [
            {
              name: 'min',
              type: 'number',
              title: 'Taille minimale (cm)'
            },
            {
              name: 'max',
              type: 'number',
              title: 'Taille maximale (cm)'
            }
          ]
        },
        {
          name: 'poids',
          type: 'object',
          title: 'Poids',
          fields: [
            {
              name: 'min',
              type: 'number',
              title: 'Poids minimal (kg)'
            },
            {
              name: 'max',
              type: 'number',
              title: 'Poids maximal (kg)'
            }
          ]
        },
        {
          name: 'longevite',
          type: 'object',
          title: 'Longévité',
          fields: [
            {
              name: 'esperanceVie',
              type: 'number',
              title: 'Espérance de vie moyenne (années)'
            },
            {
              name: 'maturite',
              type: 'number',
              title: 'Âge de la maturité'
            }
          ]
        },
        {
          name: 'particularites',
          type: 'array',
          title: 'Particularités physiques',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom de la particularité'
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
      name: 'comportement',
      type: 'object',
      title: '🧠 Comportement',
      fields: [
        {
          name: 'intelligence',
          type: 'string',
          title: 'Niveau d\'intelligence',
          options: {
            list: [
              { title: '🪨 Aucune', value: 'aucune' },
              { title: '🦊 Animale', value: 'animale' },
              { title: '🧠 Primitive', value: 'primitive' },
              { title: '👤 Humaine', value: 'humaine' },
              { title: '🎓 Supérieure', value: 'superieure' }
            ]
          }
        },
        {
          name: 'temperament',
          type: 'array',
          title: 'Tempérament',
          of: [{
            type: 'string',
            options: {
              list: [
                { title: '😠 Agressif', value: 'agressif' },
                { title: '😊 Pacifique', value: 'pacifique' },
                { title: '🏃 Craintif', value: 'craintif' },
                { title: '🤝 Social', value: 'social' },
                { title: '🐺 Solitaire', value: 'solitaire' },
                { title: '🎯 Territorial', value: 'territorial' },
                { title: '🦊 Rusé', value: 'ruse' },
                { title: '🎭 Imprévisible', value: 'imprevisible' }
              ]
            }
          }]
        },
        {
          name: 'organisation',
          type: 'string',
          title: 'Organisation sociale',
          options: {
            list: [
              { title: '🐺 Solitaire', value: 'solitaire' },
              { title: '👥 Groupe', value: 'groupe' },
              { title: '👑 Hiérarchique', value: 'hierarchique' },
              { title: '🏰 Colonie', value: 'colonie' },
              { title: '🤝 Symbiose', value: 'symbiose' }
            ]
          }
        },
        {
          name: 'description',
          title: 'Description du comportement',
          ...createRichTextField('basic')
        }
      ]
    },
    {
      name: 'habitat',
      type: 'object',
      title: '🏠 Habitat',
      fields: [
        {
          name: 'regions',
          type: 'array',
          title: 'Régions',
          of: [{
            type: 'reference',
            to: [{ type: 'region' }]
          }]
        },
        {
          name: 'environnements',
          type: 'array',
          title: 'Environnements',
          of: [{
            type: 'string',
            options: {
              list: [
                { title: '🏔️ Montagne', value: 'montagne' },
                { title: '🌊 Océan', value: 'ocean' },
                { title: '🏜️ Désert', value: 'desert' },
                { title: '🌳 Forêt', value: 'foret' },
                { title: '🏞️ Plaine', value: 'plaine' },
                { title: '❄️ Toundra', value: 'toundra' },
                { title: '🌋 Volcanique', value: 'volcanique' },
                { title: '🏙️ Urbain', value: 'urbain' },
                { title: '🕌 Souterrain', value: 'souterrain' }
              ]
            }
          }]
        },
        {
          name: 'description',
          title: 'Description de l\'habitat',
          ...createRichTextField('basic')
        }
      ]
    },
    {
      name: 'capacites',
      type: 'object',
      title: '✨ Capacités',
      fields: [
        {
          name: 'naturelles',
          type: 'array',
          title: 'Capacités naturelles',
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
                name: 'limitations',
                title: 'Limitations',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'magiques',
          type: 'array',
          title: '🔮 Capacités magiques',
          of: [{
            type: 'reference',
            to: [{ type: 'systemeEsoterique' }]
          }]
        }
      ]
    },
    {
      name: 'interactions',
      type: 'object',
      title: '🤝 Interactions',
      fields: [
        {
          name: 'proies',
          type: 'array',
          title: 'Proies',
          of: [{
            type: 'reference',
            to: [{ type: 'bestiaires' }]
          }]
        },
        {
          name: 'predateurs',
          type: 'array',
          title: 'Prédateurs',
          of: [{
            type: 'reference',
            to: [{ type: 'bestiaires' }]
          }]
        },
        {
          name: 'symbioses',
          type: 'array',
          title: 'Relations symbiotiques',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'creature',
                type: 'reference',
                title: 'Créature',
                to: [{ type: 'bestiaires' }]
              },
              {
                name: 'type',
                type: 'string',
                title: 'Type de symbiose',
                options: {
                  list: [
                    { title: '🤝 Mutualisme', value: 'mutualisme' },
                    { title: '🔄 Commensalisme', value: 'commensalisme' },
                    { title: '⚔️ Parasitisme', value: 'parasitisme' }
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
      name: 'roleNarratif',
      type: 'object',
      title: '📖 Rôle narratif',
      fields: [
        {
          name: 'fonction',
          type: 'array',
          title: 'Fonction dans l\'histoire',
          of: [{
            type: 'string',
            options: {
              list: [
                { title: '⚔️ Antagoniste', value: 'antagoniste' },
                { title: '🤝 Allié', value: 'allie' },
                { title: '🎭 Neutre', value: 'neutre' },
                { title: '🎪 Ambiance', value: 'ambiance' },
                { title: '💫 Symbolique', value: 'symbolique' }
              ]
            }
          }]
        },
        {
          name: 'symbolisme',
          title: 'Symbolisme',
          description: 'Signification symbolique de la créature',
          ...createRichTextField('basic')
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
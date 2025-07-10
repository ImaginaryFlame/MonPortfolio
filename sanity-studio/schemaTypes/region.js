import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';
import { createRichTextField } from './utils/richTextConfig.js';

export default {
  name: 'region',
  title: '🗺️ Région',
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
      title: 'Type de région',
      options: {
        list: [
          { title: '🏰 Royaume', value: 'royaume' },
          { title: '🏛️ Empire', value: 'empire' },
          { title: '🏙️ Cité-État', value: 'cite' },
          { title: '🌆 Ville', value: 'ville' },
          { title: '🏘️ Village', value: 'village' },
          { title: '🏞️ Province', value: 'province' },
          { title: '🗺️ Territoire', value: 'territoire' },
          { title: '🏝️ Île', value: 'ile' },
          { title: '🌋 Zone sauvage', value: 'sauvage' }
        ]
      }
    },
    {
      name: 'resume',
      title: 'Résumé',
      description: 'Brève description de la région',
      ...createRichTextField('basic')
    },
    {
      name: 'geographie',
      type: 'object',
      title: '🌍 Géographie',
      fields: [
        {
          name: 'localisation',
          title: 'Localisation',
          ...createRichTextField('basic')
        },
        {
          name: 'climat',
          type: 'string',
          title: 'Climat',
          options: {
            list: [
              { title: '🌞 Tropical', value: 'tropical' },
              { title: '🏜️ Aride', value: 'aride' },
              { title: '🌤️ Tempéré', value: 'tempere' },
              { title: '❄️ Polaire', value: 'polaire' },
              { title: '⛰️ Montagneux', value: 'montagneux' },
              { title: '🌧️ Océanique', value: 'oceanique' },
              { title: '🌫️ Continental', value: 'continental' }
            ]
          }
        },
        {
          name: 'terrain',
          type: 'array',
          title: 'Types de terrain',
          of: [{
            type: 'string',
            options: {
              list: [
                { title: '🏔️ Montagnes', value: 'montagnes' },
                { title: '🌳 Forêt', value: 'foret' },
                { title: '🏞️ Plaines', value: 'plaines' },
                { title: '🏜️ Désert', value: 'desert' },
                { title: '💧 Marais', value: 'marais' },
                { title: '🏖️ Côte', value: 'cote' },
                { title: '🗻 Collines', value: 'collines' },
                { title: '🌊 Océan', value: 'ocean' },
                { title: '❄️ Toundra', value: 'toundra' }
              ]
            }
          }]
        },
        {
          name: 'ressources',
          type: 'array',
          title: 'Ressources naturelles',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom'
              },
              {
                name: 'type',
                type: 'string',
                title: 'Type',
                options: {
                  list: [
                    { title: '💎 Minéral', value: 'mineral' },
                    { title: '🌲 Végétal', value: 'vegetal' },
                    { title: '🐾 Animal', value: 'animal' },
                    { title: '💧 Aquatique', value: 'aquatique' },
                    { title: '✨ Magique', value: 'magique' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'importance',
                type: 'string',
                title: 'Importance économique',
                options: {
                  list: [
                    { title: '⭐ Vitale', value: 'vitale' },
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
      name: 'politique',
      type: 'object',
      title: '👑 Politique',
      fields: [
        {
          name: 'gouvernement',
          type: 'object',
          title: 'Gouvernement',
          fields: [
            {
              name: 'type',
              type: 'string',
              title: 'Type de gouvernement',
              options: {
                list: [
                  { title: '👑 Monarchie', value: 'monarchie' },
                  { title: '🏛️ République', value: 'republique' },
                  { title: '⚔️ Oligarchie', value: 'oligarchie' },
                  { title: '🎭 Théocratie', value: 'theocratie' },
                  { title: '🗽 Démocratie', value: 'democratie' },
                  { title: '👥 Tribal', value: 'tribal' }
                ]
              }
            },
            {
              name: 'description',
              title: 'Description',
              ...createRichTextField('basic')
            }
          ]
        },
        {
          name: 'dirigeants',
          type: 'array',
          title: 'Dirigeants',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'dirigeant',
                type: 'reference',
                title: 'Dirigeant',
                to: [{ type: 'personnage' }]
              },
              {
                name: 'titre',
                type: 'string',
                title: 'Titre'
              },
              {
                name: 'periode',
                type: 'string',
                title: 'Période de règne'
              }
            ]
          }]
        },
        {
          name: 'factions',
          type: 'array',
          title: 'Factions influentes',
          of: [{
            type: 'reference',
            to: [{ type: 'faction' }]
          }]
        },
        {
          name: 'relations',
          type: 'array',
          title: 'Relations diplomatiques',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'region',
                type: 'reference',
                title: 'Région',
                to: [{ type: 'region' }]
              },
              {
                name: 'type',
                type: 'string',
                title: 'Type de relation',
                options: {
                  list: [
                    { title: '🤝 Alliance', value: 'alliance' },
                    { title: '⚔️ Conflit', value: 'conflit' },
                    { title: '🤲 Vassalité', value: 'vassalite' },
                    { title: '💰 Commerce', value: 'commerce' },
                    { title: '🎭 Rivalité', value: 'rivalite' },
                    { title: '🕊️ Neutralité', value: 'neutralite' }
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
      name: 'societe',
      type: 'object',
      title: '👥 Société',
      fields: [
        {
          name: 'factionsPresentes',
          type: 'array',
          title: '🏰 Factions présentes',
          of: [{ type: 'reference', to: [{ type: 'faction' }] }]
        },
        {
          name: 'races',
          type: 'array',
          title: '👥 Races et peuples',
          of: [{ type: 'reference', to: [{ type: 'race' }] }]
        },
        {
          name: 'bestiaire',
          type: 'array',
          title: '🐾 Créatures locales',
          of: [{ type: 'reference', to: [{ type: 'bestiaires' }] }]
        }
      ]
    },
    {
      name: 'culture',
      type: 'object',
      title: '🎭 Culture',
      fields: [
        {
          name: 'traditionsAncestrales',
          type: 'array',
          title: '📚 Traditions locales',
          of: [{ type: 'reference', to: [{ type: 'traditionAncestrale' }] }]
        },
        {
          name: 'dogmesReligieux',
          type: 'array',
          title: '🕊️ Croyances dominantes',
          of: [{ type: 'reference', to: [{ type: 'dogmeReligieux' }] }]
        },
        {
          name: 'celebrations',
          type: 'array',
          title: '🎉 Célébrations locales',
          of: [{ type: 'reference', to: [{ type: 'celebrations' }] }]
        }
      ]
    },
    {
      name: 'pouvoir',
      type: 'object',
      title: '✨ Aspects mystiques',
      fields: [
        {
          name: 'systemesEsoteriques',
          type: 'array',
          title: '🔮 Systèmes ésotériques pratiqués',
          of: [{ type: 'reference', to: [{ type: 'systemeEsoterique' }] }]
        },
        {
          name: 'artefacts',
          type: 'array',
          title: '🎭 Artefacts régionaux',
          of: [{ type: 'reference', to: [{ type: 'objet' }] }]
        }
      ]
    },
    {
      name: 'histoire',
      type: 'object',
      title: '📖 Histoire',
      fields: [
        {
          name: 'evenementsMarquants',
          type: 'array',
          title: '📅 Événements marquants',
          of: [{ type: 'reference', to: [{ type: 'evenement' }] }]
        }
      ]
    },
    {
      name: 'lieux',
      type: 'array',
      title: '🏛️ Lieux notables',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'nom',
            type: 'string',
            title: 'Nom'
          },
          {
            name: 'type',
            type: 'string',
            title: 'Type',
            options: {
              list: [
                { title: '🏰 Château', value: 'chateau' },
                { title: '⛪ Temple', value: 'temple' },
                { title: '🏛️ Monument', value: 'monument' },
                { title: '🏺 Ruine', value: 'ruine' },
                { title: '🌳 Site naturel', value: 'site_naturel' },
                { title: '🏠 Quartier', value: 'quartier' },
                { title: '🏪 Marché', value: 'marche' }
              ]
            }
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
                { title: '⭐ Majeur', value: 'majeur' },
                { title: '🌟 Notable', value: 'notable' },
                { title: '✨ Local', value: 'local' }
              ]
            }
          }
        ]
      }]
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
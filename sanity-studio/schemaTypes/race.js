import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';
import { createRichTextField } from './utils/richTextConfig.js';

export default {
  name: 'race',
  title: '👥 Race',
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
      title: 'Type',
      options: {
        list: [
          { title: '🧝‍♂️ Humanoïde', value: 'humanoide' },
          { title: '🐉 Créature mythologique', value: 'mythologique' },
          { title: '👽 Extraterrestre', value: 'extraterrestre' },
          { title: '🤖 Artificiel', value: 'artificiel' },
          { title: '👻 Éthéré/Spirituel', value: 'etheree' },
          { title: '🧬 Métamorphe', value: 'metamorphe' },
          { title: '🌱 Végétal', value: 'vegetal' },
          { title: '🦊 Animal évolué', value: 'animal' }
        ]
      }
    },
    {
      name: 'resume',
      title: 'Résumé',
      description: 'Brève description de la race',
      ...createRichTextField('basic')
    },
    {
      name: 'histoire',
      title: 'Histoire',
      description: 'Histoire détaillée de la race',
      ...createRichTextField('medium')
    },
    {
      name: 'caracteristiquesPhysiques',
      type: 'object',
      title: '🧬 Caractéristiques physiques',
      fields: [
        {
          name: 'apparence',
          title: 'Apparence générale',
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
      name: 'culture',
      type: 'object',
      title: '🎭 Culture et société',
      fields: [
        {
          name: 'organisation',
          title: 'Organisation sociale',
          ...createRichTextField('basic')
        },
        {
          name: 'valeurs',
          type: 'array',
          title: 'Valeurs fondamentales',
          of: [{
            type: 'string',
            options: {
              list: [
                { title: '⚔️ Honneur', value: 'honneur' },
                { title: '🤝 Loyauté', value: 'loyaute' },
                { title: '📚 Savoir', value: 'savoir' },
                { title: '💪 Force', value: 'force' },
                { title: '🌱 Nature', value: 'nature' },
                { title: '✨ Magie', value: 'magie' },
                { title: '⚖️ Justice', value: 'justice' },
                { title: '🎨 Art', value: 'art' },
                { title: '💰 Richesse', value: 'richesse' },
                { title: '🤲 Spiritualité', value: 'spiritualite' }
              ]
            }
          }]
        },
        {
          name: 'traditions',
          type: 'array',
          title: 'Traditions',
          of: [{
            type: 'reference',
            to: [{ type: 'celebrations' }]
          }]
        },
        {
          name: 'langues',
          type: 'array',
          title: 'Langues',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom de la langue'
              },
              {
                name: 'type',
                type: 'string',
                title: 'Type',
                options: {
                  list: [
                    { title: '📢 Parlée', value: 'parlee' },
                    { title: '✍️ Écrite', value: 'ecrite' },
                    { title: '🧠 Télépathique', value: 'telepathique' },
                    { title: '🎵 Musicale', value: 'musicale' },
                    { title: '🔮 Magique', value: 'magique' }
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
      name: 'relations',
      type: 'object',
      title: '🤝 Relations',
      fields: [
        {
          name: 'allies',
          type: 'array',
          title: 'Alliés',
          of: [{
            type: 'reference',
            to: [{ type: 'race' }, { type: 'faction' }]
          }]
        },
        {
          name: 'rivaux',
          type: 'array',
          title: 'Rivaux',
          of: [{
            type: 'reference',
            to: [{ type: 'race' }, { type: 'faction' }]
          }]
        },
        {
          name: 'neutres',
          type: 'array',
          title: 'Relations neutres',
          of: [{
            type: 'reference',
            to: [{ type: 'race' }, { type: 'faction' }]
          }]
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
          title: 'Régions principales',
          of: [{
            type: 'reference',
            to: [{ type: 'region' }]
          }]
        },
        {
          name: 'environnementPreference',
          type: 'array',
          title: 'Environnements préférés',
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
          name: 'architecture',
          title: 'Style architectural',
          ...createRichTextField('basic')
        }
      ]
    },
    {
      name: 'technologie',
      type: 'object',
      title: '🔧 Technologie',
      fields: [
        {
          name: 'niveau',
          type: 'string',
          title: 'Niveau technologique',
          options: {
            list: [
              { title: '🪨 Primitif', value: 'primitif' },
              { title: '⚔️ Médiéval', value: 'medieval' },
              { title: '⚡ Industriel', value: 'industriel' },
              { title: '🚀 Spatial', value: 'spatial' },
              { title: '🤖 Post-singularité', value: 'post_singularite' }
            ]
          }
        },
        {
          name: 'specialites',
          type: 'array',
          title: 'Spécialités technologiques',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'domaine',
                type: 'string',
                title: 'Domaine',
                options: {
                  list: [
                    { title: '⚔️ Armement', value: 'armement' },
                    { title: '🏥 Médecine', value: 'medecine' },
                    { title: '🚀 Transport', value: 'transport' },
                    { title: '🏭 Production', value: 'production' },
                    { title: '🔮 Magitech', value: 'magitech' },
                    { title: '🧬 Biotechnologie', value: 'biotech' }
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
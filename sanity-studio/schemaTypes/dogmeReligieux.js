import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';
import { createRichTextField } from './utils/richTextConfig.js';

export default {
    name: 'dogmeReligieux',
    title: '🙏 Dogme Religieux',
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
      title: 'Type de dogme',
      options: {
        list: [
          { title: '🌟 Monothéisme', value: 'monotheisme' },
          { title: '✨ Polythéisme', value: 'polytheisme' },
          { title: '🌱 Animisme', value: 'animisme' },
          { title: '🧘 Philosophie spirituelle', value: 'philosophie' },
          { title: '🔮 Mysticisme', value: 'mysticisme' },
          { title: '⚡ Culte de la force', value: 'force' },
          { title: '🌌 Cosmologie sacrée', value: 'cosmologie' },
          { title: '👻 Culte des ancêtres', value: 'ancetres' }
        ]
      }
    },
    {
      name: 'resume',
      title: 'Résumé',
      description: 'Brève description du dogme religieux',
      ...createRichTextField('basic')
    },
    {
      name: 'fondements',
      type: 'object',
      title: '📜 Fondements',
      fields: [
        {
          name: 'histoire',
          title: 'Histoire',
          description: 'Histoire et origines du dogme',
          ...createRichTextField('medium')
        },
        {
          name: 'textesSacres',
          type: 'array',
          title: 'Textes sacrés',
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
                name: 'importance',
                type: 'string',
                title: 'Importance',
                options: {
                  list: [
                    { title: '⭐ Fondamental', value: 'fondamental' },
                    { title: '🌟 Majeur', value: 'majeur' },
                    { title: '✨ Secondaire', value: 'secondaire' }
                  ]
                }
              }
            ]
          }]
        },
        {
          name: 'principesClefs',
          type: 'array',
          title: 'Principes clefs',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom du principe'
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
      name: 'divinites',
      type: 'object',
      title: '👑 Divinités et entités',
      fields: [
        {
          name: 'pantheon',
          type: 'array',
          title: 'Panthéon',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom'
              },
              {
                name: 'rang',
                type: 'string',
                title: 'Rang hiérarchique',
                options: {
                  list: [
                    { title: '👑 Divinité suprême', value: 'supreme' },
                    { title: '⭐ Divinité majeure', value: 'majeure' },
                    { title: '✨ Divinité mineure', value: 'mineure' },
                    { title: '👻 Esprit', value: 'esprit' },
                    { title: '👼 Messager', value: 'messager' }
                  ]
                }
              },
              {
                name: 'domaines',
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
                name: 'symboles',
                type: 'array',
                title: 'Symboles associés',
                of: [{ type: 'string' }]
              }
            ]
          }]
        },
        {
          name: 'hierarchie',
          title: 'Hiérarchie divine',
          ...createRichTextField('basic')
        },
        {
          name: 'relations',
          type: 'array',
          title: 'Relations entre divinités',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'type',
                type: 'string',
                title: 'Type de relation',
                options: {
                  list: [
                    { title: '👪 Famille', value: 'famille' },
                    { title: '🤝 Alliance', value: 'alliance' },
                    { title: '⚔️ Rivalité', value: 'rivalite' },
                    { title: '🎭 Opposition', value: 'opposition' },
                    { title: '🔄 Complémentarité', value: 'complementarite' }
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
      name: 'pratiques',
      type: 'object',
      title: '🕯️ Pratiques religieuses',
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
        name: 'type', 
        type: 'string', 
        title: 'Type',
        options: {
          list: [
                    { title: '🙏 Prière', value: 'priere' },
                    { title: '🎭 Cérémonie', value: 'ceremonie' },
                    { title: '✨ Sacrifice', value: 'sacrifice' },
                    { title: '🎪 Festival', value: 'festival' },
                    { title: '🧘 Méditation', value: 'meditation' }
          ]
        }
      },
      { 
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'frequence',
                type: 'string',
                title: 'Fréquence',
                options: {
                  list: [
                    { title: '📆 Quotidien', value: 'quotidien' },
                    { title: '🌙 Hebdomadaire', value: 'hebdomadaire' },
                    { title: '🌞 Mensuel', value: 'mensuel' },
                    { title: '🌱 Saisonnier', value: 'saisonnier' },
                    { title: '⭐ Annuel', value: 'annuel' },
                    { title: '✨ Occasionnel', value: 'occasionnel' }
                  ]
                }
              }
            ]
          }]
        },
        {
          name: 'celebrations',
          type: 'array',
          title: 'Célébrations',
          of: [{
            type: 'reference',
            to: [{ type: 'celebrations' }]
          }]
        },
        {
          name: 'interdits',
          type: 'array',
          title: 'Interdits et tabous',
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
                    { title: '💀 Absolu', value: 'absolu' }
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
      title: '⚜️ Organisation religieuse',
      fields: [
        {
          name: 'hierarchie',
          type: 'array',
          title: 'Hiérarchie religieuse',
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
          name: 'institutions',
          type: 'array',
          title: 'Institutions',
          of: [{
            type: 'reference',
            to: [{ type: 'faction' }]
          }]
        },
        {
          name: 'lieuxSacres',
        type: 'array',
          title: 'Lieux sacrés',
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
                    { title: '🏛️ Temple', value: 'temple' },
                    { title: '⛪ Église', value: 'eglise' },
                    { title: '🕌 Sanctuaire', value: 'sanctuaire' },
                    { title: '🗻 Site naturel', value: 'site_naturel' },
                    { title: '🏰 Monastère', value: 'monastere' }
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
                    { title: '🌟 Important', value: 'important' },
                    { title: '✨ Local', value: 'local' }
                  ]
                }
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
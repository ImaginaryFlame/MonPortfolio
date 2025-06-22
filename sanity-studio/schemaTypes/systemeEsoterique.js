export default {
  name: 'systemeEsoterique',
  title: 'Système Ésotérique',
  type: 'document',
  description: 'Système de pouvoir, de magie, d\'alchimie ou autre force mystique/ésotérique',
  fields: [
    {
      name: 'nom',
      type: 'string',
      title: 'Nom du système',
      description: 'Nom officiel du système ésotérique (ex: Abstraiya, Magie élémentaire, Alchimie...)',
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      type: 'string',
      title: 'Type de système',
      description: 'Nature fondamentale du système',
      options: {
        list: [
          {
            title: 'Énergie conceptuelle',
            value: 'energie_conceptuelle',
            description: 'Système basé sur des concepts, l\'imagination, les émotions (ex: Abstraiya)'
          },
          {
            title: 'Magie',
            value: 'magie',
            description: 'Système de magie traditionnel'
          },
          {
            title: 'Alchimie',
            value: 'alchimie',
            description: 'Transformation de la matière et des énergies'
          },
          {
            title: 'Force vitale',
            value: 'force_vitale',
            description: 'Manipulation de l\'énergie vitale'
          },
          {
            title: 'Système hybride',
            value: 'hybride',
            description: 'Combinaison de plusieurs types de systèmes'
          }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'autresNoms',
      type: 'array',
      title: 'Autres noms',
      description: 'Autres appellations connues de ce système',
      of: [{type: 'string'}]
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description générale',
      description: 'Description globale du système',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'themes',
      type: 'array',
      title: 'Thèmes',
      description: 'Thèmes et concepts liés à ce système',
      of: [{type: 'string'}]
    },
    {
      name: 'origine',
      type: 'object',
      title: 'Origine',
      fields: [
        {
          name: 'sourcesPrincipales',
          type: 'array',
          title: 'Sources principales',
          of: [{type: 'string'}]
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description de l\'origine',
          rows: 3
        }
      ]
    },
    {
      name: 'manifestations',
      type: 'object',
      title: 'Manifestations',
      fields: [
        {
          name: 'formes',
          type: 'array',
          title: 'Formes d\'utilisation',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom de la manifestation'
              },
              {
                name: 'description',
                type: 'text',
                title: 'Description',
                rows: 2
              }
            ]
          }]
        },
        {
          name: 'methodesInvocation',
          type: 'array',
          title: 'Méthodes d\'utilisation',
          description: 'Comment le système est mis en œuvre (incantations, rituels, pensée, etc.)',
          of: [{type: 'string'}]
        }
      ]
    },
    {
      name: 'utilisateurs',
      type: 'object',
      title: 'Utilisateurs',
      fields: [
        {
          name: 'typesUtilisateurs',
          type: 'array',
          title: 'Types d\'utilisateurs',
          of: [{type: 'string'}]
        },
        {
          name: 'conditions',
          type: 'text',
          title: 'Conditions d\'utilisation',
          description: 'Conditions requises pour utiliser ce système'
        },
        {
          name: 'methodesAcquisition',
          type: 'array',
          title: 'Méthodes d\'acquisition',
          of: [{type: 'string'}]
        }
      ]
    },
    {
      name: 'limites',
      type: 'object',
      title: 'Limitations',
      fields: [
        {
          name: 'limitesGenerales',
          type: 'text',
          title: 'Limites générales',
          description: 'Limitations globales du système'
        },
        {
          name: 'limitesMondeReel',
          type: 'text',
          title: 'Limites dans le monde réel',
          description: 'Limitations spécifiques au monde réel'
        },
        {
          name: 'dangers',
          type: 'text',
          title: 'Dangers',
          description: 'Risques et dangers liés à l\'utilisation'
        }
      ]
    },
    {
      name: 'aspectsCulturels',
      type: 'object',
      title: 'Aspects culturels',
      fields: [
        {
          name: 'perception',
          type: 'text',
          title: 'Perception sociale',
          description: 'Comment ce système est perçu par la société'
        },
        {
          name: 'traditions',
          type: 'array',
          title: 'Traditions',
          of: [{type: 'string'}]
        },
        {
          name: 'impact',
          type: 'text',
          title: 'Impact culturel',
          description: 'Impact sur la société et la culture'
        }
      ]
    },
    {
      name: 'interactionsObjets',
      type: 'object',
      title: 'Interactions avec les objets',
      fields: [
        {
          name: 'typesObjets',
          type: 'array',
          title: 'Types d\'objets affectés',
          of: [{type: 'string'}]
        },
        {
          name: 'effets',
          type: 'text',
          title: 'Effets sur les objets',
          description: 'Comment le système affecte les objets'
        },
        {
          name: 'limitations',
          type: 'text',
          title: 'Limitations avec les objets',
          description: 'Limites dans l\'interaction avec les objets'
        }
      ]
    }
  ]
} 
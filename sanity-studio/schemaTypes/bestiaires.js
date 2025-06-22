const bestiaires = {
    name: 'bestiaires',
    title: 'Bestiaires - Espèce Non Intelligente',
    type: 'document',
    description: 'Un bestiaire désigne un être vivant dépourvu d\'intelligence sociale ou individuelle propre, généralement non capable de langage articulé, obéissant à l\'instinct, à une force supérieure ou à une invocation.',
    fields: [
      {
        name: 'nom',
        type: 'string',
        title: 'Nom',
        description: 'Nom de la créature',
        validation: Rule => Rule.required().min(1).max(100)
      },
      {
        name: 'univers',
        title: 'Univers d\'appartenance',
        type: 'reference',
        to: [{ type: 'univers' }],
        validation: Rule => Rule.required(),
        description: 'L\'univers dans lequel cette créature vit.'
      },
      {
        name: 'type',
        type: 'string',
        title: 'Type',
        description: 'Type de créature (bête, invocation, démon, etc.)',
        options: {
          list: [
            { title: 'Bête', value: 'bete' },
            { title: 'Invocation', value: 'invocation' },
            { title: 'Démon', value: 'demon' },
            { title: 'Rejeton d\'illusion', value: 'rejeton_illusion' },
            { title: 'Aberration', value: 'aberration' },
            { title: 'Élémentaire', value: 'elementaire' },
            { title: 'Mort-vivant', value: 'mort_vivant' },
            { title: 'Construct', value: 'construct' },
            { title: 'Esprit', value: 'esprit' },
            { title: 'Autre', value: 'autre' }
          ]
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'origine',
        type: 'text',
        title: 'Origine / Création',
        description: 'Origine ou création de la créature',
        validation: Rule => Rule.required().min(10).max(500)
      },
      {
        name: 'habitat',
        type: 'array',
        title: 'Habitat',
        description: 'Lieux où vit la créature',
        of: [{ type: 'string' }],
        validation: Rule => Rule.required().min(1)
      },
      {
        name: 'comportement',
        type: 'object',
        title: 'Comportement',
        description: 'Comportement de la créature',
        fields: [
          {
            name: 'instincts',
            type: 'array',
            title: 'Instincts',
            of: [{ type: 'string' }]
          },
          {
            name: 'agressivite',
            type: 'string',
            title: 'Agressivité',
            options: {
              list: [
                { title: 'Passive', value: 'passive' },
                { title: 'Neutre', value: 'neutre' },
                { title: 'Agressive', value: 'agressive' },
                { title: 'Très agressive', value: 'tres_agressive' }
              ]
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'socialite',
            type: 'string',
            title: 'Socialité',
            options: {
              list: [
                { title: 'Solitaire', value: 'solitaire' },
                { title: 'En couple', value: 'en_couple' },
                { title: 'En groupe', value: 'en_groupe' },
                { title: 'En meute', value: 'en_meute' },
                { title: 'En essaim', value: 'en_essaim' }
              ]
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'intelligence',
            type: 'string',
            title: 'Intelligence',
            options: {
              list: [
                { title: 'Instinctive', value: 'instinctive' },
                { title: 'Basique', value: 'basique' },
                { title: 'Limitée', value: 'limitee' }
              ]
            },
            validation: Rule => Rule.required()
          }
        ]
      },
      {
        name: 'pouvoirs',
        type: 'array',
        title: 'Pouvoirs / Capacités',
        description: 'Pouvoirs et capacités spéciales',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom du pouvoir',
                validation: Rule => Rule.required()
              },
              {
                name: 'description',
                type: 'text',
                title: 'Description',
                validation: Rule => Rule.required()
              },
              {
                name: 'portee',
                type: 'string',
                title: 'Portée'
              },
              {
                name: 'limitation',
                type: 'text',
                title: 'Limitation'
              }
            ]
          }
        ]
      },
      {
        name: 'faiblesses',
        type: 'array',
        title: 'Faiblesses',
        description: 'Points faibles de la créature',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'type',
                type: 'string',
                title: 'Type de faiblesse',
                options: {
                  list: [
                    { title: 'Physique', value: 'physique' },
                    { title: 'Magique', value: 'magique' },
                    { title: 'Psychologique', value: 'psychologique' },
                    { title: 'Environnementale', value: 'environnementale' }
                  ]
                },
                validation: Rule => Rule.required()
              },
              {
                name: 'description',
                type: 'text',
                title: 'Description',
                validation: Rule => Rule.required()
              },
              {
                name: 'severite',
                type: 'string',
                title: 'Sévérité',
                options: {
                  list: [
                    { title: 'Mineure', value: 'mineure' },
                    { title: 'Modérée', value: 'moderee' },
                    { title: 'Majeure', value: 'majeure' },
                    { title: 'Critique', value: 'critique' }
                  ]
                },
                validation: Rule => Rule.required()
              }
            ]
          }
        ]
      },
      {
        name: 'reproduction',
        type: 'object',
        title: 'Mode de reproduction',
        fields: [
          {
            name: 'type',
            type: 'string',
            title: 'Type de reproduction',
            options: {
              list: [
                { title: 'Sexuée', value: 'sexuee' },
                { title: 'Asexuée', value: 'asexuee' },
                { title: 'Magique', value: 'magique' },
                { title: 'Autre', value: 'autre' }
              ]
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'details',
            type: 'text',
            title: 'Détails',
            validation: Rule => Rule.required()
          },
          {
            name: 'frequence',
            type: 'string',
            title: 'Fréquence',
            options: {
              list: [
                { title: 'Rare', value: 'rare' },
                { title: 'Occasionnelle', value: 'occasionnelle' },
                { title: 'Fréquente', value: 'frequente' },
                { title: 'Très fréquente', value: 'tres_frequente' }
              ]
            }
          }
        ]
      },
      {
        name: 'apparence',
        type: 'object',
        title: 'Apparence',
        fields: [
          {
            name: 'description',
            type: 'text',
            title: 'Description physique',
            validation: Rule => Rule.required()
          },
          {
            name: 'taille',
            type: 'string',
            title: 'Taille moyenne',
            validation: Rule => Rule.required()
          },
          {
            name: 'poids',
            type: 'string',
            title: 'Poids moyen'
          },
          {
            name: 'traits_distinctifs',
            type: 'array',
            title: 'Traits distinctifs',
            of: [{ type: 'string' }]
          }
        ]
      },
      {
        name: 'images',
        type: 'array',
        title: 'Images',
        description: 'Images de la créature',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true
            }
          }
        ]
      },
      {
        name: 'notes',
        type: 'text',
        title: 'Notes additionnelles',
        description: 'Informations supplémentaires'
      }
    ]
  }
  
  export default bestiaires 
const creature = {
    name: 'creature',
    title: 'Créature - Espèce Non Intelligente',
    type: 'document',
    description: 'Une créature désigne un être vivant dépourvu d\'intelligence sociale ou individuelle propre, généralement non capable de langage articulé, obéissant à l\'instinct, à une force supérieure ou à une invocation.',
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
                { title: 'Artificielle', value: 'artificielle' },
                { title: 'Parasitaire', value: 'parasitaire' },
                { title: 'Inconnue', value: 'inconnue' }
              ]
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'cycle',
            type: 'string',
            title: 'Cycle reproductif'
          },
          {
            name: 'conditions',
            type: 'text',
            title: 'Conditions nécessaires'
          },
          {
            name: 'descendance',
            type: 'number',
            title: 'Nombre de descendants',
            validation: Rule => Rule.min(0)
          }
        ]
      },
      {
        name: 'roleUnivers',
        type: 'text',
        title: 'Rôle dans l\'univers',
        description: 'Rôle dans l\'univers narratif',
        validation: Rule => Rule.min(20).max(1000)
      },
      {
        name: 'descriptionPhysique',
        type: 'object',
        title: 'Description physique',
        fields: [
          {
            name: 'taille',
            type: 'string',
            title: 'Taille',
            options: {
              list: [
                { title: 'Minuscule', value: 'minuscule' },
                { title: 'Très petit', value: 'tres_petit' },
                { title: 'Petit', value: 'petit' },
                { title: 'Moyen', value: 'moyen' },
                { title: 'Grand', value: 'grand' },
                { title: 'Très grand', value: 'tres_grand' },
                { title: 'Gigantesque', value: 'gigantesque' }
              ]
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'poids',
            type: 'string',
            title: 'Poids'
          },
          {
            name: 'apparence',
            type: 'text',
            title: 'Apparence générale',
            validation: Rule => Rule.required().min(50)
          },
          {
            name: 'particularites',
            type: 'array',
            title: 'Particularités',
            of: [{ type: 'string' }]
          }
        ]
      },
      {
        name: 'inspirations',
        type: 'object',
        title: 'Inspirations visuelles / mythologiques',
        fields: [
          {
            name: 'visuelles',
            type: 'array',
            title: 'Inspirations visuelles',
            of: [{ type: 'string' }]
          },
          {
            name: 'mythologiques',
            type: 'array',
            title: 'Inspirations mythologiques',
            of: [{ type: 'string' }]
          },
          {
            name: 'litteraires',
            type: 'array',
            title: 'Inspirations littéraires',
            of: [{ type: 'string' }]
          }
        ]
      },
      {
        name: 'individusCelebres',
        type: 'array',
        title: 'Individus célèbres',
        description: 'Individus notables de cette espèce',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom',
                validation: Rule => Rule.required()
              },
              {
                name: 'particularite',
                type: 'text',
                title: 'Particularité',
                validation: Rule => Rule.required()
              },
              {
                name: 'statut',
                type: 'string',
                title: 'Statut',
                options: {
                  list: [
                    { title: 'Vivant', value: 'vivant' },
                    { title: 'Mort', value: 'mort' },
                    { title: 'Disparu', value: 'disparu' },
                    { title: 'Légendaire', value: 'legendaire' },
                    { title: 'Inconnu', value: 'inconnu' }
                  ]
                }
              },
              {
                name: 'histoire',
                type: 'text',
                title: 'Histoire'
              }
            ]
          }
        ]
      },
      // Métadonnées
      {
        name: 'dateCreation',
        type: 'datetime',
        title: 'Date de création',
        description: 'Date de création de la fiche',
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm'
        }
      },
      {
        name: 'auteur',
        type: 'string',
        title: 'Auteur',
        description: 'Créateur de cette créature'
      },
      {
        name: 'version',
        type: 'string',
        title: 'Version',
        description: 'Version de la fiche (format: x.y.z)',
        validation: Rule => Rule.regex(/^\d+\.\d+\.\d+$/, {
          name: 'version',
          invert: false
        }).error('Le format doit être x.y.z (ex: 1.0.0)')
      }
    ],
    
    // Aperçu du document
    preview: {
      select: {
        title: 'nom',
        subtitle: 'type',
        media: 'image'
      }
    },
    
    // Organisation
    orderings: [
      {
        title: 'Nom',
        name: 'nomAsc',
        by: [{ field: 'nom', direction: 'asc' }]
      },
      {
        title: 'Type',
        name: 'typeAsc',
        by: [{ field: 'type', direction: 'asc' }]
      },
      {
        title: 'Date de création',
        name: 'dateDesc',
        by: [{ field: 'dateCreation', direction: 'desc' }]
      }
    ]
  }
  
  export default creature
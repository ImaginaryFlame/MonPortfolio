const celebration = {
    name: 'celebration',
    title: 'Célébration / Fête / Rituel Culturel',
    type: 'document',
    fields: [
      {
        name: 'nomFete',
        type: 'string',
        title: 'Nom de la fête',
        validation: Rule => Rule.required()
      },
      {
        name: 'univers',
        title: 'Univers d\'appartenance',
        type: 'reference',
        to: [{ type: 'univers' }],
        validation: Rule => Rule.required(),
        description: 'L\'univers dans lequel cette célébration a lieu.'
      },
      {
        name: 'origine',
        type: 'text',
        title: 'Origine',
        rows: 4
      },
      {
        name: 'datePeriodeCelebration',
        type: 'string',
        title: 'Date ou période de célébration'
      },
      {
        name: 'lieuRegionPrincipale',
        type: 'reference',
        title: 'Lieu / région principale',
        to: [{type: 'region'}]
      },
      {
        name: 'racesPeuplesConcernes',
        type: 'array',
        title: 'Races ou peuples concernés',
        of: [
          {
            type: 'reference',
            to: [{type: 'race'}]
          }
        ]
      },
      {
        name: 'type',
        type: 'string',
        title: 'Type',
        options: {
          list: [
            {title: 'Religieuse', value: 'religieuse'},
            {title: 'Historique', value: 'historique'},
            {title: 'Politique', value: 'politique'},
            {title: 'Folklorique', value: 'folklorique'},
            {title: 'Occulte', value: 'occulte'},
            {title: 'Interdimensionnelle', value: 'interdimensionnelle'},
            {title: 'Saisonnière', value: 'saisonniere'},
            {title: 'Familiale', value: 'familiale'},
            {title: 'Militaire', value: 'militaire'},
            {title: 'Autre', value: 'autre'}
          ]
        }
      },
      {
        name: 'celebrationsAssociees',
        type: 'array',
        title: 'Célébrations associées',
        of: [
          {
            type: 'reference',
            to: [{type: 'celebration'}]
          }
        ]
      },
      {
        name: 'rituelsSymboles',
        type: 'array',
        title: 'Rituels / Symboles',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom du rituel/symbole'
              },
              {
                name: 'description',
                type: 'text',
                title: 'Description',
                rows: 3
              },
              {
                name: 'signification',
                type: 'text',
                title: 'Signification',
                rows: 2
              },
              {
                name: 'participants',
                type: 'string',
                title: 'Participants requis',
                options: {
                  list: [
                    {title: 'Tous', value: 'tous'},
                    {title: 'Élite/Dirigeants', value: 'elite'},
                    {title: 'Prêtres/Chamans', value: 'pretres'},
                    {title: 'Initiés', value: 'inities'},
                    {title: 'Volontaires', value: 'volontaires'},
                    {title: 'Race spécifique', value: 'race_specifique'}
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        name: 'evenementsMarquants',
        type: 'array',
        title: 'Événements marquants durant la fête',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom de l\'événement'
              },
              {
                name: 'description',
                type: 'text',
                title: 'Description',
                rows: 2
              },
              {
                name: 'moment',
                type: 'string',
                title: 'Moment durant la célébration'
              },
              {
                name: 'importance',
                type: 'string',
                title: 'Importance',
                options: {
                  list: [
                    {title: 'Centrale', value: 'centrale'},
                    {title: 'Importante', value: 'importante'},
                    {title: 'Secondaire', value: 'secondaire'},
                    {title: 'Optionnelle', value: 'optionnelle'}
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        name: 'impactCulturel',
        type: 'text',
        title: 'Impact culturel',
        rows: 4
      },
      {
        name: 'personnagesAssocies',
        type: 'array',
        title: 'Personnages associés',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'personnage',
                type: 'reference',
                title: 'Personnage',
                to: [{type: 'personnage'}]
              },
              {
                name: 'role',
                type: 'string',
                title: 'Rôle dans la célébration',
                options: {
                  list: [
                    {title: 'Fondateur', value: 'fondateur'},
                    {title: 'Figure honorée', value: 'figure_honoree'},
                    {title: 'Organisateur principal', value: 'organisateur'},
                    {title: 'Guide spirituel', value: 'guide_spirituel'},
                    {title: 'Participant notable', value: 'participant_notable'},
                    {title: 'Opposant historique', value: 'opposant'}
                  ]
                }
              },
              {
                name: 'description',
                type: 'text',
                title: 'Description du rôle',
                rows: 2
              }
            ]
          }
        ]
      },
      {
        name: 'images',
        type: 'array',
        title: 'Images de la célébration',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true
            },
            fields: [
              {
                name: 'alt',
                type: 'string',
                title: 'Texte alternatif'
              },
              {
                name: 'caption',
                type: 'string',
                title: 'Légende'
              }
            ]
          }
        ]
      }
    ],
    preview: {
      select: {
        title: 'nomFete',
        subtitle: 'type',
        date: 'datePeriodeCelebration'
      },
      prepare(selection) {
        const {title, subtitle, date} = selection
        return {
          title: title,
          subtitle: `${subtitle} - ${date || 'Date variable'}`
        }
      }
    }
  }
  
  export default celebration
const famille = {
    name: 'famille',
    title: 'Famille Royale / Lignée / Maison Noble',
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
        title: 'Univers d\'appartenance',
        type: 'reference',
        to: [{ type: 'univers' }],
        validation: Rule => Rule.required(),
        description: 'L\'univers auquel cette famille appartient.'
      },
      {
        name: 'titres',
        type: 'array',
        title: 'Titre(s)',
        of: [
          {
            type: 'string'
          }
        ]
      },
      {
        name: 'symbole',
        type: 'image',
        title: 'Symbole',
        options: {
          hotspot: true
        }
      },
      {
        name: 'devise',
        type: 'string',
        title: 'Devise'
      },
      {
        name: 'origine',
        type: 'text',
        title: 'Origine',
        rows: 4
      },
      {
        name: 'arbreGeneralogique',
        type: 'array',
        title: 'Arbre généalogique',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'generation',
                type: 'number',
                title: 'Génération'
              },
              {
                name: 'membres',
                type: 'array',
                title: 'Membres de cette génération',
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
                        name: 'statut',
                        type: 'string',
                        title: 'Statut dans la famille',
                        options: {
                          list: [
                            {title: 'Héritier', value: 'heritier'},
                            {title: 'Dirigeant', value: 'dirigeant'},
                            {title: 'Membre', value: 'membre'},
                            {title: 'Exilé', value: 'exile'},
                            {title: 'Déchu', value: 'dechu'},
                            {title: 'Décédé', value: 'decede'}
                          ]
                        }
                      },
                      {
                        name: 'titre',
                        type: 'string',
                        title: 'Titre personnel'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'regionsControlees',
        type: 'array',
        title: 'Régions contrôlées',
        of: [
          {
            type: 'reference',
            to: [{type: 'region'}]
          }
        ]
      },
      {
        name: 'pouvoirsHereditaires',
        type: 'text',
        title: 'Pouvoirs héréditaires',
        rows: 4
      },
      {
        name: 'relationsInternes',
        type: 'text',
        title: 'Relations internes',
        rows: 4
      },
      {
        name: 'alliancesMariages',
        type: 'array',
        title: 'Alliances / Mariages',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'type',
                type: 'string',
                title: 'Type',
                options: {
                  list: [
                    {title: 'Mariage', value: 'mariage'},
                    {title: 'Fiançailles', value: 'fiancailles'},
                    {title: 'Alliance', value: 'alliance'},
                    {title: 'Pacte', value: 'pacte'}
                  ]
                }
              },
              {
                name: 'familleCible',
                type: 'reference',
                title: 'Famille/Lignée concernée',
                to: [{type: 'famille'}]
              },
              {
                name: 'personnagesImpliques',
                type: 'array',
                title: 'Personnages impliqués',
                of: [
                  {
                    type: 'reference',
                    to: [{type: 'personnage'}]
                  }
                ]
              },
              {
                name: 'statut',
                type: 'string',
                title: 'Statut',
                options: {
                  list: [
                    {title: 'Actif', value: 'actif'},
                    {title: 'Rompu', value: 'rompu'},
                    {title: 'En négociation', value: 'negociation'},
                    {title: 'Historique', value: 'historique'}
                  ]
                }
              },
              {
                name: 'description',
                type: 'text',
                title: 'Description',
                rows: 2
              }
            ]
          }
        ]
      },
      {
        name: 'trahisonsExils',
        type: 'array',
        title: 'Trahisons / Exils',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'personnage',
                type: 'reference',
                title: 'Personnage concerné',
                to: [{type: 'personnage'}]
              },
              {
                name: 'type',
                type: 'string',
                title: 'Type',
                options: {
                  list: [
                    {title: 'Trahison', value: 'trahison'},
                    {title: 'Exil', value: 'exil'},
                    {title: 'Déchéance', value: 'decheance'},
                    {title: 'Bannissement', value: 'bannissement'}
                  ]
                }
              },
              {
                name: 'raison',
                type: 'text',
                title: 'Raison',
                rows: 2
              },
              {
                name: 'consequences',
                type: 'text',
                title: 'Conséquences',
                rows: 2
              }
            ]
          }
        ]
      },
      {
        name: 'influenceReligieuse',
        type: 'text',
        title: 'Influence religieuse',
        rows: 3
      },
      {
        name: 'influencePolitique',
        type: 'text',
        title: 'Influence politique',
        rows: 3
      }
    ],
    preview: {
      select: {
        title: 'nom',
        subtitle: 'devise',
        media: 'symbole'
      }
    }
  }
  
  export default famille
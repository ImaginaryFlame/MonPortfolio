const race = {
  name: 'race',
  title: 'Race',
  type: 'document',
  fields: [
    {
      name: 'nomRace',
      type: 'string',
      title: 'Nom de la race',
      validation: Rule => Rule.required()
    },
    {
      name: 'univers',
      title: 'Univers d\'appartenance',
      type: 'reference',
      to: [{ type: 'univers' }],
      validation: Rule => Rule.required(),
      description: 'L\'univers dans lequel cette race existe.'
    },
    {
      name: 'autresNoms',
      type: 'array',
      title: 'Autres noms',
      of: [
        {
          type: 'string'
        }
      ]
    },
    {
      name: 'sourceCreation',
      type: 'text',
      title: 'Source de création',
      rows: 3
    },
    {
      name: 'mondeNaissance',
      type: 'reference',
      title: 'Monde de naissance',
      to: [{type: 'region'}]
    },
    {
      name: 'religion',
      type: 'text',
      title: 'Religion',
      rows: 3
    },
    {
      name: 'histoire',
      type: 'array',
      title: 'Histoire',
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      name: 'societeCulture',
      type: 'text',
      title: 'Société et culture',
      rows: 4
    },
    {
      name: 'relationsAutresRaces',
      type: 'array',
      title: 'Relations avec d\'autres races',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'race',
              type: 'reference',
              title: 'Race',
              to: [{type: 'race'}]
            },
            {
              name: 'typeRelation',
              type: 'string',
              title: 'Type de relation',
              options: {
                list: [
                  {title: 'Allié', value: 'allie'},
                  {title: 'Ennemi', value: 'ennemi'},
                  {title: 'Neutre', value: 'neutre'},
                  {title: 'Méfiant', value: 'mefiant'},
                  {title: 'Respectueux', value: 'respectueux'},
                  {title: 'Dominant', value: 'dominant'},
                  {title: 'Soumis', value: 'soumis'},
                  {title: 'Complexe', value: 'complexe'}
                ]
              }
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description de la relation',
              rows: 2
            }
          ]
        }
      ]
    },
    {
      name: 'changementsCulturels',
      type: 'text',
      title: 'Changements culturels',
      rows: 3
    },
    {
      name: 'languesParlees',
      type: 'array',
      title: 'Langues parlées',
      of: [
        {
          type: 'string'
        }
      ]
    },
    {
      name: 'organisationSociale',
      type: 'text',
      title: 'Organisation sociale',
      rows: 3
    },
    {
      name: 'particularitesCulturelles',
      type: 'text',
      title: 'Particularités culturelles',
      rows: 3
    },
    {
      name: 'personnagesCelebres',
      type: 'array',
      title: 'Personnages célèbres issus de ce peuple',
      of: [
        {
          type: 'reference',
          to: [{type: 'personnage'}]
        }
      ]
    },
    {
      name: 'pouvoirs',
      type: 'object',
      title: 'Pouvoirs',
      fields: [
        {
          name: 'natureAbstraiya',
          type: 'string',
          title: 'Nature de l\'Abstraiya',
          options: {
            list: [
              {title: 'Élémentaire', value: 'elementaire'},
              {title: 'Temporel', value: 'temporel'},
              {title: 'Spatial', value: 'spatial'},
              {title: 'Mental', value: 'mental'},
              {title: 'Vital', value: 'vital'},
              {title: 'Technologique', value: 'technologique'},
              {title: 'Spirituel', value: 'spirituel'},
              {title: 'Mixte', value: 'mixte'},
              {title: 'Aucune', value: 'aucune'}
            ]
          }
        },
        {
          name: 'capacitesInnees',
          type: 'array',
          title: 'Capacités innées',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'nom',
                  type: 'string',
                  title: 'Nom de la capacité'
                },
                {
                  name: 'description',
                  type: 'text',
                  title: 'Description',
                  rows: 2
                },
                {
                  name: 'limitations',
                  type: 'text',
                  title: 'Limitations',
                  rows: 1
                }
              ]
            }
          ]
        },
        {
          name: 'capacitesAcquises',
          type: 'array',
          title: 'Capacités acquises / technologiques',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'nom',
                  type: 'string',
                  title: 'Nom de la capacité'
                },
                {
                  name: 'description',
                  type: 'text',
                  title: 'Description',
                  rows: 2
                },
                {
                  name: 'conditionsAcquisition',
                  type: 'text',
                  title: 'Conditions d\'acquisition',
                  rows: 1
                }
              ]
            }
          ]
        },
        {
          name: 'apprentissage',
          type: 'text',
          title: 'Apprentissage',
          rows: 3
        }
      ]
    },
    {
      name: 'descriptionPhysique',
      type: 'object',
      title: 'Description physique',
      fields: [
        {
          name: 'apparenceGenerale',
          type: 'text',
          title: 'Apparence générale',
          rows: 3
        },
        {
          name: 'couleurCheveux',
          type: 'array',
          title: 'Couleur de cheveux',
          of: [
            {
              type: 'string'
            }
          ]
        },
        {
          name: 'couleurYeux',
          type: 'array',
          title: 'Couleur des yeux',
          of: [
            {
              type: 'string'
            }
          ]
        },
        {
          name: 'formeYeux',
          type: 'string',
          title: 'Forme des yeux'
        },
        {
          name: 'carnation',
          type: 'array',
          title: 'Carnation',
          of: [
            {
              type: 'string'
            }
          ]
        },
        {
          name: 'autres',
          type: 'text',
          title: 'Autres caractéristiques physiques',
          rows: 3
        },
        {
          name: 'inspirationPhysique',
          type: 'text',
          title: 'Inspiration physique',
          rows: 2
        }
      ]
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images de la race',
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
      title: 'nomRace',
      subtitle: 'mondeNaissance.nom',
      media: 'images.0'
    }
  }
}

export default race
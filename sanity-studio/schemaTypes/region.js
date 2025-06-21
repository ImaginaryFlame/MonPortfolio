const region = {
  name: 'region',
  title: 'Région du Monde',
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
      description: 'L\'univers dans lequel cette région se trouve.'
    },
    {
      name: 'type',
      type: 'string',
      title: 'Type',
      description: 'planète, région, dimension, cité volante, etc.',
      options: {
        list: [
          {title: 'Planète', value: 'planete'},
          {title: 'Région', value: 'region'},
          {title: 'Dimension', value: 'dimension'},
          {title: 'Cité volante', value: 'cite_volante'},
          {title: 'Royaume', value: 'royaume'},
          {title: 'Empire', value: 'empire'},
          {title: 'Continent', value: 'continent'},
          {title: 'Île', value: 'ile'},
          {title: 'Autre', value: 'autre'}
        ]
      }
    },
    {
      name: 'statut',
      type: 'string',
      title: 'Statut',
      options: {
        list: [
          {title: 'Habité', value: 'habite'},
          {title: 'Abandonné', value: 'abandonne'},
          {title: 'Scellé', value: 'scelle'},
          {title: 'Disparu', value: 'disparu'},
          {title: 'En ruines', value: 'ruines'},
          {title: 'Mystérieux', value: 'mysterieux'}
        ]
      }
    },
    {
      name: 'dirigeants',
      type: 'array',
      title: 'Dirigeant(e)(s)',
      of: [
        {
          type: 'reference',
          to: [{type: 'personnage'}]
        }
      ]
    },
    {
      name: 'capitale',
      type: 'string',
      title: 'Capitale'
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
      name: 'origineCreation',
      type: 'text',
      title: 'Origine / Création',
      rows: 4
    },
    {
      name: 'geographie',
      type: 'text',
      title: 'Géographie',
      rows: 6
    },
    {
      name: 'climat',
      type: 'string',
      title: 'Climat',
      options: {
        list: [
          {title: 'Tropical', value: 'tropical'},
          {title: 'Tempéré', value: 'tempere'},
          {title: 'Aride', value: 'aride'},
          {title: 'Polaire', value: 'polaire'},
          {title: 'Montagnard', value: 'montagnard'},
          {title: 'Océanique', value: 'oceanique'},
          {title: 'Magique', value: 'magique'},
          {title: 'Variable', value: 'variable'}
        ]
      }
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
      name: 'religionCroyances',
      type: 'text',
      title: 'Religion / Croyances dominantes',
      rows: 4
    },
    {
      name: 'politique',
      type: 'text',
      title: 'Politique',
      rows: 4
    },
    {
      name: 'economie',
      type: 'text',
      title: 'Économie',
      rows: 4
    },
    {
      name: 'pointsInteret',
      type: 'array',
      title: 'Points d\'intérêt',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'nom',
              type: 'string',
              title: 'Nom du lieu'
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 3
            },
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {
                hotspot: true
              }
            }
          ]
        }
      ]
    },
    {
      name: 'conflitsEnjeux',
      type: 'text',
      title: 'Conflits et enjeux',
      rows: 4
    },
    {
      name: 'culturePopulation',
      type: 'text',
      title: 'Culture et population',
      rows: 4
    },
    {
      name: 'relationsInternationales',
      type: 'text',
      title: 'Relations internationales',
      rows: 4
    },
    {
      name: 'relationsDiplomatiques',
      type: 'array',
      title: 'Relations diplomatiques',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'region',
              type: 'reference',
              title: 'Région',
              to: [{type: 'region'}]
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
                  {title: 'Vassal', value: 'vassal'},
                  {title: 'Protectorat', value: 'protectorat'},
                  {title: 'Commerce', value: 'commerce'},
                  {title: 'Guerre', value: 'guerre'}
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
      name: 'acces',
      type: 'string',
      title: 'Accès',
      description: 'Comment accéder à cette région',
      options: {
        list: [
          {title: 'Par portail', value: 'portail'},
          {title: 'Par rêve', value: 'reve'},
          {title: 'Réservé aux Ecapses', value: 'ecapses'},
          {title: 'Transport traditionnel', value: 'traditionnel'},
          {title: 'Magie requise', value: 'magie'},
          {title: 'Secret/Caché', value: 'secret'},
          {title: 'Libre', value: 'libre'}
        ]
      }
    },
    {
      name: 'racesDominantes',
      type: 'array',
      title: 'Races dominantes',
      of: [
        {
          type: 'reference',
          to: [{type: 'race'}]
        }
      ]
    },
    {
      name: 'regimePolitique',
      type: 'string',
      title: 'Régime politique',
      options: {
        list: [
          {title: 'Monarchie', value: 'monarchie'},
          {title: 'République', value: 'republique'},
          {title: 'Empire', value: 'empire'},
          {title: 'Théocratie', value: 'theocratie'},
          {title: 'Anarchie', value: 'anarchie'},
          {title: 'Conseil', value: 'conseil'},
          {title: 'Dictature', value: 'dictature'},
          {title: 'Tribu', value: 'tribu'},
          {title: 'Magiocratie', value: 'magiocratie'}
        ]
      }
    },
    {
      name: 'villes',
      type: 'array',
      title: 'Villes',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'nom',
              type: 'string',
              title: 'Nom de la ville'
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 2
            },
            {
              name: 'population',
              type: 'number',
              title: 'Population approximative'
            },
            {
              name: 'importance',
              type: 'string',
              title: 'Importance',
              options: {
                list: [
                  {title: 'Capitale', value: 'capitale'},
                  {title: 'Grande ville', value: 'grande'},
                  {title: 'Ville moyenne', value: 'moyenne'},
                  {title: 'Petite ville', value: 'petite'},
                  {title: 'Village', value: 'village'}
                ]
              }
            }
          ]
        }
      ]
    },
    {
      name: 'villesNaissancesMinires',
      type: 'array',
      title: 'Villes naissances/minières (pour les races Précieuses)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'nom',
              type: 'string',
              title: 'Nom de la ville'
            },
            {
              name: 'racePrecieuse',
              type: 'reference',
              title: 'Race précieuse associée',
              to: [{type: 'race'}]
            },
            {
              name: 'typeActivite',
              type: 'string',
              title: 'Type d\'activité',
              options: {
                list: [
                  {title: 'Naissance', value: 'naissance'},
                  {title: 'Mine', value: 'mine'},
                  {title: 'Raffinerie', value: 'raffinerie'},
                  {title: 'Centre de formation', value: 'formation'}
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
      name: 'personnagesAssocies',
      type: 'array',
      title: 'Personnages associés',
      of: [
        {
          type: 'reference',
          to: [{type: 'personnage'}]
        }
      ]
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images de la région',
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
      title: 'nom',
      subtitle: 'type',
      media: 'symbole'
    }
  }
}

export default region
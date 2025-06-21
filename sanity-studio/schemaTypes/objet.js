const objet = {
  name: 'objet',
  title: 'Objet',
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
      description: 'L\'univers dans lequel cet objet se trouve.'
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
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          {title: 'Arme vivante', value: 'arme_vivante'},
          {title: 'Artefact magique', value: 'artefact_magique'},
          {title: 'Technologie perdue', value: 'technologie_perdue'},
          {title: 'Relique divine', value: 'relique_divine'},
          {title: 'Outil de transformation', value: 'outil_transformation'},
          {title: 'Interface mentale', value: 'interface_mentale'},
          {title: 'Catalyseur d\'Abstraiya', value: 'catalyseur_abstraiya'},
          {title: 'Objet fusionnable', value: 'objet_fusionnable'},
          {title: 'Prototype expérimental', value: 'prototype_experimental'},
          {title: 'Autre', value: 'autre'}
        ]
      }
    },
    {
      name: 'apparence',
      type: 'text',
      title: 'Apparence',
      rows: 4
    },
    {
      name: 'origine',
      type: 'text',
      title: 'Origine',
      rows: 3
    },
    {
      name: 'createurs',
      type: 'array',
      title: 'Créateur(s)',
      of: [
        {
          type: 'reference',
          to: [{type: 'personnage'}]
        }
      ]
    },
    {
      name: 'materiaux',
      type: 'array',
      title: 'Matériaux',
      of: [
        {
          type: 'string'
        }
      ]
    },
    {
      name: 'capacitesPrincipales',
      type: 'object',
      title: 'Capacités principales',
      fields: [
        {
          name: 'fonctionnalitesTechnologiques',
          type: 'array',
          title: 'Fonctionnalités technologiques',
          description: 'Pour les objets technologiques : lévitopulsion, propulsion supersonique, etc.',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'nom',
                  type: 'string',
                  title: 'Nom de la fonctionnalité'
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
          name: 'pouvoirsMagiques',
          type: 'array',
          title: 'Pouvoirs magiques/abstraïques',
          description: 'Pour les objets magiques : pouvoirs liés à l\'Abstraiya, enchantements, etc.',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'nom',
                  type: 'string',
                  title: 'Nom du pouvoir'
                },
                {
                  name: 'description',
                  type: 'text',
                  title: 'Description',
                  rows: 2
                },
                {
                  name: 'typeAbstraiya',
                  type: 'string',
                  title: 'Type d\'Abstraiya',
                  options: {
                    list: [
                      {title: 'Élémentaire', value: 'elementaire'},
                      {title: 'Temporel', value: 'temporel'},
                      {title: 'Spatial', value: 'spatial'},
                      {title: 'Mental', value: 'mental'},
                      {title: 'Vital', value: 'vital'},
                      {title: 'Autre', value: 'autre'}
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'fonctions',
      type: 'text',
      title: 'Fonctions',
      rows: 3
    },
    {
      name: 'modeActivation',
      type: 'text',
      title: 'Mode d\'activation',
      rows: 2
    },
    {
      name: 'utilisateursConnus',
      type: 'array',
      title: 'Utilisateurs connus',
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
              title: 'Statut',
              options: {
                list: [
                  {title: 'Propriétaire actuel', value: 'proprietaire_actuel'},
                  {title: 'Ancien propriétaire', value: 'ancien_proprietaire'},
                  {title: 'Utilisateur temporaire', value: 'utilisateur_temporaire'},
                  {title: 'Gardien', value: 'gardien'},
                  {title: 'Voleur', value: 'voleur'}
                ]
              }
            },
            {
              name: 'periode',
              type: 'string',
              title: 'Période d\'utilisation'
            }
          ]
        }
      ]
    },
    {
      name: 'limitesContrecoups',
      type: 'text',
      title: 'Limites / Contrecoups',
      rows: 4
    },
    {
      name: 'statutActuel',
      type: 'string',
      title: 'Statut actuel',
      options: {
        list: [
          {title: 'Actif', value: 'actif'},
          {title: 'Dormant', value: 'dormant'},
          {title: 'Perdu', value: 'perdu'},
          {title: 'Détruit', value: 'detruit'},
          {title: 'Scellé', value: 'scelle'},
          {title: 'Fragmenté', value: 'fragmente'},
          {title: 'En évolution', value: 'evolution'},
          {title: 'Inconnu', value: 'inconnu'}
        ]
      }
    },
    {
      name: 'significationSymbolique',
      type: 'text',
      title: 'Signification symbolique',
      rows: 3
    },
    {
      name: 'formesConnues',
      type: 'array',
      title: 'Formes connues / Modes alternatifs',
      description: 'Pour les objets transformables : épée → fusil, skate → planeur, etc.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'nom',
              type: 'string',
              title: 'Nom de la forme'
            },
            {
              name: 'apparence',
              type: 'text',
              title: 'Apparence de cette forme',
              rows: 2
            },
            {
              name: 'fonctions',
              type: 'text',
              title: 'Fonctions spécifiques',
              rows: 2
            },
            {
              name: 'conditionsActivation',
              type: 'text',
              title: 'Conditions d\'activation',
              rows: 1
            }
          ]
        }
      ]
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images de l\'objet',
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
            },
            {
              name: 'forme',
              type: 'string',
              title: 'Forme représentée'
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
      media: 'images.0'
    }
  }
}

export default objet
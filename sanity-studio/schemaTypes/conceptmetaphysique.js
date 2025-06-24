const conceptMetaphysique = {
    name: 'conceptMetaphysique',
    title: 'Concept Métaphysique / Cosmogonique',
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
        description: 'L\'univers auquel ce concept est lié.'
      },
      {
        name: 'type',
        type: 'string',
        title: 'Type',
        options: {
          list: [
            {title: 'Force cosmique', value: 'force_cosmique'},
            {title: 'Principe universel', value: 'principe_universel'},
            {title: 'Énergie primordiale', value: 'energie_primordiale'},
            {title: 'Loi naturelle', value: 'loi_naturelle'},
            {title: 'Dimension abstraite', value: 'dimension_abstraite'},
            {title: 'Concept temporel', value: 'concept_temporel'},
            {title: 'Essence spirituelle', value: 'essence_spirituelle'},
            {title: 'Paradoxe ontologique', value: 'paradoxe_ontologique'},
            {title: 'Pouvoir', value: 'pouvoir'},
            {title: 'Magie', value: 'magie'},
            {title: 'Philosophie', value: 'philosophie'},
            {title: 'Autre', value: 'autre'}
          ]
        },
        validation: Rule => Rule.required()
      },

      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ 
          type: 'reference', 
          to: [{ type: 'tag' }],
          options: {
            filter: 'category == "concepts"'
          }
        }],
        description: 'Tags pour classifier ce concept (pouvoir, magie, etc.)'
      },
      {
        name: 'origineCreation',
        type: 'text',
        title: 'Origine / Création',
        rows: 4
      },
      {
        name: 'fonctionUnivers',
        type: 'text',
        title: 'Fonction dans l\'univers',
        rows: 4
      },
      {
        name: 'representationSymbolique',
        type: 'object',
        title: 'Représentation symbolique',
        fields: [
          {
            name: 'symboles',
            type: 'array',
            title: 'Symboles associés',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'symbole',
                    type: 'string',
                    title: 'Symbole'
                  },
                  {
                    name: 'signification',
                    type: 'text',
                    title: 'Signification',
                    rows: 2
                  }
                ]
              }
            ]
          },
          {
            name: 'couleurs',
            type: 'array',
            title: 'Couleurs associées',
            of: [
              {
                type: 'string'
              }
            ]
          },
          {
            name: 'formes',
            type: 'array',
            title: 'Formes géométriques',
            of: [
              {
                type: 'string'
              }
            ]
          },
          {
            name: 'elements',
            type: 'array',
            title: 'Éléments naturels',
            of: [
              {
                type: 'string'
              }
            ]
          }
        ]
      },
      {
        name: 'effetsEtresVivants',
        type: 'array',
        title: 'Effets sur les êtres vivants',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'typeEtre',
                type: 'string',
                title: 'Type d\'être affecté',
                options: {
                  list: [
                    {title: 'Tous les êtres', value: 'tous'},
                    {title: 'Êtres conscients', value: 'conscients'},
                    {title: 'Utilisateurs d\'Abstraiya', value: 'abstraiya'},
                    {title: 'Race spécifique', value: 'race_specifique'},
                    {title: 'Êtres spirituels', value: 'spirituels'},
                    {title: 'Créatures magiques', value: 'magiques'}
                  ]
                }
              },
              {
                name: 'effets',
                type: 'text',
                title: 'Description des effets',
                rows: 3
              },
              {
                name: 'intensite',
                type: 'string',
                title: 'Intensité',
                options: {
                  list: [
                    {title: 'Imperceptible', value: 'imperceptible'},
                    {title: 'Subtile', value: 'subtile'},
                    {title: 'Modérée', value: 'moderee'},
                    {title: 'Forte', value: 'forte'},
                    {title: 'Écrasante', value: 'ecrasante'}
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        name: 'objetsLieuxLies',
        type: 'array',
        title: 'Objets / lieux liés',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'element',
                type: 'reference',
                title: 'Élément lié',
                to: [
                  {type: 'objet'},
                  {type: 'region'}
                ]
              },
              {
                name: 'natureLien',
                type: 'string',
                title: 'Nature du lien',
                options: {
                  list: [
                    {title: 'Manifestation', value: 'manifestation'},
                    {title: 'Catalyseur', value: 'catalyseur'},
                    {title: 'Réceptacle', value: 'receptacle'},
                    {title: 'Point d\'accès', value: 'point_acces'},
                    {title: 'Amplificateur', value: 'amplificateur'},
                    {title: 'Inhibiteur', value: 'inhibiteur'}
                  ]
                }
              },
              {
                name: 'description',
                type: 'text',
                title: 'Description du lien',
                rows: 2
              }
            ]
          }
        ]
      },
      {
        name: 'personnagesConnectes',
        type: 'array',
        title: 'Personnages connectés',
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
                name: 'typeConnexion',
                type: 'string',
                title: 'Type de connexion',
                options: {
                  list: [
                    {title: 'Avatar', value: 'avatar'},
                    {title: 'Prophète', value: 'prophete'},
                    {title: 'Chercheur', value: 'chercheur'},
                    {title: 'Gardien', value: 'gardien'},
                    {title: 'Ennemi', value: 'ennemi'},
                    {title: 'Incarnation', value: 'incarnation'},
                    {title: 'Témoin', value: 'temoin'}
                  ]
                }
              },
              {
                name: 'description',
                type: 'text',
                title: 'Description de la connexion',
                rows: 2
              }
            ]
          }
        ]
      },
      {
        name: 'evolution',
        type: 'text',
        title: 'Évolution',
        description: 'Comment ce concept évolue dans le temps',
        rows: 4
      },
      {
        name: 'oppositionsComplementarites',
        type: 'array',
        title: 'Oppositions / Complémentarités',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'conceptLie',
                type: 'reference',
                title: 'Concept lié',
                to: [{type: 'conceptMetaphysique'}]
              },
              {
                name: 'natureRelation',
                type: 'string',
                title: 'Nature de la relation',
                options: {
                  list: [
                    {title: 'Opposition totale', value: 'opposition_totale'},
                    {title: 'Opposition partielle', value: 'opposition_partielle'},
                    {title: 'Complémentarité', value: 'complementarite'},
                    {title: 'Synergie', value: 'synergie'},
                    {title: 'Paradoxe', value: 'paradoxe'},
                    {title: 'Équilibre', value: 'equilibre'}
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
        name: 'mythologieCulte',
        type: 'object',
        title: 'Mythologie / Culte',
        fields: [
          {
            name: 'mythesLegendes',
            type: 'text',
            title: 'Mythes et légendes',
            rows: 4
          },
          {
            name: 'cultesDevotions',
            type: 'text',
            title: 'Cultes et dévotions',
            rows: 3
          },
          {
            name: 'rituels',
            type: 'array',
            title: 'Rituels associés',
            of: [
              {
                type: 'reference',
                to: [{type: 'evenement'}]
              }
            ]
          },
          {
            name: 'interpretations',
            type: 'text',
            title: 'Interprétations diverses',
            rows: 3
          }
        ]
      }
    ],
    preview: {
      select: {
        title: 'nom',
        subtitle: 'type'
      }
    }
  }
  
  export default conceptMetaphysique
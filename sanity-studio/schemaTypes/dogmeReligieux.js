const dogmeReligieux = {
    name: 'dogmeReligieux',
    title: 'Dogme Religieux',
    type: 'document',
    fields: [
      {
        name: 'univers',
        title: 'Univers d\'appartenance',
        type: 'reference',
        to: [{ type: 'univers' }],
        validation: Rule => Rule.required(),
        description: 'L\'univers auquel ce dogme est rattaché.'
      },
      { name: 'nom', type: 'string', title: 'Nom du dogme' },
      { 
        name: 'type', 
        type: 'string', 
        title: 'Type',
        options: {
          list: [
            { title: 'Monothéisme', value: 'monotheisme' },
            { title: 'Polythéisme', value: 'polytheisme' },
            { title: 'Animisme', value: 'animisme' },
            { title: 'Culte ancestral', value: 'culte_ancestral' },
            { title: 'Philosophie spirituelle', value: 'philosophie_spirituelle' },
            { title: 'Autre', value: 'autre' }
          ]
        }
      },
      { 
        name: 'origineCreation', 
        type: 'text', 
        title: 'Origine / Création',
        description: 'Histoire de la fondation, prophètes fondateurs, révélations'
      },
      { 
        name: 'lieuxSacres', 
        type: 'array',
        title: 'Lieux sacrés / Centres spirituels',
        of: [{ type: 'string' }]
      },
      { 
        name: 'croyancesPrincipales', 
        type: 'text', 
        title: 'Croyances principales',
        description: 'Principes fondamentaux, cosmogonie, eschatologie'
      },
      { 
        name: 'pouvoirsCapacites', 
        type: 'text', 
        title: 'Pouvoirs / Capacités spirituelles',
        description: 'Miracles, bénédictions, malédictions, prophéties'
      },
      { 
        name: 'interditsTabous', 
        type: 'text', 
        title: 'Interdits / Tabous',
        description: 'Restrictions, péchés, comportements proscrits'
      },
      { 
        name: 'modeTransmission', 
        type: 'text', 
        title: 'Mode de transmission',
        description: 'Comment la foi se transmet et se perpétue'
      },
      { 
        name: 'roleDansUnivers', 
        type: 'text', 
        title: 'Rôle dans l\'univers',
        description: 'Influence sur la société, politique, culture'
      },
      { 
        name: 'symbolesSacres', 
        type: 'text', 
        title: 'Symboles sacrés / Représentations',
        description: 'Iconographie, objets rituels, architecture'
      },
      { 
        name: 'inspirationsReligieuses', 
        type: 'text', 
        title: 'Inspirations religieuses / Mythologiques',
        description: 'Références aux religions réelles ou mythologies'
      },
      { 
        name: 'figuresReligieuses', 
        type: 'array',
        title: 'Figures religieuses célèbres',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'nom', type: 'string', title: 'Nom' },
              { name: 'titre', type: 'string', title: 'Titre/Fonction' },
              { name: 'description', type: 'text', title: 'Description' }
            ]
          }
        ]
      }
    ]
  }

  export default dogmeReligieux 
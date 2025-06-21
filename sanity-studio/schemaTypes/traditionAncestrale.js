const traditionAncestrale = {
    name: 'traditionAncestrale',
    title: 'Tradition Ancestrale',
    type: 'document',
    fields: [
      {
        name: 'univers',
        title: 'Univers d\'appartenance',
        type: 'reference',
        to: [{ type: 'univers' }],
        validation: Rule => Rule.required(),
        description: 'L\'univers auquel cette tradition est rattachée.'
      },
      { name: 'nom', type: 'string', title: 'Nom de la tradition' },
      { 
        name: 'type', 
        type: 'string', 
        title: 'Type',
        options: {
          list: [
            { title: 'Rituel de passage', value: 'rituel_passage' },
            { title: 'Cérémonie saisonnière', value: 'ceremonie_saisonniere' },
            { title: 'Pratique artisanale', value: 'pratique_artisanale' },
            { title: 'Tradition orale', value: 'tradition_orale' },
            { title: 'Code d\'honneur', value: 'code_honneur' },
            { title: 'Coutume sociale', value: 'coutume_sociale' },
            { title: 'Autre', value: 'autre' }
          ]
        }
      },
      { 
        name: 'origineCreation', 
        type: 'text', 
        title: 'Origine / Création',
        description: 'Histoire de la tradition, événements fondateurs'
      },
      { 
        name: 'contexteGeographique', 
        type: 'text', 
        title: 'Contexte géographique / Communautés',
        description: 'Régions, peuples, clans qui pratiquent cette tradition'
      },
      { 
        name: 'pratiquesComportements', 
        type: 'text', 
        title: 'Pratiques / Comportements',
        description: 'Déroulement, gestes rituels, codes de conduite'
      },
      { 
        name: 'beneficesPouvoirs', 
        type: 'text', 
        title: 'Bénéfices / Pouvoirs conférés',
        description: 'Avantages sociaux, spirituels ou magiques'
      },
      { 
        name: 'consequencesViolation', 
        type: 'text', 
        title: 'Conséquences de la violation',
        description: 'Sanctions, malédictions, exclusion sociale'
      },
      { 
        name: 'modeTransmission', 
        type: 'text', 
        title: 'Mode de transmission',
        description: 'Comment la tradition se transmet entre générations'
      },
      { 
        name: 'roleDansUnivers', 
        type: 'text', 
        title: 'Rôle dans l\'univers',
        description: 'Importance culturelle, liens avec d\'autres éléments'
      },
      { 
        name: 'objetsSymboles', 
        type: 'text', 
        title: 'Objets / Symboles associés',
        description: 'Artefacts, totems, emblèmes traditionnels'
      },
      { 
        name: 'inspirationsCulturelles', 
        type: 'text', 
        title: 'Inspirations culturelles / Historiques',
        description: 'Références aux cultures réelles ou historiques'
      },
      { 
        name: 'praticiensNotables', 
        type: 'array',
        title: 'Praticiens notables',
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

  export default traditionAncestrale 
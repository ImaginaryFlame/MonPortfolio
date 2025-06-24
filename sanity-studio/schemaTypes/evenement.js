const evenement = {
  name: 'evenement',
  title: 'Événement',
  type: 'document',
  fields: [
    {
      name: 'nom',
      type: 'string',
      title: 'Nom de l\'événement',
      validation: Rule => Rule.required()
    },
    {
      name: 'lienExterne',
      type: 'url',
      title: '🔗 Lien externe',
      description: 'Lien vers des références historiques, inspirations ou ressources externes liées à cet événement',
      validation: Rule => Rule.uri({
        allowRelative: false,
        scheme: ['http', 'https']
      })
    },
    {
      name: 'univers',
      title: 'Univers d\'appartenance',
      type: 'reference',
      to: [{ type: 'univers' }],
      validation: Rule => Rule.required(),
      description: 'L\'univers dans lequel cet événement a eu lieu.'
    },
    {
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          {title: 'Bataille', value: 'bataille'},
          {title: 'Guerre', value: 'guerre'},
          {title: 'Révolution', value: 'revolution'},
          {title: 'Découverte', value: 'decouverte'},
          {title: 'Catastrophe', value: 'catastrophe'},
          {title: 'Cérémonie', value: 'ceremonie'},
          {title: 'Traité', value: 'traite'},
          {title: 'Mystique', value: 'mystique'},
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
        to: [{ type: 'tag' }]
      }],
      description: 'Tags libres pour qualifier cet événement (ex: Bataille, Tragédie, Victoire, etc.)'
    },
    {
      name: 'datePeriode',
      type: 'string',
      title: 'Date / Période'
    },
    {
      name: 'lieu',
      type: 'reference',
      title: 'Lieu',
      to: [{type: 'region'}]
    },
    {
      name: 'declencheur',
      type: 'text',
      title: 'Déclencheur',
      rows: 3
    },
    {
      name: 'acteursPrincipaux',
      type: 'array',
      title: 'Acteurs principaux',
      of: [
        {
          type: 'reference',
          to: [{type: 'personnage'}]
        }
      ]
    },
    {
      name: 'resume',
      type: 'array',
      title: 'Résumé',
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      name: 'consequences',
      type: 'array',
      title: 'Conséquences',
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      name: 'objetsConceptsLies',
      type: 'array',
      title: 'Objets / concepts / pouvoirs liés',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'objet'},
            {type: 'conceptMetaphysique'}
          ]
        }
      ]
    },
    {
      name: 'mythificationDeformation',
      type: 'text',
      title: 'Mythification ou déformation historique',
      rows: 4
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images de l\'événement',
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
      date: 'datePeriode'
    },
    prepare(selection) {
      const {title, subtitle, date} = selection
      return {
        title: title,
        subtitle: `${subtitle} - ${date || 'Date inconnue'}`
      }
    }
  }
}

export default evenement
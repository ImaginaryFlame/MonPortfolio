import { localizedField, localizedRequiredField, localizedArrayField } from './utils/localization';

const univers = {
  name: 'univers',
  title: 'Univers',
  type: 'document',
  fields: [
    localizedRequiredField({
      name: 'nom',
      type: 'string',
      title: 'Nom de l\'univers'
    }),
    localizedField({
      name: 'description',
      type: 'text',
      title: 'Description générale',
      rows: 4
    }),
    localizedArrayField({
      name: 'genres',
      title: 'Genres de l\'univers',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          // Fantasy et dérivés
          { title: 'Fantasy', value: 'fantasy' },
          { title: 'High Fantasy', value: 'high_fantasy' },
          { title: 'Low Fantasy', value: 'low_fantasy' },
          { title: 'Dark Fantasy', value: 'dark_fantasy' },
          { title: 'Fantasy contemporaine', value: 'contemporary_fantasy' },
          { title: 'Urban Fantasy', value: 'urban_fantasy' },
          { title: 'Fantasy historique', value: 'historical_fantasy' },
          { title: 'Fantasy romantique', value: 'romantic_fantasy' },
          { title: 'Fantasy épique', value: 'epic_fantasy' },
          
          // Science-Fiction et dérivés
          { title: 'Science-Fiction', value: 'science_fiction' },
          { title: 'Space Opera', value: 'space_opera' },
          { title: 'Science-Fantasy', value: 'science_fantasy' },
          { title: 'Cyberpunk', value: 'cyberpunk' },
          { title: 'Steampunk', value: 'steampunk' },
          { title: 'Biopunk', value: 'biopunk' },
          { title: 'Post-apocalyptique', value: 'post_apocalyptic' },
          { title: 'Dystopie', value: 'dystopia' },
          { title: 'Utopie', value: 'utopia' },
          
          // Fantastique et Surnaturel
          { title: 'Fantastique', value: 'fantastique' },
          { title: 'Paranormal', value: 'paranormal' },
          { title: 'Gothique', value: 'gothic' },
          { title: 'Mythologie', value: 'mythology' },
          { title: 'Folklore', value: 'folklore' },
          { title: 'Contes de fées', value: 'fairy_tales' },
          { title: 'Légendes', value: 'legends' },
          
          // Action et Aventure
          { title: 'Aventure', value: 'adventure' },
          { title: 'Action-Aventure', value: 'action_adventure' },
          { title: 'Super-héros', value: 'superhero' },
          { title: 'Arts martiaux', value: 'martial_arts' },
          { title: 'Exploration', value: 'exploration' },
          
          // Thriller et Horror
          { title: 'Thriller', value: 'thriller' },
          { title: 'Thriller psychologique', value: 'psychological_thriller' },
          { title: 'Horreur', value: 'horror' },
          { title: 'Horreur psychologique', value: 'psychological_horror' },
          { title: 'Survival Horror', value: 'survival_horror' },
          { title: 'Mystère', value: 'mystery' },
          { title: 'Crime', value: 'crime' },
          
          // Drama et Romance
          { title: 'Drame', value: 'drama' },
          { title: 'Romance', value: 'romance' },
          { title: 'Tragédie', value: 'tragedy' },
          { title: 'Mélodrame', value: 'melodrama' },
          { title: 'Saga familiale', value: 'family_saga' },
          
          // Autres genres
          { title: 'Historique', value: 'historical' },
          { title: 'Contemporain', value: 'contemporary' },
          { title: 'Comédie', value: 'comedy' },
          { title: 'Satire', value: 'satire' },
          { title: 'Expérimental', value: 'experimental' },
          { title: 'Slice of Life', value: 'slice_of_life' },
          { title: 'Young Adult', value: 'young_adult' },
          { title: 'New Adult', value: 'new_adult' },
          { title: 'Autre', value: 'other' }
        ]
      }
    }),
    localizedField({
      name: 'tonalite',
      type: 'string',
      title: 'Tonalité générale',
      options: {
        list: [
          { title: 'Sombre', value: 'sombre' },
          { title: 'Léger', value: 'leger' },
          { title: 'Dramatique', value: 'dramatique' },
          { title: 'Humoristique', value: 'humoristique' },
          { title: 'Épique', value: 'epique' },
          { title: 'Mélancolique', value: 'melancolique' },
          { title: 'Mystérieux', value: 'mysterieux' }
        ]
      }
    }),
    localizedField({
      name: 'themes',
      type: 'array',
      title: 'Thèmes principaux',
      of: [{ type: 'string' }]
    }),
    localizedField({
      name: 'conceptsCles',
      type: 'array',
      title: 'Concepts clés',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'nom',
            type: 'string',
            title: 'Nom du concept'
          },
          {
            name: 'description',
            type: 'text',
            title: 'Description',
            rows: 2
          }
        ]
      }]
    }),
    {
      name: 'regions',
      type: 'array',
      title: 'Régions principales',
      of: [
        {
          type: 'reference',
          to: [{type: 'region'}]
        }
      ]
    },
    {
      name: 'races',
      type: 'array',
      title: 'Races principales',
      of: [
        {
          type: 'reference',
          to: [{type: 'race'}]
        }
      ]
    },
    {
      name: 'systemesEsoteriques',
      type: 'object',
      title: 'Aperçu des systèmes ésotériques',
      description: 'Vue d\'ensemble des différents systèmes de pouvoir dans l\'univers (magie, énergie conceptuelle, alchimie...)',
      fields: [
        {
          name: 'roleGeneral',
          type: 'string',
          title: 'Rôle des pouvoirs',
          description: 'Place générale des systèmes ésotériques dans cet univers',
          options: {
            list: [
              {
                title: 'Centraux et omniprésents',
                value: 'centrale',
                description: 'Les pouvoirs sont au cœur de l\'univers et affectent tout'
              },
              {
                title: 'Importants mais limités',
                value: 'importante',
                description: 'Les pouvoirs jouent un rôle majeur mais avec des restrictions significatives'
              },
              {
                title: 'Présents en arrière-plan',
                value: 'arriere_plan',
                description: 'Les pouvoirs existent mais ne sont pas l\'élément principal'
              },
              {
                title: 'Rares ou secrets',
                value: 'rare',
                description: 'Les pouvoirs sont peu communs ou cachés'
              },
              {
                title: 'Inexistants',
                value: 'inexistante',
                description: 'Pas de pouvoirs dans cet univers'
              }
            ]
          }
        },
        {
          name: 'accessibilite',
          type: 'string',
          title: 'Qui peut les utiliser',
          description: 'Accessibilité générale aux différents systèmes de pouvoir',
          options: {
            list: [
              {
                title: 'Tout le monde potentiellement',
                value: 'tous',
                description: 'Chacun peut potentiellement accéder à un ou plusieurs systèmes'
              },
              {
                title: 'Groupes spécifiques',
                value: 'groupes',
                description: 'Limités à certains groupes ou races'
              },
              {
                title: 'Individus choisis',
                value: 'individus',
                description: 'Seuls certains individus spécifiques'
              }
            ]
          }
        }
      ]
    },
    {
      name: 'systemesSpecifiques',
      type: 'array',
      title: 'Systèmes ésotériques spécifiques',
      description: 'Systèmes de pouvoir uniques à cet univers',
      of: [
        {
          type: 'reference',
          to: [{type: 'systemeEsoterique'}]
        }
      ]
    },
    {
      name: 'technologie',
      type: 'text',
      title: 'Niveau technologique',
      rows: 3
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image représentative',
      options: {
        hotspot: true
      }
    },
    {
      name: 'precisions',
      type: 'text',
      title: 'Précisions temporelles',
      description: 'Détails sur le cadre temporel de l\'histoire (dates précises, durée, particularités temporelles)',
      rows: 3
    },
    {
      name: 'voyageTemporel',
      type: 'object',
      title: 'Voyage Temporel',
      description: 'Informations sur les mécanismes de voyage dans le temps',
      fields: [
        {
          name: 'present',
          type: 'boolean',
          title: 'Présence de voyages temporels',
          description: 'L\'univers contient-il des voyages dans le temps ?'
        },
        {
          name: 'mecanismes',
          type: 'text',
          title: 'Mécanismes',
          description: 'Description des méthodes et technologies permettant le voyage temporel',
          rows: 3
        },
        {
          name: 'regles',
          type: 'text',
          title: 'Règles et paradoxes',
          description: 'Règles régissant les voyages temporels et gestion des paradoxes',
          rows: 3
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'nom.fr',
      subtitle: 'description.fr'
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Sans nom',
        subtitle: subtitle
      };
    }
  }
}

export default univers
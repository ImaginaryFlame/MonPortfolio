import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';

export default {
  name: 'pouvoirTransformation',
  title: '🔮 Pouvoir de Transformation',
  type: 'document',
  description: 'Pouvoir, capacité ou transformation spécifique d\'un personnage ou d\'une race',
  fields: [
    {
      name: 'nom',
      type: 'string',
      title: 'Nom du pouvoir/transformation',
      validation: Rule => Rule.required(),
      description: 'Nom du pouvoir, de la capacité ou de la transformation'
    },
    {
      name: 'lienExterne',
      type: 'url',
      title: '🔗 Lien externe',
      description: 'Lien vers des références, inspirations ou ressources externes',
      validation: Rule => Rule.uri({
        allowRelative: false,
        scheme: ['http', 'https']
      })
    },
    {
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          { title: '⚡ Pouvoir inné', value: 'pouvoir_inne' },
          { title: '🎓 Capacité acquise', value: 'capacite_acquise' },
          { title: '🔄 Transformation physique', value: 'transformation_physique' },
          { title: '🧠 Transformation mentale', value: 'transformation_mentale' },
          { title: '🌟 Pouvoir prêté/emprunté', value: 'pouvoir_prete' },
          { title: '⚔️ Technique de combat', value: 'technique_combat' },
          { title: '🔮 Pouvoir magique', value: 'pouvoir_magique' },
          { title: '🧬 Mutation génétique', value: 'mutation_genetique' },
          { title: '🤖 Amélioration technologique', value: 'amelioration_tech' },
          { title: '👻 Pouvoir spirituel', value: 'pouvoir_spirituel' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'univers',
      title: 'Univers d\'appartenance',
      type: 'reference',
      to: [{ type: 'univers' }],
      validation: Rule => Rule.required(),
      description: 'L\'univers dans lequel ce pouvoir/transformation existe'
    },
    {
      name: 'systemeEsoterique',
      title: 'Système ésotérique lié',
      type: 'reference',
      to: [{ type: 'systemeEsoterique' }],
      description: 'Le système ésotérique dont dépend ce pouvoir (optionnel)'
    },
    {
      name: 'niveauSysteme',
      title: 'Niveau dans le système',
      type: 'number',
      description: 'Niveau requis dans le système ésotérique pour utiliser ce pouvoir (1-10)',
      validation: Rule => Rule.min(1).max(10),
      hidden: ({ document }) => !document?.systemeEsoterique
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ 
        type: 'reference', 
        to: [{ type: 'tag' }]
      }],
      description: 'Tags pour qualifier ce pouvoir (ex: Élémentaire, Dangereux, Rare, etc.)'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 4,
      validation: Rule => Rule.required(),
      description: 'Description détaillée du pouvoir ou de la transformation'
    },
    {
      name: 'origine',
      type: 'string',
      title: 'Origine',
      description: 'D\'où vient ce pouvoir ? (race, entraînement, artefact, etc.)'
    },
    {
      name: 'niveauPuissance',
      type: 'number',
      title: 'Niveau de puissance (1-10)',
      validation: Rule => Rule.min(1).max(10),
      description: '1 = très faible, 10 = destructeur cosmique'
    },
    {
      name: 'niveauRarete',
      type: 'string',
      title: 'Niveau de rareté',
      options: {
        list: [
          { title: 'Très commun', value: 'tres_commun' },
          { title: 'Commun', value: 'commun' },
          { title: 'Peu commun', value: 'peu_commun' },
          { title: 'Rare', value: 'rare' },
          { title: 'Très rare', value: 'tres_rare' },
          { title: 'Légendaire', value: 'legendaire' },
          { title: 'Mythique', value: 'mythique' },
          { title: 'Unique', value: 'unique' }
        ]
      }
    },
    {
      name: 'portee',
      type: 'string',
      title: 'Portée',
      description: 'Portée d\'action du pouvoir (contact, courte, moyenne, longue, illimitée)'
    },
    {
      name: 'duree',
      type: 'string',
      title: 'Durée',
      description: 'Durée d\'effet (instantané, quelques secondes, minutes, heures, permanent)'
    },
    {
      name: 'coutEnergetique',
      type: 'string',
      title: 'Coût énergétique',
      options: {
        list: [
          { title: 'Aucun', value: 'aucun' },
          { title: 'Négligeable', value: 'negligeable' },
          { title: 'Faible', value: 'faible' },
          { title: 'Modéré', value: 'modere' },
          { title: 'Élevé', value: 'eleve' },
          { title: 'Très élevé', value: 'tres_eleve' },
          { title: 'Épuisant', value: 'epuisant' },
          { title: 'Potentiellement mortel', value: 'mortel' }
        ]
      }
    },
    {
      name: 'conditionsActivation',
      type: 'array',
      title: 'Conditions d\'activation',
      of: [{ type: 'string' }],
      description: 'Conditions requises pour activer le pouvoir'
    },
    {
      name: 'limitations',
      type: 'array',
      title: 'Limitations',
      of: [{ 
        type: 'object',
        fields: [
          { name: 'type', type: 'string', title: 'Type de limitation' },
          { name: 'description', type: 'text', title: 'Description' }
        ]
      }],
      description: 'Limitations et restrictions du pouvoir'
    },
    {
      name: 'effetsSecondaires',
      type: 'array',
      title: 'Effets secondaires',
      of: [{ 
        type: 'object',
        fields: [
          { name: 'effet', type: 'string', title: 'Effet secondaire' },
          { name: 'probabilite', type: 'string', title: 'Probabilité d\'occurrence' },
          { name: 'severite', type: 'string', title: 'Sévérité' }
        ]
      }],
      description: 'Effets secondaires et risques liés à l\'utilisation'
    },
    {
      name: 'evolutionPossible',
      type: 'boolean',
      title: 'Évolution possible ?',
      description: 'Ce pouvoir peut-il évoluer ou se renforcer ?'
    },
    {
      name: 'formeEvoluee',
      type: 'reference',
      title: 'Forme évoluée',
      to: [{ type: 'pouvoirTransformation' }],
      description: 'Version améliorée de ce pouvoir (si applicable)',
      hidden: ({ document }) => !document?.evolutionPossible
    },
    {
      name: 'prerequis',
      type: 'array',
      title: 'Prérequis',
      of: [{ 
        type: 'reference', 
        to: [{ type: 'pouvoirTransformation' }] 
      }],
      description: 'Autres pouvoirs requis avant d\'obtenir celui-ci'
    },
    {
      name: 'combinaisonsPossibles',
      type: 'array',
      title: 'Combinaisons possibles',
      of: [{ 
        type: 'reference', 
        to: [{ type: 'pouvoirTransformation' }] 
      }],
      description: 'Pouvoirs avec lesquels celui-ci peut être combiné'
    },
    {
      name: 'personnages',
      title: 'Personnages possédant ce pouvoir',
      type: 'array',
      of: [{ 
        type: 'reference', 
        to: [{ type: 'personnage' }] 
      }],
      description: 'Personnages qui possèdent ou peuvent utiliser ce pouvoir'
    },
    {
      name: 'races',
      title: 'Races associées',
      type: 'array',
      of: [{ 
        type: 'reference', 
        to: [{ type: 'race' }] 
      }],
      description: 'Races naturellement associées à ce pouvoir'
    },
    {
      name: 'factions',
      title: 'Factions utilisatrices',
      type: 'array',
      of: [{ 
        type: 'reference', 
        to: [{ type: 'faction' }] 
      }],
      description: 'Factions qui utilisent ou enseignent ce pouvoir'
    },
    {
      name: 'progression',
      type: 'object',
      title: 'Système de progression',
      fields: [
        {
          name: 'niveauActuel',
          type: 'number',
          title: 'Niveau actuel',
          description: 'Niveau actuel du pouvoir (1-10)',
          validation: Rule => Rule.min(1).max(10)
        },
        {
          name: 'niveauMaximum',
          type: 'number',
          title: 'Niveau maximum',
          description: 'Niveau maximum possible pour ce pouvoir',
          validation: Rule => Rule.min(1).max(10)
        },
        {
          name: 'methodeProgression',
          type: 'text',
          title: 'Méthode de progression',
          description: 'Comment améliorer ce pouvoir',
          rows: 3
        },
        {
          name: 'tempsProgression',
          type: 'string',
          title: 'Temps de progression',
          description: 'Temps nécessaire pour progresser (ex: 1 mois, 1 an, etc.)'
        }
      ],
      description: 'Système de progression et d\'amélioration du pouvoir'
    },
    {
      name: 'variantes',
      type: 'array',
      title: 'Variantes',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'nom',
            type: 'string',
            title: 'Nom de la variante'
          },
          {
            name: 'description',
            type: 'text',
            title: 'Description de la variante',
            rows: 2
          },
          {
            name: 'differences',
            type: 'text',
            title: 'Différences avec la version standard',
            rows: 2
          }
        ]
      }],
      description: 'Variantes ou versions alternatives de ce pouvoir'
    },
    {
      name: 'histoire',
      type: 'object',
      title: 'Histoire et légendes',
      fields: [
        {
          name: 'premiereApparition',
          type: 'text',
          title: 'Première apparition',
          description: 'Quand et où ce pouvoir est-il apparu pour la première fois ?',
          rows: 2
        },
        {
          name: 'legendes',
          type: 'array',
          title: 'Légendes associées',
          of: [{ type: 'text', rows: 3 }],
          description: 'Légendes et histoires liées à ce pouvoir'
        },
        {
          name: 'utilisateursFameux',
          type: 'array',
          title: 'Utilisateurs fameux',
          of: [{ type: 'string' }],
          description: 'Personnages célèbres qui ont utilisé ce pouvoir'
        }
      ]
    },
    ...visibilityFields
  ],
  preview: {
    select: {
      title: 'nom',
      type: 'type',
      univers: 'univers.nom',
      systeme: 'systemeEsoterique.nom',
      niveauSysteme: 'niveauSysteme',
      niveauPuissance: 'niveauPuissance',
      featured: 'featured',
      isPublished: 'isPublished'
    },
    prepare(selection) {
      const typeLabels = {
        'pouvoir_inne': '⚡ Inné',
        'capacite_acquise': '🎓 Acquis',
        'transformation_physique': '🔄 Physique',
        'transformation_mentale': '🧠 Mental',
        'pouvoir_prete': '🌟 Prêté',
        'technique_combat': '⚔️ Combat',
        'pouvoir_magique': '🔮 Magique',
        'mutation_genetique': '🧬 Génétique',
        'amelioration_tech': '🤖 Tech',
        'pouvoir_spirituel': '👻 Spirituel'
      };
      
      let subtitle = `${typeLabels[selection.type] || selection.type} • ${selection.univers || 'Univers inconnu'}`;
      
      if (selection.systeme) {
        subtitle += ` • ${selection.systeme}`;
        if (selection.niveauSysteme) {
          subtitle += ` (Niv. ${selection.niveauSysteme})`;
        }
      }
      
      if (selection.niveauPuissance) {
        subtitle += ` • Puissance: ${selection.niveauPuissance}/10`;
      }
      
      return {
        title: selection.title,
        subtitle: subtitle,
        media: () => '⚡'
      };
    }
  },
  orderings: [
    ...visibilityOrderings,
    {
      title: 'Par type',
      name: 'typeAsc',
      by: [
        { field: 'type', direction: 'asc' },
        { field: 'nom', direction: 'asc' }
      ]
    },
    {
      title: 'Par univers',
      name: 'universAsc',
      by: [
        { field: 'univers.nom', direction: 'asc' },
        { field: 'nom', direction: 'asc' }
      ]
    },
    {
      title: 'Par système ésotérique',
      name: 'systemeAsc',
      by: [
        { field: 'systemeEsoterique.nom', direction: 'asc' },
        { field: 'niveauSysteme', direction: 'asc' },
        { field: 'nom', direction: 'asc' }
      ]
    },
    {
      title: 'Par puissance',
      name: 'puissanceDesc',
      by: [
        { field: 'niveauPuissance', direction: 'desc' },
        { field: 'nom', direction: 'asc' }
      ]
    }
  ]
};
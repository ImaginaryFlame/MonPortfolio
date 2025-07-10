import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';
import { createRichTextField } from './utils/richTextConfig.js';

export default {
  name: 'univers',
  title: '🌍 Univers',
  type: 'document',
  fields: [
    {
      name: 'nom',
      type: 'string',
      title: 'Nom',
      validation: Rule => Rule.required()
    },
    {
      name: 'lienExterne',
      type: 'url',
      title: '🔗 Lien externe',
      description: 'Lien vers des ressources externes liées à cet univers',
      validation: Rule => Rule.uri({
        allowRelative: false,
        scheme: ['http', 'https']
      })
    },
    {
      name: 'type',
      type: 'string',
      title: 'Type d\'univers',
      options: {
        list: [
          { title: '🎭 Fiction originale', value: 'fiction_originale' },
          { title: '🎮 Jeu vidéo', value: 'jeu_video' },
          { title: '📚 Littérature', value: 'litterature' },
          { title: '🎬 Cinéma/TV', value: 'cinema_tv' },
          { title: '🎨 Animation', value: 'animation' },
          { title: '🎲 Jeu de rôle', value: 'jeu_role' },
          { title: '📖 Manga/BD', value: 'manga_bd' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'genre',
      type: 'array',
      title: 'Genres',
      of: [{
        type: 'string',
        options: {
          list: [
            { title: '🗡️ Fantasy', value: 'fantasy' },
            { title: '🚀 Science-fiction', value: 'sf' },
            { title: '🌙 Dark Fantasy', value: 'dark_fantasy' },
            { title: '🤖 Cyberpunk', value: 'cyberpunk' },
            { title: '🎭 Steampunk', value: 'steampunk' },
            { title: '🏰 Médiéval', value: 'medieval' },
            { title: '🌟 Space Opera', value: 'space_opera' },
            { title: '🔮 Urban Fantasy', value: 'urban_fantasy' },
            { title: '🧙‍♂️ High Fantasy', value: 'high_fantasy' },
            { title: '🌍 Post-apocalyptique', value: 'post_apo' },
            { title: '⚔️ Heroic Fantasy', value: 'heroic_fantasy' },
            { title: '🎪 Fantastique', value: 'fantastique' }
          ]
        }
      }]
    },
    {
      name: 'themes',
      type: 'array',
      title: '🎨 Thèmes principaux',
      of: [{
        type: 'string',
        options: {
          list: [
            { title: '⚔️ Combat du bien et du mal', value: 'bien_mal' },
            { title: '🔄 Cycle et renaissance', value: 'cycle' },
            { title: '💫 Destin et libre arbitre', value: 'destin' },
            { title: '💪 Pouvoir et responsabilité', value: 'pouvoir' },
            { title: '❤️ Amour et sacrifice', value: 'amour' },
            { title: '🤝 Amitié et loyauté', value: 'amitie' },
            { title: '🌱 Nature et technologie', value: 'nature_tech' },
            { title: '🎭 Identité et transformation', value: 'identite' },
            { title: '⚖️ Justice et vengeance', value: 'justice' },
            { title: '🏰 Tradition et progrès', value: 'tradition' },
            { title: '🌍 Survie et adaptation', value: 'survie' },
            { title: '🤔 Morale et éthique', value: 'morale' }
          ]
        }
      }]
    },
    {
      name: 'tonalite',
      type: 'string',
      title: '🎭 Tonalité',
      options: {
        list: [
          { title: '✨ Épique', value: 'epique' },
          { title: '🌙 Sombre', value: 'sombre' },
          { title: '😊 Léger', value: 'leger' },
          { title: '🎭 Dramatique', value: 'dramatique' },
          { title: '🌟 Optimiste', value: 'optimiste' },
          { title: '🖤 Mélancolique', value: 'melancolique' },
          { title: '😄 Humoristique', value: 'humoristique' },
          { title: '🎪 Satirique', value: 'satirique' }
        ]
      }
    },
    {
      name: 'publicCible',
      type: 'string',
      title: '👥 Public cible',
      options: {
        list: [
          { title: '👶 Enfants', value: 'enfants' },
          { title: '🎒 Jeunesse', value: 'jeunesse' },
          { title: '🎓 Young Adult', value: 'young_adult' },
          { title: '👨 Adulte', value: 'adulte' },
          { title: '👨‍👩‍👧‍👦 Tout public', value: 'tout_public' }
        ]
      }
    },
    {
      name: 'resume',
      title: 'Résumé',
      description: 'Brève description de l\'univers',
      ...createRichTextField('basic')
    },
    {
      name: 'histoire',
      title: 'Histoire détaillée',
      description: 'Histoire complète de l\'univers',
      ...createRichTextField('medium')
    },
    {
      name: 'chronologie',
      type: 'array',
      title: '📅 Chronologie',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'periode',
            type: 'string',
            title: 'Période/Ère'
          },
          {
            name: 'description',
            title: 'Description',
            ...createRichTextField('basic')
          },
          {
            name: 'evenementsMarquants',
            type: 'array',
            title: 'Événements marquants',
            of: [{
              type: 'reference',
              to: [{ type: 'evenement' }]
            }]
          }
        ]
      }]
    },
    {
      name: 'geographie',
      type: 'array',
      title: '🗺️ Géographie',
      of: [{
          type: 'reference',
        to: [{ type: 'region' }]
      }]
    },
    {
      name: 'factionsPresentes',
      type: 'array',
      title: '👥 Factions présentes',
      of: [{
          type: 'reference',
        to: [{ type: 'faction' }]
      }]
    },
    {
      name: 'systemesEsoteriques',
      type: 'array',
      title: '🔮 Systèmes ésotériques',
      of: [{
        type: 'reference',
        to: [{ type: 'systemeEsoterique' }]
      }]
    },
    {
      name: 'races',
      type: 'array',
      title: '👥 Races et peuples',
      of: [{
          type: 'reference',
        to: [{ type: 'race' }]
      }]
    },
    {
      name: 'bestiaire',
      type: 'array',
      title: '🐾 Bestiaire',
      of: [{
        type: 'reference',
        to: [{ type: 'bestiaires' }]
      }]
    },
    {
      name: 'cosmogonie',
      type: 'reference',
      title: '✨ Cosmogonie',
      to: [{ type: 'cosmogonie' }],
      description: 'La structure et l\'origine de cet univers'
    },
    {
      name: 'dogmesReligieux',
      type: 'array',
      title: '🕊️ Dogmes Religieux',
      of: [{
        type: 'reference',
        to: [{ type: 'dogmeReligieux' }]
      }]
    },
    {
      name: 'traditionsAncestrales',
      type: 'array',
      title: '📚 Traditions Ancestrales',
      of: [{
        type: 'reference',
        to: [{ type: 'traditionAncestrale' }]
      }]
    },
    {
      name: 'celebrations',
      type: 'array',
      title: '🎉 Célébrations',
      of: [{
          type: 'reference',
        to: [{ type: 'celebrations' }]
      }]
    },
    {
      name: 'objetsImportants',
      type: 'array',
      title: '🎭 Objets Importants',
      of: [{
            type: 'reference',
        to: [{ type: 'objet' }]
      }]
    },
    {
      name: 'reglesSpecifiques',
      title: '📜 Règles spécifiques',
      description: 'Règles et lois particulières qui régissent cet univers',
      ...createRichTextField('medium')
    },
    {
      name: 'inspirations',
      type: 'array',
      title: '💫 Inspirations',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'source',
            type: 'string',
            title: 'Source d\'inspiration'
          },
          {
            name: 'type',
            type: 'string',
            title: 'Type',
            options: {
              list: [
                { title: '📚 Littéraire', value: 'litteraire' },
                { title: '🎬 Cinématographique', value: 'cinema' },
                { title: '🎮 Vidéoludique', value: 'jeu_video' },
                { title: '🎨 Artistique', value: 'artistique' },
                { title: '📖 Mythologique', value: 'mythologique' },
                { title: '🌍 Historique', value: 'historique' }
              ]
            }
          },
          {
            name: 'description',
            type: 'text',
            title: 'Description de l\'influence',
            rows: 2
          }
        ]
      }]
    },
    {
      name: 'image',
      type: 'image',
      title: '🖼️ Image représentative',
      options: {
        hotspot: true
      }
    },

    // Champs de visibilité
    ...visibilityFields
  ],
  preview: {
    select: {
      title: 'nom',
      subtitle: 'type',
      media: 'image',
      featured: 'featured',
      isPublished: 'isPublished'
    },
    prepare(selection) {
      const { title, subtitle, media, featured, isPublished } = selection;
      
      const featuredEmoji = featured ? '⭐ ' : '';
      const publishedEmoji = isPublished === false ? '👁️ ' : '';
      
      return {
        title: `${publishedEmoji}${featuredEmoji}${title || 'Sans nom'}`,
        subtitle: (subtitle || '') + (isPublished === false ? ' • 🚫 NON PUBLIÉ' : ''),
        media: media
      };
    }
  },
  orderings: [
    ...visibilityOrderings,
    {
      title: 'Nom A-Z',
      name: 'nomAsc',
      by: [{ field: 'nom', direction: 'asc' }]
    },
    {
      title: 'Par type',
      name: 'typeAsc',
      by: [
        { field: 'type', direction: 'asc' },
        { field: 'nom', direction: 'asc' }
      ]
    }
  ]
}
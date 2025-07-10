import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';

export default {
  name: 'systemeEsoterique',
  title: '✨ Système Ésotérique',
  type: 'document',
  description: 'Système de pouvoir, de magie, d\'alchimie ou autre force mystique/ésotérique avec hiérarchie et niveaux',
  fields: [
    {
      name: 'nom',
      title: 'Nom',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{
        type: 'block',
        // Styles de texte disponibles
        styles: [
          {title: 'Paragraphe', value: 'normal'},
          {title: 'Titre niveau 2', value: 'h2'},
          {title: 'Titre niveau 3', value: 'h3'},
          {title: 'Citation', value: 'blockquote'},
        ],
        // Types de listes
        lists: [
          {title: 'Puces', value: 'bullet'},
          {title: 'Numérotée', value: 'number'}
        ],
        // Marques et décorations
        marks: {
          // Décorations de texte
          decorators: [
            {title: 'Gras', value: 'strong'},
            {title: 'Italique', value: 'em'},
            {title: 'Souligné', value: 'underline'},
            {title: 'Code', value: 'code'},
          ],
          // Annotations personnalisées
          annotations: [
            {
              name: 'lien',
              type: 'object',
              title: 'Lien',
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL'
                }
              ]
            }
          ]
        }
      }],
      validation: Rule => Rule.required()
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
      name: 'univers',
      title: 'Univers d\'appartenance',
      type: 'reference',
      to: [{ type: 'univers' }],
      validation: Rule => Rule.required(),
      description: 'L\'univers dans lequel ce système existe'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ 
        type: 'reference', 
        to: [{ type: 'tag' }]
      }],
      description: 'Tags pour qualifier ce système (ex: Magique, Scientifique, Rare, etc.)'
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: '🌌 Système Racine', value: 'racine'},
          {title: '🔮 Système Dérivé', value: 'derive'},
          {title: '🌿 Branche Émancipée', value: 'emancipe'},
          {title: '⚔️ Système Antagoniste', value: 'systeme_antagoniste'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'systemesParents',
      title: 'Systèmes Parents',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'systemeEsoterique'}]}],
      hidden: ({document}) => document?.type === 'racine'
    },
    {
      name: 'niveau',
      title: 'Niveau',
      type: 'number',
      hidden: ({document}) => document?.type === 'racine',
      validation: Rule => Rule.integer().min(1).max(10)
    },
    {
      name: 'systemesOpposants',
      title: 'Systèmes opposants',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'systemeEsoterique' }] }],
      description: 'Les systèmes auxquels ce système s\'oppose naturellement',
      hidden: ({ document }) => document?.type !== 'systeme_antagoniste',
      validation: Rule => Rule.custom((opposants, context) => {
        if (context.document?.type === 'systeme_antagoniste' && (!opposants || opposants.length === 0)) {
          return 'Un système antagoniste doit s\'opposer à au moins un autre système';
        }
        return true;
      })
    },
    {
      name: 'niveaux',
      title: 'Niveaux du système',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'niveau',
            type: 'number',
            title: 'Numéro du niveau',
            validation: Rule => Rule.required().min(1)
          },
          {
            name: 'nom',
            type: 'string',
            title: 'Nom du niveau',
            description: 'Ex: Initiation, Apprenti, Adepte, Maître, etc.'
          },
          {
            name: 'description',
            type: 'array',
            title: 'Description du niveau',
            description: 'Ce que représente ce niveau dans la progression',
            of: [{
              type: 'block',
              styles: [
                {title: 'Paragraphe', value: 'normal'},
                {title: 'Titre niveau 3', value: 'h3'},
              ],
              lists: [
                {title: 'Puces', value: 'bullet'},
                {title: 'Numérotée', value: 'number'}
              ],
              marks: {
                decorators: [
                  {title: 'Gras', value: 'strong'},
                  {title: 'Italique', value: 'em'},
                  {title: 'Code', value: 'code'},
                ]
              }
            }]
          },
          {
            name: 'exigences',
            type: 'array',
            title: 'Exigences pour atteindre ce niveau',
            of: [{
              type: 'block',
              styles: [{title: 'Paragraphe', value: 'normal'}],
              lists: [
                {title: 'Puces', value: 'bullet'},
                {title: 'Numérotée', value: 'number'}
              ],
              marks: {
                decorators: [
                  {title: 'Gras', value: 'strong'},
                  {title: 'Italique', value: 'em'},
                ]
              }
            }]
          },
          {
            name: 'pouvoirsDisponibles',
            type: 'array',
            title: 'Pouvoirs disponibles à ce niveau',
            of: [{ type: 'reference', to: [{ type: 'pouvoirTransformation' }] }]
          }
        ],
        preview: {
          select: {
            niveau: 'niveau',
            nom: 'nom'
          },
          prepare(selection) {
            return {
              title: `Niveau ${selection.niveau}: ${selection.nom || 'Sans nom'}`,
              subtitle: `Niveau ${selection.niveau}`
            };
          }
        }
      }],
      description: 'Les différents niveaux de progression dans ce système (sauf pour l\'Abstraiya)',
      hidden: ({ document }) => document?.type === 'racine'
    },
    {
      name: 'autresNoms',
      type: 'array',
      title: 'Autres noms',
      description: 'Autres appellations connues de ce système',
      of: [{type: 'string'}]
    },
    {
      name: 'themes',
      type: 'array',
      title: 'Thèmes',
      description: 'Thèmes et concepts liés à ce système',
      of: [{type: 'string'}]
    },
    {
      name: 'origine',
      type: 'object',
      title: 'Origine',
      fields: [
        {
          name: 'sourcesPrincipales',
          type: 'array',
          title: 'Sources principales',
          of: [{type: 'string'}]
        },
        {
          name: 'description',
          type: 'array',
          title: 'Description de l\'origine',
          of: [{
            type: 'block',
            styles: [{title: 'Paragraphe', value: 'normal'}],
            lists: [
              {title: 'Puces', value: 'bullet'},
              {title: 'Numérotée', value: 'number'}
            ],
            marks: {
              decorators: [
                {title: 'Gras', value: 'strong'},
                {title: 'Italique', value: 'em'},
              ]
            }
          }]
        },
        {
          name: 'dateCreation',
          type: 'date',
          title: 'Date de création/discovery',
          description: 'Quand ce système a-t-il été découvert ou créé ?'
        }
      ]
    },
    {
      name: 'manifestations',
      type: 'object',
      title: 'Manifestations',
      fields: [
        {
          name: 'formes',
          type: 'array',
          title: 'Formes d\'utilisation',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom de la manifestation'
              },
              {
                name: 'description',
                type: 'array',
                title: 'Description',
                of: [{
                  type: 'block',
                  styles: [{title: 'Paragraphe', value: 'normal'}],
                  lists: [
                    {title: 'Puces', value: 'bullet'},
                    {title: 'Numérotée', value: 'number'}
                  ],
                  marks: {
                    decorators: [
                      {title: 'Gras', value: 'strong'},
                      {title: 'Italique', value: 'em'},
                    ]
                  }
                }]
              }
            ]
          }]
        },
        {
          name: 'methodesInvocation',
          type: 'array',
          title: 'Méthodes d\'utilisation',
          description: 'Comment le système est mis en œuvre (incantations, rituels, pensée, etc.)',
          of: [{type: 'string'}]
        }
      ]
    },
    {
      name: 'utilisateurs',
      type: 'object',
      title: 'Utilisateurs',
      fields: [
        {
          name: 'typesUtilisateurs',
          type: 'array',
          title: 'Types d\'utilisateurs',
          of: [{type: 'string'}]
        },
        {
          name: 'conditions',
          type: 'array',
          title: 'Conditions d\'utilisation',
          description: 'Conditions requises pour utiliser ce système',
          of: [{
            type: 'block',
            styles: [{title: 'Paragraphe', value: 'normal'}],
            lists: [
              {title: 'Puces', value: 'bullet'},
              {title: 'Numérotée', value: 'number'}
            ],
            marks: {
              decorators: [
                {title: 'Gras', value: 'strong'},
                {title: 'Italique', value: 'em'},
              ]
            }
          }]
        },
        {
          name: 'methodesAcquisition',
          type: 'array',
          title: 'Méthodes d\'acquisition',
          of: [{type: 'string'}]
        }
      ]
    },
    {
      name: 'limitesDangers',
      type: 'object',
      title: 'Limites et Dangers',
      description: 'Restrictions et risques liés à l\'utilisation de ce système',
      fields: [
        {
          name: 'limites',
          type: 'array',
          title: 'Limites',
          description: 'Restrictions et contraintes du système',
          of: [{
            type: 'block',
            styles: [
              {title: 'Paragraphe', value: 'normal'},
              {title: 'Titre niveau 3', value: 'h3'},
            ],
            lists: [
              {title: 'Puces', value: 'bullet'},
              {title: 'Numérotée', value: 'number'}
            ],
            marks: {
              decorators: [
                {title: 'Gras', value: 'strong'},
                {title: 'Italique', value: 'em'},
                {title: 'Important', value: 'underline'},
              ]
            }
          }]
        },
        {
          name: 'coutUtilisation',
          type: 'array',
          title: 'Coût d\'utilisation',
          description: 'Prix à payer pour utiliser ce système',
          of: [{
            type: 'block',
            styles: [
              {title: 'Paragraphe', value: 'normal'},
              {title: 'Titre niveau 3', value: 'h3'},
            ],
            lists: [
              {title: 'Puces', value: 'bullet'},
              {title: 'Numérotée', value: 'number'}
            ],
            marks: {
              decorators: [
                {title: 'Gras', value: 'strong'},
                {title: 'Italique', value: 'em'},
                {title: 'Important', value: 'underline'},
              ]
            }
          }]
        },
        {
          name: 'dangersRisques',
          type: 'array',
          title: 'Dangers et Risques',
          description: 'Dangers potentiels liés à l\'utilisation',
          of: [{
            type: 'block',
            styles: [
              {title: 'Paragraphe', value: 'normal'},
              {title: 'Titre niveau 3', value: 'h3'},
            ],
            lists: [
              {title: 'Puces', value: 'bullet'},
              {title: 'Numérotée', value: 'number'}
            ],
            marks: {
              decorators: [
                {title: 'Gras', value: 'strong'},
                {title: 'Italique', value: 'em'},
                {title: 'Important', value: 'underline'},
              ]
            }
          }]
        },
        {
          name: 'contremesures',
          type: 'array',
          title: 'Contremesures',
          description: 'Moyens de prévention et protection',
          of: [{
            type: 'block',
            styles: [
              {title: 'Paragraphe', value: 'normal'},
              {title: 'Titre niveau 3', value: 'h3'},
            ],
            lists: [
              {title: 'Puces', value: 'bullet'},
              {title: 'Numérotée', value: 'number'}
            ],
            marks: {
              decorators: [
                {title: 'Gras', value: 'strong'},
                {title: 'Italique', value: 'em'},
                {title: 'Important', value: 'underline'},
              ]
            }
          }]
        }
      ]
    },
    {
      name: 'relations',
      type: 'object',
      title: 'Relations avec d\'autres systèmes',
      fields: [
        {
          name: 'systemesDependants',
          type: 'array',
          title: 'Systèmes dépendants',
          description: 'Systèmes qui dépendent de celui-ci',
          of: [{ type: 'reference', to: [{ type: 'systemeEsoterique' }] }]
        },
        {
          name: 'systemesCompatibles',
          type: 'array',
          title: 'Systèmes compatibles',
          description: 'Systèmes qui peuvent être utilisés en synergie avec celui-ci',
          of: [{ type: 'reference', to: [{ type: 'systemeEsoterique' }] }]
        },
        {
          name: 'systemesAntagonistes',
          type: 'array',
          title: 'Systèmes antagonistes',
          description: 'Systèmes qui s\'opposent naturellement à celui-ci',
          of: [{ type: 'reference', to: [{ type: 'systemeEsoterique' }] }]
        }
      ]
    },
    {
      name: 'evolution',
      type: 'object',
      title: 'Évolution',
      fields: [
        {
          name: 'branchesEmergentes',
          type: 'array',
          title: 'Branches émergentes',
          description: 'Nouveaux systèmes qui émergent de celui-ci',
          of: [{ type: 'reference', to: [{ type: 'systemeEsoterique' }] }]
        }
      ]
    },
    ...visibilityFields
  ],
  preview: {
    select: {
      title: 'nom',
      type: 'type',
      featured: 'featured',
      isPublished: 'isPublished'
    },
    prepare(selection) {
      const { title, type, featured, isPublished } = selection;
      const icons = {
        racine: '🌌',
        derive: '🔮',
        emancipe: '🌿',
        systeme_antagoniste: '⚔️'
      }
      
      const featuredEmoji = featured ? '⭐ ' : '';
      const publishedEmoji = isPublished === false ? '👁️ ' : '';
      
      return {
        title: `${publishedEmoji}${featuredEmoji}${title || 'Sans nom'}`,
        subtitle: type + (isPublished === false ? ' • 🚫 NON PUBLIÉ' : ''),
        media: icons[type]
      }
    }
  },
  orderings: [
    ...visibilityOrderings,
    {
      title: 'Par type de système',
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
    }
  ]
}; 
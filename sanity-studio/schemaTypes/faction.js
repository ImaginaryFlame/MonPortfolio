import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';
import { createRichTextField } from './utils/richTextConfig.js';

const faction = {
  name: 'faction',
  title: '⚔️ Faction',
  type: 'document',
  fields: [
    {
      name: 'nom',
      type: 'string',
      title: 'Nom de la faction'
    },
    {
      name: 'typeOrganisation',
      type: 'string',
      title: '🏛️ Type d\'organisation',
      description: 'Nature de l\'organisation',
      options: {
        list: [
          { title: '👑 État souverain', value: 'etat' },
          { title: '🏰 Royaume/Principauté', value: 'royaume' },
          { title: '🏛️ République', value: 'republique' },
          { title: '⚔️ Empire', value: 'empire' },
          { title: '🤝 Organisation internationale', value: 'organisation_internationale' },
          { title: '🔬 Institution académique', value: 'institution_academique' },
          { title: '⛪ Organisation religieuse', value: 'organisation_religieuse' },
          { title: '💰 Corporation marchande', value: 'corporation' },
          { title: '⚔️ Ordre militaire', value: 'ordre_militaire' },
          { title: '🔮 Organisation mystique', value: 'organisation_mystique' },
          { title: '🎭 Guilde/Association', value: 'guild' },
          { title: '🌍 Coalition régionale', value: 'coalition' },
          { title: '📜 Conseil/Sénat', value: 'conseil' },
          { title: '🛡️ Organisation paramilitaire', value: 'paramilitaire' },
          { title: '🔒 Organisation secrète', value: 'organisation_secrete' },
          { title: '🏥 Institution médicale', value: 'institution_medicale' },
          { title: '🔬 Centre de recherche', value: 'centre_recherche' },
          { title: '🌐 Consortium multinational', value: 'consortium_multinational' },
          { title: '⚖️ Organisation juridique', value: 'organisation_juridique' },
          { title: '🎭 Société secrète', value: 'societe_secrete' }
        ]
      }
    },
    {
      name: 'naturePouvoir',
      type: 'array',
      title: '⚡ Nature du pouvoir',
      description: 'Types d\'influence exercée (plusieurs possibles)',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '👑 Pouvoir politique', value: 'politique' },
          { title: '💰 Pouvoir économique', value: 'economique' },
          { title: '🔬 Pouvoir académique', value: 'academique' },
          { title: '⛪ Pouvoir religieux', value: 'religieux' },
          { title: '⚔️ Pouvoir militaire', value: 'militaire' },
          { title: '🔮 Pouvoir mystique', value: 'mystique' },
          { title: '🎭 Pouvoir culturel', value: 'culturel' },
          { title: '🌍 Pouvoir diplomatique', value: 'diplomatique' },
          { title: '📜 Pouvoir juridique', value: 'juridique' },
          { title: '🔒 Pouvoir secret', value: 'secret' },
          { title: '🏥 Pouvoir médical', value: 'medical' },
          { title: '🔬 Pouvoir scientifique', value: 'scientifique' },
          { title: '🛡️ Pouvoir sécuritaire', value: 'securitaire' },
          { title: '🌐 Pouvoir technologique', value: 'technologique' }
        ]
      }
    },
    {
      name: 'natureGroupement',
      type: 'object',
      title: '🗺️ Nature du groupement',
      description: 'Comment les différentes entités sont liées entre elles',
      fields: [
        {
          name: 'typeGroupement',
          type: 'string',
          title: 'Type de groupement',
          options: {
            list: [
              { 
                title: '🤝 Alliance formelle', 
                value: 'alliance_formelle',
                description: 'Union politique officielle avec des traités et obligations mutuelles'
              },
              { 
                title: '🗺️ Groupement géographique', 
                value: 'groupement_geographique',
                description: 'Royaumes partageant une même région sans nécessairement d\'alliance formelle'
              },
              { 
                title: '🎭 Sphère d\'influence', 
                value: 'sphere_influence',
                description: 'Territoires liés par l\'influence culturelle ou politique d\'une puissance dominante'
              },
              { 
                title: '⛪ Union culturelle', 
                value: 'union_culturelle',
                description: 'Territoires partageant une culture, religion ou histoire commune'
              },
              { 
                title: '💰 Zone économique', 
                value: 'zone_economique',
                description: 'Territoires liés par des échanges commerciaux privilégiés'
              }
            ]
          }
        },
        {
          name: 'relationsMembres',
          type: 'array',
          title: 'Relations entre membres',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: '🤝 Alliés', value: 'allies' },
              { title: '⚔️ Rivaux', value: 'rivaux' },
              { title: '💰 Partenaires commerciaux', value: 'partenaires_commerciaux' },
              { title: '🎭 Relations complexes', value: 'relations_complexes' },
              { title: '❄️ Relations distantes', value: 'relations_distantes' },
              { title: '⚡ En conflit', value: 'en_conflit' }
            ]
          }
        },
        {
          name: 'facteursCohesion',
          type: 'array',
          title: 'Facteurs de cohésion',
          description: 'Ce qui unit ou divise les membres du groupement',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: '🗺️ Proximité géographique', value: 'proximite_geographique' },
              { title: '⛪ Héritage culturel commun', value: 'heritage_culturel' },
              { title: '💰 Intérêts économiques', value: 'interets_economiques' },
              { title: '⚔️ Menace commune', value: 'menace_commune' },
              { title: '👑 Liens dynastiques', value: 'liens_dynastiques' },
              { title: '🎭 Traditions partagées', value: 'traditions_partagees' },
              { title: '🔮 Influences mystiques', value: 'influences_mystiques' }
            ]
          }
        },
        {
          name: 'tensionsInternes',
          type: 'array',
          title: 'Sources de tensions',
          description: 'Facteurs de division ou de conflit entre les membres',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: '⚔️ Rivalités territoriales', value: 'rivalites_territoriales' },
              { title: '💰 Compétition économique', value: 'competition_economique' },
              { title: '👑 Disputes dynastiques', value: 'disputes_dynastiques' },
              { title: '⛪ Différences culturelles', value: 'differences_culturelles' },
              { title: '🎭 Influences extérieures', value: 'influences_exterieures' },
              { title: '⚡ Conflits historiques', value: 'conflits_historiques' }
            ]
          }
        }
      ]
    },
    {
      name: 'caracteristiquesGouvernance',
      type: 'object',
      title: '👑 Caractéristiques de gouvernance',
      description: 'Détails sur le fonctionnement du pouvoir',
      fields: [
        {
          name: 'centralisationPouvoir',
          type: 'string',
          title: 'Niveau de centralisation',
          options: {
            list: [
              { 
                title: '👑 Très centralisé', 
                value: 'tres_centralise',
                description: 'Pouvoir fort concentré au niveau central, décisions majeures prises par l\'autorité suprême'
              },
              { 
                title: '⚖️ Équilibré', 
                value: 'equilibre',
                description: 'Partage des pouvoirs entre centre et régions, avec des domaines réservés pour chacun'
              },
              { 
                title: '🏰 Décentralisé', 
                value: 'decentralise',
                description: 'Large autonomie des membres/régions, le centre coordonne uniquement certains aspects'
              },
              { 
                title: '🤝 Fédéral', 
                value: 'federal',
                description: 'Système à deux niveaux avec répartition claire des compétences entre centre et membres'
              }
            ]
          }
        },
        {
          name: 'priseDecision',
          type: 'string',
          title: 'Prise de décision',
          options: {
            list: [
              { 
                title: '👑 Autoritaire', 
                value: 'autoritaire',
                description: 'Décisions prises par l\'autorité suprême sans consultation obligatoire'
              },
              { 
                title: '🤝 Consensuelle', 
                value: 'consensuelle',
                description: 'Recherche d\'accord entre les différentes parties'
              },
              { 
                title: '⚖️ Majoritaire', 
                value: 'majoritaire',
                description: 'Décisions prises à la majorité des membres ou représentants'
              },
              { 
                title: '📜 Constitutionnelle', 
                value: 'constitutionnelle',
                description: 'Processus formalisé selon des règles établies'
              }
            ]
          }
        },
        {
          name: 'autonomieLocale',
          type: 'array',
          title: 'Domaines d\'autonomie locale',
          description: 'Aspects gérés au niveau local/régional',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: '⚔️ Défense locale', value: 'defense' },
              { title: '💰 Fiscalité', value: 'fiscalite' },
              { title: '⚖️ Justice', value: 'justice' },
              { title: '📜 Lois locales', value: 'lois' },
              { title: '🏛️ Administration', value: 'administration' },
              { title: '🎭 Culture', value: 'culture' },
              { title: '💰 Commerce', value: 'commerce' },
              { title: '⛪ Religion', value: 'religion' }
            ]
          }
        },
        {
          name: 'pouvoirsCentralises',
          type: 'array',
          title: 'Pouvoirs centralisés',
          description: 'Aspects gérés au niveau central',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: '⚔️ Armée centrale', value: 'armee' },
              { title: '🤝 Diplomatie', value: 'diplomatie' },
              { title: '💰 Monnaie', value: 'monnaie' },
              { title: '📜 Lois principales', value: 'lois_principales' },
              { title: '🛡️ Défense commune', value: 'defense_commune' },
              { title: '⚖️ Haute justice', value: 'haute_justice' },
              { title: '🏛️ Administration centrale', value: 'administration_centrale' }
            ]
          }
        }
      ]
    },
    {
      name: 'aspectsSecondaires',
      type: 'array',
      title: 'Aspects secondaires',
      description: 'Autres aspects importants de l\'organisation',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '👑 Aspects féodaux', value: 'feodal' },
          { title: '⛪ Aspects religieux', value: 'religieux' },
          { title: '💰 Aspects commerciaux', value: 'commercial' },
          { title: '🔮 Aspects mystiques', value: 'mystique' },
          { title: '⚔️ Aspects militaires', value: 'militaire' },
          { title: '📚 Aspects académiques', value: 'academique' },
          { title: '🎭 Aspects secrets', value: 'secret' },
          { title: '🤝 Aspects diplomatiques', value: 'diplomatique' },
          { title: '🏛️ Aspects bureaucratiques', value: 'bureaucratique' },
          { title: '⚖️ Aspects judiciaires', value: 'judiciaire' }
        ]
      }
    },
    {
      name: 'structureInterne',
      type: 'string',
      title: 'Structure interne',
      description: 'Type de structure organisationnelle',
      options: {
        list: [
          { title: '👑 Monarchique', value: 'monarchique' },
          { title: '🎭 Oligarchique', value: 'oligarchique' },
          { title: '⚖️ Démocratique', value: 'democratique' },
          { title: '🏛️ Bureaucratique', value: 'bureaucratique' },
          { title: '⛪ Théocratique', value: 'theocratique' },
          { title: '🤝 Collégiale', value: 'collegiale' },
          { title: '⚔️ Militaire', value: 'militaire' },
          { title: '🎭 Cellulaire', value: 'cellulaire' },
          { title: '📚 Académique', value: 'academique' },
          { title: '🔮 Mystique', value: 'mystique' }
        ]
      }
    },
    {
      name: 'description',
      title: 'Description détaillée',
      description: 'Explications sur la structure et le fonctionnement de l\'organisation',
      ...createRichTextField('basic')
    },
    {
      name: 'dynamiquesInternes',
      type: 'object',
      title: '🎭 Dynamiques internes',
      description: 'Relations complexes et évolutives entre les membres',
      fields: [
        {
          name: 'alliancesCirconstance',
          type: 'array',
          title: '🤝 Alliances de circonstance',
          description: 'Alliances motivées par des menaces ou intérêts externes',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'factionsConcernees',
                type: 'array',
                title: 'Factions concernées',
                description: 'Quelles factions sont impliquées dans cette alliance',
                of: [{
                  type: 'reference',
                  to: [{ type: 'faction' }]
                }],
                validation: Rule => Rule.min(2)
              },
              {
                name: 'raisonAlliance',
                type: 'string',
                title: 'Raison de l\'alliance',
                options: {
                  list: [
                    { title: '⚔️ Menace militaire externe', value: 'menace_militaire' },
                    { title: '🌊 Menace naturelle', value: 'menace_naturelle' },
                    { title: '🔮 Menace mystique', value: 'menace_mystique' },
                    { title: '💰 Pression économique', value: 'pression_economique' },
                    { title: '🎭 Influence culturelle étrangère', value: 'influence_etrangere' },
                    { title: '👑 Équilibre des pouvoirs', value: 'equilibre_pouvoirs' }
                  ]
                }
              },
              {
                name: 'stabiliteAlliance',
                type: 'string',
                title: 'Stabilité de l\'alliance',
                options: {
                  list: [
                    { title: '⚖️ Stable mais fragile', value: 'stable_fragile' },
                    { title: '⚡ Tendue', value: 'tendue' },
                    { title: '🌋 Instable', value: 'instable' },
                    { title: '🎭 Façade diplomatique', value: 'facade' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'rivalitesInternes',
          type: 'array',
          title: '⚔️ Rivalités persistantes',
          description: 'Tensions historiques ou structurelles entre membres',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'factionsConcernees',
                type: 'array',
                title: 'Factions rivales',
                description: 'Quelles factions sont en rivalité',
                of: [{
                  type: 'reference',
                  to: [{ type: 'faction' }]
                }],
                validation: Rule => Rule.min(2)
              },
              {
                name: 'typeRivalite',
                type: 'string',
                title: 'Nature de la rivalité',
                options: {
                  list: [
                    { title: '👑 Rivalité dynastique', value: 'dynastique' },
                    { title: '🏰 Dispute territoriale', value: 'territoriale' },
                    { title: '💰 Compétition économique', value: 'economique' },
                    { title: '⚔️ Conflit militaire latent', value: 'militaire' },
                    { title: '🎭 Influence culturelle', value: 'culturelle' },
                    { title: '⛪ Différences religieuses', value: 'religieuse' },
                    { title: '🔮 Pouvoir mystique', value: 'mystique' }
                  ]
                }
              },
              {
                name: 'intensite',
                type: 'string',
                title: 'Intensité',
                options: {
                  list: [
                    { title: '💭 Tension diplomatique', value: 'diplomatique' },
                    { title: '⚡ Conflit ouvert', value: 'ouvert' },
                    { title: '🎭 Guerre froide', value: 'guerre_froide' },
                    { title: '🗡️ Escarmouches régulières', value: 'escarmouches' },
                    { title: '🤫 Sabotage mutuel', value: 'sabotage' }
                  ]
                }
              },
              {
                name: 'impact',
                type: 'string',
                title: 'Impact sur l\'unité',
                options: {
                  list: [
                    { title: '🌱 Faible', value: 'faible' },
                    { title: '⚡ Modéré', value: 'modere' },
                    { title: '🔥 Significatif', value: 'significatif' },
                    { title: '💥 Critique', value: 'critique' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'equilibreInterne',
          type: 'object',
          title: '⚖️ Équilibre des pouvoirs',
          fields: [
            {
              name: 'mecanismes',
              type: 'array',
              title: 'Mécanismes de stabilisation',
              of: [{ type: 'string' }],
              options: {
                list: [
                  { title: '📜 Traités formels', value: 'traites' },
                  { title: '💰 Interdépendance économique', value: 'economique' },
                  { title: '👑 Mariages politiques', value: 'mariages' },
                  { title: '⚔️ Menace commune', value: 'menace_commune' },
                  { title: '🤝 Médiation neutre', value: 'mediation' },
                  { title: '⛪ Influence religieuse', value: 'religieux' },
                  { title: '🎭 Diplomatie secrète', value: 'diplomatie_secrete' }
                ]
              }
            },
            {
              name: 'facteursCohesion',
              type: 'array',
              title: 'Facteurs de cohésion',
              of: [{ type: 'string' }],
              options: {
                list: [
                  { title: '⚔️ Défense mutuelle', value: 'defense' },
                  { title: '💰 Prospérité commune', value: 'prosperite' },
                  { title: '🌍 Identité régionale', value: 'identite' },
                  { title: '🤝 Traditions partagées', value: 'traditions' },
                  { title: '👑 Liens dynastiques', value: 'dynastie' },
                  { title: '⛪ Foi commune', value: 'foi' }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      name: 'relationsExternes',
      type: 'object',
      title: '🌍 Relations externes',
      description: 'Relations avec d\'autres factions (optionnelles)',
      fields: [
        {
          name: 'alliances',
          type: 'array',
          title: '🤝 Alliances',
          description: 'Alliances formelles ou informelles',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'factionsConcernees',
                type: 'array',
                title: 'Factions alliées',
                description: 'Quelles factions sont impliquées dans cette alliance',
                of: [{
                  type: 'reference',
                  to: [{ type: 'faction' }]
                }],
                validation: Rule => Rule.min(2)
              },
              {
                name: 'typeAlliance',
                type: 'string',
                title: 'Type d\'alliance',
                options: {
                  list: [
                    { title: '📜 Alliance formelle', value: 'formelle' },
                    { title: '🤝 Accord informel', value: 'informel' },
                    { title: '⚔️ Pacte militaire', value: 'militaire' },
                    { title: '💰 Accord commercial', value: 'commercial' },
                    { title: '🔬 Collaboration académique', value: 'academique' },
                    { title: '⛪ Alliance religieuse', value: 'religieuse' }
                  ]
                }
              },
              {
                name: 'raisonAlliance',
                type: 'string',
                title: 'Raison de l\'alliance',
                options: {
                  list: [
                    { title: '⚔️ Menace militaire externe', value: 'menace_militaire' },
                    { title: '🌊 Menace naturelle', value: 'menace_naturelle' },
                    { title: '🔮 Menace mystique', value: 'menace_mystique' },
                    { title: '💰 Pression économique', value: 'pression_economique' },
                    { title: '🎭 Influence culturelle étrangère', value: 'influence_etrangere' },
                    { title: '👑 Équilibre des pouvoirs', value: 'equilibre_pouvoirs' },
                    { title: '🔬 Recherche commune', value: 'recherche' },
                    { title: '🌍 Intérêts partagés', value: 'interets_partages' }
                  ]
                }
              },
              {
                name: 'stabiliteAlliance',
                type: 'string',
                title: 'Stabilité de l\'alliance',
                options: {
                  list: [
                    { title: '⚖️ Stable mais fragile', value: 'stable_fragile' },
                    { title: '⚡ Tendue', value: 'tendue' },
                    { title: '🌋 Instable', value: 'instable' },
                    { title: '🎭 Façade diplomatique', value: 'facade' },
                    { title: '✅ Solide', value: 'solide' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'rivalites',
          type: 'array',
          title: '⚔️ Rivalités',
          description: 'Rivalités avec d\'autres factions (optionnelles)',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'factionsConcernees',
                type: 'array',
                title: 'Factions rivales',
                description: 'Quelles factions sont en rivalité',
                of: [{
                  type: 'reference',
                  to: [{ type: 'faction' }]
                }],
                validation: Rule => Rule.min(2)
              },
              {
                name: 'typeRivalite',
                type: 'string',
                title: 'Nature de la rivalité',
                options: {
                  list: [
                    { title: '👑 Rivalité dynastique', value: 'dynastique' },
                    { title: '🏰 Dispute territoriale', value: 'territoriale' },
                    { title: '💰 Compétition économique', value: 'economique' },
                    { title: '⚔️ Conflit militaire latent', value: 'militaire' },
                    { title: '🎭 Influence culturelle', value: 'culturelle' },
                    { title: '⛪ Différences religieuses', value: 'religieuse' },
                    { title: '🔮 Pouvoir mystique', value: 'mystique' },
                    { title: '🔬 Compétition académique', value: 'academique' },
                    { title: '🌍 Influence diplomatique', value: 'diplomatique' }
                  ]
                }
              },
              {
                name: 'intensite',
                type: 'string',
                title: 'Intensité',
                options: {
                  list: [
                    { title: '💭 Tension diplomatique', value: 'diplomatique' },
                    { title: '⚡ Conflit ouvert', value: 'ouvert' },
                    { title: '🎭 Guerre froide', value: 'guerre_froide' },
                    { title: '🗡️ Escarmouches régulières', value: 'escarmouches' },
                    { title: '🤫 Sabotage mutuel', value: 'sabotage' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'relationsNeutres',
          type: 'array',
          title: '🤝 Relations neutres',
          description: 'Relations diplomatiques ou commerciales neutres',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'factionsConcernees',
                type: 'array',
                title: 'Factions concernées',
                of: [{
                  type: 'reference',
                  to: [{ type: 'faction' }]
                }],
                validation: Rule => Rule.min(2)
              },
              {
                name: 'typeRelation',
                type: 'string',
                title: 'Type de relation',
                options: {
                  list: [
                    { title: '🤝 Relations diplomatiques', value: 'diplomatique' },
                    { title: '💰 Échanges commerciaux', value: 'commercial' },
                    { title: '🔬 Collaboration ponctuelle', value: 'collaboration' },
                    { title: '🌍 Accord de passage', value: 'passage' },
                    { title: '📜 Traité de non-agression', value: 'non_agression' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'relationsVassalite',
      type: 'object',
      title: '👑 Relations de Vassalité',
      description: 'Détails des relations entre suzerain et vassaux',
      fields: [
        {
          name: 'typeLoyaute',
          type: 'string',
          title: 'Nature de la loyauté',
          options: {
            list: [
              { title: '❤️ Loyauté sincère', value: 'sincere' },
              { title: '🎭 Loyauté de façade', value: 'facade' },
              { title: '⚔️ Soumission forcée', value: 'forcee' },
              { title: '💰 Loyauté achetée', value: 'achetee' },
              { title: '📜 Loyauté par traité', value: 'traite' }
            ]
          }
        },
        {
          name: 'tensionsVassalite',
          type: 'array',
          title: '⚡ Sources de tension',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'vassal',
                type: 'reference',
                title: 'Vassal',
                to: [{ type: 'faction' }]
              },
              {
                name: 'suzerain',
                type: 'reference',
                title: 'Suzerain',
                to: [{ type: 'faction' }]
              },
              {
                name: 'typeTension',
                type: 'string',
                title: 'Type de tension',
                options: {
                  list: [
                    { title: '💰 Taxes excessives', value: 'taxes' },
                    { title: '⚔️ Obligations militaires', value: 'militaire' },
                    { title: '👑 Ingérence politique', value: 'ingerence' },
                    { title: '🏰 Disputes territoriales', value: 'territoire' },
                    { title: '⚖️ Justice injuste', value: 'justice' },
                    { title: '🎭 Mépris culturel', value: 'culture' }
                  ]
                }
              },
              {
                name: 'intensite',
                type: 'string',
                title: 'Intensité',
                options: {
                  list: [
                    { title: '🌱 Légère', value: 'legere' },
                    { title: '⚡ Modérée', value: 'moderee' },
                    { title: '🔥 Forte', value: 'forte' },
                    { title: '💥 Explosive', value: 'explosive' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'aspirationsIndependance',
          type: 'array',
          title: '🗽 Aspirations d\'indépendance',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'vassal',
                type: 'reference',
                title: 'Vassal aspirant à l\'indépendance',
                to: [{ type: 'faction' }]
              },
              {
                name: 'suzerain',
                type: 'reference',
                title: 'Suzerain actuel',
                to: [{ type: 'faction' }]
              },
              {
                name: 'niveau',
                type: 'string',
                title: 'Niveau d\'aspiration',
                options: {
                  list: [
                    { title: '💭 Rêve lointain', value: 'reve' },
                    { title: '📜 Revendication passive', value: 'passive' },
                    { title: '⚡ Résistance active', value: 'active' },
                    { title: '🗡️ Préparation secrète', value: 'preparation' },
                    { title: '⚔️ Rébellion imminente', value: 'imminente' }
                  ]
                }
              },
              {
                name: 'moyens',
                type: 'array',
                title: 'Moyens envisagés',
                of: [{ type: 'string' }],
                options: {
                  list: [
                    { title: '📜 Négociations diplomatiques', value: 'diplomatique' },
                    { title: '💰 Rachat de liberté', value: 'rachat' },
                    { title: '🤝 Recherche d\'alliés', value: 'allies' },
                    { title: '⚔️ Renforcement militaire', value: 'militaire' },
                    { title: '🎭 Subversion interne', value: 'subversion' },
                    { title: '🗡️ Complot', value: 'complot' }
                  ]
                }
              },
              {
                name: 'obstaclesIndependance',
                type: 'array',
                title: 'Obstacles à l\'indépendance',
                of: [{ type: 'string' }],
                options: {
                  list: [
                    { title: '⚔️ Faiblesse militaire', value: 'militaire' },
                    { title: '💰 Dépendance économique', value: 'economique' },
                    { title: '🌍 Position géographique', value: 'geographie' },
                    { title: '👥 Division interne', value: 'division' },
                    { title: '📜 Traités contraignants', value: 'traites' },
                    { title: '🎭 Pressions politiques', value: 'pressions' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              }
            ]
          }]
        },
        {
          name: 'maintienControle',
          type: 'array',
          title: '✊ Moyens de maintien du contrôle',
          description: 'Comment le suzerain maintient son autorité',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'suzerain',
                type: 'reference',
                title: 'Suzerain',
                to: [{ type: 'faction' }]
              },
              {
                name: 'vassal',
                type: 'reference',
                title: 'Vassal contrôlé',
                to: [{ type: 'faction' }]
              },
              {
                name: 'moyens',
                type: 'array',
                title: 'Moyens utilisés',
                of: [{ type: 'string' }],
                options: {
                  list: [
                    { title: '⚔️ Présence militaire', value: 'militaire' },
                    { title: '👥 Otages nobles', value: 'otages' },
                    { title: '💰 Contrôle économique', value: 'economique' },
                    { title: '🎭 Espionnage', value: 'espionnage' },
                    { title: '🤝 Alliances avec nobles locaux', value: 'alliances' },
                    { title: '📜 Serments magiques', value: 'magie' },
                    { title: '⛪ Influence religieuse', value: 'religion' }
                  ]
                }
              },
              {
                name: 'efficacite',
                type: 'string',
                title: 'Efficacité du contrôle',
                options: {
                  list: [
                    { title: '✅ Très efficace', value: 'tres_efficace' },
                    { title: '⚡ Efficace', value: 'efficace' },
                    { title: '⚠️ Fragile', value: 'fragile' },
                    { title: '❌ Inefficace', value: 'inefficace' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'lienExterne',
      type: 'url',
      title: '🔗 Lien externe',
      description: 'Lien vers des références, arbres généalogiques ou ressources externes liées à cette faction',
      validation: Rule => Rule.uri({
        allowRelative: false,
        scheme: ['http', 'https']
      })
    },
    {
      name: 'univers',
      title: '🌍 Univers d\'appartenance',
      description: 'À quel(s) univers narratif(s) appartient cette faction',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'univers',
      type: 'reference',
            title: 'Univers',
      to: [{ type: 'univers' }],
          },
          {
            name: 'statutGeneral',
            type: 'string',
            title: '📊 Statut général dans l\'univers',
            options: {
              list: [
                { title: '🌟 Active et prospère', value: 'active' },
                { title: '📈 En expansion', value: 'expansion' },
                { title: '⚖️ Stable', value: 'stable' },
                { title: '📉 En déclin', value: 'declin' },
                { title: '🌑 Disparue/Inactive', value: 'inactive' },
                { title: '🎭 Secrète', value: 'secrete' }
              ]
            }
          },
          {
            name: 'description',
            type: 'text',
            title: 'Description',
            description: 'Position et influence générale dans cet univers'
          }
        ],
        preview: {
          select: {
            univers: 'univers.nom',
            statut: 'statutGeneral'
          },
          prepare(selection) {
            const statutEmojis = {
              active: '🌟',
              expansion: '📈',
              stable: '⚖️',
              declin: '📉',
              inactive: '🌑',
              secrete: '🎭'
            };
            return {
              title: selection.univers || 'Univers non spécifié',
              subtitle: `${statutEmojis[selection.statut] || ''} ${selection.statut || 'Statut non spécifié'}`
            };
          }
        }
      }]
    },
    {
      name: 'type',
      type: 'string',
      title: 'Type d\'organisation',
      options: {
        list: [
          { title: '👑 Famille royale', value: 'famille_royale' },
          { title: '🏰 Maison noble', value: 'maison_noble' },
          { title: '⚔️ Organisation militaire', value: 'militaire' },
          { title: '🎓 Institution académique', value: 'academique' },
          { title: '⚖️ Institution politique', value: 'politique' },
          { title: '🏛️ Institution religieuse', value: 'religieuse' },
          { title: '🔮 Organisation mystique', value: 'mystique' },
          { title: '🤝 Guilde marchande', value: 'guilde_marchande' },
          { title: '🎭 Société secrète', value: 'societe_secrete' },
          { title: '🔬 Organisation scientifique', value: 'scientifique' },
          { title: '🎨 Organisation artistique', value: 'artistique' },
          { title: '🌿 Groupe tribal', value: 'tribal' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'hierarchie',
      type: 'array',
      title: '👥 Structure hiérarchique',
      description: 'Organisation des rangs et positions dans la faction',
      of: [{ 
        type: 'object',
        fields: [
          {
            name: 'titre',
            type: 'string',
            title: 'Titre du rang'
          },
          {
            name: 'niveau',
            type: 'number',
            title: 'Niveau hiérarchique',
            description: '1 étant le plus haut rang'
          },
          {
            name: 'description',
            type: 'text',
            title: 'Description du rang',
            rows: 2
          },
          {
            name: 'privileges',
      type: 'array',
            title: 'Privilèges associés',
            of: [{ type: 'string' }]
          }
        ]
      }]
    },
    {
      name: 'departements',
      type: 'array',
      title: '🏢 Départements/Divisions',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'nom',
            type: 'string',
            title: 'Nom du département'
          },
          {
            name: 'description',
            type: 'text',
            title: 'Description',
            rows: 2
          },
          {
            name: 'responsable',
            type: 'reference',
            title: 'Responsable',
            to: [{ type: 'personnage' }]
          }
        ]
      }]
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
      name: 'devise',
      type: 'string',
      title: 'Devise'
    },
    {
      name: 'histoire',
          type: 'object',
      title: '📖 Histoire',
          fields: [
            {
          name: 'resume',
          title: 'Résumé',
          description: 'Résumé de l\'histoire de la faction',
          ...createRichTextField('basic')
        },
        {
          name: 'histoireComplete',
          title: 'Histoire complète',
          description: 'Histoire détaillée de la faction',
          ...createRichTextField('medium')
        },
        {
          name: 'evenementsMarquants',
              type: 'array',
          title: '📅 Événements marquants',
          of: [{ type: 'reference', to: [{ type: 'evenement' }] }]
        },
                {
          name: 'periodes',
          type: 'array',
          title: '📅 Périodes historiques',
          of: [{
                  type: 'object',
                  fields: [
                    {
                name: 'nom',
                type: 'string',
                title: 'Nom de la période'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'importance',
                      type: 'string',
                title: 'Importance historique',
                      options: {
                        list: [
                    { title: '🌱 Mineure', value: 'mineure' },
                    { title: '⚡ Significative', value: 'significative' },
                    { title: '🌟 Majeure', value: 'majeure' },
                    { title: '✨ Cruciale', value: 'cruciale' }
                  ]
                }
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'regionsControlees',
      type: 'array',
      title: 'Régions contrôlées',
      of: [
        {
          type: 'reference',
          to: [{type: 'region'}]
        }
      ]
    },
    {
      name: 'ressources',
      type: 'array',
      title: '💰 Ressources et moyens',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'type',
            type: 'string',
            title: 'Type de ressource',
            options: {
              list: [
                { title: '💰 Financière', value: 'financiere' },
                { title: '🏭 Matérielle', value: 'materielle' },
                { title: '👥 Humaine', value: 'humaine' },
                { title: '🔮 Magique', value: 'magique' },
                { title: '📚 Intellectuelle', value: 'intellectuelle' },
                { title: '🤝 Politique', value: 'politique' },
                { title: '⚔️ Militaire', value: 'militaire' }
              ]
            }
          },
          {
            name: 'description',
      type: 'text',
            title: 'Description',
            rows: 2
          },
          {
            name: 'importance',
            type: 'string',
            title: 'Importance',
            options: {
              list: [
                { title: 'Critique', value: 'critique' },
                { title: 'Majeure', value: 'majeure' },
                { title: 'Moyenne', value: 'moyenne' },
                { title: 'Mineure', value: 'mineure' }
              ]
            }
          }
        ]
      }]
    },
    {
      name: 'alliancesMariages',
      type: 'array',
      title: 'Alliances / Mariages',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  {title: 'Mariage', value: 'mariage'},
                  {title: 'Fiançailles', value: 'fiancailles'},
                  {title: 'Alliance', value: 'alliance'},
                  {title: 'Pacte', value: 'pacte'}
                ]
              }
            },
            {
              name: 'factionCible',
              type: 'reference',
              title: 'Faction concernée',
              to: [{type: 'faction'}]
            },
            {
              name: 'personnagesImpliques',
              type: 'array',
              title: 'Personnages impliqués',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'personnage'}]
                }
              ]
            },
            {
              name: 'statut',
              type: 'string',
              title: 'Statut',
              options: {
                list: [
                  {title: 'Actif', value: 'actif'},
                  {title: 'Rompu', value: 'rompu'},
                  {title: 'En négociation', value: 'negociation'},
                  {title: 'Historique', value: 'historique'}
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
      name: 'conflitsRivalites',
      type: 'array',
      title: '⚔️ Conflits et rivalités',
      of: [{
          type: 'object',
          fields: [
            {
            name: 'factionRivale',
              type: 'reference',
            title: 'Faction rivale',
            to: [{ type: 'faction' }]
            },
            {
              name: 'type',
              type: 'string',
            title: 'Type de conflit',
              options: {
                list: [
                { title: 'Guerre ouverte', value: 'guerre' },
                { title: 'Rivalité politique', value: 'politique' },
                { title: 'Conflit économique', value: 'economique' },
                { title: 'Dispute territoriale', value: 'territorial' },
                { title: 'Conflit idéologique', value: 'ideologique' },
                { title: 'Vendetta', value: 'vendetta' }
                ]
              }
            },
            {
            name: 'description',
              type: 'text',
            title: 'Description',
            rows: 3
          },
          {
            name: 'statut',
            type: 'string',
            title: 'Statut',
            options: {
              list: [
                { title: 'En cours', value: 'en_cours' },
                { title: 'Résolu', value: 'resolu' },
                { title: 'En pause', value: 'en_pause' },
                { title: 'Historique', value: 'historique' }
              ]
            }
          }
        ]
      }]
    },
    {
      name: 'relations',
      type: 'object',
      title: '🤝 Relations',
      fields: [
        {
          name: 'allies',
          type: 'array',
          title: '🤝 Factions alliées',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'faction',
                type: 'reference',
                title: 'Faction',
                to: [{ type: 'faction' }]
              },
              {
                name: 'typeAlliance',
                type: 'string',
                title: 'Type d\'alliance',
                options: {
                  list: [
                    { title: '🏛️ Branche officielle', value: 'branche_officielle' },
                    { title: '🎭 Branche secrète', value: 'branche_secrete' },
                    { title: '🤝 Alliance formelle', value: 'alliance_formelle' },
                    { title: '🌱 Alliance informelle', value: 'alliance_informelle' },
                    { title: '📜 Vassalité', value: 'vassalite' },
                    { title: '🎪 Façade', value: 'facade' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Nature de la relation',
                ...createRichTextField('basic')
              },
              {
                name: 'relationHierarchique',
                type: 'string',
                title: 'Relation hiérarchique',
                options: {
                  list: [
                    { title: '👑 Supérieur', value: 'superieur' },
                    { title: '🤝 Égal', value: 'egal' },
                    { title: '🛡️ Subordonné', value: 'subordonne' }
                  ]
                }
              }
            ]
          }]
        },
        {
          name: 'departementsFiltres',
          type: 'array',
          title: '🏢 Départements externes',
          description: 'Départements ou divisions appartenant à d\'autres factions mais liés à celle-ci',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'factionParente',
                type: 'reference',
                title: 'Faction parente',
                to: [{ type: 'faction' }]
              },
              {
                name: 'departement',
                type: 'string',
                title: 'Nom du département'
              },
              {
                name: 'natureRelation',
                type: 'string',
                title: 'Nature de la relation',
                options: {
                  list: [
                    { title: '🎭 Division secrète', value: 'division_secrete' },
                    { title: '🛡️ Division de protection', value: 'division_protection' },
                    { title: '⚔️ Division d\'action', value: 'division_action' },
                    { title: '🔍 Division de renseignement', value: 'division_renseignement' },
                    { title: '📚 Division de recherche', value: 'division_recherche' }
                  ]
                }
              },
              {
                name: 'description',
                title: 'Description de la relation',
                ...createRichTextField('basic')
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'culture',
      type: 'object',
      title: '🎭 Culture',
      fields: [
        {
          name: 'traditionsAncestrales',
          type: 'array',
          title: '📚 Traditions',
          of: [{ type: 'reference', to: [{ type: 'traditionAncestrale' }] }]
        },
        {
          name: 'dogmesReligieux',
          type: 'array',
          title: '🕊️ Croyances',
          of: [{ type: 'reference', to: [{ type: 'dogmeReligieux' }] }]
        },
        {
          name: 'celebrations',
          type: 'array',
          title: '🎉 Célébrations',
          of: [{ type: 'reference', to: [{ type: 'celebrations' }] }]
        }
      ]
    },
    {
      name: 'pouvoir',
      type: 'object',
      title: '✨ Sources de pouvoir',
      fields: [
        {
          name: 'systemesEsoteriques',
          type: 'array',
          title: '🔮 Systèmes ésotériques',
          of: [{ type: 'reference', to: [{ type: 'systemeEsoterique' }] }]
        },
        {
          name: 'artefacts',
          type: 'array',
          title: '🎭 Artefacts importants',
          of: [{ type: 'reference', to: [{ type: 'objet' }] }]
        }
      ]
    },
    {
      name: 'structureOrganisationnelle',
      type: 'object',
      title: '🏰 Structure Organisationnelle',
      description: 'Organisation interne de la faction (sous-factions, branches, royaumes membres...)',
      fields: [
        {
          name: 'typeFaction',
          type: 'string',
          title: '📋 Type de structure',
          options: {
            list: [
              { title: '👑 Union de royaumes', value: 'union_royaumes' },
              { title: '🏰 Fédération', value: 'federation' },
              { title: '⚔️ Alliance militaire', value: 'alliance_militaire' },
              { title: '💰 Union économique', value: 'union_economique' },
              { title: '🎭 Organisation secrète', value: 'organisation_secrete' },
              { title: '🔮 Ordre mystique', value: 'ordre_mystique' }
            ]
          }
        },
        {
          name: 'sousFactions',
          type: 'array',
          title: '🏰 Sous-factions',
          description: 'Royaumes, branches ou sous-groupes composant la faction',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'nom',
                type: 'string',
                title: 'Nom de la sous-faction'
              },
              {
                name: 'description',
                title: 'Description',
                ...createRichTextField('basic')
              },
              {
                name: 'role',
                type: 'string',
                title: '👑 Rôle dans la structure',
                options: {
                  list: [
                    { title: '👑 Royaume principal', value: 'principal' },
                    { title: '⚔️ Royaume majeur', value: 'majeur' },
                    { title: '🛡️ Royaume mineur', value: 'mineur' },
                    { title: '🎭 Membre secret', value: 'secret' },
                    { title: '📜 Membre associé', value: 'associe' }
                  ]
                }
              },
              {
                name: 'statutDansUnivers',
                type: 'object',
                title: '🌍 Statut dans l\'univers',
                description: 'Statut spécifique de cette sous-faction dans l\'univers principal',
                fields: [
                  {
                    name: 'statut',
                    type: 'string',
                    title: 'Statut',
                    options: {
                      list: [
                        { title: '🌟 Active et prospère', value: 'active' },
                        { title: '📈 En expansion', value: 'expansion' },
                        { title: '⚖️ Stable', value: 'stable' },
                        { title: '📉 En déclin', value: 'declin' },
                        { title: '🌑 Disparue/Inactive', value: 'inactive' },
                        { title: '🎭 Secrète', value: 'secrete' }
                      ]
                    }
                  },
                  {
                    name: 'details',
                    title: 'Détails du statut',
                    ...createRichTextField('basic')
                  }
                ]
              },
              {
                name: 'dirigeant',
                type: 'reference',
                title: '👤 Dirigeant',
                to: [{ type: 'personnage' }]
              },
              {
                name: 'relationsInternes',
                type: 'array',
                title: '🤝 Relations avec autres sous-factions',
                of: [{
                  type: 'object',
                  fields: [
                    {
                      name: 'sousFactionCible',
                      type: 'string',
                      title: 'Sous-faction concernée',
                      description: 'Nom de la sous-faction avec laquelle il y a une relation'
                    },
                    {
                      name: 'typeRelation',
                      type: 'string',
                      title: 'Type de relation',
                      options: {
                        list: [
                          { title: '👑 Suzerain de', value: 'suzerain' },
                          { title: '⚔️ Vassal de', value: 'vassal' },
                          { title: '🤝 Alliance avec', value: 'alliance' },
                          { title: '⚡ Rivalité avec', value: 'rivalite' },
                          { title: '💰 Union économique', value: 'union_economique' },
                          { title: '🛡️ Protection mutuelle', value: 'protection' }
                        ]
                      }
                    },
                    {
                      name: 'details',
                      title: 'Détails de la relation',
                      ...createRichTextField('basic')
                    }
                  ]
                }]
              },
              {
                name: 'territoires',
                type: 'array',
                title: '🗺️ Territoires',
                of: [{
                  type: 'reference',
                  to: [{ type: 'region' }]
                }]
              },
              {
                name: 'ressourcesSpecifiques',
                type: 'array',
                title: '💎 Ressources spécifiques',
                of: [{ type: 'string' }],
                options: {
                  list: [
                    { title: '💎 Pierres précieuses', value: 'pierres_precieuses' },
                    { title: '🥇 Or', value: 'or' },
                    { title: '🌿 Ressources naturelles', value: 'ressources_naturelles' },
                    { title: '🏭 Production industrielle', value: 'industrie' },
                    { title: '🔮 Ressources mystiques', value: 'mystique' },
                    { title: '📚 Savoir ancien', value: 'savoir' }
                  ]
                }
              },
              {
                name: 'typeSousFaction',
                type: 'string',
                title: '🏰 Type de sous-faction',
                options: {
                  list: [
                    // Structures féodales
                    { title: '👑 Royaume', value: 'royaume' },
                    { title: '🎭 Principauté', value: 'principaute' },
                    { title: '⚔️ Duché', value: 'duche' },
                    { title: '🛡️ Marquisat', value: 'marquisat' },
                    { title: '🏰 Comté', value: 'comte' },
                    { title: '🗡️ Vicomté', value: 'vicomte' },
                    { title: '🏰 Baronnie', value: 'baronnie' },
                    // Structures religieuses
                    { title: '⛪ Théocratie', value: 'theocratie' },
                    { title: '🕊️ Ordre religieux', value: 'ordre_religieux' },
                    { title: '🏛️ Temple autonome', value: 'temple' },
                    // Structures marchandes
                    { title: '💰 Guilde marchande', value: 'guilde_marchande' },
                    { title: '🏦 Consortium', value: 'consortium' },
                    { title: '🚢 Comptoir commercial', value: 'comptoir' },
                    // Structures mystiques
                    { title: '🔮 Ordre mystique', value: 'ordre_mystique' },
                    { title: '📚 École ésotérique', value: 'ecole_esoterique' },
                    { title: '🎭 Cercle secret', value: 'cercle_secret' },
                    // Structures militaires
                    { title: '⚔️ Ordre militaire', value: 'ordre_militaire' },
                    { title: '🛡️ Garnison autonome', value: 'garnison' },
                    { title: '🏰 Forteresse indépendante', value: 'forteresse' },
                    // Structures tribales/nomades
                    { title: '🏕️ Tribu', value: 'tribu' },
                    { title: '⛺ Clan nomade', value: 'clan_nomade' },
                    { title: '🌿 Peuple sylvestre', value: 'peuple_sylvestre' },
                    // Structures urbaines
                    { title: '🏛️ Cité-État', value: 'cite_etat' },
                    { title: '🏰 Ville franche', value: 'ville_franche' },
                    { title: '🏭 District autonome', value: 'district' },
                    // Autres structures
                    { title: '🎭 Organisation secrète', value: 'organisation_secrete' },
                    { title: '📜 Institution', value: 'institution' },
                    { title: '🤝 Alliance', value: 'alliance' }
                  ]
                }
              },
              {
                name: 'titreNoble',
                type: 'string',
                title: '👑 Titre du dirigeant',
                description: 'Titre officiel du dirigeant de cette sous-faction',
                options: {
                  list: [
                    // Titres féodaux
                    { title: '👑 Roi/Reine', value: 'roi' },
                    { title: '🏰 Prince/Princesse', value: 'prince' },
                    { title: '⚔️ Duc/Duchesse', value: 'duc' },
                    { title: '🛡️ Marquis/Marquise', value: 'marquis' },
                    { title: '🏰 Comte/Comtesse', value: 'comte' },
                    { title: '🗡️ Vicomte/Vicomtesse', value: 'vicomte' },
                    { title: '🏰 Baron/Baronne', value: 'baron' },
                    // Titres religieux
                    { title: '⛪ Grand Prêtre/Grande Prêtresse', value: 'grand_pretre' },
                    { title: '🕊️ Archevêque', value: 'archeveque' },
                    { title: '📿 Hiérophante', value: 'hierophante' },
                    // Titres marchands
                    { title: '🏰 Grand Maître de Guilde', value: 'maitre_guilde' },
                    { title: '🏦 Consul Commercial', value: 'consul' },
                    { title: '🚢 Maître des Comptoirs', value: 'maitre_comptoir' },
                    // Titres mystiques
                    { title: '🔮 Archimage', value: 'archimage' },
                    { title: '📚 Sage Suprême', value: 'sage' },
                    { title: '🎭 Maître des Secrets', value: 'maitre_secrets' },
                    // Titres militaires
                    { title: '⚔️ Grand Commandeur', value: 'commandeur' },
                    { title: '🛡️ Général Souverain', value: 'general' },
                    { title: '🏰 Castellan', value: 'castellan' },
                    // Titres tribaux
                    { title: '🏕️ Chef Tribal', value: 'chef_tribal' },
                    { title: '⛺ Khan/Khane', value: 'khan' },
                    { title: '🌿 Ancien/Ancienne', value: 'ancien' },
                    // Autres titres
                    { title: '🏛️ Archonte', value: 'archonte' },
                    { title: '📜 Chancelier/Chancelière', value: 'chancelier' },
                    { title: '🤝 Consul', value: 'consul' }
                  ]
                }
              }
            ],
            preview: {
              select: {
                nom: 'nom',
                type: 'typeSousFaction',
                titre: 'titreNoble',
                role: 'role',
                statut: 'statutDansUnivers.statut',
                relationsCount: 'relationsInternes.length'
              },
              prepare(selection) {
                const typeEmojis = {
                  royaume: '👑',
                  principaute: '🎭',
                  duche: '⚔️',
                  marquisat: '🛡️',
                  comte: '🏰',
                  vicomte: '🗡️',
                  baronnie: '🏰',
                  theocratie: '⛪',
                  ordre_religieux: '🕊️',
                  temple: '🏛️',
                  guilde_marchande: '💰',
                  consortium: '🏦',
                  comptoir: '🚢',
                  ordre_mystique: '🔮',
                  ecole_esoterique: '📚',
                  cercle_secret: '🎭',
                  ordre_militaire: '⚔️',
                  garnison: '🛡️',
                  forteresse: '🏰',
                  tribu: '🏕️',
                  clan_nomade: '⛺',
                  peuple_sylvestre: '🌿',
                  cite_etat: '🏛️',
                  ville_franche: '🏰',
                  district: '🏭',
                  organisation_secrete: '🎭',
                  institution: '📜',
                  alliance: '🤝'
                };
                const roleEmojis = {
                  principal: '👑',
                  majeur: '⚔️',
                  mineur: '🛡️',
                  secret: '🎭',
                  associe: '📜'
                };
                const statutEmojis = {
                  active: '🌟',
                  expansion: '📈',
                  stable: '⚖️',
                  declin: '📉',
                  inactive: '🌑',
                  secrete: '🎭'
                };
                const typeInfo = selection.type ? `${typeEmojis[selection.type]} ${selection.type}` : '';
                const roleInfo = selection.role ? ` - ${roleEmojis[selection.role]}` : '';
                const statutInfo = selection.statut ? ` ${statutEmojis[selection.statut]}` : '';
                const relationsInfo = selection.relationsCount ? ` - 🤝 ${selection.relationsCount} relations` : '';
                const titreInfo = selection.titre ? ` (${selection.titre})` : '';
                
                return {
                  title: selection.nom,
                  subtitle: `${typeInfo}${titreInfo}${roleInfo}${statutInfo}${relationsInfo}`
                };
              }
            }
          }]
        },
        {
          name: 'hierarchieInterne',
          title: '👑 Hiérarchie interne',
          ...createRichTextField('basic'),
          description: 'Description de la structure hiérarchique et des relations de pouvoir'
        },
        {
          name: 'reglementation',
          title: '📜 Règles et traditions',
          ...createRichTextField('basic'),
          description: 'Lois, coutumes et traditions régissant les relations entre sous-factions'
        }
      ]
    },

    // Champs de visibilité
    ...visibilityFields
  ],
  preview: {
    select: {
      nom: 'nom',
      typeOrganisation: 'typeOrganisation',
      structureInterne: 'structureInterne',
      hierarchie: 'hierarchie'
    },
    prepare(selection) {
      const typeEmojis = {
        etat: '👑',
        royaume: '🏰',
        republique: '🏛️',
        empire: '⚔️',
        organisation_internationale: '🤝',
        institution_academique: '🔬',
        organisation_religieuse: '⛪',
        corporation: '💰',
        ordre_militaire: '⚔️',
        organisation_mystique: '🔮',
        guild: '🎭',
        coalition: '🌍',
        conseil: '📜',
        paramilitaire: '🛡️',
        organisation_secrete: '🔒',
        institution_medicale: '🏥',
        centre_recherche: '🔬',
        consortium_multinational: '🌐',
        organisation_juridique: '⚖️',
        societe_secrete: '🎭'
      };
      const structureEmojis = {
        monarchique: '👑',
        oligarchique: '🎭',
        democratique: '⚖️',
        bureaucratique: '🏛️',
        theocratique: '⛪',
        collegiale: '🤝',
        militaire: '⚔️',
        cellulaire: '🎭',
        academique: '📚',
        mystique: '🔮'
      };
      const hierarchieEmojis = {
        stricte: '👑',
        equilibree: '⚖️',
        souple: '🌿',
        complexe: '🎭',
        consensuelle: '🤝',
        meritocratique: '📚'
      };

      const typeInfo = selection.typeOrganisation ? `${typeEmojis[selection.typeOrganisation]} ${selection.typeOrganisation}` : '';
      const structureInfo = selection.structureInterne ? ` - ${structureEmojis[selection.structureInterne]}` : '';
      const hierarchieInfo = selection.hierarchie ? ` - ${hierarchieEmojis[selection.hierarchie]}` : '';
      
      return {
        title: selection.nom,
        subtitle: `${typeInfo}${structureInfo}${hierarchieInfo}`
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

export default faction
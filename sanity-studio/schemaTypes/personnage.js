import { localizedField, localizedRequiredField, localizedArrayField } from './utils/localization';

export default {
    name: 'personnage',
    title: '📋 Personnages',
    type: 'document',
    fields: [
      // Métadonnées de fiche
      {
        name: 'versionFiche',
        type: 'string',
        title: 'Version de la fiche',
        options: {
          list: [
            { title: 'Version ramifiée (résumé)', value: 'ramifiee' },
            { title: 'Version entière (complète)', value: 'entiere' }
          ]
        },
        initialValue: 'ramifiee'
      },
  
      // Identité (connue/apparente dans le récit actuel)
      localizedRequiredField({
        name: 'nom',
        type: 'string',
        title: 'Nom complet (connu)',
        description: 'Nom et prénom connus dans le récit actuel'
      }),
      localizedField({
        name: 'prenom',
        type: 'string',
        title: 'Prénom (connu)',
        description: 'Prénom utilisé dans le récit actuel'
      }),
      localizedField({
        name: 'nomFamille',
        type: 'string',
        title: 'Nom de famille (connu)',
        description: 'Nom de famille connu dans le récit actuel'
      }),
      localizedArrayField({
        name: 'surnoms',
        type: 'array',
        title: 'Surnoms',
        description: 'Liste des surnoms du personnage',
        of: [{ type: 'string' }]
      }),
      {
        name: 'univers',
        title: 'Univers d\'appartenance',
        type: 'reference',
        to: [{ type: 'univers' }],
        validation: Rule => Rule.required(),
        description: 'L\'univers dans lequel ce personnage évolue.'
      },
      {
        name: 'age',
        type: 'number',
        title: 'Âge (apparent/connu)',
        description: 'Âge connu/apparent dans le récit actuel'
      },
      {
        name: 'dateNaissance',
        type: 'date',
        title: 'Date de naissance (connue)',
        description: 'Date de naissance connue dans le récit actuel'
      },
      {
        name: 'sexe',
        type: 'string',
        title: 'Sexe',
        options: {
          list: [
            { title: 'Masculin', value: 'masculin' },
            { title: 'Féminin', value: 'feminin' },
            { title: 'Non-binaire', value: 'non-binaire' },
            { title: 'Autre', value: 'autre' }
          ]
        }
      },
      {
        name: 'races',
        type: 'array',
        title: 'Races (connues)',
        of: [{ type: 'reference', to: [{ type: 'race' }] }],
        description: 'Races connues dans le récit actuel'
      },
      {
        name: 'regimeAlimentaire',
        type: 'string',
        title: 'Régime alimentaire'
      },
      {
        name: 'origine',
        type: 'reference',
        title: 'Origine (connue)',
        to: [{ type: 'region' }],
        description: 'Origine connue dans le récit actuel'
      },
      {
        name: 'nationalite',
        type: 'string',
        title: 'Nationalité'
      },
      {
        name: 'orientationSexuelle',
        type: 'string',
        title: 'Orientation sexuelle'
      },
      {
        name: 'relationsSimplifiees',
        type: 'array',
        title: 'Relations principales',
        hidden: ({ document }) => document?.versionFiche !== 'ramifiee',
        of: [{
          type: 'object',
          fields: [
            {
              name: 'personnage',
              type: 'reference',
              title: 'Personnage',
              to: [{ type: 'personnage' }],
              validation: Rule => Rule.required()
            },
            {
              name: 'typeRelation',
              type: 'string',
              title: 'Type de relation',
              options: {
                list: [
                  { title: 'Ami(e)', value: 'ami' },
                  { title: 'Meilleur(e) ami(e)', value: 'meilleur_ami' },
                  { title: 'Amour', value: 'amour' },
                  { title: 'Famille', value: 'famille' },
                  { title: 'Rival(e)', value: 'rival' },
                  { title: 'Ennemi(e)', value: 'ennemi' },
                  { title: 'Mentor', value: 'mentor' },
                  { title: 'Élève', value: 'eleve' },
                  { title: 'Allié(e)', value: 'allie' }
                ]
              }
            }
          ]
        }]
      },
      localizedField({
        name: 'positionPolitique',
        type: 'string',
        title: 'Position politique',
        hidden: ({ document }) => document?.versionFiche !== 'ramifiee',
        options: {
          list: [
            { title: 'Extrême gauche', value: 'extreme_gauche' },
            { title: 'Gauche', value: 'gauche' },
            { title: 'Centre gauche', value: 'centre_gauche' },
            { title: 'Centre', value: 'centre' },
            { title: 'Centre droit', value: 'centre_droit' },
            { title: 'Droite', value: 'droite' },
            { title: 'Extrême droite', value: 'extreme_droite' },
            { title: 'Anarchiste', value: 'anarchiste' },
            { title: 'Apolitique', value: 'apolitique' }
          ]
        }
      }),
      localizedField({
        name: 'positionReligieuse',
        type: 'string',
        title: 'Position religieuse',
        hidden: ({ document }) => document?.versionFiche !== 'ramifiee',
        options: {
          list: [
            { title: 'Croyant pratiquant', value: 'croyant_pratiquant' },
            { title: 'Croyant non-pratiquant', value: 'croyant_non_pratiquant' },
            { title: 'Agnostique', value: 'agnostique' },
            { title: 'Athée', value: 'athee' },
            { title: 'Spirituel non-religieux', value: 'spirituel' },
            { title: 'En questionnement', value: 'questionnement' }
          ]
        }
      }),
  
      // Véritable identité (révélations/spoilers) - OPTIONNEL
      {
        name: 'veritableIdentite',
        type: 'object',
        title: '🔍 Véritable identité (optionnel)',
        description: 'Informations révélées au cours de l\'histoire - seulement si le personnage a quelque chose à cacher',
        hidden: ({ document }) => document?.versionFiche !== 'entiere',
        fields: [
          {
            name: 'veritableNom',
            type: 'string',
            title: 'Véritable nom complet',
            description: 'Vrai nom et prénom du personnage'
          },
          {
            name: 'veritablePrenom',
            type: 'string',
            title: 'Véritable prénom'
          },
          {
            name: 'veritableNomFamille',
            type: 'string',
            title: 'Véritable nom de famille'
          },
          {
            name: 'veritableAge',
            type: 'number',
            title: 'Véritable âge',
            description: 'Âge réel du personnage'
          },
          {
            name: 'veritableDateNaissance',
            type: 'date',
            title: 'Véritable date de naissance'
          },
          {
            name: 'veritablesRaces',
            type: 'array',
            title: 'Véritables races',
            of: [{ type: 'reference', to: [{ type: 'race' }] }],
            description: 'Vraies races du personnage'
          },
          {
            name: 'veritableOrigine',
            type: 'reference',
            title: 'Véritable origine',
            to: [{ type: 'region' }],
            description: 'Vraie origine du personnage'
          },
          {
            name: 'spoilerLevel',
            type: 'string',
            title: 'Niveau de spoiler pour ces révélations',
            options: {
              list: [
                { title: 'Aucun spoiler', value: 'none' },
                { title: 'Spoiler léger', value: 'light' },
                { title: 'Spoiler moyen', value: 'medium' },
                { title: 'Spoiler majeur', value: 'major' }
              ]
            },
            initialValue: 'major'
          }
        ]
      },
  
      // Famille (connue dans le récit actuel)
      {
        name: 'famille',
        type: 'object',
        title: 'Famille (connue)',
        description: 'Famille connue dans le récit actuel',
        fields: [
          {
            name: 'mere',
            type: 'reference',
            title: 'Mère (connue)',
            to: [{ type: 'personnage' }]
          },
          {
            name: 'pere',
            type: 'reference',
            title: 'Père (connu)',
            to: [{ type: 'personnage' }]
          },
          {
            name: 'freres',
            type: 'array',
            title: 'Frères (connus)',
            of: [{ type: 'reference', to: [{ type: 'personnage' }] }]
          },
          {
            name: 'soeurs',
            type: 'array',
            title: 'Sœurs (connues)',
            of: [{ type: 'reference', to: [{ type: 'personnage' }] }]
          },
          {
            name: 'autres',
            type: 'array',
            title: 'Autres membres de la famille (connus)',
            of: [{ 
              type: 'object',
              fields: [
                { name: 'nom', type: 'string', title: 'Nom' },
                { name: 'lien', type: 'string', title: 'Lien de parenté' },
                { name: 'personnage', type: 'reference', title: 'Personnage', to: [{ type: 'personnage' }] }
              ]
            }]
          }
        ]
      },
  
      // Véritable famille (révélations)
      {
        name: 'veritableFamille',
        type: 'object',
        title: '🔍 Véritable famille',
        description: 'Vraie famille révélée au cours de l\'histoire',
        hidden: ({ document }) => document?.versionFiche !== 'entiere',
        fields: [
          {
            name: 'veritableMere',
            type: 'reference',
            title: 'Véritable mère',
            to: [{ type: 'personnage' }]
          },
          {
            name: 'veritablePere',
            type: 'reference',
            title: 'Véritable père',
            to: [{ type: 'personnage' }]
          },
          {
            name: 'veritablesFreres',
            type: 'array',
            title: 'Véritables frères',
            of: [{ type: 'reference', to: [{ type: 'personnage' }] }]
          },
          {
            name: 'veritablesSoeurs',
            type: 'array',
            title: 'Véritables sœurs',
            of: [{ type: 'reference', to: [{ type: 'personnage' }] }]
          },
          {
            name: 'veritablesAutres',
            type: 'array',
            title: 'Autres véritables membres de la famille',
            of: [{ 
              type: 'object',
              fields: [
                { name: 'nom', type: 'string', title: 'Nom' },
                { name: 'lien', type: 'string', title: 'Lien de parenté' },
                { name: 'personnage', type: 'reference', title: 'Personnage', to: [{ type: 'personnage' }] }
              ]
            }]
          },
          {
            name: 'spoilerLevel',
            type: 'string',
            title: 'Niveau de spoiler pour ces révélations familiales',
            options: {
              list: [
                { title: 'Aucun spoiler', value: 'none' },
                { title: 'Spoiler léger', value: 'light' },
                { title: 'Spoiler moyen', value: 'medium' },
                { title: 'Spoiler majeur', value: 'major' }
              ]
            },
            initialValue: 'major'
          }
        ]
      },
  
      // Relations interpersonnelles
      {
        name: 'relations',
        type: 'array',
        title: '💝 Relations interpersonnelles',
        hidden: ({ document }) => document?.versionFiche !== 'entiere',
        description: 'Relations avec d\'autres personnages (amitié, amour, rivalité, inimitié, etc.)',
        of: [{ 
          type: 'object',
          fields: [
            {
              name: 'personnage',
              type: 'reference',
              title: 'Personnage concerné',
              to: [{ type: 'personnage' }],
              validation: Rule => Rule.required()
            },
            {
              name: 'typeRelation',
              type: 'string',
              title: 'Type de relation',
              options: {
                list: [
                  { title: 'Amitié', value: 'amitie' },
                  { title: 'Meilleur(e) ami(e)', value: 'meilleur_ami' },
                  { title: 'Amour/Romance', value: 'amour' },
                  { title: 'Couple', value: 'couple' },
                  { title: 'Ex-partenaire', value: 'ex_partenaire' },
                  { title: 'Crush/Béguin', value: 'crush' },
                  { title: 'Rivalité', value: 'rivalite' },
                  { title: 'Ennemi', value: 'ennemi' },
                  { title: 'Ennemi juré', value: 'ennemi_jure' },
                  { title: 'Inimitié', value: 'inimitie' },
                  { title: 'Mentor', value: 'mentor' },
                  { title: 'Élève/Protégé', value: 'eleve' },
                  { title: 'Allié', value: 'allie' },
                  { title: 'Connaissance', value: 'connaissance' },
                  { title: 'Collègue', value: 'collegue' },
                  { title: 'Respect mutuel', value: 'respect' },
                  { title: 'Méfiance', value: 'mefiance' },
                  { title: 'Indifférence', value: 'indifference' },
                  { title: 'Admiration', value: 'admiration' },
                  { title: 'Jalousie', value: 'jalousie' },
                  { title: 'Protection', value: 'protection' },
                  { title: 'Dépendance', value: 'dependance' },
                  { title: 'Manipulation', value: 'manipulation' },
                  { title: 'Autre', value: 'autre' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'typeRelationAutre',
              type: 'string',
              title: 'Préciser le type de relation',
              description: 'Si "Autre" est sélectionné, précisez ici',
              hidden: ({ parent }) => parent?.typeRelation !== 'autre'
            },
            {
              name: 'intensite',
              type: 'number',
              title: 'Intensité de la relation (1-10)',
              description: '1 = très faible, 10 = extrêmement forte',
              validation: Rule => Rule.min(1).max(10)
            },
            {
              name: 'reciproque',
              type: 'boolean',
              title: 'Relation réciproque ?',
              description: 'Est-ce que l\'autre personnage ressent la même chose ?',
              initialValue: true
            },
            {
              name: 'descriptionRelation',
              type: 'text',
              title: 'Description de la relation',
              description: 'Comment cette relation se manifeste-t-elle ?'
            },
            {
              name: 'origineRelation',
              type: 'text',
              title: 'Origine de la relation',
              description: 'Comment cette relation a-t-elle commencé ?'
            },
            {
              name: 'evolutionRelation',
              type: 'array',
              title: 'Évolution de la relation',
              description: 'Comment la relation évolue-t-elle au cours du récit ?',
              of: [{
                type: 'object',
                fields: [
                  {
                    name: 'periode',
                    type: 'string',
                    title: 'Période/Moment',
                    description: 'Quand cette évolution a-t-elle lieu ?'
                  },
                  {
                    name: 'nouveauType',
                    type: 'string',
                    title: 'Nouveau type de relation',
                    options: {
                      list: [
                        { title: 'Amitié', value: 'amitie' },
                        { title: 'Meilleur(e) ami(e)', value: 'meilleur_ami' },
                        { title: 'Amour/Romance', value: 'amour' },
                        { title: 'Couple', value: 'couple' },
                        { title: 'Ex-partenaire', value: 'ex_partenaire' },
                        { title: 'Crush/Béguin', value: 'crush' },
                        { title: 'Rivalité', value: 'rivalite' },
                        { title: 'Ennemi', value: 'ennemi' },
                        { title: 'Ennemi juré', value: 'ennemi_jure' },
                        { title: 'Inimitié', value: 'inimitie' },
                        { title: 'Mentor', value: 'mentor' },
                        { title: 'Élève/Protégé', value: 'eleve' },
                        { title: 'Allié', value: 'allie' },
                        { title: 'Connaissance', value: 'connaissance' },
                        { title: 'Collègue', value: 'collegue' },
                        { title: 'Respect mutuel', value: 'respect' },
                        { title: 'Méfiance', value: 'mefiance' },
                        { title: 'Indifférence', value: 'indifference' },
                        { title: 'Admiration', value: 'admiration' },
                        { title: 'Jalousie', value: 'jalousie' },
                        { title: 'Protection', value: 'protection' },
                        { title: 'Dépendance', value: 'dependance' },
                        { title: 'Manipulation', value: 'manipulation' },
                        { title: 'Réconciliation', value: 'reconciliation' },
                        { title: 'Rupture', value: 'rupture' },
                        { title: 'Trahison', value: 'trahison' },
                        { title: 'Pardon', value: 'pardon' },
                        { title: 'Autre', value: 'autre' }
                      ]
                    }
                  },
                  {
                    name: 'raison',
                    type: 'text',
                    title: 'Raison du changement',
                    description: 'Qu\'est-ce qui a causé ce changement dans la relation ?'
                  },
                  {
                    name: 'spoilerLevel',
                    type: 'string',
                    title: 'Niveau de spoiler',
                    options: {
                      list: [
                        { title: 'Aucun spoiler', value: 'none' },
                        { title: 'Spoiler léger', value: 'light' },
                        { title: 'Spoiler moyen', value: 'medium' },
                        { title: 'Spoiler majeur', value: 'major' }
                      ]
                    },
                    initialValue: 'none'
                  }
                ]
              }]
            },
            {
              name: 'secrets',
              type: 'array',
              title: 'Secrets partagés',
              description: 'Secrets que ces personnages partagent',
              of: [{
                type: 'object',
                fields: [
                  {
                    name: 'secret',
                    type: 'text',
                    title: 'Secret'
                  },
                  {
                    name: 'quiLeSait',
                    type: 'string',
                    title: 'Qui connaît ce secret ?',
                    options: {
                      list: [
                        { title: 'Seulement ce personnage', value: 'personnage_seul' },
                        { title: 'Seulement l\'autre personnage', value: 'autre_seul' },
                        { title: 'Les deux personnages', value: 'les_deux' },
                        { title: 'Partagé avec d\'autres', value: 'avec_autres' }
                      ]
                    }
                  },
                  {
                    name: 'spoilerLevel',
                    type: 'string',
                    title: 'Niveau de spoiler',
                    options: {
                      list: [
                        { title: 'Aucun spoiler', value: 'none' },
                        { title: 'Spoiler léger', value: 'light' },
                        { title: 'Spoiler moyen', value: 'medium' },
                        { title: 'Spoiler majeur', value: 'major' }
                      ]
                    },
                    initialValue: 'none'
                  }
                ]
              }]
            },
            {
              name: 'conflits',
              type: 'array',
              title: 'Conflits/Tensions',
              description: 'Points de tension ou conflits dans cette relation',
              of: [{
                type: 'object',
                fields: [
                  {
                    name: 'conflit',
                    type: 'text',
                    title: 'Nature du conflit'
                  },
                  {
                    name: 'resolu',
                    type: 'boolean',
                    title: 'Conflit résolu ?',
                    initialValue: false
                  },
                  {
                    name: 'resolution',
                    type: 'text',
                    title: 'Comment le conflit a été résolu',
                    hidden: ({ parent }) => !parent?.resolu
                  },
                  {
                    name: 'spoilerLevel',
                    type: 'string',
                    title: 'Niveau de spoiler',
                    options: {
                      list: [
                        { title: 'Aucun spoiler', value: 'none' },
                        { title: 'Spoiler léger', value: 'light' },
                        { title: 'Spoiler moyen', value: 'medium' },
                        { title: 'Spoiler majeur', value: 'major' }
                      ]
                    },
                    initialValue: 'none'
                  }
                ]
              }]
            },
            {
              name: 'spoilerLevel',
              type: 'string',
              title: 'Niveau de spoiler pour cette relation',
              options: {
                list: [
                  { title: 'Aucun spoiler', value: 'none' },
                  { title: 'Spoiler léger', value: 'light' },
                  { title: 'Spoiler moyen', value: 'medium' },
                  { title: 'Spoiler majeur', value: 'major' }
                ]
              },
              initialValue: 'none'
            }
          ]
        }]
      },
  
      // Personnalité et Histoire
      {
        name: 'resumePersonnalite',
        type: 'text',
        title: 'Résumé de personnalité',
        description: 'Description courte de la personnalité du personnage'
      },
      {
        name: 'personnaliteComplete',
        type: 'text',
        title: 'Personnalité complète',
        description: 'Description détaillée de la personnalité',
        hidden: ({ document }) => document?.versionFiche !== 'entiere'
      },
      {
        name: 'histoire',
        type: 'object',
        title: 'Histoire',
        fields: [
          {
            name: 'ageDebut',
            type: 'number',
            title: 'Âge au début de l\'histoire',
            description: 'Âge du personnage quand son histoire commence'
          },
          {
            name: 'ageFin',
            type: 'number',
            title: 'Âge de fin d\'histoire / mort',
            description: 'Âge actuel, à la fin de l\'histoire ou au moment de sa mort'
          },
          {
            name: 'statut',
            type: 'string',
            title: 'Statut du personnage',
            options: {
              list: [
                { title: 'Vivant', value: 'vivant' },
                { title: 'Décédé', value: 'decede' },
                { title: 'Disparu', value: 'disparu' },
                { title: 'Inconnu', value: 'inconnu' }
              ]
            },
            initialValue: 'vivant'
          },
          {
            name: 'histoireResume',
            type: 'text',
            title: 'Histoire (résumé)',
            description: 'Version courte de l\'histoire du personnage'
          },
          {
            name: 'histoireComplete',
            type: 'text',
            title: 'Histoire complète',
            description: 'Version détaillée de l\'histoire du personnage',
            hidden: ({ document }) => document?.versionFiche !== 'entiere'
          },
          {
            name: 'spoilerLevel',
            type: 'string',
            title: 'Niveau de spoiler',
            options: {
              list: [
                { title: 'Aucun spoiler', value: 'none' },
                { title: 'Spoiler léger', value: 'light' },
                { title: 'Spoiler moyen', value: 'medium' },
                { title: 'Spoiler majeur', value: 'major' }
              ]
            },
            initialValue: 'none'
          }
        ]
      },
  
      // Équipement
      {
        name: 'equipement',
        type: 'array',
        title: 'Équipement',
        of: [
          {
            type: 'reference',
            to: [{type: 'objet'}]
          }
        ]
      },
  
      // Pouvoirs et Capacités
      {
        name: 'pouvoirs',
        type: 'object',
        title: 'Pouvoirs et Capacités',
        fields: [
          {
            name: 'pouvoirsBase',
            type: 'array',
            title: 'Pouvoirs de base / de race',
            of: [{ 
              type: 'object',
              fields: [
                { name: 'nom', type: 'string', title: 'Nom du pouvoir' },
                { name: 'description', type: 'text', title: 'Description' },
                { name: 'origine', type: 'string', title: 'Origine (race, inné, etc.)' }
              ]
            }]
          },
          {
            name: 'capacitesAcquises',
            type: 'array',
            title: 'Capacités acquises',
            of: [{ 
              type: 'object',
              fields: [
                { name: 'nom', type: 'string', title: 'Nom de la capacité' },
                { name: 'description', type: 'text', title: 'Description' },
                { name: 'commentAcquise', type: 'string', title: 'Comment acquise' }
              ]
            }]
          },
          {
            name: 'pouvoirsPretes',
            type: 'array',
            title: 'Pouvoirs prêtés ou empruntés',
            of: [{ 
              type: 'object',
              fields: [
                { name: 'nom', type: 'string', title: 'Nom du pouvoir' },
                { name: 'description', type: 'text', title: 'Description' },
                { name: 'source', type: 'string', title: 'Source (qui/quoi le prête)' },
                { name: 'duree', type: 'string', title: 'Durée/Conditions' }
              ]
            }]
          },
          {
            name: 'transformations',
            type: 'array',
            title: 'Transformations',
            of: [{ 
              type: 'object',
              fields: [
                { name: 'nom', type: 'string', title: 'Nom de la transformation' },
                { name: 'description', type: 'text', title: 'Description' },
                { name: 'conditions', type: 'string', title: 'Conditions de déclenchement' },
                { name: 'effets', type: 'text', title: 'Effets et changements' },
                { 
                  name: 'spoilerLevel',
                  type: 'string',
                  title: 'Niveau de spoiler',
                  options: {
                    list: [
                      { title: 'Aucun spoiler', value: 'none' },
                      { title: 'Spoiler léger', value: 'light' },
                      { title: 'Spoiler moyen', value: 'medium' },
                      { title: 'Spoiler majeur', value: 'major' }
                    ]
                  },
                  initialValue: 'none'
                }
              ]
            }]
          },
          {
            name: 'limites',
            type: 'text',
            title: 'Limites générales'
          }
        ]
      },
  
      // Combat et Techniques
      {
        name: 'techniques',
        type: 'array',
        title: 'Techniques et attaques',
        of: [{ 
          type: 'object',
          fields: [
            { name: 'nom', type: 'string', title: 'Nom de la technique' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'puissance', type: 'number', title: 'Niveau de puissance (1-10)' },
            { 
              name: 'amplificateurs',
              type: 'array',
              title: 'Amplificateurs utilisés',
              of: [
                { 
                  type: 'object',
                  fields: [
                    { 
                      name: 'type',
                      type: 'string',
                      title: 'Type d\'amplificateur',
                      options: {
                        list: [
                          { title: 'Objet', value: 'objet' },
                          { title: 'Technique', value: 'technique' }
                        ]
                      }
                    },
                    { 
                      name: 'objet',
                      type: 'reference',
                      title: 'Objet amplificateur',
                      to: [{type: 'objet'}],
                      hidden: ({ parent }) => parent?.type !== 'objet'
                    },
                    { 
                      name: 'technique',
                      type: 'string',
                      title: 'Technique amplificatrice',
                      hidden: ({ parent }) => parent?.type !== 'technique'
                    },
                    { 
                      name: 'effet',
                      type: 'text',
                      title: 'Effet de l\'amplification'
                    }
                  ]
                }
              ],
              description: 'Objets ou techniques qui amplifient cette technique'
            },
            { 
              name: 'spoilerLevel',
              type: 'string',
              title: 'Niveau de spoiler',
              options: {
                list: [
                  { title: 'Aucun spoiler', value: 'none' },
                  { title: 'Spoiler léger', value: 'light' },
                  { title: 'Spoiler moyen', value: 'medium' },
                  { title: 'Spoiler majeur', value: 'major' }
                ]
              },
              initialValue: 'none'
            }
          ]
        }]
      },
  
      // Affiliations et Objectifs
      {
        name: 'appartenances',
        type: 'array',
        title: 'Appartenances',
        of: [{ 
          type: 'object',
          fields: [
            { name: 'faction', type: 'reference', title: 'Faction', to: [{ type: 'faction' }] },
            { name: 'role', type: 'string', title: 'Rôle dans la faction' },
            { name: 'statut', type: 'string', title: 'Statut (actif, ancien, renégat, etc.)' }
          ]
        }]
      },
      {
        name: 'passions',
        type: 'array',
        title: 'Passions',
        of: [{ type: 'string' }]
      },
      {
        name: 'objectifs',
        type: 'array',
        title: 'Objectifs',
        of: [{ 
          type: 'object',
          fields: [
            { name: 'objectif', type: 'string', title: 'Objectif' },
            { name: 'description', type: 'text', title: 'Description détaillée' },
            { name: 'priorite', type: 'string', title: 'Priorité', options: {
              list: [
                { title: 'Faible', value: 'faible' },
                { title: 'Moyenne', value: 'moyenne' },
                { title: 'Élevée', value: 'elevee' },
                { title: 'Critique', value: 'critique' }
              ]
            }},
            { name: 'progres', type: 'string', title: 'Statut/Progrès' },
            { 
              name: 'spoilerLevel',
              type: 'string',
              title: 'Niveau de spoiler',
              options: {
                list: [
                  { title: 'Aucun spoiler', value: 'none' },
                  { title: 'Spoiler léger', value: 'light' },
                  { title: 'Spoiler moyen', value: 'medium' },
                  { title: 'Spoiler majeur', value: 'major' }
                ]
              },
              initialValue: 'none'
            }
          ]
        }]
      },
  
      // Apparence
      localizedField({
        name: 'apparence',
        type: 'text',
        title: 'Apparence physique',
        description: 'Description physique détaillée'
      }),
      {
        name: 'image',
        type: 'image',
        title: 'Image du personnage',
        options: {
          hotspot: true
        }
      },
  
      // Métadonnées globales
      {
        name: 'spoilerLevel',
        type: 'string',
        title: 'Niveau de spoiler global',
        options: {
          list: [
            { title: 'Aucun spoiler', value: 'none' },
            { title: 'Spoiler léger', value: 'light' },
            { title: 'Spoiler moyen', value: 'medium' },
            { title: 'Spoiler majeur', value: 'major' }
          ]
        },
        initialValue: 'none',
        description: 'Niveau de spoiler général pour ce personnage'
      },
  
      // Version détaillée des opinions politiques (pour la fiche complète)
      {
        name: 'opinionsPolitiques',
        type: 'array',
        title: 'Opinions politiques (évolution)',
        hidden: ({ document }) => document?.versionFiche !== 'entiere',
        description: 'Évolution des opinions et engagements politiques au fil du récit',
        of: [{
          type: 'object',
          fields: [
            {
              name: 'periode',
              type: 'string',
              title: 'Période/Moment',
              description: 'À quel moment du récit cette opinion est-elle valable ?'
            },
            {
              name: 'ideologiePolitique',
              type: 'text',
              title: 'Idéologie politique',
              description: 'Description détaillée de l\'idéologie politique'
            },
            {
              name: 'engagements',
              type: 'array',
              title: 'Engagements politiques',
              description: 'Organisations, partis, mouvements auxquels le personnage adhère',
              of: [{ type: 'string' }]
            },
            {
              name: 'positionsSpecifiques',
              type: 'array',
              title: 'Positions spécifiques',
              description: 'Positions sur des sujets politiques précis',
              of: [{
                type: 'object',
                fields: [
                  { name: 'sujet', type: 'string', title: 'Sujet politique' },
                  { name: 'position', type: 'text', title: 'Position du personnage' }
                ]
              }]
            },
            {
              name: 'raisonChangement',
              type: 'text',
              title: 'Raison du changement',
              description: 'Qu\'est-ce qui a causé ce changement d\'opinion politique ?'
            }
          ]
        }]
      },
  
      // Version détaillée des opinions religieuses (pour la fiche complète)
      {
        name: 'opinionsReligieuses',
        type: 'array',
        title: 'Opinions religieuses (évolution)',
        hidden: ({ document }) => document?.versionFiche !== 'entiere',
        description: 'Évolution des croyances et pratiques religieuses au fil du récit',
        of: [{
          type: 'object',
          fields: [
            {
              name: 'periode',
              type: 'string',
              title: 'Période/Moment',
              description: 'À quel moment du récit cette opinion est-elle valable ?'
            },
            {
              name: 'croyances',
              type: 'text',
              title: 'Croyances',
              description: 'Description détaillée des croyances religieuses'
            },
            {
              name: 'pratiques',
              type: 'array',
              title: 'Pratiques religieuses',
              of: [{ type: 'string' }]
            },
            {
              name: 'raisonChangement',
              type: 'text',
              title: 'Raison du changement',
              description: 'Qu\'est-ce qui a causé ce changement de croyances ?'
            }
          ]
        }]
      }
    ],
    
    preview: {
      select: {
        title: 'nom.fr',
        subtitle: 'prenom.fr',
        media: 'image'
      },
      prepare(selection) {
        const { title, subtitle, media } = selection;
        return {
          title: title || 'Sans nom',
          subtitle: subtitle,
          media: media
        };
      }
    },
  
    orderings: [
      {
        title: 'Nom A-Z',
        name: 'nomAsc',
        by: [{ field: 'nom', direction: 'asc' }]
      },
      {
        title: 'Par version de fiche',
        name: 'version',
        by: [{ field: 'versionFiche', direction: 'asc' }, { field: 'nom', direction: 'asc' }]
      }
    ]
  }
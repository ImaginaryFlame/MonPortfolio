// Imports de localisation supprimés pour simplifier
import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';
import { createRichTextField } from './utils/richTextConfig.js';

export default {
    name: 'personnage',
    title: '👤 Personnage',
    type: 'document',
    fields: [
      // Métadonnées de fiche
      {
        name: 'versionFiche',
        type: 'string',
        title: 'Version de la fiche',
        options: {
          list: [
            { title: 'Version actuelle (résumé)', value: 'actuelle' },
            { title: 'Version entière (complète)', value: 'entiere' }
          ]
        },
        initialValue: 'actuelle'
      },
      {
        name: 'copierElements',
        type: 'array',
        title: '📋 Copier depuis version complète',
        description: 'Sélectionnez les éléments à copier de la version complète vers la version actuelle',
        hidden: ({ document }) => document?.versionFiche !== 'actuelle',
        options: {
          layout: 'grid'
        },
        of: [{
          type: 'string',
          options: {
            list: [
              { title: 'Personnalité complète', value: 'personnaliteComplete' },
              { title: 'Histoire complète', value: 'histoireComplete' },
              { title: 'Âge de fin/mort', value: 'ageFin' },
              { title: 'Relations détaillées', value: 'relationsDetailees' },
              { title: 'Opinions politiques détaillées', value: 'opinionsPolitiquesComplete' },
              { title: 'Opinions religieuses détaillées', value: 'opinionsReligieusesComplete' }
            ]
          }
        }]
      },
  
      // Identité (connue/apparente dans le récit actuel)
      {
        name: 'nom',
        type: 'string',
        title: 'Nom complet (connu)',
        description: 'Nom et prénom connus dans le récit actuel',
        validation: Rule => Rule.required()
      },
      {
        name: 'lienExterne',
        type: 'url',
        title: '🔗 Lien externe',
        description: 'Lien vers un profil, portfolio, réseaux sociaux ou toute ressource externe liée à ce personnage',
        validation: Rule => Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https']
        })
      },
      {
        name: 'prenom',
        type: 'string',
        title: 'Prénom (connu)',
        description: 'Prénom utilisé dans le récit actuel'
      },
      {
        name: 'nomFamille',
        type: 'string',
        title: 'Nom de famille (connu)',
        description: 'Nom de famille connu dans le récit actuel'
      },
      {
        name: 'surnoms',
        type: 'array',
        title: 'Surnoms',
        description: 'Liste des surnoms du personnage',
        of: [{ type: 'string' }]
      },
      {
        name: 'univers',
        title: 'Univers d\'appartenance',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            {
              name: 'univers',
        type: 'reference',
              title: 'Univers',
        to: [{ type: 'univers' }],
              validation: Rule => Rule.required()
            },
            {
              name: 'evolutionRoles',
              type: 'array',
              title: '📈 Évolution des rôles',
              description: 'Comment les rôles du personnage évoluent dans cet univers',
              of: [{
                type: 'object',
                fields: [
                  {
                    name: 'periode',
                    type: 'string',
                    title: 'Période',
                    description: 'À quel moment de l\'histoire ce rôle s\'applique'
                  },
                  {
                    name: 'roleNarratif',
                    type: 'string',
                    title: 'Rôle narratif principal',
                    options: {
                      list: [
                        { title: '👑 Protagoniste', value: 'protagoniste' },
                        { title: '😈 Antagoniste', value: 'antagoniste' },
                        { title: '🤝 Allié principal', value: 'allie_principal' },
                        { title: '🛡️ Mentor', value: 'mentor' },
                        { title: '🎭 Anti-héros', value: 'anti_heros' },
                        { title: '🎪 Comic relief', value: 'comic_relief' },
                        { title: '🔍 Personnage mystérieux', value: 'mysterieux' },
                        { title: '🎯 Rival', value: 'rival' },
                        { title: '💔 Antagoniste tragique', value: 'antagoniste_tragique' },
                        { title: '🌟 Catalyseur', value: 'catalyseur' },
                        { title: '👥 Personnage de soutien', value: 'soutien' },
                        { title: '📜 Narrateur', value: 'narrateur' },
                        { title: '🎬 Caméo', value: 'cameo' }
                      ]
                    }
                  },
                  {
                    name: 'rolesSecondaires',
                    type: 'array',
                    title: 'Rôles secondaires',
                    of: [{
                      type: 'string',
                      options: {
                        list: [
                          { title: '👨‍👩‍👧‍👦 Figure parentale', value: 'figure_parentale' },
                          { title: '🎓 Guide/Enseignant', value: 'guide' },
                          { title: '🛡️ Protecteur', value: 'protecteur' },
                          { title: '🤝 Médiateur', value: 'mediateur' },
                          { title: '🎭 Agent double', value: 'agent_double' },
                          { title: '💡 Conseiller', value: 'conseiller' },
                          { title: '🔧 Support technique', value: 'support_technique' },
                          { title: '🏃 Messager', value: 'messager' },
                          { title: '🎪 Divertissement', value: 'divertissement' },
                          { title: '🔍 Enquêteur', value: 'enqueteur' },
                          { title: '⚔️ Combattant', value: 'combattant' },
                          { title: '🎨 Artiste', value: 'artiste' },
                          { title: '📚 Érudit', value: 'erudit' },
                          { title: '👑 Leader', value: 'leader' },
                          { title: '🌟 Inspiration', value: 'inspiration' }
                        ]
                      }
                    }]
                  },
                  {
                    name: 'raisonChangement',
                    title: 'Raison du changement',
                    description: 'Qu\'est-ce qui a provoqué ce changement de rôle ?',
                    ...createRichTextField('basic')
                  },
                  {
                    name: 'impact',
                    title: 'Impact du changement',
                    description: 'Comment ce changement de rôle affecte le personnage et l\'histoire ?',
                    ...createRichTextField('basic')
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
              name: 'roleInitial',
              type: 'string',
              title: 'Rôle initial',
              description: 'Rôle du personnage au début de son apparition dans cet univers',
              options: {
                list: [
                  { title: '👑 Protagoniste', value: 'protagoniste' },
                  { title: '😈 Antagoniste', value: 'antagoniste' },
                  { title: '🤝 Allié principal', value: 'allie_principal' },
                  { title: '🛡️ Mentor', value: 'mentor' },
                  { title: '🎭 Anti-héros', value: 'anti_heros' },
                  { title: '🎪 Comic relief', value: 'comic_relief' },
                  { title: '🔍 Personnage mystérieux', value: 'mysterieux' },
                  { title: '🎯 Rival', value: 'rival' },
                  { title: '💔 Antagoniste tragique', value: 'antagoniste_tragique' },
                  { title: '🌟 Catalyseur', value: 'catalyseur' },
                  { title: '👥 Personnage de soutien', value: 'soutien' },
                  { title: '📜 Narrateur', value: 'narrateur' },
                  { title: '🎬 Caméo', value: 'cameo' }
                ]
              }
            },
            {
              name: 'variationsUnivers',
              title: 'Variations dans cet univers',
              description: 'Différences notables du personnage dans cet univers (apparence, personnalité, pouvoirs...)',
              ...createRichTextField('basic')
            },
            {
              name: 'statutUnivers',
              type: 'string',
              title: 'Statut dans cet univers',
              options: {
                list: [
                  { title: 'Personnage principal', value: 'principal' },
                  { title: 'Personnage secondaire', value: 'secondaire' },
                  { title: 'Personnage tertiaire', value: 'tertiaire' },
                  { title: 'Caméo/Apparition', value: 'cameo' },
                  { title: 'Mentionné uniquement', value: 'mentionne' }
                ]
              }
            },
            {
              name: 'chronologieUnivers',
              type: 'object',
              title: 'Chronologie dans cet univers',
              fields: [
                {
                  name: 'premiereApparition',
                  type: 'string',
                  title: 'Première apparition',
                  description: 'Moment/chapitre de la première apparition dans cet univers'
                },
                {
                  name: 'derniereApparition',
                  type: 'string',
                  title: 'Dernière apparition',
                  description: 'Moment/chapitre de la dernière apparition dans cet univers'
                }
              ]
            }
          ]
        }],
        validation: Rule => Rule.required().min(1),
        description: 'Le(s) univers dans le(s)quel(s) ce personnage évolue, avec ses spécificités pour chacun.'
      },

      {
        name: 'metiersEtFonctions',
        type: 'array',
        title: '💼 Métiers et Fonctions',
        of: [{ 
          type: 'object',
          fields: [
            {
              name: 'titre',
              type: 'string',
              title: 'Titre/Position',
              description: 'Intitulé du métier ou de la fonction'
            },
            {
              name: 'type',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  { title: '💼 Métier principal', value: 'metier_principal' },
                  { title: '📋 Fonction officielle', value: 'fonction_officielle' },
                  { title: '🌙 Activité secondaire', value: 'activite_secondaire' },
                  { title: '🎭 Couverture', value: 'couverture' },
                  { title: '👑 Titre honorifique', value: 'titre_honorifique' },
                  { title: '🎓 Formation/Études', value: 'formation' }
                ]
              }
            },
            {
              name: 'organisation',
          type: 'reference', 
              title: 'Organisation/Employeur',
              to: [{ type: 'faction' }],
              description: 'Faction, organisation ou groupe employeur'
            },
            {
              name: 'positionDansOrganisation',
              type: 'string',
              title: 'Position hiérarchique',
              options: {
                list: [
                  { title: '👑 Dirigeant', value: 'dirigeant' },
                  { title: '⚜️ Haut gradé', value: 'haut_grade' },
                  { title: '🎖️ Cadre', value: 'cadre' },
                  { title: '👤 Membre régulier', value: 'membre_regulier' },
                  { title: '🌱 Novice/Débutant', value: 'novice' },
                  { title: '🤝 Associé externe', value: 'associe_externe' },
                  { title: '🕵️ Agent secret', value: 'agent_secret' },
                  { title: '📝 Consultant', value: 'consultant' }
                ]
              }
            },
            {
              name: 'departement',
              type: 'string',
              title: 'Département/Division',
              description: 'Sous-groupe ou département spécifique dans l\'organisation'
            },
            {
              name: 'periode',
              type: 'object',
              title: 'Période',
              fields: [
                {
                  name: 'debut',
                  type: 'string',
                  title: 'Début',
                  description: 'Quand a commencé cette activité'
                },
                {
                  name: 'fin',
                  type: 'string',
                  title: 'Fin',
                  description: 'Quand s\'est terminée cette activité (laisser vide si en cours)'
                }
              ]
            },
            {
              name: 'description',
              title: 'Description',
              description: 'Description détaillée des responsabilités et activités',
              ...createRichTextField('basic')
            },
            {
              name: 'competencesRequises',
              type: 'array',
              title: 'Compétences requises',
              of: [{ type: 'string' }],
              description: 'Compétences nécessaires pour ce métier/fonction'
            },
            {
              name: 'impact',
              title: 'Impact sur l\'histoire',
              description: 'Comment ce métier/fonction influence l\'histoire ou le personnage',
              ...createRichTextField('basic')
            },
            {
              name: 'statut',
              type: 'string',
              title: 'Statut',
              options: {
                list: [
                  { title: '✅ En cours', value: 'en_cours' },
                  { title: '🔄 En pause', value: 'en_pause' },
                  { title: '❌ Terminé', value: 'termine' },
                  { title: '🚫 Révoqué', value: 'revoque' },
                  { title: '📝 En formation', value: 'en_formation' }
                ]
              },
              initialValue: 'en_cours'
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
        }],
        description: 'Les différents métiers, fonctions et positions occupées par le personnage'
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
        hidden: ({ document }) => document?.versionFiche !== 'actuelle',
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
      {
        name: 'positionPolitique',
        type: 'string',
        title: 'Position politique',
        hidden: ({ document }) => document?.versionFiche !== 'actuelle',
        options: {
          list: [
            { title: 'Sans opinion politique', value: 'sans_opinion' },
            { title: 'Extrême gauche', value: 'extreme_gauche' },
            { title: 'Gauche', value: 'gauche' },
            { title: 'Centre gauche', value: 'centre_gauche' },
            { title: 'Centre', value: 'centre' },
            { title: 'Centre droit', value: 'centre_droit' },
            { title: 'Droite', value: 'droite' },
            { title: 'Extrême droite', value: 'extreme_droite' },
            { title: 'Royaliste/Monarchiste', value: 'royaliste' },
            { title: 'Traditionaliste', value: 'traditionaliste' },
            { title: 'Conservateur', value: 'conservateur' },
            { title: 'Progressiste', value: 'progressiste' },
            { title: 'Réformiste', value: 'reformiste' },
            { title: 'Libertarien', value: 'libertarien' },
            { title: 'Anarchiste', value: 'anarchiste' },
            { title: 'Écologiste', value: 'ecologiste' },
            { title: 'Technocrate', value: 'technocrate' },
            { title: 'Apolitique', value: 'apolitique' }
          ]
        }
      },
      {
        name: 'descriptionPolitique',
        title: 'Description de la pensée politique',
        description: 'Explications sur la vision politique du personnage, son évolution et ses nuances',
        hidden: ({ document }) => document?.versionFiche !== 'actuelle' || document?.positionPolitique === 'sans_opinion',
        ...createRichTextField('basic')
      },
      {
        name: 'positionReligieuse',
        type: 'string',
        title: 'Position religieuse',
        hidden: ({ document }) => document?.versionFiche !== 'actuelle',
        options: {
          list: [
            { title: 'Croyant pratiquant', value: 'croyant_pratiquant' },
            { title: 'Croyant non-pratiquant', value: 'croyant_non_pratiquant' },
            { title: 'Agnostique théiste', value: 'agnostique_theiste' },
            { title: 'Agnostique athée', value: 'agnostique_athee' },
            { title: 'Agnostique strict/pur', value: 'agnostique_strict' },
            { title: 'Athée pragmatique', value: 'athee_pragmatique' },
            { title: 'Athée militant', value: 'athee_militant' },
            { title: 'Athée culturel', value: 'athee_culturel' },
            { title: 'Spirituel non-religieux', value: 'spirituel' },
            { title: 'Déiste', value: 'deiste' },
            { title: 'Panthéiste', value: 'pantheiste' },
            { title: 'Syncrétiste', value: 'syncretiste' },
            { title: 'Indifférent', value: 'indifferent' },
            { title: 'En questionnement', value: 'questionnement' }
          ]
        }
      },
      {
        name: 'descriptionReligieuse',
        title: 'Description de la pensée religieuse/spirituelle',
        description: 'Explications sur la vision spirituelle du personnage, son parcours et ses questionnements',
        hidden: ({ document }) => document?.versionFiche !== 'actuelle' || document?.positionReligieuse === 'indifferent',
        ...createRichTextField('basic')
      },
  
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
        type: 'object',
        title: '👥 Relations',
        fields: [
          {
            name: 'relationsPersonnelles',
        type: 'array',
            title: '🤝 Relations personnelles',
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
                      { title: '❤️ Amour', value: 'amour' },
                      { title: '💑 Couple', value: 'couple' },
                      { title: '👨‍👩‍👧‍👦 Famille', value: 'famille' },
                      { title: '🤝 Amitié', value: 'amitie' },
                      { title: '🤼 Rivalité', value: 'rivalite' },
                      { title: '⚔️ Inimitié', value: 'inimitie' },
                      { title: '🎓 Mentor/Élève', value: 'mentor' },
                      { title: '👑 Hiérarchie', value: 'hierarchie' },
                      { title: '🤔 Complexe', value: 'complexe' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
                  name: 'description',
              title: 'Description de la relation',
                  ...createRichTextField('basic')
                },
                {
                  name: 'evolution',
              type: 'array',
                  title: '📈 Évolution de la relation',
              of: [{
                type: 'object',
                fields: [
                  {
                    name: 'periode',
                    type: 'string',
                        title: 'Période'
                      },
                      {
                        name: 'description',
                        title: 'Description',
                        ...createRichTextField('basic')
                  },
                  {
                    name: 'raison',
                        title: 'Raison de l\'évolution',
                        ...createRichTextField('basic')
                      }
                    ]
                  }]
                }
              ],
              preview: {
                select: {
                  title: 'personnage.nom',
                  subtitle: 'typeRelation',
                  description: 'description'
                },
                prepare(selection) {
                  const relationTypes = {
                    amour: '❤️ Amour',
                    couple: '💑 Couple',
                    famille: '👨‍👩‍👧‍👦 Famille',
                    amitie: '🤝 Amitié',
                    rivalite: '🤼 Rivalité',
                    inimitie: '⚔️ Inimitié',
                    mentor: '🎓 Mentor/Élève',
                    hierarchie: '👑 Hiérarchie',
                    complexe: '🤔 Complexe'
                  };
                  return {
                    title: selection.title || 'Sans nom',
                    subtitle: relationTypes[selection.typeRelation] || selection.typeRelation,
                    description: selection.description
                  };
                }
              }
            }]
          }
        ]
      },
  
      // Personnalité et Histoire
      {
        name: 'resumePersonnalite',
        title: 'Résumé de personnalité',
        description: 'Description courte de la personnalité du personnage',
        ...createRichTextField('basic')
      },
      {
        name: 'personnaliteComplete',
        title: 'Personnalité complète',
        description: 'Description détaillée de la personnalité',
        hidden: ({ document }) => document?.versionFiche !== 'entiere',
        ...createRichTextField('medium')
      },
      {
        name: 'histoire',
        type: 'object',
        title: '📖 Histoire',
        fields: [
          {
            name: 'resume',
            title: 'Résumé',
            description: 'Résumé de l\'histoire du personnage',
            ...createRichTextField('basic')
          },
          {
            name: 'histoireComplete',
            title: 'Histoire complète',
            description: 'Histoire détaillée du personnage',
            hidden: ({ document }) => document?.versionFiche !== 'entiere',
            ...createRichTextField('medium')
          },
          {
            name: 'evenementsMarquants',
            type: 'array',
            title: '📅 Événements marquants',
            of: [{ type: 'reference', to: [{ type: 'evenement' }] }]
          },
          {
            name: 'celebrations',
            type: 'array',
            title: '🎉 Célébrations importantes',
            of: [{ type: 'reference', to: [{ type: 'celebrations' }] }]
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
  
      // Pouvoirs et Capacités (Références vers les fiches détaillées)
      {
        name: 'pouvoirs',
          type: 'object',
        title: '✨ Pouvoirs et capacités',
          fields: [
            {
            name: 'description',
            title: 'Description générale',
              ...createRichTextField('basic')
            },
            {
            name: 'systemesEsoteriques',
            type: 'array',
            title: '🔮 Systèmes ésotériques maîtrisés',
            of: [{ type: 'reference', to: [{ type: 'systemeEsoterique' }] }]
          },
          {
            name: 'pouvoirsActifs',
            type: 'array',
            title: '⚡ Pouvoirs actifs',
            of: [{ type: 'reference', to: [{ type: 'pouvoirTransformation' }] }]
          },
          {
            name: 'evolution',
        type: 'array',
            title: '📈 Évolution des pouvoirs',
        of: [{ 
          type: 'object',
          fields: [
            { 
                  name: 'periode',
              type: 'string',
                  title: 'Période'
                },
                {
                  name: 'description',
                  title: 'Description',
                  ...createRichTextField('basic')
                },
                {
                  name: 'raison',
                  title: 'Raison de l\'évolution',
                  ...createRichTextField('basic')
                }
              ]
            }]
          }
        ]
      },
      {
        name: 'possessions',
          type: 'object',
        title: '🎭 Possessions',
          fields: [
          {
            name: 'objetsImportants',
        type: 'array',
            title: '🎭 Objets significatifs',
            of: [{ type: 'reference', to: [{ type: 'objet' }] }]
          }
        ]
      },
  
      // Champs de visibilité
      ...visibilityFields,
      {
        name: 'affiliations',
          type: 'object',
        title: '👥 Affiliations',
          fields: [
            {
            name: 'faction',
            type: 'reference',
            title: '🏰 Faction principale',
            to: [{ type: 'faction' }]
          },
          {
            name: 'factionsSecondaires',
              type: 'array',
            title: '🏰 Factions secondaires',
            of: [{ type: 'reference', to: [{ type: 'faction' }] }]
            },
            {
            name: 'traditionsAncestrales',
              type: 'array',
            title: '📚 Traditions suivies',
            of: [{ type: 'reference', to: [{ type: 'traditionAncestrale' }] }]
          },
          {
            name: 'dogmesReligieux',
        type: 'array',
            title: '🕊️ Croyances religieuses',
            of: [{ type: 'reference', to: [{ type: 'dogmeReligieux' }] }]
          }
        ]
      }
    ],
    
      preview: {
    select: {
      nom: 'nom',
      prenom: 'prenom',
      media: 'image',
      featured: 'featured',
      isPublished: 'isPublished'
    },
    prepare(selection) {
      const { nom, prenom, media, featured, isPublished } = selection;
      const title = nom || prenom || 'Sans nom';
      
      const featuredEmoji = featured ? '⭐ ' : '';
      const publishedEmoji = isPublished === false ? '👁️ ' : '';
      
      return {
        title: `${publishedEmoji}${featuredEmoji}${title}`,
        subtitle: (prenom && nom !== prenom ? prenom : '') + (isPublished === false ? ' • 🚫 NON PUBLIÉ' : ''),
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
        title: 'Par version de fiche',
        name: 'version',
        by: [{ field: 'versionFiche', direction: 'asc' }, { field: 'nom', direction: 'asc' }]
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
  }
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const Portails = () => {
  const { t } = useLanguage();
  const [activeUniverse, setActiveUniverse] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  // Configuration des univers avec leurs sections wiki
  const universes = [
    {
      id: 'flamme-imaginaire',
      title: 'LE HÉROS À LA FLAMME IMAGINAIRE',
      description: 'Licence transmédia principale - Shōnen, slice of life, aventure psychologique',
      color: '#4F46E5',
      gradient: 'from-indigo-600 to-blue-600',
      image: '/assets/img/F7xrYybWcAEztt2.webp',
      isMainSeries: true,
      status: 'En développement actif',
      sections: [
        {
          id: 'characters',
          title: 'Personnages',
          icon: '👥',
          description: 'Protagonistes, antagonistes et personnages secondaires',
          subcategories: [
            { name: 'Protagonistes', count: 12, color: '#3B82F6' },
            { name: 'Antagonistes', count: 8, color: '#EF4444' },
            { name: 'Personnages Secondaires', count: 24, color: '#F59E0B' },
            { name: 'Figurants', count: 15, color: '#6B7280' }
          ]
        },
        {
          id: 'locations',
          title: 'Régions & Lieux',
          icon: '🗺️',
          description: 'Vesontio, dimensions parallèles et lieux emblématiques',
          subcategories: [
            { name: 'Vesontio (Besançon alternatif)', count: 8, color: '#8B5CF6' },
            { name: 'Dimensions Parallèles', count: 5, color: '#EC4899' },
            { name: 'Lieux Mystiques', count: 12, color: '#10B981' },
            { name: 'Institutions', count: 6, color: '#F97316' }
          ]
        },
        {
          id: 'objects',
          title: 'Objets & Artefacts',
          icon: '⚔️',
          description: 'Objets magiques, technologie et équipements',
          subcategories: [
            { name: 'Armes Légendaires', count: 7, color: '#DC2626' },
            { name: 'Objets Magiques', count: 15, color: '#7C3AED' },
            { name: 'Technologie', count: 9, color: '#059669' },
            { name: 'Reliques', count: 4, color: '#F59E0B' }
          ]
        },
        {
          id: 'concepts',
          title: 'Concepts Métaphysiques',
          icon: '🌌',
          description: 'Pouvoirs, magie et concepts cosmiques',
          subcategories: [
            { name: 'Systèmes de Pouvoirs', count: 8, color: '#3B82F6' },
            { name: 'Magie & Sorcellerie', count: 12, color: '#8B5CF6' },
            { name: 'Forces Cosmiques', count: 6, color: '#EC4899' },
            { name: 'Philosophies', count: 5, color: '#10B981' }
          ]
        },
        {
          id: 'factions',
          title: 'Factions & Organisations',
          icon: '🏛️',
          description: 'Groupes, alliances et institutions',
          subcategories: [
            { name: 'Organisations Héroïques', count: 4, color: '#0EA5E9' },
            { name: 'Factions Antagonistes', count: 6, color: '#EF4444' },
            { name: 'Neutres', count: 8, color: '#6B7280' },
            { name: 'Gouvernements', count: 3, color: '#F97316' }
          ]
        },
        {
          id: 'events',
          title: 'Événements & Chronologie',
          icon: '📅',
          description: 'Histoire, conflits et événements majeurs',
          subcategories: [
            { name: 'Événements Fondateurs', count: 5, color: '#7C3AED' },
            { name: 'Conflits Majeurs', count: 8, color: '#DC2626' },
            { name: 'Découvertes', count: 12, color: '#059669' },
            { name: 'Prophéties', count: 4, color: '#F59E0B' }
          ]
        },
        {
          id: 'creatures',
          title: 'Créatures & Bestiaire',
          icon: '🐉',
          description: 'Créatures fantastiques et entités',
          subcategories: [
            { name: 'Créatures Magiques', count: 18, color: '#8B5CF6' },
            { name: 'Entités Cosmiques', count: 6, color: '#EC4899' },
            { name: 'Êtres Artificiels', count: 7, color: '#059669' },
            { name: 'Démons & Anges', count: 9, color: '#DC2626' }
          ]
        },
        {
          id: 'culture',
          title: 'Culture & Société',
          icon: '🎭',
          description: 'Traditions, célébrations et systèmes sociaux',
          subcategories: [
            { name: 'Traditions Ancestrales', count: 8, color: '#F97316' },
            { name: 'Célébrations', count: 12, color: '#10B981' },
            { name: 'Dogmes Religieux', count: 6, color: '#7C3AED' },
            { name: 'Systèmes Ésotériques', count: 5, color: '#EC4899' }
          ]
        }
      ]
    },
    {
      id: 'heros-fee',
      title: 'LA FABLE DU HÉROS ET LA FÉE',
      description: 'Trilogie fantasy épique - Amitié, rédemption et héroïsme',
      color: '#EC4899',
      gradient: 'from-pink-600 to-rose-600',
      image: '/assets/img/herosfee-banner.webp',
      connectedTo: 'flamme-imaginaire',
      status: 'Romans en cours',
      sections: [
        {
          id: 'characters',
          title: 'Personnages',
          icon: '👥',
          description: 'Le Héros, la Fée et les habitants de Sylvania',
          subcategories: [
            { name: 'Protagonistes', count: 6, color: '#3B82F6' },
            { name: 'Noblesse de Sylvania', count: 12, color: '#F59E0B' },
            { name: 'Habitants des Basfonds', count: 18, color: '#6B7280' },
            { name: 'Créatures Féeriques', count: 15, color: '#EC4899' }
          ]
        },
        {
          id: 'races',
          title: 'Races & Peuples',
          icon: '🧝',
          description: 'Humains, Fées et autres peuples du monde fusionné',
          subcategories: [
            { name: 'Humains', count: 8, color: '#8B5CF6' },
            { name: 'Fées', count: 12, color: '#EC4899' },
            { name: 'Hybrides', count: 6, color: '#10B981' },
            { name: 'Autres Peuples', count: 9, color: '#F97316' }
          ]
        },
        {
          id: 'locations',
          title: 'Régions & Royaumes',
          icon: '🏰',
          description: 'Sylvania, Basfonds et territoires du monde fusionné',
          subcategories: [
            { name: 'Sylvania (Capitale)', count: 5, color: '#F59E0B' },
            { name: 'Les Basfonds', count: 8, color: '#6B7280' },
            { name: 'Territoires Féeriques', count: 10, color: '#EC4899' },
            { name: 'Terres Désolées', count: 6, color: '#DC2626' }
          ]
        },
        {
          id: 'factions',
          title: 'Factions & Maisons',
          icon: '⚔️',
          description: 'Monarchie, tribus et organisations politiques',
          subcategories: [
            { name: 'Monarchie de Sylvania', count: 4, color: '#F59E0B' },
            { name: 'Tribus Féeriques', count: 8, color: '#EC4899' },
            { name: 'Guildes des Basfonds', count: 6, color: '#6B7280' },
            { name: 'Organisations Secrètes', count: 5, color: '#7C3AED' }
          ]
        },
        {
          id: 'history',
          title: 'Histoire & Événements',
          icon: '📜',
          description: 'La Grande Fusion, guerres et événements historiques',
          subcategories: [
            { name: 'La Grande Fusion', count: 3, color: '#8B5CF6' },
            { name: 'Guerres Ancestrales', count: 7, color: '#DC2626' },
            { name: 'Complots Royaux', count: 9, color: '#F59E0B' },
            { name: 'Tournois & Compétitions', count: 5, color: '#10B981' }
          ]
        },
        {
          id: 'bestiary',
          title: 'Bestiaire',
          icon: '🦄',
          description: 'Créatures fantastiques du monde fusionné',
          subcategories: [
            { name: 'Créatures Féeriques', count: 15, color: '#EC4899' },
            { name: 'Bêtes Corrompues', count: 12, color: '#DC2626' },
            { name: 'Gardiens Anciens', count: 6, color: '#7C3AED' },
            { name: 'Familiers', count: 8, color: '#10B981' }
          ]
        }
      ]
    },
    {
      id: 'vince-belii',
      title: 'VINCE DE BELII',
      description: 'Light novel intimiste - Reconstruction personnelle et mystères',
      color: '#8B5CF6',
      gradient: 'from-purple-600 to-violet-600',
      image: '/assets/img/vincebelii-banner.webp',
      status: 'Visual Novel en développement',
      sections: [
        {
          id: 'characters',
          title: 'Personnages',
          icon: '👥',
          description: 'Vince, amis et habitants de Belii',
          subcategories: [
            { name: 'Protagoniste', count: 1, color: '#8B5CF6' },
            { name: 'Nouveaux Amis', count: 8, color: '#10B981' },
            { name: 'Visages du Passé', count: 12, color: '#F59E0B' },
            { name: 'Habitants de Belii', count: 15, color: '#6B7280' }
          ]
        },
        {
          id: 'families',
          title: 'Familles & Lignées',
          icon: '👨‍👩‍👧‍👦',
          description: 'Relations familiales et liens du passé',
          subcategories: [
            { name: 'Famille de Vince', count: 6, color: '#8B5CF6' },
            { name: 'Tante Déameline', count: 3, color: '#EC4899' },
            { name: 'Familles Alliées', count: 4, color: '#10B981' },
            { name: 'Liens Perdus', count: 5, color: '#6B7280' }
          ]
        },
        {
          id: 'locations',
          title: 'Lieux de Belii',
          icon: '🏙️',
          description: 'La ville où la nuit ne finit jamais',
          subcategories: [
            { name: 'Centre-ville', count: 8, color: '#3B82F6' },
            { name: 'Quartiers Résidentiels', count: 10, color: '#10B981' },
            { name: 'Lieux de Mémoire', count: 6, color: '#F59E0B' },
            { name: 'Zones Mystérieuses', count: 4, color: '#7C3AED' }
          ]
        },
        {
          id: 'mysteries',
          title: 'Mystères & Passé',
          icon: '🔍',
          description: 'Secrets enfouis et vérités cachées',
          subcategories: [
            { name: 'Passé de Vince', count: 8, color: '#DC2626' },
            { name: 'Mystères de Belii', count: 6, color: '#7C3AED' },
            { name: 'Liens Oubliés', count: 7, color: '#6B7280' },
            { name: 'Vérités Révélées', count: 5, color: '#10B981' }
          ]
        }
      ]
    },
    {
      id: 'pandemie-lara',
      title: 'LA PANDÉMIE DE LARA',
      description: 'Post-apocalyptique - Survie, identité et résilience humaine',
      color: '#DC2626',
      gradient: 'from-red-600 to-orange-600',
      image: '/assets/img/pandemielara-banner.webp',
      status: 'En développement',
      sections: [
        {
          id: 'characters',
          title: 'Personnages',
          icon: '👥',
          description: 'Lara, survivants et mémoires du passé',
          subcategories: [
            { name: 'Lara (Protagoniste)', count: 1, color: '#DC2626' },
            { name: 'Meilleures Amies', count: 2, color: '#10B981' },
            { name: 'Survivants Actuels', count: 12, color: '#6B7280' },
            { name: 'Mémoires du Passé', count: 8, color: '#F59E0B' }
          ]
        },
        {
          id: 'locations',
          title: 'Régions Post-Apocalyptiques',
          icon: '🏚️',
          description: 'Monde en ruines et zones de survie',
          subcategories: [
            { name: 'Zones Sécurisées', count: 5, color: '#10B981' },
            { name: 'Ruines Urbaines', count: 10, color: '#6B7280' },
            { name: 'Terres Désolées', count: 8, color: '#DC2626' },
            { name: 'Refuges Secrets', count: 6, color: '#7C3AED' }
          ]
        },
        {
          id: 'creatures',
          title: 'Infectés & Créatures',
          icon: '🧟',
          description: 'Zombies et créatures de l\'apocalypse',
          subcategories: [
            { name: 'Zombies Basiques', count: 15, color: '#6B7280' },
            { name: 'Mutants Évolués', count: 8, color: '#DC2626' },
            { name: 'Créatures Rares', count: 5, color: '#7C3AED' },
            { name: 'Survivants Corrompus', count: 6, color: '#F59E0B' }
          ]
        },
        {
          id: 'factions',
          title: 'Groupes de Survivants',
          icon: '⛺',
          description: 'Communautés et factions post-apocalyptiques',
          subcategories: [
            { name: 'Communautés Pacifiques', count: 4, color: '#10B981' },
            { name: 'Groupes Militaires', count: 6, color: '#374151' },
            { name: 'Cultes Apocalyptiques', count: 3, color: '#7C3AED' },
            { name: 'Nomades Solitaires', count: 8, color: '#6B7280' }
          ]
        }
      ]
    }
  ];

  const toggleSection = (universeId, sectionId) => {
    const key = `${universeId}-${sectionId}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isExpanded = (universeId, sectionId) => {
    return expandedSections[`${universeId}-${sectionId}`];
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            PORTAILS DES UNIVERS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Explorez les mondes narratifs de Flame - Personnages, lieux, histoire et mystères de chaque univers organisés comme un wiki professionnel
          </p>
        </div>
      </div>

      {/* Sélecteur d'univers */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {universes.map((universe) => (
              <button
                key={universe.id}
                onClick={() => setActiveUniverse(activeUniverse === universe.id ? null : universe.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 ${
                  activeUniverse === universe.id
                    ? 'text-white shadow-2xl transform scale-105'
                    : 'text-gray-300 hover:text-white border-gray-600 hover:border-gray-500'
                }`}
                style={{
                  backgroundColor: activeUniverse === universe.id ? universe.color : 'transparent',
                  borderColor: activeUniverse === universe.id ? universe.color : '#4B5563',
                  boxShadow: activeUniverse === universe.id ? `0 0 30px ${universe.color}40` : 'none'
                }}
              >
                {universe.title}
                {universe.isMainSeries && (
                  <span className="ml-2 px-2 py-1 bg-yellow-500 text-yellow-900 text-xs rounded-full font-bold">
                    SÉRIE PRINCIPALE
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu des univers */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {activeUniverse ? (
          universes
            .filter(universe => universe.id === activeUniverse)
            .map((universe) => (
              <div key={universe.id} className="space-y-8">
                {/* Header de l'univers */}
                <div className={`bg-gradient-to-r ${universe.gradient} rounded-2xl p-8 text-white shadow-2xl`}>
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                      <h2 className="text-4xl font-bold mb-4">{universe.title}</h2>
                      <p className="text-xl mb-4 opacity-90">{universe.description}</p>
                      <div className="flex flex-wrap gap-4 items-center">
                        <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                          {universe.status}
                        </span>
                        {universe.connectedTo && (
                          <span className="px-4 py-2 bg-yellow-500/20 rounded-full text-sm font-medium">
                            Connecté à l'univers principal
                          </span>
                        )}
                      </div>
                    </div>
                    {universe.image && (
                      <div className="w-48 h-48 rounded-xl overflow-hidden shadow-lg">
                        <img 
                          src={universe.image} 
                          alt={universe.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Sections de l'univers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {universe.sections.map((section) => (
                    <div key={section.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                      <button
                        onClick={() => toggleSection(universe.id, section.id)}
                        className="w-full p-6 text-left hover:bg-gray-700/30 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-3xl">{section.icon}</span>
                            <div>
                              <h3 className="text-xl font-bold text-white">{section.title}</h3>
                              <p className="text-gray-400 text-sm">{section.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">
                              {section.subcategories.reduce((total, sub) => total + sub.count, 0)} éléments
                            </span>
                            <svg 
                              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                                isExpanded(universe.id, section.id) ? 'rotate-180' : ''
                              }`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </button>

                      {/* Sous-catégories */}
                      {isExpanded(universe.id, section.id) && (
                        <div className="border-t border-gray-700 bg-gray-900/50">
                          <div className="p-6 space-y-3">
                            {section.subcategories.map((subcategory, index) => (
                              <Link
                                key={index}
                                to={`/univers/${universe.id}/${section.id}/${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200 group"
                              >
                                <div className="flex items-center gap-3">
                                  <div 
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: subcategory.color }}
                                  ></div>
                                  <span className="text-white group-hover:text-purple-300 transition-colors">
                                    {subcategory.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-400">
                                    {subcategory.count} éléments
                                  </span>
                                  <svg 
                                    className="w-4 h-4 text-gray-400 group-hover:text-purple-300 transition-colors"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
        ) : (
          // Vue d'ensemble quand aucun univers n'est sélectionné
          <div className="text-center py-20">
            <div className="text-6xl mb-8">🌌</div>
            <h2 className="text-4xl font-bold mb-6 text-gray-300">
              Sélectionnez un univers pour explorer
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Chaque univers contient des personnages, lieux, objets et mystères uniques. 
              Cliquez sur un titre ci-dessus pour découvrir ses secrets.
            </p>
            
            {/* Statistiques globales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">4</div>
                <div className="text-gray-300">Univers Créés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">200+</div>
                <div className="text-gray-300">Personnages</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">150+</div>
                <div className="text-gray-300">Lieux & Régions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">100+</div>
                <div className="text-gray-300">Objets & Artefacts</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portails;

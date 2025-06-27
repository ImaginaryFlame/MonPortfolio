import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../config/sanityClient';
import { useLanguage } from '../../hooks/useLanguage';
import { TwitterThread, TwitterEmbed } from '../AppEmbed';

const StudioSocial = ({ section }) => {
  const { t } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedThreads, setExpandedThreads] = useState({});

  // Changer le titre de l'onglet
  useEffect(() => {
    if (section) {
      const sectionTitles = {
        'twitter': '🐦 Threads Twitter/X'
      };
      document.title = `${sectionTitles[section] || '📱 Contenu Social'} | MonPortfolio - Flame's Studio`;
    } else {
      document.title = "📱 Contenu Social | MonPortfolio - Flame's Studio";
    }
    return () => {
      document.title = "MonPortfolio - Flamme Créative | Univers Narratifs, Labo Tech & Studio";
    };
  }, [section]);

  const sections = {
    'twitter': {
      title: 'Threads Twitter/X',
      query: '*[_type == "project" && category == "twitter-thread"]'
    }
  };

  // Mes threads Twitter/X
  const staticThreads = [
    {
      id: 'black-clover-thread',
      title: 'Black Clover - Analyse de la relation maternelle entre le fils adopté et le fils abandonné',
      description: 'Analyse littéraire approfondie du flashback de Liebe dans Black Clover. Décryptage des thèmes de discrimination, sacrifice maternel, xénophobie et acceptation de soi. Exploration des parallèles entre le monde des démons et des humains, et analyse du concept du "Show don\'t tell" de Tabata. Thread original de 52 tweets - voici un extrait de 14 tweets clés pour découvrir cette analyse magistrale.',
      mainTweet: '1937048823349780916', // Tweet principal
      allTweets: [
        // Tous vos tweets originaux remis
        '1937048826554044611', // Tweet 2
        '1937048830459187484', // Tweet 3
        '1937048834112098323', // Tweet 4
        '1937048837333418197', // Tweet 5
        '1937048839703208372', // Tweet 6
        '1937048842807255474', // Tweet 7
        '1937048845474464170', // Tweet 8
        '1937048847999443431', // Tweet 9
        '1937048851501977627', // Tweet 10
        '1937048854966554803', // Tweet 11
        '1937048858993037553', // Tweet 12
        '1937048863191224809', // Tweet 13
        '1937048866236325962', // Tweet 14
      ],
      tweetCount: 52, // Thread complet de 52 tweets (14 extraits affichés : 1 principal + 13 suivants)
      date: '2024-06-23', // Date correcte du thread
      topics: ['Black Clover', 'Analyse Littéraire', 'Critique Anime', 'Storytelling', 'Discrimination', 'Philosophie'],
      threadUrl: 'https://x.com/Imaginary_Flame/status/1937048823349780916',
      threadUnrollUrl: 'https://threadreaderapp.com/thread/1937048823349780916.html',
      image: '/assets/img/Black-Clover-Liebe-Licita-Asta.webp'
    }
    // Ajoutez vos autres threads ici
  ];

  const toggleThreadExpansion = (threadId) => {
    setExpandedThreads(prev => ({
      ...prev,
      [threadId]: !prev[threadId]
    }));
  };

  useEffect(() => {
    if (section && sections[section]) {
      setLoading(true);
      client.fetch(sections[section].query)
        .then(data => {
          setContent(data);
          setLoading(false);
        })
        .catch(error => {
          console.error(t.common.error, error);
          setLoading(false);
        });
    } else {
      // Pas de section spécifique, on affiche la vue d'ensemble
      setLoading(false);
    }
  }, [section, t.common.error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 flex items-center justify-center pt-20 md:pt-24">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Vue d'ensemble des catégories sociales
  if (!section) {
    const socialCategories = [
      {
        id: 'threads',
        title: 'THREADS TWITTER/X',
        description: 'Analyses approfondies et réflexions - Threads longs format sur l\'anime, la littérature et la culture pop avec intégration native des tweets',
        color: '#3B82F6',
        icon: '🐦',
        count: staticThreads.length.toString()
      }
      // Vous pouvez ajouter d'autres catégories ici
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white pt-20 md:pt-24 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <Link 
              to="/creation/studio"
              className="text-blue-400 hover:text-blue-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-900/20 transition-all duration-300 border border-blue-500/30 hover:border-blue-500 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Retour au Studio</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              📱 CONTENU SOCIAL
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {socialCategories.map((category, index) => (
              <Link
                key={category.id}
                to={`/creation/studio/social/threads-twitter`}
                className="group relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-700 transform hover:scale-[1.02] h-[400px]"
              >
                {/* Bordure animée */}
                <div 
                  className="absolute inset-0 rounded-3xl p-[2px] transition-all duration-500 group-hover:animate-pulse"
                  style={{
                    background: `linear-gradient(45deg, ${category.color}, ${category.color}40, ${category.color}60)`,
                    backgroundSize: '300% 300%'
                  }}
                >
                  <div className="h-full bg-gray-900/90 rounded-3xl"></div>
                </div>

                {/* Effet de lueur au hover */}
                <div 
                  className="absolute inset-0 rounded-3xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    boxShadow: `0 0 50px ${category.color}20, inset 0 0 50px ${category.color}40`
                  }}
                />

                {/* Layout supérieur */}
                <div className="absolute top-0 left-0 right-0 p-6 z-20">
                  <div className="flex justify-between items-start">
                    {/* Badge de count */}
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border bg-black/40 text-gray-200 border-gray-500 group-hover:bg-white/25 group-hover:text-white group-hover:border-white/40 transition-all duration-300"
                        style={{
                          backgroundColor: `${category.color}40`,
                          borderColor: `${category.color}60`
                        }}
                      >
                        {category.count} threads
                      </span>
                    </div>

                    {/* Icône */}
                    <div 
                      className="text-4xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12"
                      style={{
                        filter: `drop-shadow(0 0 20px ${category.color}20)`
                      }}
                    >
                      {category.icon}
                    </div>
                  </div>
                </div>

                {/* Contenu principal */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="space-y-4">
                    {/* Titre */}
                    <h3 
                      className="text-3xl font-bold transition-all duration-300 group-hover:scale-105"
                      style={{
                        color: category.color,
                        textShadow: `0 0 20px ${category.color}20`
                      }}
                    >
                      {category.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed transition-all duration-300 group-hover:text-white text-lg">
                      {category.description}
                    </p>

                    {/* Bouton d'action */}
                    <div className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-sm border bg-black/30 border-gray-600 group-hover:bg-white/20 group-hover:border-white/30 group-hover:scale-105 transition-all duration-300 cursor-pointer">
                      <span className="font-medium">Explorer les threads</span>
                      <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Vue spécifique d'une section
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link 
            to="/creation/studio/social"
            className="text-blue-400 hover:text-blue-300 mr-4 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-900/20 transition-all duration-300 border border-blue-500/30 hover:border-blue-500 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">Retour au Contenu Social</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            {sections[section]?.title || 'Contenu Social'}
          </h1>
        </div>

        {/* Threads Twitter/X intégrés */}
        {section === 'twitter' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-blue-300 mb-4">🐦 Mes Threads Twitter/X</h2>
              <p className="text-gray-400">
                Retrouvez mes threads et réflexions partagées sur Twitter/X, directement intégrés dans le portfolio.
              </p>
            </div>

            {staticThreads.map((thread) => {
              const isExpanded = expandedThreads[thread.id];
              const hasMultipleTweets = thread.allTweets.length > 0; // Il y a des tweets en plus du principal
              
              return (
                <div key={thread.id} className="mb-12">
                  <div className="mb-6 text-center">
                    {/* Image du thread */}
                    {thread.image && (
                      <div className="mb-6">
                        <img 
                          src={thread.image}
                          alt={thread.title}
                          className="w-64 h-64 object-cover rounded-xl mx-auto shadow-lg border-2 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
                        />
                      </div>
                    )}
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{thread.title}</h3>
                    <p className="text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">{thread.description}</p>
                    
                    {thread.topics && (
                      <div className="flex flex-wrap gap-2 justify-center mb-6">
                        {thread.topics.map((topic, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-900/30 rounded-full text-sm font-medium text-blue-300 border border-blue-600/30 hover:bg-blue-800/40 transition-colors duration-300"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Statistiques du thread */}
                    <div className="mb-6 text-gray-400 text-sm">
                      📝 {thread.tweetCount} tweets au total ({thread.allTweets.length + 1} extraits ici) • 
                      📅 {new Date(thread.date).toLocaleDateString('fr-FR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>

                    <div className="flex justify-center gap-3 mb-6 flex-wrap">
                      {hasMultipleTweets && (
                        <button
                          onClick={() => toggleThreadExpansion(thread.id)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                        >
                          {isExpanded ? (
                            <>
                              📖 Réduire les extraits
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </>
                          ) : (
                            <>
                              📚 Lire les extraits clés ({thread.allTweets.length + 1} tweets)
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </>
                          )}
                        </button>
                      )}
                      
                      {thread.threadUnrollUrl && (
                        <a 
                          href={thread.threadUnrollUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                        >
                          📃 Lire la version texte
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </a>
                      )}
                      
                      <a 
                        href={thread.threadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                      >
                        🐦 Ouvrir sur Twitter/X
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                                      {/* Affichage des tweets - NOUVELLE APPROCHE */}
                    <div className="max-w-2xl mx-auto">
                      {!isExpanded ? (
                        /* Mode réduit : seulement le tweet principal */
                        <div className="mb-6">
                          <div className="text-center mb-4">
                            <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs font-medium border border-blue-600/30">
                              Tweet principal (1/{thread.allTweets.length + 1})
                            </span>
                          </div>
                          <TwitterEmbed key={`tweet-main-${thread.id}-${thread.mainTweet}`} tweetId={thread.mainTweet} theme="dark" />
                        </div>
                      ) : (
                        /* Mode étendu : TOUS les tweets y compris le principal */
                        <div className="space-y-6">
                          <div className="text-center mb-6">
                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-900/40 to-purple-900/40 text-blue-200 rounded-lg text-sm font-medium border border-blue-500/30">
                              📖 Thread complet ({thread.allTweets.length + 1} tweets)
                            </span>
                            <p className="text-gray-400 text-xs mt-2">
                              Pour lire l'intégralité des 52 tweets, utilisez les boutons "Version texte" ou "Twitter/X"
                            </p>
                          </div>
                          
                          {/* Tweet principal en premier */}
                          <div className="relative">
                            <div className="text-center mb-4">
                              <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs font-medium border border-blue-600/30">
                                Tweet 1/{thread.allTweets.length + 1} - Principal
                              </span>
                            </div>
                            <TwitterEmbed key={`tweet-expanded-main-${thread.id}-${thread.mainTweet}`} tweetId={thread.mainTweet} theme="dark" />
                          </div>
                          
                          {/* Tweets suivants */}
                          {thread.allTweets
                            .filter((tweetId, index, array) => array.indexOf(tweetId) === index && tweetId !== thread.mainTweet) // Supprimer doublons ET éviter le principal
                            .map((tweetId, index) => (
                            <div key={`tweet-expanded-${thread.id}-${tweetId}-${index}`} className="relative">
                              <div className="text-center mb-4">
                                <span className="inline-block px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30">
                                  Tweet {index + 2}/{thread.allTweets.length + 1}
                                </span>
                              </div>
                              <TwitterEmbed key={`tweet-expanded-embed-${thread.id}-${tweetId}-${index}`} tweetId={tweetId} theme="dark" />
                            </div>
                          ))}
                          
                          {/* Bouton pour réduire */}
                          <div className="text-center mt-8">
                            <button
                              onClick={() => toggleThreadExpansion(thread.id)}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-all duration-300"
                            >
                              ⬆️ Réduire les extraits
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                </div>
              );
            })}

            {/* Instructions pour ajouter des threads */}
            <div className="mt-12 p-6 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/30 rounded-xl">
              <h3 className="text-lg font-bold text-blue-200 mb-4">💡 Comment ajouter vos threads complets</h3>
              <div className="text-gray-300 text-sm space-y-3">
                <div>
                  <p className="font-semibold text-blue-300 mb-2">📝 Structure d'un thread :</p>
                  <div className="bg-gray-800/50 p-3 rounded-lg font-mono text-xs">
                    <div className="text-green-400">// Thread avec plusieurs tweets</div>
                    <div>allTweets: [</div>
                    <div className="ml-4 text-blue-300">'1937048823349780916', <span className="text-gray-500">// Tweet principal</span></div>
                    <div className="ml-4 text-blue-300">'1937048823349780917', <span className="text-gray-500">// Tweet 2</span></div>
                    <div className="ml-4 text-blue-300">'1937048823349780918', <span className="text-gray-500">// Tweet 3...</span></div>
                    <div>],</div>
                    <div>tweetCount: 3</div>
                  </div>
                </div>
                
                <div>
                  <p className="font-semibold text-blue-300 mb-2">🔍 Comment récupérer les IDs :</p>
                  <ul className="space-y-1 ml-4">
                    <li><strong>1.</strong> Ouvrez votre thread sur Twitter/X</li>
                    <li><strong>2.</strong> Cliquez sur chaque tweet du thread</li>
                    <li><strong>3.</strong> Copiez l'ID dans l'URL : <code className="bg-gray-700 px-1 rounded">status/ID_DU_TWEET</code></li>
                    <li><strong>4.</strong> Ajoutez tous les IDs dans l'ordre du thread</li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-600/30">
                  <p className="font-semibold text-blue-200 mb-2">✨ Fonctionnalités :</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Le tweet principal s'affiche toujours</li>
                    <li>• Bouton "Lire le thread complet" si plusieurs tweets</li>
                    <li>• Expansion/réduction avec animation</li>
                    <li>• Numérotation automatique des tweets</li>
                    <li>• Lien vers Twitter/X pour l'expérience native</li>
                    <li>• Bouton "Lire la version texte" vers <a href="https://threadreaderapp.com" target="_blank" className="text-green-300 hover:underline">ThreadReaderApp</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Threads depuis Sanity CMS */}
        {content && content.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-6">📊 Threads depuis CMS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.map((thread) => (
                <div 
                  key={thread._id}
                  className="group relative overflow-hidden rounded-2xl border border-blue-900/30 hover:border-blue-500/50 transition-all duration-500"
                >
                  {thread.image && (
                    <div className="relative h-48">
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10" />
                      <img 
                        src={thread.image}
                        alt={thread.title}
                        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{thread.title}</h3>
                      {thread.date && (
                        <span className="text-blue-400 text-sm">
                          {new Date(thread.date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long'
                          })}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-300 mb-4">{thread.description}</p>
                    
                    {thread.topics && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {thread.topics.map((topic, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-900/30 rounded-full text-xs font-medium text-blue-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      {thread.engagement && (
                        <div className="flex items-center space-x-4">
                          <span>{thread.engagement.likes} 💙</span>
                          <span>{thread.engagement.retweets} 🔄</span>
                          <span>{thread.engagement.replies} 💬</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-4">
                      {thread.threadUrl && (
                        <a 
                          href={thread.threadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors duration-300"
                        >
                          Voir le thread
                        </a>
                      )}
                      {thread.threadUnroll && (
                        <a 
                          href={thread.threadUnroll}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors duration-300"
                        >
                          Version déroulée
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudioSocial; 
import React, { useState, useEffect } from 'react';
import { fetchProjects, fetchTags, getTagColor } from '../config/sanityClient';

const TestApis = () => {
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testApis = async () => {
      console.log('🔬 Début du test des APIs...');
      
      try {
        setLoading(true);
        setError(null);

        // Test des projets avec leurs tags
        console.log('📊 Test fetchProjects...');
        const projectsData = await fetchProjects();
        console.log('✅ Projets récupérés:', projectsData.length);
        
        projectsData.forEach(project => {
          console.log(`🏷️ Projet "${project.title}":`, {
            category: project.category,
            tags: project.tags?.map(tag => ({
              id: tag._id,
              name: tag.name,
              color: getTagColor(tag),
              colorType: tag.colorType,
              originalColor: tag.presetColor || tag.customColor?.hex || tag.color
            }))
          });
        });

        // Test des tags seuls
        console.log('🎯 Test fetchTags...');
        const tagsData = await fetchTags();
        console.log('✅ Tags récupérés:', tagsData.length);
        
        tagsData.forEach(tag => {
          console.log(`🔖 Tag "${tag.name}":`, {
            category: tag.category,
            colorType: tag.colorType,
            finalColor: getTagColor(tag),
            originalData: {
              presetColor: tag.presetColor,
              customColor: tag.customColor,
              legacyColor: tag.color
            }
          });
        });

        setProjects(projectsData);
        setTags(tagsData);

      } catch (err) {
        console.error('❌ Erreur lors du test:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testApis();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Test des APIs en cours...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Test des APIs - Projets et Tags
        </h1>

        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <h3 className="font-bold">Erreur :</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Section Projets */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📊 Projets avec Tags ({projects.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <div key={project._id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                
                <div className="mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Catégorie:</span>
                  <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {project.category}
                  </span>
                </div>

                {project.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    {project.description.substring(0, 100)}...
                  </p>
                )}

                {/* Tags du projet */}
                {project.tags && project.tags.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Tags liés ({project.tags.length}):
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span
                          key={tag._id}
                          className="px-3 py-1 rounded-full text-white text-sm font-medium"
                          style={{ backgroundColor: getTagColor(tag) }}
                          title={`${tag.name} - Type: ${tag.colorType || 'legacy'}`}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section Tags */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎯 Tous les Tags ({tags.length})
          </h2>
          
          {/* Grouper les tags par catégorie */}
          {['arts-visuels-narratifs', 'developpement-tech', 'videaste', 'game-development', 'web-digital'].map(category => {
            const categoryTags = tags.filter(tag => tag.category === category);
            if (categoryTags.length === 0) return null;

            const categoryNames = {
              'arts-visuels-narratifs': '🎨 Arts Visuels & Narratifs',
              'developpement-tech': '💻 Développement & Tech',
              'videaste': '🎬 Vidéaste',
              'game-development': '🎮 Game Development',
              'web-digital': '🌐 Web & Digital'
            };

            return (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {categoryNames[category]} ({categoryTags.length})
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categoryTags.map(tag => (
                    <div key={tag._id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="px-3 py-1 rounded-full text-white text-sm font-medium"
                          style={{ backgroundColor: getTagColor(tag) }}
                        >
                          {tag.name}
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div><strong>Type:</strong> {tag.colorType || 'legacy'}</div>
                        {tag.presetColor && (
                          <div><strong>Preset:</strong> {tag.presetColor}</div>
                        )}
                        {tag.customColor?.hex && (
                          <div><strong>Custom:</strong> {tag.customColor.hex}</div>
                        )}
                        {tag.color && (
                          <div><strong>Legacy:</strong> {tag.color}</div>
                        )}
                        <div><strong>Final:</strong> {getTagColor(tag)}</div>
                      </div>

                      {tag.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {tag.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistiques */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📈 Statistiques
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{projects.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projets</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{tags.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tags</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {projects.reduce((sum, project) => sum + (project.tags?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Liaisons Projet-Tag</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {new Set(['arts-visuels-narratifs', 'developpement-tech', 'videaste', 'game-development', 'web-digital'].filter(cat => 
                  tags.some(tag => tag.category === cat)
                )).size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Catégories actives</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestApis; 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../config/sanityClient';
import { useLanguage } from '../../hooks/useLanguage';

const StudioSocial = ({ section }) => {
  const { t } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = {
    'twitter': {
      title: t.studio.social.twitter,
      query: '*[_type == "project" && category == "twitter-thread"]'
    }
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
    }
  }, [section, t.common.error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link 
            to="/creation/studio"
            className="text-blue-400 hover:text-blue-300 mr-4"
          >
            {t.studio.social.backToStudio}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            {sections[section]?.title || t.studio.social.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content && content.map((thread) => (
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
                      {t.studio.social.viewThread}
                    </a>
                  )}
                  {thread.threadUnroll && (
                    <a 
                      href={thread.threadUnroll}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      {t.studio.social.unrolledVersion}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudioSocial; 
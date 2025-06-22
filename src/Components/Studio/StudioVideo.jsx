import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../config/sanityClient';
import { useLanguage } from '../../hooks/useLanguage';

const StudioVideo = ({ section }) => {
  const { t } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = {
    'youtube': {
      title: t.studio.video.youtube,
      query: '*[_type == "project" && category == "youtube-video"]'
    },
    'reels': {
      title: t.studio.video.reels,
      query: '*[_type == "project" && category == "social-video"]'
    },
    'miniatures': {
      title: t.studio.video.miniatures,
      query: '*[_type == "project" && category == "thumbnail"]'
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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link 
            to="/creation/studio"
            className="text-red-400 hover:text-red-300 mr-4"
          >
            {t.studio.backToStudio}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            {sections[section]?.title || t.studio.video.defaultTitle}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content && content.map((video) => (
            <div 
              key={video._id}
              className="group relative overflow-hidden rounded-2xl border border-red-900/30 hover:border-red-500/50 transition-all duration-500"
            >
              {video.thumbnail && (
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10" />
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs z-20">
                      {video.duration}
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{video.title}</h3>
                  {video.date && (
                    <span className="text-red-400 text-sm">
                      {new Date(video.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-300 mb-4">{video.description}</p>
                
                {video.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {video.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-red-900/30 rounded-full text-xs font-medium text-red-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-4">
                  {video.videoUrl && (
                    <a 
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      {t.studio.video.watch}
                    </a>
                  )}
                  {video.behindTheScenes && (
                    <a 
                      href={video.behindTheScenes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      {t.studio.video.behindScenes}
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

export default StudioVideo; 
import React, { useState, useEffect } from 'react';

const TwitterEmbed = ({ tweetId, theme = 'dark' }) => {
  const embedId = `twitter-embed-${tweetId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    // Attendre un peu pour éviter les conflits lors du rendu simultané
    const timeout = setTimeout(() => {
      // Charger le script Twitter seulement si pas déjà chargé
      if (!window.twttr) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        document.head.appendChild(script);
        
        script.onload = () => {
          if (window.twttr && document.getElementById(embedId)) {
            window.twttr.widgets.createTweet(tweetId, document.getElementById(embedId), {
              theme: theme,
              conversation: 'none',
              cards: 'visible',
              lang: 'fr'
            });
          }
        };
      } else {
        // Script déjà chargé, créer directement l'embed
        if (window.twttr && document.getElementById(embedId)) {
          window.twttr.widgets.createTweet(tweetId, document.getElementById(embedId), {
            theme: theme,
            conversation: 'none',
            cards: 'visible',
            lang: 'fr'
          });
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      // Nettoyage lors du démontage
      const embedElement = document.getElementById(embedId);
      if (embedElement) {
        embedElement.innerHTML = '';
      }
    };
  }, [tweetId, theme, embedId]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div id={embedId} className="twitter-embed-container"></div>
    </div>
  );
};

// Composant pour un thread complet
const TwitterThread = ({ tweets, title, description }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-blue-500/30 p-6 mb-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-blue-200 mb-2">{title}</h3>
        {description && (
          <p className="text-gray-300 text-sm">{description}</p>
        )}
      </div>
      
      <div className="space-y-6">
        {tweets.map((tweetId, index) => (
          <div key={index} className="border-l-2 border-blue-500/30 pl-4">
            <TwitterEmbed tweetId={tweetId} theme="dark" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant principal pour gérer les embeds d'applications
const AppEmbed = ({ type, ...props }) => {
  switch (type) {
    case 'twitter':
      return <TwitterEmbed {...props} />;
    case 'twitter-thread':
      return <TwitterThread {...props} />;
    default:
      return <div>Type d'embed non supporté</div>;
  }
};

export default AppEmbed;
export { TwitterEmbed, TwitterThread }; 
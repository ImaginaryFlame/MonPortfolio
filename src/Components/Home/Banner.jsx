import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage.jsx';

const Banner = ({ theme }) => {
  const { t } = useLanguage();
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = t.banner.roles;
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [isWaiting, setIsWaiting] = useState(false);
  const period = 3000; // Temps d'attente plus long pour lire
  const typingSpeed = 120; // Vitesse de frappe plus lente et régulière
  const deletingSpeed = 60; // Vitesse de suppression plus rapide

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);
    
    setText(updatedText);
    
    if (isDeleting) {
      setDelta(deletingSpeed);
    } else {
      setDelta(typingSpeed + Math.random() * 50); // Variation naturelle
    }
    
    if (!isDeleting && updatedText === fullText) {
      setIsWaiting(true);
      setDelta(period);
      setTimeout(() => {
        setIsDeleting(true);
        setIsWaiting(false);
      }, period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  useEffect(() => {
    if (!isWaiting) {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => clearInterval(ticker);
    }
  }, [text, delta, loopNum, isDeleting, isWaiting]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-24">
      <div 
        className="absolute inset-0 bg-cover transition-all duration-1000"
        style={{ 
          backgroundImage: `url('${theme.background}')`,
          backgroundPosition: 'center 20%'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Couche 1 : Particules brillantes d'ambiance - INDÉPENDANTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={`ambient-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Couche 2 : Strass magiques flottants - INDÉPENDANTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={`large-strass-${i}`}
            className="absolute animate-ambient-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${8 + Math.random() * 6}s`
            }}
          >
            <div 
              className="w-4 h-4 bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 
                         rounded-full animate-ambient-glow opacity-70"
              style={{
                filter: 'blur(0.8px)',
                boxShadow: '0 0 12px rgba(147, 51, 234, 0.8), 0 0 24px rgba(147, 51, 234, 0.4)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Couche 3 : Strass moyens - INDÉPENDANTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={`medium-strass-${i}`}
            className="absolute animate-ambient-orbit"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${12 + Math.random() * 8}s`
            }}
          >
            <div 
              className="w-3 h-3 bg-gradient-to-r from-blue-300 via-violet-400 to-purple-500 
                         rounded-full animate-ambient-pulse opacity-60"
              style={{
                filter: 'blur(0.6px)',
                boxShadow: '0 0 10px rgba(99, 102, 241, 0.6), 0 0 20px rgba(99, 102, 241, 0.3)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Couche 4 : Petits strass rapides - INDÉPENDANTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={`small-strass-${i}`}
            className="absolute animate-ambient-drift"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            <div 
              className="w-2 h-2 bg-gradient-to-r from-pink-300 via-rose-400 to-violet-400 
                         rounded-full animate-ambient-twinkle opacity-80"
              style={{
                filter: 'blur(0.4px)',
                boxShadow: '0 0 8px rgba(236, 72, 153, 0.5), 0 0 16px rgba(236, 72, 153, 0.2)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Couche 5 : Strass géants occasionnels - INDÉPENDANTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={`giant-strass-${i}`}
            className="absolute animate-ambient-giant"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <div 
              className="w-6 h-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 
                         rounded-full animate-ambient-mega opacity-50"
              style={{
                filter: 'blur(1px)',
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.4), 0 0 60px rgba(251, 191, 36, 0.2)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Couche 6 : Paillettes déconnectées - TOTALEMENT INDÉPENDANTES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`disconnected-sparkle-${i}`}
            className="absolute animate-disconnected-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            <div 
              className="w-2.5 h-2.5 bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-400 
                         rounded-full animate-disconnected-glow opacity-60"
              style={{
                filter: 'blur(0.5px)',
                boxShadow: '0 0 10px rgba(20, 184, 166, 0.7), 0 0 20px rgba(20, 184, 166, 0.4)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Couche 7 : Micro paillettes déconnectées - AUTONOMES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={`micro-disconnected-${i}`}
            className="absolute animate-disconnected-dance"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          >
            <div 
              className="w-1 h-1 bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300 
                         rounded-full animate-disconnected-pulse opacity-70"
              style={{
                filter: 'blur(0.2px)',
                boxShadow: '0 0 6px rgba(139, 92, 246, 0.6), 0 0 12px rgba(139, 92, 246, 0.3)'
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        <div className="mb-8">
          <span className="text-xl font-medium drop-shadow-lg transition-colors duration-500 animate-fade-in" 
                style={{ color: '#E0E0E0', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            {t.banner.welcome}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl animate-slide-up" 
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          {t.banner.greeting}
          <br />
          {t.banner.andIAmAlso} <span className="relative inline-block">
            {/* Texte principal avec effet de brillance */}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 
                            drop-shadow-lg transition-all duration-300 animate-gradient-shift`}
                  style={{ 
                    textShadow: '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
                    backgroundSize: '200% 200%'
                  }}>
            {text}
            </span>
            
            {/* Curseur clignotant amélioré */}
            <span className="relative inline-block">
              <span className={`inline-block w-1 h-12 md:h-16 ml-1 bg-gradient-to-b from-violet-400 via-purple-400 to-blue-400 
                              animate-blink-smooth shadow-lg`}
                    style={{ 
                      boxShadow: '0 0 12px rgba(147, 51, 234, 0.8), 0 0 25px rgba(147, 51, 234, 0.5)',
                      transform: 'translateY(0.1em)'
                    }}>
              </span>
            </span>
          </span>
        </h1>
        
        <p className="text-xl max-w-3xl mx-auto mb-12 leading-relaxed text-gray-200 drop-shadow-lg animate-fade-in-delay" 
           style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          {t.banner.description}
        </p>

      </div>
    </section>
  );
};

export default Banner;
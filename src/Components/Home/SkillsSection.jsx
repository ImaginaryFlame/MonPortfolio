import React from 'react';
import { useLanguage } from '../../hooks/useLanguage.jsx';

const SkillsSection = () => {
  const { t } = useLanguage();
  
  const skills = [
    {
      category: "Développement",
      icon: "💻",
      items: [
        { 
          name: "Java", 
          logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
          learning: true
        },
        { 
          name: "JavaScript", 
          logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
          learning: true
        },
        { 
          name: "React", 
          logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
          learning: true
        },
        { 
          name: "Python", 
          logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
          learning: true
        },
        { 
          name: "C++", 
          logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
          learning: true
        },
        { 
          name: "C#", 
          logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg",
          learning: true
        }
      ]
    },
    {
      category: "Design & 3D",
      icon: "🎨",
      items: [
        { 
          name: "Photoshop", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
          learning: true
        },
        { 
          name: "Blender", 
          logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/blender/blender-original.svg",
          learning: true
        },
        { 
          name: "After Effects", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
          learning: true
        },
        { 
          name: "Clip Studio Paint", 
          logo: "https://upload.wikimedia.org/wikipedia/en/6/66/Clip_Studio_Paint_app_logo.png",
          learning: true
        },
        { 
          name: "Maya", 
          logo: "/assets/img/maya-logo-new.webp",
          learning: true
        }
      ]
    },
    {
      category: "Contenu & Communication",
      icon: "📹",
      items: [
        { 
          name: "Écriture", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg"
        },
        { 
          name: "Community Management", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
        },
        { 
          name: "Streaming", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Twitch_Glitch_Logo_Purple.svg"
        },
        { 
          name: "DaVinci Resolve", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg"
        },
        { 
          name: "Création de vidéo", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
        }
      ]
    },
    {
      category: "Outils & Productivité",
      icon: "⚙️",
      items: [
        { 
          name: "Obsidian", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/2023_Obsidian_logo.svg"
        },
        { 
          name: "Git", 
          logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg"
        },
        { 
          name: "Figma", 
          logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg"
        },
        { 
          name: "Node.js", 
          logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
        }
      ]
    }
  ];

  return (
    <section className="py-20 px-8 relative overflow-hidden">
      {/* Background avec overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('/assets/img/F7xrYybWcAEztt2.webp')` }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Compétences
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-lg">
            Mes technologies et outils de prédilection
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillCategory, index) => (
            <div
              key={skillCategory.category}
              className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 
                         hover:border-orange-400/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Header de catégorie */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{skillCategory.icon}</div>
                <h3 className="text-xl font-bold text-white">{skillCategory.category}</h3>
              </div>
              
              {/* Liste des compétences avec logos */}
              <div className="grid grid-cols-2 gap-4">
                {skillCategory.items.map((skill, skillIndex) => (
                  <div 
                    key={skill.name} 
                    className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-black/20 
                               hover:bg-black/40 transition-all duration-300 hover:scale-105
                               border border-white/5 hover:border-orange-400/20"
                  >
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img 
                        src={skill.logo} 
                        alt={skill.name}
                        className="w-10 h-10 object-contain brightness-125 contrast-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] 
                                   hover:scale-110 hover:brightness-150 transition-all duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div 
                        className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 
                                   rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        style={{ display: 'none' }}
                      >
                        {skill.name.charAt(0)}
                      </div>
                    </div>
                    <span className="text-gray-200 font-medium text-sm text-center leading-tight">
                      {skill.name}
                    </span>
                    {skill.learning && (
                      <span className="text-xs text-orange-400 font-medium bg-orange-500/20 px-2 py-1 rounded-full border border-orange-400/30 learning-badge">
                        📚 En apprentissage
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Style CSS pour animation synchronisée */}
      <style jsx>{`
        @keyframes learning-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }
        
        .learning-badge {
          animation: learning-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
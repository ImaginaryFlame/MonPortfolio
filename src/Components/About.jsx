import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/Components/ui/card";
import { useLanguage } from '../hooks/useLanguage.jsx';
import { fetchAboutPage, urlFor } from '../config/sanityClient';

export default function AboutSection() {
  const { t, tFunction } = useLanguage();
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les données de la page About depuis Sanity
  useEffect(() => {
    const loadAboutData = async () => {
      try {
        setLoading(true);
        const data = await fetchAboutPage();
        if (data) {
          setAboutData(data);
        } else {
          // Si pas de données dans Sanity, utiliser les traductions comme fallback
          console.warn('Aucune donnée aboutPage trouvée dans Sanity, utilisation du fallback');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données About:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, []);

  // Fonction pour obtenir le contenu : CMS en priorité, sinon traductions
  const getContent = (cmsValue, translationKey) => {
    if (aboutData && cmsValue) {
      return cmsValue;
    }
    return tFunction(translationKey);
  };

  if (loading) {
    return (
      <section className="py-12 px-4 md:px-12 bg-gradient-to-b from-[#0e0e0e] to-[#1a1a1a] text-white pt-20 md:pt-24">
        <div className="max-w-5xl mx-auto flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Chargement de la page About...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 md:px-12 bg-gradient-to-b from-[#0e0e0e] to-[#1a1a1a] text-white pt-20 md:pt-24">
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-right {
          animation: slideInFromRight 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-bottom {
          animation: slideInFromBottom 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-900 { animation-delay: 0.9s; }
      `}</style>
      
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Message d'information si les données viennent du CMS */}
        {aboutData && (
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs">
              ✅ Contenu géré dynamiquement via Sanity CMS
            </div>
          </div>
        )}

        {/* Message d'erreur si problème de connexion */}
        {error && (
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-xs">
              ⚠️ Fallback : Utilisation des traductions statiques ({error})
            </div>
          </div>
        )}

        <div className="mt-20 animate-fade-in delay-100">
          <h1 className="text-4xl md:text-5xl font-bold text-center flex items-center justify-center">
            <span className="mr-3 text-orange-500 animate-pulse text-3xl">🔥</span>
            {aboutData?.pageTitle || t.about.title}!
            <span className="ml-3 text-orange-500 animate-pulse text-3xl">🔥</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 mb-8 animate-slide-bottom delay-200">
          <div className="lg:w-1/3">
            {aboutData?.profileImage ? (
              <img 
                src={urlFor(aboutData.profileImage).width(400).height(400).url()}
                alt="Flame - Créateur transmédia" 
                className="w-full max-w-sm mx-auto rounded-lg shadow-2xl border-2 border-orange-500/30 hover:border-orange-500/50 transition-all duration-300"
              />
            ) : (
              <img 
                src="/assets/img/20220726_002242.webp"
                alt="Flame - Créateur transmédia" 
                className="w-full max-w-sm mx-auto rounded-lg shadow-2xl border-2 border-orange-500/30 hover:border-orange-500/50 transition-all duration-300"
              />
            )}
          </div>
          <div className="lg:w-2/3">
            <p className="text-lg leading-relaxed" 
               dangerouslySetInnerHTML={{ 
                 __html: getContent(aboutData?.introduction, 'about.intro')
               }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-left delay-300">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-2xl">💻</span> 
                {aboutData?.techStack?.title || t.about.sections.techStack}
              </h2>
              <div className="space-y-3">
                <p><strong>Développement :</strong> {aboutData?.techStack?.devSkills || "Java, JavaScript, C++, C#"}</p>
                <p><strong>Création 3D/2D :</strong> {aboutData?.techStack?.designSkills || "Blender, Maya, Photoshop, Clip Studio Paint"}</p>
                <p><strong>Post-production :</strong> {aboutData?.techStack?.postProdSkills || "After Effects, Nuke, DaVinci Resolve, Filmora"}</p>
                <p><strong>Écriture & Organisation :</strong> {aboutData?.techStack?.writingSkills || "Final Draft, Word, Obsidian"}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-right delay-400">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-2xl">🎨</span> 
                {aboutData?.creativeSetup?.title || t.about.sections.creativeSetup}
              </h2>
              <div className="space-y-3">
                <p><strong>PC principal :</strong></p>
                <p className="whitespace-pre-line">{aboutData?.creativeSetup?.mainPC || "Alienware Aurora R13 • Intel Core i5-12400F\nRTX 3070 • 16 Go RAM DDR5 • SSD NVMe 2 To\nConfiguration double écran QHD"}</p>
                <p><strong>Périphériques :</strong></p>
                <p className="whitespace-pre-line">{aboutData?.creativeSetup?.peripherals || "Tablette Gaomon pour le dessin numérique et l'animation\niPad Air M1 pour le dessin et l'animation mobile"}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 md:col-span-2 animate-slide-bottom delay-500">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-2xl">🎮</span> 
                {aboutData?.mainLicense?.title || t.about.sections.mainUniverse}
              </h2>
              <div className="space-y-3">
                <p className="whitespace-pre-line" 
                   dangerouslySetInnerHTML={{ 
                     __html: aboutData?.mainLicense?.description || getContent(null, 'about.mainUniverse.description')
                   }}
                />
                {aboutData?.mainLicense?.influences && (
                  <p className="text-sm text-gray-300 whitespace-pre-line"
                     dangerouslySetInnerHTML={{ 
                       __html: `<strong>Influences :</strong> ${aboutData.mainLicense.influences}`
                     }}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 md:col-span-2 animate-slide-left delay-600">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-2xl">✨</span> 
                {aboutData?.narrativeProjects?.title || t.about.sections.narrativeProjects}
              </h2>
              <div className="space-y-4">
                {aboutData?.narrativeProjects ? (
                  <>
                    <p className="whitespace-pre-line">{aboutData.narrativeProjects.description}</p>
                    {aboutData.narrativeProjects.details && (
                      <p className="text-sm text-gray-300 whitespace-pre-line">{aboutData.narrativeProjects.details}</p>
                    )}
                  </>
                ) : (
                  // Fallback vers les traductions statiques pour les projets narratifs
                  <>
                    <div>
                      <h3 className="font-semibold text-lg text-orange-300">{t.about.narrativeProjects.heroFairy.title}</h3>
                      <p className="text-sm text-gray-300 mb-2" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.heroFairy.description') }} />
                      <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.heroFairy.summary') }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-orange-300">{t.about.narrativeProjects.vinceBelii.title}</h3>
                      <p className="text-sm text-gray-300 mb-2" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.vinceBelii.description') }} />
                      <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.vinceBelii.summary') }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-orange-300">{t.about.narrativeProjects.laraPandemic.title}</h3>
                      <p className="text-sm text-gray-300 mb-2" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.laraPandemic.description') }} />
                      <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.laraPandemic.summary') }} />
                    </div>
                    <p className="text-sm text-gray-400 italic" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.otherStories') }} />
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-right delay-700">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-2xl">📹</span> {t.about.sections.contentCreation}
              </h2>
              <div className="space-y-3">
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.contentCreation.description') }} />
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.socialNetworks.main') }} />
                <div className="flex flex-wrap gap-2 mt-3 mb-4">
                  <a 
                    href="https://linktw.in/CxYRUG" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-xs hover:bg-red-600/30 transition-all duration-200 cursor-pointer"
                  >
                    YouTube
                  </a>
                  <a 
                    href="https://linktw.in/hmTRVU" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-black/20 text-white rounded-full text-xs hover:bg-black/30 transition-all duration-200 cursor-pointer"
                  >
                    TikTok
                  </a>
                  <a 
                    href="https://linktw.in/AKQspA" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs hover:bg-purple-600/30 transition-all duration-200 cursor-pointer"
                  >
                    Twitch
                  </a>
                  <a 
                    href="https://linktw.in/MTfPjC" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-pink-600/20 text-pink-400 rounded-full text-xs hover:bg-pink-600/30 transition-all duration-200 cursor-pointer"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://linktw.in/WIyRoG" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs hover:bg-blue-600/30 transition-all duration-200 cursor-pointer"
                  >
                    Twitter
                  </a>
                  <a 
                    href="https://discord.gg/GrCeKzTjfC" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-xs hover:bg-indigo-600/30 transition-all duration-200 cursor-pointer"
                  >
                    Discord
                  </a>
                </div>
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.socialNetworks.art') }} />
                <div className="flex flex-wrap gap-2 mt-3">
                  <a 
                    href="https://linktw.in/JTYaRc" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs hover:bg-blue-600/30 transition-all duration-200 cursor-pointer flex items-center gap-1"
                  >
                    🎨 Twitter Art
                  </a>
                  <a 
                    href="https://linktw.in/yfllTc" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-pink-600/20 text-pink-400 rounded-full text-xs hover:bg-pink-600/30 transition-all duration-200 cursor-pointer flex items-center gap-1"
                  >
                    🎨 Instagram Art
                  </a>
                  <a 
                    href="https://linktw.in/jGETsf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-black/20 text-white rounded-full text-xs hover:bg-black/30 transition-all duration-200 cursor-pointer flex items-center gap-1"
                  >
                    🎨 TikTok Art
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-left delay-800">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-2xl">👥</span> {t.about.sections.community}
              </h2>
              <div className="space-y-3">
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.community.hasJoel') }} />
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.community.bmsTalents') }} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-right delay-900">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-2xl">🔥</span> 
                {aboutData?.vision?.title || t.about.sections.vision}
              </h2>
              <div className="space-y-3">
                {aboutData?.vision ? (
                  <>
                    {aboutData.vision.bmsProject && (
                      <p className="whitespace-pre-line">{aboutData.vision.bmsProject}</p>
                    )}
                    {aboutData.vision.longTermGoal && (
                      <p className="text-sm text-gray-300 whitespace-pre-line">{aboutData.vision.longTermGoal}</p>
                    )}
                  </>
                ) : (
                  <>
                    <p dangerouslySetInnerHTML={{ __html: tFunction('about.vision.objective') }} />
                    <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: tFunction('about.vision.construction') }} />
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
import { Card, CardContent } from "@/Components/ui/card";
import { useLanguage } from '../hooks/useLanguage.jsx';

export default function AboutSection() {
  const { t, tFunction } = useLanguage();
  return (
    <section className="py-12 px-4 md:px-12 bg-gradient-to-b from-[#0e0e0e] to-[#1a1a1a] text-white">
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
        <div className="mt-20 animate-fade-in delay-100">
          <h1 className="text-4xl md:text-5xl font-bold text-center flex items-center justify-center">
            <span className="mr-3 text-orange-500 animate-pulse text-3xl">🔥</span>
            {t.about.title}
            <span className="ml-3 text-orange-500 animate-pulse text-3xl">🔥</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 mb-8 animate-slide-bottom delay-200">
          <div className="lg:w-1/3">
            <img 
              src="/assets/20220726_002242.webp"
              alt="Flame - Créateur transmédia" 
              className="w-full max-w-sm mx-auto rounded-lg shadow-2xl border-2 border-orange-500/30 hover:border-orange-500/50 transition-all duration-300"
            />
          </div>
          <div className="lg:w-2/3">
            <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: tFunction('about.intro') }}></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-left delay-300">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-2xl">💻</span> {t.about.sections.techStack}
              </h2>
              <div className="space-y-3">
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.techStack.development') }}></p>
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.techStack.creation') }}></p>
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.techStack.postProduction') }}></p>
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.techStack.writing') }}></p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-right delay-400">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-2xl">🎨</span> {t.about.sections.creativeSetup}
              </h2>
              <div className="space-y-3">
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.setup.mainPC') }}></p>
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.setup.specs') }}></p>
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.setup.peripherals') }}></p>
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.setup.devices') }}></p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 md:col-span-2 animate-slide-bottom delay-500">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-2xl">🎮</span> {t.about.sections.mainUniverse}
              </h2>
              <div className="space-y-3">
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.mainUniverse.description') }}></p>
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.mainUniverse.themes') }}></p>
                <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: tFunction('about.mainUniverse.influences') }}></p>
                <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: tFunction('about.mainUniverse.visualStyles') }}></p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 md:col-span-2 animate-slide-left delay-600">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-2xl">✨</span> {t.about.sections.narrativeProjects}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-orange-300">{t.about.narrativeProjects.heroFairy.title}</h3>
                  <p className="text-sm text-gray-300 mb-2" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.heroFairy.description') }}></p>
                  <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.heroFairy.summary') }}></p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-orange-300">{t.about.narrativeProjects.vinceBelii.title}</h3>
                  <p className="text-sm text-gray-300 mb-2" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.vinceBelii.description') }}></p>
                  <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.vinceBelii.summary') }}></p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-orange-300">{t.about.narrativeProjects.laraPandemic.title}</h3>
                  <p className="text-sm text-gray-300 mb-2" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.laraPandemic.description') }}></p>
                  <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.laraPandemic.summary') }}></p>
                </div>
                <p className="text-sm text-gray-400 italic" dangerouslySetInnerHTML={{ __html: tFunction('about.narrativeProjects.otherStories') }}></p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-right delay-700">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-2xl">📹</span> {t.about.sections.contentCreation}
              </h2>
              <div className="space-y-3">
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.contentCreation.description') }}></p>
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.socialNetworks.main') }}></p>
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
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.socialNetworks.art') }}></p>
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
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.community.hasJoel') }}></p>
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.community.bmsTalents') }}></p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-right delay-900">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-2xl">🔥</span> {t.about.sections.vision}
              </h2>
              <div className="space-y-3">
                <p dangerouslySetInnerHTML={{ __html: tFunction('about.vision.objective') }}></p>
                <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: tFunction('about.vision.construction') }}></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
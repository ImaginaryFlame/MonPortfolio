import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';

// Imports directs pour les composants critiques
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Projects from './Components/Projects';
import ProjectDetail from './Components/ProjectDetail';

// Lazy loading pour les univers narratifs (gros composants)
const UniversNarratifs = lazy(() => import('./Components/Univers/UniversNarratifs'));
const HerosFee = lazy(() => import('./Components/Univers/herosfée/HerosFee'));
const VinceDeBelii = lazy(() => import('./Components/Univers/vincedebelii/VinceDeBelii'));
const PandemieLara = lazy(() => import('./Components/Univers/pandémielara/PandemieLara'));
const FlammeImaginaire = lazy(() => import('./Components/Univers/flammeimaginaire/FlammeImaginaire'));

// Lazy loading pour le Labo
const Labo = lazy(() => import('./Components/Labo/Labo'));
const LabDesign = lazy(() => import('./Components/Labo/LabDesign'));
const LabDev = lazy(() => import('./Components/Labo/LabDev'));
const LabAcademique = lazy(() => import('./Components/Labo/LabAcademique'));

// Lazy loading pour le Studio
const Studio = lazy(() => import('./Components/Studio/Studio'));
const StudioVideo = lazy(() => import('./Components/Studio/StudioVideo'));
const YouTubeStudioVideo = lazy(() => import('./Components/Studio/YouTubeStudioVideo'));
const YouTubeStudioDashboard = lazy(() => import('./Components/Studio/YouTubeStudioDashboard'));
const YouTubeStudioDashboardSimple = lazy(() => import('./Components/Studio/YouTubeStudioDashboardSimple'));
const ChannelIdFinder = lazy(() => import('./Components/ChannelIdFinder'));
const StudioSocial = lazy(() => import('./Components/Studio/StudioSocial'));
const StudioBranding = lazy(() => import('./Components/Studio/StudioBranding'));
const TwitchStudioDashboard = lazy(() => import('./Components/Studio/TwitchStudioDashboard'));
const TwitchStreams = lazy(() => import('./Components/Studio/TwitchStreams'));
const TwitchClips = lazy(() => import('./Components/Studio/TwitchClips'));

// Lazy loading pour l'Atelier
const Atelier = lazy(() => import('./Components/Atelier/Atelier'));
const ArtTraditionnel = lazy(() => import('./Components/Atelier/ArtTraditionnel'));
const IllustrationsFinalisees = lazy(() => import('./Components/Atelier/IllustrationsFinalisees'));
const EtudesProgression = lazy(() => import('./Components/Atelier/EtudesProgression'));
const CroquisRoughs = lazy(() => import('./Components/Atelier/CroquisRoughs'));

// Lazy loading pour les projets spéciaux
const LittleArchaeologist = lazy(() => import('./Components/Projects/LittleArchaeologist'));
const BibliApp = lazy(() => import('./Components/Projects/BibliApp'));

// Composant de chargement
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
      <p className="text-orange-300">Chargement...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Routes principales */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />

        {/* Routes pour les univers narratifs */}
        <Route path="/creation/univers-narratifs" element={<UniversNarratifs />} />
        
        {/* Routes pour La Fable du Héros et la Fée */}
        <Route path="/creation/univers-narratifs/fable-heros-fee" element={<HerosFee />} />
        <Route path="/creation/univers-narratifs/fable-heros-fee/personnages" element={<HerosFee section="personnages" />} />
        <Route path="/creation/univers-narratifs/fable-heros-fee/personnages/:slug" element={<HerosFee section="personnages" />} />
        <Route path="/creation/univers-narratifs/fable-heros-fee/regions" element={<HerosFee section="regions-lieux" />} />
        <Route path="/creation/univers-narratifs/fable-heros-fee/regions-lieux" element={<HerosFee section="regions-lieux" />} />
        <Route path="/creation/univers-narratifs/fable-heros-fee/objets" element={<HerosFee section="objets" />} />
        <Route path="/creation/univers-narratifs/fable-heros-fee/factions" element={<HerosFee section="factions" />} />
        <Route path="/creation/univers-narratifs/fable-heros-fee/races" element={<HerosFee section="races" />} />
        <Route path="/creation/univers-narratifs/fable-heros-fee/evenements-historiques" element={<HerosFee section="evenements" />} />
        <Route path="/creation/univers-narratifs/fable-heros-fee/bestiaires" element={<HerosFee section="bestiaires" />} />
        <Route path="/creation/univers-narratifs/fable-heros-fee/celebrations-fetes" element={<HerosFee section="celebrations" />} />
        <Route path="/creation/univers-narratifs/fable-heros-fee/cosmogonies" element={<HerosFee section="cosmogonies" />} />
        <Route path="/creation/univers-narratifs/fable-heros-fee/moodboard" element={<HerosFee section="moodboard" />} />

        {/* Routes pour Le Héros à la Flamme Imaginaire */}
        <Route path="/creation/univers-narratifs/flamme-imaginaire" element={<FlammeImaginaire />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/personnages" element={<FlammeImaginaire section="personnages" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/personnages/:slug" element={<FlammeImaginaire section="personnages" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/regions" element={<FlammeImaginaire section="regions-lieux" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/regions-lieux" element={<FlammeImaginaire section="regions-lieux" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/objets" element={<FlammeImaginaire section="objets" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/concepts" element={<FlammeImaginaire section="concepts" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/factions" element={<FlammeImaginaire section="factions" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/creatures" element={<FlammeImaginaire section="creatures" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/bestiaires" element={<FlammeImaginaire section="creatures" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/evenements" element={<FlammeImaginaire section="evenements" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/dogmes" element={<FlammeImaginaire section="dogmes" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/traditions" element={<FlammeImaginaire section="traditions" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/celebrations" element={<FlammeImaginaire section="celebrations" />} />

        {/* Routes pour Vince de Belii */}
        <Route path="/creation/univers-narratifs/vince-belii" element={<VinceDeBelii />} />
        <Route path="/creation/univers-narratifs/vince-belii/personnages" element={<VinceDeBelii section="personnages" />} />
        <Route path="/creation/univers-narratifs/vince-belii/personnages/:slug" element={<VinceDeBelii section="personnages" />} />
        <Route path="/creation/univers-narratifs/vince-belii/familles" element={<VinceDeBelii section="familles" />} />
        <Route path="/creation/univers-narratifs/vince-belii/lieux" element={<VinceDeBelii section="lieux" />} />
        <Route path="/creation/univers-narratifs/vince-belii/regions" element={<VinceDeBelii section="lieux" />} />
        <Route path="/creation/univers-narratifs/vince-belii/factions" element={<VinceDeBelii section="familles" />} />
        <Route path="/creation/univers-narratifs/vince-belii/bestiaires" element={<VinceDeBelii />} />
        <Route path="/creation/univers-narratifs/vince-belii/moodboard" element={<VinceDeBelii section="moodboard" />} />

        {/* Routes pour La Pandémie de Lara */}
        <Route path="/creation/univers-narratifs/pandemie-lara" element={<PandemieLara />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/personnages" element={<PandemieLara section="personnages" />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/personnages/:slug" element={<PandemieLara section="personnages" />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/regions" element={<PandemieLara section="regions-lieux" />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/regions-lieux" element={<PandemieLara section="regions-lieux" />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/objets" element={<PandemieLara section="objets" />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/factions" element={<PandemieLara section="factions" />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/bestiaires" element={<PandemieLara section="bestiaires" />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/moodboard" element={<PandemieLara section="moodboard" />} />

        {/* Routes principales pour les sections */}
        <Route path="/creation/labo" element={<Labo />} />
        <Route path="/creation/studio" element={<Studio />} />
        <Route path="/creation/atelier" element={<Atelier />} />

        {/* Routes pour le Labo */}
        <Route path="/creation/labo/design" element={<LabDesign />} />
        <Route path="/creation/labo/design/ui-ux" element={<LabDesign section="ui-ux" />} />
        <Route path="/creation/labo/design/prototypes" element={<LabDesign section="prototypes" />} />
        <Route path="/creation/labo/dev" element={<LabDev />} />
        <Route path="/creation/labo/dev/demo-web" element={<LabDev section="demo-web" />} />
        <Route path="/creation/labo/dev/prototypes-jeu" element={<LabDev section="prototypes-jeu" />} />
          <Route path="/creation/labo/dev/portfolio-web" element={<LabDev section="portfolio-web" />} />
        <Route path="/creation/labo/academique" element={<LabAcademique />} />
        <Route path="/creation/labo/academique/presentations-cnam" element={<LabAcademique section="presentations-cnam" />} />
        <Route path="/creation/labo/academique/little-archaeologist" element={<LittleArchaeologist />} />
        <Route path="/creation/labo/academique/bibliapp" element={<BibliApp />} />

        {/* Routes pour le Studio */}
        <Route path="/creation/studio/video" element={<YouTubeStudioDashboard />} />
        <Route path="/creation/studio/video/videos" element={
          import.meta.env.VITE_YOUTUBE_API_KEY ? 
          <YouTubeStudioVideo section="videos" /> : 
          <StudioVideo section="youtube" />
        } />
        <Route path="/creation/studio/video/shorts" element={
          import.meta.env.VITE_YOUTUBE_API_KEY ? 
          <YouTubeStudioVideo section="shorts" /> : 
          <StudioVideo section="reels" />
        } />
        <Route path="/creation/studio/video/miniatures" element={<StudioVideo section="miniatures" />} />
        
        {/* Routes pour Twitch */}
        <Route path="/creation/studio/twitch" element={<TwitchStudioDashboard />} />
        <Route path="/creation/studio/twitch/streams" element={<TwitchStreams />} />
        <Route path="/creation/studio/twitch/clips" element={<TwitchClips />} />
        
        <Route path="/creation/studio/social" element={<StudioSocial />} />
        <Route path="/creation/studio/social/threads-twitter" element={<StudioSocial section="twitter" />} />
        <Route path="/creation/studio/branding" element={<StudioBranding />} />
        <Route path="/creation/studio/branding/identite-visuelle" element={<StudioBranding section="identite" />} />
        <Route path="/creation/studio/branding/templates" element={<StudioBranding section="templates" />} />
        <Route path="/creation/studio/branding/miniatures" element={<StudioBranding section="miniatures" />} />

        {/* Routes pour l'Atelier */}
        <Route path="/creation/atelier/traditionnel" element={<ArtTraditionnel />} />
        <Route path="/creation/atelier/traditionnel/illustrations-finalisees" element={<IllustrationsFinalisees />} />
        <Route path="/creation/atelier/traditionnel/etudes-progression" element={<EtudesProgression />} />
        <Route path="/creation/atelier/traditionnel/croquis-roughs" element={<CroquisRoughs />} />
        <Route path="/creation/atelier/numerique" element={<Atelier />} />
        <Route path="/creation/atelier/3d" element={<Atelier />} />
        <Route path="/creation/atelier/wip" element={<Atelier />} />
        
        {/* Route temporaire pour trouver l'ID de chaîne YouTube */}
        <Route path="/find-channel-id" element={<ChannelIdFinder />} />
        
        {/* Routes alternatives pour debug */}
        <Route path="/full-dashboard" element={<YouTubeStudioDashboard />} />
        <Route path="/simple-dashboard" element={<YouTubeStudioDashboardSimple />} />
          <Route path="/test-apis" element={
            <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">🔧 Diagnostic APIs</h1>
                <div className="space-y-6">
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">📺 Configuration YouTube</h2>
                    <div className="space-y-2 font-mono text-sm">
                      <p>VITE_YOUTUBE_API_KEY: {import.meta.env.VITE_YOUTUBE_API_KEY ? '✅ Configuré' : '❌ Manquant'}</p>
                      <p>VITE_YOUTUBE_CHANNEL_ID: {import.meta.env.VITE_YOUTUBE_CHANNEL_ID || '❌ Manquant'}</p>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">🟣 Configuration Twitch</h2>
                    <div className="space-y-2 font-mono text-sm">
                      <p>VITE_TWITCH_CLIENT_ID: {import.meta.env.VITE_TWITCH_CLIENT_ID ? '✅ Configuré' : '❌ Manquant'}</p>
                      <p>VITE_TWITCH_CLIENT_SECRET: {import.meta.env.VITE_TWITCH_CLIENT_SECRET ? '✅ Configuré' : '❌ Manquant'}</p>
                      <p>VITE_TWITCH_USERNAME: {import.meta.env.VITE_TWITCH_USERNAME || '❌ Manquant'}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="mb-4">Ouvrez la console développeur (F12) pour voir les logs détaillés</p>
                    <a href="/creation/studio/video" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded mr-4">Tester YouTube Dashboard</a>
                    <a href="/creation/studio/twitch" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded">Tester Twitch Dashboard</a>
                  </div>
                </div>
              </div>
            </div>
          } />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
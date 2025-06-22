import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Projects from './Components/Projects';
import ProjectDetail from './Components/ProjectDetail';

// Import des composants pour les univers narratifs
import UniversNarratifs from './Components/Univers/UniversNarratifs';
import HerosFee from './Components/Univers/herosfée/HerosFee';
import VinceDeBelii from './Components/Univers/vincedebelii/VinceDeBelii';
import PandemieLara from './Components/Univers/pandémielara/PandemieLara';
import FlammeImaginaire from './Components/Univers/flammeimaginaire/FlammeImaginaire';

// Import des composants du Labo
import LabDesign from './Components/Labo/LabDesign';
import LabDev from './Components/Labo/LabDev';
import LabAcademique from './Components/Labo/LabAcademique';

// Import des composants du Studio
import StudioVideo from './Components/Studio/StudioVideo';
import StudioSocial from './Components/Studio/StudioSocial';
import StudioBranding from './Components/Studio/StudioBranding';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
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
        <Route path="/creation/univers-narratifs/flamme-imaginaire/regions-lieux" element={<FlammeImaginaire section="regions-lieux" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/objets" element={<FlammeImaginaire section="objets" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/concepts" element={<FlammeImaginaire section="concepts" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/factions" element={<FlammeImaginaire section="factions" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/creatures" element={<FlammeImaginaire section="creatures" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/evenements" element={<FlammeImaginaire section="evenements" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/dogmes" element={<FlammeImaginaire section="dogmes" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/traditions" element={<FlammeImaginaire section="traditions" />} />
        <Route path="/creation/univers-narratifs/flamme-imaginaire/celebrations" element={<FlammeImaginaire section="celebrations" />} />

        {/* Routes pour Vince de Belii */}
        <Route path="/creation/univers-narratifs/vince-belii" element={<VinceDeBelii />} />
        <Route path="/creation/univers-narratifs/vince-belii/personnages" element={<VinceDeBelii section="personnages" />} />
        <Route path="/creation/univers-narratifs/vince-belii/familles" element={<VinceDeBelii section="familles" />} />
        <Route path="/creation/univers-narratifs/vince-belii/lieux" element={<VinceDeBelii section="lieux" />} />
        <Route path="/creation/univers-narratifs/vince-belii/moodboard" element={<VinceDeBelii section="moodboard" />} />

        {/* Routes pour La Pandémie de Lara */}
        <Route path="/creation/univers-narratifs/pandemie-lara" element={<PandemieLara />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/personnages" element={<PandemieLara section="personnages" />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/regions-lieux" element={<PandemieLara section="regions-lieux" />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/objets" element={<PandemieLara section="objets" />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/factions" element={<PandemieLara section="factions" />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/bestiaires" element={<PandemieLara section="bestiaires" />} />
        <Route path="/creation/univers-narratifs/pandemie-lara/moodboard" element={<PandemieLara section="moodboard" />} />

        {/* Routes pour le Labo */}
        <Route path="/creation/labo/design/ui-ux" element={<LabDesign section="ui-ux" />} />
        <Route path="/creation/labo/design/prototypes" element={<LabDesign section="prototypes" />} />
        <Route path="/creation/labo/dev/demo-web" element={<LabDev section="demo-web" />} />
        <Route path="/creation/labo/dev/prototypes-jeu" element={<LabDev section="prototypes-jeu" />} />
        <Route path="/creation/labo/academique/presentations-cnam" element={<LabAcademique section="presentations-cnam" />} />

        {/* Routes pour le Studio */}
        <Route path="/creation/studio/video/videos-youtube" element={<StudioVideo section="youtube" />} />
        <Route path="/creation/studio/video/reels-shorts" element={<StudioVideo section="reels" />} />
        <Route path="/creation/studio/video/miniatures" element={<StudioVideo section="miniatures" />} />
        <Route path="/creation/studio/social/threads-twitter" element={<StudioSocial section="twitter" />} />
        <Route path="/creation/studio/branding/identite-visuelle" element={<StudioBranding section="identite" />} />
        <Route path="/creation/studio/branding/templates" element={<StudioBranding section="templates" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import React, { useState } from 'react';
import projects from './projectsData';
import { ProjectCard } from './ProjectCard';

// Définition des tabs principaux et de leurs sous-filtres
const TABS = [
  {
    label: 'Arts Visuels',
    subFilters: ['Graphisme', 'Animation 2D', 'Animation 3D', 'Illustrations', 'Roman']
  },
  {
    label: 'Développement & Tech',
    subFilters: ['Javascript', 'Java', 'React']
  },
  {
    label: 'Vidéaste',
    subFilters: ['YouTube', 'Tik Tok', 'Twitch']
  }
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState(TABS[0].label);
  const [activeSub, setActiveSub] = useState('Tous');

  // Sous-filtres du tab sélectionné
  const currentTab = TABS.find(tab => tab.label === activeTab);
  const subFilters = ['Tous', ...currentTab.subFilters];

  // Projets filtrés par groupe principal
  const filteredByTab = projects.filter(p => p.mainCategory === activeTab);

  // Puis filtrés par sous-catégorie
  const filtered =
    activeSub === 'Tous'
      ? filteredByTab
      : filteredByTab.filter(p =>
          Array.isArray(p.subCategory)
            ? p.subCategory.includes(activeSub)
            : p.subCategory === activeSub
        );

  return (
    <section className="project" id="projects">
      <div className="px-6 py-10">
        {/* Tabs principaux */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-black/80 rounded-full overflow-hidden shadow-lg">
            {TABS.map(tab => (
              <button
                key={tab.label}
                className={`px-8 py-3 font-semibold transition-all duration-200 focus:outline-none
                  ${activeTab === tab.label
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                    : "bg-transparent text-white hover:bg-purple-700/40"}
                  ${tab.label === TABS[0].label ? "rounded-l-full" : ""}
                  ${tab.label === TABS[TABS.length-1].label ? "rounded-r-full" : ""}
                `}
                onClick={() => {
                  setActiveTab(tab.label);
                  setActiveSub('Tous');
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Barre de sous-filtres */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white/90 rounded-full overflow-hidden shadow border border-gray-200">
            {subFilters.map(sub => (
              <button
                key={sub}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none
                  ${activeSub === sub
                    ? "bg-purple-600 text-white"
                    : "bg-transparent text-purple-600 hover:bg-purple-100"}
                  ${sub === subFilters[0] ? "rounded-l-full" : ""}
                  ${sub === subFilters[subFilters.length-1] ? "rounded-r-full" : ""}
                `}
                onClick={() => setActiveSub(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">Aucun projet dans cette catégorie.</div>
          ) : (
            filtered.map((project, idx) => (
              <ProjectCard
                key={project.title + idx}
                title={project.title}
                description={project.description}
                imgUrl={project.imgUrl}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
} 
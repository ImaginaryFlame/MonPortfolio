import React, { useState } from 'react';

const Modal = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
         onClick={onClose}>
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
           onClick={e => e.stopPropagation()}>
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2
                       hover:bg-white transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-[40vh] object-cover object-center"
          />
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{project.title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {project.content}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full 
                         text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Détails du projet</h3>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg 
                             font-semibold transition-all duration-300 
                             hover:bg-gray-800 hover:shadow-lg">
              Voir plus de détails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { 
      title: "Design & Illustration", 
      content: "Création d'illustrations digitales et de designs pour divers projets créatifs. Spécialisation dans l'art digital et la conception graphique.",
      image: "/assets/co234.webp",
      tags: ["Digital Art", "Illustration", "Design"]
    },
    { 
      title: "Character Design", 
      content: "Conception et création de personnages originaux. Focus sur l'expression et le style unique de chaque personnage.",
      image: "/assets/co327.webp",
      tags: ["Character Design", "Concept Art"]
    },
    { 
      title: "Concept Art", 
      content: "Développement visuel de concepts et d'univers imaginaires. Création d'ambiances et d'atmosphères uniques.",
      image: "/assets/co342_copy.webp",
      tags: ["Concept Art", "Environment Design"]
    },
    { 
      title: "Digital Painting", 
      content: "Réalisation de peintures numériques détaillées. Exploration de différents styles et techniques.",
      image: "/assets/co250p.webp",
      tags: ["Digital Painting", "Art"]
    },
    { 
      title: "Illustrations Créatives", 
      content: "Création d'illustrations narratives et expressives. Mélange de techniques traditionnelles et digitales.",
      image: "/assets/21comms_for_Imaginary_Flame.webp",
      tags: ["Illustration", "Creative"]
    },
    { 
      title: "Fan Art", 
      content: "Réinterprétation artistique d'œuvres et de personnages populaires. Hommage créatif à la culture pop.",
      image: "/assets/F7xrYybWcAEztt2.webp",
      tags: ["Fan Art", "Digital Art"]
    }
  ];

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-fixed" 
         style={{ backgroundImage: "url('/assets/co298.webp')" }}>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto py-16 px-8">
        <h2 className="text-3xl font-bold text-white mb-12">
          Mes Projets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              onClick={() => setSelectedProject(project)}
              className="bg-white/90 backdrop-blur-lg rounded-xl overflow-hidden 
                         shadow-lg transform transition-all duration-300 
                         hover:-translate-y-2 cursor-pointer group"
            >
              <div className="h-64 w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center 
                             transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {project.content}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full 
                               text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full bg-black/40 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Intéressé par une collaboration ?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            N'hésitez pas à me contacter pour discuter de vos projets.
          </p>
          <button className="px-8 py-3 bg-white text-gray-900 rounded-lg 
                            font-semibold transition-all duration-300 
                            hover:bg-gray-100 hover:shadow-lg">
            Me Contacter
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal 
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Home;

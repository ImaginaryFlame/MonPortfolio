// Imports
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Définition des données des univers
const universeItems = [
    {
        title: "Le Héros à la Flamme Imaginaire",
        path: "/univers/flamme-imaginaire",
        isMainSeries: true,
        timelines: ["hero-fairy"],
        submenu: [
            { title: "Personnages", path: "/univers/flamme-imaginaire/characters" },
            { title: "Mondes, territoires et lieux", path: "/univers/flamme-imaginaire/locations" },
            { title: "Evènements et fêtes", path: "/univers/flamme-imaginaire/events" },
            { title: "Objets, armes et équipements", path: "/univers/flamme-imaginaire/objects" },
            { title: "Légendes et mythes", path: "/univers/flamme-imaginaire/legends" },
            { title: "Groupes, familles, équipes et organisations", path: "/univers/flamme-imaginaire/groups" },
            { title: "Races et peuples", path: "/univers/flamme-imaginaire/races" },
            { title: "Histoire et chronologie", path: "/univers/flamme-imaginaire/history" },
            { title: "Moodboard", path: "/univers/flamme-imaginaire/moodboard" },
            { title: "Moyens de locomotion", path: "/univers/flamme-imaginaire/transport" }
        ]
    },
    {
        title: "La Fable du Héros et la Fée",
        path: "/univers/hero-fairy",
        isAlternateTimeline: true,
        parentUniverse: "flamme-imaginaire",
        timelines: ["hero-fairy"],
        submenu: [
            { title: "Personnages", path: "/univers/hero-fairy/characters" },
            { title: "Mondes, territoires et lieux", path: "/univers/hero-fairy/locations" },
            { title: "Evènements et fêtes", path: "/univers/hero-fairy/events" },
            { title: "Objets, armes et équipements", path: "/univers/hero-fairy/objects" },
            { title: "Légendes et mythes", path: "/univers/hero-fairy/legends" },
            { title: "Groupes, familles, équipes et organisations", path: "/univers/hero-fairy/groups" },
            { title: "Races et peuples", path: "/univers/hero-fairy/races" },
            { title: "Histoire et chronologie", path: "/univers/hero-fairy/history" },
            { title: "Moodboard", path: "/univers/hero-fairy/moodboard" },
            { title: "Moyens de locomotion", path: "/univers/hero-fairy/transport" }
        ]
    },
    {
        title: "Vince de Belii",
        path: "/univers/vince-belii",
        isSideStory: true,
        submenu: [
            { title: "Personnages", path: "/univers/vince-belii/characters" },
            { title: "Mondes, territoires et lieux", path: "/univers/vince-belii/locations" },
            { title: "Evènements et fêtes", path: "/univers/vince-belii/events" },
            { title: "Moodboard", path: "/univers/vince-belii/moodboard" }
        ]
    }
];

const Navbar = () => {
    // États pour gérer l'ouverture/fermeture des menus
    const [isUniversMenuOpen, setIsUniversMenuOpen] = useState(false);
    const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState(false);
    const [activeUniverse, setActiveUniverse] = useState(null);

    // Gestionnaires d'événements pour le menu Univers
    const handleUniversMenuEnter = () => setIsUniversMenuOpen(true);
    const handleUniversMenuLeave = () => {
        setIsUniversMenuOpen(false);
        setActiveUniverse(null);
    };

    // Gestionnaires d'événements pour le menu Projets
    const handleProjectsMenuEnter = () => setIsProjectsMenuOpen(true);
    const handleProjectsMenuLeave = () => setIsProjectsMenuOpen(false);

    // Gestionnaire pour les sous-menus des univers
    const handleUniverseEnter = (universeTitle) => setActiveUniverse(universeTitle);

    return (
        <nav className="fixed w-full bg-bg-darker/80 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-primary hover:text-primary-light transition-colors">
                            BH Universe
                        </Link>
                    </div>

                    {/* Menu principal */}
                    <div className="flex space-x-8">
                        {/* Menu Univers */}
                        <div 
                            className="relative"
                            onMouseEnter={handleUniversMenuEnter}
                            onMouseLeave={handleUniversMenuLeave}
                        >
                            <button className="text-white hover:text-primary transition-colors">
                                Univers
                            </button>

                            {/* Dropdown menu Univers */}
                            {isUniversMenuOpen && (
                                <div className="absolute left-0 mt-2 w-64 bg-bg-darker border border-border rounded-lg shadow-lg">
                                    {universeItems.map((universe) => (
                                        <div 
                                            key={universe.path}
                                            className="relative"
                                            onMouseEnter={() => handleUniverseEnter(universe.title)}
                                        >
                                            <Link
                                                to={universe.path}
                                                className="block px-4 py-2 text-white hover:bg-bg-dark hover:text-primary transition-colors"
                                            >
                                                {universe.title}
                                            </Link>

                                            {/* Sous-menu pour chaque univers */}
                                            {activeUniverse === universe.title && (
                                                <div className="absolute left-full top-0 w-64 bg-bg-darker border border-border rounded-lg shadow-lg">
                                                    {universe.submenu.map((item) => (
                                                        <Link
                                                            key={item.path}
                                                            to={item.path}
                                                            className="block px-4 py-2 text-white hover:bg-bg-dark hover:text-primary transition-colors"
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Menu Projets */}
                        <div 
                            className="relative"
                            onMouseEnter={handleProjectsMenuEnter}
                            onMouseLeave={handleProjectsMenuLeave}
                        >
                            <button className="text-white hover:text-primary transition-colors">
                                Projets
                            </button>

                            {/* Dropdown menu Projets */}
                            {isProjectsMenuOpen && (
                                <div className="absolute left-0 mt-2 w-48 bg-bg-darker border border-border rounded-lg shadow-lg">
                                    <Link
                                        to="/projets/bms-talents"
                                        className="block px-4 py-2 text-white hover:bg-bg-dark hover:text-primary transition-colors"
                                    >
                                        BMS Talents
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Liens directs */}
                        <Link 
                            to="/contact" 
                            className="text-white hover:text-primary transition-colors"
                        >
                            Contact
                        </Link>
                        <Link 
                            to="/about"
                            className="text-white hover:text-primary transition-colors"
                        >
                            À propos
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

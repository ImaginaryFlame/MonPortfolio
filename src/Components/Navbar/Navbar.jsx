// Imports
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Données de navigation simplifiées
const navItems = {
  univers: [
    {
      title: "Le Héros à la Flamme Imaginaire",
      path: "/univers/flamme-imaginaire"
    },
    {
      title: "La Fable du Héros et la Fée",
      path: "/univers/hero-fairy"
    },
    {
      title: "Vince de Belii",
      path: "/univers/vince-belii"
    }
  ],
  projets: [
    {
      title: "BMS Talents",
      path: "/projets/bms-talents"
    }
  ]
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-bg-darker shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold text-primary">BH Universe</span>
          </Link>

          {/* Bouton Menu Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-primary"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/univers"
              className="text-black hover:text-primary transition-colors"
            >
              Univers
            </Link>
            <Link 
              to="/projets"
              className="text-black hover:text-primary transition-colors"
            >
              Projets
            </Link>
            <Link 
              to="/contact"
              className="text-black hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link 
              to="/about"
              className="text-black hover:text-primary transition-colors"
            >
              À propos
            </Link>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pb-4`}>
          <div className="flex flex-col space-y-3">
            <Link 
              to="/univers"
              className="text-white hover:text-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              Univers
            </Link>
            <Link 
              to="/projets"
              className="text-white hover:text-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              Projets
            </Link>
            <Link 
              to="/contact"
              className="text-white hover:text-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link 
              to="/about"
              className="text-white hover:text-primary transition-colors py-2"
              onClick={toggleMenu}
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

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLanguage } from '../hooks/useLanguage.jsx';
import { 
  faGithub, 
  faLinkedin, 
  faTwitter, 
  faInstagram, 
  faYoutube, 
  faTwitch, 
  faTiktok, 
  faDiscord 
} from '@fortawesome/free-brands-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center transform transition-all duration-500 ease-out hover:scale-110 hover:rotate-12 hover:shadow-lg overflow-hidden mb-4">
            <img 
              src="/assets/img/20220726_002242.webp" 
              alt="Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Réseaux sociaux principaux */}
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a 
              href="https://linktw.in/CxYRUG" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a 
              href="https://linktw.in/WIyRoG" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a 
              href="https://linktw.in/AKQspA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faTwitch} size="2x" />
            </a>
            <a 
              href="https://linktw.in/hmTRVU" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faTiktok} size="2x" />
            </a>
            <a 
              href="https://linktw.in/MTfPjC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a 
              href="https://linktw.in/PcOolF" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a 
              href="https://discord.gg/GrCeKzTjfC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faDiscord} size="2x" />
            </a>
          </div>

          {/* Réseaux de dessin */}
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a 
              href="https://linktw.in/JTYaRc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
              <FontAwesomeIcon icon={faPencil} size="1x" />
            </a>
            <a 
              href="https://linktw.in/yfllTc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
              <FontAwesomeIcon icon={faPencil} size="1x" />
            </a>
            <a 
              href="https://linktw.in/jGETsf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faTiktok} size="2x" />
              <FontAwesomeIcon icon={faPencil} size="1x" />
            </a>
          </div>

          {/* Linktree */}
          <a 
            href="https://linktr.ee/ImaginaryFlame" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-300 mb-4"
          >
            <img 
              src="/assets/img/linktree-logo-icon.svg" 
              alt="Linktree" 
              className="w-8 h-8 hover:scale-110 transition-transform duration-300"
            />
          </a>

          <p className="text-center">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faGithub, 
  faLinkedin, 
  faTwitter, 
  faInstagram, 
  faYoutube, 
  faTwitch, 
  faTiktok, 
  faDiscord 
} from '@fortawesome/free-brands-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { LanguageProvider } from './hooks/useLanguage.jsx'

// Ajout des icônes à la bibliothèque
library.add(
  faGithub, 
  faLinkedin, 
  faTwitter, 
  faInstagram, 
  faYoutube, 
  faTwitch, 
  faTiktok, 
  faDiscord,
  faPencil
)

// Système anti-FOUC amélioré
const removeFlashOfUnstyledContent = () => {
  // Marquer immédiatement comme chargé si déjà prêt
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    document.documentElement.classList.add('loaded');
  } else {
    // Sinon attendre le chargement
    document.addEventListener('DOMContentLoaded', () => {
      document.documentElement.classList.add('loaded');
    });
  }
  
  // Fallback pour s'assurer que la page s'affiche même en cas de problème
  setTimeout(() => {
    if (!document.documentElement.classList.contains('loaded')) {
      document.documentElement.classList.add('loaded');
    }
  }, 100);
};

// Exécuter immédiatement
removeFlashOfUnstyledContent();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)

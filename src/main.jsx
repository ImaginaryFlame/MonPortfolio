import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

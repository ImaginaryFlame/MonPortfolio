import React, { useState } from 'react';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pour l'instant, on simule juste un envoi
    alert('Merci pour votre message ! Je vous répondrai bientôt.');
    setFormData({
      nom: '',
      email: '',
      sujet: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header avec espacement pour la navbar */}
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              Me contacter
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              N'hésitez pas à me contacter pour toute collaboration, question ou simplement pour discuter !
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6">Envoyer un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nom" className="block text-gray-300 mb-2">Nom *</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="sujet" className="block text-gray-300 mb-2">Sujet *</label>
                  <input
                    type="text"
                    id="sujet"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
                    placeholder="Sujet de votre message"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-black/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors resize-none"
                    placeholder="Votre message..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-lg hover:from-orange-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Informations de contact et réseaux sociaux */}
            <div className="space-y-8">
              {/* Informations personnelles */}
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Informations</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faEnvelope} className="text-orange-400 text-xl" />
                    <span className="text-gray-300">contact@imaginaire-flame.fr</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-orange-400 text-xl" />
                    <span className="text-gray-300">France</span>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Retrouvez-moi sur</h3>
                
                {/* Réseaux principaux */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <a 
                    href="https://linktw.in/CxYRUG" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-black/40 rounded-lg hover:bg-red-600/20 hover:border-red-400/50 border border-transparent transition-all duration-300 group"
                  >
                    <FontAwesomeIcon icon={faYoutube} className="text-2xl text-gray-300 group-hover:text-red-400" />
                  </a>
                  <a 
                    href="https://linktw.in/WIyRoG" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-black/40 rounded-lg hover:bg-blue-600/20 hover:border-blue-400/50 border border-transparent transition-all duration-300 group"
                  >
                    <FontAwesomeIcon icon={faTwitter} className="text-2xl text-gray-300 group-hover:text-blue-400" />
                  </a>
                  <a 
                    href="https://linktw.in/AKQspA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-black/40 rounded-lg hover:bg-purple-600/20 hover:border-purple-400/50 border border-transparent transition-all duration-300 group"
                  >
                    <FontAwesomeIcon icon={faTwitch} className="text-2xl text-gray-300 group-hover:text-purple-400" />
                  </a>
                  <a 
                    href="https://linktw.in/PcOolF" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-black/40 rounded-lg hover:bg-gray-600/20 hover:border-gray-400/50 border border-transparent transition-all duration-300 group"
                  >
                    <FontAwesomeIcon icon={faGithub} className="text-2xl text-gray-300 group-hover:text-gray-400" />
                  </a>
                </div>
                
                {/* Autres réseaux */}
                <div className="grid grid-cols-4 gap-4">
                  <a 
                    href="https://linktw.in/hmTRVU" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-black/40 rounded-lg hover:bg-pink-600/20 hover:border-pink-400/50 border border-transparent transition-all duration-300 group"
                  >
                    <FontAwesomeIcon icon={faTiktok} className="text-2xl text-gray-300 group-hover:text-pink-400" />
                  </a>
                  <a 
                    href="https://linktw.in/MTfPjC" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-black/40 rounded-lg hover:bg-pink-600/20 hover:border-pink-400/50 border border-transparent transition-all duration-300 group"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="text-2xl text-gray-300 group-hover:text-pink-400" />
                  </a>
                  <a 
                    href="https://discord.gg/GrCeKzTjfC" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-black/40 rounded-lg hover:bg-indigo-600/20 hover:border-indigo-400/50 border border-transparent transition-all duration-300 group"
                  >
                    <FontAwesomeIcon icon={faDiscord} className="text-2xl text-gray-300 group-hover:text-indigo-400" />
                  </a>
                  <a 
                    href="https://linktr.ee/ImaginaryFlame" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-black/40 rounded-lg hover:bg-green-600/20 hover:border-green-400/50 border border-transparent transition-all duration-300 group"
                  >
                    <img 
                      src="/assets/img/linktree-logo-icon.svg" 
                      alt="Linktree" 
                      className="w-6 h-6 opacity-70 group-hover:opacity-100"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BibliApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const projectData = {
    title: "BibliApp",
    subtitle: "Gestion de Bibliothèque",
    description: "Application Java de gestion de bibliothèque avec interface graphique développée en Java Swing et base de données MySQL. Système complet de gestion des livres, membres et emprunts avec architecture MVC.",
    
    features: [
      {
        title: "Gestion des Livres",
        description: "Système complet de catalogage avec ajout, modification, suppression et recherche de livres. Base de données structurée avec toutes les métadonnées nécessaires."
      },
      {
        title: "Gestion des Membres",
        description: "Interface de gestion des adhérents de la bibliothèque avec création de profils, suivi des informations personnelles et historique des emprunts."
      },
      {
        title: "Système d'Emprunts",
        description: "Gestion complète des prêts avec suivi des dates, calcul automatique des retards, et système de notifications pour les échéances."
      }
    ],

    technologies: ["Java 21", "Maven", "MySQL", "Java Swing", "JDBC", "MVC Pattern", "DAO Pattern"],
    
    architecture: [
      { name: "BibliApp.java", role: "Classe principale et point d'entrée" },
      { name: "BibliAppGUI.java", role: "Interface graphique Swing" },
      { name: "Models/", role: "Livre, Membre, Emprunt - Entités métier" },
      { name: "DAO/", role: "Accès aux données et requêtes SQL" },
      { name: "DBConnection.java", role: "Connexion et configuration MySQL" }
    ],

    githubUrl: "https://github.com/ImaginaryFlame", // À mettre à jour avec votre GitHub
    
    databaseFeatures: [
      "Tables relationnelles optimisées",
      "Contraintes d'intégrité référentielle", 
      "Requêtes SQL complexes avec jointures",
      "Gestion des transactions"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-100 to-purple-200 text-gray-800 pt-20 md:pt-24">
      {/* Header avec thème informatique */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        {/* Bordure décorative */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-20"></div>
        <div className="absolute top-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto p-8 py-16">
          <div className="text-center mb-12">
            {/* Logo/Icône BibliApp */}
            <div className="inline-block mb-8 p-6 bg-white/20 rounded-2xl shadow-2xl backdrop-blur-sm border-4 border-blue-300">
              <div className="text-8xl mb-4">📚</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {projectData.title}
              </h1>
              <p className="text-xl text-blue-100">{projectData.subtitle}</p>
            </div>
            
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-6">
              {projectData.description}
            </p>

            {/* Liens externes */}
            <div className="flex justify-center gap-4 mb-8">
              <button 
                onClick={() => window.open('/assets/projects/BibliApp/', '_blank')}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                💻 Code Source Java
              </button>
              <a 
                href={projectData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🔗 GitHub Repository
              </a>
            </div>
          </div>
        </div>
        
        {/* Bordure décorative bas */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-20"></div>
        <div className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300"></div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Technologies utilisées */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-b-4 border-indigo-600 pb-2">
            🛠️ Technologies utilisées
          </h2>
          <div className="flex flex-wrap gap-3">
            {projectData.technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-indigo-200 text-indigo-900 rounded-lg border-2 border-indigo-400 hover:bg-indigo-300 transition-all duration-300 font-medium shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Fonctionnalités principales */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-b-4 border-indigo-600 pb-2">
            ✨ Fonctionnalités principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectData.features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-100 to-indigo-100 backdrop-blur-sm border-2 border-indigo-300 rounded-xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3 text-indigo-900">{feature.title}</h3>
                <p className="text-indigo-800 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture du projet */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-b-4 border-indigo-600 pb-2">
            🏗️ Architecture du projet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectData.architecture.map((component, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-purple-300 rounded-lg p-4 hover:bg-gradient-to-br hover:from-purple-200 hover:to-blue-200 hover:border-purple-400 transition-all duration-300"
              >
                <h3 className="font-bold text-purple-900 text-lg">{component.name}</h3>
                <p className="text-purple-700 text-sm mt-1">{component.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Base de données */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-b-4 border-indigo-600 pb-2">
            🗄️ Base de données MySQL
          </h2>
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-green-900">Fonctionnalités de la base de données</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectData.databaseFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-green-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Développement */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-b-4 border-indigo-600 pb-2">
            👨‍💻 Développement
          </h2>
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-900">Sivis Barros Dianpamba</h3>
            <p className="text-blue-800 leading-relaxed">
              Projet personnel de développement d'une application de gestion de bibliothèque complète. 
              Implémentation de l'architecture MVC avec pattern DAO, interface graphique Java Swing et 
              intégration d'une base de données MySQL relationnelle.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm font-medium">
                💻 Développement Solo
              </span>
              <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm font-medium">
                🎯 Architecture MVC
              </span>
              <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm font-medium">
                📊 Base de données
              </span>
            </div>
          </div>
        </div>

        {/* Bouton retour */}
        <div className="text-center">
          <Link 
            to="/creation/labo/academique"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-800 hover:to-purple-800 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ← Retour au Labo Académique
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BibliApp; 
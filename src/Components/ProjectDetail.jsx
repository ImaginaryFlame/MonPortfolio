import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client, urlFor } from '../config/sanityClient';
import { Link } from 'react-router-dom';

export default function ProjectDetail() {
  const [projectData, setProjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const query = `*[_type == "project" && slug.current == $slug][0]{
      title,
      description,
      projectUrl,
      githubUrl,
      technologies,
      image,
      images
    }`;
    client.fetch(query, { slug })
      .then((data) => {
        setProjectData(data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <p>Chargement du projet...</p>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <p>Projet non trouvé.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/projects" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors">
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux projets
        </Link>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">{projectData.title}</h1>
        <p className="text-lg text-gray-300 mb-8">{projectData.description}</p>

        {projectData.technologies && (
            <div className="flex flex-wrap gap-2 mb-8">
                {projectData.technologies.map((tech, index) => (
                    <span key={index} className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {tech}
                    </span>
                ))}
            </div>
        )}

        <div className="flex gap-4 mb-8">
            {projectData.projectUrl && <a href={projectData.projectUrl} target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">Voir le projet</a>}
            {projectData.githubUrl && <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">Code source (GitHub)</a>}
        </div>

        <h2 className="text-3xl font-bold mb-6 mt-12">Galerie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectData.image && (
                <div className="w-full h-80 overflow-hidden rounded-lg shadow-lg">
                    <img src={urlFor(projectData.image).url()} alt={`${projectData.title} - Image principale`} className="w-full h-full object-cover" />
                </div>
            )}
            {projectData.images && projectData.images.map((img, index) => (
                <div key={index} className="w-full h-80 overflow-hidden rounded-lg shadow-lg">
                    <img src={urlFor(img).url()} alt={`${projectData.title} - Image ${index + 1}`} className="w-full h-full object-cover" />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
} 
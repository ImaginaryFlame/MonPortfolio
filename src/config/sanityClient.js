import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configuration du client Sanity
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Activé pour de meilleures performances
  apiVersion: '2023-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true, // Pour éviter l'avertissement de token dans le navigateur
  // Configuration pour les requêtes cross-origin
  withCredentials: false,
  requestTagPrefix: 'sanity'
})

// Configuration pour les URLs d'images
const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

// Fonction pour récupérer tous les projets
export const fetchProjects = async () => {
  try {
    const query = `*[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      description,
      category,
      subcategory->{
        _id,
        name,
        mainCategory
      },
      image,
      images[],
      projectUrl,
      githubUrl,
      technologies[],
      featured,
      _createdAt
    }`
    
    const projects = await client.fetch(query)
    return projects
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error)
    throw error
  }
}

// Fonction pour récupérer les sous-catégories
export const fetchSubcategories = async () => {
  try {
    const query = `*[_type == "subcategory"] | order(name asc) {
      _id,
      name,
      mainCategory
    }`
    
    const subcategories = await client.fetch(query)
    return subcategories
  } catch (error) {
    console.error('Erreur lors de la récupération des sous-catégories:', error)
    throw error
  }
}

// Fonction pour récupérer les projets par catégorie
export const fetchProjectsByCategory = async (category) => {
  try {
    const query = `*[_type == "project" && category == $category] | order(_createdAt desc) {
      _id,
      title,
      description,
      category,
      subcategory->{
        _id,
        name,
        mainCategory
      },
      image,
      images[],
      projectUrl,
      githubUrl,
      technologies[],
      featured,
      _createdAt
    }`
    
    const projects = await client.fetch(query, { category })
    return projects
  } catch (error) {
    console.error('Erreur lors de la récupération des projets par catégorie:', error)
    throw error
  }
}

// Fonction pour récupérer les projets par sous-catégorie
export const fetchProjectsBySubcategory = async (subcategoryId) => {
  try {
    const query = `*[_type == "project" && subcategory._ref == $subcategoryId] | order(_createdAt desc) {
      _id,
      title,
      description,
      category,
      subcategory->{
        _id,
        name,
        mainCategory
      },
      image,
      images[],
      projectUrl,
      githubUrl,
      technologies[],
      featured,
      _createdAt
    }`
    
    const projects = await client.fetch(query, { subcategoryId })
    return projects
  } catch (error) {
    console.error('Erreur lors de la récupération des projets par sous-catégorie:', error)
    throw error
  }
} 
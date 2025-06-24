import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configuration du client Sanity
const client = createClient({
  projectId: '64yujm4t',
  dataset: 'production',
  useCdn: true, // Activé pour de meilleures performances
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true, // Pour éviter l'avertissement de token dans le navigateur
  // Configuration pour les requêtes cross-origin
  withCredentials: false,
  requestTagPrefix: 'sanity'
})

// Configuration pour les URLs d'images
const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

// Fonction utilitaire pour extraire la couleur finale d'un tag
export const getTagColor = (tag) => {
  if (!tag) return '#9CA3AF'; // Couleur par défaut (gris)
  
  if (tag.colorType === 'preset' && tag.presetColor) {
    return tag.presetColor;
  } else if (tag.colorType === 'custom' && tag.customColor?.hex) {
    return tag.customColor.hex;
  }
  
  // Fallback : utiliser l'ancienne propriété 'color' si elle existe (rétrocompatibilité)
  if (tag.color) {
    return tag.color;
  }
  
  return '#9CA3AF'; // Couleur par défaut (gris)
};

// Fonction pour récupérer les données de la page About
export const fetchAboutPage = async () => {
  try {
    const aboutPage = await client.fetch(`
      *[_type == "aboutPage"][0] {
        pageTitle,
        profileImage,
        introduction,
        techStack {
          title,
          devSkills,
          designSkills,
          postProdSkills,
          writingSkills
        },
        creativeSetup {
          title,
          mainPC,
          peripherals
        },
        mainLicense {
          title,
          description,
          influences
        },
        narrativeProjects {
          title,
          description,
          details
        },
        vision {
          title,
          bmsProject,
          longTermGoal
        }
      }
    `);
    return aboutPage;
  } catch (error) {
    console.error('Erreur lors de la récupération de la page About:', error);
    throw error;
  }
};

// Fonction pour récupérer les projets avec leurs tags et couleurs
export const fetchProjects = async () => {
  try {
    const projects = await client.fetch(`
      *[_type == "project"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        description,
        image,
        images,
        category,
        technologies,
        projectUrl,
        githubUrl,
        tags[]-> {
          _id,
          name,
          colorType,
          presetColor,
          customColor,
          // Ancienne propriété pour rétrocompatibilité
          color,
          description
        },
        _createdAt
      }
    `);
    return projects;
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    throw error;
  }
};

// Fonction pour récupérer les tags avec leurs couleurs
export const fetchTags = async () => {
  try {
    const tags = await client.fetch(`
      *[_type == "tag"] | order(name asc) {
        _id,
        name,
        colorType,
        presetColor,
        customColor,
        // Ancienne propriété pour rétrocompatibilité
        color,
        category,
        description
      }
    `);
    return tags;
  } catch (error) {
    console.error('Erreur lors de la récupération des tags:', error);
    throw error;
  }
};

export { client }

 
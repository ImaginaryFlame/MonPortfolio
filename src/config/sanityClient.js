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

// Fonction pour générer l'URL de destination d'un projet
export const getProjectDestination = (project) => {
  // 1. Vérifier d'abord si une destination personnalisée est définie
  if (project.customDestination) {
    const { destinationType, specificSection, externalUrl } = project.customDestination;
    
    switch (destinationType) {
      case 'univers':
        if (project.linkedUnivers?.slug?.current) {
          const section = specificSection ? `/${specificSection}` : '';
          return `/creation/univers-narratifs/${project.linkedUnivers.slug.current}${section}`;
        }
        return '/creation/univers-narratifs';
      
      case 'personnage':
        if (project.linkedPersonnage?.slug?.current && project.linkedUnivers?.slug?.current) {
          return `/creation/univers-narratifs/${project.linkedUnivers.slug.current}/personnages/${project.linkedPersonnage.slug.current}`;
        }
        return '/creation/univers-narratifs';
      
      case 'labo':
        const laboSection = specificSection || 'dev';
        return `/creation/labo/${laboSection}`;
      
      case 'studio':
        const studioSection = specificSection || '';
        return `/creation/studio-video${studioSection ? `/${studioSection}` : ''}`;
      
      case 'atelier':
        const atelierSection = specificSection || '';
        return `/creation/atelier${atelierSection ? `/${atelierSection}` : ''}`;
      
      case 'projets':
        return '/projets';
      
      case 'external':
        return externalUrl;
      
      default:
        return '/projets';
    }
  }

  // 2. Logique automatique basée sur les liaisons et types
  if (project.linkedUnivers?.slug?.current) {
    // Si lié à un univers, aller vers cet univers
    if (project.linkedPersonnage?.slug?.current) {
      // Si lié à un personnage spécifique, aller vers la page du personnage
      return `/creation/univers-narratifs/${project.linkedUnivers.slug.current}/personnages/${project.linkedPersonnage.slug.current}`;
    }
    
    // Sinon, déterminer la section selon le type de projet
    switch (project.projectType) {
      case 'character-design':
      case 'croquis':
        return `/creation/univers-narratifs/${project.linkedUnivers.slug.current}/personnages`;
      case 'worldbuilding':
        return `/creation/univers-narratifs/${project.linkedUnivers.slug.current}/regions`;
      case 'roman':
      case 'lore':
        return `/creation/univers-narratifs/${project.linkedUnivers.slug.current}`;
      default:
        return `/creation/univers-narratifs/${project.linkedUnivers.slug.current}`;
    }
  }

  // 3. Logique basée sur la catégorie et le type de projet
  switch (project.category) {
    case 'arts-visuels-narratifs':
      if (project.projectType === 'illustration' || project.projectType === 'croquis') {
        return '/creation/atelier/art-traditionnel';
      }
      return '/creation/univers-narratifs';
    
    case 'developpement-tech':
    case 'web-digital':
      switch (project.projectType) {
        case 'portfolio':
          return '/creation/labo/dev/portfolio-web';
        case 'website':
        case 'application':
          return '/creation/labo/dev';
        case 'api':
          return '/creation/labo/dev';
        default:
          return '/projets';
      }
    
    case 'videaste':
      if (project.youtubeUrl) {
        return project.youtubeUrl; // Redirection externe vers YouTube
      }
      return '/creation/studio-video';
    
    case 'game-development':
      return '/creation/labo/dev';
    
    default:
      return '/projets';
  }
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

// Fonction pour récupérer les projets avec leurs tags, couleurs et liaisons
export const fetchProjects = async () => {
  try {
    const projects = await client.fetch(`
      *[_type == "project" && isPublished == true] | order(priority asc, featured desc, _createdAt desc) {
        _id,
        title,
        slug,
        description,
        longDescription,
        image,
        images[] {
          asset,
          caption,
          imageType,
          hotspot,
          crop
        },
        category,
        projectType,
        technologies,
        projectUrl,
        githubUrl,
        youtubeUrl,
        status,
        startDate,
        endDate,
        featured,
        showInGallery,
        priority,
        isPublished,
        
        // Liaisons vers les univers et personnages
        linkedUnivers-> {
          _id,
          nom,
          slug,
          description
        },
        linkedPersonnage-> {
          _id,
          nom,
          slug,
          description,
          imagePortrait
        },
        linkedRegion-> {
          _id,
          nom,
          slug,
          description
        },
        
        // Destination personnalisée
        customDestination {
          destinationType,
          specificSection,
          externalUrl
        },
        
        // Tags avec leurs couleurs
        tags[]-> {
          _id,
          name,
          colorType,
          presetColor,
          customColor,
          // Ancienne propriété pour rétrocompatibilité
          color,
          category,
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

// Fonction pour récupérer les projets pour la galerie d'accueil (filtrés)
export const fetchProjectsForGallery = async () => {
  try {
    const projects = await client.fetch(`
      *[_type == "project" && isPublished == true && showInGallery == true] | order(priority asc, featured desc, _createdAt desc) [0...7] {
        _id,
        title,
        slug,
        description,
        image,
        category,
        projectType,
        technologies,
        projectUrl,
        githubUrl,
        youtubeUrl,
        featured,
        
        // Liaisons pour la redirection
        linkedUnivers-> {
          _id,
          nom,
          slug
        },
        linkedPersonnage-> {
          _id,
          nom,
          slug
        },
        
        // Destination personnalisée
        customDestination {
          destinationType,
          specificSection,
          externalUrl
        },
        
        // Tags pour l'affichage
        tags[]-> {
          _id,
          name,
          colorType,
          presetColor,
          customColor,
          color
        }
      }
    `);
    return projects;
  } catch (error) {
    console.error('Erreur lors de la récupération des projets pour la galerie:', error);
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

// Fonction pour récupérer tous les contenus pour la galerie complète avec liaisons intelligentes
export const fetchAllContentForGallery = async () => {
  try {
    const allContent = await client.fetch(`
      {
        "projects": *[_type == "project" && isPublished == true && showInGallery == true] | order(priority asc, featured desc, _createdAt desc) [0...20] {
          _id,
          _type,
          title,
          slug,
          description,
          image,
          category,
          projectType,
          technologies,
          projectUrl,
          githubUrl,
          youtubeUrl,
          featured,
          linkedUnivers-> {
            _id,
            nom,
            slug
          },
          linkedPersonnage-> {
            _id,
            nom,
            slug
          },
          customDestination {
            destinationType,
            specificSection,
            externalUrl
          },
          tags[]-> {
            _id,
            name,
            colorType,
            presetColor,
            customColor,
            color
          }
        },
        "personnages": *[_type == "personnage"] | order(_createdAt desc) [0...25] {
          _id,
          _type,
          nom,
          slug,
          description,
          imagePortrait,
          imageProfile,
          univers-> {
            _id,
            nom,
            slug
          },
          tags[]-> {
            _id,
            name,
            colorType,
            presetColor,
            customColor,
            color
          }
        },
        "bestiaires": *[_type == "bestiaire"] | order(_createdAt desc) [0...15] {
          _id,
          _type,
          nom,
          slug,
          description,
          image,
          univers-> {
            _id,
            nom,
            slug
          },
          tags[]-> {
            _id,
            name,
            colorType,
            presetColor,
            customColor,
            color
          }
        },
        "regions": *[_type == "region"] | order(_createdAt desc) [0...15] {
          _id,
          _type,
          nom,
          slug,
          description,
          image,
          carte,
          univers-> {
            _id,
            nom,
            slug
          },
          tags[]-> {
            _id,
            name,
            colorType,
            presetColor,
            customColor,
            color
          }
        },
        "univers": *[_type == "univers"] | order(_createdAt desc) [0...10] {
          _id,
          _type,
          nom,
          slug,
          description,
          imageUnivers,
          tags[]-> {
            _id,
            name,
            colorType,
            presetColor,
            customColor,
            color
          }
        },
        "factions": *[_type == "faction"] | order(_createdAt desc) [0...12] {
          _id,
          _type,
          nom,
          slug,
          description,
          logo,
          univers-> {
            _id,
            nom,
            slug
          },
          tags[]-> {
            _id,
            name,
            colorType,
            presetColor,
            customColor,
            color
          }
        }
      }
    `);
    
    // Créer un index des univers pour les liaisons
    const universIndex = new Map();
    
    // Indexer tous les univers
    allContent.univers?.forEach(univers => {
      universIndex.set(univers._id, {
        ...univers,
        linkedContent: {
          projects: [],
          personnages: [],
          bestiaires: [],
          regions: [],
          factions: []
        }
      });
    });
    
    // Normaliser tous les contenus pour avoir une structure cohérente
    const normalizedContent = [];
    
    // Projets avec liaisons enrichies
    allContent.projects?.forEach(item => {
      const universId = item.linkedUnivers?._id;
      let linkedElements = [];
      
      // Si le projet est lié à un univers et qu'il s'agit d'arts visuels narratifs
      if (universId && item.category === 'arts-visuels-narratifs') {
        // Trouver tous les éléments liés au même univers
        const relatedPersonnages = allContent.personnages?.filter(p => p.univers?._id === universId) || [];
        const relatedBestiaires = allContent.bestiaires?.filter(b => b.univers?._id === universId) || [];
        const relatedRegions = allContent.regions?.filter(r => r.univers?._id === universId) || [];
        const relatedFactions = allContent.factions?.filter(f => f.univers?._id === universId) || [];
        
        linkedElements = [
          ...relatedPersonnages.map(p => ({ type: 'personnage', data: p })),
          ...relatedBestiaires.map(b => ({ type: 'bestiaire', data: b })),
          ...relatedRegions.map(r => ({ type: 'region', data: r })),
          ...relatedFactions.map(f => ({ type: 'faction', data: f }))
        ];
        
        // Ajouter ce projet à l'index de l'univers
        if (universIndex.has(universId)) {
          universIndex.get(universId).linkedContent.projects.push(item);
        }
      }
      
      normalizedContent.push({
        ...item,
        contentType: 'project',
        displayTitle: item.title,
        displayDescription: item.description,
        displayImage: item.image,
        displayCategory: item.category || 'project',
        destinationUrl: getProjectDestination(item),
        // Informations de liaison enrichies
        linkedElements: linkedElements,
        linkedElementsCount: linkedElements.length,
        universInfo: item.linkedUnivers || null,
        isNarrativeProject: item.category === 'arts-visuels-narratifs' && universId,
        hasUniverseContext: !!universId
      });
    });
    
    // Personnages avec liaisons
    allContent.personnages?.forEach(item => {
      const universId = item.univers?._id;
      let linkedElements = [];
      
      if (universId) {
        // Trouver les projets liés au même univers
        const relatedProjects = allContent.projects?.filter(p => 
          p.linkedUnivers?._id === universId && p.category === 'arts-visuels-narratifs'
        ) || [];
        
        const relatedBestiaires = allContent.bestiaires?.filter(b => b.univers?._id === universId) || [];
        const relatedRegions = allContent.regions?.filter(r => r.univers?._id === universId) || [];
        const relatedFactions = allContent.factions?.filter(f => f.univers?._id === universId) || [];
        
        linkedElements = [
          ...relatedProjects.map(p => ({ type: 'project', data: p })),
          ...relatedBestiaires.map(b => ({ type: 'bestiaire', data: b })),
          ...relatedRegions.map(r => ({ type: 'region', data: r })),
          ...relatedFactions.map(f => ({ type: 'faction', data: f }))
        ];
        
        // Ajouter ce personnage à l'index de l'univers
        if (universIndex.has(universId)) {
          universIndex.get(universId).linkedContent.personnages.push(item);
        }
      }
      
      normalizedContent.push({
        ...item,
        contentType: 'personnage',
        displayTitle: item.nom,
        displayDescription: item.description,
        displayImage: item.imagePortrait || item.imageProfile,
        displayCategory: 'arts-visuels-narratifs',
        destinationUrl: item.univers?.slug?.current 
          ? `/creation/univers-narratifs/${item.univers.slug.current}/personnages/${item.slug?.current || ''}`
          : '/creation/univers-narratifs',
        // Informations de liaison enrichies
        linkedElements: linkedElements,
        linkedElementsCount: linkedElements.length,
        universInfo: item.univers || null,
        hasUniverseContext: !!universId
      });
    });
    
    // Bestiaires avec liaisons
    allContent.bestiaires?.forEach(item => {
      const universId = item.univers?._id;
      let linkedElements = [];
      
      if (universId) {
        const relatedProjects = allContent.projects?.filter(p => 
          p.linkedUnivers?._id === universId && p.category === 'arts-visuels-narratifs'
        ) || [];
        const relatedPersonnages = allContent.personnages?.filter(p => p.univers?._id === universId) || [];
        const relatedRegions = allContent.regions?.filter(r => r.univers?._id === universId) || [];
        const relatedFactions = allContent.factions?.filter(f => f.univers?._id === universId) || [];
        
        linkedElements = [
          ...relatedProjects.map(p => ({ type: 'project', data: p })),
          ...relatedPersonnages.map(p => ({ type: 'personnage', data: p })),
          ...relatedRegions.map(r => ({ type: 'region', data: r })),
          ...relatedFactions.map(f => ({ type: 'faction', data: f }))
        ];
        
        // Ajouter ce bestiaire à l'index de l'univers
        if (universIndex.has(universId)) {
          universIndex.get(universId).linkedContent.bestiaires.push(item);
        }
      }
      
      normalizedContent.push({
        ...item,
        contentType: 'bestiaire',
        displayTitle: item.nom,
        displayDescription: item.description,
        displayImage: item.image,
        displayCategory: 'arts-visuels-narratifs',
        destinationUrl: item.univers?.slug?.current 
          ? `/creation/univers-narratifs/${item.univers.slug.current}/bestiaires`
          : '/creation/univers-narratifs',
        // Informations de liaison enrichies
        linkedElements: linkedElements,
        linkedElementsCount: linkedElements.length,
        universInfo: item.univers || null,
        hasUniverseContext: !!universId
      });
    });
    
    // Régions avec liaisons
    allContent.regions?.forEach(item => {
      const universId = item.univers?._id;
      let linkedElements = [];
      
      if (universId) {
        const relatedProjects = allContent.projects?.filter(p => 
          p.linkedUnivers?._id === universId && p.category === 'arts-visuels-narratifs'
        ) || [];
        const relatedPersonnages = allContent.personnages?.filter(p => p.univers?._id === universId) || [];
        const relatedBestiaires = allContent.bestiaires?.filter(b => b.univers?._id === universId) || [];
        const relatedFactions = allContent.factions?.filter(f => f.univers?._id === universId) || [];
        
        linkedElements = [
          ...relatedProjects.map(p => ({ type: 'project', data: p })),
          ...relatedPersonnages.map(p => ({ type: 'personnage', data: p })),
          ...relatedBestiaires.map(b => ({ type: 'bestiaire', data: b })),
          ...relatedFactions.map(f => ({ type: 'faction', data: f }))
        ];
        
        // Ajouter cette région à l'index de l'univers
        if (universIndex.has(universId)) {
          universIndex.get(universId).linkedContent.regions.push(item);
        }
      }
      
      normalizedContent.push({
        ...item,
        contentType: 'region',
        displayTitle: item.nom,
        displayDescription: item.description,
        displayImage: item.image || item.carte,
        displayCategory: 'arts-visuels-narratifs',
        destinationUrl: item.univers?.slug?.current 
          ? `/creation/univers-narratifs/${item.univers.slug.current}/regions`
          : '/creation/univers-narratifs',
        // Informations de liaison enrichies
        linkedElements: linkedElements,
        linkedElementsCount: linkedElements.length,
        universInfo: item.univers || null,
        hasUniverseContext: !!universId
      });
    });
    
    // Univers avec leurs contenus liés
    allContent.univers?.forEach(item => {
      const universId = item._id;
      const universData = universIndex.get(universId);
      
      let linkedElements = [];
      if (universData) {
        linkedElements = [
          ...universData.linkedContent.projects.map(p => ({ type: 'project', data: p })),
          ...universData.linkedContent.personnages.map(p => ({ type: 'personnage', data: p })),
          ...universData.linkedContent.bestiaires.map(b => ({ type: 'bestiaire', data: b })),
          ...universData.linkedContent.regions.map(r => ({ type: 'region', data: r })),
          ...universData.linkedContent.factions.map(f => ({ type: 'faction', data: f }))
        ];
      }
      
      normalizedContent.push({
        ...item,
        contentType: 'univers',
        displayTitle: item.nom,
        displayDescription: item.description,
        displayImage: item.imageUnivers,
        displayCategory: 'arts-visuels-narratifs',
        destinationUrl: `/creation/univers-narratifs/${item.slug?.current || ''}`,
        // Informations de liaison enrichies
        linkedElements: linkedElements,
        linkedElementsCount: linkedElements.length,
        universInfo: { _id: item._id, nom: item.nom, slug: item.slug },
        hasUniverseContext: true,
        isUniverseHub: true
      });
    });
    
    // Factions avec liaisons
    allContent.factions?.forEach(item => {
      const universId = item.univers?._id;
      let linkedElements = [];
      
      if (universId) {
        const relatedProjects = allContent.projects?.filter(p => 
          p.linkedUnivers?._id === universId && p.category === 'arts-visuels-narratifs'
        ) || [];
        const relatedPersonnages = allContent.personnages?.filter(p => p.univers?._id === universId) || [];
        const relatedBestiaires = allContent.bestiaires?.filter(b => b.univers?._id === universId) || [];
        const relatedRegions = allContent.regions?.filter(r => r.univers?._id === universId) || [];
        
        linkedElements = [
          ...relatedProjects.map(p => ({ type: 'project', data: p })),
          ...relatedPersonnages.map(p => ({ type: 'personnage', data: p })),
          ...relatedBestiaires.map(b => ({ type: 'bestiaire', data: b })),
          ...relatedRegions.map(r => ({ type: 'region', data: r }))
        ];
        
        // Ajouter cette faction à l'index de l'univers
        if (universIndex.has(universId)) {
          universIndex.get(universId).linkedContent.factions.push(item);
        }
      }
      
      normalizedContent.push({
        ...item,
        contentType: 'faction',
        displayTitle: item.nom,
        displayDescription: item.description,
        displayImage: item.logo,
        displayCategory: 'arts-visuels-narratifs',
        destinationUrl: item.univers?.slug?.current 
          ? `/creation/univers-narratifs/${item.univers.slug.current}/factions`
          : '/creation/univers-narratifs',
        // Informations de liaison enrichies
        linkedElements: linkedElements,
        linkedElementsCount: linkedElements.length,
        universInfo: item.univers || null,
        hasUniverseContext: !!universId
      });
    });
    
    console.log('📊 Contenus récupérés avec liaisons intelligentes:', {
      total: normalizedContent.length,
      byType: {
        projects: allContent.projects?.length || 0,
        personnages: allContent.personnages?.length || 0,
        bestiaires: allContent.bestiaires?.length || 0,
        regions: allContent.regions?.length || 0,
        univers: allContent.univers?.length || 0,
        factions: allContent.factions?.length || 0
      },
      withUniverseContext: normalizedContent.filter(item => item.hasUniverseContext).length,
      narrativeProjects: normalizedContent.filter(item => item.isNarrativeProject).length,
      universeHubs: normalizedContent.filter(item => item.isUniverseHub).length
    });
    
    return normalizedContent;
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les contenus:', error);
    throw error;
  }
};

export { client }

 
export default {
    name: 'aboutPage',
    title: '📖 À Propos',
    type: 'document',
    fields: [
      {
        name: 'pageTitle',
        title: 'Titre de la page',
        type: 'string',
        initialValue: 'Imaginary Flame',
      },
      {
        name: 'profileImage',
        title: 'Image de profil',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'introduction',
        title: 'Paragraphe d\'introduction',
        type: 'text',
      },
      {
        name: 'techStack',
        title: 'Stack Technique',
        type: 'object',
        fields: [
          { name: 'title', title: 'Titre de la section', type: 'string', initialValue: 'Stack Technique' },
          { name: 'devSkills', title: 'Compétences de développement', type: 'string', initialValue: 'Java, JavaScript, C++, Unity' },
          { name: 'designSkills', title: 'Compétences 3D/2D', type: 'string', initialValue: 'Blender, Maya, Photoshop, Clip Studio Paint' },
          { name: 'postProdSkills', title: 'Compétences Post-production', type: 'string', initialValue: 'After Effects, Nuke, DaVinci Resolve, Filmora' },
          { name: 'writingSkills', title: 'Compétences Écriture', type: 'string', initialValue: 'Final Draft, Obsidian' },
        ]
      },
      {
        name: 'creativeSetup',
        title: 'Setup Créatif',
        type: 'object',
        fields: [
            { name: 'title', title: 'Titre de la section', type: 'string', initialValue: 'Setup Créatif' },
            { name: 'mainPC', title: 'PC Principal', type: 'text' },
            { name: 'peripherals', title: 'Périphériques', type: 'text' },
        ]
      },
      {
        name: 'mainLicense',
        title: 'Licence Principale',
        type: 'object',
        fields: [
            { name: 'title', title: 'Titre de la section', type: 'string', initialValue: 'Univers & Licence Principale' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'influences', title: 'Influences', type: 'text' },
        ]
      },
      {
        name: 'narrativeProjects',
        title: 'Projets Narratifs',
        type: 'object',
        fields: [
            { name: 'title', title: 'Titre de la section', type: 'string', initialValue: 'Projets Narratifs' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'details', title: 'Détails', type: 'text' },
        ]
      },
      {
        name: 'vision',
        title: 'Vision & Communauté',
        type: 'object',
        fields: [
            { name: 'title', title: 'Titre de la section', type: 'string', initialValue: 'Vision & Communauté' },
            { name: 'bmsProject', title: 'Projet BMS Talents', type: 'text' },
            { name: 'longTermGoal', title: 'Objectif à long terme', type: 'text' },
        ]
      }
    ],
  }; 
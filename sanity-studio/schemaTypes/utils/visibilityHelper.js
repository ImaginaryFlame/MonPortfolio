// Utilitaire pour les champs de visibilité des contenus
export const visibilityFields = [
  {
    name: 'featured',
    title: '⭐ Contenu mis en avant',
    type: 'boolean',
    initialValue: false,
    description: 'Afficher ce contenu en priorité'
  },
  {
    name: 'isPublished',
    title: '📖 Publié',
    type: 'boolean',
    initialValue: true,
    description: 'Contrôle si ce contenu est visible sur le site (décochez pour masquer complètement)'
  },
  {
    name: 'showInGallery',
    title: 'Afficher dans les galeries',
    type: 'boolean',
    initialValue: true,
    description: 'Afficher ce contenu dans les galeries et sections de présentation'
  },
  {
    name: 'priority',
    title: 'Priorité d\'affichage',
    type: 'number',
    validation: (Rule) => Rule.min(1).max(10),
    initialValue: 5,
    description: 'Priorité pour l\'ordre d\'affichage (1 = plus important, 10 = moins important)'
  }
];

// Fonction pour enrichir la preview avec les indicateurs de visibilité
export const enrichPreviewWithVisibility = (selection) => {
  const { featured, isPublished, title, nom, subtitle, ...rest } = selection;
  const featuredEmoji = featured ? '⭐ ' : '';
  const publishedEmoji = isPublished === false ? '👁️‍🗨️ ' : '';
  
  const displayTitle = title || nom || "Sans titre";
  const displaySubtitle = subtitle || '';
  
  return {
    ...rest,
    title: `${publishedEmoji}${featuredEmoji}${displayTitle}`,
    subtitle: displaySubtitle + (isPublished === false ? ' • 🚫 NON PUBLIÉ' : '')
  };
};

// Ordonnancement standard avec prise en compte de la visibilité
export const visibilityOrderings = [
  {
    title: 'Priorité',
    name: 'priorityDesc',
    by: [
      {field: 'priority', direction: 'asc'},
      {field: 'featured', direction: 'desc'},
      {field: '_createdAt', direction: 'desc'}
    ]
  },
  {
    title: 'Publication',
    name: 'publishedFirst',
    by: [
      {field: 'isPublished', direction: 'desc'},
      {field: 'featured', direction: 'desc'},
      {field: 'priority', direction: 'asc'}
    ]
  }
]; 
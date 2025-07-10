// Configuration standardisée pour les champs de contenu riche
export const richTextConfig = {
  // Configuration complète avec tous les styles
  full: {
    type: 'array',
    of: [{
      type: 'block',
      styles: [
        {title: 'Paragraphe', value: 'normal'},
        {title: 'Titre niveau 2', value: 'h2'},
        {title: 'Titre niveau 3', value: 'h3'},
        {title: 'Titre niveau 4', value: 'h4'},
        {title: 'Citation', value: 'blockquote'}
      ],
      lists: [
        {title: 'Puces', value: 'bullet'},
        {title: 'Numérotée', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Gras', value: 'strong'},
          {title: 'Italique', value: 'em'},
          {title: 'Souligné', value: 'underline'},
          {title: 'Code', value: 'code'}
        ],
        annotations: [
          {
            title: 'Lien',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url'
              }
            ]
          }
        ]
      }
    }]
  },

  // Configuration basique pour les descriptions courtes
  basic: {
    type: 'array',
    of: [{
      type: 'block',
      styles: [
        {title: 'Paragraphe', value: 'normal'}
      ],
      lists: [
        {title: 'Puces', value: 'bullet'},
        {title: 'Numérotée', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Gras', value: 'strong'},
          {title: 'Italique', value: 'em'},
          {title: 'Souligné', value: 'underline'}
        ]
      }
    }]
  },

  // Configuration pour les descriptions moyennes
  medium: {
    type: 'array',
    of: [{
      type: 'block',
      styles: [
        {title: 'Paragraphe', value: 'normal'},
        {title: 'Titre niveau 3', value: 'h3'},
        {title: 'Citation', value: 'blockquote'}
      ],
      lists: [
        {title: 'Puces', value: 'bullet'},
        {title: 'Numérotée', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Gras', value: 'strong'},
          {title: 'Italique', value: 'em'},
          {title: 'Souligné', value: 'underline'},
          {title: 'Important', value: 'code'}
        ]
      }
    }]
  }
};

// Fonction helper pour créer un champ de contenu riche
export function createRichTextField(config = 'basic', customOptions = {}) {
  const baseConfig = richTextConfig[config] || richTextConfig.basic;
  
  return {
    ...baseConfig,
    ...customOptions
  };
} 
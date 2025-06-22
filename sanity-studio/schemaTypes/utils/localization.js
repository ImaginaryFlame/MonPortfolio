// Fonction utilitaire pour créer des champs localisés
export const localizedField = (field) => {
  const { name, type, title, description, validation, options, ...rest } = field;
  
  return {
    name,
    title,
    type: 'object',
    fields: [
      {
        name: 'fr',
        title: 'Français',
        type,
        description,
        validation,
        options,
        ...rest
      },
      {
        name: 'en',
        title: 'English',
        type,
        description,
        validation,
        options,
        ...rest
      },
      {
        name: 'ja',
        title: '日本語',
        type,
        description,
        validation,
        options,
        ...rest
      },
      {
        name: 'pt',
        title: 'Português',
        type,
        description,
        validation,
        options,
        ...rest
      }
    ]
  };
};

// Fonction pour créer un champ localisé avec validation
export const localizedRequiredField = (field) => {
  const localizedF = localizedField(field);
  localizedF.fields = localizedF.fields.map(f => ({
    ...f,
    validation: Rule => Rule.required()
  }));
  return localizedF;
};

// Fonction pour créer un tableau de champs localisés
export const localizedArrayField = (field) => {
  const { name, type, title, description, of, ...rest } = field;
  
  return {
    name,
    title,
    type: 'object',
    fields: [
      {
        name: 'fr',
        title: 'Français',
        type: 'array',
        description,
        of,
        ...rest
      },
      {
        name: 'en',
        title: 'English',
        type: 'array',
        description,
        of,
        ...rest
      },
      {
        name: 'ja',
        title: '日本語',
        type: 'array',
        description,
        of,
        ...rest
      },
      {
        name: 'pt',
        title: 'Português',
        type: 'array',
        description,
        of,
        ...rest
      }
    ]
  };
}; 
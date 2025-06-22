export default {
  name: 'subcategory',
  title: 'Sous-catégorie',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'parentCategory',
      title: 'Catégorie parente',
      type: 'string',
      options: {
        list: [
          { title: "Arts Visuels & Narratifs", value: "arts" },
          { title: "Développement & Tech", value: "dev" },
          { title: "Vidéaste", value: "video" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
}; 
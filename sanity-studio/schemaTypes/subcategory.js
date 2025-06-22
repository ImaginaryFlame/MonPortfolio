import { localizedField, localizedRequiredField } from './utils/localization';

export default {
  name: 'subcategory',
  title: 'Sous-catégorie',
  type: 'document',
  fields: [
    localizedRequiredField({
      name: 'title',
      title: 'Titre',
      type: 'string'
    }),

    localizedField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),

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

  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'parentCategory'
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Sans titre',
        subtitle: subtitle
      };
    }
  }
}; 
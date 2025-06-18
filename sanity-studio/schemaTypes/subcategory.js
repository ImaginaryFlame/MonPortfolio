export default {
  name: "subcategory",
  title: "Subcategory",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainCategory",
      title: "Main Category",
      type: "string",
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
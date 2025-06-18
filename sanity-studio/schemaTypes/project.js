export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "category",
      title: "Category",
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
    {
      name: "subcategory",
      title: "Subcategory",
      type: "reference",
      to: [{ type: "subcategory" }],
    },
    {
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "images",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "projectUrl",
      title: "Project URL",
      type: "url",
    },
    {
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
  ],
}; 
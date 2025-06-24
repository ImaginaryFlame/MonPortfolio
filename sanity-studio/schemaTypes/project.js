export default {
  name: "project",
  title: "Projet",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required()
    },

    {
      name: "description",
      title: "Description",
      type: "text"
    },

    {
      name: "category",
      title: "Catégorie principale",
      type: "string",
      options: {
        list: [
          { title: "🎨 Arts Visuels & Narratifs", value: "arts-visuels-narratifs" },
          { title: "💻 Développement & Tech", value: "developpement-tech" },
          { title: "🎬 Vidéaste", value: "videaste" },
          { title: "🎮 Game Development", value: "game-development" },
          { title: "🌐 Web & Digital", value: "web-digital" }
        ]
      },
      validation: (Rule) => Rule.required(),
      description: "Catégorie principale de ce projet"
    },

    {
      name: "tags",
      title: "Tags de qualification",
      type: "array",
      of: [{ 
        type: "reference", 
        to: [{ type: "tag" }],
        options: {
          filter: ({ document }) => {
            // Filtrer les tags selon la catégorie du projet
            const categoryTagMapping = {
              'arts-visuels-narratifs': ['projets-arts'],
              'developpement-tech': ['projets-dev'], 
              'videaste': ['projets-video'],
              'game-development': ['projets-game'],
              'web-digital': ['projets-web']
            };
            
            const allowedCategories = document?.category ? 
              categoryTagMapping[document.category] || [] : 
              Object.values(categoryTagMapping).flat();
              
            return {
              filter: 'category in $categories',
              params: { categories: allowedCategories }
            }
          }
        }
      }],
      description: "Tags pour qualifier ce projet (ex: Frontend, API, Character Design, etc.)"
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

  preview: {
    select: {
      title: "title",
      category: "category",
      tags: "tags",
      media: "image"
    },
    prepare(selection) {
      const { title, category, tags, media } = selection;
      const categoryLabel = category ? category.replace('-', ' ') : 'Sans catégorie';
      const tagCount = tags && tags.length > 0 ? ` • ${tags.length} tag(s)` : '';
      return {
        title: title || "Sans titre",
        subtitle: `${categoryLabel}${tagCount}`,
        media: media
      };
    }
  }
}; 
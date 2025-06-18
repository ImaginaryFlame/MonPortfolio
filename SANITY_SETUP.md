# Configuration Sanity pour MonPortfolio

## Variables d'environnement requises

Ajoutez ces variables à votre fichier `.env` :

```env
# Configuration Sanity
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
```

## Schémas Sanity requis

Votre studio Sanity doit avoir les schémas suivants :

### 1. Schéma Project (`project.js`)

```javascript
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
```

### 2. Schéma Subcategory (`subcategory.js`)

```javascript
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
```

## Installation et configuration

1. **Installer Sanity CLI** (si ce n'est pas déjà fait) :

   ```bash
   npm install -g @sanity/cli
   ```

2. **Créer un nouveau projet Sanity** :

   ```bash
   sanity init
   ```

3. **Configurer les schémas** dans votre studio Sanity

4. **Déployer le studio** :

   ```bash
   sanity deploy
   ```

5. **Ajouter les variables d'environnement** dans votre fichier `.env`

## Utilisation

Le composant `Projects.jsx` a été modifié pour utiliser Sanity au lieu de Supabase. Les principales différences :

- Utilisation du client Sanity au lieu de Supabase
- Queries GROQ pour récupérer les données
- Gestion des images avec `urlFor()` de Sanity
- Structure de données adaptée aux schémas Sanity

## Migration depuis Supabase

Pour migrer vos données existantes de Supabase vers Sanity :

1. Exportez vos données depuis Supabase
2. Créez les documents correspondants dans Sanity Studio
3. Uploadez vos images dans Sanity
4. Testez les nouvelles fonctionnalités

## Note importante

Assurez-vous de supprimer l'import de `supabaseClient` et de mettre à jour toutes les références dans votre application.

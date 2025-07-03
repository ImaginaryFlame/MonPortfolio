# Guide : Système de Projets et Tags dans Sanity Studio

## 📋 Vue d'ensemble

Ce guide explique comment utiliser le système intégré de projets et tags dans votre portfolio Sanity Studio. Le système permet de :

- Créer des projets organisés par catégories
- Associer des tags colorés aux projets
- Filtrer automatiquement les tags selon la catégorie du projet
- Afficher les projets avec leurs tags dans les composants React

## 🏗️ Structure du système

### Schémas principaux

1. **`project.js`** - Schéma pour les projets
2. **`tag.js`** - Schéma pour les tags avec couleurs
3. **Liaison automatique** - Les tags sont filtrés selon la catégorie du projet

## 📊 Créer un nouveau projet

### 1. Accéder à l'interface Sanity Studio

```bash
cd sanity-studio
npm run dev
```

### 2. Créer un projet

1. Cliquez sur **"+ Créer"** → **"Projet"**
2. Remplissez les champs obligatoires :

#### Champs principaux
- **Titre** : Nom de votre projet
- **Slug** : URL-friendly généré automatiquement
- **Description courte** : Résumé en 200 caractères max
- **Description détaillée** : Description complète
- **Catégorie principale** : Sélectionnez parmi :
  - 🎨 Arts Visuels & Narratifs
  - 💻 Développement & Tech  
  - 🎬 Vidéaste
  - 🎮 Game Development
  - 🌐 Web & Digital

#### Images
- **Image principale** : Image de présentation (obligatoire)
- **Images additionnelles** : Galerie avec légendes optionnelles

#### Métadonnées
- **Tags de qualification** : Filtrés automatiquement selon la catégorie
- **Technologies utilisées** : Liste des outils/frameworks
- **Statut du projet** : En cours, Terminé, En pause, Concept, Planifié
- **Dates** : Début et fin (optionnelles)
- **URLs** : Projet en ligne et GitHub
- **Projet mis en avant** : Pour l'affichage prioritaire
- **Priorité d'affichage** : 1-10 (1 = plus important)

## 🏷️ Système de tags

### Création d'un tag

1. Cliquez sur **"+ Créer"** → **"Tag"**
2. Configurez le tag :

#### Informations de base
- **Nom du tag** : Nom affiché (ex: "Frontend", "Character Design")
- **Catégorie de projet** : Détermine dans quels projets il apparaît
- **Description** : Explication optionnelle

#### Configuration des couleurs

**Option 1 : Couleur prédéfinie**
- Sélectionnez "🎨 Couleur prédéfinie"
- Choisissez parmi les couleurs organisées par catégorie :
  - **Arts Visuels** : Violets, roses, indigos
  - **Développement** : Bleus, cyans
  - **Vidéo** : Rouges, oranges
  - **Game Dev** : Verts, émeraudes
  - **Web & Digital** : Indigos, violets foncés
  - **Neutres** : Gris, noir, blanc
  - **Spéciales** : Doré, argenté, bronze

**Option 2 : Couleur personnalisée**
- Sélectionnez "🖌️ Couleur personnalisée"
- Utilisez le color picker pour choisir une couleur exacte

### Filtrage automatique des tags

Quand vous créez ou modifiez un projet :
1. Sélectionnez d'abord la **catégorie principale**
2. Dans le champ **"Tags de qualification"**, seuls les tags de cette catégorie apparaissent
3. Cette liaison garantit la cohérence thématique

## 🔧 Utilisation dans les composants React

### Récupération des données

```javascript
import { fetchProjects, getTagColor } from '../config/sanityClient';

// Récupérer tous les projets avec leurs tags
const projects = await fetchProjects();

// Chaque projet contient :
// - project.tags[] : Array des tags liés
// - project.category : Catégorie du projet
// - project.title, description, images, etc.
```

### Affichage des tags avec couleurs

```javascript
import { getTagColor } from '../config/sanityClient';

const TagDisplay = ({ tag }) => (
  <span
    className="px-3 py-1 rounded-full text-white text-sm font-medium"
    style={{ backgroundColor: getTagColor(tag) }}
  >
    {tag.name}
  </span>
);
```

### Composants disponibles

1. **`ProjectCard.jsx`** : Carte projet complète avec tags
2. **`Projects.jsx`** : Page projets avec filtrage par tags
3. **`Home.jsx`** : Galerie projets sur la page d'accueil

## 📝 Bonnes pratiques

### Nommage des tags
- **Concis** : 1-2 mots maximum
- **Descriptif** : "Frontend" plutôt que "Front"
- **Consistant** : Même terminologie dans toute la catégorie

### Organisation par catégorie
- **Arts Visuels & Narratifs** : Character Design, Worldbuilding, Illustration, Écriture
- **Développement & Tech** : Frontend, Backend, API, Database, Mobile
- **Vidéaste** : Montage, Streaming, Post-Production, Animation
- **Game Development** : Unity, Unreal, Gameplay, Level Design
- **Web & Digital** : UI/UX, Responsive, SEO, Performance

### Couleurs recommandées
- **Par catégorie** : Utilisez les couleurs prédéfinies pour chaque domaine
- **Cohérence** : Évitez trop de variations dans une même catégorie
- **Lisibilité** : Privilégiez des couleurs contrastées avec le texte blanc

## 🔍 Filtrage et recherche

### Dans le composant Projects.jsx

Les utilisateurs peuvent :
- **Filtrer par catégorie** : Affiche uniquement les projets d'une catégorie
- **Filtrer par tags** : Combinaison multiple de tags possible
- **Recherche textuelle** : Dans titre, description, technologies
- **Réinitialiser** : Bouton pour effacer tous les filtres

### Logique de filtrage

```javascript
// Filtre par catégorie
if (selectedCategory) {
  filtered = projects.filter(project => project.category === selectedCategory);
}

// Filtre par tags (AND logic)
if (selectedTags.length > 0) {
  filtered = filtered.filter(project => 
    selectedTags.every(tagId => 
      project.tags.some(tag => tag._id === tagId)
    )
  );
}
```

## 🚀 Test et validation

### Page de test intégrée

Accédez à `/test-apis` pour voir :
- Liste complète des projets avec leurs tags
- Affichage des couleurs des tags
- Statistiques du système
- Vérification des liaisons

### Console de debug

Les composants logguent automatiquement :
```javascript
console.log('🏷️ Tags des projets:', projects.map(p => ({
  title: p.title,
  tags: p.tags?.map(tag => ({
    name: tag.name,
    color: getTagColor(tag)
  }))
})));
```

## 🔧 Maintenance

### Ajouter une nouvelle catégorie

1. **Dans `project.js`** : Ajouter l'option dans le champ `category`
2. **Dans `tag.js`** : Ajouter l'option dans le champ `category`
3. **Dans `Projects.jsx`** : Ajouter à `mainCategories` avec couleur et icône
4. **Dans `ProjectCard.jsx`** : Ajouter à `categoryConfig`

### Migrer d'anciens tags

Le système est rétrocompatible :
- `getTagColor()` gère automatiquement les anciens formats
- Migration progressive possible sans perte de données

## 📚 Références

- **Schémas** : `/sanity-studio/schemaTypes/`
- **Services** : `/src/config/sanityClient.js`
- **Composants** : `/src/Components/`
- **Test** : `/test-apis` dans l'application

---

*Ce système permet une gestion flexible et évolutive de vos projets avec une interface utilisateur optimisée pour le filtrage et la découverte de contenu.*

# Guide : Navigation dans la section "Mes Projets" et utilisation des tags

## 🎯 Affichage par défaut

### Bouton "Tous" 
- **Par défaut** : La section "Mes Projets" affiche **TOUS** les contenus disponibles
- Le bouton "Tous" (🎯) est maintenant disponible en première position
- Cliquer sur "Tous" ou sur une catégorie déjà sélectionnée revient à l'affichage complet
- Un indicateur "Affichage complet" apparaît quand aucun filtre n'est actif

### Indicateurs visuels
- **Compteur total** : Nombre total de contenus disponibles 
- **Compteur filtré** : Nombre de résultats après filtrage (si des filtres sont actifs)
- **Badge "Affichage complet"** : Confirme que tous les contenus sont visibles

## 🎨 Catégories disponibles

### 1. **Tous** (🎯)
- **Fonction** : Affiche tous les contenus sans restriction
- **Couleur** : Violet (#8B5CF6)
- **Usage** : Point de départ, vue d'ensemble complète

### 2. **Arts Visuels & Narratifs** (🎨)
- **Couleur** : Rose (#EC4899)
- **Contient** : Projets créatifs, personnages, bestiaires, régions, univers, factions
- **Fonctionnalité spéciale** : Option "Grouper par univers" disponible
- **Liaisons intelligentes** : Affiche les connexions entre éléments d'un même univers

### 3. **Développement & Tech** (💻)
- **Couleur** : Bleu (#3B82F6)
- **Contient** : Projets de programmation, applications, APIs, portfolios
- **Technologies** : Java, JavaScript, React, C++, C#, etc.

### 4. **Vidéaste** (🎬)
- **Couleur** : Rouge (#EF4444)
- **Contient** : Vidéos YouTube, montages, contenus streaming
- **Redirection** : Liens externes vers les vidéos

### 5. **Game Development** (🎮)
- **Couleur** : Vert (#10B981)
- **Contient** : Projets de jeux, prototypes, assets de jeu

### 6. **Web & Digital** (🌐)
- **Couleur** : Teal (#14B8A6)
- **Contient** : Sites web, designs numériques, interfaces

## 🔧 Système de filtrage avancé

### Navigation entre catégories
- **Clic simple** : Sélectionne une catégorie
- **Re-clic** : Désélectionne et revient à "Tous"
- **Auto-reset** : Les tags et groupements se réinitialisent à chaque changement de catégorie

### Filtres combinés
- **Catégorie + Tags** : Affinement par mots-clés spécifiques
- **Recherche textuelle** : Recherche dans titres, descriptions, univers
- **Compteurs dynamiques** : Mise à jour en temps réel des résultats

### Vue groupée (Arts Visuels & Narratifs uniquement)
- **Activation** : Bouton "Grouper par univers"
- **Fonctionnement** : Organisation par univers narratifs
- **Statistiques** : Compteurs par type d'élément
- **Orphelins** : Section séparée pour les contenus non liés

## 📊 Informations de liaison (Arts Visuels & Narratifs)

### Badges intelligents
- **🌌 Univers** : Nom de l'univers lié
- **🔗 Liaisons** : Nombre d'éléments connectés (projets narratifs)
- **⭐ Hub** : Univers central avec ses statistiques

### Effets visuels
- **Hover universel** : Gradient multicolore pour les contenus liés
- **Bordures animées** : Arc-en-ciel pour les projets narratifs
- **Navigation contextuelle** : Textes adaptatifs selon le contexte

## 💡 Conseils d'utilisation

### Pour une exploration efficace :
1. **Commencez par "Tous"** pour avoir une vue d'ensemble
2. **Filtrez par catégorie** selon vos intérêts
3. **Utilisez la recherche** pour des éléments spécifiques
4. **Explorez les liaisons** dans les Arts Visuels & Narratifs
5. **Groupez par univers** pour comprendre la cohérence narrative

### Pour les créateurs :
- **Liez vos contenus** : Utilisez les champs "Univers lié" dans Sanity
- **Tagguez intelligemment** : Tags cohérents entre projets liés
- **Vérifiez l'affichage** : Le bouton "Tous" doit montrer tous vos contenus
- **Organisez par univers** : Facilitez la navigation thématique

---

**Note** : Si tous vos projets ne s'affichent pas par défaut, vérifiez que le champ `showInGallery` est activé dans Sanity CMS pour les contenus concernés. 
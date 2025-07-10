# 🎛️ Guide : Système de Visibilité Globale

## Vue d'ensemble

Un système de visibilité unifié a été implémenté pour **tous les types de contenus** de votre studio Sanity (personnages, factions, univers, races, bestiaires, etc.) **à l'exception des tags**.

## 🎯 Objectif

Permettre de masquer/afficher n'importe quel contenu de manière granulaire, avec la même logique que les projets existants.

## 🔧 Champs de Visibilité

### Champs Disponibles

Tous les schémas disposent maintenant de ces 4 champs :

1. **⭐ Contenu mis en avant** (`featured`)
   - **Type** : Booléen
   - **Valeur par défaut** : `false`
   - **Fonction** : Priorise l'affichage du contenu

2. **📖 Publié** (`isPublished`)
   - **Type** : Booléen
   - **Valeur par défaut** : `true`
   - **Fonction** : Contrôle master - si `false`, le contenu est complètement masqué

3. **Afficher dans les galeries** (`showInGallery`)
   - **Type** : Booléen
   - **Valeur par défaut** : `true`
   - **Fonction** : Contrôle l'affichage dans les sections de présentation

4. **Priorité d'affichage** (`priority`)
   - **Type** : Nombre (1-10)
   - **Valeur par défaut** : `5`
   - **Fonction** : Ordre d'affichage (1 = plus prioritaire)

## 🚦 Logique de Visibilité

### Conditions d'Affichage

1. **Contenu visible** :
   - ✅ `isPublished = true`

2. **Contenu dans les galeries** :
   - ✅ `isPublished = true`
   - ✅ `showInGallery = true`

3. **Contenu prioritaire** :
   - ✅ `featured = true`
   - ✅ `priority = 1-3` (valeurs faibles)

## 📋 Scénarios d'Usage

### ✅ Contenu Visible et Prioritaire
```
isPublished: ✓ true
showInGallery: ✓ true
featured: ✓ true
priority: 1
```
→ **Résultat** : Visible partout, affiché en premier

### 👀 Contenu Visible Standard
```
isPublished: ✓ true
showInGallery: ✓ true
featured: ✗ false
priority: 5
```
→ **Résultat** : Visible partout, ordre standard

### 🔒 Contenu Masqué
```
isPublished: ✗ false
showInGallery: ✓ true (ignoré)
featured: ✓ true (ignoré)
priority: 1 (ignoré)
```
→ **Résultat** : **COMPLÈTEMENT MASQUÉ**

### 📊 Contenu Archivé
```
isPublished: ✓ true
showInGallery: ✗ false
featured: ✗ false
priority: 8
```
→ **Résultat** : Visible dans les listes complètes, masqué des galeries

## 🛠️ Implémentation Technique

### Utilitaire Central

Le fichier `utils/visibilityHelper.js` contient :

```javascript
// Champs réutilisables
export const visibilityFields = [...]

// Fonction pour enrichir les previews
export const enrichPreviewWithVisibility = (prepareFunction) => {...}

// Ordonnancements standards
export const visibilityOrderings = [...]
```

### Dans Chaque Schéma

```javascript
import { visibilityFields, enrichPreviewWithVisibility, visibilityOrderings } from './utils/visibilityHelper.js';

export default {
  name: 'monSchema',
  fields: [
    // ... autres champs
    ...visibilityFields
  ],
  preview: {
    select: {
      // ... autres champs
      featured: 'featured',
      isPublished: 'isPublished'
    },
    prepare: enrichPreviewWithVisibility((selection) => {
      // Logique de preview personnalisée
      return { title: '...', subtitle: '...', media: '...' };
    })
  },
  orderings: [
    ...visibilityOrderings,
    // ... autres ordonnancements
  ]
}
```

## 🔍 Indicateurs Visuels

### Dans Sanity Studio

- **👁️‍🗨️** : Contenu non publié (masqué)
- **⭐** : Contenu mis en avant
- **🚫 NON PUBLIÉ** : Statut dans le sous-titre

### Exemple d'Affichage
```
👁️‍🗨️ ⭐ Mon Personnage
Race principale • Flamme Imaginaire • 🚫 NON PUBLIÉ
```

## 📊 Ordonnancements Disponibles

### Ordonnancements Automatiques

1. **Priorité** : Par priorité croissante, puis featured, puis création
2. **Publication** : Publiés d'abord, puis par featured et priorité

### Ordonnancements Personnalisés

Chaque schéma a ses propres ordonnancements (par nom, par univers, etc.)

## 🎯 Stratégies d'Utilisation

### 1. Développement de Contenu
```
isPublished: false → Travail en cours
isPublished: true → Prêt à être vu
```

### 2. Mise en Avant Temporaire
```
featured: true → Promotion ponctuelle
featured: false → Retour normal
```

### 3. Archivage Intelligent
```
isPublished: true + showInGallery: false
→ Accessible mais non mis en avant
```

### 4. Gestion de Priorité
```
priority: 1-3 → Contenus importants
priority: 4-6 → Contenus standards
priority: 7-10 → Contenus secondaires
```

## 🚀 Schémas Concernés

### ✅ Avec Visibilité
- `personnage.js` ✓
- `faction.js` ✓
- `univers.js` ✓
- `race.js` ✓
- `bestiaires.js` ✓
- `project.js` ✓ (existant)

### ❌ Exclus
- `tag.js` ❌ (volontairement exclu)

### 🔄 À Implémenter
Les autres schémas peuvent être étendus avec le même système en important l'utilitaire.

## 💡 Bonnes Pratiques

### 1. Workflow de Publication
1. Créer avec `isPublished: false`
2. Développer le contenu
3. Réviser et valider
4. Publier avec `isPublished: true`

### 2. Gestion des Galeries
- Utiliser `showInGallery: false` pour le contenu secondaire
- Réserver `featured: true` pour les contenus exceptionnels

### 3. Hiérarchisation
- Prioriser par importance narrative
- Utiliser `priority` pour un contrôle fin de l'ordre

### 4. Maintenance
- Réviser régulièrement les contenus `featured`
- Ajuster les priorités selon l'évolution du projet

## 🔧 Extension Future

Pour ajouter la visibilité à un nouveau schéma :

1. Importer l'utilitaire
2. Ajouter `...visibilityFields` aux champs
3. Enrichir le preview avec `enrichPreviewWithVisibility`
4. Ajouter les ordonnancements avec `...visibilityOrderings`

---

**💡 Note** : Ce système est conçu pour être cohérent avec le système existant des projets, offrant une expérience utilisateur unifiée à travers tout le studio Sanity. 
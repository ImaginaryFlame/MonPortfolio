# 📖 Guide : Contrôle de Visibilité des Projets

## Vue d'ensemble

Le système de visibilité des projets permet de contrôler avec précision quels projets apparaissent sur votre site web. Vous avez maintenant un contrôle total sur la publication de vos projets.

## 🔧 Champs de Contrôle

### 1. **📖 Publié** (`isPublished`)
- **Type** : Booléen (case à cocher)
- **Valeur par défaut** : `true` (coché)
- **Fonction** : Contrôle master de la visibilité
- **Impact** : Si décoché, le projet est **complètement masqué** du site

### 2. **Afficher dans la galerie d'accueil** (`showInGallery`)
- **Type** : Booléen (case à cocher)
- **Valeur par défaut** : `true` (coché)
- **Fonction** : Contrôle l'affichage dans la galerie principale
- **Prérequis** : Le projet doit être publié (`isPublished = true`)

### 3. **⭐ Projet mis en avant** (`featured`)
- **Type** : Booléen (case à cocher)
- **Valeur par défaut** : `false` (non coché)
- **Fonction** : Donne la priorité d'affichage au projet

## 🚦 Logique de Visibilité

### Conditions pour qu'un projet apparaisse :

1. **Page "Projets" complète** :
   - ✅ `isPublished = true`
   - Peut apparaître même si `showInGallery = false`

2. **Galerie d'accueil (8 projets)** :
   - ✅ `isPublished = true`
   - ✅ `showInGallery = true`

## 📋 Scénarios d'Usage

### ✅ Projet Visible Partout
```
isPublished: ✓ true
showInGallery: ✓ true
featured: ✓ true (optionnel)
```
→ **Résultat** : Visible partout, priorité élevée

### 👀 Projet en "Preview" (Galerie seulement)
```
isPublished: ✓ true
showInGallery: ✓ true
featured: ✗ false
```
→ **Résultat** : Visible dans les deux, priorité normale

### 🔒 Projet Masqué Temporairement
```
isPublished: ✗ false
showInGallery: ✓ true (ignoré)
featured: ✓ true (ignoré)
```
→ **Résultat** : **COMPLÈTEMENT MASQUÉ**

### 📊 Projet Archivé (Page projets seulement)
```
isPublished: ✓ true
showInGallery: ✗ false
featured: ✗ false
```
→ **Résultat** : Visible uniquement dans la page projets complète

## 🎯 Stratégies Recommandées

### Pour les Nouveaux Projets
1. Créez le projet avec `isPublished = false`
2. Travaillez sur le contenu tranquillement
3. Une fois prêt, passez `isPublished = true`
4. Ajustez `showInGallery` selon votre stratégie de mise en avant

### Pour les Projets Phares
1. `isPublished = true`
2. `showInGallery = true`
3. `featured = true`
4. `priority = 1-3` (plus faible = plus prioritaire)

### Pour l'Archivage
- Gardez `isPublished = true` mais `showInGallery = false`
- Le projet reste accessible via la page projets complète
- Idéal pour maintenir l'historique sans encombrer la galerie

## 🔍 Indicateurs Visuels

Dans Sanity Studio, les projets non publiés sont marqués par :
- 👁️‍🗨️ Icône d'œil dans le titre
- 🚫 NON PUBLIÉ dans le sous-titre
- Bordure rouge dans l'aperçu

## ⚡ Mise en Application Immédiate

Les changements de visibilité sont **immédiats** :
- Décochez `isPublished` → Le projet disparaît instantanément du site
- Recochez `isPublished` → Le projet réapparaît immédiatement

## 🛠️ Cas d'Usage Pratiques

### 1. **Lancement Coordonné**
- Préparez plusieurs projets avec `isPublished = false`
- Publiez-les tous simultanément le jour J

### 2. **A/B Testing**
- Testez différentes combinations de `showInGallery`
- Observez l'impact sur l'engagement

### 3. **Maintenance**
- Désactivez temporairement un projet problématique
- Réactivez-le une fois corrigé

### 4. **Curation de Contenu**
- Adaptez votre galerie selon les saisons/thèmes
- Mettez en avant certains projets ponctuellement

---

**💡 Astuce** : Utilisez les filtres et l'ordre dans Sanity Studio pour visualiser rapidement vos projets par statut de publication ! 
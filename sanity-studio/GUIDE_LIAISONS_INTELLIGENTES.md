# Guide des Liaisons Intelligentes entre Projets Arts Visuels & Narratifs

## 🌟 Vue d'ensemble

Le système de liaisons intelligentes permet de connecter automatiquement les projets "Arts Visuels & Narratifs" avec tous les autres éléments d'univers (personnages, bestiaires, régions, factions). Cette fonctionnalité révolutionne l'expérience de navigation et la cohérence narrative du portfolio.

## 🔗 Comment ça fonctionne

### 1. Système de liaison automatique

Quand un projet est lié à un univers ET qu'il appartient à la catégorie "Arts Visuels & Narratifs" :
- Le système récupère automatiquement tous les personnages, bestiaires, régions et factions du même univers
- Ces éléments apparaissent comme "éléments liés" sur la carte du projet
- Le projet apparaît également sur tous les autres éléments du même univers

### 2. Indicateurs visuels

#### Pour les projets narratifs :
- **Badge univers** : 🌌 Nom de l'univers
- **Badge liaisons** : 🔗 X éléments liés
- **Aperçu des éléments** : Affichage des 3 premiers éléments liés (personnages, bestiaires, etc.)
- **Bordure spéciale** : Effet gradiant arc-en-ciel au hover

#### Pour les univers :
- **Badge Hub** : ⭐ Hub - X contenus
- **Icône spéciale** : Étoile animée qui apparaît au hover
- **Regroupement** : Tous les contenus de l'univers sont listés

### 3. Vue groupée par univers

Dans la catégorie "Arts Visuels & Narratifs", un bouton permet d'activer la vue groupée :
- Les contenus sont organisés par univers
- Chaque univers a son propre header avec statistiques
- Compteurs par type (projets, personnages, bestiaires, etc.)
- Section séparée pour les contenus non liés à un univers

## 📊 Statistiques intelligentes

### Panneau des univers narratifs
Quand vous sélectionnez "Arts Visuels & Narratifs", un panneau statistique apparaît :
- Nombre total d'univers
- Nombre d'éléments par univers
- Répartition par type (projets, personnages, bestiaires, etc.)
- Top 6 des univers les plus riches en contenu

### Compteurs de liaisons
- **Projets narratifs** : Affiche le nombre d'éléments d'univers liés
- **Univers hub** : Affiche le nombre total de contenus dans l'univers
- **Autres éléments** : Affiche le nombre de projets et autres éléments liés

## 🎨 Expérience utilisateur améliorée

### Navigation contextuelle
- Clic sur un projet narratif → Explore l'univers complet
- Clic sur un personnage → Va vers la page du personnage dans son univers
- Clic sur un univers → Page hub de l'univers avec tous ses éléments

### Recherche enrichie
- La recherche inclut maintenant les noms d'univers
- Filtrage par tags compatible avec tous les types de contenus
- Compteurs dynamiques qui s'adaptent au regroupement

### Effets visuels contextuels
- **Hover universel** : Gradient purple/blue/pink pour les contenus liés à un univers
- **Hover standard** : Violet simple pour les contenus non liés
- **Animations** : Échelle, translation et effets de bordure différenciés

## 💡 Bonnes pratiques pour l'administration

### Pour maximiser les liaisons :

1. **Liez vos projets aux univers** dans Sanity :
   - Utilisez le champ "Univers lié" dans vos projets
   - Assurez-vous que le projet est en catégorie "arts-visuels-narratifs"

2. **Créez des éléments d'univers cohérents** :
   - Personnages liés au bon univers
   - Bestiaires avec des univers définis
   - Régions et factions bien organisées

3. **Utilisez des tags pertinents** :
   - Tags communs entre projets et éléments d'univers
   - Tags spécifiques pour faciliter le filtrage

### Exemples de liaisons optimales :

```
Univers : "Flamme Imaginaire"
├── Projet : "Illustrations Flamme Imaginaire" (lié à l'univers)
├── Personnages : Aria, Kael, Zephyr (univers: Flamme Imaginaire)
├── Bestiaires : Dragons de Flamme (univers: Flamme Imaginaire)
└── Régions : Terres Brûlées (univers: Flamme Imaginaire)

Résultat : Le projet affichera "🔗 5 éléments liés"
```

## 🚀 Fonctionnalités avancées

### Regroupement intelligent
- Active automatiquement pour "Arts Visuels & Narratifs"
- Tri par nombre d'éléments (univers les plus riches en premier)
- Section séparée pour les contenus orphelins

### Navigation adaptative
- Texte de CTA contextuel ("Explorer l'univers" vs "Cliquer pour explorer")
- Destinations intelligentes basées sur les liaisons
- Support des destinations personnalisées

### Performance optimisée
- Index des univers créé une seule fois
- Filtrage optimisé avec memoization
- Chargement intelligent des contenus liés

## 🎯 Impact sur l'expérience

### Pour les visiteurs :
- **Découverte facilitée** : Les liaisons permettent d'explorer facilement un univers complet
- **Contexte enrichi** : Comprendre les relations entre personnages, lieux et projets
- **Navigation intuitive** : Passer naturellement d'un élément à l'autre

### Pour le créateur :
- **Mise en valeur** : Les univers riches sont mis en avant automatiquement
- **Cohérence** : Le système encourage la création de contenus liés
- **Analytics** : Statistiques claires sur la richesse de chaque univers

---

**Note** : Ce système fonctionne automatiquement dès que vos contenus sont correctement liés dans Sanity. Aucune configuration supplémentaire n'est nécessaire !

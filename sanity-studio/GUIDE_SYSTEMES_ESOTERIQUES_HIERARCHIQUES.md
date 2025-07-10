# 🔮 Guide des Systèmes Ésotériques Hiérarchiques

## Vue d'ensemble

Ce guide explique la nouvelle structure hiérarchique des systèmes ésotériques dans votre univers, basée sur la hiérarchie complexe que vous avez décrite.

## 🌌 Structure Hiérarchique

### 1. Système Racine : L'Abstraiya
- **Type** : `systeme_racine`
- **Caractéristiques** :
  - Système fondamental basé sur des concepts, l'imagination, les émotions
  - Aucun niveau de progression (système conceptuel pur)
  - Source de tous les autres systèmes
  - Pas de système parent (racine de l'arbre)

### 2. Systèmes Dérivés

#### 🔮 Magie
- **Type** : `systeme_derive_magie`
- **Système parent** : Abstraiya
- **Caractéristiques** :
  - Descend directement de l'Abstraiya
  - Possède des niveaux de progression (1-10)
  - Système de magie traditionnel

#### ⚗️ Alchimie
- **Type** : `systeme_derive_alchimie`
- **Système parent** : Abstraiya
- **Caractéristiques** :
  - Descend directement de l'Abstraiya
  - Possède des niveaux de progression (1-10)
  - Transformation de la matière et des énergies

### 3. Branches Émancipées
- **Type** : `branche_emancipee`
- **Caractéristiques** :
  - Branches d'un système qui cherchent à s'émanciper de leur source
  - Exemple : Une branche de l'alchimie qui veut s'émanciper
  - Possèdent leurs propres niveaux de progression

## 📊 Champs des Systèmes Ésotériques

### Champs de Base
- **Nom** : Nom officiel du système
- **Type** : Nature du système (racine, dérivé, émancipé, etc.)
- **Système parent** : Référence vers le système dont il descend
- **Univers** : Univers d'appartenance

### Niveaux de Progression
- **Niveaux** : Array d'objets définissant les niveaux (sauf pour l'Abstraiya)
  - Numéro du niveau
  - Nom du niveau (ex: Initiation, Apprenti, Adepte, Maître)
  - Description du niveau
  - Exigences pour atteindre ce niveau
  - Pouvoirs disponibles à ce niveau

### Relations et Évolution
- **Relations** : Compatibilité, antagonisme, dépendances avec d'autres systèmes
- **Évolution** : Tendance d'évolution, facteurs d'évolution, branches émergentes

## ⚡ Pouvoirs et Transformations

### Intégration avec les Systèmes
- **Système ésotérique lié** : Référence vers le système parent
- **Niveau dans le système** : Niveau requis pour utiliser ce pouvoir (1-10)
- **Progression** : Système de progression du pouvoir lui-même

### Champs de Progression
- **Niveau actuel** : Niveau actuel du pouvoir (1-10)
- **Niveau maximum** : Niveau maximum possible
- **Méthode de progression** : Comment améliorer le pouvoir
- **Temps de progression** : Temps nécessaire pour progresser

## 🎯 Utilisation Pratique

### Création d'un Système Racine (Abstraiya)
1. Créer un nouveau document "Systèmes Ésotériques"
2. Nom : "Abstraiya"
3. Type : "Système racine (Abstraiya)"
4. Pas de système parent
5. Pas de niveaux (champ caché)

### Création d'un Système Dérivé (Magie)
1. Créer un nouveau document "Systèmes Ésotériques"
2. Nom : "Magie Élémentaire"
3. Type : "Système dérivé (Magie)"
4. Système parent : Référence vers "Abstraiya"
5. Définir les niveaux (1-10) avec noms et descriptions

### Création d'une Branche Émancipée
1. Créer un nouveau document "Systèmes Ésotériques"
2. Nom : "Alchimie Émancipée"
3. Type : "Branche émancipée"
4. Système parent : Référence vers "Alchimie"
5. Définir les niveaux spécifiques à cette branche

### Création d'un Pouvoir
1. Créer un nouveau document "Pouvoirs & Transformations"
2. Système ésotérique lié : Référence vers le système approprié
3. Niveau dans le système : Niveau requis
4. Définir la progression du pouvoir

## 🔗 Relations entre Entités

### Systèmes → Pouvoirs
- Un système peut avoir plusieurs pouvoirs
- Chaque pouvoir est associé à un niveau du système

### Personnages → Pouvoirs
- Les personnages peuvent posséder plusieurs pouvoirs
- Chaque pouvoir peut être possédé par plusieurs personnages

### Races → Pouvoirs
- Les races peuvent être naturellement associées à certains pouvoirs
- Un pouvoir peut être associé à plusieurs races

### Factions → Pouvoirs
- Les factions peuvent utiliser ou enseigner certains pouvoirs
- Un pouvoir peut être utilisé par plusieurs factions

## 📈 Avantages de cette Structure

1. **Hiérarchie claire** : Relation parent-enfant entre systèmes
2. **Progression structurée** : Niveaux définis pour chaque système
3. **Flexibilité** : Possibilité d'émancipation et d'évolution
4. **Traçabilité** : Chaque pouvoir est lié à son système source
5. **Évolutivité** : Facile d'ajouter de nouveaux systèmes ou branches

## 🎨 Exemples d'Utilisation

### Exemple 1 : Création de l'Abstraiya
```
Nom: Abstraiya
Type: Système racine (Abstraiya)
Description: Système fondamental basé sur l'imagination et les concepts
Univers: [Votre univers]
```

### Exemple 2 : Création de la Magie
```
Nom: Magie Élémentaire
Type: Système dérivé (Magie)
Système parent: Abstraiya
Niveaux:
  - Niveau 1: Initiation (Découverte des éléments)
  - Niveau 2: Apprenti (Contrôle basique)
  - Niveau 3: Adepte (Maîtrise élémentaire)
  - ...
```

### Exemple 3 : Création d'un Pouvoir
```
Nom: Boule de Feu
Type: Pouvoir magique
Système ésotérique lié: Magie Élémentaire
Niveau dans le système: 3
Niveau de puissance: 4/10
```

Cette structure vous permet de créer un univers cohérent avec des systèmes ésotériques interconnectés et évolutifs ! 
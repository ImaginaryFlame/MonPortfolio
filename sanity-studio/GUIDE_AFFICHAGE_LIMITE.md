# Guide : Affichage Limité et Sélection Intelligente des Projets

## 🎯 Vue d'ensemble

Le système d'affichage a été optimisé pour offrir une expérience utilisateur fluide en limitant intelligemment le nombre de contenus affichés par défaut, tout en permettant d'accéder à l'ensemble des projets facilement.

## 📊 Section "Mes Projets" - Affichage Limité

### Affichage par défaut dans "Tous"
- **Limite** : 24 contenus maximum affichés initialement
- **Sélection** : Mélange aléatoire de tous les contenus disponibles
- **Indicateur** : Badge "Sélection (24 sur X)" pour informer l'utilisateur

### Bouton "Voir plus"
- **Apparition** : Seulement si il y a plus de 24 contenus au total
- **Fonction** : Affiche tous les contenus disponibles
- **Design** : Bouton avec gradient bleu-violet et icône de déroulement

### Bouton "Voir moins"
- **Apparition** : Quand l'utilisateur a activé l'affichage complet
- **Fonction** : Revient à la sélection limitée de 24 contenus
- **Design** : Bouton gris avec icône de repliement

### Réinitialisation automatique
- **Changement de catégorie** : Revient automatiquement à l'affichage limité
- **Changement de filtres** : Conserve l'état d'affichage pour la cohérence
- **Recherche** : Affiche tous les résultats correspondants

## 🎨 Galerie d'Accueil - Sélection Intelligente

### Projets prioritaires
La galerie d'accueil (7 projets) inclut automatiquement certains projets phares :

```javascript
const priorityProjects = [
  'Little Archaeologist',    // Projet de jeu Unity
  'little-archaeologist', 
  'Little Archeology',
  'BibliApp',               // Application Java
  'bibliotheque',
  'Portfolio',              // Portfolio web
  'Flamme Imaginaire'       // Univers narratif
];
```

### Logique de sélection
1. **Identification** : Recherche des projets prioritaires par titre ou slug
2. **Séparation** : Division entre projets prioritaires et autres projets
3. **Limitation** : Maximum 4 projets prioritaires pour équilibrer
4. **Complétion** : Ajout de projets aléatoires pour atteindre 7 projets
5. **Mélange final** : Réorganisation aléatoire pour éviter un ordre prévisible

### Exemples de résultats
- **Cas 1** : 2 projets prioritaires trouvés → 2 prioritaires + 5 aléatoires
- **Cas 2** : 5 projets prioritaires trouvés → 4 prioritaires + 3 aléatoires
- **Cas 3** : 0 projet prioritaire trouvé → 7 projets aléatoires

## 🔧 Configuration Technique

### Variables de contrôle
```javascript
// Dans Projects.jsx
const MAX_CONTENT_DISPLAY = 24;  // Limite d'affichage "Tous"
const [showAllContent, setShowAllContent] = useState(false);  // État d'affichage complet

// Dans Home.jsx - ProjectGallery
const priorityProjects = [...];  // Liste des projets prioritaires
const maxGalleryProjects = 7;   // Nombre fixe pour la galerie
```

### Logique de filtrage (Projects.jsx)
```javascript
if (!selectedCategory && !showAllContent && !searchTerm && selectedTags.length === 0) {
  // Mélange aléatoire et limitation pour "Tous"
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  filtered = shuffled.slice(0, MAX_CONTENT_DISPLAY);
}
```

### Logique de sélection (Home.jsx)
```javascript
// Séparation prioritaires/autres
data.forEach(project => {
  const isPriority = priorityProjects.some(p => 
    title.includes(p.toLowerCase()) || slug.includes(p.toLowerCase())
  );
  // ...
});

// Sélection finale
const selectedProjects = [
  ...priority.slice(0, 4),
  ...shuffledOthers.slice(0, Math.max(0, 7 - priority.length))
].slice(0, 7);
```

## 📈 Avantages du Système

### Performance
- **Chargement rapide** : Moins de contenus à afficher initialement
- **Navigation fluide** : Évite la surcharge d'informations
- **Responsive** : Adapté aux différentes tailles d'écran

### Expérience utilisateur
- **Découverte guidée** : Projets phares mis en avant dans la galerie
- **Exploration progressive** : Possibilité d'approfondir avec "Voir plus"
- **Variété** : Mélange aléatoire pour découvrir différents contenus
- **Contrôle** : L'utilisateur choisit son niveau d'exploration

### Gestion de contenu
- **Scalabilité** : Système adaptable au nombre croissant de projets
- **Maintenance** : Ajout facile de nouveaux projets prioritaires
- **Flexibilité** : Modification simple des limites d'affichage

## 🎯 Indicateurs Visuels

### Badges informatifs
- **"Sélection (24 sur 42)"** : Informe du nombre limité
- **"Affichage complet"** : Confirme l'affichage total
- **"X résultats"** : Compte les résultats filtrés

### Boutons d'action
- **"Voir tous les X contenus"** : Action claire avec nombre total
- **"Afficher moins"** : Retour à la sélection limitée
- **Design cohérent** : Couleurs et animations harmonisées

## 💡 Bonnes Pratiques

### Pour les créateurs
1. **Projets phares** : S'assurer que les projets importants sont bien nommés
2. **Descriptions** : Optimiser les descriptions pour la recherche
3. **Images** : Fournir des images attrayantes pour la galerie
4. **Tags** : Utiliser des tags pertinents pour le filtrage

### Pour l'administration
1. **Monitoring** : Vérifier régulièrement la liste des projets prioritaires
2. **Équilibrage** : Ajuster MAX_CONTENT_DISPLAY selon la croissance du contenu
3. **Performance** : Surveiller les temps de chargement avec plus de contenu
4. **Analytics** : Analyser l'utilisation du bouton "Voir plus"

---

**Note** : Ce système assure une expérience optimale en montrant d'abord l'essentiel, puis en permettant l'exploration complète selon les souhaits de l'utilisateur.

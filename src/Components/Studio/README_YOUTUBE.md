# 🎬 Intégration YouTube - Guide de démarrage

## 🚀 Démarrage rapide

L'intégration YouTube permet d'afficher automatiquement vos vidéos depuis votre chaîne YouTube dans votre portfolio.

### 1. Configuration minimale

Ajoutez ces 2 variables dans votre fichier `.env` :

```env
REACT_APP_YOUTUBE_API_KEY=votre_cle_api_youtube
REACT_APP_YOUTUBE_CHANNEL_ID=votre_id_de_chaine
```

### 2. Redémarrez l'application

```bash
npm start
```

## 📁 Fichiers créés

- `src/services/youtubeAPI.js` - Service API YouTube
- `src/hooks/useYouTubeVideos.jsx` - Hook pour gérer les vidéos
- `src/Components/ui/YouTubeVideoCard.jsx` - Composant carte vidéo
- `src/Components/Studio/YouTubeStudioVideo.jsx` - Interface principale

## 🔧 Fonctionnalités

✅ **Auto-sync** - Récupération automatique des vidéos
✅ **Cache intelligent** - Performances optimisées
✅ **Distinction Shorts/Vidéos** - Séparation automatique
✅ **Statistiques** - Vues, likes, commentaires
✅ **Recherche** - Dans vos vidéos
✅ **Responsive** - Design adaptatif

## 🎯 Comment ça marche

1. **Sans configuration** : Utilise le système Sanity existant
2. **Avec configuration** : Bascule automatiquement vers YouTube API
3. **Fallback intelligent** : En cas d'erreur, retour au système Sanity

## 📖 Documentation complète

Voir `YOUTUBE_SETUP.md` pour la configuration détaillée.

## 🏗️ Architecture

```
YouTubeStudioVideo (Component)
├── useYouTubeVideos (Hook)
│   └── youtubeAPI (Service)
└── YouTubeVideoCard (UI Component)
```

## 🎨 Personnalisation

Les composants utilisent Tailwind CSS et peuvent être facilement personnalisés :

- Couleurs : Modifiez les classes dans `YouTubeVideoCard.jsx`
- Layout : Ajustez la grille dans `YouTubeStudioVideo.jsx`
- Animation : Personnalisez Framer Motion dans les composants

## 🔄 Migration

**Avant** : Données statiques dans Sanity
**Après** : Données live depuis YouTube API

L'ancien système reste disponible comme fallback. 
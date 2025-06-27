# Configuration de l'API YouTube

## 📋 Prérequis

Pour utiliser l'intégration YouTube automatique, vous devez configurer l'API YouTube Data v3.

## 🔑 Obtenir une clé API YouTube

### 1. Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API YouTube Data API v3 :
   - Allez dans "APIs & Services" > "Library"
   - Recherchez "YouTube Data API v3"
   - Cliquez sur "Enable"

### 2. Créer une clé API

1. Allez dans "APIs & Services" > "Credentials"
2. Cliquez sur "Create Credentials" > "API Key"
3. Copiez la clé API générée
4. (Optionnel) Restreignez la clé API pour plus de sécurité

## 🎯 Trouver votre ID de chaîne YouTube

### Méthode 1 : YouTube Studio
1. Allez sur [YouTube Studio](https://studio.youtube.com)
2. Cliquez sur "Paramètres" (icône d'engrenage)
3. Cliquez sur "Chaîne" > "Informations de base"
4. Copiez l'ID de chaîne affiché

### Méthode 2 : URL de chaîne
Si votre URL est : `https://www.youtube.com/channel/UC1234567890`
Alors votre ID de chaîne est : `UC1234567890`

### Méthode 3 : Nom d'utilisateur personnalisé
Si vous avez un nom d'utilisateur personnalisé (@monnom), vous devrez :
1. Aller sur votre chaîne YouTube
2. Regarder le code source de la page
3. Chercher "channelId" dans le code

## ⚙️ Configuration de l'application

Ajoutez ces variables d'environnement dans votre fichier `.env` :

```env
# Configuration YouTube API
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key_here
REACT_APP_YOUTUBE_CHANNEL_ID=your_channel_id_here
```

### Exemple de fichier .env
```env
REACT_APP_YOUTUBE_API_KEY=AIzaSyC4E6t1i2WqTRtRTZ-oWBw9MyAwesomeKey
REACT_APP_YOUTUBE_CHANNEL_ID=UC1234567890abcdefghijklmnop
```

## 🚀 Utilisation

Une fois configuré, l'application :
- ✅ Récupère automatiquement toutes vos vidéos YouTube
- ✅ Distingue les vidéos normales des Shorts
- ✅ Affiche les statistiques (vues, likes, commentaires)
- ✅ Met en cache les données pour de meilleures performances
- ✅ Permet la recherche dans vos vidéos
- ✅ Supporte la pagination pour charger plus de vidéos

## 🔒 Sécurité

### Restrictions recommandées pour la clé API :
1. **Restriction d'application** : HTTP referrers
2. **Referrer autorisé** : `https://votre-domaine.com/*`
3. **Restriction d'API** : YouTube Data API v3 uniquement

### Quotas et limites
- L'API YouTube Data v3 a des quotas quotidiens
- Quota par défaut : 10,000 unités/jour
- Une requête de vidéos coûte environ 1-5 unités
- Utilisez le cache pour réduire les appels API

## 🛠️ Dépannage

### Erreurs courantes

**"Configuration YouTube manquante"**
- Vérifiez que `REACT_APP_YOUTUBE_API_KEY` est défini
- Redémarrez l'application après avoir ajouté les variables

**"YouTube API Error: The request cannot be completed"**
- Vérifiez que l'API YouTube Data v3 est activée
- Vérifiez que votre clé API est valide

**"YouTube API Error: quotaExceeded"**
- Vous avez dépassé votre quota quotidien
- Attendez le lendemain ou demandez une augmentation de quota

**"Channel not found"**
- Vérifiez que l'ID de chaîne est correct
- Assurez-vous que la chaîne est publique

### Test de configuration

L'application affiche automatiquement les erreurs de configuration dans l'interface. Si tout est configuré correctement, vous devriez voir vos vidéos YouTube dans la section "Contenu Vidéo" du studio.

## 📊 Fonctionnalités avancées

### Cache intelligent
- Les vidéos sont mises en cache pendant 5 minutes
- Réduction des appels API pour améliorer les performances
- Bouton "Actualiser" pour forcer le rechargement

### Filtres et recherche
- Filtrage par type : Toutes, Vidéos, Shorts
- Recherche dans les titres et descriptions
- Pagination automatique pour charger plus de contenu

### Statistiques détaillées
- Nombre total de vidéos
- Répartition vidéos/shorts
- Vues et likes totaux
- Informations de la chaîne 
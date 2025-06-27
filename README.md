# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# MonPortfolio - Portfolio de Flame (ImaginaryFlame)

Portfolio personnel créé avec React, Vite et Tailwind CSS, intégrant Sanity CMS pour la gestion de contenu.

## 🚀 Démarrage rapide

### Installation
```bash
npm install
```

### Variables d'environnement
Créez un fichier `.env` à la racine avec :
```env
# Configuration email pour le formulaire de contact
EMAIL_USER=imaginaryflamepro@gmail.com
EMAIL_PASS=votre_mot_de_passe_application_gmail

# Configuration Sanity (optionnel)
VITE_SANITY_PROJECT_ID=votre_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=votre_token
```

### Lancement en développement

#### Option 1: Tout en une fois (recommandé)
```bash
npm start
# ou
npm run dev:full
```
Cela lance simultanément :
- Le serveur Vite (frontend) sur http://localhost:5173
- Le serveur de contact (backend) sur http://localhost:5000

#### Option 2: Séparément
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Serveur de contact
npm run server
```

## 📧 Système de contact

### Configuration Gmail
1. Activez la validation en 2 étapes sur votre compte Gmail
2. Générez un mot de passe d'application :
   - Allez dans les paramètres de sécurité Google
   - Sélectionnez "Mots de passe d'application"
   - Choisissez "Autre" et nommez-le "Portfolio Contact"
3. Utilisez ce mot de passe dans `EMAIL_PASS`

### Fonctionnalités
- ✅ Formulaire de contact avec validation côté client et serveur
- ✅ Envoi d'emails HTML formatés vers `imaginaryflamepro@gmail.com`
- ✅ Gestion des erreurs et feedback utilisateur
- ✅ Interface responsive et accessible
- ✅ Confirmation d'envoi avec fermeture automatique du modal

### Test du système
1. Lancez les serveurs avec `npm start`
2. Ouvrez http://localhost:5173
3. Cliquez sur "Contact" ou utilisez le bouton de contact
4. Remplissez et envoyez le formulaire
5. Vérifiez votre boîte mail Gmail

## 🛠️ Technologies utilisées

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express, Nodemailer
- **CMS**: Sanity
- **Déploiement**: Prêt pour Vercel/Netlify

## 📁 Structure du projet

```
MonPortfolio/
├── src/
│   ├── Components/
│   │   ├── Contact.jsx          # Formulaire de contact
│   │   ├── Home.jsx             # Page d'accueil
│   │   ├── Projects.jsx         # Section projets
│   │   └── ...
│   └── ...
├── server.js                    # Serveur de contact
├── sanity-studio/              # Configuration Sanity
└── public/assets/              # Images et ressources
```

## 🚀 Scripts disponibles

- `npm run dev` - Lance le serveur de développement frontend
- `npm run server` - Lance le serveur de contact backend
- `npm start` - Lance les deux serveurs simultanément
- `npm run build` - Build de production
- `npm run preview` - Prévisualise la build de production

## 📱 Fonctionnalités

- Portfolio responsive avec animations
- Univers narratifs interactifs
- Système de projets avec filtres
- Formulaire de contact fonctionnel
- Intégration Sanity CMS
- Support multilingue (FR/EN)

---

*Créé avec ❤️ par ImaginaryFlame*

# 🚀 Portfolio Moderne avec Intégration GitHub

Un portfolio moderne et interactif qui récupère automatiquement vos projets GitHub et permet d'ajouter des projets personnels. Construit avec Next.js 14, TypeScript, et Tailwind CSS.

## ✨ Fonctionnalités

- 🔗 **Intégration GitHub automatique** - Récupération et affichage de vos repositories
- 📊 **Statistiques GitHub en temps réel** - Étoiles, forks, langages utilisés
- 🎨 **Interface moderne et responsive** - Design élégant avec animations fluides
- ⚡ **Performance optimisée** - Chargement rapide avec Next.js 14
- 🌙 **Mode sombre/clair** - Interface adaptable
- 📱 **Responsive design** - Parfait sur tous les écrans
- 🔍 **SEO optimisé** - Métadonnées complètes pour un bon référencement

## 🛠️ Technologies Utilisées

- **Framework:** Next.js 14 (App Router)
- **Langage:** TypeScript
- **Styles:** Tailwind CSS
- **Animations:** Framer Motion
- **Icônes:** Lucide React
- **Composants UI:** Radix UI + shadcn/ui
- **API:** GitHub REST API v3

## 🚀 Installation et Configuration

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/portfolio-moderne.git
cd portfolio-moderne
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# GitHub API Configuration
GITHUB_TOKEN=ghp_your_github_personal_access_token_here
GITHUB_USERNAME=your_github_username

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Votre Nom - Portfolio"
```

### 4. Obtenir un token GitHub

1. Allez sur [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Cliquez sur "Generate new token (classic)"
3. Donnez un nom à votre token (ex: "Portfolio Token")
4. Sélectionnez les permissions :
   - `public_repo` (pour accéder aux repositories publics)
   - `read:user` (pour lire les informations du profil)
5. Copiez le token généré dans votre fichier `.env.local`

### 5. Lancer le serveur de développement

```bash
npm run dev
# ou
yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
portfolio-moderne/
├── src/
│   ├── app/                 # App Router Next.js 14
│   │   ├── globals.css      # Styles globaux
│   │   ├── layout.tsx       # Layout principal
│   │   └── page.tsx         # Page d'accueil
│   ├── components/          # Composants réutilisables
│   │   └── ui/              # Composants UI de base
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── badge.tsx
│   ├── lib/                 # Utilitaires et services
│   │   ├── utils.ts         # Fonctions utilitaires
│   │   └── github.ts        # Service GitHub API
│   └── types/               # Types TypeScript
│       └── index.ts
├── public/                  # Assets statiques
├── tailwind.config.js       # Configuration Tailwind
├── next.config.js          # Configuration Next.js
└── package.json
```

## 🎨 Personnalisation

### Couleurs de Brand

Les couleurs principales sont définies dans `tailwind.config.js` :

- **Primaire:** `#A087FF` (violet moderne)
- **Secondaire:** `#AC47AA` (magenta)
- **Neutre:** `#000000` (noir)

### Contenu Personnel

Modifiez les informations dans `src/app/page.tsx` :

- Liens de contact (email, LinkedIn, etc.)
- Textes de présentation
- Sections supplémentaires

### Projets Personnels

Pour ajouter des projets personnels (non-GitHub), vous pouvez :

1. Créer une base de données locale avec Prisma
2. Ajouter une interface d'administration
3. Implémenter un système de gestion de contenu simple

## 🚢 Déploiement

### Vercel (Recommandé)

1. Poussez votre code sur GitHub
2. Connectez votre repository à [Vercel](https://vercel.com)
3. Ajoutez vos variables d'environnement dans les settings Vercel
4. Déployez automatiquement !

### Netlify

1. Buildez votre projet : `npm run build`
2. Uploadez le dossier `out/` sur Netlify
3. Configurez les variables d'environnement

### Autres plateformes

Le projet est compatible avec toutes les plateformes supportant Next.js :
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

## 📈 Optimisations

### Performance

- ✅ Code splitting automatique
- ✅ Images optimisées avec Next.js Image
- ✅ Lazy loading des composants
- ✅ Cache intelligent des données GitHub

### SEO

- ✅ Métadonnées complètes
- ✅ Open Graph pour les réseaux sociaux
- ✅ Structured data
- ✅ Sitemap automatique

### Accessibilité

- ✅ Navigation au clavier
- ✅ Contraste suffisant
- ✅ Alt text pour les images
- ✅ Aria labels appropriés

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm run start

# Linting
npm run lint

# Vérification des types
npm run type-check
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 To-Do List

- [ ] Système de gestion des projets personnels
- [ ] Interface d'administration
- [ ] Mode sombre/clair
- [ ] Système de filtrage avancé
- [ ] Analytics et statistiques
- [ ] Blog intégré
- [ ] Support multilingue
- [ ] PWA (Progressive Web App)

## 🐛 Problèmes Connus

### Token GitHub

Si vous obtenez une erreur "GitHub token is invalid" :

1. Vérifiez que votre token est valide
2. Assurez-vous que les permissions sont correctes
3. Le token ne doit pas être expiré

### Rate Limiting

L'API GitHub a des limites de requêtes :
- 60 requêtes/heure sans token
- 5000 requêtes/heure avec token

Le cache est configuré pour 15 minutes afin de minimiser les appels API.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) pour le framework
- [Tailwind CSS](https://tailwindcss.com/) pour les styles
- [Radix UI](https://www.radix-ui.com/) pour les composants
- [Lucide](https://lucide.dev/) pour les icônes
- [GitHub API](https://docs.github.com/en/rest) pour les données

---

**Créé avec ❤️ par [Votre Nom]**

🌟 Si ce projet vous a aidé, n'hésitez pas à lui donner une étoile sur GitHub ! 
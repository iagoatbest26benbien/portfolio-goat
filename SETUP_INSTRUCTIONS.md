# 🚀 Instructions de Configuration - Portfolio Anas El Manssouri

## 📋 Configuration Requise

### 1. Créer le fichier .env.local

Créez un fichier `.env.local` à la racine du projet et ajoutez-y :

```env
# GitHub API Configuration
GITHUB_TOKEN=TON_TOKEN_GITHUB_ICI
GITHUB_USERNAME=iagoatbest26benbien

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="El Manssouri Anas - Portfolio Développeur"

# Contact Information
NEXT_PUBLIC_EMAIL=anaselmanssouri479@gmail.com
NEXT_PUBLIC_LINKEDIN=https://www.linkedin.com/in/anas-el-manssouri-268a35295/
```

### 2. Remplacer TON_TOKEN_GITHUB_ICI

Remplace `TON_TOKEN_GITHUB_ICI` par ton vrai token GitHub que tu as reçu.

**Ton token commence par :** `github_pat_11BSTL3YI0...`

### 3. Lancer le projet

```bash
npm install
npm run dev
```

Ensuite va sur http://localhost:3000

## 🔒 Sécurité

⚠️ **IMPORTANT** : Ne jamais partager ton token GitHub publiquement !
- Le fichier `.env.local` est automatiquement ignoré par Git
- GitHub a bloqué notre premier push pour te protéger 👍

## 🎯 Tes Informations Configurées

- **Nom :** El Manssouri Anas
- **Âge :** 17 ans
- **Email :** anaselmanssouri479@gmail.com
- **LinkedIn :** https://www.linkedin.com/in/anas-el-manssouri-268a35295/
- **GitHub :** iagoatbest26benbien

## 🚀 Déploiement

Une fois que tout fonctionne localement, tu peux déployer sur :
- **Vercel** (recommandé) : vercel.com
- **Netlify** : netlify.com
- **GitHub Pages** : via les settings de ton repo

N'oublie pas d'ajouter les variables d'environnement sur la plateforme de déploiement ! 
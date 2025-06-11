# 🎨 Guide de Personnalisation du Portfolio

Ce guide vous explique comment personnaliser votre portfolio pour qu'il reflète parfaitement votre identité et vos projets.

## 📝 Configuration de Base

### 1. Informations Personnelles

Modifiez le fichier `src/app/layout.tsx` pour vos métadonnées :

```typescript
export const metadata: Metadata = {
  title: 'Votre Nom - Portfolio Développeur',
  description: 'Votre description personnelle...',
  // ... autres métadonnées
};
```

### 2. Variables d'Environnement

Dans votre fichier `.env.local` :

```env
GITHUB_TOKEN=votre_token_github
GITHUB_USERNAME=votre_username_github
NEXT_PUBLIC_SITE_NAME="Votre Nom - Portfolio"
```

## 🎨 Personnalisation Visuelle

### Couleurs de Brand

Dans `tailwind.config.js`, vous pouvez modifier les couleurs :

```javascript
colors: {
  primary: {
    500: '#VOTRE_COULEUR_PRIMAIRE', // Remplacez #A087FF
  },
  secondary: {
    500: '#VOTRE_COULEUR_SECONDAIRE', // Remplacez #AC47AA
  },
}
```

### Animations et Effets

Les animations sont définies dans `src/app/globals.css`. Vous pouvez :

- Ajuster la vitesse des animations
- Modifier les effets de hover
- Personnaliser les gradients

## 📧 Configuration des Contacts

Dans `src/app/page.tsx`, section contact :

```typescript
<Button size="lg" variant="gradient" asChild>
  <Link href="mailto:votre.email@example.com">
    <Mail className="w-5 h-5 mr-2" />
    Me contacter
  </Link>
</Button>

<Button size="lg" variant="outline" asChild>
  <Link href="https://linkedin.com/in/votre-profil">
    <Linkedin className="w-5 h-5 mr-2" />
    LinkedIn
  </Link>
</Button>
```

## ➕ Ajouter des Projets Personnels

### Méthode 1: Modification directe (Simple)

Créez un fichier `src/data/personal-projects.ts` :

```typescript
export const personalProjects = [
  {
    id: 'projet-1',
    title: 'Mon Super Projet',
    description: 'Description du projet...',
    technologies: ['React', 'Node.js', 'MongoDB'],
    github_url: 'https://github.com/vous/projet',
    demo_url: 'https://mon-projet.com',
    image_url: '/images/projet-1.png',
    featured: true,
    category: 'web' as const,
    status: 'completed' as const,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  // ... autres projets
];
```

Puis modifiez `src/app/page.tsx` pour inclure ces projets :

```typescript
import { personalProjects } from '@/data/personal-projects';

// Dans le composant GitHubProjects
const allProjects = [...repositories, ...personalProjects];
```

### Méthode 2: Base de données avec Prisma (Avancé)

1. **Installation de Prisma :**

```bash
npm install prisma @prisma/client
npx prisma init
```

2. **Schéma de base de données (`prisma/schema.prisma`) :**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Project {
  id              String   @id @default(cuid())
  title           String
  description     String
  longDescription String?
  technologies    String   // JSON string
  github_url      String?
  demo_url        String?
  image_url       String?
  images          String?  // JSON string
  featured        Boolean  @default(false)
  category        String
  status          String
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
}
```

3. **Configuration de la base de données :**

```bash
npx prisma db push
npx prisma generate
```

4. **Service pour les projets personnels (`src/lib/projects.ts`) :**

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPersonalProjects() {
  return await prisma.project.findMany({
    orderBy: {
      updated_at: 'desc'
    }
  });
}

export async function createProject(data: any) {
  return await prisma.project.create({
    data: {
      ...data,
      technologies: JSON.stringify(data.technologies),
      images: data.images ? JSON.stringify(data.images) : null,
    }
  });
}
```

## 🛠️ Interface d'Administration

### Création d'une page d'admin simple

1. **Créez `src/app/admin/page.tsx` :**

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  const [project, setProject] = useState({
    title: '',
    description: '',
    technologies: '',
    github_url: '',
    demo_url: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour sauvegarder le projet
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...project,
          technologies: project.technologies.split(',').map(t => t.trim()),
        }),
      });
      
      if (response.ok) {
        alert('Projet ajouté avec succès !');
        setProject({ title: '', description: '', technologies: '', github_url: '', demo_url: '' });
      }
    } catch (error) {
      alert('Erreur lors de l\'ajout du projet');
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Ajouter un Projet Personnel</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Titre du projet"
              value={project.title}
              onChange={(e) => setProject({...project, title: e.target.value})}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
              required
            />
            
            <textarea
              placeholder="Description du projet"
              value={project.description}
              onChange={(e) => setProject({...project, description: e.target.value})}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary h-32"
              required
            />
            
            <input
              type="text"
              placeholder="Technologies (séparées par des virgules)"
              value={project.technologies}
              onChange={(e) => setProject({...project, technologies: e.target.value})}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
            />
            
            <input
              type="url"
              placeholder="URL GitHub (optionnel)"
              value={project.github_url}
              onChange={(e) => setProject({...project, github_url: e.target.value})}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
            />
            
            <input
              type="url"
              placeholder="URL de démo (optionnel)"
              value={project.demo_url}
              onChange={(e) => setProject({...project, demo_url: e.target.value})}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
            />
            
            <Button type="submit" className="w-full">
              Ajouter le Projet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

2. **Route API (`src/app/api/projects/route.ts`) :**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createProject } from '@/lib/projects';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const project = await createProject({
      ...body,
      category: 'web',
      status: 'completed',
      featured: false,
    });
    
    return NextResponse.json({ success: true, project });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  }
}
```

## 🔒 Sécurisation de l'Admin

### Avec NextAuth.js

1. **Installation :**

```bash
npm install next-auth
```

2. **Configuration (`src/app/api/auth/[...nextauth]/route.ts`) :**

```typescript
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Limitez l'accès à votre compte GitHub uniquement
      return user.email === process.env.ADMIN_EMAIL;
    },
  },
});

export { handler as GET, handler as POST };
```

## 📱 Sections Supplémentaires

### Ajouter une section "À propos"

Dans `src/app/page.tsx`, ajoutez entre les sections existantes :

```typescript
{/* Section À propos */}
<section className="py-20 px-4">
  <div className="container mx-auto max-w-4xl">
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
      À <span className="text-gradient">propos</span>
    </h2>
    
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p className="text-lg text-muted-foreground mb-4">
          Votre histoire personnelle...
        </p>
        <p className="text-lg text-muted-foreground mb-6">
          Vos compétences et passions...
        </p>
        
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Node.js', 'Python'].map((skill) => (
            <Badge key={skill} variant="tech">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <Image
          src="/votre-photo.jpg"
          alt="Votre nom"
          width={400}
          height={400}
          className="rounded-lg shadow-xl"
        />
      </div>
    </div>
  </div>
</section>
```

### Ajouter une section "Expérience"

```typescript
{/* Section Expérience */}
<section className="bg-muted py-20 px-4">
  <div className="container mx-auto max-w-4xl">
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
      Mon <span className="text-gradient">parcours</span>
    </h2>
    
    <div className="space-y-8">
      {[
        {
          company: 'Entreprise 1',
          position: 'Développeur Full Stack',
          period: '2023 - Présent',
          description: 'Description de votre rôle...',
        },
        // ... autres expériences
      ].map((exp, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{exp.position}</h3>
                <p className="text-primary font-medium">{exp.company}</p>
              </div>
              <Badge variant="outline">{exp.period}</Badge>
            </div>
            <p className="text-muted-foreground">{exp.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>
```

## 🚀 Optimisations Avancées

### 1. PWA (Progressive Web App)

Ajoutez un fichier `public/manifest.json` :

```json
{
  "name": "Votre Portfolio",
  "short_name": "Portfolio",
  "description": "Portfolio de développeur",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#A087FF",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Analytics avec Google Analytics

```typescript
// src/lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: any) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
```

## 🎯 Conseils Finaux

1. **Images :** Optimisez vos images et utilisez le composant `Image` de Next.js
2. **SEO :** Pensez aux métadonnées pour chaque page
3. **Performance :** Testez régulièrement avec Lighthouse
4. **Accessibilité :** Vérifiez le contraste et la navigation au clavier
5. **Mobile :** Testez sur différentes tailles d'écran

N'hésitez pas à expérimenter et à adapter ces suggestions à vos besoins spécifiques ! 
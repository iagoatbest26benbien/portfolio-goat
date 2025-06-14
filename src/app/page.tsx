import { Suspense } from 'react';
import { Github, ExternalLink, Star, GitFork, Mail, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getGitHubUser, getGitHubRepositories, getGitHubStats } from '@/lib/github';
import { formatNumber, getLanguageColor, formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

// Composant de chargement pour les projets
function ProjectsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="skeleton h-80" />
      ))}
    </div>
  );
}

// Composant pour afficher un projet GitHub
function GitHubProjectCard({ project }: { project: any }) {
  return (
    <Card className="project-card h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg hover:text-primary transition-colors">
            <Link 
              href={project.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              {project.name}
              <ExternalLink className="w-4 h-4" />
            </Link>
          </CardTitle>
        </div>
        <CardDescription className="flex-1">
          {project.description || 'Aucune description disponible'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Langage principal */}
          {project.language && (
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getLanguageColor(project.language) }}
              />
              <span className="text-sm text-muted-foreground">{project.language}</span>
            </div>
          )}
          
          {/* Technologies (topics) */}
          {project.topics && project.topics.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.topics.slice(0, 4).map((topic: string) => (
                <Badge key={topic} variant="tech" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {/* Stats du projet */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {formatNumber(project.stargazers_count)}
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              {formatNumber(project.forks_count)}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link href={project.html_url} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </Link>
            </Button>
            {project.homepage && (
              <Button size="sm" variant="outline" asChild>
                <Link href={project.homepage} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Composant pour afficher les statistiques GitHub
async function GitHubStats() {
  try {
    const stats = await getGitHubStats();
    
    return (
      <div className="grid gap-4 md:grid-cols-3 mb-12">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gradient">{stats.totalRepos}</div>
            <p className="text-sm text-muted-foreground">Repositories publics</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gradient">{formatNumber(stats.totalStars)}</div>
            <p className="text-sm text-muted-foreground">Étoiles obtenues</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gradient">{formatNumber(stats.totalForks)}</div>
            <p className="text-sm text-muted-foreground">Forks créés</p>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    return null;
  }
}

// Composant pour afficher les projets GitHub
async function GitHubProjects() {
  try {
    const repositories = await getGitHubRepositories();
    
    if (!repositories || repositories.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun projet GitHub trouvé.</p>
        </div>
      );
    }
    
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {repositories.map((project) => (
          <GitHubProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Erreur lors du chargement des projets GitHub.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Vérifiez la configuration de votre token GitHub.
        </p>
      </div>
    );
  }
}

// Section héro
async function HeroSection() {
  try {
    const user = await getGitHubUser();
    
    return (
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          {user.avatar_url && (
            <div className="mb-8">
              <Image
                src={user.avatar_url}
                alt={user.name || user.login}
                width={120}
                height={120}
                className="rounded-full mx-auto shadow-lg animate-float"
              />
            </div>
          )}
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Salut, je suis{' '}
            <span className="text-gradient">
              {user.name || user.login}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {user.bio || 'Développeur passionné de 17 ans, créateur de solutions digitales innovantes'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button size="lg" variant="gradient" className="btn-glow" asChild>
              <Link href="#projects">
                Voir mes projets
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild>
              <Link href={user.html_url} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Link>
            </Button>
          </div>
          
          {/* Informations supplémentaires */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center gap-1">
                📍 {user.location}
              </div>
            )}
            {user.company && (
              <div className="flex items-center gap-1">
                🏢 {user.company}
              </div>
            )}
            {user.blog && (
              <Link 
                href={user.blog} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                🌐 Site web
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    return (
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">El Manssouri Anas</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Développeur passionné de 17 ans, créateur de solutions digitales innovantes
          </p>
          <Button size="lg" variant="gradient" className="btn-glow" asChild>
            <Link href="#projects">
              Voir mes projets
            </Link>
          </Button>
        </div>
      </section>
    );
  }
}

// Page principale
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Section Héro */}
      <Suspense fallback={<div className="hero-gradient py-20" />}>
        <HeroSection />
      </Suspense>
      
      {/* Section Projets */}
      <section id="projects" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mes <span className="text-gradient">Projets</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez mes dernières réalisations et projets open source sur GitHub
            </p>
          </div>
          
          {/* Statistiques GitHub */}
          <Suspense fallback={<div className="grid gap-4 md:grid-cols-3 mb-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="skeleton h-24" />
            ))}
          </div>}>
            <GitHubStats />
          </Suspense>
          
          {/* Grille des projets */}
          <Suspense fallback={<ProjectsSkeleton />}>
            <GitHubProjects />
          </Suspense>
        </div>
      </section>
      
      {/* Section Contact */}
      <section className="bg-muted py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Travaillons <span className="text-gradient">ensemble</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Vous avez un projet en tête ? N'hésitez pas à me contacter !
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="gradient" className="btn-glow" asChild>
              <Link href="mailto:anaselmanssouri479@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Me contacter
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild>
              <Link href="https://www.linkedin.com/in/anas-el-manssouri-268a35295/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 
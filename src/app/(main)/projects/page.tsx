import { mockProjects } from '@/lib/mockData';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Portfolio Pro',
  description: 'A showcase of software engineering projects by Ilman Teguh Prasetya.',
};

export default function ProjectsPage() {
  return (
    <div className="container py-12 md:py-16">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">My Projects</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          Here are some of the projects I&apos;ve worked on, showcasing my skills in various technologies.
        </p>
      </header>
      
      {mockProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No projects to display at the moment. Check back soon!</p>
      )}
    </div>
  );
}

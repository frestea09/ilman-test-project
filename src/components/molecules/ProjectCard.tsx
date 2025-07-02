import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all hover:shadow-lg">
      <CardHeader>
        <div className="aspect-[16/9] relative mb-4 rounded-md overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={project.dataAiHint || "project image"}
          />
        </div>
        <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
        <CardDescription className="h-16 text-sm line-clamp-3">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-start gap-2">
        {project.projectUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Project
            </Link>
          </Button>
        )}
        {project.repoUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Source Code
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

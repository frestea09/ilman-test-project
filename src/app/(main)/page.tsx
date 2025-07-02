import { mockProjects, mockBlogPosts } from '@/lib/mockData';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { BlogPostCard } from '@/components/molecules/BlogPostCard';
import { NewsletterForm } from '@/components/molecules/NewsletterForm';
import { Button } from '@/components/atoms/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
            Hi, I&apos;m Ilman Teguh Prasetya
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A passionate Software Engineer specializing in building robust and scalable web applications. 
            Welcome to my personal space where I share my projects, thoughts, and journey in the world of tech.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/projects">View My Work</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="container">
        <h2 className="font-headline text-3xl md:text-4xl font-semibold mb-8 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProjects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {mockProjects.length > 3 && (
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </section>

      {/* Latest Blog Posts Section */}
      <section className="container">
        <h2 className="font-headline text-3xl md:text-4xl font-semibold mb-8 text-center">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogPosts.slice(0, 3).map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
        {mockBlogPosts.length > 3 && (
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/blog">
                Read All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </section>

      {/* Newsletter Subscription Section */}
      <section className="py-16 bg-card">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to my newsletter for the latest articles, project updates, and tech insights.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}

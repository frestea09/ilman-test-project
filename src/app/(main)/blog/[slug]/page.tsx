import { mockBlogPosts } from '@/lib/mockData';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/atoms/badge';
import { CalendarDays, UserCircle } from 'lucide-react';
import { format } from 'date-fns';
import type { Metadata, ResolvingMetadata } from 'next';
import { EndorsementCard } from '@/components/molecules/EndorsementCard';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: BlogPostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = mockBlogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Post Not Found - Portfolio Pro',
    }
  }
  return {
    title: `${post.title} - Portfolio Pro`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  }
}

export async function generateStaticParams() {
  return mockBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = mockBlogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-12 md:py-16 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="font-headline text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-6">
          <div className="flex items-center">
            <CalendarDays className="mr-1.5 h-4 w-4" />
            <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center">
            <UserCircle className="mr-1.5 h-4 w-4" />
            <span>By {post.author}</span>
          </div>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden shadow-md">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            priority
            data-ai-hint={post.dataAiHint || "blog header"}
          />
        </div>
      </header>

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <EndorsementCard />
    </article>
  );
}

import { mockBlogPosts } from '@/lib/mockData';
import { BlogPostCard } from '@/components/molecules/BlogPostCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Portfolio Pro',
  description: 'Articles and insights on software engineering and technology by Ilman Teguh Prasetya.',
};

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-16">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">My Blog</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          Sharing my thoughts, experiences, and learnings in software engineering and beyond.
        </p>
      </header>

      {mockBlogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No blog posts available yet. Stay tuned!</p>
      )}
    </div>
  );
}

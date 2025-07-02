import { BlogForm } from '@/components/organisms/BlogForm';
import { mockBlogPosts } from '@/lib/mockData';
import { notFound } from 'next/navigation';

interface EditBlogPostPageProps {
  params: { slug: string };
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const post = mockBlogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground">
          Modify the details of your blog post. Changes are for demo purposes only.
        </p>
      </header>
      <BlogForm post={post} />
    </div>
  );
}

import { BlogDataTable } from '@/components/organisms/BlogDataTable';
import { mockBlogPosts } from '@/lib/mockData';

export default function AdminBlogPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Manage Blog Posts</h1>
        <p className="text-muted-foreground">
          Create, edit, and delete blog posts. Changes are for demo purposes and will reset on page refresh.
        </p>
      </header>
      <BlogDataTable initialPosts={mockBlogPosts} />
    </div>
  );
}

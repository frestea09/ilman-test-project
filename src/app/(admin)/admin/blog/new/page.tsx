import { BlogForm } from '@/components/organisms/BlogForm';

export default function NewBlogPostPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Create New Blog Post</h1>
        <p className="text-muted-foreground">
          Fill out the form below to add a new post to the blog.
        </p>
      </header>
      <BlogForm />
    </div>
  );
}

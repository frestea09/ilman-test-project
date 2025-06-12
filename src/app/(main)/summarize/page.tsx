import { SummarizeForm } from '@/components/forms/SummarizeForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Summarize Article - Portfolio Pro',
  description: 'Use AI to summarize articles and projects from a URL.',
};

export default function SummarizePage() {
  return (
    <div className="container py-12 md:py-16 flex flex-col items-center">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">AI Summarizer</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          Paste a link to an article or project, and let AI generate a quick summary for you.
        </p>
      </header>
      <SummarizeForm />
    </div>
  );
}

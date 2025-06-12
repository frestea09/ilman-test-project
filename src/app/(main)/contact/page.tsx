import { ContactForm } from '@/components/forms/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Portfolio Pro',
  description: 'Get in touch with Ilman Teguh Prasetya for collaborations, projects, or inquiries.',
};

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-16 flex flex-col items-center">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Contact Me</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of something great.
        </p>
      </header>
      <ContactForm />
    </div>
  );
}

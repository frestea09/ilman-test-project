import { EndorsementForm } from '@/components/organisms/EndorsementForm';

export default function NewEndorsementPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Create New Endorsement</h1>
        <p className="text-muted-foreground">
          Fill out the form below to add a new endorsement to be displayed on the site.
        </p>
      </header>
      <EndorsementForm />
    </div>
  );
}

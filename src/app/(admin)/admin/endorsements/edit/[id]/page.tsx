import { EndorsementForm } from '@/components/organisms/EndorsementForm';
import { mockEndorsements } from '@/lib/mockData';
import { notFound } from 'next/navigation';

interface EditEndorsementPageProps {
  params: { id: string };
}

export default function EditEndorsementPage({ params }: EditEndorsementPageProps) {
  const endorsement = mockEndorsements.find((e) => e.id === params.id);

  if (!endorsement) {
    notFound();
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Edit Endorsement</h1>
        <p className="text-muted-foreground">
          Modify the details of the endorsement. Changes are for demo purposes only.
        </p>
      </header>
      <EndorsementForm endorsement={endorsement} />
    </div>
  );
}

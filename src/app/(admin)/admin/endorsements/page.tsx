import { EndorsementDataTable } from '@/components/organisms/EndorsementDataTable';
import { mockEndorsements } from '@/lib/mockData';

export default function AdminEndorsementsPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Manage Endorsements</h1>
        <p className="text-muted-foreground">
          Create, edit, and manage sponsored endorsement content. Changes are for demo purposes only.
        </p>
      </header>
      <EndorsementDataTable initialEndorsements={mockEndorsements} />
    </div>
  );
}

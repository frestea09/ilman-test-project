import { AdminSidebar } from '@/components/organisms/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <AdminSidebar />
      <main className="flex-grow p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}

'use client';

import { AdminSidebar } from '@/components/organisms/AdminSidebar';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    try {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!loggedIn) {
        router.replace('/login');
      } else {
        setIsVerified(true);
      }
    } catch (error) {
      console.error("Could not access localStorage, redirecting to login.", error);
      router.replace('/login');
    }
  }, [router]);

  if (!isVerified) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-muted/40">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Verifying access...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <AdminSidebar />
      <main className="flex-grow p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}

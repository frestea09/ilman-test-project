"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Newspaper, LayoutDashboard, Home, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const adminNavLinks = [
  { href: '/admin/blog', label: 'Blog Posts', icon: Newspaper },
  // Add other admin links here in the future
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-background md:block">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
           <Link href="/" className="flex items-center gap-2 font-semibold">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="font-headline">Portfolio Pro</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
             {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname.startsWith(link.href) ? "bg-muted text-primary" : ""
                )}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
         <div className="mt-auto p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              <span>Back to Site</span>
            </Link>
          </div>
      </div>
    </aside>
  );
}

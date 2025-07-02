"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Newspaper, Home, Briefcase, LogOut, BarChart3, Handshake } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/button';
import { Separator } from '@/components/atoms/separator';
import { useTranslation } from '@/hooks/use-translation';

const adminNavLinks = [
  { href: '/admin/dashboard', key: 'nav.dashboard', icon: BarChart3 },
  { href: '/admin/blog', key: 'nav.blog_posts', icon: Newspaper },
  { href: '/admin/endorsements', key: 'nav.endorsements', icon: Handshake },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogout = () => {
    try {
      localStorage.removeItem('isLoggedIn');
      router.push('/login');
    } catch (error) {
      console.error("Could not access localStorage", error);
      // Still try to navigate
      router.push('/login');
    }
  };

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-background md:block">
      <div className="flex h-full flex-col">
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
                <span>{t(link.key)}</span>
              </Link>
            ))}
          </nav>
        </div>
         <div className="mt-auto space-y-2 p-4">
            <Separator />
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              <span>Back to Site</span>
            </Link>
            <Button variant="ghost" className="w-full justify-start px-3 text-muted-foreground hover:text-primary" onClick={handleLogout}>
              <LogOut className="mr-3 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
      </div>
    </aside>
  );
}

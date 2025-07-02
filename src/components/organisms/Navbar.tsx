"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Home, LayoutGrid, Newspaper, WandSparkles, Mail, BarChart3, Menu, X } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/atoms/sheet';
import { cn } from '@/lib/utils';
import React from 'react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: LayoutGrid },
  { href: '/blog', label: 'Blog', icon: Newspaper },
  { href: '/summarize', label: 'Summarize', icon: WandSparkles },
  { href: '/contact', label: 'Contact', icon: Mail },
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavLinkItem = ({ href, label, icon: Icon, isMobile = false }: { href: string; label: string; icon: React.ElementType; isMobile?: boolean }) => (
    <Button
      variant="ghost"
      asChild
      className={cn(
        "justify-start text-sm font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-foreground/80",
        isMobile ? "w-full text-base py-3" : ""
      )}
    >
      <Link href={href} onClick={() => isMobile && setIsMobileMenuOpen(false)}>
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
  
  const MobileNavLinkItem = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType;}) => (
    <SheetClose asChild>
       <Link href={href} className={cn(
        "flex items-center p-3 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        pathname === href ? "bg-accent text-accent-foreground" : "text-foreground/80"
      )}>
        <Icon className="mr-3 h-5 w-5" />
        {label}
      </Link>
    </SheetClose>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Portfolio Pro Home">
          <Briefcase className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl font-semibold text-primary">Portfolio Pro</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <NavLinkItem key={link.href} {...link} />
          ))}
        </nav>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs p-6">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="flex items-center gap-2 mb-6" onClick={() => setIsMobileMenuOpen(false)}>
                <Briefcase className="h-7 w-7 text-primary" />
                <span className="font-headline text-xl font-semibold text-primary">Portfolio Pro</span>
              </Link>
              {navLinks.map((link) => (
                 <MobileNavLinkItem key={link.href} {...link} />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

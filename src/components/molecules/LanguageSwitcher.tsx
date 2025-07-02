"use client";
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/atoms/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'id' : 'en');
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleLocale} aria-label="Toggle language">
      <Globe className="h-5 w-5" />
      <span className="sr-only">Toggle Language to {locale === 'en' ? 'Indonesian' : 'English'}</span>
    </Button>
  );
}

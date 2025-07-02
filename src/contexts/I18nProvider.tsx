"use client";
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import en from '@/locales/en.json';
import id from '@/locales/id.json';

const translations = { en, id };

export type Locale = "en" | "id";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType | null>(null);

const getNestedValue = (obj: any, key: string): string | undefined => {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as Locale | null;
    if (storedLocale && ['en', 'id'].includes(storedLocale)) {
      setLocale(storedLocale);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'id') {
        setLocale('id');
      }
    }
  }, []);

  const handleSetLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    try {
      localStorage.setItem('locale', newLocale);
      document.documentElement.lang = newLocale;
    } catch (e) {
      console.error("Could not save locale to localStorage", e)
    }
  }, []);
  
  const t = useCallback((key: string): string => {
    const translation = getNestedValue(translations[locale], key);
    return translation || key;
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale: handleSetLocale,
    t,
  }), [locale, handleSetLocale, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

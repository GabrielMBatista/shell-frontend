'use client';

import { useState, useCallback } from 'react';

export function useLocale() {
  const [locale, setLocale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') || 'pt';
    }
    return 'pt';
  });

  const changeLocale = useCallback((newLocale: string) => {
    if (newLocale === locale) return;
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
  }, [locale]);

  return { locale, changeLocale };
}

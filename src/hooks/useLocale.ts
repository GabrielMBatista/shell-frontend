'use client';

import { useState, useCallback } from 'react';
import { detectLocale } from '@/utils/locale';
import type { Locale } from '@/i18n';

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const stored = (localStorage.getItem('locale') || '').toLowerCase();
      if (stored === 'pt' || stored === 'pt-br') return 'pt-br';
      if (stored === 'en' || stored === 'en-us' || stored === 'en-en') return 'en-en';
      return detectLocale() as Locale;
    }
    return 'pt-br';
  });

  const changeLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;
      localStorage.setItem('locale', newLocale);
      setLocale(newLocale);
      // Opcional: manter html lang em sincronia quando usado fora do provider
      document.documentElement.lang = newLocale;
    },
    [locale],
  );

  return { locale, changeLocale };
}

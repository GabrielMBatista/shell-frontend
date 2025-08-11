'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { detectLocale } from '@/utils/locale';
import type { Locale } from '@/i18n';
import { messages as resources } from '@/i18n/messages';
import type { Messages } from '@/i18n/messages';

const getFromPath = (obj: unknown, path: string): unknown => {
  if (!obj) return undefined;
  return path.split('.').reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[part];
    return undefined;
  }, obj);
};

interface I18nContextProps {
  locale: Locale;
  t: (namespace: string, key: string) => string;
  changeLocale: (newLocale: Locale) => void;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('pt-br');

  useEffect(() => {
    const stored = (localStorage.getItem('locale') || '').toLowerCase();
    let initial: Locale;

    if (stored === 'pt' || stored === 'pt-br') initial = 'pt-br';
    else if (stored === 'en' || stored === 'en-us' || stored === 'en-en') initial = 'en-en';
    else initial = detectLocale() as Locale;

    setLocale(initial);
    localStorage.setItem('locale', initial);
    document.documentElement.lang = initial;
  }, []);

  const changeLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (namespace: string, key: string) => {
      const current = getFromPath(resources[locale]?.[namespace as keyof Messages], key);
      if (typeof current === 'string') return current;
      const fallback = getFromPath(resources['pt-br']?.[namespace as keyof Messages], key);
      return typeof fallback === 'string' ? fallback : key;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, t, changeLocale }}>
      <div key={locale}>{children}</div>
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

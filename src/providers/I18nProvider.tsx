'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import pt from '../i18n/locales/pt/common.json';
import en from '../i18n/locales/en/common.json';

type Messages = Record<string, Record<string, string>>;

const resources: Record<string, Messages> = { pt, en };

interface I18nContextProps {
  locale: string;
  t: (namespace: string, key: string) => string;
  changeLocale: (newLocale: string) => void;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<string>('pt');

  useEffect(() => {
    const stored = localStorage.getItem('locale') || 'pt';
    setLocale(stored);
    document.documentElement.lang = stored;
  }, []);

  const changeLocale = useCallback((newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (namespace: string, key: string) => {
      const value = resources[locale]?.[namespace]?.[key];
      return value || key;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, t, changeLocale }}>{children}</I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

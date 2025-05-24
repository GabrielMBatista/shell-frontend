'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const { t, locale, changeLocale } = useTranslation('Home');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-4 text-lg">{t('description')}</p>

      <div className="mt-8 flex gap-4">
        <button onClick={() => changeLocale('pt')}>Português</button>
        <button onClick={() => changeLocale('en')}>English</button>
      </div>

      <p className="mt-4">Idioma atual: {locale}</p>
    </main>
  );
}

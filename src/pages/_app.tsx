import '@/styles/globals.css';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { Providers } from '@/providers/providers';
import { ClientOnly } from '@/utils/client-only';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useState, useEffect, Suspense } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const GabsIA = dynamic(() => import('Chatbot/GabsIAWidget'), { ssr: false });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('isDark');
    if (savedTheme !== null) {
      setIsDark(savedTheme === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isDark', isDark.toString());
  }, [isDark]);

  return (
    <Providers session={pageProps.session}>
      <ClientOnly>
        <div
          className={`min-h-screen transition-colors duration-300 ${
            isDark ? 'bg-gray-900' : 'bg-gray-50'
          }`}
        >
          <Header isDark={isDark} setIsDark={setIsDark} />
          <Suspense fallback={<ui-loading />}>
            <Component {...pageProps} isDark={isDark} />
          </Suspense>
          <Footer isDark={isDark} />
        </div>
        <GabsIA />
      </ClientOnly>
    </Providers>
  );
}

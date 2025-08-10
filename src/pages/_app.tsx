import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Providers } from '@/providers/providers';
import { ClientOnly } from '@/utils/client-only';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useState, useEffect, Suspense } from 'react';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

interface MyAppProps extends AppProps {
  pageProps: AppProps['pageProps'] & {
    isDark?: boolean;
    session?: unknown;
  };
}

// Tipo local para posição (top/left/right/bottom)
type DockPos = Partial<{ top: number; left: number; right: number; bottom: number }>;

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const GabsIA = dynamic<import('Chatbot/GabsIAWidget').GabsIAWidgetProps>(
    () => import('Chatbot/GabsIAWidget').then((m) => m.default),
    { ssr: false },
  );
  const [isDark, setIsDark] = useState<boolean>(false);
  // Posição do widget (fallback: canto inferior direito)
  const [widgetPos, setWidgetPos] = useState<DockPos>({ bottom: 24, right: 24 });

  useEffect(() => {
    const savedTheme: string | null = localStorage.getItem('isDark');
    if (savedTheme !== null) setIsDark(savedTheme === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('isDark', isDark.toString());
  }, [isDark]);

  useEffect(() => {
    // Inicializar Microsoft Clarity apenas no shell
    if (
      typeof window !== 'undefined' &&
      !window.clarity &&
      process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
    ) {
      const script: HTMLScriptElement = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}";
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script");
      `;
      document.head.appendChild(script);
    }
    // Criar interface global para MFEs enviarem eventos
    if (typeof window !== 'undefined') {
      window.sendClarityEvent = (eventName: string, eventData?: Record<string, unknown>): void => {
        if (window.clarity?.event) {
          window.clarity.event(eventName, {
            ...eventData,
            timestamp: new Date().toISOString(),
            source: 'shell',
          });
        }
      };
    }
  }, []);

  useEffect(() => {
    // Centraliza o widget na div âncora do Header
    const compute = () => {
      const el = document.getElementById('gabs-header-anchor');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const size = 64; // tamanho do avatar do widget
      const top = Math.round(rect.top + rect.height / 2 - size / 2);
      const left = Math.round(rect.left + rect.width / 2 - size / 2);
      setWidgetPos({ top, left });
    };
    const raf = requestAnimationFrame(compute);
    window.addEventListener('resize', compute);
    window.addEventListener('orientationchange', compute);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', compute);
      window.removeEventListener('orientationchange', compute);
    };
  }, []);

  return (
    <Providers session={pageProps.session}>
      <ClientOnly>
        <div
          className={`min-h-screen transition-colors duration-300 ${
            isDark ? 'bg-gray-900' : 'bg-gray-50'
          } ${inter.className}`}
        >
          <Header isDark={isDark} setIsDark={setIsDark} />
          <Suspense fallback={<ui-loading />}>
            <Component {...pageProps} isDark={isDark} />
          </Suspense>
          <Footer isDark={isDark} />
        </div>
        <GabsIA tourEnabled fixedPosition={widgetPos} />
      </ClientOnly>
    </Providers>
  );
}

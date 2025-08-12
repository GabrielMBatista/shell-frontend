import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Providers } from '@/providers/providers';
import { ClientOnly } from '@/utils/client-only';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Suspense, lazy } from 'react';
import { Inter } from 'next/font/google';
import { useTheme } from '@/hooks/useTheme';
import { useWidgetPosition } from '@/hooks/useWidgetPosition';
import { useClarity } from '@/hooks/useClarity';
import { GabsIAWidget } from '@/components/common/GabsIAWidget';
import { isEnvTrue } from '@/utils/env';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Loading from '@/components/common/Loading';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function MyApp({ Component, pageProps }: AppProps) {
  const { isDark, setIsDark } = useTheme();
  const widgetPos = useWidgetPosition();
  useClarity();

  const isChatbotEnabled = isEnvTrue(process.env.NEXT_PUBLIC_CHATBOT);

  return (
    <Providers session={pageProps.session}>
      <ClientOnly>
        <SpeedInsights />
        <div
          className={`min-h-screen transition-colors duration-300 ${
            isDark ? 'bg-gray-900' : 'bg-gray-50'
          } ${inter.className}`}
        >
          <Header isDark={isDark} setIsDark={setIsDark} />
          <Suspense fallback={<Loading />}>
            <Component {...pageProps} isDark={isDark} />
          </Suspense>
          <Footer isDark={isDark} />
        </div>
        {isChatbotEnabled && <GabsIAWidget fixedPosition={widgetPos} />}
        <Analytics />
      </ClientOnly>
    </Providers>
  );
}

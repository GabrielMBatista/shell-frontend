import '@/styles/globals.css';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { Providers } from '@/providers/providers';
import { ClientOnly } from '@/utils/client-only';
import Footer from '@/components/common/footer';

export default function MyApp({ Component, pageProps }: AppProps) {
  const GabsIA = dynamic(() => import('Chatbot/GabsIAWidget'), { ssr: false });
  return (
    <Providers session={pageProps.session}>
      <ClientOnly>
        <Component {...pageProps} />
        <GabsIA />
        <Footer />
      </ClientOnly>
    </Providers>
  );
}

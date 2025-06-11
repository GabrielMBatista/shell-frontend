import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Providers } from '@/providers/providers';
import { ClientOnly } from '@/utils/client-only';
import Footer from '@/components/common/footer';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers session={pageProps.session}>
      <ClientOnly>
        <Component {...pageProps} />
        <Footer />
      </ClientOnly>
    </Providers>
  );
}

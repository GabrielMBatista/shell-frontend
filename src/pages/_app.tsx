import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Providers } from '@/providers/providers';
import { ClientOnly } from '@/utils/client-only';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import { useTheme } from '@/hooks/useTheme';
import { useClarity } from '@/hooks/useClarity';
import { isEnvTrue } from '@/utils/env';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Loading from '@/components/common/Loading';
import dynamic from 'next/dynamic';
import { useWidgetPosition } from '@/hooks/useWidgetPosition';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const GabsIAWidget = isEnvTrue(process.env.NEXT_PUBLIC_CHATBOT)
  ? dynamic(() => import('@/components/common/GabsIAWidget').then((mod) => mod.GabsIAWidget), {
      ssr: false,
      loading: () => <Loading />,
    })
  : null;

export default function MyApp({ Component, pageProps }: AppProps) {
  const { isDark, setIsDark } = useTheme();
  useClarity();
  const widgetPos = useWidgetPosition();
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
        {isChatbotEnabled && GabsIAWidget && (
          <Suspense fallback={<Loading />}>
            <GabsIAWidget
              fixedPosition={widgetPos}
              initialMessage={{
                question: '',
                answer:
                  'Olá! Eu sou o G•One, assistente oficial do portfólio de Gabriel Marques. Posso te ajudar a entender cada área do site, explicar decisões técnicas ou apresentar os projetos do Gabriel com clareza e profundidade. Dica: utilize os botões de tour (ícone de interrogação) para navegar por explicações guiadas das principais áreas do portfólio. Também é possível clicar em áreas marcadas com data-gabs para explicações rápidas. Como posso te ajudar hoje?',
              }}
              fixedTourSteps={[
                {
                  target: '.gabs-avatar',
                  content:
                    'Este é o G•One, assistente do portfólio. Clique para interagir ou buscar explicações rápidas nas áreas marcadas.',
                },
                {
                  target: '[data-gabs="featured-project-1"]',
                  content:
                    'Este é um projeto em destaque. Clique para ver mais detalhes sobre este projeto.',
                  route: '/projects',
                },
                {
                  target: '[data-gabs="contact-button"]',
                  content:
                    'Use este botão para abrir o formulário de contato e enviar uma mensagem diretamente.',
                  route: '/contact',
                },
              ]}
            />
          </Suspense>
        )}
        <Analytics />
      </ClientOnly>
    </Providers>
  );
}

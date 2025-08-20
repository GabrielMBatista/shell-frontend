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
                  'Olá! Eu sou o G•One, assistente oficial do portfólio de Gabriel Marques.Estou aqui para te ajudar a explorar o site, entender as escolhas técnicas e conhecer os projetos do Gabriel com clareza.💡 Clique em ❓ para iniciar o tour guiado pelas principais áreas.▶️ Use o botão verde para destacar os itens interativos com explicações extras (marcados com data-gabs).Como posso te ajudar hoje?',
              }}
              fixedTourSteps={[
                {
                  target: '.gabs-avatar',
                  content:
                    'Este é o G•One, assistente do portfólio. Clique para conversar ou obter ajuda contextual.',
                },
                {
                  target: '.dynamic-tour',
                  content:
                    'Esse é o tour dinamico ao ativar items destacados podem fornecer mais detalhes ao serem clicados.',
                },
                {
                  target: '[data-gabs="nav-projects"]',
                  content:
                    'Use o menu para navegar entre as páginas. Aqui você pode acessar os projetos.',
                  route: '/home',
                },
                {
                  target: '[data-gabs="view-projects-button"]',
                  content: 'Comece explorando os projetos clicando neste botão.',
                  route: '/home',
                },
                {
                  target: '[data-gabs="frontend"]',
                  content:
                    'Cada card de habilidade oferece uma explicação rápida. Explore para conhecer minhas especialidades.',
                  route: '/home',
                },
                {
                  target: '[data-gabs="featured-project-1"]',
                  content: 'Este é um projeto em destaque. Clique para ver mais detalhes.',
                  route: '/projects',
                },
                {
                  target: '[data-gabs="about-download-cv"]',
                  content: 'Baixe meu currículo para conhecer mais sobre minha trajetória.',
                  route: '/about',
                },
                {
                  target: '[data-gabs="contact-button"]',
                  content:
                    'Pronto para entrar em contato? Use este botão para enviar uma mensagem.',
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

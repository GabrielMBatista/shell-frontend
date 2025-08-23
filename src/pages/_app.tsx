import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Providers } from '@/providers/providers';
import { ClientOnly } from '@/utils/client-only';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Suspense, useEffect } from 'react';
import { Inter } from 'next/font/google';
import { useTheme } from '@/hooks/useTheme';
import { useClarity } from '@/hooks/useClarity';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Loading from '@/components/common/Loading';
import dynamic from 'next/dynamic';
import { TourStep } from '@/types/chatbot';
import { isEnvTrue } from '@/utils/env';
import { useIsMobile } from '@/hooks/useMobile';
import { useWidgetPosition } from '@/hooks/useWidgetPosition';

const isChatbotEnabled = isEnvTrue(process.env.NEXT_PUBLIC_CHATBOT);
const isTourMobileEnabled = isEnvTrue(process.env.NEXT_PUBLIC_TOUR_MOBILE);

declare global {
  interface Window {
    startGabsTour?: () => void;
  }
}

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const GabsIAWidget = isChatbotEnabled
  ? dynamic(() => import('@/components/common/GabsIAWidget').then((mod) => mod.GabsIAWidget), {
      ssr: false,
      loading: () => <Loading />,
    })
  : null;

const GabsTourWidgetDynamic = isTourMobileEnabled
  ? dynamic(() => import('@/components/common/GabsTourWidget').then((mod) => mod.GabsTourWidget), {
      ssr: false,
      loading: () => <Loading />,
    })
  : null;

function useGabsIATourStarter() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.startGabsTour = async () => {
        try {
          const mod = await import('Chatbot/GabsIAWidget');
        if (mod?.startGabsTour) {
            mod.startGabsTour();
          } else if (mod?.default?.startGabsTour) {
            mod.default.startGabsTour();
          } else {
            window.dispatchEvent(new CustomEvent('startGabsTour'));
          }
        } catch (err) {
          console.error('Não foi possível iniciar o tour do GabsIA:', err);
        }
      };
    }
  }, []);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const { isDark, setIsDark } = useTheme();
  const widgetPos = useWidgetPosition('gabs-header-anchor', 64);
  const widgetPosTour = useWidgetPosition('tour-header-anchor', 32);
  useClarity();
  const isMobile = useIsMobile();

  useGabsIATourStarter();

  const tourSteps: TourStep[] = isMobile
    ? [
        { target: '[data-gabs="nav-mobile-menu"]', content: 'Este é o menu mobile. Toque para abrir as opções de navegação.', route: '/home' },
        { target: '[data-gabs="frontend"]', content: 'Cada card de habilidade oferece uma explicação rápida. Explore para conhecer minhas especialidades.', route: '/home' },
        { target: '[data-gabs="featured-project-1"]', content: 'Este é um projeto em destaque. Toque para ver mais detalhes.', route: '/projects' },
        { target: '[data-gabs="about-download-cv"]', content: 'Baixe meu currículo para conhecer mais sobre minha trajetória.', route: '/about' },
        { target: '[data-gabs="contact-button"]', content: 'Pronto para entrar em contato? Use este botão para enviar uma mensagem.', route: '/contact' },
      ]
    : [
        { target: '.gabs-avatar', content: 'Este é o G•One, assistente do portfólio. Clique para conversar ou obter ajuda contextual.' },
        { target: '.dynamic-tour', content: 'No desktop, itens destacados podem fornecer mais detalhes ao serem clicados.' },
        { target: '[data-gabs="nav-projects"]', content: 'Use o menu para navegar entre as páginas. Aqui você pode acessar os projetos.', route: '/home' },
        { target: '[data-gabs="view-projects-button"]', content: 'Comece explorando os projetos clicando neste botão.', route: '/home' },
        { target: '[data-gabs="frontend"]', content: 'Cada card de habilidade oferece uma explicação rápida. Explore para conhecer minhas especialidades.', route: '/home' },
        { target: '[data-gabs="featured-project-1"]', content: 'Este é um projeto em destaque. Clique para ver mais detalhes.', route: '/projects' },
        { target: '[data-gabs="about-download-cv"]', content: 'Baixe meu currículo para conhecer mais sobre minha trajetória.', route: '/about' },
        { target: '[data-gabs="contact-button"]', content: 'Pronto para entrar em contato? Use este botão para enviar uma mensagem.', route: '/contact' },
      ];

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

        {isMobile && GabsTourWidgetDynamic && (
          <Suspense fallback={<Loading />}>
            <GabsTourWidgetDynamic
              fixedTourSteps={tourSteps}
              initialStep={0}
              fixedPosition={widgetPosTour}
            />
          </Suspense>
        )}

        {!isMobile && (
          <>
            {GabsTourWidgetDynamic && (
              <Suspense fallback={<Loading />}>
                <GabsTourWidgetDynamic fixedTourSteps={tourSteps} initialStep={0} />
              </Suspense>
            )}

            {GabsIAWidget && (
              <Suspense fallback={<Loading />}>
                <GabsIAWidget
                  fixedPosition={widgetPos}
                  initialMessage={{
                    question: '',
                    answer: `Olá! Eu sou o <b>G•One</b>, assistente do portfólio de Gabriel Marques.  
Vou te ajudar a explorar o site, entender as escolhas técnicas e conhecer seus projetos. 
<span style="font-size:1.2em;">💡</span> <b>Dica:</b> Clique em <span style="color:#0028af;">❓</span> para iniciar o <b>tour</b> ou em <span style="color:#28a745;">▶️</span> para destacar itens interativos.  
Como posso te ajudar hoje?
`,
                  }}
                  fixedTourSteps={tourSteps}
                />
              </Suspense>
            )}
          </>
        )}

        <Analytics />
      </ClientOnly>
    </Providers>
  );
}

import { useRouter, usePathname } from 'next/navigation';
import { isEnvTrue } from '@/utils/env';
import React from 'react';
import { GabsIAWidgetProps, TourStep } from '@/types/chatbot';

const isChatbotEnabled = isEnvTrue(process.env.NEXT_PUBLIC_CHATBOT);

export function GabsIAWidget({
  fixedPosition,
  initialMessage,
  fixedTourSteps,
}: {
  fixedPosition: GabsIAWidgetProps['fixedPosition'];
  initialMessage?: GabsIAWidgetProps['initialMessage'];
  fixedTourSteps?: TourStep[];
}) {
  const [GabsIA, setGabsIA] = React.useState<React.ComponentType<GabsIAWidgetProps> | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Função de navegação para passar ao federado
  const handleNavigate = (route: string) => {
    if (route && pathname !== route) {
      console.log('Navigating to route:', route);
      router.push(route);
    }
  };

  React.useEffect(() => {
    if (isChatbotEnabled) {
      (async () => {
        try {
          const mod = await import('Chatbot/GabsIAWidget');
          if (!mod?.default) {
            console.error('Módulo remoto Chatbot/GabsIAWidget não contém um componente padrão.');
            return;
          }
          setGabsIA(() => mod.default);
        } catch (error) {
          console.error('Erro ao carregar o módulo remoto Chatbot/GabsIAWidget:', error);
        }
      })();
    } else {
      console.log('Chatbot está desabilitado. Componente não será exibido.');
    }
  }, []);

  if (!isChatbotEnabled) return null;
  if (!GabsIA) return null;

  return (
    <GabsIA
      fixedPosition={fixedPosition}
      initialMessage={initialMessage}
      fixedTourSteps={fixedTourSteps}
      onNavigate={handleNavigate}
    />
  );
}

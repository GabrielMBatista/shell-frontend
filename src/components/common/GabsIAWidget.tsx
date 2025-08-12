import { isEnvTrue } from '@/utils/env';
import React from 'react';

const isChatbotEnabled = isEnvTrue(process.env.NEXT_PUBLIC_CHATBOT);

type DockPos = Partial<{ top: number; left: number; right: number; bottom: number }>;

export function GabsIAWidget({ fixedPosition }: { fixedPosition: DockPos }) {
  const [GabsIA, setGabsIA] = React.useState<React.ComponentType<{
    tourEnabled: boolean;
    fixedPosition: DockPos;
  }> | null>(null);

  React.useEffect(() => {
    if (isChatbotEnabled) {
      (async () => {
        try {
          interface ChatbotWindow {
            Chatbot?: {
              GabsIAWidget?: React.ComponentType<{
                tourEnabled: boolean;
                fixedPosition: DockPos;
              }>;
            };
          }

          const mod = (window as unknown as ChatbotWindow).Chatbot?.GabsIAWidget;
          if (!mod) {
            console.warn('Módulo remoto Chatbot/GabsIAWidget não encontrado.');
            return;
          }
          setGabsIA(() => mod);
        } catch (error) {
          console.error('Erro ao carregar o módulo remoto:', error);
        }
      })();
    }
  }, []);

  if (!isChatbotEnabled) return null;

  if (!GabsIA) return null;

  return <GabsIA tourEnabled fixedPosition={fixedPosition} />;
}

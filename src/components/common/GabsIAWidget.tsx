import { isEnvTrue } from '@/utils/env';
import React from 'react';

const isChatbotEnabled = isEnvTrue(process.env.NEXT_PUBLIC_CHATBOT);

type DockPos = Partial<{ top: number; left: number; right: number; bottom: number }>;

export function GabsIAWidget({
  fixedPosition,
  initialMessage,
}: {
  fixedPosition: DockPos;
  initialMessage?: { answer: string; owner: 'gone' };
}) {
  const [GabsIA, setGabsIA] = React.useState<React.ComponentType<{
    tourEnabled: boolean;
    fixedPosition: DockPos;
  }> | null>(null);

  console.log('Componente GabsIAWidget renderizado. Estado inicial:', { GabsIA, isChatbotEnabled });
  console.log('Mensagem inicial:', initialMessage);

  React.useEffect(() => {
    if (isChatbotEnabled) {
      console.log('Chatbot está habilitado. Iniciando carregamento do módulo remoto...');
      (async () => {
        try {
          const mod = await import('Chatbot/GabsIAWidget');
          if (!mod?.default) {
            console.error('Módulo remoto Chatbot/GabsIAWidget não contém um componente padrão.');
            return;
          }
          console.log('Módulo remoto Chatbot/GabsIAWidget carregado com sucesso:', mod);
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

  if (!GabsIA) {
    console.log('Componente GabsIA ainda não está disponível. Retornando null.');
    return null;
  }

  console.log('Componente GabsIA encontrado. Renderizando...');
  return <GabsIA tourEnabled fixedPosition={fixedPosition} />;
}

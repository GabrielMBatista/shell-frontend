import { isEnvTrue } from '@/utils/env';
import React from 'react';

const isChatbotEnabled = isEnvTrue(process.env.NEXT_PUBLIC_CHATBOT);

type DockPos = Partial<{ top: number; left: number; right: number; bottom: number }>;

export function GabsIAWidget({ fixedPosition }: { fixedPosition: DockPos }) {
  const [GabsIA, setGabsIA] = React.useState<React.ComponentType<{
    tourEnabled: boolean;
    fixedPosition: DockPos;
  }> | null>(null);

  console.log('Componente GabsIAWidget renderizado. Estado inicial:', { GabsIA, isChatbotEnabled });

  React.useEffect(() => {
    if (isChatbotEnabled) {
      console.log('Chatbot está habilitado. Iniciando carregamento do módulo remoto...');
      (async () => {
        try {
          const mod = await import('Chatbot/GabsIAWidget');
          console.log('Módulo remoto Chatbot/GabsIAWidget carregado:', mod);
          setGabsIA(() => mod.default || mod);
        } catch (error) {
          console.error('Erro ao carregar o módulo remoto Chatbot/GabsIAWidget:', error);
          alert(
            'Erro ao carregar o módulo remoto. Verifique a configuração do módulo federado e a disponibilidade do servidor.',
          );
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

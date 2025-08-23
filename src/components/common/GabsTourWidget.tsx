import React from 'react';
import { DockPos, TourStep } from '@/types/chatbot';
import Loading from './Loading';
import { useRouter, usePathname } from 'next/navigation';
import { isEnvTrue } from '@/utils/env';

const isTourMobileEnabled = isEnvTrue(process.env.NEXT_PUBLIC_TOUR_MOBILE);

const tourMobileEnabled = isTourMobileEnabled;

export interface GabsTourWidgetProps {
  fixedTourSteps: TourStep[];
  initialStep?: number;
  onNavigate?: (route: string) => void;
  fixedPosition?: DockPos;
}

export function GabsTourWidget(props: GabsTourWidgetProps) {
  const [GabsTour, setGabsTour] = React.useState<React.ComponentType<GabsTourWidgetProps> | null>(
    null,
  );
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (route: string) => {
    if (route && pathname !== route) {
      router.push(route);
    }
  };

  React.useEffect(() => {
    if (tourMobileEnabled) {
      (async () => {
        try {
          const mod = await import('Chatbot/GabsTourWidget');
          if (!mod?.default) {
            console.error('Módulo remoto Chatbot/GabsTourWidget não contém um componente padrão.');
            return;
          }
          setGabsTour(() => mod.default);
        } catch (error) {
          console.error('Erro ao carregar o módulo remoto Chatbot/GabsTourWidget:', error);
        }
      })();
    } else {
      console.log('Tour mobile está desabilitado. Componente não será exibido.');
    }
  }, []);

  if (!tourMobileEnabled) return null;
  if (!GabsTour) return <Loading />;

  return <GabsTour {...props} onNavigate={handleNavigate} fixedPosition={props.fixedPosition} />;
}

export default GabsTourWidget;

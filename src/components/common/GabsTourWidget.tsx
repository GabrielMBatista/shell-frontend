import React from 'react';
import { DockPos, TourStep } from '@/types/chatbot';
import Loading from './Loading';
import { useRouter, usePathname } from 'next/navigation';
import { isEnvTrue } from '@/utils/env';

const isTourMobileEnabled = isEnvTrue(process.env.NEXT_PUBLIC_TOUR_MOBILE);

export interface GabsTourWidgetProps {
  fixedTourSteps: TourStep[];
  initialStep?: number;
  onNavigate?: (route: string) => void;
  fixedPosition?: DockPos;
}

export function GabsTourWidget(props: GabsTourWidgetProps) {
  const [GabsTour, setGabsTour] =
    React.useState<React.ComponentType<GabsTourWidgetProps> | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const mountedRef = React.useRef(true);

  const handleNavigate = React.useCallback(
    (route: string) => {
      if (route && pathname !== route) {
        router.push(route);
      }
    },
    [pathname, router],
  );

  React.useEffect(() => {
    mountedRef.current = true;
    if (!isTourMobileEnabled) {
      // silencioso quando desabilitado
      return;
    }

    (async () => {
      try {
        const mod = await import('Chatbot/GabsTourWidget');
        const Comp =
          (mod && (mod as any).default) || // default export
          (mod && (mod as any).GabsTourWidget) || // named export (fallback)
          null;

        if (!Comp) {
          console.error('Módulo remoto Chatbot/GabsTourWidget não exporta um componente válido.');
          return;
        }

        if (mountedRef.current) {
          setGabsTour(() => Comp as React.ComponentType<GabsTourWidgetProps>);
        }
      } catch (error) {
        console.error('Erro ao carregar Chatbot/GabsTourWidget:', error);
      }
    })();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  if (!isTourMobileEnabled) return null;
  if (!GabsTour) return <Loading />;

  return (
    <GabsTour
      {...props}
      onNavigate={props.onNavigate ?? handleNavigate}
      fixedPosition={props.fixedPosition}
    />
  );
}

export default GabsTourWidget;
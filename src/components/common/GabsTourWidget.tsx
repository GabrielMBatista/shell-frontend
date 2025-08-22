import React from 'react';
import { TourStep } from '@/types/chatbot';
import Loading from './Loading';
import { useRouter, usePathname } from 'next/navigation';
import { HelpCircle } from 'lucide-react';
import { isEnvTrue } from '@/utils/env';

const isChatbotEnabled = isEnvTrue(process.env.NEXT_PUBLIC_CHATBOT);

export interface GabsTourWidgetProps {
  fixedTourSteps: TourStep[];
  initialStep?: number;
  onNavigate?: (route: string) => void;
  fixedPosition?: Partial<{ top: number; left: number; right: number; bottom: number }>;
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
    if (isChatbotEnabled) {
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
      console.log('Chatbot está desabilitado. Componente não será exibido.');
    }
  }, []);

  const isDark =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;

  const fixedStyle = props.fixedPosition
    ? {
        position: 'fixed' as const,
        zIndex: 100,
        top: props.fixedPosition.top,
        left: props.fixedPosition.left,
        width: 64,
        height: 64,
        pointerEvents: 'auto' as React.CSSProperties['pointerEvents'],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        background: isDark
          ? 'linear-gradient(90deg,#1e293b 0%,#4f46e5 100%)'
          : 'linear-gradient(90deg,#e0e7ff 0%,#6366f1 100%)',
        border: isDark ? '2px solid #fff' : '2px solid #0028af',
        boxShadow: isDark
          ? '0 0 8px #fff, 0 2px 8px #1e293b'
          : '0 0 8px #0028af, 0 2px 8px #e0e7ff',
      }
    : undefined;

  if (!isChatbotEnabled) return null;
  if (!GabsTour) return <Loading />;

  if (props.fixedPosition) {
    return (
      <div style={fixedStyle}>
        <HelpCircle
          size={32}
          color={isDark ? '#fff' : '#0028af'}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            zIndex: 101,
            filter: isDark ? 'drop-shadow(0 0 2px #fff)' : 'drop-shadow(0 0 2px #0028af)',
          }}
          aria-label="Iniciar tour"
          onClick={() => {
            if (typeof window !== 'undefined' && window.startGabsTour) {
              window.startGabsTour();
            }
          }}
        />
        <GabsTour {...props} onNavigate={handleNavigate} fixedPosition={props.fixedPosition} />
      </div>
    );
  }

  return <GabsTour {...props} onNavigate={handleNavigate} fixedPosition={props.fixedPosition} />;
}

export default GabsTourWidget;

import React from 'react';
import dynamic from 'next/dynamic';
import { TourStep } from '@/types/chatbot';
import Loading from './Loading';
import { useRouter, usePathname } from 'next/navigation';
import { HelpCircle } from 'lucide-react';

export interface GabsTourWidgetProps {
  fixedTourSteps: TourStep[];
  initialStep?: number;
  onNavigate?: (route: string) => void;
  fixedPosition?: Partial<{ top: number; left: number; right: number; bottom: number }>;
}

const FederatedGabsTourWidget = dynamic<GabsTourWidgetProps>(
  () => import('Chatbot/GabsTourWidget').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

export function GabsTourWidget(props: GabsTourWidgetProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (route: string) => {
    if (route && pathname !== route) {
      router.push(route);
    }
  };

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
        <FederatedGabsTourWidget
          {...props}
          onNavigate={handleNavigate}
          fixedPosition={props.fixedPosition}
        />
      </div>
    );
  }

  // Desktop: renderiza normalmente
  return (
    <FederatedGabsTourWidget
      {...props}
      onNavigate={handleNavigate}
      fixedPosition={props.fixedPosition}
    />
  );
}

export default GabsTourWidget;

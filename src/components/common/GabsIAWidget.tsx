import { isEnvTrue } from '@/utils/env';
import dynamic from 'next/dynamic';

const isChatbotEnabled = isEnvTrue(process.env.NEXT_PUBLIC_CHATBOT);

const GabsIA = isChatbotEnabled
  ? dynamic<import('Chatbot/GabsIAWidget').GabsIAWidgetProps>(
      () => import('Chatbot/GabsIAWidget').then((m) => m.default),
      { ssr: false },
    )
  : null;

type DockPos = Partial<{ top: number; left: number; right: number; bottom: number }>;

export function GabsIAWidget({ fixedPosition }: { fixedPosition: DockPos }) {
  if (!isChatbotEnabled || !GabsIA) return null;
  return <GabsIA tourEnabled fixedPosition={fixedPosition} />;
}

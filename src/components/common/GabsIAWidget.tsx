import dynamic from 'next/dynamic';

const GabsIA = dynamic<import('Chatbot/GabsIAWidget').GabsIAWidgetProps>(
  () => import('Chatbot/GabsIAWidget').then((m) => m.default),
  { ssr: false },
);

type DockPos = Partial<{ top: number; left: number; right: number; bottom: number }>;

export function GabsIAWidget({ fixedPosition }: { fixedPosition: DockPos }) {
  return <GabsIA tourEnabled fixedPosition={fixedPosition} />;
}

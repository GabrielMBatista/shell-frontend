import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const RemoteApp = dynamic(() => import('Chatbot/Chatbot').then((mod) => mod.default), {
  ssr: false,
  loading: () => <ui-loading />,
});

export default function ChatbotPage() {
  return (
    <Suspense fallback={<ui-loading />}>
      <RemoteApp />
    </Suspense>
  );
}

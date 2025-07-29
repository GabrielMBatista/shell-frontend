import Loading from '@/utils/loading';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const RemoteApp = dynamic(() => import('Chatbot/Chatbot').then((mod) => mod.default), {
  ssr: false,
  loading: () => <Loading />,
});

export default function ChatbotPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RemoteApp />
    </Suspense>
  );
}

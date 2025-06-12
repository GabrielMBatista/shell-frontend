import Loading from '@/utils/loading';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const RemoteApp = dynamic(() => import('Dashboard/Dashboard').then((mod) => mod.default), {
  ssr: false,
  loading: () => <Loading />,
});

export default function ChatbotPage() {
  return (
    <Suspense fallback={<Loading />}>
      <h1>Chatbot vindo do MFE remoto ✅</h1>
      <RemoteApp />
    </Suspense>
  );
}

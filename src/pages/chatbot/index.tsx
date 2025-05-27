import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const RemoteApp = dynamic(() => import('Chatbot/Chatbot').then((mod) => mod.default), {
  ssr: false,
  loading: () => <span>Carregando animação...</span>,
});

// const RemoteChatbot = dynamic(() => import('Chatbot/Chatbot'), {
//   ssr: false,
//   suspense: true,
// });

export default function ChatbotPage() {
  return (
    <Suspense fallback={<div>Carregando Chatbot...</div>}>
      <h1>Chatbot vindo do MFE remoto ✅</h1>
      <RemoteApp />
    </Suspense>
  );
}

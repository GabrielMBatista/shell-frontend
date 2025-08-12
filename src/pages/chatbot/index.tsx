import React, { lazy, Suspense } from 'react';
import Loading from '@/components/common/Loading';

const RemoteApp = lazy(() => import('Chatbot/Chatbot').then((mod) => mod.default));

export default function ChatbotPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loading />
        </div>
      }
    >
      <RemoteApp />
    </Suspense>
  );
}

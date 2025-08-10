'use client';

import { ReactNode } from 'react';
import { I18nProvider } from './I18nProvider';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { ResolutionProvider } from './ResolutionProvider';
import { ChatStoreProvider } from './ChatStoreProvider';

export function Providers({ children, session }: { children: ReactNode; session: Session | null }) {
  return (
    <I18nProvider>
      <ResolutionProvider>
        <SessionProvider session={session}>
          <ChatStoreProvider>{children}</ChatStoreProvider>
        </SessionProvider>
      </ResolutionProvider>
    </I18nProvider>
  );
}

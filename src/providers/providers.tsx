'use client';

import { ReactNode } from 'react';
import { I18nProvider } from './I18nProvider';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

export function Providers({ children, session }: { children: ReactNode; session: Session | null }) {
  return (
    <I18nProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </I18nProvider>
  );
}

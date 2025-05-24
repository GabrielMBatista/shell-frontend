'use client';

import { I18nProvider } from '@/providers/I18nProvider';
import { ReactNode } from 'react';

// Se tiver outros providers, importa aqui
// import { ThemeProvider } from './providers/ThemeProvider';
// import { AuthProvider } from './providers/AuthProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      {/* Outros providers podem ser aninhados aqui */}
      {children}
    </I18nProvider>
  );
}

'use client';

import { ReactNode } from 'react';
import { I18nProvider } from './I18nProvider';
// Exemplo de outros providers caso use:
// import { ThemeProvider } from './ThemeProvider';
// import { AuthProvider } from './AuthProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      {/* Exemplo de outros providers: */}
      {/* <AuthProvider> */}
      {/* <ThemeProvider> */}
      {children}
      {/* </ThemeProvider> */}
      {/* </AuthProvider> */}
    </I18nProvider>
  );
}

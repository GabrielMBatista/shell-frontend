'use client';
import { useEffect, useState } from 'react';
import { defineCustomElements } from '@gabrielmbatista/ui-library-stencil/loader';
import Loading from './loading';

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    defineCustomElements(window);
  }, []);

  if (!mounted) return <Loading />;
  return <>{children}</>;
}

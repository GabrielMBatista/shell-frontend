'use client';
import dynamic from 'next/dynamic';
import { I18nProvider } from '@/providers/I18nProvider';

const HomePage = dynamic(() => import('@/components/pages/Home'), { ssr: false });

export default function Page({ isDark }: { isDark: boolean }) {
  return (
    <I18nProvider>
      <HomePage isDark={isDark} />
    </I18nProvider>
  );
}

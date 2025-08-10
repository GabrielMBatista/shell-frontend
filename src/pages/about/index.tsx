'use client';
import dynamic from 'next/dynamic';
import { I18nProvider } from '@/providers/I18nProvider';

const AboutPage = dynamic(() => import('@/components/pages/About'), { ssr: false });

export default function Page({ isDark }: { isDark: boolean }) {
  return (
    <I18nProvider>
      <AboutPage isDark={isDark} />
    </I18nProvider>
  );
}

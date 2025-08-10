'use client';
import dynamic from 'next/dynamic';
import { I18nProvider } from '@/providers/I18nProvider';

const ContactPage = dynamic(() => import('@/components/pages/Contact'), { ssr: false });

export default function Page({ isDark }: { isDark: boolean }) {
  return (
    <I18nProvider>
      <ContactPage isDark={isDark} />
    </I18nProvider>
  );
}

'use client';
import dynamic from 'next/dynamic';

const ContactPage = dynamic(() => import('@/components/pages/Contact'), { ssr: false });

export default function Page({ isDark }: { isDark: boolean }) {
  return <ContactPage isDark={isDark} />;
}

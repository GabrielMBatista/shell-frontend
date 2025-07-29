'use client';
import dynamic from 'next/dynamic';

const AboutPage = dynamic(() => import('@/components/pages/About'), { ssr: false });

export default function Page({ isDark }: { isDark: boolean }) {
  return <AboutPage isDark={isDark} />;
}

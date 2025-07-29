'use client';
import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@/components/pages/Home'), { ssr: false });

export default function Page({ isDark }: { isDark: boolean }) {
  return <HomePage isDark={isDark} />;
}

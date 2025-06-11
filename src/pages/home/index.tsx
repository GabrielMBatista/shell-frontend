'use client';
import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@/components/pages/HomePage'), { ssr: false });

export default function Page() {
  return <HomePage />;
}

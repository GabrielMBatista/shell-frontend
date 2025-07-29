'use client';
import dynamic from 'next/dynamic';

const ProjectPage = dynamic(() => import('@/components/pages/Project'), { ssr: false });

export default function Page({ isDark }: { isDark: boolean }) {
  return <ProjectPage isDark={isDark} />;
}

'use client';
import dynamic from 'next/dynamic';

const ProjectPage = dynamic(() => import('@/components/pages/Projetos'), { ssr: false });

export default function Page() {
  return <ProjectPage />;
}

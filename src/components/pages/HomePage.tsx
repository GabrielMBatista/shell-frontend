'use client';
import { useSession } from 'next-auth/react';
import Header from '../common/header';

export default function HomePage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'Visitante';
  return (
    <div>
      <Header />
      <main style={{ padding: 'var(--space-lg)', fontFamily: 'var(--font-base)' }}>
        <h2 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-md)' }}>
          Bem-vindo, {userName}!
        </h2>
        <p>Este é o portfólio profissional de Gabriel Marques — desenvolvedor front-end.</p>
        <ui-theme-configurator/>
      </main>
    </div>
  );
}

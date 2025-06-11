import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  const userImage = session?.user?.image || 'https://picsum.photos/id/64/4326/2884.jpg';

  return (
    <ui-header>
      <span slot="left">
        <a href="/" className="ui-header-logo">
          <Image src="https://picsum.photos/32" alt="Brand Logo" width="32" height="32" />
        </a>
      </span>
      <span slot="center" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
        Portfólio
      </span>
      <ui-navbar slot="navbar" insideHeader={true}>
        <span slot="left">
          <Link href="/" passHref legacyBehavior>
            <a>
              <ui-navbar-slot icon="home" label="Início" />
            </a>
          </Link>
        </span>
        <span slot="center">
          <Link href="/projetos" passHref legacyBehavior>
            <a>
              <ui-navbar-slot label="Projetos" />
            </a>
          </Link>
          <Link href="/sobre" passHref legacyBehavior>
            <a>
              <ui-navbar-slot label="Sobre" />
            </a>
          </Link>
        </span>
        <span slot="right">
          <ui-navbar-slot>
            <ui-avatar src={userImage} size={32} />
          </ui-navbar-slot>
        </span>
      </ui-navbar>
    </ui-header>
  );
}

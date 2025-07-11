import Link from 'next/link';
// import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  const userImage = session?.user?.image || 'https://picsum.photos/id/64/4326/2884.jpg';

  return (
    <ui-header fixed={true}>
      {/* <div slot="left">
        <a href="/" className="ui-header-logo">
          <Image src="https://picsum.photos/32" alt="Brand Logo" width="32" height="32" />
        </a>
      </div> */}
      {/* <span slot="center" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
        Portfólio
      </span> */}
      <ui-navbar slot="navbar" insideHeader={true}>
        <span slot="left">
          <Link href="/" passHref>
            <ui-navbar-slot icon="home" label="Início" />
          </Link>
        </span>
        <span slot="center">
          <Link href="/projetos" passHref>
            <ui-navbar-slot label="Projetos" />
          </Link>
          <Link href="/sobre" passHref>
            <ui-navbar-slot label="Sobre" />
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

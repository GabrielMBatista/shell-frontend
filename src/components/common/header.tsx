import Link from 'next/link';
// import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  const userImage = session?.user?.image || 'https://picsum.photos/id/64/4326/2884.jpg';

  return (
    <ui-header fixed={true}>
      <ui-navbar slot="navbar" insideHeader={true}>
        {/* <span slot="left">
          <Link href="/" passHref>
            <ui-navbar-slot icon="home"/>
          </Link>
        </span> */}
        <span slot="center">
          <ui-navbar-slot label="Gabriel Marques Batista" />
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

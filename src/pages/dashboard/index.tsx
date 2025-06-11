import { getSession, GetSessionParams } from 'next-auth/react';

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

interface SessionProps {
  session: {
    user: {
      name: string;
      email: string;
    };
  };
}

export default function Dashboard({ session }: SessionProps) {
  return (
    <div>
      <h1>Bem-vindo, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}

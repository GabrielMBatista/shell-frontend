import { getCsrfToken } from 'next-auth/react';
import { GetServerSideProps } from 'next';

interface SignInProps {
  csrfToken: string;
}

export default function SignIn({ csrfToken }: SignInProps) {
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email:
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Senha:
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      <button type="submit">Entrar</button>
    </form>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
};

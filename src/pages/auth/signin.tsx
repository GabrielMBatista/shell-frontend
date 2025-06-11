import { CtxOrReq } from 'next-auth/client/_utils';
import { getCsrfToken } from 'next-auth/react';

interface SignInProps {
  csrfToken: string;
}

export default function SignIn({ csrfToken }: SignInProps) {
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email:
        <input name="email" type="email" />
      </label>
      <label>
        Senha:
        <input name="password" type="password" />
      </label>
      <button type="submit">Entrar</button>
    </form>
  );
}

SignIn.getInitialProps = async (context: CtxOrReq | undefined) => {
  return {
    csrfToken: await getCsrfToken(context),
  };
};

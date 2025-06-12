export const runtime = 'nodejs';

import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Credenciais não fornecidas');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Usuário não encontrado ou sem senha');
        }

        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isValid) throw new Error('Senha inválida');

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  ...(process.env.NODE_ENV === 'production'
    ? {
        cookies: {
          sessionToken: {
            name: '__Secure-next-auth.session-token',
            options: {
              httpOnly: true,
              sameSite: 'lax',
              path: '/',
              domain: '.vercel.app',
              secure: true,
            },
          },
        },
      }
    : {
        cookies: {
          sessionToken: {
            name: 'next-auth.session-token',
            options: {
              httpOnly: true,
              sameSite: 'lax',
              path: '/',
            },
          },
        },
      }),
  secret: process.env.NEXTAUTH_SECRET,
});

export default handler;

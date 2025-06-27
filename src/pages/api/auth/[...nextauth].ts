/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { token: any; session: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  ...(process.env.NODE_ENV === 'production'
    ? {}
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
};

// 🔁 handler separado
import NextAuth from 'next-auth';
const handler = NextAuth(authOptions);

export default handler;

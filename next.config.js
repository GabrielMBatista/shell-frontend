import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'storage.googleapis.com',
      'picsum.photos',
      'alphabet-recorder.vercel.app',
      'tropa-login.vercel.app',
      'mfe-entrevista-lcek.vercel.app',
      'localhost',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(new PrismaPlugin());
    }
    config.plugins.push(
      new NextFederationPlugin({
        name: 'shell',
        filename: 'static/chunks/remoteEntry.js',
        remotes: process.env.NEXT_PUBLIC_CHATBOT === 'true'
          ? {
            Chatbot: `Chatbot@${process.env.NEXT_PUBLIC_CHATBOT_REMOTE_URL}/_next/static/chunks/remoteEntry.js`,
          }
          : {},
        exposes: {
          './Error': './src/pages/_error.tsx',
          './Providers': './src/providers/providers.tsx',
        },
        shared: {
          'react-dom': { singleton: true, requiredVersion: false },
          'next-intl': { singleton: true, requiredVersion: false },
          // '@gabrielmbatista/ui-library-stencil': {
          //   singleton: true,
          //   eager: true, 
          //   requiredVersion: false,
          // },
          // 'next-auth': { singleton: true },
          // '@tanstack/react-query': { singleton: true },
          // zustand: { singleton: true },
          // i18next: { singleton: true },
          // 'react-i18next': { singleton: true },
          // 'i18next-browser-languagedetector': { singleton: true },
          // '@meta/react-components': { singleton: true },
          // 'jwt-decode': { singleton: true },
          // 'react-toastify': { singleton: true },
        },
        extraOptions: {
          exposePages: true,
          enableImageLoaderFix: true,
          automaticAsyncBoundary: true,
        },
      })
    );
    return config;
  },
  transpilePackages: ['@meta/react-components'],
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  }, 
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

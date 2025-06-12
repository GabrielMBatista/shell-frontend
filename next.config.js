import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com', 'picsum.photos'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(new PrismaPlugin());
    }
    config.plugins.push(
      new NextFederationPlugin({
        name: 'shell',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          Chatbot: `Chatbot@${process.env.NEXT_PUBLIC_CHATBOT_REMOTE_URL}/_next/static/chunks/remoteEntry.js`,
          Dashboard: `Dashboard@${process.env.NEXT_PUBLIC_DASHBOARD_REMOTE_URL}/_next/static/chunks/remoteEntry.js`,
        },
        exposes: {
          './App': './src/pages/_app.tsx',
          './Home': './src/pages/home/index.tsx',
          './Error': './src/pages/_error.tsx',
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

import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com'],
  },
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'shell',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          // exemplo:
          // dashboard: 'dashboard@http://localhost:3001/_next/static/chunks/remoteEntry.js',
          Chatbot: 'Chatbot@http://localhost:3002/_next/static/chunks/remoteEntry.js',
        },
        exposes: {
          './App': './src/pages/_app.tsx',
          './Home': './src/pages/home/index.tsx',
          './Error': './src/pages/_error.tsx',
        },
        shared: {
          'react-dom': { singleton: true, requiredVersion: false },
          'next-intl': { singleton: true, requiredVersion: false },
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
};

export default nextConfig;

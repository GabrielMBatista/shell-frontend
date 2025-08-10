'use client';
import React from 'react';
import { useGoogleFont } from '@/utils/fonts';
import dynamic from 'next/dynamic';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Code,
  Brain,
  Smartphone,
  PhoneOutgoing,
  Palette,
} from 'lucide-react';
import Image from 'next/image';
import gabrielPhoto from '@/assets/gabrielPhoto.jpg';
import Link from 'next/link';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useTranslation } from '@/hooks/useTranslation';

const CTASection = dynamic(() => import('@/components/common/CTASection'), { ssr: false });

export default function Home({ isDark }: { isDark: boolean }) {
  usePageTitle('Home');
  const fontFamily = useGoogleFont('Inter');
  const { t } = useTranslation('common');

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
      style={{ fontFamily }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    isDark
                      ? 'bg-gray-800 text-blue-400 border border-gray-700'
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {t('Home.badge.available')}
                </div>

                <h1
                  className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  {t('Home.greeting')}
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {t('Home.name')}
                  </span>
                </h1>

                <p
                  className={`text-xl md:text-2xl font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {t('Home.role')}
                </p>

                <p
                  className={`text-lg leading-relaxed max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {t('Home.intro')}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-cyan-400 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {t('Home.ctas.viewProjects')}
                  <ArrowRight size={20} />
                </Link>
                <button
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 border rounded-xl transition-all duration-200 font-medium text-lg hover:shadow-lg transform hover:-translate-y-1 ${
                    isDark
                      ? 'text-white border-gray-600 hover:bg-gray-800'
                      : 'text-gray-800 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => window.open('/Resume_Gabriel_Marques.pdf', '_blank')}
                >
                  <Download size={20} />
                  {t('Home.ctas.downloadCV')}
                </button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <span
                  className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {t('Home.connect')}
                </span>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/GabrielMBatista"
                    className={`p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
                      isDark
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
                    }`}
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gabriel-marques-batista/"
                    className={`p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
                      isDark
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
                    }`}
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="mailto:gabbriel_gbl2@hotmail.com"
                    className={`p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
                      isDark
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
                    }`}
                  >
                    <Mail size={20} />
                  </a>
                  <a
                    href="https://wa.me/5511951222379?text=Ol%C3%A1%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!"
                    className={`p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
                      isDark
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
                    }`}
                  >
                    <PhoneOutgoing size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Avatar/Image */}
            <div className="relative">
              <div className="relative z-10">
                <div
                  className={`w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-1 shadow-2xl ${
                    isDark ? 'shadow-blue-500/20' : 'shadow-blue-500/30'
                  }`}
                >
                  <Image
                    src={gabrielPhoto}
                    alt="Gabriel Marques"
                    width={320}
                    height={320}
                    priority={true}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-10 -left-4 animate-bounce">
                <div className={`p-4 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <Code size={24} className="text-blue-600" />
                </div>
              </div>
              <div className="absolute top-32 -right-8 animate-bounce delay-150">
                <div className={`p-4 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <Brain size={24} className="text-purple-600" />
                </div>
              </div>
              <div className="absolute bottom-20 -left-8 animate-bounce delay-300">
                <div className={`p-4 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <Smartphone size={24} className="text-green-600" />
                </div>
              </div>
              <div className="absolute bottom-10 right-10 animate-bounce delay-600">
                <div className={`p-4 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <Palette size={24} className="text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className={`py-20 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t('Home.skills.title')}
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {t('Home.skills.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div
              className={`p-8 rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-2 ${
                isDark
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Code size={24} className="text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('Home.skills.frontend.title')}
              </h3>
              <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('Home.skills.frontend.desc')}
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  React
                </span>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  TypeScript
                </span>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  Tailwind
                </span>
              </div>
            </div>

            {/* Backend */}
            <div
              className={`p-8 rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-2 ${
                isDark
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}
            >
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Smartphone size={24} className="text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('Home.skills.backend.title')}
              </h3>
              <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('Home.skills.backend.desc')}
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  Node.js
                </span>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  PostgreSQL
                </span>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  Docker
                </span>
              </div>
            </div>

            {/* Design */}
            <div
              className={`p-8 rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-2 ${
                isDark
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}
            >
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <Brain size={24} className="text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('Home.skills.critical.title')}
              </h3>
              <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('Home.skills.critical.desc')}
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  Análise Crítica
                </span>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  Solução Criativa
                </span>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  Estratégia
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        isDark={isDark}
        title={t('Home.finalCTA.title')}
        description={t('Home.finalCTA.description')}
        primaryLink={{ href: '/contact', label: t('Home.finalCTA.primary') }}
        secondaryLink={{ href: '/about', label: t('Home.finalCTA.secondary') }}
      />
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import { Sun, Moon, Menu, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { locales, type Locale } from '@/i18n';
import { isEnvTrue } from '@/utils/env';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export default function Header({ isDark, setIsDark }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => pathname === path;

  const { t, locale, changeLocale } = useTranslation('common');
  const isChatbotEnabled = isEnvTrue(process.env.NEXT_PUBLIC_CHATBOT);

  const handleReopenAssistant = async () => {
    try {
      interface ChatbotWindow {
        Chatbot?: {
          reopenGabsIAWidget?: () => void;
        };
      }

      const mod = (window as unknown as ChatbotWindow).Chatbot;
      if (!mod?.reopenGabsIAWidget) {
        console.warn('Módulo remoto Chatbot/GabsIAWidget não encontrado.');
        return;
      }
      mod.reopenGabsIAWidget();
    } catch (error) {
      console.error('Erro ao carregar o módulo remoto:', error);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 backdrop-blur-sm ${
        isDark ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div id="gabs-header-anchor" className="flex items-center gap-4">
            {isChatbotEnabled && (
              <button
                onClick={handleReopenAssistant}
                className="flex items-center gap-4 focus:outline-none"
                title={t('Header.tooltip.reopenAssistant')}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
              </button>
            )}
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`transition-colors ${
                isActive('/home')
                  ? 'text-blue-500 font-bold'
                  : isDark
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-900 hover:text-blue-600'
              }`}
            >
              {t('Header.nav.home')}
            </Link>
            <Link
              href="/projects"
              className={`transition-colors ${
                isActive('/projects')
                  ? 'text-blue-500 font-bold'
                  : isDark
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {t('Header.nav.projects')}
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${
                isActive('/about')
                  ? 'text-blue-500 font-bold'
                  : isDark
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {t('Header.nav.about')}
            </Link>
            <Link
              href="/contact"
              className={`transition-colors ${
                isActive('/contact')
                  ? 'text-blue-500 font-bold'
                  : isDark
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {t('Header.nav.contact')}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {/* Select de idioma (compacto) */}
            <div
              className={`flex items-center gap-1 p-1 rounded-md transition-all duration-200 ${
                isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
              }`}
              title={t('Header.lang.toggle')}
            >
              <Globe size={16} />
              <select
                value={locale}
                onChange={(e) => changeLocale(e.target.value as Locale)}
                aria-label={t('Header.lang.toggle')}
                className={`bg-transparent outline-none text-[11px] font-semibold px-1 py-0.5 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {locales.map((l) => (
                  <option key={l} value={l}>
                    {t(`Header.lang.short.${l}`)}
                  </option>
                ))}
              </select>
            </div>
            {/* Botão de tema */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg md:hidden ${
                isDark ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div
            className={`md:hidden mt-2 p-4 rounded-lg shadow-lg ${
              isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'
            }`}
          >
            <Link
              href="/"
              className={`block py-2 transition-colors ${
                isActive('/home')
                  ? 'text-blue-500 font-bold'
                  : isDark
                    ? 'hover:text-blue-400'
                    : 'hover:text-blue-600'
              }`}
            >
              {t('Header.nav.home')}
            </Link>
            <Link
              href="/projects"
              className={`block py-2 transition-colors ${
                isActive('/projects')
                  ? 'text-blue-500 font-bold'
                  : isDark
                    ? 'hover:text-blue-400'
                    : 'hover:text-blue-600'
              }`}
            >
              {t('Header.nav.projects')}
            </Link>
            <Link
              href="/about"
              className={`block py-2 transition-colors ${
                isActive('/about')
                  ? 'text-blue-500 font-bold'
                  : isDark
                    ? 'hover:text-blue-400'
                    : 'hover:text-blue-600'
              }`}
            >
              {t('Header.nav.about')}
            </Link>
            <Link
              href="/contact"
              className={`block py-2 transition-colors ${
                isActive('/contact')
                  ? 'text-blue-500 font-bold'
                  : isDark
                    ? 'hover:text-blue-400'
                    : 'hover:text-blue-600'
              }`}
            >
              {t('Header.nav.contact')}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

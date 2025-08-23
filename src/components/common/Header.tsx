'use client';
import React, { useState } from 'react';
import { Sun, Moon, Menu, Globe, HelpCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { locales, type Locale } from '@/i18n';
import { isEnvTrue, isTourMobileEnabled } from '@/utils/env';

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
  const tourMobileEnabled = isTourMobileEnabled();

  // Detecta se está em mobile
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

  const handleTourClick = async () => {
    if (isMobile && window.startGabsTour) {
      window.startGabsTour();
      return;
    }
    // fallback para desktop: importa e chama direto do federado
    try {
      const mod = await import('Chatbot/GabsIAWidget');
      if (mod?.startGabsTour) {
        mod.startGabsTour();
      } else {
        window.dispatchEvent(new CustomEvent('startGabsTour'));
      }
    } catch (error) {
      console.error('Erro ao carregar o módulo remoto Chatbot/GabsIAWidget:', error);
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
            {isMobile && tourMobileEnabled && isChatbotEnabled && (
              <button
                onClick={handleTourClick}
                className="flex items-center gap-4 focus:outline-none"
                title={t('Header.tooltip.reopenAssistant')}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    isDark
                      ? 'bg-gradient-to-r from-blue-700 to-purple-700 border-2 border-white'
                      : 'bg-gradient-to-r from-blue-500 to-purple-400 border-2 border-blue-900'
                  }`}
                >
                  <HelpCircle
                    size={28}
                    color={isDark ? '#fff' : '#0028af'}
                    style={{
                      cursor: 'pointer',
                      filter: isDark ? 'drop-shadow(0 0 2px #fff)' : 'drop-shadow(0 0 2px #0028af)',
                    }}
                    aria-label="Iniciar tour"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.startGabsTour) window.startGabsTour();
                    }}
                  />
                </div>
              </button>
            )}
            {!isMobile && isChatbotEnabled && (
              <div
                className={`gabs-avatar w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isDark
                    ? 'bg-gradient-to-r from-blue-700 to-purple-700 border-2 border-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-400 border-2 border-blue-900'
                }`}
                title="G•One Assistente"
                aria-label="Assistente do portfólio"
              >
              </div>
            )}
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              data-gabs="nav-home"
              gabs-content="Retorna à página inicial, oferecendo um panorama completo do portfólio. Demonstra o roteamento single-page em React, ao mesmo tempo que dá ao visitante um ponto seguro para reiniciar a navegação."
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
              data-gabs="nav-projects"
              gabs-content="Direciona para a página de projetos, onde estão exemplos práticos de soluções. Técnicos veem a organização de código e integrações; não técnicos encontram histórias de impacto e resultados."
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
              data-gabs="nav-about"
              gabs-content="Leva à seção “Sobre”, com detalhes da trajetória profissional. Ilustra como o site gerencia conteúdo estático e fornece contexto pessoal para qualquer recrutador."
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
              data-gabs="nav-contact"
              gabs-content="Abre a área de contato para envio de mensagens. Evidencia uso de formulários e validações (para técnicos) e facilita o início de um diálogo (para não técnicos)."
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
                data-gabs="lang-toggle"
                gabs-content="Alterna o idioma do site. Mostra a implementação de i18n e torna o conteúdo acessível a públicos distintos."
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
              data-gabs="theme-toggle"
              gabs-content="Muda entre temas claro e escuro. Demonstra controle de estado e design system, além de melhorar a acessibilidade visual para todos."
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
              aria-label="Iniciar menu"
              data-gabs="nav-mobile-menu"
              gabs-content="Abre o menu de navegação mobile."
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
              data-gabs="nav-home"
              gabs-content="Retorna à página inicial, oferecendo um panorama completo do portfólio. Demonstra o roteamento single-page em React, ao mesmo tempo que dá ao visitante um ponto seguro para reiniciar a navegação."
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
              data-gabs="nav-projects"
              gabs-content="Direciona para a página de projetos, onde estão exemplos práticos de soluções. Técnicos veem a organização de código e integrações; não técnicos encontram histórias de impacto e resultados."
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
              data-gabs="nav-about"
              gabs-content="Leva à seção “Sobre”, com detalhes da trajetória profissional. Ilustra como o site gerencia conteúdo estático e fornece contexto pessoal para qualquer recrutador."
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
              data-gabs="nav-contact"
              gabs-content="Abre a área de contato para envio de mensagens. Evidencia uso de formulários e validações (para técnicos) e facilita o início de um diálogo (para não técnicos)."
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

'use client';
import React, { useState } from 'react';
import { Sun, Moon, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// import { reopenGabsIAWidget } from 'Chatbot/GabsIAWidget';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export default function Header({ isDark, setIsDark }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 backdrop-blur-sm ${
        isDark ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* <div className="flex items-center gap-4">
            <button
              onClick={reopenGabsIAWidget}
              className="flex items-center gap-4 focus:outline-none"
              title="Reabrir assistente Gabs.IA"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Gabs IA
              </span>
            </button>
          </div> */}
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
              Home
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
              Projetos
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
              Sobre
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
              Contato
            </Link>
          </nav>
          <div className="flex items-center gap-4">
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
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Alterna o estado do menu
              className={`p-2 rounded-lg md:hidden ${
                isDark ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
        {isMenuOpen && ( // Renderiza o menu suspenso no mobile
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
              Home
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
              Projetos
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
              Sobre
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
              Contato
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

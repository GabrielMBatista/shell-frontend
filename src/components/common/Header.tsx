/* eslint-disable @next/next/no-html-link-for-pages */
'use client';
import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export default function Header({ isDark, setIsDark }: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 backdrop-blur-sm ${
        isDark ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Gabs IA
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="/"
              className={`transition-colors ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'}`}
            >
              Home
            </a>
            <a
              href="/projects"
              className={`transition-colors ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Projetos
            </a>
            <a
              href="/about"
              className={`transition-colors ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Sobre
            </a>
            <a
              href="/contact"
              className={`transition-colors ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Contato
            </a>
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
              className={`p-2 rounded-lg md:hidden ${isDark ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

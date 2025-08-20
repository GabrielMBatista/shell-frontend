'use client';
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 Gabriel Marques. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/GabrielMBatista"
              data-gabs="footer-github"
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/gabriel-marques-batista/"
              data-gabs="footer-linkedin"
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:gabbriel_gbl2@hotmail.com"
              data-gabs="footer-email"
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

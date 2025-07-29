'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  isDark: boolean;
  title: string;
  description: string;
  primaryLink: { href: string; label: string };
  secondaryLink?: { href: string; label: string };
}

export default function CTASection({
  isDark,
  title,
  description,
  primaryLink,
  secondaryLink,
}: CTASectionProps) {
  return (
    <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
        >
          {title}
        </h2>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={primaryLink.href}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-cyan-400 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {primaryLink.label}
            <ArrowRight size={20} />
          </a>
          {secondaryLink && (
            <a
              href={secondaryLink.href}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 border rounded-xl transition-all duration-200 font-medium text-lg hover:shadow-lg transform hover:-translate-y-1 ${
                isDark
                  ? 'text-white border-gray-600 hover:bg-gray-700'
                  : 'text-gray-800 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {secondaryLink.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

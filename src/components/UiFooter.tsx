'use client';
import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  isDark?: boolean;
  className?: string;
}

export default function UIFooter({ isDark = false, className = '' }: FooterProps) {
  const footerStyles = {
    backgroundColor: isDark ? 'var(--color-surface-dark)' : 'var(--color-surface)',
    borderTop: `1px solid ${isDark ? 'var(--color-surface-darker)' : 'var(--color-border)'}`,
    padding: 'var(--space-xl) 0',
    marginTop: 'auto',
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 var(--space-lg)`,
  };

  const contentStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--space-lg)',
    alignItems: 'center',
    textAlign: 'center' as const,
  };

  const socialLinksStyles = {
    display: 'flex',
    gap: 'var(--space-md)',
    alignItems: 'center',
  };

  const socialLinkStyles = {
    padding: 'var(--space-sm)',
    backgroundColor: isDark ? 'var(--color-surface-darker)' : 'var(--color-background)',
    color: isDark ? 'var(--color-on-surface-dark)' : 'var(--color-text)',
    borderRadius: 'var(--border-radius)',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    border: `1px solid ${isDark ? 'var(--color-surface-darker)' : 'var(--color-border)'}`,
  };

  const copyrightStyles = {
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'var(--font-base)',
    color: isDark ? 'var(--color-on-surface-dark)' : 'var(--color-text)',
    opacity: 0.7,
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contato@exemplo.com', label: 'Email' },
    { icon: Phone, href: 'tel:+5511999999999', label: 'Telefone' },
  ];

  return (
    <footer style={footerStyles} className={`ui-footer ${className}`}>
      <div style={containerStyles}>
        <div style={contentStyles}>
          <div style={socialLinksStyles}>
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  style={socialLinkStyles}
                  title={link.label}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDark
                      ? 'var(--color-surface-darker)'
                      : 'var(--color-background)';
                    e.currentTarget.style.color = isDark
                      ? 'var(--color-on-surface-dark)'
                      : 'var(--color-text)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>

          <div style={copyrightStyles}>© 2024 Gabriel Marques. Todos os direitos reservados.</div>
        </div>
      </div>
    </footer>
  );
}

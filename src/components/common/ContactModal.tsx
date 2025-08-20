/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal = forwardRef<HTMLUiModalElement, ContactModalProps>(
  ({ onClose }, ref: React.Ref<HTMLUiModalElement>) => {
    const copyEmailToClipboard = () => {
      navigator.clipboard.writeText('Gabbriel_gbl2@hotmail.com');
      alert('E-mail copiado para a área de transferência!');
    };

    return (
      <ui-modal onClosed={onClose} {...(ref ? { ref } : {})}>
        <div className="flex flex-col gap-[var(--space-lg)] p-[var(--space-lg)] rounded-[var(--border-radius-lg)] bg-[var(--color-background)] text-center">
          <div>
            <h2 className="text-[var(--font-size-xl)] font-bold text-[var(--color-text)]">
              Vamos conversar?
            </h2>
            <p className="text-[var(--color-text)]/70">
              Escolha a melhor forma de entrar em contato comigo
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-[var(--space-md)]">
            <div
              data-gabs="linkedin"
              gabs-content="Canal de contato via LinkedIn. Ideal para networking profissional e oportunidades de carreira."
              className="p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gray-800"
            >
              <a
                href="https://www.linkedin.com/in/gabriel-marques-batista"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-bold"
              >
                <ui-icon name="linkedin"></ui-icon> LinkedIn
              </a>
            </div>
            <div
              data-gabs="github"
              gabs-content="Canal de contato via GitHub. Permite visualizar projetos e contribuir tecnicamente."
              className="p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gray-800"
            >
              <a
                href="https://github.com/GabrielMBatista"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-bold"
              >
                <ui-icon name="github"></ui-icon> GitHub
              </a>
            </div>
            <div
              data-gabs="whatsapp"
              gabs-content="Canal de contato via WhatsApp. Comunicação rápida e direta para dúvidas ou propostas."
              className="p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gray-800"
            >
              <a
                href="https://wa.me/5511951222379?text=Ol%C3%A1%2C%20Gabriel!%20Encontrei%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20uma%20poss%C3%ADvel%20oportunidade."
                target="_blank"
                rel="noopener noreferrer"
                className="block font-bold"
              >
                <ui-icon name="whatsapp"></ui-icon> WhatsApp
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[var(--space-sm)]">
            <p className="text-[var(--color-text)] font-medium text-[var(--font-size-sm)] sm:text-[var(--font-size-md)]">
              📧 Gabbriel_gbl2@hotmail.com
            </p>
            <button
              onClick={copyEmailToClipboard}
              className="bg-[var(--color-primary)] text-[var(--color-on-surface-dark)] font-bold py-[var(--space-sm)] px-[var(--space-md)] rounded-[var(--border-radius-sm)] hover:scale-105 hover:bg-[var(--color-primary-hover)] transition-transform"
            >
              Copiar e-mail 📋
            </button>
          </div>
          <p className="text-[var(--color-text)]/50 italic text-[var(--font-size-sm)]">
            Retorno garantido em até 24h — ou sua mensagem de volta! 😄
          </p>
        </div>
      </ui-modal>
    );
  },
);

export default ContactModal;

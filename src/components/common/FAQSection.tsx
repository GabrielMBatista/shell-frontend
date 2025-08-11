'use client';

import HighlightWrapper from './HighlightWrapper';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  isDark: boolean;
}

export default function FAQSection({ faqs, isDark }: FAQSectionProps) {
  return (
    <section
      className={`py-20 border-t ${isDark ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-white'}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Perguntas Frequentes
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Algumas respostas rápidas para dúvidas comuns
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <HighlightWrapper key={index} dataGabsText={`faq-${index}`} isDark={isDark}>
              <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {faq.question}
              </h3>
              <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {faq.answer}
              </p>
            </HighlightWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useTranslation } from '@/hooks/useTranslation';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  isDark: boolean;
}

export default function FAQSection({ faqs, isDark }: FAQSectionProps) {
  const { t } = useTranslation('common');

  return (
    <section
      className={`py-20 border-t ${isDark ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-white'}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            {t('FAQ.title')}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('FAQ.subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              data-gabs={`faq-${index}`}
              gabs-content={`Pergunta frequente: "${faq.question}". Clique para ver a resposta detalhada.`}
              className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                isDark
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}
            >
              <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {faq.question}
              </h3>
              <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

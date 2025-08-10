'use client';

import { useGoogleFont } from '@/utils/fonts';
import emailjs from '@emailjs/browser';
import dynamic from 'next/dynamic';

import {
  Send,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageSquare,
  User,
  FileText,
} from 'lucide-react';
import { useState } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useTranslation } from '@/hooks/useTranslation';

const FAQSection = dynamic(() => import('@/components/common/FAQSection'), { ssr: false });

export default function Contato({ isDark }: { isDark: boolean }) {
  const { t } = useTranslation('common');
  usePageTitle(t('Contact.pageTitle'));

  const fontFamily = useGoogleFont('Inter');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Verificar se as variáveis de ambiente estão definidas
    if (
      !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    ) {
      console.error('Erro: Variáveis de ambiente do EmailJS não estão definidas.');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString('pt-BR'),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  // Ajuste: adicionar id para não depender do texto traduzido
  const contactInfo = [
    {
      id: 'email',
      icon: Mail,
      title: t('Contact.info.email.title'),
      value: 'gabbriel_gbl2@hotmail.com',
      description: t('Contact.info.email.description'),
      href: 'mailto:gabbriel_gbl2@hotmail.com',
    },
    {
      id: 'phone',
      icon: Phone,
      title: t('Contact.info.phone.title'),
      value: '+55 (11) 95122-2379',
      description: t('Contact.info.phone.description'),
      href: 'https://wa.me/5511951222379?text=Ol%C3%A1%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!',
    },
    {
      id: 'location',
      icon: MapPin,
      title: t('Contact.info.location.title'),
      value: t('Contact.info.location.value'),
      description: t('Contact.info.location.description'),
      href: '#',
    },
  ] as const;

  const socialLinks = [
    { icon: Github, href: 'https://github.com/GabrielMBatista', label: 'GitHub', color: '#333' },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/gabriel-marques-batista/',
      label: 'LinkedIn',
      color: '#0077B5',
    },
    { icon: Mail, href: 'mailto:gabbriel_gbl2@hotmail.com', label: 'Email', color: '#EA4335' },
  ];

  const faqs = [
    {
      question: 'Qual é o seu tempo de resposta?',
      answer: 'Geralmente respondo emails em até 24 horas durante dias úteis.',
    },
    {
      question: 'Você trabalha com projetos remotos?',
      answer: 'Sim! Trabalho com clientes do mundo todo de forma 100% remota.',
    },
    {
      question: 'Quais tipos de projeto você aceita?',
      answer: 'Aceito projetos de desenvolvimento web, mobile e consultoria em tecnologia.',
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
      style={{ fontFamily }}
    >
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t('Contact.hero.titlePrefix')}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('Contact.hero.titleHighlight')}
              </span>
            </h1>
            <p
              className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {t('Contact.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.href}
                  target={info.id === 'phone' ? '_blank' : '_self'}
                  rel={info.id === 'phone' ? 'noopener noreferrer' : undefined}
                  className={`group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${
                    isDark
                      ? 'bg-gray-800 border border-gray-700'
                      : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {info.title}
                  </h3>
                  <p
                    className={`text-lg font-medium mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                  >
                    {info.value}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {info.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t('Contact.form.title')}
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('Contact.form.subtitle')}
            </p>
          </div>

          {/* Status Messages */}
          {submitStatus && (
            <div
              className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${
                submitStatus === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              {submitStatus === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span>
                {submitStatus === 'success'
                  ? t('Contact.form.status.success')
                  : t('Contact.form.status.error')}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  <User size={16} className="inline mr-2" />
                  {t('Contact.form.labels.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-200 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  }`}
                  placeholder={t('Contact.form.placeholders.name')}
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  <Mail size={16} className="inline mr-2" />
                  {t('Contact.form.labels.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-200 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  }`}
                  placeholder={t('Contact.form.placeholders.email')}
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                <FileText size={16} className="inline mr-2" />
                {t('Contact.form.labels.subject')}
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-200 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                }`}
                placeholder={t('Contact.form.placeholders.subject')}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                <MessageSquare size={16} className="inline mr-2" />
                {t('Contact.form.labels.message')}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-200 resize-none ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                }`}
                placeholder={t('Contact.form.placeholders.message')}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-cyan-400'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Clock size={20} className="animate-spin" />
                  {t('Contact.form.buttons.sending')}
                </>
              ) : (
                <>
                  <Send size={20} />
                  {t('Contact.form.buttons.send')}
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            {t('Contact.social.title')}
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('Contact.social.subtitle')}
          </p>

          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  className={`group p-4 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer ${
                    isDark
                      ? 'bg-gray-800 border border-gray-700'
                      : 'bg-white border border-gray-200 shadow-md'
                  }`}
                  title={social.label}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = social.color;
                    e.currentTarget.style.borderColor = social.color;
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? '#1f2937' : 'white';
                    e.currentTarget.style.borderColor = isDark ? '#374151' : '#e5e7eb';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = isDark ? '#d1d5db' : '#374151';
                  }}
                >
                  <Icon
                    size={24}
                    className={`transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} isDark={isDark} />
    </div>
  );
}

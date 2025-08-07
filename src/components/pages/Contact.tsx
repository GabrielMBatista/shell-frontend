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

const FAQSection = dynamic(() => import('@/components/common/FAQSection'), { ssr: false });

export default function Contato({ isDark }: { isDark: boolean }) {
  usePageTitle('Contato');

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

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'gabbriel_gbl2@hotmail.com',
      description: 'Respondo em até 24 horas',
      href: 'mailto:gabbriel_gbl2@hotmail.com',
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '+55 (11) 95122-2379',
      description: 'Seg-Sex, 9h às 18h',
      href: 'https://wa.me/5511951222379?text=Ol%C3%A1%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!',
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'São Paulo, SP',
      description: 'Disponível para trabalho remoto',
      href: '#',
    },
  ];

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
              Entre em{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Contato
              </span>
            </h1>
            <p
              className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Tem um projeto em mente? Vamos conversar sobre como posso ajudar a transformar suas
              ideias em realidade digital.
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
                  target={info.title === 'Telefone' ? '_blank' : '_self'}
                  rel={info.title === 'Telefone' ? 'noopener noreferrer' : undefined}
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
              Envie uma Mensagem
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Preencha o formulário abaixo e entrarei em contato o mais breve possível
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
                  ? 'Mensagem enviada com sucesso! Entrarei em contato em breve.'
                  : 'Erro ao enviar mensagem. Tente novamente.'}
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
                  Nome Completo
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
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  <Mail size={16} className="inline mr-2" />
                  Email
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
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                <FileText size={16} className="inline mr-2" />
                Assunto
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
                placeholder="Sobre o que você gostaria de conversar?"
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                <MessageSquare size={16} className="inline mr-2" />
                Mensagem
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
                placeholder="Conte-me mais sobre seu projeto, prazos, orçamento e qualquer detalhe relevante..."
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
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Enviar Mensagem
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
            Ou me encontre nas redes sociais
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Siga meu trabalho e conecte-se comigo nas plataformas abaixo
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

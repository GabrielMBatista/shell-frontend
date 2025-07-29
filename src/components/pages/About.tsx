'use client';
import { useGoogleFont } from '@/utils/fonts';

import {
  ArrowRight,
  Download,
  Code,
  Palette,
  Database,
  Users,
  Coffee,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import gabrielPhoto from '@/assets/gabrielPhoto.jpg';

export default function Sobre({ isDark }: { isDark: boolean }) {
  const fontFamily = useGoogleFont('Inter');

  const skills = [
    { name: 'React', level: 95, icon: Code, color: '#61DAFB' },
    { name: 'TypeScript', level: 90, icon: Code, color: '#3178C6' },
    { name: 'Node.js', level: 88, icon: Database, color: '#339933' },
    { name: 'UI/UX Design', level: 85, icon: Palette, color: '#FF6B6B' },
    { name: 'PostgreSQL', level: 82, icon: Database, color: '#336791' },
    { name: 'Docker', level: 80, icon: Globe, color: '#2496ED' },
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      description:
        'Liderando equipe de desenvolvimento, arquitetando soluções escaláveis e mentorando desenvolvedores júnior.',
      type: 'work',
    },
    {
      year: '2023',
      title: 'Certificação AWS Solutions Architect',
      company: 'Amazon Web Services',
      description:
        'Certificação em arquitetura de soluções na nuvem, focando em escalabilidade e segurança.',
      type: 'education',
    },
    {
      year: '2022',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      description:
        'Desenvolvimento de aplicações web completas, desde o design até a implementação e deploy.',
      type: 'work',
    },
    {
      year: '2021',
      title: 'Bacharelado em Ciência da Computação',
      company: 'Universidade Federal',
      description: 'Formação sólida em algoritmos, estruturas de dados e engenharia de software.',
      type: 'education',
    },
  ];

  const stats = [
    { number: '50+', label: 'Projetos Concluídos', icon: Briefcase },
    { number: '3+', label: 'Anos de Experiência', icon: Calendar },
    { number: '20+', label: 'Clientes Satisfeitos', icon: Users },
    { number: '1000+', label: 'Xícaras de Café', icon: Coffee },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
      style={{ fontFamily }}
    >
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    isDark
                      ? 'bg-gray-800 text-blue-400 border border-gray-700'
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}
                >
                  <MapPin size={16} />
                  São Paulo, Brasil
                </div>

                <h1
                  className={`text-4xl md:text-6xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  Sobre
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Gabriel Marques
                  </span>
                </h1>

                <p
                  className={`text-xl md:text-2xl font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Desenvolvedor Full Stack apaixonado por criar experiências digitais excepcionais
                </p>

                <p
                  className={`text-lg leading-relaxed max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  Com mais de 3 anos de experiência, combino conhecimento técnico sólido com visão
                  de design para entregar soluções que realmente fazem a diferença. Especializado em
                  React, Node.js e arquiteturas modernas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-cyan-400 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
                  <Download size={20} />
                  Download CV
                </button>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 border rounded-xl transition-all duration-200 font-medium text-lg hover:shadow-lg transform hover:-translate-y-1 cursor-pointer ${
                    isDark
                      ? 'text-white border-gray-600 hover:bg-gray-800'
                      : 'text-gray-800 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Entrar em Contato
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* Avatar/Stats */}
            <div className="relative">
              <div className="relative z-10 mb-8">
                <div
                  className={`w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-1 shadow-2xl ${
                    isDark ? 'shadow-blue-500/20' : 'shadow-blue-500/30'
                  }`}
                >
                  <Image
                    src={gabrielPhoto}
                    alt="Gabriel Marques"
                    width={320}
                    height={320}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`text-center p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                        isDark
                          ? 'bg-gray-800 border border-gray-700'
                          : 'bg-white border border-gray-200 shadow-lg'
                      }`}
                    >
                      <Icon size={24} className="mx-auto mb-2 text-blue-600" />
                      <div
                        className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                      >
                        {stat.number}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={`py-20 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Habilidades Técnicas
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Tecnologias e ferramentas que domino para criar soluções completas e eficientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                    isDark
                      ? 'bg-gray-800 border border-gray-700'
                      : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: skill.color }}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                      >
                        {skill.name}
                      </h3>
                      <div className="text-sm text-gray-500">{skill.level}%</div>
                    </div>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Minha Jornada
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Uma linha do tempo da minha experiência profissional e educacional
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div
              className={`absolute left-8 top-0 bottom-0 w-0.5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}
            ></div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline Dot */}
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                      item.type === 'work' ? 'bg-blue-600' : 'bg-purple-600'
                    }`}
                  >
                    {item.type === 'work' ? (
                      <Briefcase size={24} className="text-white" />
                    ) : (
                      <GraduationCap size={24} className="text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-8 p-6 rounded-xl flex-1 transition-all duration-300 hover:scale-105 cursor-pointer ${
                      isDark
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200 shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          item.type === 'work'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {item.year}
                      </span>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.type === 'work' ? 'Experiência Profissional' : 'Educação'}
                      </span>
                    </div>
                    <h3
                      className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-lg font-medium mb-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                    >
                      {item.company}
                    </p>
                    <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Vamos trabalhar juntos?
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de
            colaboração.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-cyan-400 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
            >
              Entrar em Contato
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/Projetos"
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 border rounded-xl transition-all duration-200 font-medium text-lg hover:shadow-lg transform hover:-translate-y-1 cursor-pointer ${
                isDark
                  ? 'text-white border-gray-600 hover:bg-gray-700'
                  : 'text-gray-800 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Ver Meus Projetos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

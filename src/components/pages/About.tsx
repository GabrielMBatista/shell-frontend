'use client';
import { useGoogleFont } from '@/utils/fonts';
import { useState } from 'react';
import Image from 'next/image';
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
import gabrielPhoto from '@/assets/gabrielPhoto.jpg';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useTranslation } from '@/hooks/useTranslation';

export default function Sobre({ isDark }: { isDark: boolean }) {
  const { t } = useTranslation('common');
  usePageTitle(t('About.pageTitle'));

  const fontFamily = useGoogleFont('Inter');
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllTimeline, setShowAllTimeline] = useState(false);

  const skills = [
    { name: 'React', level: 95, icon: Code, color: '#61DAFB' },
    { name: 'JavaScript', level: 90, icon: Code, color: '#F7DF1E' },
    { name: 'TypeScript', level: 80, icon: Code, color: '#3178C6' },
    { name: 'Next.js', level: 75, icon: Code, color: '#000000' },
    { name: 'PostgreSQL', level: 75, icon: Database, color: '#336791' },
    { name: 'Node.js', level: 70, icon: Database, color: '#339933' },
    { name: 'Redux.js', level: 70, icon: Code, color: '#764ABC' },
    { name: 'Docker', level: 65, icon: Globe, color: '#2496ED' },
    { name: 'API REST', level: 80, icon: Database, color: '#E34F26' },
    { name: 'UI/UX Design', level: 60, icon: Palette, color: '#FF6B6B' },
    { name: 'SASS', level: 70, icon: Palette, color: '#CD6799' },
    { name: 'Git', level: 85, icon: Code, color: '#F1502F' },
    { name: 'GitLab', level: 75, icon: Code, color: '#FC6D26' },
    { name: 'HTML5', level: 90, icon: Code, color: '#E34F26' },
    { name: 'CSS', level: 85, icon: Palette, color: '#1572B6' },
    { name: 'SQL', level: 80, icon: Database, color: '#003B57' },
    { name: 'Scrum', level: 70, icon: Globe, color: '#6DB33F' },
    { name: 'Soft Skills', level: 75, icon: Globe, color: '#00CED1' },
    { name: 'Inglês', level: 65, icon: Globe, color: '#4682B4' },
  ];

  const visibleSkills = showAllSkills ? skills : skills.slice(0, 6);

  const timeline = [
    {
      year: '2008 - 2010',
      title: 'Estagiário em Laboratório de Informática',
      company: 'Acessa Escola SP',
      description:
        'Responsável pela manutenção das salas de informática e apoio pedagógico a professores em projetos educacionais.',
      type: 'work',
    },
    {
      year: '2011',
      title: 'Assistente Técnico Nível 1',
      company: 'Connectcom Teleinformática',
      description:
        'Suporte técnico remoto para clientes UOL. Diagnóstico de software, conexão e configuração de redes e dispositivos.',
      type: 'work',
    },
    {
      year: '2012 - 2013',
      title: 'Assistente Técnico Nível 1',
      company: 'Ctis',
      description:
        'Atendimento técnico para escolas estaduais. Suporte em hardware, software e rede Intragov junto à FDE.',
      type: 'work',
    },
    {
      year: '2014 - 2015',
      title: 'Assistente Técnico de Campo',
      company: 'Spread (Hospital Einstein)',
      description:
        'Suporte técnico em unidades hospitalares. Organização de cabeamento, manutenção de hardware e softwares de TI.',
      type: 'work',
    },
    {
      year: '2015 - 2018',
      title: 'Freelancer / Vendedor em Negócio Próprio',
      company: 'Autônomo',
      description:
        'Manutenção de micros, vendas e controle de estoque em banca de jornal familiar. Atendimento direto ao cliente.',
      type: 'work',
    },
    {
      year: '2019 - 2020',
      title: 'Expert em Interação de Suporte II',
      company: 'Teleperformance',
      description:
        'Suporte técnico Apple. Atuação em software e hardware para dispositivos mobile e desktop, com foco na experiência do usuário.',
      type: 'work',
    },
    {
      year: '2021',
      title: 'Bootcamp de Programação Web Full Stack',
      company: 'Labenu',
      description:
        'Formação intensiva com foco em JavaScript, React, Node.js, TypeScript, SQL, testes automatizados, metodologias ágeis e empregabilidade. Desenvolvimento de projetos práticos com acompanhamento de soft skills.',
      type: 'education',
    },
    {
      year: '2021 - 2025',
      title: 'Desenvolvedor JavaScript Jr.',
      company: 'Meta',
      description:
        'Atuação com HTML5, CSS, SQL, React, Node.js e metodologias ágeis em múltiplos projetos remotos.',
      type: 'work',
    },
    {
      year: '2022 - 2025',
      title: 'Desenvolvedor JavaScript | Mentor',
      company: 'Meta',
      description:
        'Mentoria técnica para estagiários e JRs com foco em práticas ágeis, versionamento, APIs REST e acompanhamento via GitLab e Sonar.',
      type: 'work',
    },
    {
      year: '2025',
      title: 'Desenvolvedor JavaScript Pleno',
      company: 'Meta',
      description:
        'Atuação com Next.js e React.js em equipe remota. Desenvolvimento de soluções performáticas e escaláveis.',
      type: 'work',
    },
    {
      year: '2017 - 2023',
      title: 'Graduação em Tecnologia da Informação (trancado)',
      company: 'Universidade Cidade de São Paulo',
      description:
        'Curso superior com foco em redes, banco de dados, algoritmos e lógica. Trancado.',
      type: 'education',
    },
    {
      year: '2009 (trancado)',
      title: 'Curso Técnico em Informática',
      company: 'ETEC de Itaquera',
      description: 'Curso técnico de informática com ênfase em programação e redes. Trancado.',
      type: 'education',
    },
    {
      year: '2000 - 2010',
      title: 'Ensino Médio',
      company: 'EE Luzia de Queiroz e Oliveira',
      description: 'Ensino médio completo.',
      type: 'education',
    },
  ];

  const sortedTimeline = [...timeline].sort((a, b) => b.year.localeCompare(a.year));
  const visibleTimeline = showAllTimeline ? sortedTimeline : sortedTimeline.slice(0, 5);

  const stats = [
    { number: '10+', label: t('About.stats.yearsInIT'), icon: Briefcase },
    { number: '4+', label: t('About.stats.yearsAsDev'), icon: Calendar },
    { number: '20+', label: t('About.stats.mentees'), icon: Users },
    { number: '1000+', label: t('About.stats.coffees'), icon: Coffee },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
      style={{ fontFamily }}
    >
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                  {t('About.hero.locationBadge')}
                </div>
                <h1
                  className={`text-4xl md:text-6xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  {t('About.hero.title')}
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {t('About.hero.highlightName')}
                  </span>
                </h1>
                <p
                  className={`text-xl md:text-2xl font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {t('About.hero.role')}
                </p>
                <p
                  className={`text-lg leading-relaxed max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {t('About.hero.description')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-cyan-400 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => window.open('/Resume_Gabriel_Marques.pdf', '_blank')}
                >
                  <Download size={20} />
                  {t('About.ctas.downloadCV')}
                </button>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 border rounded-xl transition-all duration-200 font-medium text-lg hover:shadow-lg transform hover:-translate-y-1 cursor-pointer ${
                    isDark
                      ? 'text-white border-gray-600 hover:bg-gray-800'
                      : 'text-gray-800 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {t('About.ctas.contact')}
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
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
                    priority={true}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
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
      <section className={`py-20 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t('About.skills.title')}
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {t('About.skills.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleSkills.map((skill, index) => {
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
          {!showAllSkills && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllSkills(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-cyan-400 transition-all duration-200 font-medium"
              >
                {t('About.skills.showMore')}
              </button>
            </div>
          )}
        </div>
      </section>
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t('About.timeline.title')}
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('About.timeline.subtitle')}
            </p>
          </div>
          <div className="relative">
            <div
              className={`absolute left-8 top-0 bottom-0 w-0.5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}
            ></div>
            <div className="space-y-8">
              {visibleTimeline.map((item, index) => (
                <div key={index} className="relative flex items-start">
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
                        {item.type === 'work'
                          ? t('About.timeline.types.work')
                          : t('About.timeline.types.education')}
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
            {!showAllTimeline && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllTimeline(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-cyan-400 transition-all duration-200 font-medium"
                >
                  {t('About.timeline.showMore')}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className={`py-20 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            {t('About.finalCTA.title')}
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('About.finalCTA.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-cyan-400 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
            >
              {t('About.ctas.contact')}
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
              {t('About.ctas.viewProjects')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

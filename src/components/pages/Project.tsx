'use client';
import React, { useState } from 'react';
import { useGoogleFont } from '@/utils/fonts';
import { Github, ExternalLink, Search, Code, Smartphone, Globe, Database, Zap } from 'lucide-react';
import CTASection from '@/components/common/CTASection';

export default function Projetos({ isDark }: { isDark: boolean }) {
  const fontFamily = useGoogleFont('Inter');
  const [activeFilter, setActiveFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Moderno',
      description:
        'Plataforma completa de e-commerce com carrinho de compras, pagamento integrado, painel administrativo e sistema de avaliações.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com/usuario/ecommerce',
      demo: 'https://ecommerce-demo.com',
      featured: true,
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description:
        'Dashboard interativo para análise de dados com gráficos em tempo real, métricas de performance e relatórios customizáveis.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      category: 'frontend',
      technologies: ['React', 'TypeScript', 'Chart.js', 'Tailwind'],
      github: 'https://github.com/usuario/dashboard',
      demo: 'https://dashboard-demo.com',
      featured: true,
    },
    {
      id: 3,
      title: 'App Mobile Fitness',
      description:
        'Aplicativo mobile para acompanhamento de exercícios, dieta e progresso físico com sincronização em nuvem.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
      github: 'https://github.com/usuario/fitness-app',
      demo: 'https://fitness-app-demo.com',
      featured: false,
    },
    {
      id: 4,
      title: 'Sistema de Blog',
      description:
        'CMS completo para blogs com editor rich text, sistema de comentários, SEO otimizado e painel administrativo.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop',
      category: 'fullstack',
      technologies: ['Next.js', 'MongoDB', 'Prisma', 'NextAuth'],
      github: 'https://github.com/usuario/blog-cms',
      demo: 'https://blog-demo.com',
      featured: false,
    },
    {
      id: 5,
      title: 'Landing Page SaaS',
      description:
        'Landing page moderna e responsiva para produto SaaS com animações, formulários de contato e integração com CRM.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      category: 'frontend',
      technologies: ['React', 'Framer Motion', 'Tailwind', 'Vercel'],
      github: 'https://github.com/usuario/saas-landing',
      demo: 'https://saas-landing-demo.com',
      featured: false,
    },
    {
      id: 6,
      title: 'API REST Completa',
      description:
        'API RESTful robusta com autenticação JWT, documentação Swagger, testes automatizados e deploy em Docker.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
      category: 'backend',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
      github: 'https://github.com/usuario/rest-api',
      demo: 'https://api-docs-demo.com',
      featured: false,
    },
  ];

  const categories = [
    { id: 'todos', name: 'Todos os Projetos', icon: Globe },
    { id: 'frontend', name: 'Frontend', icon: Code },
    { id: 'backend', name: 'Backend', icon: Database },
    { id: 'fullstack', name: 'Full Stack', icon: Zap },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeFilter === 'todos' || project.category === activeFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = projects.filter((project) => project.featured);

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
              Meus{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Projetos
              </span>
            </h1>
            <p
              className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Uma seleção dos meus trabalhos mais recentes, desde aplicações web completas até APIs
              robustas e interfaces modernas.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Projetos em Destaque
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className={`group rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      Destaque
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3
                    className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 text-sm rounded-full ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.demo}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-cyan-400 transition-colors duration-200 font-medium"
                    >
                      <ExternalLink size={18} />
                      Ver Demo
                    </a>
                    <a
                      href={project.github}
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border rounded-xl transition-colors duration-200 font-medium ${
                        isDark
                          ? 'text-white border-gray-600 hover:bg-gray-700'
                          : 'text-gray-800 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Github size={18} />
                      Código
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className={`py-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={20}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              />
              <input
                type="text"
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-200 ${
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                }`}
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
                      activeFilter === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : isDark
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                    }`}
                  >
                    <Icon size={16} />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2
              className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Todos os Projetos
            </h2>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado
              {filteredProjects.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className={`text-6xl mb-4 ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>
                🔍
              </div>
              <h3
                className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                Nenhum projeto encontrado
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Tente ajustar os filtros ou termo de busca
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`group rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                    isDark
                      ? 'bg-gray-800 border border-gray-700'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3
                      className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`mb-4 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      {project.description.length > 120
                        ? `${project.description.substring(0, 120)}...`
                        : project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs rounded-full ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={project.demo}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-cyan-400 transition-colors duration-200 text-sm font-medium"
                      >
                        <ExternalLink size={14} />
                        Demo
                      </a>
                      <a
                        href={project.github}
                        className={`flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 border rounded-lg transition-colors duration-200 text-sm font-medium ${
                          isDark
                            ? 'text-white border-gray-600 hover:bg-gray-700'
                            : 'text-gray-800 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Github size={14} />
                        Código
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        isDark={isDark}
        title="Gostou do que viu?"
        description="Vamos conversar sobre como posso ajudar no seu próximo projeto."
        primaryLink={{ href: '/contact', label: 'Entrar em Contato' }}
      />
    </div>
  );
}

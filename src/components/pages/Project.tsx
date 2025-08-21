'use client';
import React, { useState, useEffect } from 'react';
import { useGoogleFont } from '@/utils/fonts';
import { Github, ExternalLink, Search, Code, Smartphone, Globe, Database, Zap } from 'lucide-react';
import CTASection from '@/components/common/CTASection';
import { resolutions } from '@/utils/resolutions';
import {
  trackProjectDetailedInteraction,
  trackScrollDepth,
  trackTimeSpent,
  trackConversionFunnel,
  trackPerformanceMetrics,
  trackPageView,
} from '@/utils/analytics';
import type { Project, Category, ProjectsProps } from '@/types/projects';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useTranslation } from '@/hooks/useTranslation';

export default function Projetos({ isDark }: ProjectsProps) {
  const { t } = useTranslation('projects');
  usePageTitle(t('pageTitle'));
  const fontFamily = useGoogleFont('Inter');
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [demoUrl, setDemoUrl] = useState<string>('');
  const [selectedResolution, setSelectedResolution] =
    useState<keyof typeof resolutions>('Responsive');
  const [pageStartTime] = useState<number>(Date.now());
  const [scrollDepthTracked, setScrollDepthTracked] = useState<Set<number>>(new Set());

  const resolution = resolutions[selectedResolution];

  const closeModal = (): void => {
    setIsModalOpen(false);
    setDemoUrl('');
  };

  const projects: Project[] = [
    {
      id: 1,
      title: t('items.1.title'),
      description: t('items.1.description'),
      category: 'fullstack' as const,
      technologies: [
        'Next.js',
        'TypeScript',
        'TailwindCSS',
        'OpenAI API',
        'Speech-to-Text',
        'Module Federation',
      ],
      github: 'https://github.com/GabrielMBatista/mfe-entrevista',
      demo: 'https://mfe-entrevista.vercel.app/home',
      featured: true,
    },
    {
      id: 2,
      title: t('items.2.title'),
      description: t('items.2.description'),
      category: 'frontend' as const,
      technologies: [
        'Next.js',
        'React 19',
        'TypeScript',
        'MongoDB',
        'Styled Components',
        'React Query',
      ],
      github: 'https://github.com/GabrielMBatista/tropa-login',
      demo: 'https://tropa-login.vercel.app/login',
      featured: true,
    },
    {
      id: 3,
      title: t('items.3.title'),
      description: t('items.3.description'),
      category: 'frontend' as const,
      technologies: [
        'React',
        'React Mic',
        'React Speech Recognition',
        'React H5 Audio Player',
        'Recorder.js',
        'TypeScript',
      ],
      github: 'https://github.com/GabrielMBatista/alphabet-recorder',
      demo: 'https://alphabet-recorder.vercel.app',
      featured: false,
    },
    {
      id: 4,
      title: t('items.4.title'),
      description: t('items.4.description'),
      category: 'frontend' as const,
      technologies: ['StencilJS', 'Storybook', 'TypeScript', 'Web Components', 'Jest'],
      github: 'https://github.com/GabrielMBatista/ui-library-stencil',
      demo: 'https://ui-library-stencil.vercel.app',
      featured: false,
    },
    {
      id: 5,
      title: t('items.5.title'),
      description: t('items.5.description'),
      category: 'backend' as const,
      technologies: ['Node.js', 'TypeScript', 'Express', 'Jest'],
      github: 'https://github.com/GabrielMBatista/see-manager',
      demo: '',
      featured: false,
    },
  ].sort((a, b) => a.id - b.id);

  const categories: Category[] = [
    { id: 'todos', name: t('categories.all'), icon: Globe },
    { id: 'frontend', name: t('categories.frontend'), icon: Code },
    { id: 'backend', name: t('categories.backend'), icon: Database },
    { id: 'fullstack', name: t('categories.fullstack'), icon: Zap },
    { id: 'mobile', name: t('categories.mobile'), icon: Smartphone },
  ];

  const filteredProjects: Project[] = projects.filter((project) => {
    const matchesCategory: boolean = activeFilter === 'todos' || project.category === activeFilter;
    const matchesSearch: boolean =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects: Project[] = projects.filter((project) => project.featured);

  useEffect(() => {
    const initializeAnalytics = async (): Promise<void> => {
      try {
        // Aguardar um momento para garantir que o Clarity tenha carregado
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Usar trackPageView
        await trackPageView('projects', {
          totalProjects: projects.length,
          featuredProjects: featuredProjects.length,
          isDarkMode: isDark,
        });

        // Rastrear métricas de performance
        trackPerformanceMetrics('projects');

        // Rastrear entrada no funil de conversão
        await trackConversionFunnel('page_load');
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown setup error';
        console.warn('Error setting up analytics:', errorMessage);
      }
    };

    initializeAnalytics();
  }, [isDark, projects.length, featuredProjects.length]);

  useEffect(() => {
    // Rastrear scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
      );

      // Rastrear marcos de scroll (25%, 50%, 75%, 100%)
      [25, 50, 75, 100].forEach((depth) => {
        if (scrollPercent >= depth && !scrollDepthTracked.has(depth)) {
          trackScrollDepth(depth, 'projects');
          setScrollDepthTracked((prev) => new Set(prev).add(depth));
        }
      });
    };

    // Rastrear tempo gasto ao sair da página
    const handleBeforeUnload = () => {
      const timeSpent = (Date.now() - pageStartTime) / 1000;
      trackTimeSpent('projects', timeSpent);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDark, pageStartTime, projects.length, featuredProjects.length, scrollDepthTracked]);

  const handleFilterChange = (filterId: string): void => {
    setActiveFilter(filterId);

    // Analytics detalhado
    trackProjectDetailedInteraction(
      'filter',
      'filter',
      {
        filterType: filterId,
        previousFilter: activeFilter,
        resultsAfterFilter: projects.filter((p) => filterId === 'todos' || p.category === filterId)
          .length,
      },
      {
        position: 0,
        totalVisible: filteredProjects.length,
        filterActive: filterId,
      },
    );
  };

  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);

    if (value.length > 2) {
      const resultsCount = projects.filter((project) => {
        const matchesCategory = activeFilter === 'todos' || project.category === activeFilter;
        const matchesSearch =
          project.title.toLowerCase().includes(value.toLowerCase()) ||
          project.description.toLowerCase().includes(value.toLowerCase()) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(value.toLowerCase()));
        return matchesCategory && matchesSearch;
      }).length;

      trackProjectDetailedInteraction('search', 'search', {
        searchTerm: value,
        resultsCount,
        activeFilter,
        searchLength: value.length,
      });
    }
  };

  const handleProjectClick = (
    project: Project,
    action: 'github' | 'demo',
    position: number,
  ): void => {
    // Analytics básico
    trackProjectDetailedInteraction(
      project.id,
      action === 'github' ? 'click_github' : 'click_demo',
      {
        projectTitle: project.title,
        projectCategory: project.category,
        technologies: project.technologies.join(','),
        featured: project.featured,
      },
      {
        position,
        totalVisible: filteredProjects.length,
        filterActive: activeFilter,
        searchTerm: searchTerm || undefined,
      },
    );

    // Rastrear funil de conversão
    trackConversionFunnel(action === 'github' ? 'github_visit' : 'demo_open', project.id, {
      projectTitle: project.title,
      projectCategory: project.category,
    });
  };

  const openModal = (project: Project, position: number): void => {
    setDemoUrl(project.demo);
    setIsModalOpen(true);

    // Analytics detalhado
    trackProjectDetailedInteraction(
      project.id,
      'view',
      {
        projectTitle: project.title,
        projectCategory: project.category,
        viewType: 'modal',
        featured: project.featured,
      },
      {
        position,
        totalVisible: filteredProjects.length,
        filterActive: activeFilter,
        searchTerm: searchTerm || undefined,
      },
    );

    // Rastrear visualização no funil
    trackConversionFunnel('project_view', project.id);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
      style={{ fontFamily }}
    >
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-hidden">
          <div
            className="relative bg-white rounded-lg shadow-lg overflow-hidden"
            style={{
              width: resolution.width,
              height: resolution.height,
              maxWidth: '90vw',
              maxHeight: '90vh',
            }}
          >
            <div className="sticky top-0 left-0 right-0 bg-gray-100 border-b border-gray-300 flex items-center justify-between px-4 py-2 z-10">
              <select
                value={selectedResolution}
                onChange={(e) => setSelectedResolution(e.target.value as keyof typeof resolutions)}
                className="block px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {Object.keys(resolutions).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900 font-bold text-lg"
              >
                ✕
              </button>
            </div>
            <iframe
              src={demoUrl}
              className="w-full h-[calc(100%-40px)] rounded-b-lg"
              style={{
                transform: 'scale(0.98)',
              }}
              allow="camera; microphone; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('hero.highlight')}
              </span>
            </h1>
            <p
              className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            {t('featured.title')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                data-gabs={`featured-project-${project.id}`}
                gabs-content={t(`items.${project.id}.gabs.card`)}
                className={`group rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <div
                    className="relative flex items-center justify-center"
                    style={{
                      width: resolution.width,
                      height: '30vh',
                      transform: `scale(${resolution.scale})`,
                      transformOrigin: 'center',
                    }}
                  >
                    <iframe
                      src={project.demo}
                      className="absolute top-0 left-0 w-full h-full border-none"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-presentation"
                      allow="camera; microphone; fullscreen; clipboard-read; clipboard-write"
                      title={`Preview of ${project.title}`}
                    ></iframe>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      {t('featured.label')}
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
                    <button
                      data-gabs={`view-details-${project.id}`}
                      gabs-content={t(`items.${project.id}.gabs.demoButton`)}
                      onClick={() => {
                        handleProjectClick(project, 'demo', 0);
                        openModal(project, 0);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-cyan-400 transition-colors duration-200 font-medium"
                    >
                      <ExternalLink size={18} />
                      {t('featured.demo')}
                    </button>
                    <a
                      href={project.github}
                      data-gabs={`github-link-${project.id}`}
                      gabs-content={t(`items.${project.id}.gabs.githubButton`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleProjectClick(project, 'github', 0)}
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border rounded-xl transition-colors duration-200 font-medium ${
                        isDark
                          ? 'text-white border-gray-600 hover:bg-gray-700'
                          : 'text-gray-800 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Github size={18} />
                      {t('featured.code')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search
                size={20}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              />
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-200 ${
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                }`}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleFilterChange(category.id)}
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

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2
              className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t('all.title')}
            </h2>
            <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('all.note')}
            </p>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className={`text-6xl mb-4 ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>
                🔍
              </div>
              <h3
                className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                {t('noResults.title')}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('noResults.subtitle')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => {
                const hasDemo = !!project.demo;
                const position = index + 1;

                return (
                  <div
                    key={project.id}
                    data-gabs={`project-${project.id}`}
                    gabs-content={t(`items.${project.id}.gabs.card`)}
                    className={`group rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                      isDark
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    {hasDemo ? (
                      <>
                        <div className="relative overflow-hidden">
                          <div className="w-full h-48 relative">
                            <iframe
                              src={project.demo}
                              className="absolute top-0 left-0 w-full h-full border-none scale-[1.5] origin-top-left"
                              sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-presentation"
                              allow="camera; microphone; fullscreen; clipboard-read; clipboard-write"
                              title={`Preview of ${project.title}`}
                            ></iframe>
                          </div>
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
                            <button
                              data-gabs={`view-details-${project.id}`}
                              gabs-content={t(`items.${project.id}.gabs.demoButton`)}
                              onClick={() => {
                                handleProjectClick(project, 'demo', position);
                                openModal(project, position);
                              }}
                              className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-cyan-400 transition-colors duration-200 text-sm font-medium"
                            >
                              <ExternalLink size={14} />
                              {t('all.demo')}
                            </button>
                            <a
                              href={project.github}
                              data-gabs={`github-link-${project.id}`}
                              gabs-content={t(`items.${project.id}.gabs.githubButton`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => handleProjectClick(project, 'github', position)}
                              className={`flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 border rounded-lg transition-colors duration-200 text-sm font-medium ${
                                isDark
                                  ? 'text-white border-gray-600 hover:bg-gray-700'
                                  : 'text-gray-800 border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <Github size={14} />
                              {t('all.code')}
                            </a>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-6">
                        <h3
                          className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                          {project.title}
                        </h3>
                        <p
                          className={`mb-4 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                          {project.description}
                        </p>
                        <div className="mb-4">
                          <h4
                            className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                          >
                            {t('all.features.title')}
                          </h4>
                          <ul
                            className={`list-disc pl-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                          >
                            <li>{t('all.features.item1')}</li>
                            <li>{t('all.features.item2')}</li>
                            <li>{t('all.features.item3')}</li>
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 text-xs rounded-full ${
                                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={project.github}
                            data-gabs={`github-link-${project.id}`}
                            gabs-content={t(`items.${project.id}.gabs.githubButton`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleProjectClick(project, 'github', position)}
                            className={`flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 border rounded-lg transition-colors duration-200 text-sm font-medium ${
                              isDark
                                ? 'text-white border-gray-600 hover:bg-gray-700'
                                : 'text-gray-800 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <Github size={14} />
                            {t('all.code')}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CTASection
        isDark={isDark}
        title={t('cta.title')}
        description={t('cta.description')}
        primaryLink={{ href: '/contact', label: t('cta.primary') }}
      />
    </div>
  );
}

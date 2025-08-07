import type {
  ClarityEventData,
  ProjectAction,
  PageSection,
  PerformanceMetrics,
  NavigatorWithConnection,
  ProjectInteractionContext,
  ErrorType,
  ConversionStep,
} from '@/types/analytics';

// Função para aguardar o carregamento do Clarity
const waitForClarity = (): Promise<boolean> => {
  return new Promise((resolve) => {
    let attempts = 0;
    const maxAttempts = 30; // 3 segundos máximo

    const checkClarity = () => {
      attempts++;
      if (typeof window !== 'undefined' && window.clarity && typeof window.clarity === 'function') {
        resolve(true);
      } else if (attempts < maxAttempts) {
        setTimeout(checkClarity, 100);
      } else {
        resolve(false);
      }
    };

    checkClarity();
  });
};

export const trackClarityEvent = async (
  eventName: string,
  eventData?: ClarityEventData,
): Promise<void> => {
  try {
    const clarityLoaded = await waitForClarity();
    if (clarityLoaded && window.clarity?.event) {
      window.clarity.event(eventName, {
        ...eventData,
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      });
    }
  } catch (error: unknown) {
    console.warn('Clarity event error:', error);
  }
};

export const trackPageView = async (
  pageName: string,
  additionalData?: ClarityEventData,
): Promise<void> => {
  try {
    const clarityLoaded = await waitForClarity();
    if (clarityLoaded && typeof window.clarity === 'function') {
      await trackClarityEvent('page_view', {
        page: pageName,
        url: window.location.href,
        ...additionalData,
      });
    }
  } catch (error: unknown) {
    console.warn('Page view tracking error:', error);
  }
};

export const trackUserInteraction = (
  action: string,
  element: string,
  additionalData?: ClarityEventData,
): void => {
  trackClarityEvent('user_interaction', {
    action,
    element,
    ...additionalData,
  });
};

export const trackProjectInteraction = (
  projectId: string | number,
  action: ProjectAction,
  additionalData?: ClarityEventData,
): void => {
  trackClarityEvent('project_interaction', {
    projectId: projectId.toString(),
    action,
    ...additionalData,
  });
};

export const trackDetailedPageView = async (
  page: string,
  details?: Record<string, unknown>,
): Promise<void> => {
  try {
    const clarityLoaded = await waitForClarity();
    if (clarityLoaded && typeof window.clarity === 'function') {
          (window.clarity as (event: string, name: string, data: Record<string, unknown>) => void)('event', 'detailed_page_view', {
        page,
        ...details,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        pathname: window.location.pathname,
      });
    }
  } catch (error: unknown) {
    console.warn('Detailed page view tracking error:', error);
  }
};

export const trackScrollDepth = async (depth: number, pageName: string): Promise<void> => {
  await trackClarityEvent('scroll_depth', {
    page: pageName,
    scrollDepth: depth,
    timestamp: new Date().toISOString(),
    viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
  });
};

export const trackTimeSpent = (
  pageName: string,
  timeSpent: number,
  section?: PageSection,
): void => {
  trackClarityEvent('time_spent', {
    page: pageName,
    section: section || 'unknown',
    timeSpentSeconds: timeSpent,
    engagement: categorizeEngagement(timeSpent),
  });
};

export const trackProjectDetailedInteraction = (
  projectId: string | number,
  action: ProjectAction,
  additionalData?: ClarityEventData,
  context?: ProjectInteractionContext,
): void => {
  trackClarityEvent('detailed_project_interaction', {
    projectId: projectId.toString(),
    action,
    position: context?.position || 0,
    totalVisible: context?.totalVisible || 0,
    filterActive: context?.filterActive || 'todos',
    searchActive: !!context?.searchTerm,
    searchTerm: context?.searchTerm || '',
    timestamp: new Date().toISOString(),
    ...additionalData,
  });
};

export const trackConversionFunnel = (
  step: ConversionStep,
  projectId?: string | number,
  additionalData?: ClarityEventData,
): void => {
  trackClarityEvent('conversion_funnel', {
    step,
    projectId: projectId?.toString() || 'unknown',
    funnelPosition: getFunnelPosition(step),
    sessionTime: getSessionTime(),
    ...additionalData,
  });
};

export const trackErrorEvent = (
  errorType: ErrorType,
  errorMessage: string,
  errorStack?: string,
): void => {
  trackClarityEvent('error_tracking', {
    errorType,
    errorMessage: errorMessage.substring(0, 200),
    errorStack: errorStack?.substring(0, 500) || '',
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    timestamp: new Date().toISOString(),
  });
};

export const trackPerformanceMetrics = (pageName: string): void => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    setTimeout(() => {
      const navigation = performance.getEntriesByType(
        'navigation',
      )[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      const metrics: PerformanceMetrics = {
        loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
        firstContentfulPaint:
          paint.find((p) => p.name === 'first-contentful-paint')?.startTime || 0,
        connectionType:
          typeof navigator !== 'undefined' && (navigator as NavigatorWithConnection).connection
            ? (navigator as NavigatorWithConnection).connection?.effectiveType || 'unknown'
            : 'unknown',
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
      };

      trackClarityEvent('performance_metrics', {
        page: pageName,
        ...metrics,
        connectionType: metrics.connectionType,
      });
    }, 2000);
  }
};

const categorizeEngagement = (timeSpent: number): string => {
  if (timeSpent < 10) return 'low';
  if (timeSpent < 60) return 'medium';
  if (timeSpent < 300) return 'high';
  return 'very_high';
};

const getFunnelPosition = (step: string): number => {
  const positions = {
    page_load: 1,
    project_view: 2,
    project_click: 3,
    github_visit: 4,
    demo_open: 4,
    contact_click: 5,
  };
  return positions[step as keyof typeof positions] || 0;
};

const getSessionTime = (): number => {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return 0;
  const startTime = sessionStorage.getItem('sessionStartTime');
  if (!startTime) {
    sessionStorage.setItem('sessionStartTime', Date.now().toString());
    return 0;
  }
  return (Date.now() - parseInt(startTime)) / 1000;
};

import type {
  ClarityEventData,
  ProjectAction,
  PageSection,
  PerformanceMetrics,
  NavigatorWithConnection,
  UserSessionData,
  ProjectInteractionContext,
  ErrorType,
  ConversionStep,
} from '@/types/analytics';

export const trackClarityEvent = (eventName: string, eventData?: ClarityEventData): void => {
  if (
    typeof window !== 'undefined' &&
    typeof window.clarity === 'function' &&
    typeof window.clarity.event === 'function'
  ) {
    window.clarity.event(eventName, {
      ...eventData,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    });
  }
};

export const trackPageView = (pageName: string, additionalData?: ClarityEventData): void => {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('trackPageView');
    trackClarityEvent('page_view', {
      page: pageName,
      url: typeof window !== 'undefined' ? window.location.href : '',
      ...additionalData,
    });
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

export const trackDetailedPageView = (
  pageName: string,
  additionalData?: ClarityEventData,
  sectionViewed?: PageSection,
): void => {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('trackPageView');
    const sessionData: UserSessionData = {
      sessionId: generateSessionId(),
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      viewport: {
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
      },
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      ...extractUTMParams(),
    };
    trackClarityEvent('detailed_page_view', {
      page: pageName,
      url: typeof window !== 'undefined' ? window.location.href : '',
      section: sectionViewed || 'page_load',
      sessionId: sessionData.sessionId,
      timestamp: sessionData.timestamp,
      userAgent: sessionData.userAgent,
      viewportWidth: sessionData.viewport.width,
      viewportHeight: sessionData.viewport.height,
      referrer: sessionData.referrer,
      utmSource: sessionData.utmSource ?? '',
      utmMedium: sessionData.utmMedium ?? '',
      utmCampaign: sessionData.utmCampaign ?? '',
      ...additionalData,
    });
  }
};

export const trackScrollDepth = (depth: number, pageName: string): void => {
  trackClarityEvent('scroll_depth', {
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

// Funções auxiliares
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const extractUTMParams = (): { utmSource?: string; utmMedium?: string; utmCampaign?: string } => {
  if (typeof window === 'undefined') return {};
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utmSource: urlParams.get('utm_source') || undefined,
    utmMedium: urlParams.get('utm_medium') || undefined,
    utmCampaign: urlParams.get('utm_campaign') || undefined,
  };
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

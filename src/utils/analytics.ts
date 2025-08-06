interface ClarityEventData {
  [key: string]: string | number | boolean;
}

type ProjectAction = 'view' | 'click_github' | 'click_demo' | 'filter';

export const trackClarityEvent = (eventName: string, eventData?: ClarityEventData): void => {
  if (typeof window !== 'undefined' && window.clarity?.event) {
    window.clarity.event(eventName, {
      ...eventData,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    });
  }
};

export const trackPageView = (pageName: string, additionalData?: ClarityEventData): void => {
  if (typeof window !== 'undefined' && window.clarity) {
    // Força o rastreamento de página para SPAs
    window.clarity('trackPageView');

    // Envia evento customizado de navegação
    trackClarityEvent('page_view', {
      page: pageName,
      url: window.location.href,
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

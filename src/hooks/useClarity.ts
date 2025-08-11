import { useCallback, useEffect } from 'react';
import {
  trackClarityEvent,
  trackDetailedPageView,
  trackUserInteraction,
  trackScrollDepth,
  trackTimeSpent,
  trackConversionFunnel,
  trackPerformanceMetrics,
  trackErrorEvent,
} from '@/utils/analytics';
import type { ClarityEventData, PageSection, ErrorType, ConversionStep } from '@/types/analytics';

interface UseClarityReturn {
  trackEvent: (eventName: string, eventData?: ClarityEventData) => void;
  trackPage: (pageName: string, additionalData?: ClarityEventData, section?: PageSection) => void;
  trackInteraction: (action: string, element: string, additionalData?: ClarityEventData) => void;
  trackScroll: (depth: number, pageName: string) => void;
  trackTime: (pageName: string, timeSpent: number, section?: PageSection) => void;
  trackConversion: (
    step: ConversionStep,
    projectId?: string | number,
    additionalData?: ClarityEventData,
  ) => void;
  trackPerformance: (pageName: string) => void;
  trackError: (errorType: ErrorType, errorMessage: string, errorStack?: string) => void;
}

export const useClarity = (): UseClarityReturn => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      !window.clarity &&
      process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
    ) {
      const script: HTMLScriptElement = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}";
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script");
      `;
      document.head.appendChild(script);
    }

    if (typeof window !== 'undefined') {
      window.sendClarityEvent = (eventName: string, eventData?: Record<string, unknown>): void => {
        if (window.clarity?.event) {
          window.clarity.event(eventName, {
            ...eventData,
            timestamp: new Date().toISOString(),
            source: 'shell',
          });
        }
      };
    }
  }, []);

  const trackEvent = useCallback((eventName: string, eventData?: ClarityEventData): void => {
    trackClarityEvent(eventName, eventData);
  }, []);

  const trackPage = useCallback(
    (pageName: string, additionalData?: ClarityEventData, section?: PageSection): void => {
      trackDetailedPageView(pageName, additionalData, section);
    },
    [],
  );

  const trackInteraction = useCallback(
    (action: string, element: string, additionalData?: ClarityEventData): void => {
      trackUserInteraction(action, element, additionalData);
    },
    [],
  );

  const trackScroll = useCallback((depth: number, pageName: string): void => {
    trackScrollDepth(depth, pageName);
  }, []);

  const trackTime = useCallback(
    (pageName: string, timeSpent: number, section?: PageSection): void => {
      trackTimeSpent(pageName, timeSpent, section);
    },
    [],
  );

  const trackConversion = useCallback(
    (
      step: ConversionStep,
      projectId?: string | number,
      additionalData?: ClarityEventData,
    ): void => {
      trackConversionFunnel(step, projectId, additionalData);
    },
    [],
  );

  const trackPerformance = useCallback((pageName: string): void => {
    trackPerformanceMetrics(pageName);
  }, []);

  const trackError = useCallback(
    (errorType: ErrorType, errorMessage: string, errorStack?: string): void => {
      trackErrorEvent(errorType, errorMessage, errorStack);
    },
    [],
  );

  return {
    trackEvent,
    trackPage,
    trackInteraction,
    trackScroll,
    trackTime,
    trackConversion,
    trackPerformance,
    trackError,
  };
};

import { useCallback } from 'react';
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

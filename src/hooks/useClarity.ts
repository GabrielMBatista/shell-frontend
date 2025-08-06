import { useCallback } from 'react';
import { trackClarityEvent, trackPageView, trackUserInteraction } from '@/utils/analytics';

interface ClarityEventData {
  [key: string]: string | number | boolean;
}

interface UseClarityReturn {
  trackEvent: (eventName: string, eventData?: ClarityEventData) => void;
  trackPage: (pageName: string, additionalData?: ClarityEventData) => void;
  trackInteraction: (action: string, element: string, additionalData?: ClarityEventData) => void;
}

export const useClarity = (): UseClarityReturn => {
  const trackEvent = useCallback((eventName: string, eventData?: ClarityEventData): void => {
    trackClarityEvent(eventName, eventData);
  }, []);

  const trackPage = useCallback((pageName: string, additionalData?: ClarityEventData): void => {
    trackPageView(pageName, additionalData);
  }, []);

  const trackInteraction = useCallback(
    (action: string, element: string, additionalData?: ClarityEventData): void => {
      trackUserInteraction(action, element, additionalData);
    },
    [],
  );

  return {
    trackEvent,
    trackPage,
    trackInteraction,
  };
};

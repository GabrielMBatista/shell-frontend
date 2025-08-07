declare global {
  interface Window {
    clarity?: {
      event: (eventName: string, eventData?: Record<string, unknown>) => void;
      q?: unknown[];
    };
    sendClarityEvent?: (eventName: string, eventData?: Record<string, unknown>) => void;
  }
}

export {};

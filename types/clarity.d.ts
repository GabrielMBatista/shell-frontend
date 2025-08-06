declare global {
  interface Window {
    clarity: {
      (command: string, ...args: unknown[]): void;
      event: (eventName: string, eventData?: Record<string, unknown>) => void;
      trackPageView: () => void;
      q?: [string, ...unknown[]][];
    };
    sendClarityEvent?: (eventName: string, eventData?: Record<string, unknown>) => void;
  }
}

export {};

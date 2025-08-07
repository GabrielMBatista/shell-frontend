declare global {
  interface Window {
    clarity?:
      | {
          (action: 'event', eventName: string, eventData?: Record<string, unknown>): void;
          (action: 'set', key: string, value: string | number | boolean): void;
          (
            action: 'identify',
            userId: string,
            sessionId?: string,
            pageId?: string,
            friendlyName?: string,
          ): void;
          (action: string, ...args: unknown[]): void;
          event?: (eventName: string, eventData?: Record<string, unknown>) => void;
        }
      | ((action: string, ...args: unknown[]) => void);
  }
}

export {};

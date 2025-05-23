'use client';
import { useEffect, useState } from 'react';

export function useTimeZone() {
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined);

  useEffect(() => {
    const stored = localStorage.getItem('timeZone');
    if (stored) {
      setTimeZone(stored);
    } else {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      localStorage.setItem('timeZone', tz);
      setTimeZone(tz);
    }
  }, []);

  return timeZone ?? 'America/Sao_Paulo'; // Fallback Brasil
}

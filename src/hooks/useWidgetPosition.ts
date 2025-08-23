import { useState, useEffect } from 'react';

type DockPos = Partial<{ top: number; left: number; right: number; bottom: number }>;

export function useWidgetPosition(targetId: string, size: number) {
  const getInitialPosition = (): DockPos => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return { top: 16, left: 16 };
    }
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    return { top: 16, left: isLandscape ? 24 : 16 };
  };

  const [widgetPos, setWidgetPos] = useState<DockPos>(getInitialPosition);

  useEffect(() => {
    const compute = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = Math.round(rect.top + rect.height / 2 - size / 2);
      const left = Math.round(rect.left + rect.width / 2 - size / 2);
      setWidgetPos({ top, left });
    };

    const delayedCompute = () => {
      setTimeout(compute, 100);
    };

    const raf = requestAnimationFrame(delayedCompute);
    window.addEventListener('resize', delayedCompute);
    window.addEventListener('orientationchange', delayedCompute);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', delayedCompute);
      window.removeEventListener('orientationchange', delayedCompute);
    };
  }, [targetId, size]);

  return widgetPos;
}

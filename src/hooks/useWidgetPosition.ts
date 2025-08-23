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
      if (!el) {
        console.warn(`Elemento com ID "${targetId}" não encontrado.`);
        return;
      }
      const rect = el.getBoundingClientRect();
      console.log('Element bounds:', rect); // Log para depuração
      const top = Math.round(rect.top + rect.height / 2 - size / 2);
      const left = Math.round(rect.left + rect.width / 2 - size / 2);
      console.log('Computed position:', { top, left }); // Log para depuração
      setWidgetPos({ top, left });
    };

    const delayedCompute = () => {
      setTimeout(compute, 100); // Adiciona um pequeno atraso de 100ms
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

  console.log('Final widget position:', widgetPos); // Log para depuração
  return widgetPos;
}

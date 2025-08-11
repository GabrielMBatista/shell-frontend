import { useState, useEffect } from 'react';

type DockPos = Partial<{ top: number; left: number; right: number; bottom: number }>;

export function useWidgetPosition() {
  const [widgetPos, setWidgetPos] = useState<DockPos>({ top: 24, left: 24 });

  useEffect(() => {
    const compute = () => {
      const el = document.getElementById('gabs-header-anchor');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const size = 64; // tamanho do avatar do widget
      const top = Math.round(rect.top + rect.height / 2 - size / 2);
      const left = Math.round(rect.left + rect.width / 2 - size / 2);
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
  }, []);

  return widgetPos;
}

import * as React from 'react';

export function useIsMobile(breakpoint = 768, heightThreshold = 1024) {
  const getInitial = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }

    // Verifica o userAgent para identificar dispositivos móveis
    const userAgent = navigator.userAgent || '';
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);

    const isMobileWidth = window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
    const isMobileHeight = window.innerHeight <= heightThreshold;

    // Considera como móvel se for identificado pelo userAgent ou atender aos critérios de largura e altura
    return isMobileDevice || (isMobileWidth && isMobileHeight);
  };

  const [isMobile, setIsMobile] = React.useState<boolean>(getInitial);

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

    const mqlWidth = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const onChange = () => {
      const userAgent = navigator.userAgent || '';
      const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);

      const isMobileWidth = mqlWidth.matches;
      const isMobileHeight = window.innerHeight <= heightThreshold;

      // Atualiza o estado com base no userAgent e nos critérios de largura e altura
      setIsMobile(isMobileDevice || (isMobileWidth && isMobileHeight));
    };

    mqlWidth.addEventListener('change', onChange);
    window.addEventListener('resize', onChange);

    return () => {
      mqlWidth.removeEventListener('change', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, [breakpoint, heightThreshold]);

  return isMobile;
}

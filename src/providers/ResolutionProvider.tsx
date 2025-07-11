'use client';
import { createContext, useContext, useState } from 'react';
import { resolutions } from '@/utils/resolutions';

type ResolutionKey = keyof typeof resolutions;

type ResolutionContextType = {
  selected: ResolutionKey;
  resolution: {
    width: string;
    height: string;
    scale: number;
  };
  setSelected: (key: ResolutionKey) => void;
};

const ResolutionContext = createContext<ResolutionContextType | null>(null);

export const useResolution = () => {
  const context = useContext(ResolutionContext);
  if (!context) throw new Error('useResolution must be used within ResolutionProvider');
  return context;
};

export const ResolutionProvider = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState<ResolutionKey>('Responsive');

  const value: ResolutionContextType = {
    selected,
    resolution: resolutions[selected],
    setSelected,
  };

  return <ResolutionContext.Provider value={value}>{children}</ResolutionContext.Provider>;
};

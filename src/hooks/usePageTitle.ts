import { useEffect } from 'react';

export const usePageTitle = (title: string, suffix: string = ' | Gabriel Marques Batista') => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title + suffix;

    return () => {
      document.title = previousTitle;
    };
  }, [title, suffix]);
};

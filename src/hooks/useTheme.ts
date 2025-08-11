import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme: string | null = localStorage.getItem('isDark');
    if (savedTheme !== null) setIsDark(savedTheme === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('isDark', isDark.toString());
  }, [isDark]);

  return { isDark, setIsDark };
}

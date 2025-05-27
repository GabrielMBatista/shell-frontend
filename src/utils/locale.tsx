export function detectLocale() {
  if (typeof window === 'undefined') return 'pt'; // fallback server
  const lang = navigator.language;
  if (lang.startsWith('en')) return 'en';
  return 'pt';
}

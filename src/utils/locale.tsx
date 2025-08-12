export function detectLocale() {
  if (typeof window === 'undefined') return 'pt-br'; // fallback no servidor
  const lang = (navigator.language || '').toLowerCase();
  if (lang.startsWith('en')) return 'en-en';
  return 'pt-br';
}

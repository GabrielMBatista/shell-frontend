export const locales = ['en-en', 'pt-br'] as const;
export const defaultLocale = 'pt-br';

export type Locale = (typeof locales)[number];

export const i18n = {
  locales,
  defaultLocale,
} as const;

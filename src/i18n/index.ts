export const locales = ['en', 'pt'] as const;
export const defaultLocale = 'pt';

export type Locale = (typeof locales)[number];

export const i18n = {
  locales,
  defaultLocale,
} as const;
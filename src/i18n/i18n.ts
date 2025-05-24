export const locales = ['en', 'pt'] as const;
export const defaultLocale = 'pt';

export type Locale = (typeof locales)[number];

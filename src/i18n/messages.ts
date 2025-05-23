import pt from './locales/pt/common.json';
import en from './locales/en/common.json';

export type Messages = typeof pt;

export const messages: Record<'pt' | 'en', Messages> = {
  pt,
  en,
};

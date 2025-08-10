import type { Locale } from './index';
import pt from './locales/pt/common.json';
import en from './locales/en/common.json';

export type Messages = { common: typeof pt };

export const messages: Record<Locale, Messages> = {
  'pt-br': { common: pt },
  'en-en': { common: en },
};

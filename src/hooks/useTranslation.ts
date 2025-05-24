import { useI18n } from '@/providers/I18nProvider';

export const useTranslation = (namespace: string) => {
  const { t, locale, changeLocale } = useI18n();

  return {
    t: (key: string) => t(namespace, key),
    locale,
    changeLocale,
  };
};

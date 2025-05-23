import { useI18n } from '@/providers/I18nProvider';


export const useTranslation = (namespace: string) => {
  const { t, locale, changeLocale } = useI18n();
  const translate = (key: string) => t(namespace, key);
  return { t: translate, locale, changeLocale };
};

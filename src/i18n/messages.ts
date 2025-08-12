import type { Locale } from './index';
import commonPt from './locales/pt/common.json';
import commonEn from './locales/en/common.json';
import homePt from './locales/pt/home.json';
import homeEn from './locales/en/home.json';
import aboutPt from './locales/pt/about.json';
import aboutEn from './locales/en/about.json';
import projectsPt from './locales/pt/projects.json';
import projectsEn from './locales/en/projects.json';

export type Messages = {
  common: typeof commonPt;
  home: typeof homePt;
  about: typeof aboutPt;
  projects: typeof projectsPt;
};

export const messages: Record<Locale, Messages> = {
  'pt-br': { common: commonPt, home: homePt, about: aboutPt, projects: projectsPt },
  'en-en': { common: commonEn, home: homeEn, about: aboutEn, projects: projectsEn },
};

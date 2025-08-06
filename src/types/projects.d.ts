import { LucideIcon } from 'lucide-react';

export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'mobile';

export interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  github: string;
  demo: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface ProjectsProps {
  isDark: boolean;
}

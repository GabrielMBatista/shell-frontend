export interface ClarityEventData {
  [key: string]: string | number | boolean;
}

export type ProjectAction =
  | 'view'
  | 'click_github'
  | 'click_demo'
  | 'filter'
  | 'search'
  | 'scroll_to_project';

export type PageSection =
  | 'hero'
  | 'featured_projects'
  | 'all_projects'
  | 'filters'
  | 'search'
  | 'cta';

export type UserBehavior =
  | 'page_enter'
  | 'page_exit'
  | 'scroll_depth'
  | 'time_spent'
  | 'bounce'
  | 'engagement';

export type ErrorType = 'js_error' | 'network_error' | 'render_error';

export type ConversionStep =
  | 'page_load'
  | 'project_view'
  | 'project_click'
  | 'github_visit'
  | 'demo_open'
  | 'contact_click';

export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  connectionType: string;
}

export interface NetworkInformation {
  effectiveType?: string;
}

export interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

export interface UserSessionData {
  sessionId: string;
  timestamp: string;
  userAgent: string;
  viewport: { width: number; height: number };
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface ProjectInteractionContext {
  position: number;
  totalVisible: number;
  filterActive: string;
  searchTerm?: string;
}

export interface EngagementLevel {
  low: number;
  medium: number;
  high: number;
  very_high: number;
}

export function isEnvTrue(envVar: string | undefined): boolean {
  return envVar === 'true';
}

export function isChatbotEnabled() {
  return isEnvTrue(process.env.NEXT_PUBLIC_CHATBOT);
}

export function isTourMobileEnabled() {
  return isEnvTrue(process.env.NEXT_PUBLIC_TOUR_MOBILE);
}

export function shouldShowMobileTour(isMobile: boolean): boolean {
  return isMobile && isTourMobileEnabled() && isChatbotEnabled();
}

interface FeatureOptions {
  isMobile?: boolean;
  env?: string;
  requireChatbot?: boolean;
}

export function shouldShowFeature(options: FeatureOptions): boolean {
  const { isMobile, env, requireChatbot } = options;
  let result = true;
  if (typeof isMobile === 'boolean') result = result && isMobile;
  if (env) result = result && isEnvTrue(process.env[env]);
  if (requireChatbot) result = result && isChatbotEnabled();
  return result;
}

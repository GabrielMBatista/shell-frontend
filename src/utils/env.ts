export function isEnvTrue(envVar: string | undefined): boolean {
  return envVar === 'true';
}

export function isChatbotEnabled() {
  return isEnvTrue(process.env.NEXT_PUBLIC_CHATBOT);
}

export function isTourMobileEnabled() {
  return isEnvTrue(process.env.NEXT_PUBLIC_TOUR_MOBILE);
}

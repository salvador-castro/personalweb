export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const gaEvent = (name: string, params?: Record<string, string>) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
};

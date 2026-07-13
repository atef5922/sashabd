export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

type GtagArgs = unknown[];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

export function isGaEnabled(): boolean {
  return typeof window !== "undefined" && Boolean(GA_ID) && typeof window.gtag === "function";
}

export function pageview(url: string): void {
  if (!isGaEnabled()) return;
  window.gtag!("config", GA_ID, { page_path: url });
}

export function event(action: string, params: Record<string, unknown> = {}): void {
  if (!isGaEnabled()) return;
  window.gtag!("event", action, params);
}

export function trackButtonClick(label: string, params: Record<string, unknown> = {}) {
  return () => {
    event("button_click", {
      label,
      ...params,
    });
  };
}

export function trackFormSubmit(formName: string, params: Record<string, unknown> = {}) {
  return () => {
    event("form_submit", {
      form_name: formName,
      ...params,
    });
  };
}

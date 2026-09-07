type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(
  name: string,
  params: AnalyticsParams = {}
): void {
  if (typeof window === "undefined") return;
  const w = window as typeof window & {
    gtag?: (command: "event", eventName: string, eventParams?: AnalyticsParams) => void;
  };
  w.gtag?.("event", name, {
    ...params,
    page_path: window.location.pathname,
  });
}

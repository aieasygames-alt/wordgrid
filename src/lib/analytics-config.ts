export const GA_MEASUREMENT_ID = "G-MLZV98LG8Z";
export const CONSENT_KEY = "wordgrid-cookie-consent";
export type ConsentValue = "granted" | "denied";

// Run before gtag.js or any page events. Restore consent before configuration
// so returning visitors do not race the React hydration / script loader.
export const consentScript = `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
try {
  var savedConsent = localStorage.getItem('${CONSENT_KEY}');
  if (savedConsent === 'granted' || savedConsent === 'denied') {
    window.gtag('consent', 'update', {analytics_storage: savedConsent});
  }
} catch (e) {}
`;

export const analyticsBootstrapScript = consentScript + `
if (location.hostname === 'wordgrid.games' || location.hostname === 'www.wordgrid.games') {
  window.gtag('js', new Date());
  window.gtag('config', '${GA_MEASUREMENT_ID}');
}
`;

export function updateAnalyticsConsent(value: ConsentValue): void {
  const analyticsWindow = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  // gtag's command queue uses Arguments objects. Never replace an existing tag.
  analyticsWindow.gtag = analyticsWindow.gtag || function () {
    analyticsWindow.dataLayer!.push(arguments);
  };
  analyticsWindow.gtag("consent", "update", { analytics_storage: value });
}

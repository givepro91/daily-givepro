export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (typeof w.gtag === "function") {
    w.gtag("event", eventName, params);
  }
}

export function trackAffiliateClick(productName: string, platform: string) {
  trackEvent("affiliate_click", {
    product_name: productName,
    platform,
  });
}

export function trackShare(method: string, url: string) {
  trackEvent("share", {
    method,
    content_id: url,
  });
}

export function trackOutboundLink(url: string) {
  trackEvent("click", {
    event_category: "outbound",
    event_label: url,
  });
}

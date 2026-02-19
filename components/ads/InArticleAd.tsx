"use client";

import { useEffect, useRef } from "react";

export default function InArticleAd({ slot }: { slot?: string }) {
  const adRef = useRef<HTMLModElement>(null);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adSlot = slot || process.env.NEXT_PUBLIC_AD_SLOT_INARTICLE;

  useEffect(() => {
    if (!clientId || !adRef.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded
    }
  }, [clientId]);

  if (!clientId) {
    return (
      <div className="my-6 flex items-center justify-center bg-gray-100 py-6 text-sm text-gray-400 dark:bg-gray-800 dark:text-gray-600">
        In-Article Ad
      </div>
    );
  }

  return (
    <div className="my-6">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={clientId}
        data-ad-slot={adSlot}
      />
    </div>
  );
}

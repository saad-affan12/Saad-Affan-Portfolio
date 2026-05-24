"use client";

import dynamic from "next/dynamic";

const PremiumCursor = dynamic(() => import("./PremiumCursor"), { ssr: false });

export default function ClientPremiumCursor() {
  return <PremiumCursor />;
}

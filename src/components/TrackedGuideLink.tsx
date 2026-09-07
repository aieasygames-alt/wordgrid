"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export default function TrackedGuideLink({
  href,
  label,
  detail,
  primary = false,
}: {
  href: string;
  label: string;
  detail: string;
  primary?: boolean;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={() => trackEvent("guide_cta_click", { guide_slug: pathname, destination: href })}
      className={`rounded-2xl p-4 transition hover:bg-bg/80 ${primary ? "bg-primary/10 border border-primary/20" : "bg-bg/60"}`}
    >
      <div className={`font-semibold ${primary ? "text-primary" : "text-text"}`}>{label}</div>
      <p className="mt-1 text-sm text-text-muted">{detail}</p>
    </Link>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export default function TrackedGuideLink({
  href,
  label,
  detail,
  primary = false,
  compact = false,
}: {
  href: string;
  label: string;
  detail: string;
  primary?: boolean;
  compact?: boolean;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={() => trackEvent("guide_cta_click", { guide_slug: pathname, destination: href })}
      className={compact ? "inline-block rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary-hover" : `rounded-2xl p-4 transition hover:bg-bg/80 ${primary ? "bg-primary/10 border border-primary/20" : "bg-bg/60"}`}
    >
      {compact ? label : <><div className={`font-semibold ${primary ? "text-primary" : "text-text"}`}>{label}</div><p className="mt-1 text-sm text-text-muted">{detail}</p></>}
    </Link>
  );
}

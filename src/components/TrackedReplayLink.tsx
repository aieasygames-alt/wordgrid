"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function TrackedReplayLink({
  href,
  date,
  source,
  className,
  children,
}: {
  href: string;
  date: string;
  source: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={() => trackEvent("daily_replay", { date, source })}
      className={className}
    >
      {children}
    </Link>
  );
}

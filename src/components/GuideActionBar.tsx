import Link from "next/link";

type GuideActionBarProps = {
  primary?: { href: string; label: string; detail: string };
  secondary?: { href: string; label: string; detail: string };
  tertiary?: { href: string; label: string; detail: string };
  quaternary?: { href: string; label: string; detail: string };
};

export default function GuideActionBar({
  primary,
  secondary,
  tertiary,
  quaternary,
}: GuideActionBarProps) {
  const actions = [primary, secondary, tertiary, quaternary].filter(
    Boolean
  ) as Array<{ href: string; label: string; detail: string }>;

  return (
    <section className="mb-6 rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action, index) => (
          <Link
            key={`${action.href}-${index}`}
            href={action.href}
            className={`rounded-2xl p-4 transition hover:bg-bg/80 ${
              index === 0
                ? "bg-primary/10 border border-primary/20"
                : "bg-bg/60"
            }`}
          >
            <div
              className={`font-semibold ${
                index === 0 ? "text-primary" : "text-text"
              }`}
            >
              {action.label}
            </div>
            <p className="mt-1 text-sm text-text-muted">{action.detail}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

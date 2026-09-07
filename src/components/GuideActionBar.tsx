import TrackedGuideLink from "./TrackedGuideLink";

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
          <TrackedGuideLink
            key={`${action.href}-${index}`}
            href={action.href}
            label={action.label}
            detail={action.detail}
            primary={index === 0}
          />
        ))}
      </div>
    </section>
  );
}

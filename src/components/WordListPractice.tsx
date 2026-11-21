import TrackedGuideLink from "./TrackedGuideLink";

const drills = [
  { href: "/training/?focus=quick", title: "3–4 letter anchors", text: "Scan for quick finds in a 30-second sprint." },
  { href: "/training/?focus=qu", title: "Qu routes", text: "Start at Qu and explore neighboring vowels." },
  { href: "/training/?focus=suffix", title: "Word endings", text: "Look for a stem, then test adjacent endings." },
  { href: "/training/?focus=long", title: "5–6 letter extensions", text: "Give a promising short route one more tile." },
];

export default function WordListPractice() {
  return <section className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
    <h2 className="text-xl font-bold text-text">Turn your word list into a practice round</h2>
    <p className="mt-2 text-sm leading-relaxed text-text-muted">Pick a scanning habit to train, then review the words you missed. A study word still needs a legal route on your practice board.</p>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">{drills.map((drill) => <TrackedGuideLink key={drill.href} href={drill.href} label={`${drill.title} →`} detail={drill.text} />)}</div>
  </section>;
}

const areas = [
  {
    title: "AI",
    description:
      "Applied intelligence, assistants, and automation woven into real products.",
  },
  {
    title: "Software Development",
    description:
      "Architecting clean, scalable systems from prototype to production.",
  },
  {
    title: "Gaming",
    description:
      "Interactive experiences and game systems built for immersion.",
  },
  {
    title: "Analytics",
    description:
      "Turning data into clear, actionable insight through refined interfaces.",
  },
  {
    title: "Accounting",
    description:
      "Precision tooling for financial clarity and dependable workflows.",
  },
];

export function FocusAreas() {
  return (
    <section id="focus" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">Focus Areas</p>
          <h2 className="section-title mt-4">
            Five disciplines, one technology brand.
          </h2>
          <p className="mt-5 text-slate-400">
            LADG operates across connected domains — each informing the next —
            to build coherent, future-facing systems.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
            <article
              key={area.title}
              className="glass-panel group relative overflow-hidden p-7 transition-all duration-300 hover:border-primary-400/30 hover:bg-white/[0.05]"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary-500/10 blur-2xl transition-opacity duration-300 group-hover:bg-primary-400/20" />
              <span className="font-mono text-xs text-primary-400/70">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {area.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {area.description}
              </p>
            </article>
          ))}

          {/* Slot reserved for future 3D scene */}
          <div className="glass-panel relative flex min-h-[180px] items-center justify-center border-dashed">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-500">
              3D scene · coming soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

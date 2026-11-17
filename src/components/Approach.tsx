const principles = [
  {
    title: "Cinematic by default",
    description:
      "Every surface, transition, and interaction is composed with intent — motion carries meaning.",
  },
  {
    title: "Performance-conscious",
    description:
      "Built to run smoothly on mid-range hardware without sacrificing visual quality.",
  },
  {
    title: "Modular architecture",
    description:
      "Components and scenes are isolated so the system grows without rewriting itself.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="relative py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ink-900/40 to-transparent" />
      <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Approach</p>
          <h2 className="section-title mt-4">
            Built like a system, not a template.
          </h2>
          <p className="mt-5 text-slate-400">
            The foundation is engineered for the long term — ready for 3D
            scenes, cinematic transitions, and interactive layers as the brand
            evolves.
          </p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5">
          {principles.map((p) => (
            <li
              key={p.title}
              className="bg-ink-900/80 p-7 transition-colors duration-300 hover:bg-ink-800"
            >
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {p.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

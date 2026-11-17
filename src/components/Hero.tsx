import { HolographicAvatar } from "./HolographicAvatar";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 md:pt-36"
    >
      {/* Background layers — hybrid digital environment */}
      <div className="absolute inset-0 -z-10">
        {/* Deep gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-950" />
        {/* Faint grid */}
        <div className="absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_at_50%_30%,black_40%,transparent_75%)]" />
        {/* Top glow */}
        <div className="absolute inset-0 bg-radial-glow" />
        {/* Horizon light */}
        <div className="absolute bottom-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-400/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-40 w-[60%] -translate-x-1/2 rounded-[50%] bg-primary-500/10 blur-3xl" />
      </div>

      <div className="container-page grid items-center gap-12 pb-24 md:pb-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* Copy */}
        <div className="max-w-2xl">
          <p className="eyebrow animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Personal Technology &amp; Innovation
          </p>
          <h1
            className="mt-5 text-4xl font-semibold leading-[1.05] text-white animate-fade-up md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.15s", opacity: 0 }}
          >
            Lead the Code.
            <br />
            <span className="text-gradient-accent">Shape the Future.</span>
          </h1>
          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 animate-fade-up md:text-lg"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            LADG is a personal technology brand working at the intersection of
            AI, software development, gaming, analytics, and accounting —
            building immersive digital experiences and intelligent systems.
          </p>
          <div
            className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.45s", opacity: 0 }}
          >
            <a href="#focus" className="btn-primary">
              Explore focus areas
            </a>
            <a href="#approach" className="btn-ghost">
              The approach
            </a>
          </div>
        </div>

        {/* Holographic avatar stage */}
        <div
          className="relative flex items-center justify-center animate-fade-in"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <HolographicAvatar />
        </div>
      </div>
    </section>
  );
}

import { Suspense, lazy, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

// Lazy-load the 3D scene so the initial paint stays fast and the heavy
// three.js bundle is split into its own chunk.
const HeroScene = lazy(() =>
  import("../three/HeroScene").then((m) => ({ default: m.HeroScene })),
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven parallax for the whole hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Pointer parallax for a camera-like feel
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const scenePX = useSpring(px, { stiffness: 40, damping: 20 });
  const scenePY = useSpring(py, { stiffness: 40, damping: 20 });
  const sceneRotateX = useTransform(scenePY, [-0.5, 0.5], [4, -4]);
  const sceneRotateY = useTransform(scenePX, [-0.5, 0.5], [-6, 6]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      px.set((e.clientX / w - 0.5) * 1);
      py.set((e.clientY / h - 0.5) * 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden"
    >
      {/* ---- Layered atmospheric background ---- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b16] via-[#05060a] to-[#03040a]" />
        {/* Volumetric light beams */}
        <div className="absolute left-1/2 top-[-10%] h-[60%] w-[70%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,204,255,0.22),transparent_55%)] blur-2xl" />
        <div className="absolute right-[5%] top-[20%] h-[40%] w-[30%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(16,201,163,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute left-[8%] bottom-[10%] h-[40%] w-[30%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,180,230,0.14),transparent_60%)] blur-3xl" />
        {/* Faint distant grid for depth */}
        <div className="absolute inset-0 bg-grid-faint bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_50%_40%,black_20%,transparent_70%)]" />
        {/* Horizon line */}
        <div className="absolute bottom-[14%] left-1/2 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-400/40 to-transparent" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_40%,rgba(3,4,10,0.8)_100%)]" />
      </div>

      {/* ---- 3D scene stage (camera-like parallax) ---- */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: sceneY,
          rotateX: sceneRotateX,
          rotateY: sceneRotateY,
          scale: sceneScale,
          perspective: 1200,
          transformStyle: "preserve-3d",
        }}
      >
        <Suspense fallback={<SceneBootFallback />}>
          <HeroScene />
        </Suspense>
      </motion.div>

      {/* ---- Cinematic grade overlay ---- */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#03040a]/60 via-transparent to-[#03040a]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#03040a] to-transparent" />
      </motion.div>

      {/* ---- Foreground content ---- */}
      <motion.div
        className="container-page relative z-20 flex min-h-screen flex-col justify-center pt-28 pb-24"
        style={{ y: copyY }}
      >
        <div className="max-w-2xl">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Personal Technology &amp; Innovation
          </motion.p>

          <motion.h1
            className="mt-6 text-5xl font-semibold leading-[0.98] text-white md:text-7xl lg:text-[5.5rem]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            Lead the Code.
            <br />
            <span className="text-gradient-accent">Shape the Future.</span>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-xl text-base leading-relaxed text-slate-300/80 md:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            LADG is a personal technology brand working at the intersection of
            AI, software development, gaming, analytics, and accounting —
            building immersive digital experiences and intelligent systems.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="#focus" className="btn-primary">
              Explore focus areas
            </a>
            <a href="#approach" className="btn-ghost">
              The approach
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        style={{ opacity: overlayOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-primary-400/60 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

/** Boot fallback while the 3D chunk loads — keeps layout stable. */
function SceneBootFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 rounded-full border border-primary-400/20 border-t-primary-400/80 animate-spin" />
    </div>
  );
}

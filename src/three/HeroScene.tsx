import { Suspense, useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { HolographicCore } from "./HolographicCore";
import { ParticleField } from "./ParticleField";
import { GroundReflection } from "./GroundReflection";

/**
 * Adaptive quality hook — picks a tier from hardware concurrency + device memory
 * + a coarse GPU heuristic. Falls back gracefully on low-end / mobile.
 */
function useQuality() {
  const [tier, setTier] = useState<"high" | "mid" | "low">("mid");

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const webgl = (() => {
      try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2") || c.getContext("webgl");
        if (!gl) return false;
        const dbg = gl.getExtension("WEBGL_debug_renderer_info");
        const renderer = dbg
          ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)
          : "";
        return /apple|nvidia|amd|radeon|intel|iris|snapdragon|adreno|mali/gi.test(
          renderer,
        );
      } catch {
        return false;
      }
    })();

    if (isMobile || cores <= 4 || mem <= 2) {
      setTier("low");
    } else if (webgl && cores >= 8 && mem >= 8) {
      setTier("high");
    } else {
      setTier("mid");
    }
  }, []);

  return tier;
}

type HeroSceneProps = {
  /** Allows the parent to render a CSS fallback if WebGL is unavailable. */
  onFallback?: () => void;
};

export function HeroScene({ onFallback }: HeroSceneProps) {
  const tier = useQuality();
  const [failed, setFailed] = useState(false);

  // Detect WebGL support before mounting Canvas.
  const webglOk = useMemo(() => {
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (!webglOk) {
      setFailed(true);
      onFallback?.();
    }
  }, [webglOk, onFallback]);

  if (failed) return <SceneFallback />;

  const dpr: [number, number] = tier === "high" ? [1, 2] : tier === "mid" ? [1, 1.5] : [0.8, 1];
  const particleCount = tier === "high" ? 600 : tier === "mid" ? 350 : 150;

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: tier !== "low",
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      camera={{ position: [0, 0.4, 6], fov: 42, near: 0.1, far: 60 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      onError={() => {
        setFailed(true);
        onFallback?.();
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        {/* Lighting rig — volumetric feel via 3 colored points + ambient */}
        <ambientLight intensity={0.25} color="#1a2a40" />
        <pointLight position={[4, 3, 4]} intensity={2.2} color="#22ccff" distance={20} decay={2} />
        <pointLight position={[-5, -1, 2]} intensity={1.4} color="#0aa887" distance={18} decay={2} />
        <pointLight position={[0, 4, -4]} intensity={1.0} color="#5fe0ff" distance={16} decay={2} />

        <HolographicCore reduced={tier === "low"} />
        <ParticleField count={particleCount} />
        <GroundReflection />

        {/* Atmospheric fog for depth */}
        <fog attach="fog" args={["#05060a", 8, 22]} />
      </Suspense>
    </Canvas>
  );
}

/** Graceful non-WebGL fallback — still on-brand, fully CSS. */
function SceneFallback() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/30 blur-3xl animate-pulse-slow" />
      <div className="absolute inset-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-400/40 animate-spin-slow" />
      <div className="absolute inset-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-300 shadow-[0_0_30px_8px_rgba(34,204,255,0.7)] animate-pulse-slow" />
    </div>
  );
}

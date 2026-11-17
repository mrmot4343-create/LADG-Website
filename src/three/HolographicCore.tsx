import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * HolographicCore — the central AI presence.
 *
 * Layered composition:
 *  - An inner faceted icosahedron "mind" with emissive cyan material
 *  - A translucent wireframe shell that slowly rotates
 *  - Two counter-rotating torus rings (orbit platforms)
 *  - A soft fresnel-style halo sphere
 *
 * Idle: gentle float + slow spin. Interaction: the whole rig eases toward
 * the pointer for a controlled, cinematic parallax.
 */
type HolographicCoreProps = {
  reduced?: boolean;
};

export function HolographicCore({ reduced = false }: HolographicCoreProps) {
  const group = useRef<THREE.Group>(null!);
  const shell = useRef<THREE.Mesh>(null!);
  const ringA = useRef<THREE.Mesh>(null!);
  const ringB = useRef<THREE.Mesh>(null!);
  const halo = useRef<THREE.Mesh>(null!);

  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a2a3a"),
        emissive: new THREE.Color("#22ccff"),
        emissiveIntensity: 1.4,
        roughness: 0.2,
        metalness: 0.8,
        flatShading: true,
      }),
    [],
  );

  const shellMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#5fe0ff"),
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      }),
    [],
  );

  const haloMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#22ccff"),
        transparent: true,
        opacity: 0.06,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      // float
      group.current.position.y = Math.sin(t * 0.6) * 0.15;
      // controlled pointer parallax
      const tx = state.pointer.x * 0.4;
      const ty = state.pointer.y * 0.3;
      group.current.rotation.y += (tx - group.current.rotation.y) * 0.03;
      group.current.rotation.x += (-ty - group.current.rotation.x) * 0.03;
    }
    if (shell.current) {
      shell.current.rotation.y += delta * (reduced ? 0.05 : 0.12);
      shell.current.rotation.x += delta * 0.04;
    }
    if (ringA.current) {
      ringA.current.rotation.x += delta * 0.25;
      ringA.current.rotation.z += delta * 0.1;
    }
    if (ringB.current) {
      ringB.current.rotation.y -= delta * 0.2;
      ringB.current.rotation.x -= delta * 0.08;
    }
    if (halo.current) {
      const s = 1 + Math.sin(t * 1.2) * 0.03;
      halo.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      {/* Inner faceted mind */}
      <mesh material={coreMaterial}>
        <icosahedronGeometry args={[0.85, 1]} />
      </mesh>

      {/* Wireframe shell */}
      <mesh ref={shell} material={shellMaterial}>
        <icosahedronGeometry args={[1.35, 2]} />
      </mesh>

      {/* Halo */}
      <mesh ref={halo} material={haloMaterial}>
        <sphereGeometry args={[2.1, 32, 32]} />
      </mesh>

      {/* Orbit rings */}
      <mesh ref={ringA} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.7, 0.012, 8, 128]} />
        <meshBasicMaterial color="#22ccff" transparent opacity={0.55} />
      </mesh>
      <mesh ref={ringB} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[2.0, 0.008, 8, 128]} />
        <meshBasicMaterial color="#34e3c4" transparent opacity={0.4} />
      </mesh>

      {/* Inner glow point light */}
      <pointLight color="#22ccff" intensity={3} distance={6} decay={2} />
    </group>
  );
}

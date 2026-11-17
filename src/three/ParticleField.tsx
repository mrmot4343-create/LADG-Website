import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ParticleField — atmospheric depth particles drifting around the avatar.
 * Uses a single BufferGeometry with additive blending; count scales with quality.
 */
type ParticleFieldProps = {
  count?: number;
  radius?: number;
};

export function ParticleField({ count = 400, radius = 14 }: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // distribute in a spherical shell
      const r = radius * (0.4 + Math.random() * 0.6);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.02;
    // subtle parallax with pointer
    const mx = state.pointer.x * 0.3;
    const my = state.pointer.y * 0.3;
    points.current.rotation.x += (my - points.current.rotation.x) * 0.02;
    points.current.position.x += (mx - points.current.position.x) * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#5fe0ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <primitive object={new THREE.Object3D()} attach="userData" />
      {viewport && null}
    </points>
  );
}

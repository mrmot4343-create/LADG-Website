import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * GroundReflection — a dark reflective floor with a faint radial light grid.
 * Gives the avatar a volumetric base and grounds it in the environment.
 */
export function GroundReflection() {
  const grid = useRef<THREE.Mesh>(null!);

  const gridMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uColor: { value: new THREE.Color("#22ccff") },
          uTime: { value: 0 },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec2 vUv;
          uniform vec3 uColor;
          uniform float uTime;
          void main() {
            vec2 g = abs(fract(vUv * 24.0) - 0.5);
            float line = smoothstep(0.48, 0.5, max(g.x, g.y));
            float dist = distance(vUv, vec2(0.5));
            float fade = smoothstep(0.5, 0.1, dist);
            float pulse = 0.6 + 0.4 * sin(uTime * 0.8 - dist * 12.0);
            float alpha = line * fade * pulse * 0.5;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
      }),
    [],
  );

  useFrame((state) => {
    gridMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh
      ref={grid}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.8, 0]}
      material={gridMaterial}
    >
      <planeGeometry args={[40, 40, 1, 1]} />
    </mesh>
  );
}

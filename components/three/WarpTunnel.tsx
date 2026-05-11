"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WarpTunnelProps {
  intensity?: number;
  active?: boolean;
}

export default function WarpTunnel({ intensity = 0, active = false }: WarpTunnelProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uIntensity;
        varying vec2 vUv;

        float hash(float n) { return fract(sin(n) * 43758.5453); }

        void main() {
          if (uIntensity < 0.01) {
            gl_FragColor = vec4(0.0);
            return;
          }

          vec2 center = vUv - 0.5;
          float dist = length(center);
          float angle = atan(center.y, center.x);

          // Radial streaks
          float streak = 0.0;
          for (int i = 0; i < 80; i++) {
            float fi = float(i);
            float a = hash(fi) * 6.2831;
            float r = hash(fi + 100.0);
            float streakAngle = abs(mod(angle - a + 3.14159, 6.2831) - 3.14159);
            float streakWidth = 0.003 + 0.002 * hash(fi + 200.0);

            // Streak moves outward over time
            float rPos = fract(r + uTime * (0.3 + 0.3 * hash(fi + 300.0)));
            float rDist = abs(dist - rPos);

            float s = smoothstep(streakWidth, 0.0, streakAngle) * smoothstep(0.1, 0.0, rDist);
            streak += s * (0.5 + 0.5 * hash(fi + 400.0));
          }

          // Color: white to cyan
          vec3 color = mix(vec3(1.0), vec3(0.0, 0.96, 1.0), dist);

          // Central glow
          float glow = exp(-dist * 4.0) * 0.3;

          float alpha = (streak * 0.8 + glow) * uIntensity;
          alpha *= smoothstep(0.5, 0.1, dist); // Fade at edges

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material;
    if (!mat || !(mat as THREE.ShaderMaterial).uniforms) return;
    const uniforms = (mat as THREE.ShaderMaterial).uniforms;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uIntensity.value = THREE.MathUtils.lerp(
      uniforms.uIntensity.value,
      active ? intensity : 0,
      0.05
    );
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} material={shaderMaterial}>
      <planeGeometry args={[20, 20]} />
    </mesh>
  );
}

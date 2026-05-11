"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NebulaProps {
  color1?: string;
  color2?: string;
  opacity?: number;
  position?: [number, number, number];
}

export default function Nebula({
  color1 = "#0a1628",
  color2 = "#1a0a2e",
  opacity = 0.4,
  position = [0, 0, -30],
}: NebulaProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(color1) },
        uColor2: { value: new THREE.Color(color2) },
        uOpacity: { value: opacity },
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
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uOpacity;
        varying vec2 vUv;

        // Simple noise functions
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 5; i++) {
            v += a * noise(p);
            p *= 2.0;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv;

          float n = fbm(uv * 3.0 + uTime * 0.02);
          float n2 = fbm(uv * 2.0 - uTime * 0.015 + 100.0);

          vec3 color = mix(uColor1, uColor2, n);
          color += vec3(0.0, 0.05, 0.1) * n2;

          float alpha = smoothstep(0.2, 0.8, n) * uOpacity;

          // Fade at edges
          float edgeFade = smoothstep(0.0, 0.3, min(uv.x, min(uv.y, min(1.0 - uv.x, 1.0 - uv.y))));
          alpha *= edgeFade;

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [color1, color2, opacity]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material;
    if (!mat || !(mat as THREE.ShaderMaterial).uniforms) return;
    (mat as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={meshRef} position={position} material={shaderMaterial}>
      <planeGeometry args={[80, 80]} />
    </mesh>
  );
}

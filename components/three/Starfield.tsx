"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StarfieldProps {
  count?: number;
  depth?: number;
  scrollProgress?: number;
}

export default function Starfield({
  count = 3000,
  depth = 60,
  scrollProgress = 0,
}: StarfieldProps) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, sizes, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color("#00f5ff");
    const white = new THREE.Color("#ffffff");
    const violet = new THREE.Color("#8b5cf6");
    const amber = new THREE.Color("#f59e0b");

    for (let i = 0; i < count; i++) {
      // Spread stars in a large sphere
      pos[i * 3] = (Math.random() - 0.5) * depth * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * depth * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * depth * 2;

      sz[i] = Math.random() * 2 + 0.5;

      // Color variety
      const r = Math.random();
      let c: THREE.Color;
      if (r < 0.6) c = white;
      else if (r < 0.75) c = cyan;
      else if (r < 0.9) c = violet;
      else c = amber;

      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, sizes: sz, colors: col };
  }, [count, depth]);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: 0 },
        uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
      },
      vertexShader: `
        attribute float aSize;
        attribute vec3 aColor;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uScrollProgress;
        uniform float uPixelRatio;

        void main() {
          vColor = aColor;

          vec3 pos = position;

          // Subtle drift based on scroll
          pos.z += uScrollProgress * 20.0;
          pos.x += sin(uTime * 0.1 + position.y * 0.01) * 0.5;

          // Wrap around
          pos = mod(pos + 60.0, 120.0) - 60.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Size attenuation
          float size = aSize * uPixelRatio * (200.0 / -mvPosition.z);
          gl_PointSize = clamp(size, 0.5, 8.0);

          // Twinkle
          vAlpha = 0.4 + 0.6 * (0.5 + 0.5 * sin(uTime * (1.0 + aSize) + position.x * 10.0));
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          // Soft circular point
          float dist = length(gl_PointCoord - 0.5) * 2.0;
          if (dist > 1.0) discard;

          float alpha = (1.0 - dist * dist) * vAlpha;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uScrollProgress.value = scrollProgress;

    // Slow rotation
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.005;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, sizes, colors]);

  return (
    <points ref={meshRef} geometry={geometry} material={shaderMaterial} />
  );
}

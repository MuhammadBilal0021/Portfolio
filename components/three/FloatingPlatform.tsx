"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingPlatformProps {
  position?: [number, number, number];
  radius?: number;
  color?: string;
}

export default function FloatingPlatform({
  position = [0, -2.5, 0],
  radius = 2.5,
  color = "#00f5ff",
}: FloatingPlatformProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const platformMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a0a1a"),
        metalness: 0.9,
        roughness: 0.3,
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  const edgeMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.6,
      }),
    [color]
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.3,
      }),
    [color]
  );

  // Create hexagonal shape
  const hexShape = useMemo(() => {
    const shape = new THREE.Shape();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }, [radius]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main hex platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={platformMaterial}>
        <extrudeGeometry
          args={[hexShape, { depth: 0.08, bevelEnabled: false }]}
        />
      </mesh>

      {/* Edge glow */}
      <lineSegments rotation={[-Math.PI / 2, 0, 0]} material={edgeMaterial}>
        <edgesGeometry
          args={[
            new THREE.ExtrudeGeometry(hexShape, {
              depth: 0.08,
              bevelEnabled: false,
            }),
          ]}
        />
      </lineSegments>

      {/* Orbital ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} material={glowMaterial}>
        <torusGeometry args={[radius + 0.5, 0.01, 8, 64]} />
      </mesh>

      {/* Center glow light */}
      <pointLight
        position={[0, 0.3, 0]}
        color={color}
        intensity={0.3}
        distance={5}
      />
    </group>
  );
}

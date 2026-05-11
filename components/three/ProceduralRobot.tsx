"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ProceduralRobotProps {
  position?: [number, number, number];
  scale?: number;
  mousePosition?: { x: number; y: number };
  animationState?: "idle" | "wave" | "point";
}

export default function ProceduralRobot({
  position = [0, 0, 0],
  scale = 1,
  mousePosition = { x: 0, y: 0 },
  animationState = "idle",
}: ProceduralRobotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const visorRef = useRef<THREE.Mesh>(null);

  // Emissive cyan material for edge glow
  const edgeMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#00f5ff"),
        linewidth: 1,
      }),
    []
  );

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a2e"),
        metalness: 0.8,
        roughness: 0.3,
        emissive: new THREE.Color("#00f5ff"),
        emissiveIntensity: 0.02,
      }),
    []
  );

  const jointMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#111122"),
        metalness: 0.9,
        roughness: 0.2,
        emissive: new THREE.Color("#00f5ff"),
        emissiveIntensity: 0.05,
      }),
    []
  );

  const visorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00f5ff"),
        emissive: new THREE.Color("#00f5ff"),
        emissiveIntensity: 1.5,
        metalness: 0.1,
        roughness: 0.1,
        transparent: true,
        opacity: 0.85,
      }),
    []
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00f5ff"),
        emissive: new THREE.Color("#00f5ff"),
        emissiveIntensity: 0.8,
        metalness: 0.5,
        roughness: 0.2,
      }),
    []
  );

  // Animation targets
  const waveTarget = useRef(0);
  const pointTarget = useRef(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Idle floating bob
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
    }

    // Head tracking mouse
    if (headRef.current) {
      const targetRotX = -mousePosition.y * 0.3;
      const targetRotY = mousePosition.x * 0.4;
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotX,
        0.05
      );
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotY,
        0.05
      );
    }

    // Visor glow pulse
    if (visorRef.current) {
      const mat = visorRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.2 + Math.sin(t * 2) * 0.3;
    }

    // Wave animation blending
    const waveGoal = animationState === "wave" ? 1 : 0;
    waveTarget.current = THREE.MathUtils.lerp(waveTarget.current, waveGoal, 0.03);

    // Point animation blending
    const pointGoal = animationState === "point" ? 1 : 0;
    pointTarget.current = THREE.MathUtils.lerp(pointTarget.current, pointGoal, 0.03);

    // Right arm animation
    if (rightArmRef.current) {
      const idleSwing = Math.sin(t * 0.7 + 0.5) * 0.1;
      const waveRot = waveTarget.current * -2.2;
      const pointRot = pointTarget.current * -1.2;
      rightArmRef.current.rotation.z = idleSwing + waveRot + pointRot;
      rightArmRef.current.rotation.x = pointTarget.current * -0.5;
    }

    // Left arm idle swing
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(t * 0.7) * 0.1;
    }

    // Legs gentle sway
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;
    }
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(t * 0.5 + Math.PI) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* === HEAD === */}
      <group ref={headRef} position={[0, 1.35, 0]}>
        {/* Main head */}
        <mesh material={bodyMaterial}>
          <boxGeometry args={[0.7, 0.65, 0.65]} />
        </mesh>
        {/* Head edges */}
        <lineSegments material={edgeMaterial}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.7, 0.65, 0.65)]} />
        </lineSegments>

        {/* Visor */}
        <mesh ref={visorRef} position={[0, 0.02, 0.28]} material={visorMaterial}>
          <boxGeometry args={[0.52, 0.18, 0.12]} />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.42, 0]} material={accentMaterial}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        </mesh>
        <mesh position={[0, 0.55, 0]} material={accentMaterial}>
          <sphereGeometry args={[0.04, 8, 8]} />
        </mesh>

        {/* Ear panels */}
        <mesh position={[0.4, 0, 0]} material={jointMaterial}>
          <boxGeometry args={[0.08, 0.3, 0.3]} />
        </mesh>
        <mesh position={[-0.4, 0, 0]} material={jointMaterial}>
          <boxGeometry args={[0.08, 0.3, 0.3]} />
        </mesh>
      </group>

      {/* === NECK === */}
      <mesh position={[0, 0.95, 0]} material={jointMaterial}>
        <cylinderGeometry args={[0.12, 0.15, 0.15, 8]} />
      </mesh>

      {/* === TORSO === */}
      <mesh material={bodyMaterial}>
        <boxGeometry args={[0.9, 1.1, 0.5]} />
      </mesh>
      <lineSegments material={edgeMaterial}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.9, 1.1, 0.5)]} />
      </lineSegments>

      {/* Chest panel */}
      <mesh position={[0, 0.15, 0.26]} material={accentMaterial}>
        <boxGeometry args={[0.35, 0.35, 0.02]} />
      </mesh>

      {/* Core reactor light */}
      <mesh position={[0, -0.1, 0.26]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* === RIGHT ARM === */}
      <group ref={rightArmRef} position={[0.6, 0.35, 0]}>
        {/* Shoulder joint */}
        <mesh material={jointMaterial}>
          <sphereGeometry args={[0.12, 8, 8]} />
        </mesh>
        {/* Upper arm */}
        <mesh position={[0.15, -0.3, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.18, 0.5, 0.18]} />
        </mesh>
        <lineSegments position={[0.15, -0.3, 0]} material={edgeMaterial}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.18, 0.5, 0.18)]} />
        </lineSegments>
        {/* Elbow */}
        <mesh position={[0.15, -0.6, 0]} material={jointMaterial}>
          <sphereGeometry args={[0.09, 8, 8]} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0.15, -0.85, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.15, 0.4, 0.15]} />
        </mesh>
        <lineSegments position={[0.15, -0.85, 0]} material={edgeMaterial}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.15, 0.4, 0.15)]} />
        </lineSegments>
        {/* Hand */}
        <mesh position={[0.15, -1.1, 0]} material={accentMaterial}>
          <boxGeometry args={[0.12, 0.12, 0.08]} />
        </mesh>
      </group>

      {/* === LEFT ARM === */}
      <group ref={leftArmRef} position={[-0.6, 0.35, 0]}>
        <mesh material={jointMaterial}>
          <sphereGeometry args={[0.12, 8, 8]} />
        </mesh>
        <mesh position={[-0.15, -0.3, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.18, 0.5, 0.18]} />
        </mesh>
        <lineSegments position={[-0.15, -0.3, 0]} material={edgeMaterial}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.18, 0.5, 0.18)]} />
        </lineSegments>
        <mesh position={[-0.15, -0.6, 0]} material={jointMaterial}>
          <sphereGeometry args={[0.09, 8, 8]} />
        </mesh>
        <mesh position={[-0.15, -0.85, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.15, 0.4, 0.15]} />
        </mesh>
        <lineSegments position={[-0.15, -0.85, 0]} material={edgeMaterial}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.15, 0.4, 0.15)]} />
        </lineSegments>
        <mesh position={[-0.15, -1.1, 0]} material={accentMaterial}>
          <boxGeometry args={[0.12, 0.12, 0.08]} />
        </mesh>
      </group>

      {/* === WAIST === */}
      <mesh position={[0, -0.65, 0]} material={jointMaterial}>
        <boxGeometry args={[0.6, 0.15, 0.35]} />
      </mesh>

      {/* === RIGHT LEG === */}
      <group ref={rightLegRef} position={[0.22, -0.85, 0]}>
        <mesh material={jointMaterial}>
          <sphereGeometry args={[0.1, 8, 8]} />
        </mesh>
        <mesh position={[0, -0.35, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.2, 0.55, 0.2]} />
        </mesh>
        <lineSegments position={[0, -0.35, 0]} material={edgeMaterial}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.2, 0.55, 0.2)]} />
        </lineSegments>
        <mesh position={[0, -0.65, 0]} material={jointMaterial}>
          <sphereGeometry args={[0.09, 8, 8]} />
        </mesh>
        <mesh position={[0, -0.9, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.18, 0.45, 0.18]} />
        </mesh>
        <lineSegments position={[0, -0.9, 0]} material={edgeMaterial}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.18, 0.45, 0.18)]} />
        </lineSegments>
        {/* Foot */}
        <mesh position={[0, -1.18, 0.05]} material={accentMaterial}>
          <boxGeometry args={[0.22, 0.08, 0.3]} />
        </mesh>
      </group>

      {/* === LEFT LEG === */}
      <group ref={leftLegRef} position={[-0.22, -0.85, 0]}>
        <mesh material={jointMaterial}>
          <sphereGeometry args={[0.1, 8, 8]} />
        </mesh>
        <mesh position={[0, -0.35, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.2, 0.55, 0.2]} />
        </mesh>
        <lineSegments position={[0, -0.35, 0]} material={edgeMaterial}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.2, 0.55, 0.2)]} />
        </lineSegments>
        <mesh position={[0, -0.65, 0]} material={jointMaterial}>
          <sphereGeometry args={[0.09, 8, 8]} />
        </mesh>
        <mesh position={[0, -0.9, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.18, 0.45, 0.18]} />
        </mesh>
        <lineSegments position={[0, -0.9, 0]} material={edgeMaterial}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.18, 0.45, 0.18)]} />
        </lineSegments>
        <mesh position={[0, -1.18, 0.05]} material={accentMaterial}>
          <boxGeometry args={[0.22, 0.08, 0.3]} />
        </mesh>
      </group>

      {/* Point light for glow */}
      <pointLight
        position={[0, 0, 1]}
        color="#00f5ff"
        intensity={0.5}
        distance={3}
      />
    </group>
  );
}

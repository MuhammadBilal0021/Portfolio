"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import Starfield from "./Starfield";
import Nebula from "./Nebula";
import WarpTunnel from "./WarpTunnel";
import ProceduralRobot from "./ProceduralRobot";
import FloatingPlatform from "./FloatingPlatform";
import { useScrollProgress } from "@/lib/useScrollProgress";

function CameraController({ z }: { z: number }) {
  useFrame((state) => {
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, z, 0.02);
  });
  return null;
}

function Scene() {
  const { progress, getActProgress } = useScrollProgress();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const warpProgress = getActProgress(5, 15);
  const heroProgress = getActProgress(15, 25);
  const projectProgress = getActProgress(25, 50);
  const skillsProgress = getActProgress(50, 70);
  const aboutProgress = getActProgress(70, 85);
  const contactProgress = getActProgress(85, 100);

  const cameraZ = 20 - progress * 5;

  const robotX = skillsProgress > 0.1 && skillsProgress < 0.9
    ? -3
    : aboutProgress > 0.1 && aboutProgress < 0.9
    ? 2.5
    : contactProgress > 0.3
    ? 0
    : heroProgress > 0.1
    ? -2.5
    : 0;

  const robotY = heroProgress > 0 ? -0.5 : 0;
  const robotScale = 0.8 + Math.min(heroProgress, 1) * 0.4;

  const robotAnim: "idle" | "wave" | "point" =
    contactProgress > 0.3 ? "wave" : heroProgress > 0.8 ? "point" : "idle";

  const nebulaColor1 = projectProgress > 0.3 ? "#0a1a30" : aboutProgress > 0.3 ? "#1a1408" : "#0a0a1e";
  const nebulaColor2 = projectProgress > 0.3 ? "#0a0a28" : aboutProgress > 0.3 ? "#1a0a08" : "#1a0a2e";
  const nebulaOpacity = 0.15 + progress * 0.3;
  const showPlatform = heroProgress > 0.3 && contactProgress < 0.5;

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#e8e8ff" />
      <pointLight position={[-5, 3, -5]} intensity={0.2} color="#8b5cf6" />

      <Starfield count={2500} depth={50} scrollProgress={progress} />
      <Nebula color1={nebulaColor1} color2={nebulaColor2} opacity={nebulaOpacity} position={[0, 0, -35]} />
      <WarpTunnel intensity={warpProgress} active={warpProgress > 0 && warpProgress < 1} />

      {showPlatform && <FloatingPlatform position={[robotX, robotY - 2, 0]} />}

      <ProceduralRobot position={[robotX, robotY, 0]} scale={robotScale} mousePosition={mousePos} animationState={robotAnim} />

      <CameraController z={cameraZ} />
    </>
  );
}

export default function SpaceCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="canvas-container">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ fov: 60, near: 0.1, far: 200, position: [0, 0, 20] }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

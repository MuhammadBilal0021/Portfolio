"use client";
import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Act1Boot from "@/components/acts/Act1Boot";

const ImmersiveExperience = dynamic(
  () => import("@/components/three/ImmersiveExperience"),
  { ssr: false }
);

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="noise-overlay" />
      {!booted && <Act1Boot onComplete={() => setBooted(true)} />}
      {booted && (
        <Suspense fallback={
          <div style={{ position: "fixed", inset: 0, background: "#03030a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="boot-text">LOADING ENVIRONMENT...</div>
          </div>
        }>
          <ImmersiveExperience />
        </Suspense>
      )}
    </>
  );
}

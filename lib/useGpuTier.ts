"use client";
import { useState, useEffect } from "react";

export type GpuTier = "low" | "mid" | "high";

export function useGpuTier(): GpuTier {
  const [tier, setTier] = useState<GpuTier>("mid");

  useEffect(() => {
    let cancelled = false;

    async function detect() {
      try {
        const { getGPUTier } = await import("detect-gpu");
        const result = await getGPUTier();

        if (cancelled) return;

        if (result.tier <= 1) {
          setTier("low");
        } else if (result.tier === 2) {
          setTier("mid");
        } else {
          setTier("high");
        }
      } catch {
        // If detection fails, default to mid
        if (!cancelled) setTier("mid");
      }
    }

    detect();
    return () => { cancelled = true; };
  }, []);

  return tier;
}

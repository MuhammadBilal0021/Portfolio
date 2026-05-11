"use client";
import { useState, useEffect, useCallback } from "react";

interface ScrollProgress {
  /** Overall progress 0-1 */
  progress: number;
  /** Get progress within a specific act (returns 0-1 clamped) */
  getActProgress: (startPercent: number, endPercent: number) => number;
  /** Whether user has scrolled past a percentage */
  isPast: (percent: number) => boolean;
  /** Raw scroll Y */
  scrollY: number;
}

export function useScrollProgress(): ScrollProgress {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(p);
      setScrollY(scrollTop);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getActProgress = useCallback(
    (startPercent: number, endPercent: number) => {
      const start = startPercent / 100;
      const end = endPercent / 100;
      if (progress < start) return 0;
      if (progress > end) return 1;
      return (progress - start) / (end - start);
    },
    [progress]
  );

  const isPast = useCallback(
    (percent: number) => progress >= percent / 100,
    [progress]
  );

  return { progress, getActProgress, isPast, scrollY };
}

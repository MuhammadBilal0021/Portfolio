"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Act1BootProps {
  onComplete: () => void;
}

const bootLines = [
  "INITIALIZING NEURAL CORE...",
  "LOADING AI MODULES...",
  "CALIBRATING SENSORS...",
  "ESTABLISHING UPLINK...",
  "SYSTEM ONLINE // BILAL.EXE INITIALIZED",
];

export default function Act1Boot({ onComplete }: Act1BootProps) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for boot lines
  useEffect(() => {
    if (currentLine >= bootLines.length) return;

    const line = bootLines[currentLine];
    let charIdx = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      charIdx++;
      setDisplayedText(line.slice(0, charIdx));
      if (charIdx >= line.length) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentLine((l) => l + 1);
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [currentLine]);

  // Fade out when complete
  useEffect(() => {
    if (progress >= 100 && currentLine >= bootLines.length) {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 800);
      }, 500);
    }
  }, [progress, currentLine, onComplete]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!fadeOut ? (
        <motion.div
          className="boot-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Scanlines */}
          <div className="scanline" style={{ animationDelay: "0s" }} />
          <div className="scanline" style={{ animationDelay: "1s" }} />
          <div className="scanline" style={{ animationDelay: "2s" }} />

          {/* Grid background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
          />

          {/* Boot content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              zIndex: 2,
            }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--cyan)",
                letterSpacing: "0.1em",
                marginBottom: "16px",
              }}
            >
              BILAL<span style={{ opacity: 0.4 }}>.WORKS</span>
            </motion.div>

            {/* Previous completed lines */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--text-quaternary)",
                textAlign: "left",
                minHeight: "120px",
                width: "340px",
              }}
            >
              {bootLines.slice(0, currentLine).map((line, i) => (
                <div key={i} style={{ marginBottom: "4px" }}>
                  <span style={{ color: "var(--emerald)", marginRight: "8px" }}>
                    ✓
                  </span>
                  {line}
                </div>
              ))}
              {currentLine < bootLines.length && (
                <div>
                  <span
                    style={{ color: "var(--accent)", marginRight: "8px" }}
                  >
                    ▸
                  </span>
                  <span className="boot-text" style={{ fontSize: "12px" }}>
                    {displayedText}
                  </span>
                  <span
                    style={{
                      color: "var(--accent)",
                      animation: "typewriter-blink 0.8s infinite",
                    }}
                  >
                    █
                  </span>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="boot-progress">
              <div
                className="boot-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-quaternary)",
                letterSpacing: "0.15em",
              }}
            >
              {progress}%
            </div>
          </div>

          {/* Corner brackets */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              width: "30px",
              height: "30px",
              borderTop: "1px solid rgba(0, 212, 255, 0.3)",
              borderLeft: "1px solid rgba(0, 212, 255, 0.3)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "30px",
              height: "30px",
              borderTop: "1px solid rgba(0, 212, 255, 0.3)",
              borderRight: "1px solid rgba(0, 212, 255, 0.3)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              width: "30px",
              height: "30px",
              borderBottom: "1px solid rgba(0, 212, 255, 0.3)",
              borderLeft: "1px solid rgba(0, 212, 255, 0.3)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              width: "30px",
              height: "30px",
              borderBottom: "1px solid rgba(0, 212, 255, 0.3)",
              borderRight: "1px solid rgba(0, 212, 255, 0.3)",
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          className="boot-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      )}
    </AnimatePresence>
  );
}

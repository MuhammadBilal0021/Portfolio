"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollProgress } from "@/lib/useScrollProgress";

const links = [
  { label: "HERO", href: "#hero" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export default function HudNav() {
  const { progress } = useScrollProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const visible = progress > 0.05;

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: "12px", left: "50%", transform: "translateX(-50%)",
          width: "min(92%, 900px)", zIndex: 100, padding: "0 20px", height: "48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(3,3,10,0.7)", backdropFilter: "blur(20px) saturate(1.5)",
          WebkitBackdropFilter: "blur(20px) saturate(1.5)",
          border: "1px solid var(--border-subtle)", borderRadius: "6px",
        }}
      >
        <a href="#hero" style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700, color: "var(--cyan)", textDecoration: "none", letterSpacing: "0.05em" }}>
          BILAL<span style={{ opacity: 0.4 }}>.WORKS</span>
        </a>

        <nav className="desktop-only" style={{ display: "flex", gap: "2px" }}>
          {links.map((link) => (
            <a key={link.label} href={link.href} style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500, color: "var(--text-tertiary)", textDecoration: "none", padding: "6px 12px", borderRadius: "4px", letterSpacing: "0.08em", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--cyan)"; e.currentTarget.style.background = "var(--cyan-glow)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; e.currentTarget.style.background = "transparent"; }}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn-primary desktop-only" style={{ padding: "6px 16px", fontSize: "11px", borderRadius: "4px" }}>UPLINK</a>

        <button className="mobile-only" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu" style={{ background: "none", border: "none", cursor: "pointer", width: "28px", height: "28px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "5px" }}>
          <motion.span animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} style={{ width: "18px", height: "1.5px", background: "var(--cyan)", display: "block" }} />
          <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} style={{ width: "18px", height: "1.5px", background: "var(--cyan)", display: "block" }} />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} style={{ width: "18px", height: "1.5px", background: "var(--cyan)", display: "block" }} />
        </button>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(3,3,10,0.97)", backdropFilter: "blur(40px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            {links.map((link, i) => (
              <motion.a key={link.label} href={link.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i }} onClick={() => setMobileOpen(false)} style={{ fontSize: "24px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--text-secondary)", textDecoration: "none", letterSpacing: "0.1em", padding: "8px 24px" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}>
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress indicator */}
      <div style={{ position: "fixed", top: 0, left: 0, width: `${progress * 100}%`, height: "2px", background: "linear-gradient(90deg, var(--cyan), var(--violet))", zIndex: 101, transition: "width 0.1s linear", boxShadow: "0 0 8px var(--cyan-glow)" }} />
    </>
  );
}

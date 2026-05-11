"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com/MuhammadBilal0021", icon: "GH" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-bilal0021/", icon: "LI" },
  { label: "Phone", href: "tel:+923255185049", icon: "PH" },
];

export default function Act7Contact() {
  const [copied, setCopied] = useState(false);
  const email = "muhammadbilal759021@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" style={{ minHeight: "100vh", padding: "var(--section-padding)", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
      <div style={{ position: "absolute", bottom: "-200px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(0,245,255,0.04) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-overline" style={{ justifyContent: "center" }}>CONTACT BEAM</div>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "20px" }}>
          Let&apos;s build <span className="font-display" style={{ fontStyle: "italic" }}><span className="text-gradient-cyan">something</span></span><br />together.
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ color: "var(--text-tertiary)", fontSize: "16px", lineHeight: 1.7, maxWidth: "460px", margin: "0 auto 36px" }}>
          Got an AI agent, automation, or ML project? I&apos;m always open to interesting problems.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          <motion.button onClick={copyEmail} className="font-mono" style={{ fontSize: "14px", fontWeight: 500, padding: "16px 36px", background: copied ? "var(--cyan)" : "transparent", border: "1px solid var(--cyan)", color: copied ? "var(--space)" : "var(--cyan)", borderRadius: "4px", cursor: "pointer", letterSpacing: "0.02em", transition: "all 0.4s ease", display: "block", margin: "0 auto 24px" }} whileHover={{ boxShadow: "0 0 30px rgba(0,245,255,0.2)" }} whileTap={{ scale: 0.97 }}>
            {copied ? "✓ COPIED TO CLIPBOARD" : email}
          </motion.button>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-tertiary)", marginBottom: "48px" }}>+92 325 5185049</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "72px" }}>
          {socials.map(({ label, href, icon }) => (
            <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} style={{ width: "44px", height: "44px", borderRadius: "4px", border: "1px solid var(--border-default)", background: "rgba(3,3,10,0.6)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-tertiary)", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em" }} whileHover={{ borderColor: "var(--cyan)", color: "var(--cyan)", boxShadow: "0 0 15px var(--cyan-glow)" }}>
              {icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} style={{ paddingTop: "24px", borderTop: "1px solid var(--border-subtle)" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-quaternary)", lineHeight: 1.8, marginBottom: "16px" }}>
            Designed & built by Muhammad Bilal<br />
            <span style={{ opacity: 0.6 }}>Next.js · Three.js · GSAP · Framer Motion</span>
          </p>
          <div className="transmission-text">TRANSMISSION COMPLETE</div>
        </motion.div>
      </div>
    </section>
  );
}

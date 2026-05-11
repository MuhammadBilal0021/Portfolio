"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "AI Automation Engineer",
  "RAG & LLM Specialist",
  "NLP Pipeline Builder",
  "Python Developer",
];

const floatingChips = [
  "RAG", "LangGraph", "FastAPI", "LangChain",
  "FAISS", "Groq", "OpenAI", "Python",
];

export default function Act3Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "var(--section-padding)", position: "relative" }}>
      <div style={{ maxWidth: "800px", position: "relative", zIndex: 2 }}>
        {/* Status badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="status-badge" style={{ marginBottom: "32px" }}>
            <span className="status-dot" />
            <span>AVAILABLE FOR WORK</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.4 }} style={{ fontSize: "clamp(48px, 10vw, 110px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: "16px" }}>
          <span className="font-display" style={{ fontStyle: "italic", fontWeight: 900, display: "block" }}>
            <span className="text-gradient-cyan">Muhammad</span>
          </span>
          <span className="font-display" style={{ fontStyle: "italic", fontWeight: 900, display: "block", color: "var(--text-primary)" }}>Bilal</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }} style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(14px, 1.8vw, 18px)", color: "var(--cyan)", marginBottom: "24px", minHeight: "28px", letterSpacing: "0.05em" }}>
          {">"} {displayed}
          <span style={{ color: "var(--cyan)", animation: "typewriter-blink 0.8s infinite", marginLeft: "2px" }}>█</span>
        </motion.div>

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.8 }} style={{ fontSize: "clamp(15px, 1.6vw, 18px)", color: "var(--text-tertiary)", maxWidth: "520px", lineHeight: 1.7, marginBottom: "36px" }}>
          I design and build production-grade AI automation systems, RAG pipelines, and LLM-powered agents that reduce manual workload at scale.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 1 }} style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="#projects" className="btn-primary">
            VIEW PROJECTS
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a href="#contact" className="btn-secondary">GET IN TOUCH</a>
        </motion.div>

        {/* Floating code chips */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1.2 }} style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "48px", maxWidth: "400px" }}>
          {floatingChips.map((chip, i) => (
            <motion.span key={chip} className="chip" animate={{ y: [0, -4, 0] }} transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}>
              {chip}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

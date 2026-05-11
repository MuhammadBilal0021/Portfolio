"use client";
import { motion } from "framer-motion";

const highlights = [
  { icon: "◈", title: "RAG & LLM Systems", desc: "Production-ready retrieval-augmented generation agents with secure embedding pipelines", color: "var(--cyan)" },
  { icon: "⚡", title: "AI Automation", desc: "End-to-end NLP automation pipelines that eliminate manual text-processing tasks at scale", color: "var(--amber)" },
  { icon: "◇", title: "API Integration", desc: "RESTful API design, multi-platform data connectors, JSON transformation pipelines", color: "var(--violet)" },
  { icon: "◎", title: "Agentic AI Workflows", desc: "LangGraph state machines and LangChain tool-calling agents for autonomous reasoning", color: "var(--emerald)" },
];

const configEntries = [
  { key: "name", val: '"Muhammad Bilal"' },
  { key: "role", val: '"AI Automation Engineer"' },
  { key: "education", val: '"BS Software Engineering — SZABIST"' },
  { key: "location", val: '"Islamabad, Pakistan"' },
];

export default function Act6About() {
  return (
    <section id="about" style={{ minHeight: "100vh", padding: "var(--section-padding)" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-overline">ABOUT TRANSMISSION</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "48px" }}>
            I don&apos;t just write code.<br />
            <span className="font-display" style={{ fontStyle: "italic" }}>I <span className="text-gradient-amber">ship automation</span>.</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "clamp(32px, 5vw, 60px)", alignItems: "start", marginBottom: "48px" }}>
          <div>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ color: "var(--text-tertiary)", fontSize: "15px", lineHeight: 1.8, marginBottom: "16px" }}>
              I&apos;m Muhammad Bilal — an AI Automation Engineer and Software Engineering graduate from SZABIST Islamabad. I specialize in designing intelligent automation systems, building production-grade Python applications, and integrating multi-platform APIs.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ color: "var(--text-tertiary)", fontSize: "15px", lineHeight: 1.8, marginBottom: "24px" }}>
              From RAG-powered document Q&A agents to AutoML platforms with LLM decision layers — I translate complex business requirements into clean, modular automation logic that ships and scales.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} style={{ padding: "16px 20px", borderRadius: "8px", border: "1px solid rgba(245,158,11,0.2)", background: "rgba(245,158,11,0.04)", display: "inline-flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--amber-dim)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--amber)" }}>◈</div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2px" }}>NLP Automation Engineer</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-quaternary)" }}>INVOGUE Solutions · Islamabad · 2024</div>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="terminal-card">
            <div className="terminal-header">
              <span className="terminal-dot" style={{ background: "var(--rose)" }} />
              <span className="terminal-dot" style={{ background: "var(--amber)" }} />
              <span className="terminal-dot" style={{ background: "var(--emerald)" }} />
              <span style={{ color: "var(--text-quaternary)", fontSize: "11px", marginLeft: "8px" }}>bilal.config</span>
            </div>
            <div style={{ lineHeight: 2.2 }}>
              <span style={{ color: "var(--text-quaternary)" }}>{"{"}</span><br />
              {configEntries.map(({ key, val }) => (
                <div key={key} style={{ paddingLeft: "20px" }}>
                  <span style={{ color: "var(--cyan)" }}>&quot;{key}&quot;</span>
                  <span style={{ color: "var(--text-quaternary)" }}>: </span>
                  <span style={{ color: "var(--emerald)" }}>{val}</span>
                  <span style={{ color: "var(--text-quaternary)" }}>,</span>
                </div>
              ))}
              <div style={{ paddingLeft: "20px" }}>
                <span style={{ color: "var(--cyan)" }}>&quot;stack&quot;</span>
                <span style={{ color: "var(--text-quaternary)" }}>: </span>
                <span style={{ color: "var(--violet)" }}>[&quot;RAG&quot;, &quot;LLM Agents&quot;, &quot;NLP&quot;, &quot;APIs&quot;]</span>
                <span style={{ color: "var(--text-quaternary)" }}>,</span>
              </div>
              <div style={{ paddingLeft: "20px" }}>
                <span style={{ color: "var(--cyan)" }}>&quot;available&quot;</span>
                <span style={{ color: "var(--text-quaternary)" }}>: </span>
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ color: "var(--emerald)" }}>true</motion.span>
              </div>
              <span style={{ color: "var(--text-quaternary)" }}>{"}"}</span>
            </div>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "16px" }}>
          {highlights.map((h, i) => (
            <motion.div key={h.title} className="hud-panel" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -3 }} style={{ padding: "clamp(20px, 2.5vw, 28px)", cursor: "default" }}>
              <div style={{ fontSize: "20px", marginBottom: "12px", color: h.color }}>{h.icon}</div>
              <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>{h.title}</h4>
              <p style={{ color: "var(--text-tertiary)", fontSize: "13px", lineHeight: 1.6 }}>{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

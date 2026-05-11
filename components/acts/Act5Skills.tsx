"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    category: "AI & AGENTS", color: "var(--amber)", colorRaw: "#f59e0b", panelClass: "hud-panel-amber",
    skills: [
      { name: "LangChain & LangGraph", level: 90 },
      { name: "RAG Pipelines", level: 85 },
      { name: "Groq (Llama 3) & OpenAI", level: 90 },
      { name: "Sentence Transformers", level: 80 },
    ],
  },
  {
    category: "SOFTWARE & DATA", color: "var(--violet)", colorRaw: "#8b5cf6", panelClass: "hud-panel-violet",
    skills: [
      { name: "Python (OOP, Modular)", level: 95 },
      { name: "RESTful APIs", level: 90 },
      { name: "Scikit-learn & XGBoost", level: 85 },
      { name: "SQL & Data Modeling", level: 85 },
    ],
  },
  {
    category: "BACKEND & DEPLOY", color: "var(--emerald)", colorRaw: "#10b981", panelClass: "hud-panel-emerald",
    skills: [
      { name: "FastAPI", level: 90 },
      { name: "Streamlit", level: 85 },
      { name: "Flask & Jinja2", level: 80 },
      { name: "FAISS & ChromaDB", level: 85 },
    ],
  },
];

const tools = [
  "Git", "GitHub", "Docker", "Firebase", "Amazon SP-API",
  "JSON", "Next.js", "TypeScript", "Yagmail", "Jupyter", "VS Code",
  "Postman", "Linux", "REST", "GraphQL",
];

function SkillBar({ level, color, delay }: { level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="skill-bar-track">
      <motion.div className="skill-bar-fill" initial={{ width: 0 }} animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: `linear-gradient(90deg, ${color}, ${color}88)`, color }} />
    </div>
  );
}

export default function Act5Skills() {
  return (
    <section id="skills" style={{ minHeight: "100vh", padding: "var(--section-padding)" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-overline">HUD SKILLS STATION</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "48px" }}>
            My <span className="font-display" style={{ fontStyle: "italic" }}><span className="text-gradient-cyan">toolkit</span></span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "20px", marginBottom: "32px" }}>
          {skillGroups.map((group, gi) => (
            <motion.div key={group.category} className={`hud-panel ${group.panelClass}`}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.15 }}
              style={{ padding: "clamp(24px, 3vw, 32px)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: group.color, boxShadow: `0 0 8px ${group.colorRaw}` }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, color: group.color, letterSpacing: "0.12em" }}>{group.category}</span>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-quaternary)", letterSpacing: "0.1em" }}>HUD-{String(gi + 1).padStart(2, "0")}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)" }}>{skill.name}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: group.color }}>{skill.level}%</span>
                    </div>
                    <SkillBar level={skill.level} color={group.colorRaw} delay={si * 0.1 + gi * 0.2} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="hud-panel" style={{ padding: "20px 0", overflow: "hidden" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 500, color: "var(--text-quaternary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px", paddingLeft: "clamp(20px, 3vw, 32px)" }}>ALSO EXPERIENCED WITH</div>
          <div className="marquee-container">
            <div className="marquee-track">
              {[...tools, ...tools, ...tools].map((t, i) => (<span key={`${t}-${i}`} className="chip">{t}</span>))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

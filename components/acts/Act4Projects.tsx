"use client";
import { motion } from "framer-motion";

const projects = [
  {
    id: "01", title: "Secure RAG AI Agent",
    description: "Production-ready Retrieval-Augmented Generation agent — users upload documents (PDF, TXT), ask natural language questions, and get source-grounded answers. Secure embedding pipeline with FAISS/ChromaDB vector store.",
    tags: ["LangChain", "FAISS", "ChromaDB", "OpenAI", "Groq", "FastAPI"],
    accent: "var(--emerald)", github: "https://github.com/MuhammadBilal0021/rag-document-assistan",
  },
  {
    id: "02", title: "AutoML & Agentic LLM Platform",
    description: "RESTful API platform for end-to-end ML automation: dataset upload → preprocessing → model training → evaluation → prediction. Integrated Llama 3.3 70B as an agentic decision layer. Churn AUC 0.94, Sentiment F1 0.89.",
    tags: ["FastAPI", "Streamlit", "Scikit-learn", "XGBoost", "Groq"],
    accent: "var(--amber)", github: "https://github.com/MuhammadBilal0021/AUTO_ml_eda",
  },
  {
    id: "03", title: "AI Conversational Data Agent",
    description: "LLM-powered agentic system using LangGraph state machines that translates natural language queries into SQL, executes them against structured databases, and returns summarized insights.",
    tags: ["LangGraph", "LangChain", "SQL", "Python"],
    accent: "var(--violet)", github: "https://github.com/MuhammadBilal0021/leadflow-ai",
  },
  {
    id: "04", title: "HealthTailor — Full-Stack AI App",
    description: "Full-stack web application with Flask backend, Gemini API for AI-personalized health recommendations, Firebase Realtime Database, session auth, and automated email workflows. Distinction-level evaluation.",
    tags: ["Flask", "Firebase", "Gemini API", "Jinja2", "REST APIs"],
    accent: "var(--emerald)", github: "https://github.com/MuhammadBilal0021/constructguard-ai",
  },
];

export default function Act4Projects() {
  return (
    <section id="projects" style={{ minHeight: "100vh", padding: "var(--section-padding)", position: "relative" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-overline">PROJECT SATELLITES</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "48px" }}>
            Things I&apos;ve <span className="font-display" style={{ fontStyle: "italic" }}><span className="text-gradient-cyan">shipped</span></span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))", gap: "20px" }}>
          {projects.map((p, i) => (
            <motion.div key={p.id} className="hud-panel" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4, borderColor: "var(--border-strong)" }}
              style={{ padding: "clamp(24px, 3vw, 36px)", cursor: "default" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.accent, boxShadow: `0 0 12px ${p.accent}` }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-quaternary)", letterSpacing: "0.15em" }}>SAT-{p.id}</span>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", padding: "3px 10px", borderRadius: "3px", background: "var(--emerald-dim)", color: "var(--emerald)", letterSpacing: "0.1em" }}>● DEPLOYED</span>
              </div>

              <h3 style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: "12px" }}>{p.title}</h3>
              <p style={{ color: "var(--text-tertiary)", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>{p.description}</p>

              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
                {p.tags.map((t) => (<span key={t} className="chip">{t}</span>))}
              </div>

              <a href={p.github} target="_blank" rel="noreferrer" className="btn-ghost">
                GitHub <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

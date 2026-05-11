"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, useScroll, Html, Scroll } from "@react-three/drei";
import { useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import Starfield from "./Starfield";
import ProceduralRobot from "./ProceduralRobot";
import { Phone, ExternalLink, ClipboardCheck, Clipboard, Briefcase, Clock, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const STATIONS = [
  { id: 0, name: "Hero", x: 0, z: 0 },
  { id: 1, name: "Projects", x: -20, z: -35 },
  { id: 2, name: "Skills", x: 20, z: -70 },
  { id: 3, name: "About", x: -20, z: -105 },
  { id: 4, name: "Contact", x: 0, z: -140 },
];

const KEYFRAMES = [
  { scroll: 0.00, idx: 0.0 },
  { scroll: 0.10, idx: 0.0 },
  { scroll: 0.20, idx: 1.0 },
  { scroll: 0.35, idx: 1.0 },
  { scroll: 0.45, idx: 2.0 },
  { scroll: 0.60, idx: 2.0 },
  { scroll: 0.70, idx: 3.0 },
  { scroll: 0.85, idx: 3.0 },
  { scroll: 0.95, idx: 4.0 },
  { scroll: 1.00, idx: 4.0 },
];

function getInterpolatedStation(scrollOffset: number): number {
  if (scrollOffset <= KEYFRAMES[0].scroll) return KEYFRAMES[0].idx;
  if (scrollOffset >= KEYFRAMES[KEYFRAMES.length - 1].scroll) return KEYFRAMES[KEYFRAMES.length - 1].idx;
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const start = KEYFRAMES[i];
    const end = KEYFRAMES[i + 1];
    if (scrollOffset >= start.scroll && scrollOffset <= end.scroll) {
      const t = (scrollOffset - start.scroll) / (end.scroll - start.scroll);
      const easeT = t * t * (3 - 2 * t);
      return start.idx + (end.idx - start.idx) * easeT;
    }
  }
  return 0;
}

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

function ScrollScene() {
  const scroll = useScroll();
  const { camera } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const robotRef = useRef<THREE.Group>(null);
  const smoothIdx = useRef(0);

  const onMouse = useCallback((e: MouseEvent) => {
    setMouse({ x: (e.clientX / window.innerWidth) * 2 - 1, y: -(e.clientY / window.innerHeight) * 2 + 1 });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouse);
    let animId: number;
    const handleNav = (e: Event) => {
      const customEvent = e as CustomEvent<{ pageIndex: number }>;
      const pageIndex = customEvent.detail.pageIndex;
      const maxScroll = scroll.el.scrollHeight - scroll.el.clientHeight;
      const targetTop = (pageIndex / 4) * maxScroll;
      const startTop = scroll.el.scrollTop;
      const distance = targetTop - startTop;
      const duration = 1500;
      let start: number | null = null;
      if (animId) cancelAnimationFrame(animId);
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        scroll.el.scrollTo({ top: startTop + distance * ease, behavior: "auto" });
        if (progress < 1) { animId = window.requestAnimationFrame(step); }
      };
      animId = window.requestAnimationFrame(step);
    };
    window.addEventListener("nav-click", handleNav);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("nav-click", handleNav);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [onMouse, scroll.el]);

  useFrame((state) => {
    const targetIdx = getInterpolatedStation(scroll.offset);
    smoothIdx.current += (targetIdx - smoothIdx.current) * 0.1;
    const currBaseIdx = Math.floor(smoothIdx.current);
    const nextBaseIdx = Math.min(currBaseIdx + 1, STATIONS.length - 1);
    const t = smoothIdx.current - currBaseIdx;
    const easeT = t * t * (3 - 2 * t);
    const currX = lerp(STATIONS[currBaseIdx].x, STATIONS[nextBaseIdx].x, easeT);
    const currZ = lerp(STATIONS[currBaseIdx].z, STATIONS[nextBaseIdx].z, easeT);
    camera.position.set(currX + mouse.x * 0.5, mouse.y * 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2, currZ + 12);
    camera.lookAt(currX + mouse.x * 0.5, mouse.y * 0.5, currZ);
    if (robotRef.current) {
      robotRef.current.position.set(currX + 2.5, -0.5, currZ + 8);
      robotRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const animState = scroll.offset > 0.95 ? "wave" : scroll.offset > 0.45 && scroll.offset < 0.55 ? "point" : "idle";

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 8, 10]} intensity={0.4} color="#e0e0ff" />
      <pointLight position={[-8, 3, 0]} intensity={0.3} color="#7c3aed" distance={30} />
      <TravelingLight smoothIdx={smoothIdx} />
      <Starfield count={4000} depth={200} scrollProgress={scroll.offset} />
      <group ref={robotRef}>
        <ProceduralRobot position={[0, 0, 0]} scale={1} mousePosition={mouse} animationState={animState} />
      </group>
      {STATIONS.map((station) => (
        <group key={station.id} position={[station.x, 0, station.z]}>
          <PlanetPlatform color={station.id % 2 === 0 ? "#00d4ff" : "#ffb020"} />
          {station.id === 1 && <Projects3D />}
          {station.id === 4 && <Contact3D />}
        </group>
      ))}
    </>
  );
}

function TravelingLight({ smoothIdx }: { smoothIdx: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (!ref.current) return;
    const currBaseIdx = Math.floor(smoothIdx.current);
    const nextBaseIdx = Math.min(currBaseIdx + 1, STATIONS.length - 1);
    const t = smoothIdx.current - currBaseIdx;
    const currX = lerp(STATIONS[currBaseIdx].x, STATIONS[nextBaseIdx].x, t);
    const currZ = lerp(STATIONS[currBaseIdx].z, STATIONS[nextBaseIdx].z, t);
    ref.current.position.set(currX, 2, currZ + 10);
  });
  return <pointLight ref={ref} intensity={0.6} color="#00d4ff" distance={25} />;
}

function PlanetPlatform({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.1; });
  return (
    <group position={[0, -5, -2]} ref={ref}>
      <mesh><icosahedronGeometry args={[3, 1]} /><meshStandardMaterial color="#0a0a1a" emissive={color} emissiveIntensity={0.2} wireframe /></mesh>
      <mesh rotation={[-Math.PI / 2.2, 0.2, 0]}><ringGeometry args={[4, 4.05, 64]} /><meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.5} /></mesh>
      <mesh rotation={[-Math.PI / 2.2, 0.2, 0]}><ringGeometry args={[4.5, 4.8, 64]} /><meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.1} /></mesh>
    </group>
  );
}

function Projects3D() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.2; });
  return (
    <group ref={ref} position={[0, -2, 0]}>
      <mesh position={[-5, 2, 0]}><icosahedronGeometry args={[0.5, 1]} /><meshStandardMaterial color="#34d399" wireframe /></mesh>
      <mesh position={[5, -1, 0]}><icosahedronGeometry args={[0.5, 1]} /><meshStandardMaterial color="#ffb020" wireframe /></mesh>
    </group>
  );
}

function Contact3D() {
  return (
    <mesh position={[0, 8, -4]}>
      <cylinderGeometry args={[0.5, 2, 30, 16, 1, true]} />
      <meshStandardMaterial color="#ff3d8f" emissive="#ff3d8f" emissiveIntensity={2} transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
}

/*  STATION HTML CONTENT (2D Overlay) */

function Station0Hero() {
  return (
    <div id="hero" style={{ display: "flex", alignItems: "center", height: "100vh", paddingLeft: "10%" }}>
      <div className="hud-panel" style={{ width: "620px", padding: "44px", background: "rgba(3,3,10,0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(0, 212, 255, 0.1)" }}>
        <div className="status-badge" style={{ marginBottom: "24px" }}><span className="status-dot" /><span>AVAILABLE FOR WORK</span></div>
        <h1 style={{ fontSize: "68px", fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em", margin: 0 }}>
          <span className="text-gradient-accent">Muhammad</span><br />
          <span style={{ color: "var(--text-primary)" }}>Bilal</span>
        </h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "16px", color: "var(--accent)", marginTop: "16px", letterSpacing: "0.05em" }}>{"> "} AI Automation Engineer</p>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.7, marginTop: "16px" }}>
          I design and build production-grade AI automation systems, RAG pipelines, and LLM-powered agents that reduce manual workload at scale.
        </p>
        <div style={{ display: "flex", gap: "10px", marginTop: "32px", flexWrap: "wrap" }}>
          {["RAG", "LangGraph", "FastAPI", "LangChain", "Python"].map(c => (<span key={c} className="chip" style={{ fontSize: "12px", padding: "6px 14px" }}>{c}</span>))}
        </div>
      </div>
    </div>
  );
}

function Station1Projects() {
  return (
    <div id="projects" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ width: "900px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div className="section-overline" style={{ justifyContent: "center" }}>PROJECT SATELLITES</div>
          <h2 style={{ fontSize: "56px", fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Things I&apos;ve <span className="font-display" style={{ fontStyle: "italic" }}><span className="text-gradient-cyan">shipped</span></span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "18px", width: "100%", marginBottom: "18px" }}>
          <ProjectCard color="#34d399" panelCls="hud-panel-emerald" idx="01" title="Secure RAG AI Agent" tags="LangChain · FAISS · ChromaDB" desc="Production RAG pipeline with document ingestion, vector search, and conversational retrieval." href="https://github.com/MuhammadBilal0021/rag-document-assistan" />
          <ProjectCard color="#ffb020" panelCls="hud-panel-amber" idx="02" title="AutoML & Agentic Platform" tags="FastAPI · Scikit-learn · Groq" desc="End-to-end automated ML platform with agent-driven model selection." href="https://github.com/MuhammadBilal0021/AUTO_ml_eda" />
          <ProjectCard color="#7c3aed" panelCls="hud-panel-violet" idx="03" title="AI Lead Gen Agent" tags="LangGraph · Tavily · Groq" desc="Multi-step AI agent that researches, scores, and generates personalized outreach." href="https://github.com/MuhammadBilal0021/leadflow-ai" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", width: "66%" }}>
          <ProjectCard color="#00d4ff" panelCls="" idx="04" title="Multi-Platform Chatbot" tags="Streamlit · OpenAI · Python" desc="Intelligent chatbot with memory, context awareness, and multi-channel deployment." href="https://github.com/MuhammadBilal0021/multi-platform-agent" />
          <ProjectCard color="#ff3d8f" panelCls="hud-panel-accent" idx="05" title="Document Intelligence" tags="FastAPI · Chroma · LangChain" desc="Automated document processing with OCR, chunking, and semantic search." href="https://github.com/MuhammadBilal0021/constructguard-ai" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ color, panelCls, idx, title, tags, desc, href }: { color: string, panelCls: string, idx: string, title: string, tags: string, desc?: string, href?: string }) {
  const [hovered, setHovered] = useState(false);
  const glowShadow = "0 8px 32px rgba(0,0,0,0.4), 0 0 25px " + color + "22";
  const dotShadow = "0 0 " + (hovered ? "16px " : "10px ") + color;
  const handleClick = () => { if (href) window.open(href, "_blank", "noreferrer"); };
  return (
    <div className={"hud-panel " + panelCls} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={handleClick}
      style={{ padding: "20px", background: "rgba(3,3,10,0.75)", backdropFilter: "blur(12px)", cursor: "pointer",
        borderColor: hovered ? color : undefined,
        boxShadow: hovered ? glowShadow : undefined,
        transform: hovered ? "translateY(-6px)" : undefined }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, boxShadow: dotShadow, transition: "box-shadow 0.3s ease" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-quaternary)" }}>SAT-{idx}</span>
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "10px", color: "#34d399", background: "rgba(52,211,153,0.1)", padding: "4px 8px", borderRadius: "4px" }}>● DEPLOYED</span>
      </div>
      <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 6px 0", color: hovered ? color : "var(--text-primary)", transition: "color 0.3s ease" }}>{title}</h3>
      {desc && <p style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.5, margin: "0 0 8px 0" }}>{desc}</p>}
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--cyan)" }}>{tags}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px", fontFamily: "var(--font-mono)", fontSize: "11px", color: hovered ? color : "var(--text-quaternary)", transition: "color 0.3s ease" }}>
        <ExternalLink size={12} /> VIEW PROJECT
      </div>
    </div>
  );
}

function Station2Skills() {
  return (
    <div id="skills" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", padding: "40px 0" }}>
      <div style={{ width: "1060px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div className="section-overline" style={{ justifyContent: "center" }}>HUD SKILLS STATION</div>
          <h2 style={{ fontSize: "48px", fontWeight: 800, lineHeight: 1.1, margin: 0 }}>My <span className="font-display" style={{ fontStyle: "italic" }}><span className="text-gradient-cyan">toolkit</span></span></h2>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-quaternary)", letterSpacing: "0.15em", marginBottom: "12px", alignSelf: "flex-start" }}>{"// TECHNICAL PROFICIENCY"}</div>
        <div style={{ display: "flex", gap: "16px", width: "100%", marginBottom: "24px" }}>
          <SkillBlock cat="AI & AGENTS" color="#ffb020" cls="amber" skills={[["LangChain", 90], ["RAG Pipelines", 85], ["Groq & OpenAI", 90]]} />
          <SkillBlock cat="SOFTWARE" color="#7c3aed" cls="violet" skills={[["Python", 95], ["RESTful APIs", 90], ["SQL", 85]]} />
          <SkillBlock cat="BACKEND" color="#34d399" cls="emerald" skills={[["FastAPI", 90], ["Streamlit", 85], ["FAISS/Chroma", 85]]} />
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-quaternary)", letterSpacing: "0.15em", marginBottom: "12px", alignSelf: "flex-start" }}>{"// PROFESSIONAL & LEADERSHIP"}</div>
        <div style={{ display: "flex", gap: "16px", width: "100%" }}>
          <ProfessionalSkill icon={<Briefcase size={20} />} title="Project Management" color="#00d4ff" desc="Led end-to-end delivery of the RAG AI Agent and AutoML platform — scoping requirements, managing sprints, and coordinating deployments." />
          <ProfessionalSkill icon={<Clock size={20} />} title="Time Management" color="#ffb020" desc="Shipped 5 production systems in parallel while completing my SE degree. Prioritized tasks using Kanban workflows." />
          <ProfessionalSkill icon={<MessageSquare size={20} />} title="Communication" color="#a78bfa" desc="Translated complex AI concepts into clear proposals for non-technical stakeholders. Documented every project with API specs." />
        </div>
      </div>
    </div>
  );
}

function ProfessionalSkill({ icon, title, color, desc }: { icon: React.ReactNode, title: string, color: string, desc: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="hud-panel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ flex: 1, padding: "20px", background: "rgba(3,3,10,0.75)", backdropFilter: "blur(12px)",
        borderColor: hovered ? color + "44" : undefined,
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.3), 0 0 20px " + color + "11" : undefined }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <span style={{ color }}>{icon}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color, fontWeight: 600, letterSpacing: "0.08em" }}>{title}</span>
      </div>
      <p style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.65, margin: 0 }}>{desc}</p>
    </div>
  );
}

function SkillBlock({ cat, color, cls, skills }: { cat: string, color: string, cls: string, skills: [string, number][] }) {
  return (
    <div className={"hud-panel hud-panel-" + cls} style={{ flex: 1, padding: "24px", background: "rgba(3,3,10,0.75)", backdropFilter: "blur(12px)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color, letterSpacing: "0.12em", marginBottom: "20px", fontWeight: 600 }}>{cat}</div>
      {skills.map(([name, lv]) => (
        <div key={name} style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px" }}>
            <span style={{ color: "var(--text-secondary)" }}>{name}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color }}>{lv}%</span>
          </div>
          <div className="skill-bar-track">
            <div className="skill-bar-fill" style={{ width: lv + "%", background: "linear-gradient(90deg, " + color + ", " + color + "88)", color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Station3About() {
  return (
    <div id="about" style={{ display: "flex", alignItems: "center", height: "100vh", paddingLeft: "10%" }}>
      <div style={{ width: "800px", padding: "40px", background: "rgba(3,3,10,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(0, 212, 255, 0.1)", borderRadius: "12px" }}>
        <div className="section-overline">ABOUT TRANSMISSION</div>
        <h2 style={{ fontSize: "56px", fontWeight: 800, lineHeight: 1.1, margin: "16px 0 24px" }}>
          I don&apos;t just write code.<br />
          <span className="font-display" style={{ fontStyle: "italic" }}>I <span className="text-gradient-amber">ship automation</span>.</span>
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "18px", lineHeight: 1.7, marginBottom: "32px", maxWidth: "660px" }}>
          AI Automation Engineer and SE graduate from SZABIST Islamabad. I build production-grade Python applications, RAG agents, and multi-platform API integrations.
        </p>
        <div style={{ padding: "16px 20px", borderRadius: "8px", border: "1px solid rgba(255,176,32,0.3)", background: "rgba(255,176,32,0.04)", borderLeft: "3px solid var(--amber)", display: "inline-flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <Briefcase size={20} style={{ color: "var(--amber)" }} />
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2px" }}>NLP Automation Engineer</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-quaternary)" }}>INVOGUE Solutions · Islamabad · 2024</div>
          </div>
        </div>
        <div className="terminal-card" style={{ fontSize: "15px", lineHeight: 2, padding: "24px", maxWidth: "560px", background: "rgba(0,0,0,0.5)" }}>
          <div className="terminal-header" style={{ marginBottom: "16px" }}>
            <span className="terminal-dot" style={{ background: "#f43f5e" }} />
            <span className="terminal-dot" style={{ background: "var(--amber)" }} />
            <span className="terminal-dot" style={{ background: "var(--emerald)" }} />
            <span style={{ fontSize: "13px", color: "var(--text-quaternary)", marginLeft: "12px" }}>bilal.config</span>
          </div>
          <div>
            <span style={{ color: "var(--text-quaternary)" }}>{"{"}</span><br />
            {[["name", '"Muhammad Bilal"'], ["role", '"AI Automation Engineer"'], ["education", '"BS SE — SZABIST"']].map(([k, v]) => (
              <div key={k} style={{ paddingLeft: "32px" }}><span style={{ color: "var(--cyan)" }}>&quot;{k}&quot;</span>: <span style={{ color: "var(--emerald)" }}>{v}</span>,</div>
            ))}
            <div style={{ paddingLeft: "32px" }}><span style={{ color: "var(--cyan)" }}>&quot;available&quot;</span>: <span style={{ color: "var(--emerald)" }}>true</span></div>
            <span style={{ color: "var(--text-quaternary)" }}>{"}"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Station4Contact() {
  const [copied, setCopied] = useState(false);
  const email = "muhammadbilal759021@gmail.com";
  const copyEmail = () => { navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2500); };
  return (
    <div id="contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ width: "800px", textAlign: "center", padding: "40px", background: "rgba(3,3,10,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(0, 212, 255, 0.1)", borderRadius: "12px" }}>
        <div className="section-overline" style={{ justifyContent: "center" }}>CONTACT BEAM</div>
        <h2 style={{ fontSize: "64px", fontWeight: 800, lineHeight: 1.1, margin: "16px 0 24px" }}>
          Let&apos;s build <span className="font-display" style={{ fontStyle: "italic" }}><span className="text-gradient-accent">something</span></span><br />together.
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "20px", marginBottom: "40px" }}>AI agent, automation, or ML project? I&apos;m available for freelance work.</p>
        <a href={`mailto:${email}`} className="btn-primary" style={{ margin: "0 auto 12px", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", padding: "16px 32px", textDecoration: "none" }}>
          <MessageSquare size={16} /> SEND TRANSMISSION
        </a>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "16px", color: "var(--text-tertiary)", marginBottom: "40px" }}>{email} <br/> +92 325 5185049</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "32px" }}>
          <a href="https://github.com/MuhammadBilal0021" target="_blank" rel="noreferrer" className="social-icon-btn github"><FaGithub size={20} /></a>
          <a href="https://www.linkedin.com/in/muhammad-bilal0021/" target="_blank" rel="noreferrer" className="social-icon-btn linkedin"><FaLinkedin size={20} /></a>
          <a href="tel:+923255185049" className="social-icon-btn phone"><Phone size={18} /></a>
        </div>
        <div className="transmission-text glitch-text" style={{ fontSize: "13px" }}>TRANSMISSION COMPLETE</div>
      </div>
    </div>
  );
}

export default function ImmersiveExperience() {
  return (
    <>
      <div style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh" }}>
        <Canvas gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} camera={{ fov: 60, near: 0.1, far: 500, position: [0, 0, 12] }} dpr={[1, 1.5]} style={{ background: "#03030a" }}>
          <ScrollControls pages={5} damping={0.25}>
            <ScrollScene />
            <Scroll html style={{ width: '100vw', height: '100vh' }}>
              <div style={{ position: "relative" }}>
                <Station0Hero />
                <Station1Projects />
                <Station2Skills />
                <Station3About />
                <Station4Contact />
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>

      <nav style={{ position: "fixed", top: "16px", left: "50%", transform: "translateX(-50%)", width: "min(92%, 900px)", zIndex: 100, padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(8, 12, 28, 0.75)", backdropFilter: "blur(20px) saturate(1.8)", border: "1px solid rgba(0, 212, 255, 0.15)", borderRadius: "12px", boxShadow: "0 0 20px rgba(0, 212, 255, 0.08), 0 4px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
        <a href="#hero" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("nav-click", { detail: { pageIndex: 0 } })); }} style={{ fontFamily: "var(--font-mono)", fontSize: "15px", fontWeight: 700, color: "var(--cyan)", letterSpacing: "0.05em", textDecoration: "none", textShadow: "0 0 12px rgba(0, 212, 255, 0.4)" }}>BILAL<span style={{ opacity: 0.4 }}>.WORKS</span></a>
        <div className="desktop-only" style={{ display: "flex", gap: "4px" }}>
          {["PROJECTS", "SKILLS", "ABOUT", "CONTACT"].map((l, i) => {
            const pageIndex = i + 1;
            return (
              <a key={l} href={"#" + l.toLowerCase()} className="nav-link" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("nav-click", { detail: { pageIndex } })); }}>{l}</a>
            );
          })}
        </div>
        <div style={{ position: "absolute", bottom: "-1px", left: "20%", right: "20%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255, 61, 143, 0.5), transparent)", borderRadius: "1px" }} />
      </nav>

      <div style={{ position: "fixed", bottom: "40px", left: "50%", transform: "translateX(-50%)", zIndex: 50, textAlign: "center", pointerEvents: "none" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-quaternary)", letterSpacing: "0.2em", marginBottom: "12px" }}>SCROLL TO INITIATE TRAVEL</div>
        <div style={{ width: "2px", height: "50px", background: "linear-gradient(to bottom, var(--accent), transparent)", margin: "0 auto", animation: "pulse-glow 2s ease infinite" }} />
      </div>
    </>
  );
}

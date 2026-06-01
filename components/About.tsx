import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="section">
      <ScrollReveal>
        <h2>Experience</h2>
        <ul>
          <li key="invogue">
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>NLP Automation Engineer</span> at INVOGUE Solutions (2024)
            <p style={{ marginTop: "4px", fontSize: "14px" }}>Built end-to-end NLP automation pipelines that eliminated manual text-processing tasks at scale.</p>
          </li>
          <li key="szabist">
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>BS Software Engineering</span> at SZABIST Islamabad
            <p style={{ marginTop: "4px", fontSize: "14px" }}>Focused on AI systems, software architecture, and full-stack development with distinction-level project work.</p>
          </li>
        </ul>
      </ScrollReveal>
    </section>
  );
}

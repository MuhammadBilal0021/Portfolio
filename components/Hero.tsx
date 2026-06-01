import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  return (
    <section className="section">
      <ScrollReveal>
        <h1 style={{ marginBottom: "24px" }}>Muhammad Bilal</h1>
        <p>
          I'm an AI Automation Engineer based in Islamabad, Pakistan. I build
          production-grade RAG pipelines, LLM-powered agents, and automated
          systems that eliminate manual workload at scale.
        </p>
        <p>
          Currently, I'm focused on optimizing AI agents and building scalable NLP
          solutions.
        </p>
      </ScrollReveal>
    </section>
  );
}

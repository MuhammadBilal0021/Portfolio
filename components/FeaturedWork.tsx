import { projects } from "@/lib/projects";
import ScrollReveal from "./ScrollReveal";
import Link from "next/link";

export default function FeaturedWork() {
  return (
    <section id="work" className="section">
      <ScrollReveal>
        <h2>Selected Work</h2>
        <ul style={{ marginTop: "24px" }}>
          {projects.map((project) => (
            <li key={project.slug} style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-start" }}>
              <Link href={`/projects/${project.slug}`} style={{ fontWeight: 500, fontSize: "16px" }}>
                {project.title} ↗
              </Link>
              <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                {project.summary}
              </span>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}

"use client";
import ScrollReveal from "@/components/ScrollReveal";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project;
}

export default function ProjectCaseStudyContent({ project }: Props) {
  return (
    <div>
      <ScrollReveal>
        <h2>The Problem</h2>
        <p>{project.problem}</p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2>The Approach</h2>
        <p>{project.approach}</p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <h2>The Result</h2>
        <p>{project.result}</p>
      </ScrollReveal>
    </div>
  );
}

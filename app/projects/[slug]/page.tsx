import { projects, getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProjectCaseStudyContent from "./ProjectCaseStudyContent";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Muhammad Bilal`,
    description: project.summary,
  };
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="container">
      {/* Back link */}
      <Link href="/#work" style={{ display: "inline-block", marginBottom: "48px" }}>
        ← back
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "8px", marginTop: 0 }}>
          {project.title}
        </h1>
        <p style={{ margin: 0 }}>{project.summary}</p>
        
        <div className="flex-row" style={{ marginTop: "16px" }}>
          <a href={project.github} target="_blank" rel="noreferrer">
            source code ↗
          </a>
          {project.liveUrl && (
            <>
              <span style={{ color: "var(--text-muted)" }}>/</span>
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                live demo ↗
              </a>
            </>
          )}
        </div>
      </div>

      {/* Case Study Content */}
      <ProjectCaseStudyContent project={project} />

      <hr className="divider" />

      {/* Prev / Next Navigation */}
      <div className="flex-row" style={{ justifyContent: "space-between" }}>
        {prevProject ? (
          <Link href={`/projects/${prevProject.slug}`}>
            ← {prevProject.title}
          </Link>
        ) : (
          <span />
        )}
        {nextProject ? (
          <Link href={`/projects/${nextProject.slug}`}>
            {nextProject.title} →
          </Link>
        ) : (
          <Link href="/#work">
            home →
          </Link>
        )}
      </div>
    </main>
  );
}

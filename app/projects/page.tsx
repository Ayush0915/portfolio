import type { Metadata } from "next";
import ProjectsRail from "@/components/ProjectsRail";
import { projects } from "@/lib/data";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects | Ayush Kumar Bhadani",
  description: "AI/ML and full-stack projects built by Ayush Kumar Bhadani — CodeVerdict, AskSQL, Digital Wellbeing Intelligence, and CareerIQ.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-16">
      <div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-[var(--text-main)]">Projects Showcase</h1>
        <p className="mb-6 text-[var(--text-muted)]">Interactive showcase of multi-agent systems, RAG pipelines, and ML systems.</p>
        <ProjectsRail />
      </div>

      {/* Accessible Static Grid for Search Crawlers & Screen Readers */}
      <div className="border-t border-[var(--border-color)] pt-12 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-main)] mb-1">All Featured Systems</h2>
          <p className="text-xs text-[var(--text-muted)]">Complete architectural breakdowns, benchmark metrics, and source links.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between transition-all hover:border-[var(--accent-primary)] shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-primary)]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                    {project.meta || "AI System"}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-1"
                        aria-label={`${project.name} GitHub Repository`}
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.href && project.href !== "#" && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-1"
                        aria-label={`${project.name} Live Demo`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-[var(--text-main)] mb-2">{project.name}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">{project.description || project.bullets[0]}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[var(--border-color)] bg-[var(--bg-chip)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-sub)]"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Secondary CTA */}
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center justify-between rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] px-4 py-2.5 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-chip-hover)] transition-all cursor-pointer shadow-sm"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                <span>Read Full System Case Study</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

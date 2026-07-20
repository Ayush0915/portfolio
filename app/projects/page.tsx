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
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-100">Projects Showcase</h1>
        <p className="mb-6 text-zinc-500">Interactive showcase of multi-agent systems, RAG pipelines, and ML systems.</p>
        <ProjectsRail />
      </div>

      {/* Accessible Static Grid for Search Crawlers & Screen Readers (Fix Bug 5) */}
      <div className="border-t border-zinc-800/80 pt-12 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 mb-1">All Featured Systems</h2>
          <p className="text-xs text-zinc-500">Complete architectural breakdowns, benchmark metrics, and source links.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between transition-all hover:border-indigo-500/40 shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                    {project.meta || "AI System"}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-200 transition-colors p-1"
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
                        className="text-zinc-500 hover:text-zinc-200 transition-colors p-1"
                        aria-label={`${project.name} Live Demo`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-zinc-100 mb-2">{project.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">{project.description || project.bullets[0]}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-zinc-800/80 border border-zinc-700/50 px-2 py-0.5 text-[11px] text-zinc-300"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center justify-between rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-4 py-2.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all"
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

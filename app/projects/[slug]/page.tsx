import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, AlertTriangle, CheckCircle, ShieldAlert, Zap, Cpu } from "lucide-react";
import { projects } from "@/lib/data";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} | Ayush Kumar Bhadani`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl pb-16">
      {/* Back link */}
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors"
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Projects
      </Link>

      {/* Hero image */}
      {project.imageSrc && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800">
          <Image
            src={project.imageSrc}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Title + action links */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-zinc-850 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-teal-400 font-bold mb-1 block" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
            {project.meta}
          </span>
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 sm:text-4xl">
            {project.name}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-900/60 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:border-zinc-505 hover:text-zinc-100 transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
          {project.href && project.href !== "#" && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-indigo-500/50 bg-indigo-500/10 px-3.5 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Site
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <p className="mb-10 text-base text-zinc-400 leading-relaxed font-sans">
          {project.description}
        </p>
      )}

      {/* Problem / Solution Cards */}
      {(project.problem || project.solution) && (
        <div className="grid gap-6 md:grid-cols-2 mb-10">
          {project.problem && (
            <div className="rounded-xl border border-zinc-800 bg-red-950/5 p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 mb-3" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                <ShieldAlert size={15} />
                The Problem
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div className="rounded-xl border border-zinc-800 bg-emerald-950/5 p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                <CheckCircle size={15} />
                The Solution
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{project.solution}</p>
            </div>
          )}
        </div>
      )}

      {/* Engineering Challenges */}
      {project.challenges && (
        <div className="mb-10 rounded-xl border border-zinc-800 bg-amber-950/5 p-6 shadow-sm">
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
            <AlertTriangle size={15} />
            Engineering Challenges
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">{project.challenges}</p>
        </div>
      )}

      {/* Metrics Section */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="mb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
            Project Metrics & Outcomes
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.metrics.map((metric, i) => (
              <div key={i} className="rounded-lg border border-zinc-800 bg-indigo-950/10 p-4 flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-indigo-500/10 text-indigo-400">
                  <Zap size={15} />
                </div>
                <p className="text-sm text-zinc-300 leading-normal align-middle self-center">{metric}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Accomplishments */}
      <div className="mb-10 border-t border-zinc-850 pt-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
          Key Accomplishments
        </p>
        <ul className="space-y-4">
          {project.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-sm text-zinc-400 leading-relaxed font-sans">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="border-t border-zinc-850 pt-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-zinc-800 bg-zinc-900 px-3.5 py-1 text-xs font-medium text-indigo-300"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, FileText, ArrowRight, Trophy, BrainCircuit, ExternalLink, ShieldCheck, Target, Sparkles, Compass, MapPin, Code2 } from "lucide-react";
import { contact, projects, currentlyExploring } from "@/lib/data";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SkillsOrbit from "@/components/ui/skills-orbit";

const roles = [
  "AI/ML Engineer",
  "Multi-Agent Systems Builder",
  "RAG Pipeline Architect",
  "Data Science Specialist",
];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const anim = (delay: number) => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3, delay },
      };
    }
    return {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay, ease: "easeOut" as const },
    };
  };

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="relative flex flex-col space-y-20 pt-2 pb-8">
      {/* ── HERO SECTION ───────────────────────────────────────────── */}
      <section id="hero" className="relative flex min-h-[75vh] flex-col justify-between pt-2 pb-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10 my-auto">
          <div className="flex flex-col justify-center">
            {/* Availability Status Badge — Single string node (Fix Bug 3) */}
            <motion.div 
              {...anim(0)}
              className="mb-5 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Internships & Early Careers (Graduating 2027)</span>
            </motion.div>

            {/* Rotating Role Pill */}
            <motion.div 
              {...anim(0.1)} 
              className="mb-3 h-6 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.h1 {...anim(0.2)} className="mb-2 text-[clamp(2.5rem,7.5vw,5rem)] font-black leading-none tracking-tight text-zinc-100">
              AYUSH
            </motion.h1>

            <motion.h1 
              {...anim(0.3)} 
              className="mb-6 text-[clamp(2.5rem,7.5vw,5rem)] font-black leading-none tracking-tight text-transparent" 
              style={{ WebkitTextStroke: "1.5px rgba(161,161,170,0.35)" }}
            >
              KUMAR BHADANI
            </motion.h1>

            <motion.p {...anim(0.4)} className="mb-8 max-w-lg text-base leading-relaxed text-zinc-400">
              Final-year CSE (Data Science) student at Bangalore Institute of Technology (9.45 CGPA). I specialize in building optimized RAG pipelines, multi-agent AI workflows, and Applied ML models that execute reliably in production.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...anim(0.5)} className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="flex items-center gap-2 rounded-xl border border-indigo-500/60 bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-300 transition-all duration-300 hover:bg-indigo-500/20 hover:border-indigo-400 hover:shadow-[0_0_18px_rgba(99,102,241,0.35)] min-h-[44px]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                View Projects
                <ArrowRight size={15} />
              </Link>

              <a
                href={contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:text-zinc-100 min-h-[44px]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                <Github size={15} />
                GitHub
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm font-semibold text-zinc-400 transition-all duration-300 hover:border-zinc-600 hover:text-zinc-200 min-h-[44px]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                <FileText size={15} />
                Resume
              </a>
            </motion.div>

            {/* Inline Social Icons */}
            <motion.div {...anim(0.6)} className="mt-6 flex items-center gap-5 border-t border-zinc-800/60 pt-5 max-w-sm">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                Find Me On:
              </span>
              <div className="flex gap-3">
                <a 
                  href={contact.githubUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-zinc-500 transition-colors hover:text-indigo-400 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                {contact.linkedinUrl && (
                  <a 
                    href={contact.linkedinUrl}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-500 transition-colors hover:text-indigo-400 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-zinc-500 transition-colors hover:text-indigo-400 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Interactive Verifiable Engineering Highlights Card */}
          <motion.div 
            {...anim(0.4)}
            className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <BrainCircuit size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-100">Engineering Highlights</h3>
                  <p className="text-[11px] text-zinc-500">Verifiable Track Record</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                <ShieldCheck size={11} /> Proof Points
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/journey"
                className="group rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-3.5 transition-all duration-300 hover:border-indigo-500/40 hover:bg-zinc-900/60"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 group-hover:text-indigo-400 transition-colors" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Academics</p>
                  <ArrowRight size={12} className="text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="mt-1 text-lg font-black text-indigo-400">9.45 / 10 CGPA</p>
                <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">B.Tech CSE (Data Science)</p>
              </Link>

              <Link
                href="/projects"
                className="group rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-3.5 transition-all duration-300 hover:border-emerald-500/40 hover:bg-zinc-900/60"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 group-hover:text-emerald-400 transition-colors" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>AI Systems</p>
                  <ArrowRight size={12} className="text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="mt-1 text-lg font-black text-emerald-400">4 Systems</p>
                <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">CodeVerdict, AskSQL, etc.</p>
              </Link>

              <Link
                href="/journey"
                className="group rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-3.5 transition-all duration-300 hover:border-amber-500/40 hover:bg-zinc-900/60"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 group-hover:text-amber-400 transition-colors" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>GDG Lead</p>
                  <ArrowRight size={12} className="text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="mt-1 text-lg font-black text-amber-400">1000+ Taught</p>
                <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">GDG Workshops & Jams</p>
              </Link>

              <Link
                href="/projects/codeverdict"
                className="group rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-3.5 transition-all duration-300 hover:border-sky-500/40 hover:bg-zinc-900/60"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 group-hover:text-sky-400 transition-colors" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Benchmark</p>
                  <ExternalLink size={12} className="text-zinc-600 group-hover:text-sky-400 transition-all" />
                </div>
                <p className="mt-1 text-lg font-black text-sky-400">87.5% Precision</p>
                <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">CodeVerdict PR Suite</p>
              </Link>
            </div>

            <Link 
              href="/about" 
              className="block rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3.5 text-xs text-zinc-300 leading-relaxed transition-colors hover:border-indigo-500/40 hover:bg-indigo-500/10"
            >
              <div className="flex items-center gap-1.5 font-semibold text-indigo-400 mb-1" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                <Target size={13} /> Engineering Mindset
              </div>
              Building deterministic execution safety, isolated DuckDB & FAISS sandboxes, and low-latency API pipelines over raw prompt wrappers.
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT TEASER SECTION ───────────────────────────────────── */}
      <section className="border-t border-zinc-800/80 pt-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              About Me
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mt-1">Bridging Statistical ML with Software Engineering</h2>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700/60 bg-zinc-900/60 px-4 py-2 text-xs font-semibold text-zinc-300 hover:border-indigo-500/50 hover:text-indigo-300 transition-all"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <span>Read Full Bio & FAQs</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
          I am a final-year CSE (Data Science) student at Bangalore Institute of Technology. I believe machine learning models shouldn&apos;t be confined to isolated research notebooks. My engineering focus is constructing resilient multi-agent AI systems, grounded vector search RAG pipelines, and deterministic sandboxes.
        </p>
      </section>

      {/* ── FEATURED PROJECTS TEASER ───────────────────────────────── */}
      <section className="border-t border-zinc-800/80 pt-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              Featured Work
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mt-1">Production AI Systems</h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700/60 bg-zinc-900/60 px-4 py-2 text-xs font-semibold text-zinc-300 hover:border-indigo-500/50 hover:text-indigo-300 transition-all"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <span>View All Projects</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <div
              key={project.slug}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 flex flex-col justify-between transition-all hover:border-indigo-500/30 shadow-md"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-2 block" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  {project.meta}
                </span>
                <h3 className="text-lg font-bold text-zinc-100 mb-2">{project.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">{project.bullets[0]}</p>
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-300 hover:text-indigo-200 transition-colors pt-2 border-t border-zinc-800/60"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                <span>Explore Architecture</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS TEASER ──────────────────────────────────────────── */}
      <section className="border-t border-zinc-800/80 pt-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              Technical Capabilities
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mt-1">Core Tech Stack</h2>
          </div>
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700/60 bg-zinc-900/60 px-4 py-2 text-xs font-semibold text-zinc-300 hover:border-indigo-500/50 hover:text-indigo-300 transition-all"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <span>Explore Full Stack</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <SkillsOrbit />
      </section>

      {/* ── CONTACT CTA ────────────────────────────────────────────── */}
      <section className="border-t border-zinc-800/80 pt-10">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 text-center max-w-3xl mx-auto space-y-4 shadow-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Open for 2027 Internships & Roles
          </span>
          <h2 className="text-2xl font-black text-zinc-100">Let&apos;s Build Something Extraordinary Together</h2>
          <p className="text-xs text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Interested in discussing AI engineering, multi-agent architectures, or internship opportunities? Reach out directly.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/60 bg-indigo-500/10 px-6 py-2.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              <span>Get In Touch</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

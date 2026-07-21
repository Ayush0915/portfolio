"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, FileText, ArrowRight, BrainCircuit, ExternalLink, ShieldCheck, Target } from "lucide-react";
import { contact, projects } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
import SkillsOrbit from "@/components/ui/skills-orbit";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0.3 }
        : { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0.3 }
        : { duration: 0.45, ease: "easeOut" as const },
    },
  };

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="relative flex flex-col space-y-20 pt-2 pb-8">
      {/* ── HERO SECTION ───────────────────────────────────────────── */}
      <section id="hero" className="relative flex min-h-[75vh] flex-col justify-between pt-2 pb-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10 my-auto"
        >
          <div className="flex flex-col justify-center relative z-10">
            {/* Group 1: Availability Badge & Role Label */}
            <motion.div variants={itemVariants}>
              {/* Availability Status Badge */}
              <div 
                className="mb-5 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Available for Internships & Early Careers (Graduating 2027)</span>
              </div>

              {/* Static Role Label */}
              <div 
                className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                AI/ML Engineer
              </div>
            </motion.div>

            {/* Group 2: Headline Unit */}
            <motion.div variants={itemVariants} className="relative inline-block my-2">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-[var(--bg-page)] opacity-95 blur-sm" />
              
              <h1 className="mb-2 text-[clamp(2.5rem,7.5vw,5rem)] font-black leading-none tracking-tight text-[var(--text-main)]">
                AYUSH
              </h1>

              {/* Hero Outline Name with Opaque Fill & Theme Variable Stroke */}
              <h1 
                className="mb-6 text-[clamp(2.5rem,7.5vw,5rem)] font-black leading-none tracking-tight select-none" 
                style={{ 
                  color: "var(--hero-fill)",
                  WebkitTextStroke: "2px var(--hero-stroke)",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                }}
              >
                KUMAR BHADANI
              </h1>
            </motion.div>

            {/* Group 3: Description, CTAs, and Socials */}
            <motion.div variants={itemVariants}>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-[var(--text-muted)]">
                Final-year CSE (Data Science) student at Bangalore Institute of Technology (9.45 CGPA). I specialize in building optimized RAG pipelines, multi-agent AI workflows, and Applied ML models that execute reliably in production.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Primary CTA */}
                <Link
                  href="/projects"
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-sm font-semibold shadow-md hover:shadow-indigo-500/25 active:scale-95 transition-all duration-200 min-h-[44px] cursor-pointer"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  View Projects
                  <ArrowRight size={15} />
                </Link>

                {/* Secondary CTA */}
                <a
                  href={contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--bg-chip-hover)] hover:border-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold shadow-sm active:scale-95 transition-all duration-200 min-h-[44px] cursor-pointer"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  <Github size={15} />
                  GitHub
                </a>

                {/* Secondary CTA */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--bg-chip-hover)] hover:border-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold shadow-sm active:scale-95 transition-all duration-200 min-h-[44px] cursor-pointer"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  <FileText size={15} />
                  Resume
                </a>
              </div>

              {/* Inline Social Icons */}
              <div className="mt-6 flex items-center gap-5 border-t border-[var(--border-color)] pt-5 max-w-sm">
                <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  Find Me On:
                </span>
                <div className="flex gap-3">
                  <a 
                    href={contact.githubUrl}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent-primary)] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  {contact.linkedinUrl && (
                    <a 
                      href={contact.linkedinUrl}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent-primary)] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent-primary)] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Group 4: Interactive Verifiable Engineering Highlights Card */}
          <motion.div 
            variants={itemVariants}
            className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 backdrop-blur-sm shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                  <BrainCircuit size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-main)]">Engineering Highlights</h3>
                  <p className="text-[11px] text-[var(--text-muted)]">Verifiable Track Record</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                <ShieldCheck size={11} /> Proof Points
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/journey"
                className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3.5 transition-all duration-300 hover:border-indigo-500/40 hover:bg-[var(--bg-card-hover)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Academics</p>
                  <ArrowRight size={12} className="text-[var(--text-muted)] group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="mt-1 text-lg font-black text-indigo-600 dark:text-indigo-400">9.45 / 10 CGPA</p>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5 line-clamp-1">B.Tech CSE (Data Science)</p>
              </Link>

              <Link
                href="/projects"
                className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3.5 transition-all duration-300 hover:border-indigo-500/40 hover:bg-[var(--bg-card-hover)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>AI Systems</p>
                  <ArrowRight size={12} className="text-[var(--text-muted)] group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="mt-1 text-lg font-black text-indigo-600 dark:text-indigo-400">4 Systems</p>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5 line-clamp-1">CodeVerdict, AskSQL, etc.</p>
              </Link>

              <Link
                href="/journey"
                className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3.5 transition-all duration-300 hover:border-indigo-500/40 hover:bg-[var(--bg-card-hover)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>GDG Lead</p>
                  <ArrowRight size={12} className="text-[var(--text-muted)] group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="mt-1 text-lg font-black text-indigo-600 dark:text-indigo-400">1000+ Taught</p>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5 line-clamp-1">GDG Workshops & Jams</p>
              </Link>

              <Link
                href="/projects/codeverdict"
                className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3.5 transition-all duration-300 hover:border-indigo-500/40 hover:bg-[var(--bg-card-hover)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Benchmark</p>
                  <ExternalLink size={12} className="text-[var(--text-muted)] group-hover:text-indigo-500 transition-all" />
                </div>
                <p className="mt-1 text-lg font-black text-indigo-600 dark:text-indigo-400">87.5% Precision</p>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5 line-clamp-1">CodeVerdict PR Suite</p>
              </Link>
            </div>

            <Link 
              href="/about" 
              className="block rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3.5 text-xs text-[var(--text-main)] leading-relaxed transition-colors hover:border-indigo-500/40 hover:bg-indigo-500/10"
            >
              <div className="flex items-center gap-1.5 font-semibold text-[var(--accent-primary)] mb-1" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                <Target size={13} /> Engineering Mindset
              </div>
              Building deterministic execution safety, isolated DuckDB & FAISS sandboxes, and low-latency API pipelines over raw prompt wrappers.
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT TEASER SECTION ───────────────────────────────────── */}
      <section className="border-t border-[var(--border-color)] pt-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-primary)]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              About Me
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)] mt-1">Bridging Statistical ML with Software Engineering</h2>
          </div>
          {/* Secondary CTA */}
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] px-4 py-2 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-chip-hover)] transition-all shadow-sm cursor-pointer"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <span>Read Full Bio & FAQs</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-3xl">
          I am a final-year CSE (Data Science) student at Bangalore Institute of Technology. I believe machine learning models shouldn&apos;t be confined to isolated research notebooks. My engineering focus is constructing resilient multi-agent AI systems, grounded vector search RAG pipelines, and deterministic sandboxes.
        </p>
      </section>

      {/* ── FEATURED PROJECTS TEASER ───────────────────────────────── */}
      <section className="border-t border-[var(--border-color)] pt-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-primary)]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              Featured Work
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)] mt-1">Production AI Systems</h2>
          </div>
          {/* Secondary CTA */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] px-4 py-2 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-chip-hover)] transition-all shadow-sm cursor-pointer"
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
              className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 flex flex-col justify-between transition-all hover:border-[var(--accent-primary)] shadow-md"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-primary)] mb-2 block" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  {project.meta}
                </span>
                <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">{project.name}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">{project.bullets[0]}</p>
              </div>

              {/* Tertiary CTA */}
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] hover:underline transition-colors pt-3 border-t border-[var(--border-color)] cursor-pointer"
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
      <section className="border-t border-[var(--border-color)] pt-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-primary)]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              Technical Capabilities
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)] mt-1">Core Tech Stack</h2>
          </div>
          {/* Secondary CTA */}
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] px-4 py-2 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-chip-hover)] transition-all shadow-sm cursor-pointer"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <span>Explore Full Stack</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <SkillsOrbit />
      </section>

      {/* ── CONTACT CTA ────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border-color)] pt-10">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-8 text-center max-w-3xl mx-auto space-y-4 shadow-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Open for 2027 Internships & Roles
          </span>
          <h2 className="text-2xl font-black text-[var(--text-main)]">Let&apos;s Build Something Extraordinary Together</h2>
          <p className="text-xs text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            Interested in discussing AI engineering, multi-agent architectures, or internship opportunities? Reach out directly.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            {/* Primary CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 text-xs font-semibold shadow-md hover:shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer min-h-[44px]"
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

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, FileText, ArrowRight, ChevronDown } from "lucide-react";
import { contact } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { HeroGlobeCard } from "@/components/HeroGlobeCard";

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

const roles = [
  "AI/ML Engineer",
  "Multi-Agent Systems Builder",
  "RAG Pipeline Architect",
  "Data Science Specialist",
];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-[85vh] flex-col justify-between">
      {/* Hero Grid */}
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-12 my-auto">
        <section className="flex flex-col justify-center">
          {/* Availability Status Badge */}
          <motion.div 
            {...anim(0)}
            className="mb-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-semibold text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Internships & Early Careers (Graduating 2027)
          </motion.div>

          {/* Rotating Role Pill */}
          <motion.div 
            {...anim(0.1)} 
            className="mb-4 h-6 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.h1 {...anim(0.2)} className="mb-2 text-[clamp(2.8rem,9vw,6rem)] font-black leading-none tracking-tight text-zinc-100">
            AYUSH
          </motion.h1>

          <motion.h1 
            {...anim(0.3)} 
            className="mb-8 text-[clamp(2.8rem,9vw,6rem)] font-black leading-none tracking-tight text-transparent" 
            style={{ WebkitTextStroke: "1.5px rgba(161,161,170,0.35)" }}
          >
            KUMAR BHADANI
          </motion.h1>

          <motion.p {...anim(0.4)} className="mb-10 max-w-lg text-base leading-relaxed text-zinc-400">
            I am Ayush Kumar Bhadani, a final-year CSE (Data Science) student at Bangalore Institute of Technology (9.45 CGPA). I specialize in building optimized RAG pipelines, multi-agent AI workflows, and Applied ML models that actually execute in production, bridging statistical models with robust codebases.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div {...anim(0.5)} className="flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="flex items-center gap-2 rounded-lg border border-indigo-500/60 bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-300 transition-all duration-300 hover:bg-indigo-500/20 hover:border-indigo-400 hover:shadow-[0_0_18px_rgba(99,102,241,0.35)]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              View Projects
              <ArrowRight size={15} />
            </Link>

            <Link
              href={contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:text-zinc-100"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              <Github size={15} />
              GitHub
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm font-semibold text-zinc-400 transition-all duration-300 hover:border-zinc-600 hover:text-zinc-200"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              <FileText size={15} />
              Resume
            </a>
          </motion.div>

          {/* Inline Social Icons for Quick Contact */}
          <motion.div {...anim(0.6)} className="mt-8 flex items-center gap-5 border-t border-zinc-800/60 pt-6 max-w-sm">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              Find Me On:
            </span>
            <div className="flex gap-4">
              <a 
                href={contact.githubUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-500 transition-colors hover:text-indigo-400"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              {contact.linkedinUrl && (
                <a 
                  href={contact.linkedinUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-zinc-500 transition-colors hover:text-indigo-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
              <a 
                href={`mailto:${contact.email}`}
                className="text-zinc-500 transition-colors hover:text-indigo-400"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </section>

        <div className="mx-auto w-full max-w-[440px] lg:mx-0 lg:justify-self-end">
          <HeroGlobeCard />
        </div>
      </div>

      {/* Bouncing Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1 }}
        className="flex flex-col items-center justify-center gap-1 text-zinc-600 mt-6 pointer-events-none self-center"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
          Explore
        </span>
        <ChevronDown size={14} className="animate-bounce" />
      </motion.div>
    </div>
  );
}


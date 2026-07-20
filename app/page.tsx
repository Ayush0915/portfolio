"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, FileText, ArrowRight, ChevronDown, Trophy, GraduationCap, Users, Sparkles, Compass, MapPin, Code2, BrainCircuit, Cpu } from "lucide-react";
import { contact, achievements, currentlyExploring } from "@/lib/data";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AboutContent from "@/components/AboutContent";
import FAQSection from "@/components/FAQSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import ProjectsRail from "@/components/ProjectsRail";
import SkillsOrbit from "@/components/ui/skills-orbit";
import ContactForm from "@/components/ContactForm";

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
      initial: { opacity: 0, y: 28 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.55, delay, ease: "easeOut" as const },
    };
  };

  return (
    <div className="relative flex flex-col gap-24 pt-4">
      {/* ── HERO SECTION ───────────────────────────────────────────── */}
      <section id="hero" className="relative flex min-h-[80vh] flex-col justify-between pt-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12 my-auto">
          <div className="flex flex-col justify-center">
            {/* Availability Status Badge — Single clean rendering (Fix 1) */}
            <motion.div 
              {...anim(0)}
              className="mb-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
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
              className="mb-4 h-6 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400"
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

            <motion.h1 {...anim(0.2)} className="mb-2 text-[clamp(2.8rem,8vw,5.5rem)] font-black leading-none tracking-tight text-zinc-100">
              AYUSH
            </motion.h1>

            <motion.h1 
              {...anim(0.3)} 
              className="mb-8 text-[clamp(2.8rem,8vw,5.5rem)] font-black leading-none tracking-tight text-transparent" 
              style={{ WebkitTextStroke: "1.5px rgba(161,161,170,0.35)" }}
            >
              KUMAR BHADANI
            </motion.h1>

            <motion.p {...anim(0.4)} className="mb-10 max-w-lg text-base leading-relaxed text-zinc-400">
              I am Ayush Kumar Bhadani, a final-year CSE (Data Science) student at Bangalore Institute of Technology (9.45 CGPA). I specialize in building optimized RAG pipelines, multi-agent AI workflows, and Applied ML models that execute reliably in production.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...anim(0.5)} className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="flex items-center gap-2 rounded-xl border border-indigo-500/60 bg-indigo-500/10 px-5 py-3 text-sm font-semibold text-indigo-300 transition-all duration-300 hover:bg-indigo-500/20 hover:border-indigo-400 hover:shadow-[0_0_18px_rgba(99,102,241,0.35)] min-h-[44px]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                View Projects
                <ArrowRight size={15} />
              </a>

              <a
                href={contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:text-zinc-100 min-h-[44px]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                <Github size={15} />
                GitHub
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-5 py-3 text-sm font-semibold text-zinc-400 transition-all duration-300 hover:border-zinc-600 hover:text-zinc-200 min-h-[44px]"
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

          {/* Clean Highlights Card (Replaces Visitor Orbit Widget) */}
          <motion.div 
            {...anim(0.4)}
            className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm shadow-xl space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <BrainCircuit size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-100">Engineering Highlights</h3>
                <p className="text-xs text-zinc-500">Bangalore Institute of Technology</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-4">
                <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>CGPA</p>
                <p className="mt-1 text-xl font-extrabold text-indigo-400">9.45 / 10</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Top-tier academic rank</p>
              </div>
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-4">
                <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Projects</p>
                <p className="mt-1 text-xl font-extrabold text-emerald-400">4+ Major</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">RAG & Multi-Agent AI</p>
              </div>
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-4">
                <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Community</p>
                <p className="mt-1 text-xl font-extrabold text-amber-400">1000+</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Students instructed (GDG)</p>
              </div>
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-4">
                <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>API Latency</p>
                <p className="mt-1 text-xl font-extrabold text-sky-400">&lt; 200ms</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Target production speed</p>
              </div>
            </div>

            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-xs text-zinc-300 leading-relaxed">
              <div className="flex items-center gap-2 font-semibold text-indigo-400 mb-1" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                <Cpu size={14} /> Focus Domains
              </div>
              Multi-Agent AI Orchestration · Vector Search & RAG · Fast Execution Sandboxes · Model Interpretability
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="flex flex-col items-center justify-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors mt-8 self-center min-h-[44px]"
          aria-label="Scroll to about section"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
            Explore
          </span>
          <ChevronDown size={14} className="animate-bounce" />
        </a>
      </section>

      {/* ── ABOUT SECTION ──────────────────────────────────────────── */}
      <section id="about" className="scroll-mt-28 border-t border-zinc-800/80 pt-16">
        <AboutContent />
        <div className="mt-16">
          <FAQSection />
        </div>
      </section>

      {/* ── JOURNEY SECTION ────────────────────────────────────────── */}
      <section id="journey" className="scroll-mt-28 border-t border-zinc-800/80 pt-16 space-y-16">
        <div>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-zinc-100">Journey</h2>
          <p className="mb-10 text-zinc-500">Timeline of education, technical experience, and community leadership.</p>
          <JourneyTimeline />
        </div>

        {/* Achievements & Activities */}
        <div className="border-t border-zinc-800/80 pt-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <Trophy size={18} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-100">Achievements & Activities</h3>
              <p className="text-xs text-zinc-500">Milestones, awards, and key responsibilities outside the classroom.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((ach) => {
              let Icon = Sparkles;
              let iconColor = "text-teal-400 bg-teal-500/10";
              if (ach.category === "academic") {
                Icon = GraduationCap;
                iconColor = "text-indigo-400 bg-indigo-500/10";
              } else if (ach.category === "leadership") {
                Icon = Users;
                iconColor = "text-sky-400 bg-sky-500/10";
              } else if (ach.category === "award") {
                Icon = Trophy;
                iconColor = "text-amber-400 bg-amber-500/10";
              }

              return (
                <div 
                  key={ach.title} 
                  className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 backdrop-blur-sm transition-all hover:border-indigo-500/20"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconColor}`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-[10px] text-zinc-500 font-semibold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                      {ach.period}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-200 mb-2 leading-tight">{ach.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{ach.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECTS SECTION ───────────────────────────────────────── */}
      <section id="projects" className="scroll-mt-28 border-t border-zinc-800/80 pt-16">
        <div className="mb-6 px-2">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-zinc-100">Featured Projects</h2>
          <p className="text-zinc-500">Production-ready AI/ML systems, multi-agent frameworks, and memory-optimized tools.</p>
        </div>
        <ProjectsRail />
      </section>

      {/* ── SKILLS SECTION ─────────────────────────────────────────── */}
      <section id="skills" className="scroll-mt-28 border-t border-zinc-800/80 pt-16 space-y-16">
        <div>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-zinc-100">Skills</h2>
          <p className="mb-8 text-zinc-500">Mastered and applied technical domains.</p>
          <SkillsOrbit />
        </div>

        {/* Currently Exploring (Trimmed to max 2 items as required) */}
        <div className="border-t border-zinc-800/80 pt-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <Compass size={18} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-100">Currently Exploring</h3>
              <p className="text-xs text-zinc-500">Technologies I am actively reading and prototype testing.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {currentlyExploring.map((item) => (
              <div 
                key={item.topic} 
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 backdrop-blur-sm transition-all hover:border-indigo-500/20"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-zinc-200">{item.topic}</h4>
                  <span 
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ────────────────────────────────────────── */}
      <section id="contact" className="scroll-mt-28 border-t border-zinc-800/80 pt-16 pb-12">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-zinc-100">Contact</h2>
        <p className="mb-10 text-zinc-500">
          Let&apos;s build something together. Reach out for opportunities, collaborations, or tech discussions.
        </p>

        <div className="grid gap-10 lg:grid-cols-[5fr_7fr]">
          {/* Direct Links */}
          <div className="space-y-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-zinc-300">
                  Active availability for internships and early-career engineer roles.
                </span>
              </div>
              <div className="flex items-center gap-3 border-t border-zinc-800/60 pt-4">
                <MapPin size={16} className="text-indigo-400 shrink-0" />
                <span className="text-xs text-zinc-300">
                  Bangalore, Karnataka, India (open to hybrid, remote, or relocation).
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 text-zinc-300 transition-all hover:border-indigo-500/50 hover:shadow-[0_0_14px_rgba(99,102,241,0.15)] min-h-[44px]"
                >
                  <Mail size={18} className="shrink-0 text-indigo-400" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Email Address</p>
                    <p className="text-xs font-semibold text-zinc-200">{contact.email}</p>
                  </div>
                </a>
              )}

              <a
                href={contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 text-zinc-300 transition-all hover:border-indigo-500/50 hover:shadow-[0_0_14px_rgba(99,102,241,0.15)] min-h-[44px]"
              >
                <Github size={18} className="shrink-0 text-indigo-400" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>GitHub Profile</p>
                  <p className="text-xs font-semibold text-zinc-200">{contact.githubUrl.replace("https://", "")}</p>
                </div>
              </a>

              {contact.linkedinUrl && (
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 text-zinc-300 transition-all hover:border-indigo-500/50 hover:shadow-[0_0_14px_rgba(99,102,241,0.15)] min-h-[44px]"
                >
                  <Linkedin size={18} className="shrink-0 text-indigo-400" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>LinkedIn Network</p>
                    <p className="text-xs font-semibold text-zinc-200">{contact.linkedin}</p>
                  </div>
                </a>
              )}

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 text-zinc-300 transition-all hover:border-indigo-500/50 hover:shadow-[0_0_14px_rgba(99,102,241,0.15)] min-h-[44px]"
              >
                <FileText size={18} className="shrink-0 text-indigo-400" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Curriculum Vitae</p>
                  <p className="text-xs font-semibold text-zinc-200">Download Résumé PDF</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

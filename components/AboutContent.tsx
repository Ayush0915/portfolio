"use client";
import { useRef, useState } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { contact } from "@/lib/data";
import Image from "next/image";

// ─── Edit these to match your details ──────────────────────────────────────
const facts = [
  { label: "BASED IN",       value: "Bangalore, India · open to internships & relocation" },
  { label: "CURRENTLY",      value: "Final-year B.Tech, CSE (Data Science) · BIT" },
  { label: "CGPA",           value: "9.45 overall" },
  { label: "LANGUAGES",      value: "Hindi (native) · English (fluent)" },
  { label: "STACK",          value: "Python · PyTorch · FastAPI · LangChain · Transformers" },
  { label: "CURRENTLY INTO", value: "Fine-tuning LLMs · Agentic AI workflows · production RAG" },
];

const tags = [
  "AI/ML",
  "Deep Learning",
  "Transformers",
  "LangChain",
  "Agentic systems",
  "RAG & vector databases",
  "Backend APIs",
  "Always building",
];
// ───────────────────────────────────────────────────────────────────────────

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.55, duration: 0.7 },
  }),
  hidden: { filter: "blur(10px)", y: 30, opacity: 0 },
};

const fadeVariants = {
  visible: (i: number) => ({
    filter: "blur(0px)",
    opacity: 1,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
  hidden: { filter: "blur(10px)", opacity: 0 },
};

export default function AboutContent() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [imgError, setImgError] = useState(false);

  return (
    <div ref={sectionRef}>
      {/* Small eyebrow label */}
      <TimelineContent
        as="p"
        animationNum={0}
        timelineRef={sectionRef}
        customVariants={fadeVariants}
        className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-400"
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        <span className="inline-block h-px w-6 bg-indigo-400" />
        Nice to meet you
      </TimelineContent>

      {/* Headline */}
      <TimelineContent
        as="h1"
        animationNum={1}
        timelineRef={sectionRef}
        customVariants={revealVariants}
        className="mb-12 text-2xl font-bold tracking-tight text-[var(--text-main)] sm:text-3xl !leading-[1.2]"
      >
        I build{" "}
        <TimelineContent
          as="span"
          animationNum={2}
          timelineRef={sectionRef}
          customVariants={fadeVariants}
          className="font-accent italic text-[22px] sm:text-[30px] text-indigo-600 dark:text-indigo-400 border-2 border-indigo-500/50 border-dotted inline px-1.5 rounded-md"
        >
          AI systems
        </TimelineContent>{" "}
        that{" "}
        <TimelineContent
          as="span"
          animationNum={3}
          timelineRef={sectionRef}
          customVariants={fadeVariants}
          className="font-accent italic text-[22px] sm:text-[30px] text-amber-600 dark:text-amber-400 border-2 border-amber-500/50 border-dotted inline px-1.5 rounded-md"
        >
          actually run,
        </TimelineContent>{" "}
        not just{" "}
        <TimelineContent
          as="span"
          animationNum={4}
          timelineRef={sectionRef}
          customVariants={fadeVariants}
          className="font-accent italic text-[22px] sm:text-[30px] text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500/50 border-dotted inline px-1.5 rounded-md"
        >
          notebooks.
        </TimelineContent>
      </TimelineContent>

      {/* Two-column layout: image | fact table */}
      <div className="grid gap-12 lg:grid-cols-[5fr_6fr]">

        {/* Left — photo */}
        <div>
          {/* Profile image — drop your photo in /public/profile.jpg */}
          <TimelineContent
            as="div"
            animationNum={5}
            timelineRef={sectionRef}
            customVariants={fadeVariants}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]"
          >
            {!imgError ? (
              <Image
                src="/profile.jpeg"
                alt={contact.name}
                fill
                className="object-cover"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950/80 via-zinc-900 to-zinc-950 p-6 border border-[var(--border-color)] rounded-xl">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_24px_rgba(99,102,241,0.5)]">
                  <span className="text-3xl font-black tracking-wider text-white">AB</span>
                </div>
                <p className="mt-4 text-base font-bold text-white">{contact.name}</p>
                <p className="mt-1 text-xs text-zinc-400 uppercase tracking-widest" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>CS Student & AI/ML Builder</p>
              </div>
            )}
          </TimelineContent>
        </div>

        {/* Right — fact table + tags */}
        <div>
          <div className="divide-y divide-[var(--border-color)] border-t border-[var(--border-color)]">
            {facts.map((fact, i) => (
              <TimelineContent
                key={fact.label}
                as="div"
                animationNum={i + 6}
                timelineRef={sectionRef}
                customVariants={fadeVariants}
                className="grid grid-cols-[130px_1fr] gap-4 py-4"
              >
                <span
                  className="pt-0.5 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {fact.label}
                </span>
                <span className="text-sm text-[var(--text-main)] font-medium">{fact.value}</span>
              </TimelineContent>
            ))}
          </div>

          {/* "What I bring" tag cloud */}
          <TimelineContent
            as="div"
            animationNum={facts.length + 7}
            timelineRef={sectionRef}
            customVariants={fadeVariants}
            className="mt-8"
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              What I bring
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[var(--border-color)] bg-[var(--bg-chip)] px-3 py-1 text-xs font-medium text-[var(--text-sub)]"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </TimelineContent>
        </div>

      </div>

      {/* Narrative Section */}
      <TimelineContent
        as="div"
        animationNum={facts.length + 8}
        timelineRef={sectionRef}
        customVariants={fadeVariants}
        className="mt-16 grid gap-10 text-[var(--text-muted)] leading-relaxed sm:grid-cols-2 border-t border-[var(--border-color)] pt-10"
      >
        <div>
          <h3 className="text-lg font-bold text-[var(--text-main)] mb-3 font-sans">The Core Story: Bridging ML with Engineering</h3>
          <p className="text-[13px] mb-4">
            Growing up as a builder, I realized that many machine learning models remain trapped inside isolated research notebooks. I chose to focus on **Data Science** because I wanted to bridge the gap between statistical probability models and robust, deterministic software engineering.
          </p>
          <p className="text-[13px]">
            To me, an AI system is only as good as its production stability and execution safety. That is why I spend my time constructing isolated sandboxes, implementing static AST syntax check validations, and ensuring backend API pipelines run under <span className="text-amber-600 dark:text-amber-400 font-semibold font-mono">200ms</span>.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[var(--text-main)] mb-3 font-sans">What Excites Me & Current Focus</h3>
          <p className="text-[13px] mb-4">
            I am fascinated by **Agentic AI** — workflows that go beyond a single prompt-response to coordinate multiple specialized agents (like CodeVerdict&apos;s 4 async agents reviewing code concurrently). Building resilient, grounded retrieval systems represents the future of software development.
          </p>
          <p className="text-[13px]">
            Currently, I am deep-diving into LLM interpretability, declarative pipelines (such as DSPy), and high-throughput backend APIs. I am actively looking for internship and early-career roles where I can help teams build and scale polished, production-ready AI products.
          </p>
        </div>
      </TimelineContent>
    </div>
  );
}
